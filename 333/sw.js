const C='333-r3-33bae884fc24', A='333-assets';
const FILES=['./','index.html','manifest.webmanifest','icon-304fdd7e-180.png','icon-304fdd7e-192.png','icon-304fdd7e-512.png'];
const ASSETS=["voice/SG1_1.mp3", "voice/SG1_2.mp3", "voice/SG1_3.mp3", "voice/SG1_4.mp3", "voice/SG1_5.mp3", "voice/SG2_1.mp3", "voice/SG2_2.mp3", "voice/SG2_3.mp3", "voice/SG2_4.mp3", "voice/SG2_5.mp3", "voice/SG3_1.mp3", "voice/SG3_2.mp3", "voice/SG3_3.mp3", "voice/SG3_4.mp3", "voice/SG4_1.mp3", "voice/SG4_2.mp3", "voice/SG4_3.mp3", "voice/SG4_4.mp3", "voice/SG5_1.mp3", "voice/SG5_2.mp3", "voice/SG5_3.mp3", "voice/SG5_4.mp3", "voice/SG6_1.mp3", "voice/SG6_2.mp3", "voice/SG6_3.mp3", "voice/SG6_4.mp3", "voice/SG6_5.mp3", "voice/SG7_1.mp3", "voice/SG7_2.mp3", "voice/SG7_3.mp3", "voice/SG7_4.mp3", "voice/SG7_5.mp3", "voice/SG8_1.mp3", "voice/SG8_2.mp3", "voice/SG8_3.mp3", "voice/SG8_4.mp3", "voice/SGE_1.mp3", "voice/SGE_2.mp3", "voice/SGE_3.mp3", "voice/SGE_4.mp3", "voice/SGP_1.mp3", "voice/SGP_2.mp3", "voice/SGP_3.mp3", "voice/SGP_4.mp3", "voice/SGT_1.mp3"];
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
