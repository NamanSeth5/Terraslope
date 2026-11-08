const V="ts-v7",FILES=["./","index.html","terrain.txt","manifest.webmanifest","icon-192.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES.map(f=>new Request(f,{cache:"reload"})))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
 const r=e.request;if(r.method!=="GET")return;
 const page=r.mode==="navigate"||r.url.endsWith("index.html");
 if(page){e.respondWith(fetch(r,{cache:"no-cache"}).then(x=>{const c=x.clone();caches.open(V).then(h=>h.put(r,c));return x}).catch(()=>caches.match(r).then(m=>m||caches.match("index.html"))));return}
 e.respondWith(caches.match(r).then(m=>m||fetch(r)));
});
