(() => {
 const toggle=document.querySelector('.menu-toggle'),menu=document.querySelector('.mobile-menu');
 function close(){toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Abrir menu');menu.hidden=true;}
 toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');menu.hidden=!open;});
 menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));document.addEventListener('keydown',e=>{if(e.key==='Escape'){close();}});
 if('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion:reduce)').matches){
  const targets=document.querySelectorAll('.section-heading,.registration-copy,.pitch-divider,.schedule-grid article');
  document.documentElement.classList.add('motion-ready');
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-revealed');observer.unobserve(entry.target);}}),{threshold:.12});
  targets.forEach(target=>observer.observe(target));
 }
 const motionAllowed=matchMedia('(prefers-reduced-motion:reduce)'),finePointer=matchMedia('(hover:hover) and (pointer:fine)');
 const stadium=document.querySelector('.hero-stadium');let stadiumFrame=0,stadiumVisible=true;
 if('IntersectionObserver' in window){new IntersectionObserver(entries=>{stadiumVisible=entries[0].isIntersecting;}).observe(stadium);}
 function updateStadium(){stadiumFrame=0;if(motionAllowed.matches||!finePointer.matches||!stadiumVisible)return;const rect=stadium.getBoundingClientRect();stadium.style.setProperty('--stadium-shift',`${Math.max(-16,Math.min(16,-rect.top*.035))}px`);}
 window.addEventListener('scroll',()=>{if(!stadiumFrame&&stadiumVisible&&!motionAllowed.matches&&finePointer.matches)stadiumFrame=requestAnimationFrame(updateStadium);},{passive:true});
 motionAllowed.addEventListener('change',()=>{if(motionAllowed.matches)stadium.style.removeProperty('--stadium-shift');});
 document.querySelectorAll('.ticket-lot').forEach(card=>{let lightFrame=0;card.addEventListener('pointermove',e=>{if(motionAllowed.matches||!finePointer.matches)return;cancelAnimationFrame(lightFrame);lightFrame=requestAnimationFrame(()=>{const r=card.getBoundingClientRect();card.style.setProperty('--light-x',`${e.clientX-r.left}px`);card.style.setProperty('--light-y',`${e.clientY-r.top}px`);});},{passive:true});card.addEventListener('pointerleave',()=>cancelAnimationFrame(lightFrame));});
 const art=document.querySelector('.hero-art'),reduce=matchMedia('(prefers-reduced-motion:reduce)');let frame=0;
 art.addEventListener('pointermove',e=>{if(reduce.matches||!matchMedia('(hover:hover) and (pointer:fine)').matches)return;cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{const r=art.getBoundingClientRect();art.style.setProperty('--tilt-x',`${-(e.clientY-r.top-r.height/2)/r.height*2}deg`);art.style.setProperty('--tilt-y',`${(e.clientX-r.left-r.width/2)/r.width*2}deg`);});},{passive:true});
 art.addEventListener('pointerleave',()=>{cancelAnimationFrame(frame);art.style.removeProperty('--tilt-x');art.style.removeProperty('--tilt-y');});
})();
