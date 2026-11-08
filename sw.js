// Service worker mínimo: hace la web instalable como app. Los datos siempre se piden a la red.
// v28f: la página se pide siempre a la red sin caché del navegador (antes el iPhone podía seguir con el index viejo)
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  if (e.request.mode !== 'navigate') return;
  e.respondWith(fetch(e.request.url, { cache: 'no-store', credentials: 'same-origin' }).catch(() => new Response(
    '<meta name="viewport" content="width=device-width"><p style="font-family:sans-serif;text-align:center;margin-top:40vh">Sin conexión. Vuelve a abrir TAF cuando tengas internet.</p>',
    { headers: { 'Content-Type': 'text/html; charset=utf-8' } })));
});

// Avisos al móvil (Firebase): muestra los que llegan con la app cerrada. Si Firebase no carga, la app sigue funcionando
try {
  importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js', 'https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');
  firebase.initializeApp({ apiKey: 'AIzaSyCQ5EfwfT6nL5hgKgrdeUeyqS9UI801jic', authDomain: 'taf-app-c9455.firebaseapp.com', projectId: 'taf-app-c9455', storageBucket: 'taf-app-c9455.firebasestorage.app', messagingSenderId: '968765189360', appId: '1:968765189360:web:48fac0424b4717eca32635' });
  firebase.messaging();
} catch (e) { }
