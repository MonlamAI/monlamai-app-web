// install service worker

self.addEventListener("install", (evt) => {});

//activate service worker

self.addEventListener("activate", (evt) => {});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    (async function () {
      const modifiedRequest = new Request(event.request, {
        headers: new Headers({
          "X-PWA": "true",
          ...Object.fromEntries(event.request.headers.entries()),
        }),
      });
      return fetch(modifiedRequest);
    })()
  );
});
