const http = require("http");
const { Readable } = require("stream");
const { URL } = require("url");

const PORT = Number.parseInt(process.env.HLS_PROXY_PORT || "4001", 10);
const API_URL = "https://fcapi.amitbala1993.workers.dev/";
const DEFAULT_ORIGIN = "https://fancode.com/";
const DEFAULT_USER_AGENT = "@allinonereborn_links";

let cachedHeaders = null;
let cachedAt = 0;

const getFanCodeHeaders = async () => {
  const cacheAgeMs = 5 * 60 * 1000;
  if (cachedHeaders && Date.now() - cachedAt < cacheAgeMs) {
    return cachedHeaders;
  }

  const response = await fetch(API_URL, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to load feed metadata: ${response.status}`);
  }

  const payload = await response.json();
  cachedHeaders = payload.headers || {};
  cachedAt = Date.now();
  return cachedHeaders;
};

const buildUpstreamHeaders = async (requestHeaders) => {
  const feedHeaders = await getFanCodeHeaders();

  return {
    "User-Agent": feedHeaders["User-Agent"] || feedHeaders["user-agent"] || DEFAULT_USER_AGENT,
    Referer: feedHeaders.Referer || feedHeaders.referer || DEFAULT_ORIGIN,
    Origin: DEFAULT_ORIGIN,
    Accept: requestHeaders.accept || "*/*",
    Range: requestHeaders.range || undefined,
  };
};

const createProxyUrl = (absoluteUrl) => {
  if (!absoluteUrl) return "";
  return `http://localhost:${PORT}/hls?url=${encodeURIComponent(absoluteUrl)}`;
};

const rewritePlaylist = (body, baseUrl) => {
  return body
    .split(/\r?\n/)
    .map((line) => {
      if (!line) return line;

      const rewrittenAttributes = line.replace(/URI="([^"]+)"/g, (_match, uri) => {
        const absoluteUri = new URL(uri, baseUrl).toString();
        return `URI="${createProxyUrl(absoluteUri)}"`;
      });

      if (rewrittenAttributes.startsWith("#")) {
        return rewrittenAttributes;
      }

      const absoluteLine = new URL(rewrittenAttributes, baseUrl).toString();
      return createProxyUrl(absoluteLine);
    })
    .join("\n");
};

const sendCors = (response, contentType) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type, Range, Authorization, Origin, Accept");
  response.setHeader("Cache-Control", "no-store");

  if (contentType) {
    response.setHeader("Content-Type", contentType);
  }
};

const server = http.createServer(async (request, response) => {
  try {
    const requestUrl = new URL(request.url, `http://localhost:${PORT}`);

    if (request.method === "OPTIONS") {
      sendCors(response);
      response.writeHead(204);
      response.end();
      return;
    }

    if (requestUrl.pathname !== "/hls") {
      sendCors(response, "application/json");
      response.writeHead(404);
      response.end(JSON.stringify({ error: "Not found" }));
      return;
    }

    const upstreamUrl = requestUrl.searchParams.get("url");
    if (!upstreamUrl) {
      sendCors(response, "application/json");
      response.writeHead(400);
      response.end(JSON.stringify({ error: "Missing url query param" }));
      return;
    }

    const upstreamHeaders = await buildUpstreamHeaders(request.headers);
    const upstreamResponse = await fetch(upstreamUrl, {
      method: request.method,
      headers: upstreamHeaders,
      redirect: "follow",
    });

    const contentType = upstreamResponse.headers.get("content-type") || "";
    const isPlaylist =
      contentType.includes("application/vnd.apple.mpegurl") ||
      contentType.includes("application/x-mpegURL") ||
      upstreamUrl.includes(".m3u8");

    sendCors(response, contentType || (isPlaylist ? "application/vnd.apple.mpegurl" : "application/octet-stream"));
    response.writeHead(upstreamResponse.status);

    if (!upstreamResponse.ok) {
      const errorText = await upstreamResponse.text();
      response.end(errorText);
      return;
    }

    if (request.method === "HEAD") {
      response.end();
      return;
    }

    if (isPlaylist) {
      const text = await upstreamResponse.text();
      const rewritten = rewritePlaylist(text, upstreamUrl);
      response.end(rewritten);
      return;
    }

    if (upstreamResponse.body) {
      Readable.fromWeb(upstreamResponse.body).pipe(response);
      return;
    }

    response.end();
  } catch (error) {
    sendCors(response, "application/json");
    response.writeHead(502);
    response.end(JSON.stringify({ error: error.message || "Proxy error" }));
  }
});

server.listen(PORT, () => {
  console.log(`HLS proxy listening on http://localhost:${PORT}`);
});
