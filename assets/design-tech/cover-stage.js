(() => {
 const stage=document.querySelector('.cover-sequence'),cover=document.querySelector('.intro-cover');
 if(!stage||!cover)return;
 const reduce=matchMedia('(prefers-reduced-motion:reduce)');
 let frame=0;
 const clamp=n=>Math.min(1,Math.max(0,n));
 function update(){
  frame=0;
  const span=Math.max(1,stage.offsetHeight-cover.offsetHeight);
  const raw=reduce.matches?0:clamp(-stage.getBoundingClientRect().top/span);
  const p=raw*raw*(3-2*raw);
  cover.style.setProperty('--cover-scroll',`${-p*24}px`);
  cover.style.setProperty('--cover-scale',String(1-p*.08));
  cover.style.setProperty('--cover-opacity',String(1-p*.78));
  cover.style.setProperty('--cover-title-scroll',`${-p*16}px`);
 }
 function queue(){if(!frame)frame=requestAnimationFrame(update);}
 addEventListener('scroll',queue,{passive:true});addEventListener('resize',queue,{passive:true});reduce.addEventListener('change',queue);update();
})();
