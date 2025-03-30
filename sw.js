const CACHE_NAME = 'nagoya-trip-v1';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

const STATIC_ASSETS = [
    '/nagoya-trip-planner/',
    '/nagoya-trip-planner/index.html',
    '/nagoya-trip-planner/styles.css',
    '/nagoya-trip-planner/manifest.json',
    '/nagoya-trip-planner/day1.html',
    '/nagoya-trip-planner/day2.html',
    '/nagoya-trip-planner/day3.html',
    '/nagoya-trip-planner/day4.html',
    '/nagoya-trip-planner/day5.html',
    '/nagoya-trip-planner/day6.html',
    '/nagoya-trip-planner/day7.html',
    '/nagoya-trip-planner/icons/icon-72x72.png',
    '/nagoya-trip-planner/icons/icon-96x96.png',
    '/nagoya-trip-planner/icons/icon-128x128.png',
    '/nagoya-trip-planner/icons/icon-144x144.png',
    '/nagoya-trip-planner/icons/icon-152x152.png',
    '/nagoya-trip-planner/icons/icon-192x192.png',
    '/nagoya-trip-planner/icons/icon-384x384.png',
    '/nagoya-trip-planner/icons/icon-512x512.png',
    '/nagoya-trip-planner/icons/today.png',
    '/nagoya-trip-planner/icons/saved.png'
];

// Install Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        Promise.all([
            caches.open(STATIC_CACHE).then(cache => cache.addAll(STATIC_ASSETS)),
            caches.open(DYNAMIC_CACHE),
            self.skipWaiting()
        ])
    );
});

// Activate Service Worker
self.addEventListener('activate', event => {
    event.waitUntil(
        Promise.all([
            self.clients.claim(),
            caches.keys().then(keys => {
                return Promise.all(
                    keys.map(key => {
                        if (key !== STATIC_CACHE && key !== DYNAMIC_CACHE) {
                            return caches.delete(key);
                        }
                    })
                );
            })
        ])
    );
});

// Fetch Event
self.addEventListener('fetch', event => {
    // Handle API requests
    if (event.request.url.includes('/api/')) {
        event.respondWith(
            fetch(event.request)
                .then(response => {
                    const clonedResponse = response.clone();
                    caches.open(DYNAMIC_CACHE).then(cache => {
                        cache.put(event.request, clonedResponse);
                    });
                    return response;
                })
                .catch(() => {
                    return caches.match(event.request);
                })
        );
        return;
    }

    // Handle static assets
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request)
                    .then(response => {
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        const responseToCache = response.clone();
                        caches.open(DYNAMIC_CACHE)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });
                        return response;
                    });
            })
    );
});

// Push Notification
self.addEventListener('push', event => {
    const options = {
        body: event.data.text(),
        icon: '/icons/icon-192x192.png',
        badge: '/icons/badge.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'View Itinerary',
                icon: '/icons/checkmark.png'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/icons/xmark.png'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('Nagoya Trip Planner', options)
    );
});

// Notification Click
self.addEventListener('notificationclick', event => {
    event.notification.close();

    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
}); 