self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("static-cache-v1").then((cache) => {
      return cache
        .addAll([
          "/",
          "/index.html",
          "/styles.css",
          "/script.js",
          "/icons/essentia-192x192.png",
          "/icons/essentia-512x512.png",
          // Agrega aquí más recursos que quieras cachear y que sean válidos
        ])
        .catch((error) => {
          console.error("Error al agregar a la caché:", error);
        });
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== "static-cache-v1") {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
