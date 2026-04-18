import React, { useEffect, useMemo, useRef, useState } from "react";
import Hls from "hls.js";

const API_URL = "https://fcapi.amitbala1993.workers.dev";

const formatClock = (seconds) => {
  if (!Number.isFinite(seconds) || seconds < 0) return "00:00";

  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hrs > 0) {
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }

  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

const pickDefaultStream = (match) => {
  if (!match) return "";
  if (match.all_resolutions?.["1080p"]) return match.all_resolutions["1080p"];
  if (match.stream_url) return match.stream_url;

  const firstKey = Object.keys(match.all_resolutions || {})[0];
  return firstKey ? match.all_resolutions[firstKey] : "";
};

export default function VideoPlayer() {
  const playerRef = useRef(null);
  const hlsRef = useRef(null);

  const [apiData, setApiData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [selectedMatchId, setSelectedMatchId] = useState("");
  const [selectedQuality, setSelectedQuality] = useState("1080p");
  const [streamUrl, setStreamUrl] = useState("");
  const [playbackError, setPlaybackError] = useState("");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const destroyHls = () => {
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    const loadMatches = async () => {
      try {
        setIsLoading(true);
        setFetchError("");

        const response = await fetch(API_URL, {
          signal: controller.signal,
          cache: "no-store",
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`API returned ${response.status}`);
        }

        const data = await response.json();
        setApiData(data);

        const firstLive = data.matches?.[0];
        if (firstLive) {
          setSelectedMatchId(firstLive.match_id);
          setStreamUrl(pickDefaultStream(firstLive));
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          setFetchError("Could not load matches from fcapi. Please try again.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadMatches();

    return () => controller.abort();
  }, []);

  const liveMatches = useMemo(() => apiData?.matches || [], [apiData]);
  const selectedMatch = useMemo(
    () => liveMatches.find((match) => String(match.match_id) === String(selectedMatchId)) || liveMatches[0],
    [liveMatches, selectedMatchId]
  );

  const availableQualities = useMemo(() => {
    if (!selectedMatch?.all_resolutions) return [];

    return Object.entries(selectedMatch.all_resolutions)
      .map(([label, url]) => ({ label, url }))
      .sort((a, b) => Number.parseInt(a.label, 10) - Number.parseInt(b.label, 10));
  }, [selectedMatch]);

  useEffect(() => {
    if (!selectedMatch) return;

    const nextStream =
      selectedMatch.all_resolutions?.[selectedQuality] || pickDefaultStream(selectedMatch);
    setStreamUrl(nextStream);
    setPlaybackError("");
    setCurrentTime(0);
    setDuration(0);
  }, [selectedMatch, selectedQuality]);

  useEffect(() => {
    const video = playerRef.current;
    if (!video || !streamUrl) return;

    destroyHls();
    setPlaybackError("");

    const canPlayNativeHls =
      video.canPlayType("application/vnd.apple.mpegurl") !== "";

    if (canPlayNativeHls) {
      video.src = streamUrl;
      video
        .play()
        .catch(() => {
          // Browser autoplay policies can block play until user interaction.
        });
      return;
    }

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      });

      hlsRef.current = hls;
      hls.loadSource(streamUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video
          .play()
          .catch(() => {
            // Browser autoplay policies can block play until user interaction.
          });
      });

      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data?.fatal) {
          setPlaybackError(
            "Playback failed for this stream right now. Try another match or quality."
          );
        }
      });

      return;
    }

    setPlaybackError("Your browser does not support HLS playback.");
  }, [streamUrl]);

  useEffect(() => {
    return () => {
      destroyHls();
    };
  }, []);

  return (
    <section className="w-full px-6 py-10 md:px-14">
      <div className="mx-auto max-w-6xl rounded-2xl border border-gray-200 bg-white p-5 shadow-xl md:p-8">
        <div className="mb-4 flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">FanCode Live Video Player</h2>
          <p className="text-sm text-gray-500 md:text-base">Live stream browser powered by fcapi.amitbala1993.workers.dev</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-xl bg-black">
              <video
                ref={playerRef}
                controls
                autoPlay
                playsInline
                crossOrigin="anonymous"
                poster={selectedMatch?.image}
                className="h-full w-full"
                onLoadedMetadata={(event) => setDuration(event.currentTarget.duration || 0)}
                onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime || 0)}
                onError={() => {
                  setPlaybackError(
                    "Playback failed. The stream may require FanCode headers/cookies or browser support for this HLS format."
                  );
                }}
              />
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm font-medium text-gray-600">
                {formatClock(currentTime)} / {formatClock(duration)}
              </p>

              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                Quality
                <select
                  value={selectedQuality}
                  onChange={(event) => setSelectedQuality(event.target.value)}
                  className="rounded-md border border-gray-300 px-3 py-1.5 text-sm"
                >
                  {availableQualities.map((quality) => (
                    <option key={quality.label} value={quality.label}>
                      {quality.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {selectedMatch && (
              <div className="mt-4 rounded-lg border border-gray-100 bg-gray-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-orange-600">Now selected</p>
                <h3 className="mt-1 text-lg font-bold text-gray-900">{selectedMatch.match}</h3>
                <p className="text-sm text-gray-600">{selectedMatch.tournament}</p>
              </div>
            )}

            {playbackError && <p className="mt-3 text-sm font-medium text-red-600">{playbackError}</p>}
          </div>

          <div className="lg:col-span-1">
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-base font-bold text-gray-900">Live matches</h3>
                <span className="rounded-full bg-orange-100 px-2.5 py-1 text-xs font-semibold text-orange-700">
                  {apiData?.live_matches ?? 0} live
                </span>
              </div>

              {isLoading && <p className="text-sm text-gray-500">Loading live matches...</p>}
              {fetchError && <p className="text-sm font-medium text-red-600">{fetchError}</p>}

              <div className="max-h-[430px] space-y-2 overflow-auto pr-1">
                {liveMatches.map((match) => {
                  const active = String(match.match_id) === String(selectedMatch?.match_id);

                  return (
                    <button
                      key={match.match_id}
                      type="button"
                      onClick={() => {
                        setSelectedMatchId(match.match_id);
                        setSelectedQuality(
                          match.all_resolutions?.["1080p"]
                            ? "1080p"
                            : Object.keys(match.all_resolutions || {})[0] || "1080p"
                        );
                      }}
                      className={`w-full rounded-lg border p-3 text-left transition ${
                        active
                          ? "border-orange-300 bg-orange-50"
                          : "border-gray-200 bg-white hover:border-orange-200 hover:bg-orange-50/40"
                      }`}
                    >
                      <p className="text-xs font-semibold uppercase tracking-wide text-orange-600">{match.category}</p>
                      <p className="mt-1 text-sm font-semibold text-gray-900">{match.match}</p>
                      <p className="mt-0.5 line-clamp-2 text-xs text-gray-600">{match.tournament}</p>
                    </button>
                  );
                })}

                {!isLoading && !liveMatches.length && !fetchError && (
                  <p className="text-sm text-gray-500">No live matches are currently available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
