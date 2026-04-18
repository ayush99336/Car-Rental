const { spawn } = require("child_process");
const path = require("path");

const proxyPath = path.join(__dirname, "proxy-server.js");

const proxyProcess = spawn(process.execPath, [proxyPath], {
  stdio: "inherit",
  env: {
    ...process.env,
    HLS_PROXY_PORT: process.env.HLS_PROXY_PORT || "4001",
  },
});

const reactProcess = spawn(
  process.platform === "win32" ? "npm.cmd" : "npm",
  ["run", "start:react"],
  {
    stdio: "inherit",
    env: {
      ...process.env,
      BROWSER: process.env.BROWSER || "none",
    },
  }
);

const shutdown = (code = 0) => {
  if (!proxyProcess.killed) {
    proxyProcess.kill("SIGTERM");
  }

  if (!reactProcess.killed) {
    reactProcess.kill("SIGTERM");
  }

  process.exit(code);
};

reactProcess.on("exit", (code) => {
  shutdown(code || 0);
});

proxyProcess.on("exit", (code) => {
  if (code && code !== 0) {
    shutdown(code);
  }
});

process.on("SIGINT", () => shutdown(130));
process.on("SIGTERM", () => shutdown(143));
