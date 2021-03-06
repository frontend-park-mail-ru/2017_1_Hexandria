const CACHE_VERSION = 'app_sw_v0.0.2';

const cacheUrls = [
    '/singleplayer',
    '/multiplayer',
    '/about',
    '/scoreboard',
    '/login',
    '/signup',
    '/',

    '/index.html',
    '/css/app.css',
    '/js/app.js',
    '/js/vendor.js',
    '/fonts/lato-v13-latin.woff2',
    '/fonts/lato-v13-latin-ext.woff2',
    '/models/tower.obj',
    '/models/capital.obj',
    '/models/knight.obj',
    '/img/hexagon.svg',
    '/img/sad.svg',
    '/img/password.svg',
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
