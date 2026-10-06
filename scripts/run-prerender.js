const childProcess = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");

const minimumMajorVersion = 18;
const prerenderScript = path.resolve(__dirname, "prerender.js");

function getMajorVersion(nodePath) {
  const result = childProcess.spawnSync(nodePath, ["--version"], {
    encoding: "utf8",
  });

  if (result.status !== 0) {
    return 0;
  }

  const match = String(result.stdout).trim().match(/^v(\d+)/);
  return match ? Number(match[1]) : 0;
}

function findModernNode() {
  if (getMajorVersion(process.execPath) >= minimumMajorVersion) {
    return process.execPath;
  }

  if (process.platform !== "win32") {
    return null;
  }

  const nvmRoots = [
    process.env.NVM_HOME,
    path.join(os.homedir(), "AppData", "Local", "nvm"),
  ].filter(Boolean);

  const candidates = [];

  nvmRoots.forEach(function (nvmRoot) {
    if (!fs.existsSync(nvmRoot)) {
      return;
    }

    fs.readdirSync(nvmRoot).forEach(function (directory) {
      const nodePath = path.join(nvmRoot, directory, "node.exe");

      if (fs.existsSync(nodePath)) {
        candidates.push({
          majorVersion: getMajorVersion(nodePath),
          nodePath: nodePath,
        });
      }
    });
  });

  candidates.sort(function (a, b) {
    return b.majorVersion - a.majorVersion;
  });

  const match = candidates.find(function (candidate) {
    return candidate.majorVersion >= minimumMajorVersion;
  });

  return match ? match.nodePath : null;
}

const nodePath = findModernNode();

if (!nodePath) {
  console.error(
    "Prerendering requires Node.js 18 or newer. Please install or select Node.js 22.",
  );
  process.exit(1);
}

if (nodePath !== process.execPath) {
  console.log("Using Node.js " + getMajorVersion(nodePath) + " for prerendering.");
}

const result = childProcess.spawnSync(nodePath, [prerenderScript], {
  stdio: "inherit",
});

if (result.error) {
  throw result.error;
}

process.exit(result.status === null ? 1 : result.status);
