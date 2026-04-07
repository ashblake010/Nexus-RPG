// NEXUS RPG — Service Worker v1.0
const CACHE = 'nexus-v1';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './data_game.js',
  './data_sprites.js',
  './data_tiles.js',
  './data_assets.js',
  './engine.js',
  './ui.js',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});