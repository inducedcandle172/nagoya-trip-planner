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
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
    'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
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