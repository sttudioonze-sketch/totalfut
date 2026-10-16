(() => {
 const reduced=matchMedia('(prefers-reduced-motion:reduce)');
 if(reduced.matches||!('IntersectionObserver' in window))return;
 const targets=document.querySelectorAll('.portrait-caption h1,.portrait-caption .role,.profile-socials,.profile-about,.profile-clubs,.summit-feature,.courses>h2,.course-link');
 const animations=new Set();
 const observer=new IntersectionObserver(entries=>{
  entries.filter(entry=>entry.isIntersecting).forEach((entry,index)=>{
   observer.unobserve(entry.target);
   if(reduced.matches||typeof entry.target.animate!=='function')return;
   const animation=entry.target.animate([
    {opacity:.08,transform:'translateY(16px)'},
    {opacity:1,transform:'translateY(0)'}
   ],{duration:680,delay:Math.min(index*85,255),easing:'cubic-bezier(.16,1,.3,1)',fill:'backwards'});
   animations.add(animation);
   animation.finished.then(()=>animations.delete(animation)).catch(()=>animations.delete(animation));
  });
 },{threshold:.12});
 targets.forEach(target=>observer.observe(target));
 reduced.addEventListener('change',()=>{if(reduced.matches){observer.disconnect();animations.forEach(animation=>animation.cancel());animations.clear();}});
})();
