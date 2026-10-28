(() => {
 const reduce=matchMedia('(prefers-reduced-motion:reduce)');
 document.querySelectorAll('.club-carousel').forEach(carousel=>{
  const viewport=carousel.querySelector('.club-carousel__viewport'),track=viewport?.querySelector('ul');
  if(!viewport||!track)return;
  carousel.querySelectorAll('[data-clubs-toggle],.club-carousel__controls').forEach(control=>control.remove());
  if(carousel.hasAttribute('data-clubs-static')){viewport.setAttribute('aria-label','Clubes da trajetória');viewport.removeAttribute('tabindex');return;}
  viewport.setAttribute('aria-label','Clubes da trajetória; deslize ou use as setas do teclado para percorrer.');
  const originals=Array.from(track.children);
  if(!originals.length)return;
  originals.forEach(item=>{const clone=item.cloneNode(true);clone.setAttribute('aria-hidden','true');clone.setAttribute('data-club-clone','');clone.inert=true;clone.querySelectorAll('img').forEach(img=>{img.alt='';img.loading='eager';});track.appendChild(clone);});
  let visible=!('IntersectionObserver' in window),frame=0,last=0,position=viewport.scrollLeft,period=0;
  const playing=()=>!reduce.matches&&visible&&!document.hidden&&period>0;
  function sync(){cancelAnimationFrame(frame);frame=0;last=0;position=viewport.scrollLeft;if(playing())frame=requestAnimationFrame(step);}
  function measure(){const repeat=track.children[originals.length];period=repeat.getBoundingClientRect().left-track.children[0].getBoundingClientRect().left;sync();}
  function step(time){frame=0;if(!playing())return;const delta=last?Math.min(64,time-last):0;last=time;position=(position+delta*.024)%period;viewport.scrollLeft=position;frame=requestAnimationFrame(step);}
  viewport.addEventListener('scroll',()=>{if(!playing())position=viewport.scrollLeft;},{passive:true});
  document.addEventListener('visibilitychange',sync);reduce.addEventListener('change',measure);
  if('ResizeObserver' in window)new ResizeObserver(measure).observe(viewport);else window.addEventListener('resize',measure);
  if('IntersectionObserver' in window)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();},{threshold:0}).observe(viewport);
  measure();
 });
})();
