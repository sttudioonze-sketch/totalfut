(() => {
 const cover=document.querySelector('.intro-cover'),image=document.querySelector('.intro-cover__render');
 if(!cover||!image)return;
 const reduce=matchMedia('(prefers-reduced-motion:reduce)'),pointer=matchMedia('(any-hover:hover) and (any-pointer:fine)');
 const canvas=document.createElement('canvas');canvas.className='intro-cover__fluid-canvas';canvas.setAttribute('aria-hidden','true');image.parentElement.append(canvas);
 const gl=canvas.getContext('webgl',{alpha:true,premultipliedAlpha:false,antialias:false,depth:false});
 if(!gl)return;
 function shader(type,source){const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)){gl.deleteShader(s);return null;}return s;}
 const vertex=shader(gl.VERTEX_SHADER,'attribute vec2 position; varying vec2 uv; void main(){uv=vec2((position.x+1.)*.5,(1.-position.y)*.5);gl_Position=vec4(position,0.,1.);}');
 const fragment=shader(gl.FRAGMENT_SHADER,`precision mediump float;
 varying vec2 uv;uniform sampler2D logo;uniform vec4 points[12];uniform float time;
 void main(){vec2 offset=vec2(0.);float weights=0.;
 for(int i=0;i<12;i++){vec4 p=points[i];vec2 q=uv-p.xy;float c=cos(p.w),s=sin(p.w);vec2 local=vec2(c*q.x+s*q.y,-s*q.x+c*q.y);float zone=exp(-dot(local/vec2(.14,.065),local/vec2(.14,.065))*2.);float w=zone*p.z;
 vec2 direction=vec2(c,s);vec2 cross=vec2(-s,c);
 offset+=w*(direction*(.023*sin(local.y*72.+time*3.)) + cross*(.012*sin(local.x*48.-time*2.)));weights+=w;}
 offset/=max(1.,weights*.65);vec2 sampleUV=uv+offset;
 if(sampleUV.x<0.||sampleUV.x>1.||sampleUV.y<0.||sampleUV.y>1.)gl_FragColor=vec4(0.);else gl_FragColor=texture2D(logo,sampleUV);}`);
 if(!vertex||!fragment)return;
 const program=gl.createProgram();gl.attachShader(program,vertex);gl.attachShader(program,fragment);gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))return;gl.useProgram(program);
 const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
 const position=gl.getAttribLocation(program,'position');gl.enableVertexAttribArray(position);gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
 const texture=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,texture);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
 gl.uniform1i(gl.getUniformLocation(program,'logo'),0);
 const pointUniform=gl.getUniformLocation(program,'points[0]'),timeUniform=gl.getUniformLocation(program,'time'),data=new Float32Array(48);
 let ready=false,trail=[],frame=0,last=null;
 function load(){try{gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,image);ready=true;}catch{ready=false;}}
 if(image.complete&&image.naturalWidth)load();else image.addEventListener('load',load,{once:true});
 function reset(){cancelAnimationFrame(frame);frame=0;trail=[];last=null;canvas.classList.remove('is-active');image.classList.remove('is-fluid-source');}
 function draw(now){frame=0;trail=trail.filter(p=>now-p.time<720);if(!trail.length||!ready){reset();return;}
 const r=image.getBoundingClientRect(),size=Math.min(800,Math.max(320,Math.round(r.width*Math.min(devicePixelRatio,1.5))));if(canvas.width!==size){canvas.width=size;canvas.height=size;gl.viewport(0,0,size,size);}
 data.fill(0);trail.slice(-12).forEach((p,i)=>{const life=1-(now-p.time)/720;data.set([p.x,p.y,life*life*(3-2*life),p.angle],i*4);});
 gl.uniform4fv(pointUniform,data);gl.uniform1f(timeUniform,now*.001);gl.drawArrays(gl.TRIANGLES,0,6);
 canvas.classList.add('is-active');image.classList.add('is-fluid-source');frame=requestAnimationFrame(draw);}
 cover.addEventListener('pointermove',e=>{if(!ready||reduce.matches||!pointer.matches||e.pointerType==='touch')return;
 const r=image.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;if(x<0||x>1||y<0||y>1){last=null;return;}
 if(last&&Math.hypot(x-last.x,y-last.y)<.007)return;
 const now=performance.now(),distance=last?Math.hypot(x-last.x,y-last.y):0,angle=last?Math.atan2(y-last.y,x-last.x):0;
 const steps=last?Math.min(4,Math.max(1,Math.ceil(distance/.035))):1;
 for(let i=1;i<=steps;i++){const t=i/steps;trail.push({x:last?last.x+(x-last.x)*t:x,y:last?last.y+(y-last.y)*t:y,time:now-(1-t)*40,angle});}
 trail=trail.slice(-12);last={x,y};if(!frame)frame=requestAnimationFrame(draw);
 },{passive:true});
 cover.addEventListener('pointerleave',()=>{last=null;});reduce.addEventListener('change',reset);pointer.addEventListener('change',reset);addEventListener('scroll',reset,{passive:true});document.addEventListener('visibilitychange',()=>{if(document.hidden)reset();});canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();ready=false;reset();});
})();
