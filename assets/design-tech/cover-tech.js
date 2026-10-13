(() => {
 const cover=document.querySelector('.intro-cover');
 if(!cover)return;
 const reduce=matchMedia('(prefers-reduced-motion:reduce)');
 const pointer=matchMedia('(hover:hover) and (pointer:fine)');
 let scrollFrame=0,pointerFrame=0;
 const clamp=(n,min,max)=>Math.min(max,Math.max(min,n));
 function update(){
  scrollFrame=0;
  if(reduce.matches||document.querySelector('.cover-sequence'))return;
  const r=cover.getBoundingClientRect();
  const progress=clamp(-r.top/(r.height*.85),0,1);
  cover.style.setProperty('--cover-scroll',`${-progress*22}px`);
  cover.style.setProperty('--cover-scale',String(1-progress*.045));
 }
 function scroll(){if(!scrollFrame&&!reduce.matches)scrollFrame=requestAnimationFrame(update);}
 function resetPointer(){cancelAnimationFrame(pointerFrame);pointerFrame=0;for(const v of ['--cover-x','--cover-y','--cover-rx','--cover-ry','--cover-light-x','--cover-light-y','--field-light-x','--field-light-y'])cover.style.removeProperty(v);}
 cover.addEventListener('pointermove',e=>{
  if(reduce.matches||!pointer.matches)return;
  const x=e.clientX,y=e.clientY;
  cancelAnimationFrame(pointerFrame);
  pointerFrame=requestAnimationFrame(()=>{
   const r=cover.getBoundingClientRect(),dx=clamp((x-r.left)/r.width-.5,-.5,.5),dy=clamp((y-r.top)/r.height-.5,-.5,.5);
   cover.style.setProperty('--cover-x',`${dx*10}px`);cover.style.setProperty('--cover-y',`${dy*8}px`);
   cover.style.setProperty('--cover-rx',`${-dy*3}deg`);cover.style.setProperty('--cover-ry',`${dx*3}deg`);
   cover.style.setProperty('--cover-light-x',`${x-r.left}px`);cover.style.setProperty('--cover-light-y',`${y-r.top}px`);
   cover.style.setProperty('--field-light-x',`${x-r.left-r.width*.025}px`);cover.style.setProperty('--field-light-y',`${y-r.top-r.height*.03}px`);
   pointerFrame=0;
  });
 },{passive:true});
 cover.addEventListener('pointerleave',resetPointer);
 addEventListener('scroll',scroll,{passive:true});addEventListener('resize',scroll,{passive:true});
 reduce.addEventListener('change',()=>{resetPointer();cancelAnimationFrame(scrollFrame);scrollFrame=0;cover.style.removeProperty('--cover-scroll');cover.style.removeProperty('--cover-scale');update();});
 pointer.addEventListener('change',resetPointer);update();
})();
