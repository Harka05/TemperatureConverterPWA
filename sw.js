const CACHE_NAME = `temperature-converter-v1`; 
 
// Use the install event to pre-cache all initial resources. 
self.addEventListener('install', event => { 
  event.waitUntil((async () => { 
    const cache = await caches.open(CACHE_NAME); 
    cache.addAll([ 
      '/', 
      '/converter.js', 
      '/converter.css' 
    ]); 
  })()); 
}); 
 
self.addEventListener('fetch', event => { 
  event.respondWith((async () => { 
    const cache = await caches.open(CACHE_NAME); 
 
    // Get the resource from the cache. 
    const cachedResponse = await cache.match(event.request); 
    if (cachedResponse) { 
      return cachedResponse; 
    } else { 
        try { 
          // If the resource was not in the cache, try the network. 
          const fetchResponse = await fetch(event.request); 
 
          // Save the resource in the cache and return it. 
          cache.put(event.request, fetchResponse.clone()); 
          return fetchResponse; 
        } catch (e) { 
          // The network failed. 
        } 
    } 
  })()); 
});
const CACHE_NAME = 'temperature-converter-v1';
const FILES_TO_CACHE = [
  './',
  './index.html',
  './converter.js',
  './converter.css',
  './manifest.json',
  './icon512.png'
];

self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching app files...');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('Deleting old cache:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});
