(() => {
 const toggle=document.querySelector('.menu-toggle'),menu=document.querySelector('.mobile-menu');
 function close(){toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Abrir menu');menu.hidden=true;}
 toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');menu.hidden=!open;});
 menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));document.addEventListener('keydown',e=>{if(e.key==='Escape'){close();}});
 if('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion:reduce)').matches){
  const targets=document.querySelectorAll('.section-heading,.registration-copy,.pitch-divider');
  document.documentElement.classList.add('motion-ready');
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-revealed');observer.unobserve(entry.target);}}),{threshold:.12});
  targets.forEach(target=>observer.observe(target));
 }
 const art=document.querySelector('.hero-art'),reduce=matchMedia('(prefers-reduced-motion:reduce)');let frame=0;
 art.addEventListener('pointermove',e=>{if(reduce.matches||!matchMedia('(hover:hover) and (pointer:fine)').matches)return;cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{const r=art.getBoundingClientRect();art.style.setProperty('--tilt-x',`${-(e.clientY-r.top-r.height/2)/r.height*2}deg`);art.style.setProperty('--tilt-y',`${(e.clientX-r.left-r.width/2)/r.width*2}deg`);});},{passive:true});
 art.addEventListener('pointerleave',()=>{cancelAnimationFrame(frame);art.style.removeProperty('--tilt-x');art.style.removeProperty('--tilt-y');});
})();
