const CACHE_NAME = 'roguelike-v3';
const ASSETS = [
  '/dashboard/roguelike/',
  '/dashboard/roguelike/index.html',
  '/dashboard/roguelike/manifest.json',
  '/dashboard/roguelike/assets/sprites/warrior.png',
  '/dashboard/roguelike/assets/sprites/rat.png',
  '/dashboard/roguelike/assets/sprites/gnoll.png',
  '/dashboard/roguelike/assets/sprites/snake.png',
  '/dashboard/roguelike/assets/sprites/crab.png',
  '/dashboard/roguelike/assets/sprites/skeleton.png',
  '/dashboard/roguelike/assets/environment/tiles_sewers.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
