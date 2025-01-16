/// <reference lib="WebWorker" />

export {};

declare let self: ServiceWorkerGlobalScope;

self.addEventListener("install", (event) => {

  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {

  event.waitUntil(self.clients.claim());
});
