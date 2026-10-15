(() => {
 const video=document.querySelector('.intro-cover__video'), cover=document.querySelector('.intro-cover'), button=document.querySelector('.intro-cover__video-toggle');
 if(!video||!cover||!button)return;
 const reduce=matchMedia('(prefers-reduced-motion:reduce)');
 let userPaused=false,visible=true,failed=false;
 const allowed=()=>!reduce.matches&&!navigator.connection?.saveData;
 function label(){
  const paused=video.paused,lang=document.documentElement.lang;
  const labels=lang.startsWith('en')?['Play background video','Pause background video']:lang.startsWith('es')?['Reproducir vídeo de fondo','Pausar vídeo de fondo']:['Reproduzir vídeo de fundo','Pausar vídeo de fundo'];
  button.classList.toggle('is-paused',paused);button.setAttribute('aria-label',labels[paused?0:1]);button.title=labels[paused?0:1];
 }
 function sync(){
  if(!allowed()||failed){video.pause();button.hidden=true;return;}
  if(!video.getAttribute('src')){video.muted=true;video.src=video.dataset.src;}
  button.hidden=false;
  if(!visible||document.hidden||userPaused){video.pause();return;}
  video.play().catch(()=>{userPaused=true;label();});
 }
 button.addEventListener('click',()=>{userPaused=!userPaused;sync();label();});
 video.addEventListener('play',label);video.addEventListener('pause',label);
 video.addEventListener('error',()=>{failed=true;button.hidden=true;});
 new MutationObserver(label).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();},{threshold:0}).observe(cover);
 reduce.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);sync();
})();
