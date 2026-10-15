(() => {
 const reduced=matchMedia('(prefers-reduced-motion:reduce)');
 if(reduced.matches||!('IntersectionObserver' in window))return;
 const targets=document.querySelectorAll('.profile>h1,.profile>.role,.profile>.bio,.profile-clubs,.summit-feature,.courses');
 const animations=new Set();
 const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
   if(!entry.isIntersecting)return;
   observer.unobserve(entry.target);
   if(reduced.matches||typeof entry.target.animate!=='function')return;
   const animation=entry.target.animate([{opacity:.15,transform:'translateY(10px)'},{opacity:1,transform:'none'}],{duration:560,easing:'cubic-bezier(.2,.7,.2,1)'});
   animations.add(animation);
   animation.finished.then(()=>animations.delete(animation)).catch(()=>animations.delete(animation));
  });
 },{threshold:.12});
 targets.forEach(target=>observer.observe(target));
 reduced.addEventListener('change',()=>{if(reduced.matches){observer.disconnect();animations.forEach(animation=>animation.cancel());animations.clear();}});
})();
