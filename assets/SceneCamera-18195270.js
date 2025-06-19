import{r as t,j as e,C as j,O as f,u,P as v,B as i,a as x,T as b,b as w,R as y}from"./react-three-vendor-611369f6.js";import{u as C}from"./leva.esm-82acce57.js";import{d as o}from"./style-vendor-32f1d845.js";import{m as S}from"./animation-vendor-a22bc070.js";import"./three-vendor-1aa2ed72.js";const T=o.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  position: relative;
  padding-top: 80px;
`,z=o.div`
  flex: 1;
  height: calc(100vh - 80px);
  position: relative;
`,P=o(S.div)`
  width: 350px;
  background: rgba(26, 26, 26, 0.95);
  backdrop-filter: blur(20px);
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem;
  overflow-y: auto;
  z-index: 100;
`,E=o.h2`
  color: var(--accent-color);
  font-size: 1.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`,g=o.p`
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
`,M=o.ul`
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
`,O=o.details`
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
`;function R(){const r=t.useRef();return u(a=>{r.current&&(r.current.rotation.y=a.clock.elapsedTime*.2)}),e.jsxs("group",{ref:r,children:[e.jsx(v,{args:[20,20],rotation:[-Math.PI/2,0,0],position:[0,-2,0],children:e.jsx("meshStandardMaterial",{color:"#333",wireframe:!0})}),e.jsx(i,{position:[-3,0,0],args:[1,1,1],children:e.jsx("meshStandardMaterial",{color:"#ff6b6b"})}),e.jsx(x,{position:[0,0,0],args:[.8],children:e.jsx("meshStandardMaterial",{color:"#4ecdc4"})}),e.jsx(i,{position:[3,0,0],args:[1,2,1],children:e.jsx("meshStandardMaterial",{color:"#45b7d1"})}),e.jsx(i,{position:[-1,3,-2],args:[.5,.5,.5],children:e.jsx("meshStandardMaterial",{color:"#96ceb4"})}),e.jsx(x,{position:[2,2,-1],args:[.4],children:e.jsx("meshStandardMaterial",{color:"#feca57"})}),e.jsx(b,{position:[0,4,0],fontSize:.8,color:"#00ffff",anchorX:"center",anchorY:"middle",children:"场景与相机演示"})]})}function k(){return e.jsxs(e.Fragment,{children:[e.jsx("ambientLight",{intensity:.3}),e.jsx("directionalLight",{position:[10,10,5],intensity:1,castShadow:!0,"shadow-mapSize-width":2048,"shadow-mapSize-height":2048}),e.jsx("pointLight",{position:[-10,10,-10],intensity:.5,color:"#ff6b6b"}),e.jsx("pointLight",{position:[10,-10,10],intensity:.5,color:"#4ecdc4"})]})}function D(){const{camera:r,gl:a}=w(),{cameraType:n,fov:s,zoom:c,near:l,far:d,positionX:m,positionY:p,positionZ:h}=C("相机控制",{cameraType:{value:"perspective",options:{透视相机:"perspective",正交相机:"orthographic"}},fov:{value:75,min:10,max:120,step:1},zoom:{value:1,min:.1,max:5,step:.1},near:{value:.1,min:.01,max:1,step:.01},far:{value:1e3,min:10,max:2e3,step:10},positionX:{value:5,min:-20,max:20,step:.5},positionY:{value:5,min:-20,max:20,step:.5},positionZ:{value:5,min:-20,max:20,step:.5}});return y.useEffect(()=>{r.position.set(m,p,h),r.near=l,r.far=d,r.zoom=c,n==="perspective"&&r.type==="PerspectiveCamera"&&(r.fov=s),r.updateProjectionMatrix()},[r,n,s,c,l,d,m,p,h]),null}function X(){return t.useState("perspective"),e.jsxs(T,{children:[e.jsx(z,{children:e.jsx(j,{shadows:!0,camera:{position:[5,5,5],fov:75},gl:{antialias:!0},children:e.jsxs(t.Suspense,{fallback:null,children:[e.jsx(R,{}),e.jsx(k,{}),e.jsx(D,{}),e.jsx(f,{enableDamping:!0,dampingFactor:.05,minDistance:2,maxDistance:50})]})})}),e.jsxs(P,{initial:{x:350},animate:{x:0},transition:{duration:.5},children:[e.jsx(E,{children:"🎯 场景与相机"}),e.jsx(g,{children:"Three.js 中的相机决定了我们如何观察 3D 场景。本演示展示了透视相机和正交相机的区别，以及各种相机参数的效果。"}),e.jsx("h3",{style:{color:"var(--accent-color)",marginBottom:"1rem"},children:"核心概念"}),e.jsxs(M,{children:[e.jsxs("li",{children:[e.jsx("code",{children:"PerspectiveCamera"})," - 透视相机，模拟人眼视觉"]}),e.jsxs("li",{children:[e.jsx("code",{children:"OrthographicCamera"})," - 正交相机，无透视效果"]}),e.jsxs("li",{children:[e.jsx("code",{children:"FOV"})," - 视野角度，影响视觉范围"]}),e.jsxs("li",{children:[e.jsx("code",{children:"Near/Far"})," - 近远裁剪面"]}),e.jsxs("li",{children:[e.jsx("code",{children:"Position"})," - 相机位置"]}),e.jsxs("li",{children:[e.jsx("code",{children:"OrbitControls"})," - 轨道控制器"]})]}),e.jsx("h3",{style:{color:"var(--accent-color)",marginBottom:"1rem",marginTop:"2rem"},children:"交互说明"}),e.jsxs(g,{children:["• 使用右侧控制面板调整相机参数",e.jsx("br",{}),"• 鼠标拖拽旋转视角",e.jsx("br",{}),"• 滚轮缩放场景",e.jsx("br",{}),"• 右键拖拽平移视角"]}),e.jsxs(O,{children:[e.jsx("summary",{children:"🔍 查看核心代码"}),e.jsx("pre",{children:`// 透视相机设置
const camera = new THREE.PerspectiveCamera(
  75,  // fov
  window.innerWidth / window.innerHeight,  // aspect
  0.1, // near
  1000 // far
)

// 正交相机设置
const camera = new THREE.OrthographicCamera(
  -width / 2, width / 2,   // left, right
  height / 2, -height / 2, // top, bottom
  0.1, 1000                // near, far
)

// 轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.05`})]})]})]})}export{X as default};
//# sourceMappingURL=SceneCamera-18195270.js.map
