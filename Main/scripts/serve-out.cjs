/** 本地预览 out/ 静态产物：node scripts/serve-out.cjs [port] */
const http = require("http");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..", "out");
const port = Number(process.argv[2] || 4321);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
};

http
  .createServer((req, res) => {
    const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
    let file = path.join(root, urlPath);
    if (!file.startsWith(root)) {
      res.writeHead(403).end("forbidden");
      return;
    }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
      file = path.join(file, "index.html");
    }
    if (!fs.existsSync(file) && fs.existsSync(file + ".html")) {
      file = file + ".html";
    }
    if (!fs.existsSync(file)) {
      const notFound = path.join(root, "404.html");
      res.writeHead(404, { "content-type": types[".html"] });
      res.end(fs.existsSync(notFound) ? fs.readFileSync(notFound) : "404");
      return;
    }
    res.writeHead(200, { "content-type": types[path.extname(file)] || "application/octet-stream" });
    fs.createReadStream(file).pipe(res);
  })
  .listen(port, () => console.log("serving out/ on http://localhost:" + port));