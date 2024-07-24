const fs = require("fs");
const { createServer } = require("http");
const path = require("path");
const rateLimit = require("express-rate-limit");
const { createRequestHandler } = require("@remix-run/express");
const compression = require("compression");
const express = require("express");
const morgan = require("morgan");
const { Server } = require("socket.io");
const axios = require("axios");

const MODE = process.env.NODE_ENV;
const BUILD_DIR = path.join(process.cwd(), "build");
if (!fs.existsSync(BUILD_DIR)) {
  console.warn(
    "Build directory doesn't exist, please run `npm run dev` or `npm run build` before starting the server."
  );
}

const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Limit each IP to 100 requests per windowMs
});

app.use(limiter);

// You need to create the HTTP server from the Express app
const httpServer = createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket) => {
  // from this point you are on the WS connection with a specific client
  console.log(socket.id, "connected");

  socket.emit("confirmation", "connected!");

  socket.on("translate", async (data) => {
    const controller = new AbortController();
    const formData = new FormData();
    const fileUploadUrl = process.env?.FILE_SUBMIT_URL;

    let api_url = fileUploadUrl + "/mt/playground/stream";
    formData.append("input", data?.text);
    formData.append("direction", data?.target);

    const response = await axios.post(api_url, formData, {
      headers: {
        "x-api-key": process.env?.API_ACCESS_KEY,
      },
      responseType: "stream",
      signal: controller.signal,
    });
    try {
      const contentType = response.headers.get("Content-Type");

      if (contentType && contentType.includes("application/json")) {
        // Handle JSON response
        let data = await response.json();
        return data[0].generated_text;
      } else if (contentType && contentType.includes("text")) {
        let translation = "";
        // Make a POST request to the API
        response.data.on("data", (chunk) => {
          const chunkStr = chunk.toString();
          const lines = chunkStr
            .split("\n")
            .filter((line) => line.trim() !== "");
          lines.forEach((line) => {
            if (line.startsWith("data:")) {
              const jsonStr = line.replace("data:", "");
              try {
                const parsedData = JSON.parse(jsonStr);
                if (parsedData.generated_text) {
                  generatedText = parsedData.generated_text;
                } else {
                  // Extract the text from the response and append it to the translation variable
                  translation += parsedData.token?.text;

                  socket.emit("translated", translation);
                }
              } catch (error) {
                console.error("Error parsing JSON:", error);
              }
            }
          });
        });

        response.data.on("end", () => {
          if (generatedText) {
            translation = generatedText;
            socket.emit("translated", translation);
          }
          // Handle the end of the stream
        });

        response.data.on("error", (error) => {
          console.error("Stream error:", error);
          // Handle any errors in the stream
        });

        return translation;
      } else {
        throw new Error("Unsupported content type");
      }
    } catch (error) {}
  });
});

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

app.all(
  "*",
  MODE === "production"
    ? createRequestHandler({
        build: require("./build"),
      })
    : (req, res, next) => {
        purgeRequireCache();
        const build = require("./build");
        return createRequestHandler({
          build,
          mode: MODE,
        })(req, res, next);
      }
);

const port = process.env.PORT || 3000;

// instead of running listen on the Express app, do it on the HTTP server
httpServer.listen(port, () => {
  console.log(`✅ app ready: http://localhost:${port}`);
});

////////////////////////////////////////////////////////////////////////////////
function purgeRequireCache() {
  // purge require cache on requests for "server side HMR" this won't let
  // you have in-memory objects between requests in development,
  // alternatively you can set up nodemon/pm2-dev to restart the server on
  // file changes, we prefer the DX of this though, so we've included it
  // for you by default
  for (const key in require.cache) {
    if (key.startsWith(BUILD_DIR)) {
      delete require.cache[key];
    }
  }
}
