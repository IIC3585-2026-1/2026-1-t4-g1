const cacheName = "split-friends-v1";
const assets = [
    "/",
    "/index.html",
    "/js/app.js",
    "/css/styles.css",
    "/imgs/split_friends.png",
    "/imgs/new_member.png",
    "/imgs/new_tx.png",
    "/imgs/notification.png"
];

// Se instala el service worker y se guardan los assets en la caché.
self.addEventListener("install", (installEvent) => {
    console.log("Instalando Service Worker");
    installEvent.waitUntil(
        caches.open(cacheName).then(cache => {
            console.log("Service Worker guardando los assets en caché.");
            cache.addAll(assets);
        })
    );
});


// Solicitar recurso a la caché,
// si no está disponible se solicita y se guarda en caché.
self.addEventListener("fetch", (fetchEvent) => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request)
        .then((res) => {
            console.log(`Service Worker obteniendo recurso: ${fetchEvent.request.url}`);
            return (
                res ||
                fetch(fetchEvent.request)
                .then((response) => {
                    return caches.open(cacheName).then((cache) => {
                        console.log(
                            `Service Worker guardando nuevo recurso: ${fetchEvent.request.url}`
                        );
                        cache.put(fetchEvent.request, response.clone());
                        return response;
                    })
                })
            );
        })
    );
});