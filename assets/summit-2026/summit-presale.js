(() => {
 const carousel=document.querySelector('.club-carousel'),viewport=carousel?.querySelector('.club-carousel__viewport'),track=viewport?.querySelector('ul'),toggle=carousel?.querySelector('[data-clubs-toggle]');
 if(!carousel||!viewport||!track||!toggle)return;
 const reduce=matchMedia('(prefers-reduced-motion:reduce)'),fine=matchMedia('(hover:hover) and (pointer:fine)'),originals=Array.from(track.children);
 if(!originals.length)return;
 originals.forEach(item=>{const clone=item.cloneNode(true);clone.setAttribute('aria-hidden','true');clone.setAttribute('data-club-clone','');clone.inert=true;clone.querySelectorAll('img').forEach(img=>{img.alt='';img.loading='eager';});track.appendChild(clone);});
 let userPaused=false,hovered=false,focused=false,touching=false,visible=!('IntersectionObserver' in window),frame=0,last=0,position=viewport.scrollLeft,period=0,touchTimer=0;
 const playing=()=>!reduce.matches&&!userPaused&&!hovered&&!focused&&!touching&&visible&&!document.hidden&&period>0;
 function label(){toggle.hidden=reduce.matches;toggle.classList.toggle('is-paused',userPaused);toggle.setAttribute('aria-label',userPaused?'Retomar movimento dos escudos':'Pausar movimento dos escudos');toggle.title=toggle.getAttribute('aria-label');}
 function sync(){cancelAnimationFrame(frame);frame=0;last=0;position=viewport.scrollLeft;if(playing())frame=requestAnimationFrame(step);label();}
 function measure(){const repeat=track.children[originals.length];period=repeat.getBoundingClientRect().left-track.children[0].getBoundingClientRect().left;sync();}
 function step(time){frame=0;if(!playing())return;const delta=last?Math.min(64,time-last):0;last=time;position=(position+delta*.024)%period;viewport.scrollLeft=position;frame=requestAnimationFrame(step);}
 toggle.addEventListener('click',()=>{userPaused=!userPaused;sync();});
 carousel.addEventListener('pointerenter',()=>{if(fine.matches){hovered=true;sync();}});
 carousel.addEventListener('pointerleave',()=>{hovered=false;sync();});
 viewport.addEventListener('focusin',()=>{focused=true;sync();});
 viewport.addEventListener('focusout',e=>{focused=viewport.contains(e.relatedTarget);sync();});
 viewport.addEventListener('pointerdown',()=>{clearTimeout(touchTimer);touching=true;sync();});
 function release(){if(!touching)return;clearTimeout(touchTimer);touchTimer=setTimeout(()=>{touching=false;sync();},2200);}
 window.addEventListener('pointerup',release,{passive:true});window.addEventListener('pointercancel',release,{passive:true});
 viewport.addEventListener('scroll',()=>{if(!playing())position=viewport.scrollLeft;},{passive:true});
 document.addEventListener('visibilitychange',sync);reduce.addEventListener('change',measure);
 if('ResizeObserver' in window)new ResizeObserver(measure).observe(viewport);else window.addEventListener('resize',measure);
 if('IntersectionObserver' in window)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();},{threshold:0}).observe(viewport);
 measure();
})();
