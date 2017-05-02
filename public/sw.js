const CACHE_VERSION = 'app_sw_v0.0.1';

const cacheUrls = [
    '/',
];

this.addEventListener('install', function (event) {
    console.log('sw  install', event);
    event.waitUntil(
        caches.open(CACHE_VERSION)
            .then(function (cache) {
                return cache.addAll(cacheUrls);
            }),
    );
});

this.addEventListener('fetch', function (event) {
    console.log('sw  fetch', event);
    event.respondWith(
        caches.match(event.request).then(function (cachedResponse) {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request);
        }),
    );
});
