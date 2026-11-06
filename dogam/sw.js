const C='dogam-r3-51ad519f73ab', A='dogam-assets';
const FILES=['./','index.html','manifest.webmanifest','icon-65c68678-180.png','icon-65c68678-192.png','icon-65c68678-512.png'];
const ASSETS=["a/c-fe3dc574d8.png", "a/c-e94d33f21d.png", "a/c-7f29e581b9.png", "a/c-9d37d6d698.png", "a/c-d21cf14043.png", "a/c-bcc100a483.png", "a/c-eab2720d22.png", "a/c-c2e884feee.png", "a/c-2119167c40.png", "a/c-1e58fb6fab.png", "a/c-6b54c2e0e2.png", "a/c-67013b9a5d.png", "a/c-5624d6ad63.png", "a/c-1ecd8652aa.png", "a/c-2e982c9d15.png", "a/c-3cbd288706.png", "a/c-3c0c46e834.png", "a/c-3fec9e4f35.png", "a/c-a6edf4b84a.png", "a/c-0405d615d0.png", "a/c-aa269d8ea7.png", "a/c-926696d714.png", "a/c-d4e4125d30.png", "a/c-703f5ef35d.png", "a/c-6afa3314b7.png", "a/c-8a0d506b2e.png", "a/c-b367f23a77.png", "a/c-9d843899d5.png", "a/c-6aa029ca08.png", "a/c-581bdf95f7.png", "a/c-59faab59a3.png", "a/c-f57e4394d2.png", "a/c-48691c59fe.png", "a/c-6b1957e34f.png", "a/c-b2037d29ea.png", "a/c-c1599d6fb4.png", "a/c-fb3839a521.png", "a/c-4990be94f2.png", "a/c-4dcdc22580.png", "a/c-df37c2d525.png", "a/c-ed2570c0a4.png", "a/c-2d29badb31.png", "a/c-eb46991cf6.png", "a/c-7b3b3d4ff0.png", "a/c-f009e97140.png", "a/c-477f14d804.png", "a/c-290f9026c5.png", "a/c-2478ae254a.png", "a/c-c61e60d5bf.png", "a/c-6039c5ded9.png", "a/c-2f9983e743.png", "a/c-99303de74c.png", "a/c-862966c8fd.png", "a/c-50b871d972.png", "a/c-9bf6e8357a.png", "a/c-435a876809.png", "a/c-e86d5b6839.png", "a/c-b2c7f3263d.png", "a/c-98537f51ef.png", "a/c-fce5323a4f.png", "a/c-7cc60018bd.png", "a/c-e6fee2bb61.png", "a/c-e833f09bb1.png", "a/c-a0d63b2b04.png", "a/c-13b24bed28.png", "a/c-ace1c1269c.png", "a/c-f1d8fe3013.png", "a/c-ca49ea6ea2.png", "a/c-2e6ec2db00.png", "a/c-3fc9900e01.png", "a/c-16ca99049f.png", "a/c-7312224ce9.png", "a/c-ce1e430e25.png", "a/c-01f66f4f8b.png", "a/c-8a7a9db2d5.png", "a/c-27a0c78e0d.png", "a/c-a4fc01a1a9.png", "a/c-aca322cc68.png", "a/c-2e8aec08a5.png", "a/c-890e78f647.png", "a/c-5488bcd6ba.png", "a/c-3e48455eb1.png", "a/c-aa7b739311.png", "a/c-657719462f.png", "a/c-4e8fd71962.png", "a/c-5d2a5fdfdc.png", "a/c-114b1eab5c.png", "a/c-d05bef8127.png", "a/c-7ac6552208.png", "a/c-c8880bcc4c.png", "a/c-7a27e2bf89.png", "a/c-672e7f638e.png", "a/c-552d4c570d.png", "a/c-702e13281b.png", "a/c-8aa24deba4.png", "a/c-af1cf9ddb5.png", "a/c-e56374c18c.png", "a/c-71939ae3f9.png", "a/c-acfdbc01ec.png", "a/c-decd47d411.png", "a/c-8dc1c87b92.png", "a/c-b37488f69d.png", "a/c-3aa2eae769.png", "a/c-3a35e7c5be.png", "a/c-b50f07c73a.png", "a/c-9d54f5d871.png", "a/c-16e626f0ff.png", "a/c-417464451e.png", "a/c-cfcccf3ebe.png", "a/c-1567768ce3.png", "a/c-a2435f94b5.png", "a/c-cb6b8a06b1.png", "a/c-3fdfebbf75.png", "a/c-a50afa96c2.png", "a/c-b36fa19229.png", "a/c-834034ce24.png", "a/c-cf08730ee1.png", "a/c-266fbdf6ee.png", "a/c-37ebf6c618.png", "a/c-414d01833b.png", "a/c-cdd2f7b88f.png", "a/c-55ad7cfe1d.png", "a/c-219ceb735d.png", "a/c-7036a9936e.png", "a/c-250eefc7cf.png", "a/c-a5f89097a7.png", "a/c-8f3017cdad.png", "a/c-85a806a3e1.png"];
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
