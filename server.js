const fs = require("fs");
const remix = require("@remix-run/node");
const { createServer } = require("http");
const path = require("path");
const rateLimit = require("express-rate-limit");
const { createRequestHandler } = require("@remix-run/express");
const compression = require("compression");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const crypto = require("crypto");
const chokidar = require("chokidar");
const watch = chokidar.watch;

const MODE = process.env.NODE_ENV;
const BUILD_DIR = path.join(process.cwd(), "build");
if (!fs.existsSync(BUILD_DIR)) {
  console.warn(
    "Build directory doesn't exist, please run `npm run dev` or `npm run build` before starting the server."
  );
}
const app = express();
const broadcastDevReady = remix.broadcastDevReady;
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Limit each IP to 100 requests per windowMs
});

app.use(limiter);

// You need to create the HTTP server from the Express app
const httpServer = createServer(app);

app.use(compression());

// You may want to be more aggressive with this caching
app.use(express.static("public", { maxAge: "1h" }));

// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable("x-powered-by");

// Remix fingerprints its assets so we can cache forever.
app.use(
  "/build",
  express.static("public/build", { immutable: true, maxAge: "1y" })
);
app.use(morgan("tiny"));

app.use((_, res, next) => {
  res.locals.cspNonce = crypto.randomBytes(32).toString("base64");
  next();
});

const getLoadContext = (req, res) => {
  return {
    cspNonce: res.locals.cspNonce,
  };
};

app.all(
  "*",
  process.env.NODE_ENV === "production"
    ? createRequestHandler({ build: require(BUILD_DIR), getLoadContext })
    : (...args) => {
        const requestHandler = createRequestHandler({
          build: require(BUILD_DIR),
          getLoadContext,
          mode: process.env.NODE_ENV,
        });
        return requestHandler(...args);
      }
);

// Security-related HTTP response headers, such as content-security-policy (CSP) and
// strict-transport-security.
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        "connect-src": [
          process.env.NODE_ENV === "development" ? "ws:" : null,
          "'self'",
        ].filter(Boolean),
        "script-src": [
          "'strict-dynamic'",
          // @ts-expect-error Helmet types don't seem to know about res.locals
          (_, res) => `'nonce-${res.locals.cspNonce}'`,
        ],
      },
    },
  })
);

const port = process.env.PORT || 3000;

// instead of running listen on the Express app, do it on the HTTP server
httpServer.listen(port, () => {
  const build = require(BUILD_DIR);
  console.log(`✅ app ready: http://localhost:${port}`);
  if (process.env.NODE_ENV === "development") {
    broadcastDevReady(build);

    // Watch the build directory and reload the server on any changes.
    watch(BUILD_DIR, { ignoreInitial: true }).on("all", () => {
      const build = reimportServer();
      broadcastDevReady(build);
    });
  }
  process.on("SIGINT", () => server.close());
  process.on("SIGQUIT", () => server.close());
  process.on("SIGTERM", () => server.close());
});

function reimportServer() {
  for (const key in require.cache) {
    if (key.startsWith(BUILD_DIR)) {
      delete require.cache[key];
    }
  }
  return require(BUILD_DIR);
}
