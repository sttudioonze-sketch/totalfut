(() => {
 const cover=document.querySelector('.intro-cover'),logo=document.querySelector('.intro-cover__render');
 const zone=document.getElementById('logo-fluid-zone'),warp=document.getElementById('logo-fluid-warp');
 if(!cover||!logo||!zone||!warp)return;
 const reduce=matchMedia('(prefers-reduced-motion:reduce)'),pointer=matchMedia('(hover:hover) and (pointer:fine)');
 let trail=[],frame=0,last=null;
 function reset(){cancelAnimationFrame(frame);frame=0;trail=[];last=null;warp.setAttribute('scale','0');logo.classList.remove('is-fluid');}
 function draw(now){
  frame=0;trail=trail.filter(p=>now-p.time<680);
  if(!trail.length){reset();return;}
  const circles=trail.map(p=>{const life=1-(now-p.time)/680;return `<ellipse cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" rx="${(p.radius*1.4).toFixed(1)}" ry="${(p.radius*.6).toFixed(1)}" transform="rotate(${p.angle.toFixed(1)} ${p.x.toFixed(1)} ${p.y.toFixed(1)})" fill="url(#fade)" opacity="${(life*life*(3-2*life)).toFixed(3)}"/>`;}).join('');
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><defs><radialGradient id="fade"><stop stop-color="white"/><stop offset="1" stop-color="white" stop-opacity="0"/></radialGradient></defs>${circles}</svg>`;
  zone.setAttribute('href','data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg));
  warp.setAttribute('scale',String(Math.min(31,17+trail.length)));
  logo.classList.add('is-fluid');frame=requestAnimationFrame(draw);
 }
 cover.addEventListener('pointermove',e=>{
  if(reduce.matches||!pointer.matches)return;
  const r=logo.getBoundingClientRect();
  if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom){last=null;return;}
  const now=performance.now(),x=(e.clientX-r.left)/r.width*256,y=(e.clientY-r.top)/r.height*256;
  if(last&&Math.hypot(x-last.x,y-last.y)<2)return;
  const speed=last?Math.hypot(x-last.x,y-last.y):5;
  const angle=last?Math.atan2(y-last.y,x-last.x)*180/Math.PI:0;
  const radius=Math.min(35,20+speed*.25);
  if(last){
   const steps=Math.min(5,Math.max(1,Math.ceil(speed/7)));
   for(let i=1;i<=steps;i++){const t=i/steps;trail.push({x:last.x+(x-last.x)*t,y:last.y+(y-last.y)*t,time:now-(1-t)*35,radius,angle});}
  }else{trail.push({x,y,time:now,radius,angle});}
  trail=trail.slice(-24);last={x,y};
  if(!frame)frame=requestAnimationFrame(draw);
 },{passive:true});
 cover.addEventListener('pointerleave',()=>{last=null;},{passive:true});
 reduce.addEventListener('change',reset);pointer.addEventListener('change',reset);
 addEventListener('scroll',reset,{passive:true});document.addEventListener('visibilitychange',()=>{if(document.hidden)reset();});
})();
