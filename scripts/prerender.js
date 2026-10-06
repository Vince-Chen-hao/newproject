const fs = require("fs");
const http = require("http");
const path = require("path");
const puppeteer = require("puppeteer");

const distDir = path.resolve(__dirname, "../dist");
const routes = ["/", "/News", "/Review", "/Contact", "/About", "/QA"];
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function createServer(appShell) {
  return http.createServer((request, response) => {
    const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    const relativePath = pathname.replace(/^\/+/, "");
    const requestedFile = path.resolve(distDir, relativePath);
    const isInsideDist =
      requestedFile === distDir || requestedFile.startsWith(`${distDir}${path.sep}`);

    if (isInsideDist && relativePath && fs.existsSync(requestedFile)) {
      const stat = fs.statSync(requestedFile);
      const filePath = stat.isDirectory()
        ? path.join(requestedFile, "index.html")
        : requestedFile;

      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const extension = path.extname(filePath).toLowerCase();
        response.writeHead(200, {
          "Content-Type": contentTypes[extension] || "application/octet-stream",
        });
        fs.createReadStream(filePath).pipe(response);
        return;
      }
    }

    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    response.end(appShell);
  });
}

function listen(server) {
  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      resolve(address.port);
    });
  });
}

function closeServer(server) {
  return new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
}

function outputFileForRoute(route) {
  if (route === "/") {
    return path.join(distDir, "index.html");
  }

  return path.join(distDir, route.replace(/^\/+/, ""), "index.html");
}

async function main() {
  const sourceIndex = path.join(distDir, "index.html");

  if (!fs.existsSync(sourceIndex)) {
    throw new Error("dist/index.html was not found. Run the Vue build first.");
  }

  const appShell = fs.readFileSync(sourceIndex);
  const server = createServer(appShell);
  const port = await listen(server);
  let browser;

  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    for (const route of routes) {
      const page = await browser.newPage();

      await page.setRequestInterception(true);
      page.on("request", (request) => {
        if (["font", "image", "media"].includes(request.resourceType())) {
          request.abort();
        } else {
          request.continue();
        }
      });

      await page.goto(`http://127.0.0.1:${port}${route}`, {
        waitUntil: "domcontentloaded",
        timeout: 60000,
      });

      await page.waitForFunction(
        () => {
          const app = document.querySelector("#app");
          return app && app.innerText.trim().length > 20;
        },
        { timeout: 60000 },
      );

      const html = await page.content();
      const outputFile = outputFileForRoute(route);

      fs.mkdirSync(path.dirname(outputFile), { recursive: true });
      fs.writeFileSync(
        outputFile,
        html.replace("<html", "<!-- prerendered -->\n<html"),
        "utf8",
      );

      console.log(`Prerendered ${route} -> ${path.relative(distDir, outputFile)}`);
      await page.close();
    }
  } finally {
    if (browser) {
      await browser.close();
    }
    await closeServer(server);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
