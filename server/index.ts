import express, { type Request, Response, NextFunction } from "express";
import compression from "compression";
import onHeaders from "on-headers";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();

declare module 'http' {
  interface IncomingMessage {
    rawBody: unknown
  }
}

function negotiateEncoding(acceptEncoding: string): "br" | "gzip" | null {
  if (/\bbr\b/.test(acceptEncoding)) return "br";
  if (/\bgzip\b/.test(acceptEncoding)) return "gzip";
  return null;
}

function isCompressibleContentType(type: unknown): boolean {
  if (typeof type !== "string") return false;
  const mime = type.split(";")[0].trim();
  return /^(?:text\/|application\/(?:javascript|json|xml|.*\+json|.*\+xml)|image\/svg\+xml)/i.test(
    mime,
  );
}

// Runtime compression: brotli when Accept-Encoding includes br, else gzip.
// Prefer runtime over build-time precompress so HTML, JSON, and static assets
// share one path without a Vite plugin or .br/.gz siblings in dist/.
app.use(compression());

// compression does not set Content-Encoding on HEAD (no body). Advertise the
// same encoding a GET would use so curl -sI and caches see it.
app.use((req, res, next) => {
  if (req.method === "HEAD") {
    const acceptHeader = req.headers["accept-encoding"];
    const accept = Array.isArray(acceptHeader)
      ? acceptHeader.join(",")
      : acceptHeader || "";
    const encoding = negotiateEncoding(accept);
    if (encoding) {
      onHeaders(res, () => {
        if (res.getHeader("Content-Encoding")) return;
        if (!isCompressibleContentType(res.getHeader("Content-Type"))) return;
        res.setHeader("Content-Encoding", encoding);
        const vary = res.getHeader("Vary");
        if (!vary) {
          res.setHeader("Vary", "Accept-Encoding");
        } else if (!String(vary).toLowerCase().includes("accept-encoding")) {
          res.setHeader("Vary", `${vary}, Accept-Encoding`);
        }
        res.removeHeader("Content-Length");
      });
    }
  }
  next();
});

app.use(express.json({
  verify: (req, _res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
