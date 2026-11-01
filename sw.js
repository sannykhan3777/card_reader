const V="cards-v1";
const SHELL=["./","./index.html","./manifest.json","./icon-192.png","./icon-512.png",
"https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js",
"https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(SHELL.map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(r=>{
    if(r&&(r.ok||r.type==="opaque")){const c=r.clone();caches.open(V).then(ch=>ch.put(e.request,c));}
    return r;}).catch(()=>hit)));
});
