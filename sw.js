const V="cards-v3";
const SHELL=["./","./index.html","./manifest.json","./icon-192.png","./icon-512.png",
"https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js",
"https://cdn.jsdelivr.net/npm/exceljs@4.4.0/dist/exceljs.min.js"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(SHELL.map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  if(new URL(e.request.url).origin===location.origin){
    e.respondWith(fetch(e.request).then(r=>{if(r.ok){const c=r.clone();caches.open(V).then(ch=>ch.put(e.request,c));}return r;}).catch(()=>caches.match(e.request)));return;}
  e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(r=>{
    if(r&&(r.ok||r.type==="opaque")){const c=r.clone();caches.open(V).then(ch=>ch.put(e.request,c));}
    return r;}).catch(()=>hit)));
});
