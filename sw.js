const CACHE_NAME = 'nagoya-trip-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/manifest.json',
    '/translations.js',
    '/day1.html',
    '/day2.html',
    '/day3.html',
    '/day4.html',
    '/day5.html',
    '/day6.html',
    '/day7.html',
    '/travelers.html',
    '/duration.html',
    '/budget.html',
    '/itinerary.html',
    '/icons/icon-192x192.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
}); 