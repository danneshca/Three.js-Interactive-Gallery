import{r as t,j as e,C as f,O as g,E as b,e as y,T as p,u as h}from"./react-three-vendor-611369f6.js";import{u as S}from"./leva.esm-82acce57.js";import{d as i}from"./style-vendor-32f1d845.js";import{m as v}from"./animation-vendor-a22bc070.js";import"./three-vendor-1aa2ed72.js";const M=i.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  position: relative;
  padding-top: 80px;
`,G=i.div`
  flex: 1;
  height: calc(100vh - 80px);
  position: relative;
`,w=i(v.div)`
  width: 350px;
  background: rgba(26, 26, 26, 0.95);
  backdrop-filter: blur(20px);
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem;
  overflow-y: auto;
  z-index: 100;
`,T=i.h2`
  color: var(--accent-color);
  font-size: 1.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`,j=i.p`
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
`,x=i.ul`
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
`,k=i.details`
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
`,L=i.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`,C=i.button`
  background: ${r=>r.active?"var(--accent-color)":"rgba(255, 255, 255, 0.1)"};
  color: ${r=>r.active?"var(--primary-bg)":"var(--text-primary)"};
  border: 1px solid ${r=>r.active?"var(--accent-color)":"rgba(255, 255, 255, 0.2)"};
  border-radius: 8px;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
  
  &:hover {
    background: ${r=>r.active?"var(--accent-color)":"rgba(255, 255, 255, 0.2)"};
    transform: translateY(-2px);
  }
`;function F({position:r,scale:a=1}){const o=t.useRef(),[s,n]=t.useState(!1);return h(c=>{o.current&&(o.current.rotation.y=Math.sin(c.clock.elapsedTime)*.3,o.current.position.y=r[1]+Math.sin(c.clock.elapsedTime*2)*.1)}),e.jsxs("group",{ref:o,position:r,scale:a,onPointerOver:()=>n(!0),onPointerOut:()=>n(!1),children:[e.jsxs("mesh",{position:[0,0,0],castShadow:!0,children:[e.jsx("boxGeometry",{args:[1,1.5,.8]}),e.jsx("meshStandardMaterial",{color:s?"#ff6b6b":"#4ecdc4"})]}),e.jsxs("mesh",{position:[0,1.2,0],castShadow:!0,children:[e.jsx("boxGeometry",{args:[.8,.8,.8]}),e.jsx("meshStandardMaterial",{color:s?"#45b7d1":"#2ecc71"})]}),e.jsxs("mesh",{position:[-.2,1.3,.4],children:[e.jsx("sphereGeometry",{args:[.1]}),e.jsx("meshStandardMaterial",{color:"#ffffff"})]}),e.jsxs("mesh",{position:[.2,1.3,.4],children:[e.jsx("sphereGeometry",{args:[.1]}),e.jsx("meshStandardMaterial",{color:"#ffffff"})]}),e.jsxs("mesh",{position:[-.8,.3,0],castShadow:!0,children:[e.jsx("boxGeometry",{args:[.3,1,.3]}),e.jsx("meshStandardMaterial",{color:s?"#f39c12":"#e67e22"})]}),e.jsxs("mesh",{position:[.8,.3,0],castShadow:!0,children:[e.jsx("boxGeometry",{args:[.3,1,.3]}),e.jsx("meshStandardMaterial",{color:s?"#f39c12":"#e67e22"})]}),e.jsxs("mesh",{position:[-.3,-1.2,0],castShadow:!0,children:[e.jsx("boxGeometry",{args:[.3,1,.3]}),e.jsx("meshStandardMaterial",{color:s?"#9b59b6":"#8e44ad"})]}),e.jsxs("mesh",{position:[.3,-1.2,0],castShadow:!0,children:[e.jsx("boxGeometry",{args:[.3,1,.3]}),e.jsx("meshStandardMaterial",{color:s?"#9b59b6":"#8e44ad"})]})]})}function R({position:r,scale:a=1}){const o=t.useRef(),s=[t.useRef(),t.useRef(),t.useRef(),t.useRef()];return h(n=>{if(o.current){const c=n.clock.elapsedTime;o.current.position.x=r[0]+Math.sin(c*.5)*3,s.forEach(d=>{d.current&&(d.current.rotation.x=c*2)})}}),e.jsxs("group",{ref:o,position:r,scale:a,children:[e.jsxs("mesh",{position:[0,.5,0],castShadow:!0,children:[e.jsx("boxGeometry",{args:[2,.8,1]}),e.jsx("meshStandardMaterial",{color:"#e74c3c"})]}),e.jsxs("mesh",{position:[0,1.2,0],castShadow:!0,children:[e.jsx("boxGeometry",{args:[1.2,.6,.9]}),e.jsx("meshStandardMaterial",{color:"#c0392b"})]}),e.jsxs("mesh",{ref:s[0],position:[-.7,0,.6],castShadow:!0,children:[e.jsx("cylinderGeometry",{args:[.3,.3,.2,16]}),e.jsx("meshStandardMaterial",{color:"#2c3e50"})]}),e.jsxs("mesh",{ref:s[1],position:[.7,0,.6],castShadow:!0,children:[e.jsx("cylinderGeometry",{args:[.3,.3,.2,16]}),e.jsx("meshStandardMaterial",{color:"#2c3e50"})]}),e.jsxs("mesh",{ref:s[2],position:[-.7,0,-.6],castShadow:!0,children:[e.jsx("cylinderGeometry",{args:[.3,.3,.2,16]}),e.jsx("meshStandardMaterial",{color:"#2c3e50"})]}),e.jsxs("mesh",{ref:s[3],position:[.7,0,-.6],castShadow:!0,children:[e.jsx("cylinderGeometry",{args:[.3,.3,.2,16]}),e.jsx("meshStandardMaterial",{color:"#2c3e50"})]}),e.jsxs("mesh",{position:[.3,1.2,.46],children:[e.jsx("boxGeometry",{args:[.8,.4,.02]}),e.jsx("meshStandardMaterial",{color:"#3498db",transparent:!0,opacity:.7})]}),e.jsxs("mesh",{position:[-.3,1.2,.46],children:[e.jsx("boxGeometry",{args:[.8,.4,.02]}),e.jsx("meshStandardMaterial",{color:"#3498db",transparent:!0,opacity:.7})]})]})}function A({position:r,scale:a=1}){const o=t.useRef();return h(s=>{o.current&&(o.current.rotation.x=s.clock.elapsedTime*.5,o.current.rotation.y=s.clock.elapsedTime*.7,o.current.position.y=r[1]+Math.sin(s.clock.elapsedTime*1.5)*.3)}),e.jsxs("mesh",{ref:o,position:r,scale:a,castShadow:!0,children:[e.jsx("octahedronGeometry",{args:[1]}),e.jsx("meshPhysicalMaterial",{color:"#9b59b6",metalness:.1,roughness:.1,transmission:.9,thickness:1,clearcoat:1,clearcoatRoughness:.1})]})}function P(){const[r,a]=t.useState("robot"),{modelScale:o,animationSpeed:s,showWireframe:n,environmentPreset:c}=S("模型控制",{modelScale:{value:1,min:.5,max:3,step:.1},animationSpeed:{value:1,min:0,max:3,step:.1},showWireframe:{value:!1},environmentPreset:{value:"city",options:{城市:"city",日落:"sunset",森林:"forest",工作室:"studio",仓库:"warehouse"}}}),d={robot:e.jsx(F,{position:[0,0,0],scale:o}),car:e.jsx(R,{position:[0,0,0],scale:o}),crystal:e.jsx(A,{position:[0,2,0],scale:o})};return e.jsxs(e.Fragment,{children:[e.jsx(b,{preset:c}),e.jsx(y,{position:[0,-2,0],opacity:.4,scale:20,blur:2,far:4}),d[r],e.jsxs("mesh",{position:[0,-2,0],receiveShadow:!0,children:[e.jsx("planeGeometry",{args:[20,20]}),e.jsx("meshStandardMaterial",{color:"#2c3e50",transparent:!0,opacity:.1})]}),e.jsx(p,{position:[0,4,0],fontSize:.8,color:"#00ffff",anchorX:"center",anchorY:"middle",children:"3D 模型展示"}),e.jsxs("group",{position:[-4,2,0],children:[e.jsx(p,{position:[0,1,0],fontSize:.3,color:"#ffffff",anchorX:"center",children:"选择模型:"}),["robot","car","crystal"].map((l,u)=>e.jsxs("mesh",{position:[0,.5-u*.4,0],onClick:()=>a(l),onPointerOver:m=>{m.object.material.color.setHex(r===l?65535:5164484),document.body.style.cursor="pointer"},onPointerOut:m=>{m.object.material.color.setHex(r===l?65535:6710886),document.body.style.cursor="default"},children:[e.jsx("boxGeometry",{args:[1.5,.3,.1]}),e.jsx("meshStandardMaterial",{color:r===l?"#00ffff":"#666666",transparent:!0,opacity:.8})]},l))]})]})}function I(){const[r,a]=t.useState("robot"),o={robot:{name:"机器人模型",description:"一个简单的机器人模型，展示了基础的几何体组合和动画效果。",features:["悬浮动画","鼠标交互","颜色变化"]},car:{name:"汽车模型",description:"动画汽车模型，展示了复杂的运动动画和轮子旋转效果。",features:["路径动画","轮子旋转","透明窗户"]},crystal:{name:"水晶模型",description:"透明水晶模型，展示了高级材质效果和物理渲染。",features:["透明材质","折射效果","浮动动画"]}};return e.jsxs(M,{children:[e.jsx(G,{children:e.jsx(f,{shadows:!0,camera:{position:[5,3,5],fov:75},gl:{antialias:!0},children:e.jsxs(t.Suspense,{fallback:null,children:[e.jsx(P,{}),e.jsx(g,{enableDamping:!0,dampingFactor:.05,minDistance:3,maxDistance:20,maxPolarAngle:Math.PI/2+.3})]})})}),e.jsxs(w,{initial:{x:350},animate:{x:0},transition:{duration:.5},children:[e.jsx(T,{children:"🏗️ 模型加载器"}),e.jsx(j,{children:"Three.js 支持多种 3D 模型格式，其中 GLTF 是最推荐的格式。本演示展示了程序化创建的 3D 模型和动画效果。"}),e.jsx("h3",{style:{color:"var(--accent-color)",marginBottom:"1rem"},children:"模型选择"}),e.jsx(L,{children:Object.entries(o).map(([s,n])=>e.jsx(C,{active:r===s,onClick:()=>a(s),children:n.name},s))}),e.jsx("h3",{style:{color:"var(--accent-color)",marginBottom:"1rem"},children:"当前模型信息"}),e.jsxs(j,{children:[e.jsx("strong",{children:o[r].name}),e.jsx("br",{}),o[r].description]}),e.jsx("h4",{style:{color:"var(--text-primary)",marginBottom:"0.5rem"},children:"特性:"}),e.jsx(x,{children:o[r].features.map((s,n)=>e.jsx("li",{children:s},n))}),e.jsx("h3",{style:{color:"var(--accent-color)",marginBottom:"1rem",marginTop:"2rem"},children:"支持的格式"}),e.jsxs(x,{children:[e.jsxs("li",{children:[e.jsx("code",{children:"GLTF/GLB"})," - 推荐格式，支持动画、材质"]}),e.jsxs("li",{children:[e.jsx("code",{children:"FBX"})," - Autodesk 格式，广泛使用"]}),e.jsxs("li",{children:[e.jsx("code",{children:"OBJ"})," - 简单几何体格式"]}),e.jsxs("li",{children:[e.jsx("code",{children:"DAE"})," - Collada 格式"]}),e.jsxs("li",{children:[e.jsx("code",{children:"STL"})," - 3D 打印常用格式"]})]}),e.jsx("h3",{style:{color:"var(--accent-color)",marginBottom:"1rem",marginTop:"2rem"},children:"动画系统"}),e.jsxs(x,{children:[e.jsxs("li",{children:[e.jsx("code",{children:"AnimationMixer"})," - 动画混合器"]}),e.jsxs("li",{children:[e.jsx("code",{children:"AnimationClip"})," - 动画片段"]}),e.jsxs("li",{children:[e.jsx("code",{children:"KeyframeTrack"})," - 关键帧轨道"]}),e.jsxs("li",{children:[e.jsx("code",{children:"AnimationAction"})," - 动画动作"]})]}),e.jsxs(k,{children:[e.jsx("summary",{children:"🔍 查看核心代码"}),e.jsx("pre",{children:`// GLTF 模型加载
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const loader = new GLTFLoader()
loader.load('model.gltf', (gltf) => {
  const model = gltf.scene
  scene.add(model)
  
  // 动画设置
  const mixer = new THREE.AnimationMixer(model)
  const clips = gltf.animations
  
  clips.forEach((clip) => {
    const action = mixer.clipAction(clip)
    action.play()
  })
  
  // 在渲染循环中更新动画
  function animate() {
    mixer.update(clock.getDelta())
    renderer.render(scene, camera)
  }
})

// 使用 drei 的 useGLTF hook
import { useGLTF, useAnimations } from '@react-three/drei'

function Model() {
  const { scene, animations } = useGLTF('model.gltf')
  const { actions } = useAnimations(animations, scene)
  
  useEffect(() => {
    actions['AnimationName']?.play()
  }, [actions])
  
  return <primitive object={scene} />
}`})]})]})]})}export{I as default};
//# sourceMappingURL=ModelLoader-a2f5ca62.js.map
