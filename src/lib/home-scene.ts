// @ts-nocheck
import * as THREE from 'three';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
/** The exact source Three.js roof geometry and its scroll-scrubbed animation. */
export function mountHomeScene(){
 let disposed=false;let rafId=0;
 let onReady=()=>{};




const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
let mobile=matchMedia('(max-width:760px)').matches;
const canvas=document.getElementById('scene');
if(!canvas)return ()=>{};

let renderer;
try{ renderer=new THREE.WebGLRenderer({canvas,antialias:!mobile,alpha:false,powerPreference:'high-performance'}); }
catch(e){ document.documentElement.classList.add('no-webgl'); window.finishLoader?.(); }

if(renderer){
renderer.setPixelRatio(Math.min(devicePixelRatio,mobile?1.5:2));
renderer.outputColorSpace=THREE.SRGBColorSpace;
renderer.toneMapping=THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure=1.05;
renderer.shadowMap.enabled=true;
renderer.shadowMap.type=THREE.PCFSoftShadowMap;

const scene=new THREE.Scene();
scene.background=new THREE.Color('#070708');
scene.fog=new THREE.Fog('#070708',26,58);
const pmrem=new THREE.PMREMGenerator(renderer);
scene.environment=pmrem.fromScene(new RoomEnvironment(),0.04).texture;
scene.environmentIntensity=0.35;

const camera=new THREE.PerspectiveCamera(mobile?44:34,1,0.1,200);

/* ---------- lights: golden hour ---------- */
scene.add(new THREE.HemisphereLight('#ffe6b8','#0b0b10',0.35));
const sun=new THREE.DirectionalLight('#ffc874',3.2);
sun.position.set(-14,13,10);sun.castShadow=true;
sun.shadow.mapSize.set(mobile?1024:2048,mobile?1024:2048);
Object.assign(sun.shadow.camera,{left:-14,right:14,top:14,bottom:-14,near:1,far:60});
sun.shadow.camera.updateProjectionMatrix();sun.shadow.bias=-0.0006;sun.shadow.normalBias=0.03;
scene.add(sun);
const rim=new THREE.DirectionalLight('#e3a93c',1.6);rim.position.set(12,6,-12);scene.add(rim);
const fill=new THREE.DirectionalLight('#9fb4ff',0.25);fill.position.set(10,4,12);scene.add(fill);

/* ---------- ground ---------- */
const ground=new THREE.Mesh(new THREE.CircleGeometry(40,64),new THREE.MeshStandardMaterial({color:'#0d0d10',roughness:.95}));
ground.rotation.x=-Math.PI/2;ground.receiveShadow=true;scene.add(ground);
const grid=new THREE.GridHelper(60,60,'#e3a93c','#e3a93c');grid.material.transparent=true;grid.material.opacity=.07;grid.position.y=.01;scene.add(grid);
const ring=new THREE.Mesh(new THREE.RingGeometry(9.2,9.26,128),new THREE.MeshBasicMaterial({color:'#e3a93c',transparent:true,opacity:.35}));
ring.rotation.x=-Math.PI/2;ring.position.y=.02;scene.add(ring);

/* ---------- house dimensions ---------- */
const W=10, D=7, H=3, RISE=2.2, OV=0.6;
const half=D/2, pitch=Math.atan(RISE/half);
const L=(half+OV)/Math.cos(pitch);           // rafter length ridge->eave
const ridgeY=H+RISE;
const house=new THREE.Group();scene.add(house);

/* walls with gable ends (extruded profile) */
const prof=new THREE.Shape();
prof.moveTo(-half,0);prof.lineTo(half,0);prof.lineTo(half,H);prof.lineTo(0,ridgeY);prof.lineTo(-half,H);prof.lineTo(-half,0);
const wallGeo=new THREE.ExtrudeGeometry(prof,{depth:W,bevelEnabled:false});
wallGeo.translate(0,0,-W/2);
const wallMat=new THREE.MeshStandardMaterial({color:'#e9e1d2',roughness:.85});
const walls=new THREE.Mesh(wallGeo,wallMat);walls.rotation.y=Math.PI/2;walls.castShadow=walls.receiveShadow=true;house.add(walls);
// plinth
const plinth=new THREE.Mesh(new THREE.BoxGeometry(W+.3,.35,D+.3),new THREE.MeshStandardMaterial({color:'#6b3b2a',roughness:.9}));
plinth.position.y=.175;plinth.castShadow=plinth.receiveShadow=true;house.add(plinth);

/* windows + door (warm glow) */
const glowMat=new THREE.MeshStandardMaterial({color:'#2a1c0c',emissive:'#ffb653',emissiveIntensity:1.6,roughness:.3});
const frameMat=new THREE.MeshStandardMaterial({color:'#f4efe6',roughness:.6});
function win(x,z,w,h,y=1.65,rotY=0){
  const g=new THREE.Group();
  const f=new THREE.Mesh(new THREE.BoxGeometry(w+.18,h+.18,.08),frameMat);
  const gl=new THREE.Mesh(new THREE.BoxGeometry(w,h,.1),glowMat);
  const mull=new THREE.Mesh(new THREE.BoxGeometry(.05,h,.12),frameMat);
  const tr=new THREE.Mesh(new THREE.BoxGeometry(w,.05,.12),frameMat);
  g.add(f,gl,mull,tr);g.position.set(x,y,z);g.rotation.y=rotY;house.add(g);
}
[-3.4,-1.4,1.9,3.7].forEach(x=>win(x,half+.03,1.1,1.25));
[-3.2,0,3.2].forEach(x=>win(x,-half-.03,1.1,1.25));
win(W/2+.03,0,1.2,1.2,1.7,Math.PI/2);win(-W/2-.03,0,1.2,1.2,1.7,Math.PI/2);
const door=new THREE.Mesh(new THREE.BoxGeometry(1.05,2.1,.12),new THREE.MeshStandardMaterial({color:'#1c140d',roughness:.5}));
door.position.set(.25,1.4,half+.04);house.add(door);
const doorGlow=new THREE.Mesh(new THREE.BoxGeometry(.25,1.7,.13),glowMat);doorGlow.position.set(.25,1.4,half+.05);house.add(doorGlow);
const porchLight=new THREE.PointLight('#ffb653',6,7,2);porchLight.position.set(.25,2.75,half+.8);house.add(porchLight);

/* ---------- roof layers ---------- */
const timberMat=new THREE.MeshStandardMaterial({color:'#b98a57',roughness:.8});
const sarkMat=new THREE.MeshStandardMaterial({color:'#c9ccd1',metalness:.9,roughness:.35,side:THREE.DoubleSide});
const battenMat=new THREE.MeshStandardMaterial({color:'#8c939b',metalness:.7,roughness:.4});
const sheetMat=new THREE.MeshStandardMaterial({color:'#34373c',metalness:.55,roughness:.38,side:THREE.DoubleSide});
const ridgeMat=sheetMat;
const goldMat=new THREE.MeshStandardMaterial({color:'#e3a93c',metalness:.9,roughness:.25,emissive:'#e3a93c',emissiveIntensity:.15});
const layerMats=[timberMat,sarkMat,battenMat,sheetMat]; // highlight targets
layerMats.forEach(m=>{m.emissive=m.emissive||new THREE.Color();m.userData.baseEm=m.emissive.clone();});

// corrugated sheet geometry (local: x along ridge, z down-slope, +y outward)
function corrugated(width,length){
  const g=new THREE.PlaneGeometry(width,length,Math.round(width*14),1);
  g.rotateX(-Math.PI/2);
  const p=g.attributes.position;
  for(let i=0;i<p.count;i++){const x=p.getX(i);p.setY(i,Math.sin(x*Math.PI*2/0.38)*0.035);}
  g.computeVertexNormals();return g;
}

const sides=[];
function buildSide(dir){
  // pivot at ridge; children laid out along local +z (down-slope)
  const yaw=new THREE.Group();yaw.rotation.y=dir>0?0:Math.PI;yaw.position.y=ridgeY;house.add(yaw);
  const tilt=new THREE.Group();tilt.rotation.x=pitch;yaw.add(tilt);
  const layers=[new THREE.Group(),new THREE.Group(),new THREE.Group(),new THREE.Group()];
  layers.forEach(l=>tilt.add(l));
  // 0 rafters
  for(let x=-W/2;x<=W/2+.01;x+=1.0){
    const r=new THREE.Mesh(new THREE.BoxGeometry(.09,.22,L),timberMat);r.position.set(x,-.12,L/2);r.castShadow=true;layers[0].add(r);
  }
  const fascia=new THREE.Mesh(new THREE.BoxGeometry(W+1.2,.28,.06),timberMat);fascia.position.set(0,-.1,L);layers[0].add(fascia);
  // 1 sarking
  const s=new THREE.Mesh(new THREE.PlaneGeometry(W+1.2,L).rotateX(-Math.PI/2),sarkMat);s.position.set(0,.005,L/2);s.receiveShadow=true;layers[1].add(s);
  // 2 battens
  for(let z=.25;z<L;z+=.55){const b=new THREE.Mesh(new THREE.BoxGeometry(W+1.2,.05,.07),battenMat);b.position.set(0,.04,z);b.castShadow=true;layers[2].add(b);}
  // 3 sheets
  const sh=new THREE.Mesh(corrugated(W+1.2,L+.05),sheetMat);sh.position.set(0,.11,L/2);sh.castShadow=true;sh.receiveShadow=true;layers[3].add(sh);
  const edge=new THREE.Mesh(new THREE.BoxGeometry(W+1.25,.03,.05),goldMat);edge.position.set(0,.13,L+.02);layers[3].add(edge);
  sides.push({yaw,tilt,layers});
}
buildSide(1);buildSide(-1);

// ridge cap (two small sloped strips)
const ridgeCap=new THREE.Group();ridgeCap.position.y=ridgeY+.17;house.add(ridgeCap);
[1,-1].forEach(d=>{const m=new THREE.Mesh(new THREE.BoxGeometry(W+1.25,.03,.42),ridgeMat);m.rotation.x=d*pitch*.85;m.position.z=d*.18;m.castShadow=true;ridgeCap.add(m);});
const ridgeLine=new THREE.Mesh(new THREE.BoxGeometry(W+1.3,.035,.035),goldMat);ridgeLine.position.y=.05;ridgeCap.add(ridgeLine);

// gutters + downpipes
const gutterMat=new THREE.MeshStandardMaterial({color:'#2b2d31',metalness:.6,roughness:.4,side:THREE.DoubleSide});
const gutters=new THREE.Group();house.add(gutters);
const eaveZ=half+OV, eaveY=ridgeY-(half+OV)*Math.tan(pitch);
[1,-1].forEach(d=>{
  const g=new THREE.Mesh(new THREE.CylinderGeometry(.16,.16,W+1.2,20,1,true,Math.PI/2,Math.PI),gutterMat);
  g.rotation.z=Math.PI/2;g.position.set(0,eaveY-.22,d*(eaveZ+.12));g.castShadow=true;gutters.add(g);
  [-1,1].forEach(s=>{const p=new THREE.Mesh(new THREE.CylinderGeometry(.07,.07,eaveY-.2,10),gutterMat);p.position.set(s*(W/2+.35),(eaveY-.2)/2,d*(eaveZ+.12));p.castShadow=true;gutters.add(p);});
});

/* ---------- rain ---------- */
const RN=mobile?700:1600;
const rainGeo=new THREE.BufferGeometry();const rp=new Float32Array(RN*3);
for(let i=0;i<RN;i++){rp[i*3]=(Math.random()-.5)*30;rp[i*3+1]=Math.random()*18;rp[i*3+2]=(Math.random()-.5)*30;}
rainGeo.setAttribute('position',new THREE.BufferAttribute(rp,3));
const rainMat=new THREE.PointsMaterial({color:'#cfdcff',size:.09,transparent:true,opacity:0,depthWrite:false});
const rain=new THREE.Points(rainGeo,rainMat);scene.add(rain);

/* ---------- gold dust ---------- */
const DN=mobile?120:260;const dg=new THREE.BufferGeometry();const dp=new Float32Array(DN*3);
for(let i=0;i<DN;i++){dp[i*3]=(Math.random()-.5)*26;dp[i*3+1]=Math.random()*10;dp[i*3+2]=(Math.random()-.5)*26;}
dg.setAttribute('position',new THREE.BufferAttribute(dp,3));
const dust=new THREE.Points(dg,new THREE.PointsMaterial({color:'#f7d27c',size:.05,transparent:true,opacity:.55,depthWrite:false}));scene.add(dust);

/* ---------- state driven by scroll ---------- */
const S={theta:.75,radius:30,camY:8.6,tY:2.4,explode:0,focus:-1,rain:0,spin:0,tx:-7.4};
const baseTarget=new THREE.Vector3();
const sheetTarget=new THREE.Color('#34373c');

function apply(){
  // explode: lift roof, separate layers along roof normal
  sides.forEach(sd=>{
    sd.yaw.position.y=ridgeY+S.explode*2.2;
    sd.layers.forEach((l,i)=>{l.position.y=S.explode*i*.85;});
  });
  ridgeCap.position.y=ridgeY+.17+S.explode*(2.2+3*.85+.6);
  gutters.position.y=-S.explode*.2;
  gutters.scale.z=1+S.explode*.18;
  // highlight focused layer
  layerMats.forEach((m,i)=>{const k=Math.max(0,1-Math.abs(S.focus-i)*1.4);m.emissive.copy(m.userData.baseEm).lerp(new THREE.Color('#e3a93c'),k);m.emissiveIntensity=k*.55;});
  gutterMat.emissive=new THREE.Color('#e3a93c');gutterMat.emissiveIntensity=Math.max(0,1-Math.abs(S.focus-4)*1.4)*.5;
  rainMat.opacity=S.rain*.75;
}

function resize(){
  mobile=matchMedia('(max-width:760px)').matches;
  const w=canvas.clientWidth,h=canvas.clientHeight;
  renderer.setSize(w,h,false);camera.aspect=w/h;camera.fov=mobile?44:34;camera.updateProjectionMatrix();
}
addEventListener('resize',resize);resize();

let mx=0,my=0;
if(!mobile)addEventListener('pointermove',e=>{mx=(e.clientX/innerWidth-.5);my=(e.clientY/innerHeight-.5);});

const clock=new THREE.Clock();
function render(){
  const t=clock.getElapsedTime(), dt=Math.min(clock.getDelta(),.05);
  sheetMat.color.lerp(sheetTarget,.08);
  apply();
  // camera orbit
  const th=S.theta+S.spin+(reduce?0:Math.sin(t*.15)*.03)+mx*.12;
  const cy=S.camY-my*1.2;
  const R=S.radius*(mobile?1.3:1);
  camera.position.set(Math.sin(th)*R,cy,Math.cos(th)*R);
  baseTarget.set(0,S.tY+(mobile?-5.6:0),0);
  // shift the house right of text on desktop
  const right=new THREE.Vector3(Math.cos(th),0,-Math.sin(th));
  const tx=mobile?0:S.tx;camera.position.addScaledVector(right,tx);baseTarget.addScaledVector(right,tx);
  camera.lookAt(baseTarget);
  // rain fall
  if(S.rain>0.01){const a=rainGeo.attributes.position;for(let i=0;i<RN;i++){let y=a.getY(i)-0.35;if(y<0)y=18;a.setY(i,y);}a.needsUpdate=true;}
  dust.rotation.y=t*.02;dust.position.y=Math.sin(t*.3)*.2;
  renderer.render(scene,camera);
  if(!disposed)rafId=requestAnimationFrame(render);
}

/* ---------- colour swatches ---------- */
document.querySelectorAll('#swatches .sw').forEach(b=>b.addEventListener('click',()=>{
  document.querySelectorAll('#swatches .sw').forEach(x=>x.classList.remove('active'));b.classList.add('active');
  sheetTarget.set(b.dataset.c);
}));

/* ---------- start ---------- */
apply();renderer.render(scene,camera);
rafId=requestAnimationFrame(()=>{ if(!disposed){window.finishLoader?.();render();} });

onReady=()=>{
  if(!gsap||!ScrollTrigger){ return; }
  gsap.registerPlugin(ScrollTrigger);
  // intro camera fly-in
  gsap.from(S,{radius:S.radius+14,camY:16,theta:S.theta-1.1,duration:2.6,ease:'expo.out'});
  gsap.from('#c0 > *',{opacity:0,y:40,duration:1.1,stagger:.1,ease:'power3.out',delay:.4});
  gsap.set('#c0',{opacity:1});

  const chaps=[...document.querySelectorAll('.chap')];
  const hud=[...document.querySelectorAll('#hudSteps i')];
  const labels=['Scroll to explore','Inside your roof','Structure','Sarking & seals','Battens & ridge','Roof sheets','Gutters','Finished'];
  const setChap=i=>{chaps.forEach((c,k)=>c.classList.toggle('on',k===i));hud.forEach((h,k)=>h.classList.toggle('on',k===i));document.getElementById('hudLabel').textContent=labels[i];};

  const tl=gsap.timeline({defaults:{ease:'power2.inOut'},scrollTrigger:{trigger:'#story',start:'top top',end:'bottom bottom',scrub:1.2,
    onUpdate:self=>{document.getElementById('scrollHint').style.opacity=self.progress>.02?0:1;}}});
  const marks=[0,.85,2.2,3.5,4.8,6.1,7.4,8.8];let cur=-1;
  tl.eventCallback('onUpdate',()=>{const T=tl.time();let i=0;marks.forEach((m,k)=>{if(T>=m)i=k;});if(i!==cur){cur=i;setChap(i);}});
  const fadeOut=(i,at)=>tl.to(chaps[i],{opacity:0,y:-30,duration:.35},at);
  const fadeIn=(i,at)=>tl.fromTo(chaps[i],{opacity:0,y:40},{opacity:1,y:0,duration:.4},at);

  // 0 -> 1 : explode
  fadeOut(0,0.55);
  tl.to(S,{explode:1,theta:1.25,radius:27,camY:9.5,tY:4,duration:1},0.5);
  fadeIn(1,1.0);
  // 1 -> 2 : structure (rafters)
  fadeOut(1,1.9);
  tl.to(S,{focus:0,theta:2.1,radius:28,camY:8,tY:4.2,duration:1},1.8);
  fadeIn(2,2.35);
  // 2 -> 3 : sarking
  fadeOut(2,3.2);
  tl.to(S,{focus:1,theta:2.75,camY:11,tY:4.6,radius:28,duration:1},3.1);
  fadeIn(3,3.65);
  // 3 -> 4 : battens / ridge
  fadeOut(3,4.5);
  tl.to(S,{focus:2,theta:3.55,camY:10,tY:4.8,radius:28,duration:1},4.4);
  fadeIn(4,4.95);
  // 4 -> 5 : sheets (+ reassemble partly)
  fadeOut(4,5.8);
  tl.to(S,{focus:3,explode:.35,theta:4.1,camY:9,tY:3.8,radius:29,duration:1},5.7);
  fadeIn(5,6.25);
  // 5 -> 6 : gutters + rain
  fadeOut(5,7.1);
  tl.to(S,{focus:4,explode:0,theta:4.7,camY:4.5,tY:2.6,radius:23,rain:1,duration:1},7.0);
  fadeIn(6,7.55);
  // 6 -> 7 : finished hero shot
  fadeOut(6,8.4);
  tl.to(S,{focus:-1,rain:0,theta:2*Math.PI+.75,tY:2.4,radius:30,camY:8.6,duration:1.2},8.3);
  fadeIn(7,8.95);
  tl.to({}, {duration:.6});
};
window.addEventListener('spr:ready',onReady);
}
return ()=>{disposed=true;cancelAnimationFrame(rafId);renderer?.dispose();window.removeEventListener('spr:ready',onReady);};
}
