(() => {
 const timers=Array.from(document.querySelectorAll('[data-summit-countdown]'));
 if(!timers.length)return;
 const words={pt:{title:'O encontro começa em',units:['dias','horas','minutos','segundos'],started:'O Summit já começou',label:'Contagem regressiva para o Summit'},en:{title:'The event starts in',units:['days','hours','minutes','seconds'],started:'The Summit has started',label:'Countdown to the Summit'},es:{title:'El encuentro comienza en',units:['días','horas','minutos','segundos'],started:'El Summit ya comenzó',label:'Cuenta regresiva para el Summit'}};
 function update(){
  const lang=(document.documentElement.lang||'pt').slice(0,2),copy=words[lang]||words.pt;
  timers.forEach(timer=>{
   const target=Date.parse(timer.dataset.summitCountdown);if(!Number.isFinite(target))return;
   const seconds=Math.max(0,Math.floor((target-Date.now())/1000)),values=[Math.floor(seconds/86400),Math.floor(seconds/3600)%24,Math.floor(seconds/60)%60,seconds%60];
   timer.querySelector('[data-countdown-title]').textContent=seconds?copy.title:copy.started;
   const digits=timer.querySelector('.summit-countdown__digits');digits.hidden=!seconds;
   timer.querySelectorAll('[data-countdown-value]').forEach((el,i)=>{const value=String(values[i]).padStart(2,'0');if(el.textContent!==value)el.textContent=value;});
   timer.querySelectorAll('[data-countdown-unit]').forEach((el,i)=>{el.textContent=copy.units[i];});
   timer.setAttribute('aria-label',copy.label+': '+values.map((value,i)=>value+' '+copy.units[i]).join(', '));
  });
 }
 let interval=0;function start(){clearInterval(interval);update();if(!document.hidden)interval=setInterval(update,1000);}
 document.addEventListener('visibilitychange',start);
 new MutationObserver(update).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});start();
})();
