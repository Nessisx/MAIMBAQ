const CACHE_VERSION = "maimbaq-v1";
const CORE_ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icon-192.png",
  "/icon-512.png",
  "/frontend/public/index.html",
  "/frontend/src/css/base.css",
  "/frontend/src/css/crear.css",
  "/frontend/src/js/app.js",
  "/pages/crear.html",
  "/pages/dashboard.html",
  "/pages/museo.html",
  "/pages/sobre.html",
  "/pages/IA.html",
  "/pages/resultado.html",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(CORE_ASSETS)),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_VERSION)
            .map((key) => caches.delete(key)),
        ),
      ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request)
        .then((networkResponse) => {
          const responseClone = networkResponse.clone();

          caches.open(CACHE_VERSION).then((cache) => {
            cache.put(event.request, responseClone).catch(() => {});
          });

          return networkResponse;
        })
        .catch(() =>
          caches.match("/frontend/public/index.html").then((fallback) => {
            return fallback || new Response("Offline", { status: 503 });
          }),
        );
    }),
  );
});
