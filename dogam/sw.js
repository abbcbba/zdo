const C='dogam-r3-130d44a06d4a', A='dogam-assets';
const FILES=['./','index.html','manifest.webmanifest','icon-65c68678-180.png','icon-65c68678-192.png','icon-65c68678-512.png'];
const ASSETS=[];
let filling=null;
function fill(){ if(filling) return filling; filling=caches.open(A).then(async c=>{
  const have=new Set((await c.keys()).map(r=>new URL(r.url).pathname.split('/').pop()));
  const want=new Set(ASSETS.map(a=>a.split('/').pop()));
  for(const r of await c.keys()) if(!want.has(new URL(r.url).pathname.split('/').pop())) await c.delete(r);   // 옛 파일 정리
  const todo=ASSETS.filter(a=>!have.has(a.split('/').pop()));
  const run=async()=>{ while(todo.length){ const a=todo.shift(); try{ const r=await fetch(a); if(r.ok) await c.put(a,r); }catch(e){} } };
  await Promise.all([run(),run(),run(),run()]);
}).finally(()=>{ filling=null; }); return filling; }
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C&&k!==A).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('message',e=>{ if(e.data==='fill') e.waitUntil(fill()); });
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin) return;
  if(new URL(e.request.url).pathname.includes('/a/')){   // 나눈 파일: 저장본 먼저
    e.respondWith(caches.open(A).then(async c=>{ const hit=await c.match(e.request,{ignoreSearch:true}); if(hit) return hit;
      const r=await fetch(e.request); if(r.ok) c.put(e.request,r.clone()); return r; }));
    return;
  }
  e.respondWith(caches.open(C).then(async c=>{
    const hit=await c.match(e.request,{ignoreSearch:true});
    const net=fetch(e.request).then(r=>{if(r.ok) c.put(e.request,r.clone());return r;}).catch(()=>hit);
    if(e.request.mode==='navigate') return net.then(r=>r||hit);   // 게임 화면: 인터넷 되면 항상 새 버전, 안 되면 저장본
    return hit||net;
  }));
});
