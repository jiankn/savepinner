const CACHE_NAME = "savepinner-shell-v2";
const APP_SHELL = [
  "/",
  "/manifest.webmanifest",
  "/icons/savepinner-192.png",
  "/icons/savepinner-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))),
      ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin || url.pathname.startsWith("/api/")) return;

  if (request.mode === "navigate") {
    const fetched = fetch(request);
    const refreshed = fetched.then((response) => {
      if (!response.ok) return;

      const copy = response.clone();
      return caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
    });

    event.waitUntil(refreshed.catch(() => undefined));
    event.respondWith(
      fetched
        .catch(async () => (await caches.match(request)) ?? caches.match("/")),
    );
    return;
  }

  if (
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/icons/") ||
    url.pathname === "/manifest.webmanifest"
  ) {
    const fetched = fetch(request);
    const refreshed = fetched.then((response) => {
      if (!response.ok) return;

      const copy = response.clone();
      return caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
    });

    event.waitUntil(refreshed.catch(() => undefined));
    event.respondWith(
      caches.match(request).then((cached) => cached ?? fetched),
    );
  }
});
