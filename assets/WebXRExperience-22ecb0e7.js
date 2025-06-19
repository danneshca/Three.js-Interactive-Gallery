import{r as l,j as e,C as M,O as X,B as p,a as u,T as m,u as f,g as R,b as A}from"./react-three-vendor-611369f6.js";import{u as T}from"./leva.esm-82acce57.js";import{d as x}from"./style-vendor-32f1d845.js";import{m as F}from"./animation-vendor-a22bc070.js";import"./three-vendor-1aa2ed72.js";const V=x.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  position: relative;
  padding-top: 80px;
`,E=x.div`
  flex: 1;
  height: calc(100vh - 80px);
  position: relative;
`,L=x(F.div)`
  width: 350px;
  background: rgba(26, 26, 26, 0.95);
  backdrop-filter: blur(20px);
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem;
  overflow-y: auto;
  z-index: 100;
`,P=x.h2`
  color: var(--accent-color);
  font-size: 1.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`,w=x.p`
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
`,j=x.ul`
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
`,B=x.details`
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
`,g=x.button`
  background: linear-gradient(135deg, var(--accent-color), #0066cc);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 255, 255, 0.3);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`,v=x.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;
  padding: 0.5rem;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.3);
  
  .status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${r=>r.status==="supported"?"#4CAF50":r.status==="not-supported"?"#f44336":"#ff9800"};
  }
`;function S({position:r,color:o,onSelect:n}){const s=l.useRef(),[c,h]=l.useState(!1),[i,a]=l.useState(!1);f(d=>{s.current&&(s.current.rotation.x=d.clock.elapsedTime*.5,s.current.rotation.y=d.clock.elapsedTime*.3,c||i?s.current.scale.setScalar(1.2):s.current.scale.setScalar(1))});const t=()=>{a(!i),n&&n(!i)};return e.jsx(p,{ref:s,position:r,args:[1,1,1],onClick:t,onPointerOver:()=>h(!0),onPointerOut:()=>h(!1),children:e.jsx("meshStandardMaterial",{color:i?"#ff6b6b":c?"#4ecdc4":o,emissive:i?"#330000":c?"#001a1a":"#000000"})})}function y({position:r,color:o,onSelect:n}){const s=l.useRef(),[c,h]=l.useState(!1),[i,a]=l.useState(!1);f(d=>{s.current&&(s.current.position.y=r[1]+Math.sin(d.clock.elapsedTime*2)*.2,c||i?s.current.scale.setScalar(1.3):s.current.scale.setScalar(1))});const t=()=>{a(!i),n&&n(!i)};return e.jsx(u,{ref:s,position:r,args:[.5,32,32],onClick:t,onPointerOver:()=>h(!0),onPointerOut:()=>h(!1),children:e.jsx("meshStandardMaterial",{color:i?"#ff6b6b":c?"#4ecdc4":o,emissive:i?"#330000":c?"#001a1a":"#000000",transparent:!0,opacity:.8})})}function k({position:r,rotation:o}){const n=l.useRef();return f(s=>{n.current&&(n.current.rotation.z=Math.sin(s.clock.elapsedTime)*.1)}),e.jsxs("group",{ref:n,position:r,rotation:o,children:[e.jsx(R,{args:[.02,.03,.15],position:[0,0,0],children:e.jsx("meshStandardMaterial",{color:"#333333"})}),e.jsx(p,{args:[.02,.01,.03],position:[0,-.02,.05],children:e.jsx("meshStandardMaterial",{color:"#666666"})}),e.jsx(R,{args:[.015,.015,.005],position:[0,.02,.02],children:e.jsx("meshStandardMaterial",{color:"#222222"})}),e.jsx(u,{args:[.003],position:[0,.03,.03],children:e.jsx("meshStandardMaterial",{color:"#00ff00",emissive:"#00ff00",emissiveIntensity:.5})})]})}function b({position:r}){const o=l.useRef();return f(n=>{o.current&&(o.current.rotation.y=n.clock.elapsedTime)}),e.jsxs("group",{position:r,children:[e.jsx(p,{args:[.1,.01,.1],position:[0,0,0],children:e.jsx("meshStandardMaterial",{color:"#ffffff"})}),e.jsxs("group",{ref:o,position:[0,.5,0],children:[e.jsx(u,{args:[.2],position:[0,0,0],children:e.jsx("meshStandardMaterial",{color:"#ff6b6b",transparent:!0,opacity:.7,emissive:"#ff0000",emissiveIntensity:.2})}),e.jsx(m,{position:[0,.4,0],fontSize:.1,color:"#ffffff",anchorX:"center",anchorY:"middle",children:"AR Object"})]})]})}function z(){const{gl:r}=A(),[o,n]=l.useState({vr:!1,ar:!1}),[s,c]=l.useState(null);return l.useEffect(()=>{navigator.xr&&(navigator.xr.isSessionSupported("immersive-vr").then(t=>{n(d=>({...d,vr:t}))}).catch(()=>{n(t=>({...t,vr:!1}))}),navigator.xr.isSessionSupported("immersive-ar").then(t=>{n(d=>({...d,ar:t}))}).catch(()=>{n(t=>({...t,ar:!1}))}))},[]),{xrSupported:o,xrSession:s,startVRSession:async()=>{if(navigator.xr&&o.vr)try{const t=await navigator.xr.requestSession("immersive-vr");await r.xr.setSession(t),c(t),t.addEventListener("end",()=>{c(null)})}catch(t){console.error("Failed to start VR session:",t)}},startARSession:async()=>{if(navigator.xr&&o.ar)try{const t=await navigator.xr.requestSession("immersive-ar",{requiredFeatures:["local-floor"],optionalFeatures:["hand-tracking","hit-test"]});await r.xr.setSession(t),c(t),t.addEventListener("end",()=>{c(null)})}catch(t){console.error("Failed to start AR session:",t)}},endSession:()=>{s&&s.end()}}}function O(){const{showVRControllers:r,showARMarkers:o,interactionMode:n,environmentType:s}=T("XR设置",{showVRControllers:{value:!0,label:"显示VR控制器"},showARMarkers:{value:!0,label:"显示AR标记"},interactionMode:{value:"gaze",options:{凝视选择:"gaze",手势控制:"gesture",控制器:"controller"},label:"交互模式"},environmentType:{value:"room",options:{房间:"room",户外:"outdoor",太空:"space"},label:"环境类型"}}),[c,h]=l.useState([]),i=(a,t)=>{h(t?d=>[...d,a]:d=>d.filter(C=>C!==a))};return e.jsxs(e.Fragment,{children:[s==="room"&&e.jsxs(e.Fragment,{children:[e.jsx(p,{args:[10,.1,10],position:[0,-2,0],children:e.jsx("meshStandardMaterial",{color:"#8B4513"})}),e.jsx(p,{args:[.1,4,10],position:[-5,0,0],children:e.jsx("meshStandardMaterial",{color:"#DEB887"})}),e.jsx(p,{args:[.1,4,10],position:[5,0,0],children:e.jsx("meshStandardMaterial",{color:"#DEB887"})}),e.jsx(p,{args:[10,4,.1],position:[0,0,-5],children:e.jsx("meshStandardMaterial",{color:"#DEB887"})})]}),s==="space"&&e.jsx(e.Fragment,{children:Array.from({length:100},(a,t)=>e.jsx(u,{args:[.01],position:[(Math.random()-.5)*50,(Math.random()-.5)*50,(Math.random()-.5)*50],children:e.jsx("meshBasicMaterial",{color:"#ffffff"})},t))}),e.jsx(S,{position:[-2,1,0],color:"#ff6b6b",onSelect:a=>i(0,a)}),e.jsx(S,{position:[0,1,0],color:"#4ecdc4",onSelect:a=>i(1,a)}),e.jsx(S,{position:[2,1,0],color:"#45b7d1",onSelect:a=>i(2,a)}),e.jsx(y,{position:[-1,2.5,-2],color:"#96ceb4",onSelect:a=>i(3,a)}),e.jsx(y,{position:[1,2.5,-2],color:"#feca57",onSelect:a=>i(4,a)}),r&&e.jsxs(e.Fragment,{children:[e.jsx(k,{position:[-.3,1.2,.5],rotation:[0,.2,0]}),e.jsx(k,{position:[.3,1.2,.5],rotation:[0,-.2,0]})]}),o&&e.jsxs(e.Fragment,{children:[e.jsx(b,{position:[-3,-1.9,-1]}),e.jsx(b,{position:[3,-1.9,-1]}),e.jsx(b,{position:[0,-1.9,-3]})]}),e.jsx("ambientLight",{intensity:.4}),e.jsx("directionalLight",{position:[10,10,5],intensity:.6}),e.jsx("pointLight",{position:[-10,-10,-10],color:"#ff0080",intensity:.3}),e.jsx("pointLight",{position:[10,-10,10],color:"#0080ff",intensity:.3}),e.jsx(m,{position:[0,4,0],fontSize:1,color:"#00ffff",anchorX:"center",anchorY:"middle",children:"WebXR 体验"}),e.jsxs(m,{position:[0,3.5,0],fontSize:.3,color:"#ffffff",anchorX:"center",anchorY:"middle",children:["交互模式: ",{gaze:"凝视选择",gesture:"手势控制",controller:"VR控制器"}[n]]}),e.jsxs(m,{position:[0,3.2,0],fontSize:.3,color:"#ffffff",anchorX:"center",anchorY:"middle",children:["已选择对象: ",c.length]})]})}function W({onXRStateChange:r}){const{xrSupported:o,xrSession:n,startVRSession:s,startARSession:c,endSession:h}=z();return l.useEffect(()=>{r({xrSupported:o,xrSession:n,startVRSession:s,startARSession:c,endSession:h})},[o,n,r]),null}function N(){const[r,o]=l.useState({xrSupported:{vr:!1,ar:!1},xrSession:null,startVRSession:()=>{},startARSession:()=>{},endSession:()=>{}}),n=l.useCallback(s=>{o(s)},[]);return e.jsxs(V,{children:[e.jsx(E,{children:e.jsx(M,{camera:{position:[0,2,5],fov:75},gl:{antialias:!0},onCreated:({gl:s})=>{s.xr.enabled=!0},children:e.jsxs(l.Suspense,{fallback:null,children:[e.jsx(W,{onXRStateChange:n}),e.jsx(O,{}),e.jsx(X,{enableDamping:!0,dampingFactor:.05,minDistance:2,maxDistance:20})]})})}),e.jsxs(L,{initial:{x:350},animate:{x:0},transition:{duration:.5},children:[e.jsx(P,{children:"🥽 WebXR 体验"}),e.jsx(w,{children:"WebXR是Web平台上的虚拟现实(VR)和增强现实(AR)标准，让用户可以直接在浏览器中体验沉浸式内容，无需安装额外应用。"}),e.jsx("h3",{style:{color:"var(--accent-color)",marginBottom:"1rem"},children:"设备支持状态"}),e.jsxs(v,{status:r.xrSupported.vr?"supported":"not-supported",children:[e.jsx("div",{className:"status-dot"}),e.jsxs("span",{children:["VR支持: ",r.xrSupported.vr?"已支持":"不支持"]})]}),e.jsxs(v,{status:r.xrSupported.ar?"supported":"not-supported",children:[e.jsx("div",{className:"status-dot"}),e.jsxs("span",{children:["AR支持: ",r.xrSupported.ar?"已支持":"不支持"]})]}),e.jsxs(v,{status:r.xrSession?"supported":"unknown",children:[e.jsx("div",{className:"status-dot"}),e.jsxs("span",{children:["XR会话: ",r.xrSession?"活跃":"未启动"]})]}),e.jsx("div",{style:{marginTop:"1rem"},children:r.xrSession?e.jsx(g,{onClick:r.endSession,children:"退出XR模式"}):e.jsxs(e.Fragment,{children:[e.jsx(g,{onClick:r.startVRSession,disabled:!r.xrSupported.vr,children:"启动VR模式"}),e.jsx(g,{onClick:r.startARSession,disabled:!r.xrSupported.ar,children:"启动AR模式"})]})}),e.jsx("h3",{style:{color:"var(--accent-color)",marginBottom:"1rem",marginTop:"2rem"},children:"核心特性"}),e.jsxs(j,{children:[e.jsxs("li",{children:[e.jsx("code",{children:"沉浸式体验"})," - 360度虚拟环境"]}),e.jsxs("li",{children:[e.jsx("code",{children:"空间追踪"})," - 6DOF头部和手部追踪"]}),e.jsxs("li",{children:[e.jsx("code",{children:"立体渲染"})," - 双眼视差效果"]}),e.jsxs("li",{children:[e.jsx("code",{children:"手势识别"})," - 自然手部交互"]}),e.jsxs("li",{children:[e.jsx("code",{children:"控制器支持"})," - VR控制器输入"]})]}),e.jsx("h3",{style:{color:"var(--accent-color)",marginBottom:"1rem",marginTop:"2rem"},children:"交互方式"}),e.jsxs(j,{children:[e.jsxs("li",{children:[e.jsx("code",{children:"凝视选择"})," - 通过视线方向选择对象"]}),e.jsxs("li",{children:[e.jsx("code",{children:"手势控制"})," - 手部动作识别"]}),e.jsxs("li",{children:[e.jsx("code",{children:"控制器"})," - VR控制器按键和触摸"]}),e.jsxs("li",{children:[e.jsx("code",{children:"语音命令"})," - 语音识别控制"]})]}),e.jsx("h3",{style:{color:"var(--accent-color)",marginBottom:"1rem",marginTop:"2rem"},children:"AR功能"}),e.jsxs(j,{children:[e.jsxs("li",{children:[e.jsx("code",{children:"平面检测"})," - 识别现实世界表面"]}),e.jsxs("li",{children:[e.jsx("code",{children:"光照估计"})," - 匹配真实环境光照"]}),e.jsxs("li",{children:[e.jsx("code",{children:"遮挡处理"})," - 虚拟对象被真实物体遮挡"]}),e.jsxs("li",{children:[e.jsx("code",{children:"锚点系统"})," - 虚拟内容固定在空间位置"]})]}),e.jsx("h3",{style:{color:"var(--accent-color)",marginBottom:"1rem",marginTop:"2rem"},children:"性能优化"}),e.jsxs(w,{children:["• 保持90fps的高帧率",e.jsx("br",{}),"• 减少延迟防止晕动症",e.jsx("br",{}),"• 优化渲染管线",e.jsx("br",{}),"• 使用LOD和剔除技术",e.jsx("br",{}),"• 合理分配GPU资源"]}),e.jsxs(B,{children:[e.jsx("summary",{children:"🔍 查看核心代码"}),e.jsx("pre",{children:`// WebXR会话管理
class WebXRManager {
  async startVRSession() {
    if (!navigator.xr) {
      throw new Error('WebXR not supported')
    }
    
    const session = await navigator.xr.requestSession('immersive-vr', {
      requiredFeatures: ['local-floor'],
      optionalFeatures: ['hand-tracking', 'eye-tracking']
    })
    
    // 设置渲染器
    await renderer.xr.setSession(session)
    
    // 监听会话事件
    session.addEventListener('end', this.onSessionEnd)
    session.addEventListener('inputsourceschange', this.onInputChange)
    
    return session
  }
  
  async startARSession() {
    const session = await navigator.xr.requestSession('immersive-ar', {
      requiredFeatures: ['local-floor'],
      optionalFeatures: ['hit-test', 'dom-overlay', 'light-estimation']
    })
    
    await renderer.xr.setSession(session)
    return session
  }
}

// XR控制器处理
function handleXRControllers(session) {
  const controllers = []
  
  for (let i = 0; i < 2; i++) {
    const controller = renderer.xr.getController(i)
    
    controller.addEventListener('selectstart', (event) => {
      console.log('Controller select start', i)
    })
    
    controller.addEventListener('selectend', (event) => {
      console.log('Controller select end', i)
    })
    
    scene.add(controller)
    controllers.push(controller)
  }
  
  return controllers
}

// 手部追踪
function setupHandTracking(session) {
  const hand1 = renderer.xr.getHand(0)
  const hand2 = renderer.xr.getHand(1)
  
  hand1.addEventListener('pinchstart', (event) => {
    console.log('Pinch start on hand 0')
  })
  
  hand1.addEventListener('pinchend', (event) => {
    console.log('Pinch end on hand 0')
  })
  
  scene.add(hand1)
  scene.add(hand2)
}

// AR平面检测
async function setupARPlaneDetection(session) {
  const referenceSpace = await session.requestReferenceSpace('local-floor')
  
  session.requestAnimationFrame(function onXRFrame(time, frame) {
    const pose = frame.getViewerPose(referenceSpace)
    
    if (pose) {
      // 检测平面
      const hitTestResults = frame.getHitTestResults(hitTestSource)
      
      if (hitTestResults.length > 0) {
        const hit = hitTestResults[0]
        const hitPose = hit.getPose(referenceSpace)
        
        // 在检测到的平面上放置虚拟对象
        placeVirtualObject(hitPose.transform.matrix)
      }
    }
    
    session.requestAnimationFrame(onXRFrame)
  })
}

// 渲染循环
function animate() {
  renderer.setAnimationLoop((time, frame) => {
    if (frame) {
      // XR渲染
      const referenceSpace = renderer.xr.getReferenceSpace()
      const pose = frame.getViewerPose(referenceSpace)
      
      if (pose) {
        // 更新相机位置
        const views = pose.views
        
        for (const view of views) {
          const viewport = session.renderState.baseLayer.getViewport(view)
          renderer.setViewport(viewport.x, viewport.y, viewport.width, viewport.height)
          
          camera.matrix.fromArray(view.transform.inverse.matrix)
          camera.projectionMatrix.fromArray(view.projectionMatrix)
          camera.updateMatrixWorld(true)
          
          renderer.render(scene, camera)
        }
      }
    } else {
      // 普通渲染
      renderer.render(scene, camera)
    }
  })
}`})]})]})]})}export{N as default};
//# sourceMappingURL=WebXRExperience-22ecb0e7.js.map
