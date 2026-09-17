// Service Worker - Samuel & Viviana wedding site
// Strategy: network-first for the app shell (HTML/CSS/JS) so guests always get the
// latest program/info before the event; cache-first for media and web fonts.

const CACHE_VERSION = 'sv-wedding-v1';
const SHELL_CACHE = `${CACHE_VERSION}-shell`;
const MEDIA_CACHE = `${CACHE_VERSION}-media`;

const SHELL_URLS = [
    './',
    './index.html',
    './styles.css',
    './script.js',
    './translations.js',
    './program-data.js',
    './manifest.webmanifest'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(SHELL_CACHE)
            .then((cache) => cache.addAll(SHELL_URLS))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => Promise.all(
            keys
                .filter((key) => key.startsWith('sv-wedding-') && key !== SHELL_CACHE && key !== MEDIA_CACHE)
                .map((key) => caches.delete(key))
        )).then(() => self.clients.claim())
    );
});

function isMediaRequest(request) {
    return request.destination === 'image' || request.destination === 'font';
}

async function networkFirst(request) {
    try {
        const response = await fetch(request);
        const cache = await caches.open(SHELL_CACHE);
        cache.put(request, response.clone());
        return response;
    } catch (err) {
        const cached = await caches.match(request);
        if (cached) return cached;
        if (request.mode === 'navigate') {
            return caches.match('./index.html');
        }
        throw err;
    }
}

async function cacheFirst(request) {
    const cached = await caches.match(request);
    if (cached) return cached;

    const response = await fetch(request);
    const cache = await caches.open(MEDIA_CACHE);
    cache.put(request, response.clone());
    return response;
}

self.addEventListener('fetch', (event) => {
    const { request } = event;

    // Only handle same-origin GET requests; let everything else (PayPal, Google Maps, fonts CDN) pass through
    if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) {
        return;
    }

    if (isMediaRequest(request)) {
        event.respondWith(cacheFirst(request));
    } else {
        event.respondWith(networkFirst(request));
    }
});
