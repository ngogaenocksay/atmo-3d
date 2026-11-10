const C='a3d-2';
const clean=async r=>r.redirected?new Response(await r.blob(),{status:r.status,statusText:r.statusText,headers:r.headers}):r;
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(async c=>{for(const u of['index.html','manifest.webmanifest','icon-192.png','icon-512.png']){try{const r=await fetch(u);if(r.ok)await c.put(u,await clean(r))}catch(x){}}}));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==C).map(n=>caches.delete(n)))).then(()=>clients.claim())));
self.addEventListener('fetch',e=>{const q=e.request;if(q.method!=='GET')return;
if(q.mode==='navigate'){e.respondWith(fetch('index.html').then(clean).catch(()=>caches.match('index.html')));return}
e.respondWith(caches.match(q).then(r=>r||fetch(q).then(n=>{if(n.ok||n.type==='opaque'){const c=n.clone();caches.open(C).then(x=>x.put(q,c))}return n})))});
