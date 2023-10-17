//todos los archivos de la app propios
const STATIC = "staticv2";
const INMUTABLE = "inmutablev1";
const DYNAMIC = "dynamic1";
const APP_SHELL = [
  "/",
  "/index.html",
  "img/graduation.jpg",
  "js/app.js",
  "css/style.css",
  "img/p.jpg",
];

const APP_SHELL_INMUTABLE = [
  'https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous',
  "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
];

self.addEventListener("install", (e) => {
  console.log("Instalando...");
  const staticCache = caches.open(STATIC).then((cache) => {
    cache.addAll(APP_SHELL);
  });

  const inmutableCache = caches.open(INMUTABLE).then((cache) => {
    cache.addAll(APP_SHELL_INMUTABLE);
  });
  e.waitUntil(Promise.all([staticCache, inmutableCache]));
});

self.addEventListener("activate", (e) => {
  console.log("Activado");
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(e.request)
          .then((networkResponse) => {
            if (networkResponse.ok) {
              const clone = networkResponse.clone();
              caches.open(DYNAMIC)
                .then((cache) => {
                  cache.put(e.request, clone);
                });
            }

            return networkResponse;
          })
          .catch(() => {
            return caches.match("/pages/offline.html");
          });
      })
  );
});
