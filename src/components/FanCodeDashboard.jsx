import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

const API_URL = "https://fcapi.amitbala1993.workers.dev";
const HLS_SCRIPT_URL = "https://cdn.jsdelivr.net/npm/hls.js@latest";
const HLS_PROXY_URL = process.env.REACT_APP_HLS_PROXY_URL || "http://localhost:4001";
const REFRESH_INTERVAL_MS = 8 * 60 * 1000;

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds) || seconds < 0) return "00:00";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  if (h > 0) return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

const getDefaultQuality = (match) => {
  if (!match?.all_resolutions) return "";
  if (match.all_resolutions["1080p"]) return "1080p";
  return Object.keys(match.all_resolutions)[0] || "";
};

const createProxyUrl = (rawUrl) => {
  if (!rawUrl) return "";
  return `${HLS_PROXY_URL}/hls?url=${encodeURIComponent(rawUrl)}`;
};

const loadHlsScript = () =>
  new Promise((resolve, reject) => {
    if (window.Hls) {
      resolve(window.Hls);
      return;
    }

    const existing = document.querySelector(`script[src="${HLS_SCRIPT_URL}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve(window.Hls));
      existing.addEventListener("error", () => reject(new Error("Failed to load hls.js")));
      return;
    }

    const script = document.createElement("script");
    script.src = HLS_SCRIPT_URL;
    script.async = true;
    script.onload = () => resolve(window.Hls);
    script.onerror = () => reject(new Error("Failed to load hls.js"));
    document.body.appendChild(script);
  });

export default function FanCodeDashboard() {
  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  const fallbackRef = useRef({ streamUrl: "", attempts: 0 });

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [fetchError, setFetchError] = useState("");

  const [selectedMatchId, setSelectedMatchId] = useState("");
  const [quality, setQuality] = useState("");
  const [streamUrl, setStreamUrl] = useState("");

  const [playbackError, setPlaybackError] = useState("");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const fetchFeed = useCallback(async (silent = false) => {
    const controller = new AbortController();

    try {
      if (!silent) setIsLoading(true);
      setIsRefreshing(silent);
      setFetchError("");

      const response = await fetch(API_URL, {
        signal: controller.signal,
        cache: "no-store",
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const payload = await response.json();
      setData(payload);

      if (!selectedMatchId && payload.matches?.length) {
        const first = payload.matches[0];
        setSelectedMatchId(first.match_id);
        setQuality(getDefaultQuality(first));
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        setFetchError("Could not load FanCode feed. Please refresh to try again.");
      }
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }

    return () => controller.abort();
  }, [selectedMatchId]);

  useEffect(() => {
    fetchFeed();
  }, [fetchFeed]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      fetchFeed(true);
    }, REFRESH_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [fetchFeed]);

  const liveMatches = useMemo(() => data?.matches || [], [data]);
  const upcomingMatches = useMemo(() => data?.upcoming_matches || [], [data]);

  const selectedMatch = useMemo(
    () => liveMatches.find((item) => String(item.match_id) === String(selectedMatchId)) || liveMatches[0] || null,
    [liveMatches, selectedMatchId]
  );

  const qualities = useMemo(() => {
    if (!selectedMatch?.all_resolutions) return [];

    return Object.entries(selectedMatch.all_resolutions)
      .map(([label, url]) => ({ label, url }))
      .sort((a, b) => Number.parseInt(a.label, 10) - Number.parseInt(b.label, 10));
  }, [selectedMatch]);

  const activeQuality = useMemo(() => {
    if (!selectedMatch) return "";
    if (quality && selectedMatch.all_resolutions?.[quality]) return quality;
    return getDefaultQuality(selectedMatch);
  }, [quality, selectedMatch]);

  const selectedStreamSource = useMemo(() => {
    if (!selectedMatch) return "";

    return selectedMatch.all_resolutions?.[activeQuality] || selectedMatch.stream_url || "";
  }, [activeQuality, selectedMatch]);

  const fallbackToLowerQuality = useCallback(() => {
    if (!qualities.length) return false;

    const labels = qualities.map((item) => item.label);
    const selectedIndex = labels.indexOf(quality);
    const startIndex = selectedIndex === -1 ? labels.length - 1 : selectedIndex;

    for (let index = startIndex - 1; index >= 0; index -= 1) {
      const lowerLabel = labels[index];
      if (lowerLabel && lowerLabel !== quality) {
        setQuality(lowerLabel);
        return true;
      }
    }

    return false;
  }, [qualities, quality]);

  useEffect(() => {
    if (!selectedMatch || !activeQuality) return;

    if (activeQuality !== quality) {
      setQuality(activeQuality);
    }
  }, [activeQuality, quality, selectedMatch]);

  useEffect(() => {
    if (!selectedStreamSource) return;

    setStreamUrl(createProxyUrl(selectedStreamSource));
    setPlaybackError("");
    setCurrentTime(0);
    setDuration(0);
  }, [selectedStreamSource]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !streamUrl) return;

    let cancelled = false;

    const setup = async () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }

      if (fallbackRef.current.streamUrl !== streamUrl) {
        fallbackRef.current = { streamUrl, attempts: 0 };
      }

      const nativeHls = video.canPlayType("application/vnd.apple.mpegurl");
      if (nativeHls) {
        video.src = streamUrl;
        return;
      }

      try {
        const Hls = await loadHlsScript();
        if (cancelled || !Hls?.isSupported?.()) {
          video.src = streamUrl;
          return;
        }

        const hls = new Hls({ enableWorker: true, lowLatencyMode: true });
        hlsRef.current = hls;
        hls.loadSource(streamUrl);
        hls.attachMedia(video);

        hls.on(Hls.Events.ERROR, async (_, detail) => {
          if (detail?.fatal) {
            const status = detail?.response?.code || detail?.response?.status;
            const canFallback = fallbackRef.current.attempts < 2;

            if (status === 403 && canFallback && fallbackToLowerQuality()) {
              fallbackRef.current.attempts += 1;
              setPlaybackError("1080p is blocked for this stream right now. Switched to a lower quality.");
              return;
            }

            await fetchFeed(true);
            setPlaybackError(
              "Stream token expired or source rejected the request. Feed refreshed automatically, please retry play."
            );
          }
        });
      } catch {
        video.src = streamUrl;
      }
    };

    setup();

    return () => {
      cancelled = true;
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [fallbackToLowerQuality, fetchFeed, streamUrl]);

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white md:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 rounded-2xl border border-slate-700 bg-slate-900 p-5">
          <h1 className="text-2xl font-bold md:text-3xl">FanCode Dashboard</h1>
          <p className="mt-1 text-sm text-slate-300">Live and upcoming streams from FC API</p>
        </header>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-2xl border border-slate-700 bg-black">
              <video
                ref={videoRef}
                key={streamUrl}
                controls
                autoPlay
                playsInline
                poster={selectedMatch?.image}
                className="aspect-video w-full"
                onLoadedMetadata={(event) => setDuration(event.currentTarget.duration || 0)}
                onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime || 0)}
                onError={() => {
                  const canFallback = fallbackRef.current.attempts < 2;
                  if (canFallback && fallbackToLowerQuality()) {
                    fallbackRef.current.attempts += 1;
                    setPlaybackError("Stream failed at current quality. Switched to a lower quality automatically.");
                    return;
                  }

                  fetchFeed(true);
                  setPlaybackError("This stream failed to load. Refreshed stream links automatically.");
                }}
              />
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-700 bg-slate-900 p-3">
              <p className="text-sm text-slate-300">
                {formatTime(currentTime)} / {formatTime(duration)}
              </p>

              <div className="flex flex-wrap items-center gap-2">
                <label htmlFor="quality" className="text-sm text-slate-300">
                  Quality
                </label>
                <select
                  id="quality"
                  value={quality}
                  onChange={(event) => setQuality(event.target.value)}
                  className="rounded-md border border-slate-600 bg-slate-950 px-2 py-1 text-sm"
                >
                  {qualities.map((item) => (
                    <option key={item.label} value={item.label}>
                      {item.label}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={() => fetchFeed(true)}
                  className="rounded-md border border-slate-600 px-2 py-1 text-xs hover:bg-slate-800"
                >
                  {isRefreshing ? "Refreshing..." : "Refresh feed"}
                </button>
              </div>
            </div>

            {selectedMatch && (
              <div className="mt-4 rounded-xl border border-slate-700 bg-slate-900 p-4">
                <p className="text-xs uppercase tracking-wide text-emerald-400">Now playing</p>
                <h2 className="mt-1 text-lg font-semibold">{selectedMatch.match}</h2>
                <p className="text-sm text-slate-300">{selectedMatch.tournament}</p>
              </div>
            )}

            {playbackError && <p className="mt-3 text-sm font-medium text-red-400">{playbackError}</p>}
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-700 bg-slate-900 p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold">Live Matches</h3>
                <span className="rounded-full bg-emerald-900 px-2 py-0.5 text-xs text-emerald-300">
                  {data?.live_matches ?? 0} live
                </span>
              </div>

              {isLoading && <p className="text-sm text-slate-400">Loading live matches...</p>}
              {fetchError && <p className="text-sm text-red-400">{fetchError}</p>}

              <div className="max-h-[300px] space-y-2 overflow-auto pr-1">
                {liveMatches.map((match) => {
                  const active = String(match.match_id) === String(selectedMatch?.match_id);
                  return (
                    <button
                      key={match.match_id}
                      type="button"
                      onClick={() => setSelectedMatchId(match.match_id)}
                      className={`w-full rounded-lg border p-3 text-left transition ${
                        active ? "border-emerald-500 bg-emerald-950/40" : "border-slate-700 bg-slate-950 hover:border-slate-500"
                      }`}
                    >
                      <p className="text-xs text-emerald-300">{match.category}</p>
                      <p className="mt-1 text-sm font-semibold">{match.match}</p>
                      <p className="mt-1 line-clamp-2 text-xs text-slate-400">{match.tournament}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-700 bg-slate-900 p-4">
              <h3 className="mb-3 font-semibold">Upcoming</h3>
              <div className="max-h-[260px] space-y-2 overflow-auto pr-1">
                {upcomingMatches.slice(0, 10).map((match) => (
                  <div key={match.match_id} className="rounded-lg border border-slate-700 bg-slate-950 p-3">
                    <p className="text-sm font-medium">{match.match}</p>
                    <p className="text-xs text-slate-400">{match.startTime}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
