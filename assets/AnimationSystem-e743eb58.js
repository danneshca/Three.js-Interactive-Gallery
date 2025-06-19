import{j as e,C as H,r as m,O as K,T,u as G}from"./react-three-vendor-611369f6.js";import{u as B}from"./leva.esm-82acce57.js";import{d as u}from"./style-vendor-32f1d845.js";import{aH as V,au as v,aI as y,M as j,aJ as I,aK as d,aL as F,aM as R,e as S,aF as z}from"./three-vendor-1aa2ed72.js";import{m as D}from"./animation-vendor-a22bc070.js";const O=u.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  position: relative;
  padding-top: 80px;
`,X=u.div`
  flex: 1;
  height: calc(100vh - 80px);
  position: relative;
`,Y=u(D.div)`
  width: 350px;
  background: rgba(26, 26, 26, 0.95);
  backdrop-filter: blur(20px);
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem;
  overflow-y: auto;
  z-index: 100;
`,q=u.h2`
  color: var(--accent-color);
  font-size: 1.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`,L=u.p`
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
`,M=u.ul`
  color: var(--text-secondary);
  margin-left: 1rem;
  
  li {
    margin-bottom: 0.5rem;
    
    code {
      background: rgba(0, 255, 255, 0.1);
      color: var(--accent-color);
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      font-size: 0.9rem;
    }
  }
`,Q=u.details`
  margin-top: 2rem;
  
  summary {
    color: var(--accent-color);
    cursor: pointer;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  
  pre {
    background: rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 1rem;
    overflow-x: auto;
    font-size: 0.8rem;
    color: var(--text-secondary);
  }
`;function J({animationType:s,animationSpeed:p}){const r=m.useRef(),i=m.useRef(),c=m.useMemo(()=>{const t=new V,n=new v(1,1.5,.5),a=new y({color:"#4a90e2"}),l=new j(n,a);l.position.y=0,t.add(l);const o=new v(.8,.8,.8),h=new y({color:"#5ba3f5"}),x=new j(o,h);x.position.y=1.15,t.add(x);const f=new v(.3,1,.3),g=new y({color:"#357abd"}),b=new j(f,g);b.position.set(-.8,.25,0),b.name="leftArm",t.add(b);const P=new j(f,g);P.position.set(.8,.25,0),P.name="rightArm",t.add(P);const C=new v(.4,1.2,.4),E=new y({color:"#2c5aa0"}),A=new j(C,E);A.position.set(-.3,-1.35,0),A.name="leftLeg",t.add(A);const k=new j(C,E);return k.position.set(.3,-1.35,0),k.name="rightLeg",t.add(k),t},[]),w=m.useMemo(()=>{const t=[],n=new I("walking",2,[new d("leftArm.rotation[x]",[0,.5,1,1.5,2],[0,Math.PI/4,0,-Math.PI/4,0]),new d("rightArm.rotation[x]",[0,.5,1,1.5,2],[0,-Math.PI/4,0,Math.PI/4,0]),new d("leftLeg.rotation[x]",[0,.5,1,1.5,2],[0,-Math.PI/6,0,Math.PI/6,0]),new d("rightLeg.rotation[x]",[0,.5,1,1.5,2],[0,Math.PI/6,0,-Math.PI/6,0])]),a=new I("waving",1,[new d("rightArm.rotation[z]",[0,.25,.5,.75,1],[0,Math.PI/3,Math.PI/6,Math.PI/3,0]),new d("rightArm.rotation[x]",[0,.25,.5,.75,1],[0,Math.PI/6,0,Math.PI/6,0])]),l=new I("dancing",2,[new d(".rotation[y]",[0,.5,1,1.5,2],[0,Math.PI/4,0,-Math.PI/4,0]),new d("leftArm.rotation[z]",[0,.5,1,1.5,2],[0,Math.PI/2,0,Math.PI/2,0]),new d("rightArm.rotation[z]",[0,.5,1,1.5,2],[0,-Math.PI/2,0,-Math.PI/2,0])]);return t.push(n,a,l),t},[]);return m.useEffect(()=>(r.current&&(i.current=new F(r.current),w.forEach(t=>{const n=i.current.clipAction(t);t.name===s&&n.play()})),()=>{i.current&&i.current.stopAllAction()}),[w,s]),G((t,n)=>{i.current&&i.current.update(n*p)}),e.jsx("group",{ref:r,children:e.jsx("primitive",{object:c})})}function N({pathType:s,animationSpeed:p}){const r=m.useRef(),i=m.useRef(),{curve:c,pathPoints:w}=m.useMemo(()=>{let t;switch(s){case"circle":t=new R(0,0,3,3,0,2*Math.PI,!1,0);break;case"figure8":const a=[];for(let o=0;o<=100;o++){const h=o/100*Math.PI*2,x=3*Math.sin(h),f=1.5*Math.sin(2*h),g=0;a.push(new S(x,f,g))}t=new z(a,!0);break;case"spiral":const l=[];for(let o=0;o<=200;o++){const h=o/200*Math.PI*4,x=3-o/200*2,f=x*Math.cos(h),g=o/200*4-2,b=x*Math.sin(h);l.push(new S(f,g,b))}t=new z(l,!1);break;default:t=new R(0,0,3,3,0,2*Math.PI,!1,0)}const n=t.getPoints(200);return{curve:t,pathPoints:n}},[s]);return G(t=>{if(r.current&&c){const n=t.clock.elapsedTime*p*.1%1;if(s==="circle"){const a=c.getPoint(n);r.current.position.set(a.x,2,a.y)}else{const a=c.getPoint(n);r.current.position.copy(a);const l=(n+.01)%1,o=c.getPoint(l);r.current.lookAt(o)}}}),e.jsxs("group",{children:[e.jsxs("mesh",{ref:r,children:[e.jsx("sphereGeometry",{args:[.2]}),e.jsx("meshStandardMaterial",{color:"#ff6b6b",emissive:"#ff6b6b",emissiveIntensity:.2})]}),e.jsxs("line",{ref:i,children:[e.jsx("bufferGeometry",{children:e.jsx("bufferAttribute",{attach:"attributes-position",count:w.length,array:new Float32Array(w.flatMap(t=>s==="circle"?[t.x,2,t.y]:[t.x,t.y,t.z])),itemSize:3})}),e.jsx("lineBasicMaterial",{color:"#00ffff",transparent:!0,opacity:.5})]})]})}function W(){const{showRobot:s,robotAnimation:p,showPath:r,pathType:i,animationSpeed:c}=B("动画控制",{showRobot:{value:!0,label:"显示机器人"},robotAnimation:{value:"walking",options:{行走:"walking",挥手:"waving",跳舞:"dancing"},label:"机器人动画"},showPath:{value:!0,label:"显示路径动画"},pathType:{value:"circle",options:{圆形:"circle","8字形":"figure8",螺旋:"spiral"},label:"路径类型"},animationSpeed:{value:1,min:.1,max:3,step:.1,label:"动画速度"}});return e.jsxs(e.Fragment,{children:[e.jsxs("mesh",{position:[0,-2.5,0],receiveShadow:!0,children:[e.jsx("planeGeometry",{args:[20,20]}),e.jsx("meshStandardMaterial",{color:"#2c3e50"})]}),s&&e.jsx("group",{position:[-3,0,0],children:e.jsx(J,{animationType:p,animationSpeed:c})}),r&&e.jsx("group",{position:[3,0,0],children:e.jsx(N,{pathType:i,animationSpeed:c})}),e.jsx(T,{position:[0,6,0],fontSize:1,color:"#00ffff",anchorX:"center",anchorY:"middle",children:"动画系统演示"}),e.jsxs(T,{position:[-3,3,0],fontSize:.3,color:"#ffffff",anchorX:"center",anchorY:"middle",children:["骨骼动画: ",{walking:"行走循环",waving:"挥手动作",dancing:"跳舞动作"}[p]]}),e.jsxs(T,{position:[3,3,0],fontSize:.3,color:"#ffffff",anchorX:"center",anchorY:"middle",children:["路径动画: ",{circle:"圆形轨道",figure8:"8字轨道",spiral:"螺旋轨道"}[i]]})]})}function te(){return e.jsxs(O,{children:[e.jsx(X,{children:e.jsx(H,{camera:{position:[0,5,10],fov:75},shadows:!0,gl:{antialias:!0},children:e.jsxs(m.Suspense,{fallback:null,children:[e.jsx(W,{}),e.jsx("ambientLight",{intensity:.4}),e.jsx("directionalLight",{position:[10,10,5],intensity:.8,castShadow:!0,"shadow-mapSize":[2048,2048]}),e.jsx(K,{enableDamping:!0,dampingFactor:.05,minDistance:5,maxDistance:30})]})})}),e.jsxs(Y,{initial:{x:350},animate:{x:0},transition:{duration:.5},children:[e.jsx(q,{children:"🎬 动画系统"}),e.jsx(L,{children:"Three.js 提供了强大的动画系统，支持骨骼动画、变形动画、路径动画等多种动画类型，可以创建复杂的动态效果。"}),e.jsx("h3",{style:{color:"var(--accent-color)",marginBottom:"1rem"},children:"动画类型"}),e.jsxs(M,{children:[e.jsxs("li",{children:[e.jsx("code",{children:"骨骼动画"})," - 基于骨骼系统的角色动画"]}),e.jsxs("li",{children:[e.jsx("code",{children:"变形动画"})," - 顶点位置的直接变化"]}),e.jsxs("li",{children:[e.jsx("code",{children:"路径动画"})," - 沿着曲线路径的运动"]}),e.jsxs("li",{children:[e.jsx("code",{children:"属性动画"})," - 对象属性的插值变化"]})]}),e.jsx("h3",{style:{color:"var(--accent-color)",marginBottom:"1rem",marginTop:"2rem"},children:"核心组件"}),e.jsxs(M,{children:[e.jsxs("li",{children:[e.jsx("code",{children:"AnimationMixer"})," - 动画混合器，管理多个动画"]}),e.jsxs("li",{children:[e.jsx("code",{children:"AnimationClip"})," - 动画片段，包含关键帧数据"]}),e.jsxs("li",{children:[e.jsx("code",{children:"AnimationAction"})," - 动画动作，控制播放状态"]}),e.jsxs("li",{children:[e.jsx("code",{children:"KeyframeTrack"})," - 关键帧轨道，存储动画数据"]})]}),e.jsx("h3",{style:{color:"var(--accent-color)",marginBottom:"1rem",marginTop:"2rem"},children:"轨道类型"}),e.jsxs(M,{children:[e.jsxs("li",{children:[e.jsx("code",{children:"VectorKeyframeTrack"})," - 向量关键帧（位置、旋转、缩放）"]}),e.jsxs("li",{children:[e.jsx("code",{children:"QuaternionKeyframeTrack"})," - 四元数关键帧（旋转）"]}),e.jsxs("li",{children:[e.jsx("code",{children:"NumberKeyframeTrack"})," - 数值关键帧（透明度等）"]}),e.jsxs("li",{children:[e.jsx("code",{children:"ColorKeyframeTrack"})," - 颜色关键帧"]})]}),e.jsx("h3",{style:{color:"var(--accent-color)",marginBottom:"1rem",marginTop:"2rem"},children:"曲线系统"}),e.jsxs(M,{children:[e.jsxs("li",{children:[e.jsx("code",{children:"CatmullRomCurve3"})," - 平滑的3D曲线"]}),e.jsxs("li",{children:[e.jsx("code",{children:"CubicBezierCurve3"})," - 三次贝塞尔曲线"]}),e.jsxs("li",{children:[e.jsx("code",{children:"EllipseCurve"})," - 椭圆曲线"]}),e.jsxs("li",{children:[e.jsx("code",{children:"SplineCurve"})," - 样条曲线"]})]}),e.jsx("h3",{style:{color:"var(--accent-color)",marginBottom:"1rem",marginTop:"2rem"},children:"动画控制"}),e.jsxs(L,{children:["• 播放控制：play(), stop(), pause()",e.jsx("br",{}),"• 混合权重：setEffectiveWeight()",e.jsx("br",{}),"• 时间缩放：setEffectiveTimeScale()",e.jsx("br",{}),"• 循环模式：setLoop()",e.jsx("br",{}),"• 淡入淡出：fadeIn(), fadeOut(), crossFadeTo()"]}),e.jsxs(Q,{children:[e.jsx("summary",{children:"🔍 查看核心代码"}),e.jsx("pre",{children:`// 创建动画混合器
const mixer = new THREE.AnimationMixer(model)

// 创建动画片段
const walkClip = new THREE.AnimationClip('walk', 2, [
  // 位置轨道
  new THREE.VectorKeyframeTrack(
    'bone.position',
    [0, 0.5, 1, 1.5, 2],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0]
  ),
  // 旋转轨道
  new THREE.QuaternionKeyframeTrack(
    'bone.quaternion',
    [0, 1, 2],
    [0, 0, 0, 1, 0, 0, 0.7071, 0.7071, 0, 0, 0, 1]
  )
])

// 创建动画动作
const walkAction = mixer.clipAction(walkClip)
walkAction.play()

// 路径动画
const curve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(-5, 0, 0),
  new THREE.Vector3(0, 3, 0),
  new THREE.Vector3(5, 0, 0),
  new THREE.Vector3(0, -3, 0)
], true)

// 沿路径移动
function animateAlongPath(t) {
  const point = curve.getPoint(t % 1)
  object.position.copy(point)
  
  // 计算朝向
  const tangent = curve.getTangent(t % 1)
  object.lookAt(object.position.clone().add(tangent))
}

// 动画循环
function animate() {
  const delta = clock.getDelta()
  mixer.update(delta)
  
  const time = clock.getElapsedTime()
  animateAlongPath(time * 0.1)
  
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}`})]})]})]})}export{te as default};
//# sourceMappingURL=AnimationSystem-e743eb58.js.map
