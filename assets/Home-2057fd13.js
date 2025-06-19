import{j as e,C as v,r as x,S as w,O as b,u as y}from"./react-three-vendor-611369f6.js";import{d as t}from"./style-vendor-32f1d845.js";import{X as j}from"./three-vendor-1aa2ed72.js";import{m as r}from"./animation-vendor-a22bc070.js";import{b as T}from"./react-vendor-85743a1d.js";const k=t.div`
  width: 100vw;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
`,M=t.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 1;
  
  @media (max-width: 768px) {
    height: 80vh;
  }
  
  @media (max-width: 576px) {
    height: 70vh;
  }
`,C=t.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  pointer-events: none;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    height: 80vh;
  }
  
  @media (max-width: 576px) {
    padding: 1rem;
    height: 70vh;
  }
`,S=t(r.div)`
  text-align: center;
  margin-bottom: 4rem;
  pointer-events: auto;
`,z=t(r.h1)`
  font-size: clamp(2rem, 8vw, 4rem);
  font-weight: 700;
  background: linear-gradient(135deg, #00ffff, #ffffff, #ff6b6b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  text-align: center;
  line-height: 1.1;
  
  @media (max-width: 768px) {
    margin-bottom: 0.75rem;
  }
  
  @media (max-width: 576px) {
    margin-bottom: 0.5rem;
  }
`,R=t(r.p)`
  font-size: clamp(1rem, 3vw, 1.5rem);
  color: var(--text-secondary);
  margin-bottom: 2rem;
  max-width: 600px;
  text-align: center;
  line-height: 1.4;
  
  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
    max-width: 90%;
  }
  
  @media (max-width: 576px) {
    margin-bottom: 1rem;
    max-width: 95%;
  }
`,I=t(r.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  width: 100%;
  pointer-events: auto;
  
  @media (max-width: 1200px) {
    max-width: 960px;
    gap: 1.5rem;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    max-width: 100%;
  }
  
  @media (max-width: 576px) {
    gap: 0.75rem;
    padding: 0 0.5rem;
  }
`,F=t(r.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  &:hover {
    transform: translateY(-8px);
    border-color: var(--accent-color);
    box-shadow: 0 16px 40px rgba(0, 255, 255, 0.2);
  }
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    min-height: 160px;
    border-radius: 12px;
    
    &:hover {
      transform: translateY(-4px);
    }
  }
  
  @media (max-width: 576px) {
    padding: 1rem;
    min-height: 140px;
    border-radius: 8px;
    
    &:hover {
      transform: translateY(-2px);
    }
  }
  
  /* Touch devices */
  @media (hover: none) and (pointer: coarse) {
    min-height: 180px;
    
    &:active {
      transform: scale(0.98);
      border-color: var(--accent-color);
    }
  }
`,P=t.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`,V=t.h3`
  font-size: 1.5rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
`,A=t.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.6;
`,D=t(r.div)`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  color: var(--text-muted);
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  pointer-events: auto;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    color: var(--accent-color);
    transform: translateX(-50%) translateY(-5px);
  }
`,G=t(r.div)`
  width: 100%;
  min-height: 100vh;
  padding: 4rem 2rem;
  background: linear-gradient(180deg, transparent 0%, rgba(10, 10, 10, 0.9) 50%, var(--primary-bg) 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
  
  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
    gap: 3rem;
  }
  
  @media (max-width: 576px) {
    padding: 2rem 1rem;
    gap: 2rem;
  }
`,h=t(r.h2)`
  font-size: clamp(1.75rem, 6vw, 3rem);
  font-weight: 700;
  background: linear-gradient(135deg, var(--accent-color), #ffffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
  margin-bottom: 2rem;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
  
  @media (max-width: 576px) {
    margin-bottom: 1rem;
  }
`,Y=t(r.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  width: 100%;
  
  @media (max-width: 1200px) {
    max-width: 1000px;
    gap: 1.5rem;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    max-width: 100%;
  }
  
  @media (max-width: 576px) {
    gap: 0.75rem;
  }
`,L=t(r.div)`
  background: var(--glass-bg);
  backdrop-filter: blur(15px);
  border: 1px solid var(--glass-border);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.1), transparent);
    transition: left 0.6s ease;
  }
  
  &:hover {
    transform: translateY(-10px) scale(1.02);
    border-color: var(--accent-color);
    box-shadow: 0 20px 60px rgba(0, 255, 255, 0.3);
    
    &::before {
      left: 100%;
    }
  }
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 16px;
    min-height: 250px;
    
    &:hover {
      transform: translateY(-6px) scale(1.01);
    }
  }
  
  @media (max-width: 576px) {
    padding: 1rem;
    border-radius: 12px;
    min-height: 200px;
    
    &:hover {
      transform: translateY(-4px);
    }
  }
  
  /* Touch devices */
  @media (hover: none) and (pointer: coarse) {
    &:active {
      transform: scale(0.98);
      border-color: var(--accent-color);
    }
  }
`,H=t.div`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  filter: drop-shadow(0 0 10px currentColor);
`,B=t.h3`
  font-size: 1.4rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
  font-weight: 600;
`,O=t.p`
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.7;
  margin-bottom: 1.5rem;
`,X=t.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
`,E=t.span`
  background: rgba(0, 255, 255, 0.1);
  color: var(--accent-color);
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid rgba(0, 255, 255, 0.2);
`,W=t(r.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  max-width: 1000px;
  width: 100%;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
    margin-top: 1.5rem;
  }
  
  @media (max-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
    margin-top: 1rem;
  }
`,N=t(r.div)`
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  &:hover {
    border-color: var(--accent-secondary);
    transform: translateY(-3px);
  }
  
  @media (max-width: 768px) {
    padding: 1rem;
    border-radius: 8px;
    min-height: 100px;
    
    &:hover {
      transform: translateY(-2px);
    }
  }
  
  @media (max-width: 576px) {
    padding: 0.75rem;
    min-height: 80px;
  }
  
  /* Touch devices */
  @media (hover: none) and (pointer: coarse) {
    &:active {
      transform: scale(0.95);
      border-color: var(--accent-secondary);
    }
  }
`,U=t.div`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--accent-secondary);
`,Z=t.h4`
  font-size: 1.1rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
`,J=t.span`
  font-size: 0.8rem;
  color: var(--text-muted);
`;function K(){const c=x.useRef(),n=5e3,s=new Float32Array(n*3),i=new Float32Array(n*3);for(let a=0;a<n;a++){const o=a*3,d=Math.random()*20,m=d*.3,p=a%3*(Math.PI*2/3),g=Math.pow(Math.random(),3)*(Math.random()<.5?1:-1),u=Math.pow(Math.random(),3)*(Math.random()<.5?1:-1),f=Math.pow(Math.random(),3)*(Math.random()<.5?1:-1);s[o]=Math.cos(p+m)*d+g,s[o+1]=u,s[o+2]=Math.sin(p+m)*d+f;const l=new j;l.setHSL(.5+Math.random()*.3,.8,.6),i[o]=l.r,i[o+1]=l.g,i[o+2]=l.b}return y(a=>{c.current&&(c.current.rotation.y=a.clock.elapsedTime*.05)}),e.jsxs("points",{ref:c,children:[e.jsxs("bufferGeometry",{children:[e.jsx("bufferAttribute",{attach:"attributes-position",count:n,array:s,itemSize:3}),e.jsx("bufferAttribute",{attach:"attributes-color",count:n,array:i,itemSize:3})]}),e.jsx("pointsMaterial",{size:.05,sizeAttenuation:!0,vertexColors:!0,transparent:!0,alphaTest:.001,depthWrite:!1})]})}const q=[{icon:"🎯",title:"核心模块",description:"场景、相机、光照、材质等基础功能展示",path:"/core/scene-camera"},{icon:"⚡",title:"拓展模块",description:"粒子系统、动画、后期处理等高级特效",path:"/advanced/particles"},{icon:"🔬",title:"实验功能",description:"多视角、协作等前沿技术探索",path:"/experiments/multiviewport"}],Q=[{icon:"🎮",title:"交互式场景控制",description:"完整的场景管理系统，支持多相机切换、动态光照调节和实时渲染参数控制",tags:["Scene","Camera","Controls"],path:"/core/scene-camera"},{icon:"💡",title:"高级光照系统",description:"包含环境光、方向光、点光源、聚光灯等多种光照类型，支持阴影和光照贴图",tags:["Lighting","Shadows","IBL"],path:"/core/lighting"},{icon:"🎨",title:"材质与纹理",description:"丰富的材质库，支持PBR材质、程序化纹理生成和材质编辑器",tags:["PBR","Textures","Materials"],path:"/core/materials"},{icon:"🔺",title:"几何体展示",description:"基础几何体到复杂模型的展示，包含程序化几何体生成和变形动画",tags:["Geometry","Procedural","Morphing"],path:"/core/geometry"},{icon:"🏗️",title:"3D模型加载",description:"支持多种3D模型格式，包含模型优化、LOD系统和批量加载管理",tags:["GLTF","FBX","OBJ","LOD"],path:"/core/models"},{icon:"✨",title:"粒子系统",description:"高性能粒子系统，支持GPU粒子、物理模拟和复杂粒子行为",tags:["Particles","GPU","Physics"],path:"/advanced/particles"},{icon:"🎬",title:"动画系统",description:"骨骼动画、关键帧动画、变形动画和动画混合系统",tags:["Animation","Skeletal","Keyframe"],path:"/advanced/animation"},{icon:"🎭",title:"后期处理",description:"丰富的后期处理效果，包含景深、辉光、色调映射等视觉增强",tags:["Post-processing","DOF","Bloom"],path:"/advanced/postprocessing"},{icon:"🧪",title:"Shader实验",description:"自定义着色器开发，包含顶点着色器、片段着色器和计算着色器",tags:["Shaders","GLSL","Custom"],path:"/advanced/shaders"},{icon:"🏔️",title:"地形生成",description:"程序化地形生成系统，支持高度图、纹理混合和植被分布",tags:["Terrain","Procedural","Heightmap"],path:"/advanced/terrain"},{icon:"🥽",title:"WebXR体验",description:"VR/AR支持，沉浸式3D体验和手势交互系统",tags:["WebXR","VR","AR"],path:"/advanced/webxr"},{icon:"📱",title:"多视角系统",description:"多视口渲染、画中画效果和自定义视角管理",tags:["Multi-viewport","PiP","Views"],path:"/experiments/multiviewport"}],_=[{icon:"⚛️",name:"React",version:"18.x"},{icon:"🎯",name:"Three.js",version:"0.158+"},{icon:"🔧",name:"React Three Fiber",version:"8.x"},{icon:"🎨",name:"React Three Drei",version:"9.x"},{icon:"⚡",name:"Vite",version:"5.x"},{icon:"💫",name:"Framer Motion",version:"10.x"},{icon:"🎭",name:"Styled Components",version:"6.x"},{icon:"🔀",name:"React Router",version:"6.x"}];function re(){const c=T(),n=()=>{const i=document.getElementById("explore-more-section");i&&i.scrollIntoView({behavior:"smooth"})},s=i=>{c(i)};return e.jsxs(k,{children:[e.jsxs("div",{style:{position:"relative",height:"100vh"},children:[e.jsx(M,{children:e.jsx(v,{camera:{position:[0,0,10],fov:75},gl:{antialias:!0,alpha:!0},children:e.jsxs(x.Suspense,{fallback:null,children:[e.jsx(K,{}),e.jsx(w,{radius:100,depth:50,count:1e3,factor:4,saturation:0,fade:!0}),e.jsx(b,{enableZoom:!1,enablePan:!1,autoRotate:!0,autoRotateSpeed:.5})]})})}),e.jsxs(C,{children:[e.jsxs(S,{initial:{opacity:0,y:50},animate:{opacity:1,y:0},transition:{duration:1,delay:.5},children:[e.jsx(z,{initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},transition:{duration:1,delay:.7},children:"Three.js 展示平台"}),e.jsx(R,{initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{duration:1,delay:.9},children:"探索 WebGL 的无限可能，体验交互式 3D 图形的魅力"})]}),e.jsx(I,{initial:{opacity:0,y:50},animate:{opacity:1,y:0},transition:{duration:1,delay:1.1},children:q.map((i,a)=>e.jsxs(F,{initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{duration:.6,delay:1.3+a*.2},whileHover:{scale:1.05},whileTap:{scale:.95},as:r.div,onClick:()=>s(i.path),children:[e.jsx(P,{children:i.icon}),e.jsx(V,{children:i.title}),e.jsx(A,{children:i.description})]},a))}),e.jsxs(D,{initial:{opacity:0},animate:{opacity:1},transition:{duration:1,delay:2},onClick:n,children:[e.jsx("span",{children:"探索更多"}),e.jsx(r.div,{animate:{y:[0,10,0]},transition:{duration:2,repeat:1/0},children:"↓"})]})]})]}),e.jsxs(G,{id:"explore-more-section",initial:{opacity:0},whileInView:{opacity:1},transition:{duration:1},viewport:{once:!0,margin:"-100px"},children:[e.jsx(h,{initial:{opacity:0,y:50},whileInView:{opacity:1,y:0},transition:{duration:.8},viewport:{once:!0},children:"功能特性详览"}),e.jsx(Y,{initial:{opacity:0,y:50},whileInView:{opacity:1,y:0},transition:{duration:.8,delay:.2},viewport:{once:!0},children:Q.map((i,a)=>e.jsxs(L,{initial:{opacity:0,y:30},whileInView:{opacity:1,y:0},transition:{duration:.6,delay:a*.1},viewport:{once:!0},whileHover:{scale:1.02},whileTap:{scale:.98},onClick:()=>s(i.path),children:[e.jsx(H,{children:i.icon}),e.jsx(B,{children:i.title}),e.jsx(O,{children:i.description}),e.jsx(X,{children:i.tags.map((o,d)=>e.jsx(E,{children:o},d))})]},a))}),e.jsx(h,{initial:{opacity:0,y:50},whileInView:{opacity:1,y:0},transition:{duration:.8},viewport:{once:!0},style:{marginTop:"4rem"},children:"技术栈"}),e.jsx(W,{initial:{opacity:0,y:50},whileInView:{opacity:1,y:0},transition:{duration:.8,delay:.2},viewport:{once:!0},children:_.map((i,a)=>e.jsxs(N,{initial:{opacity:0,scale:.8},whileInView:{opacity:1,scale:1},transition:{duration:.5,delay:a*.1},viewport:{once:!0},whileHover:{scale:1.05},children:[e.jsx(U,{children:i.icon}),e.jsx(Z,{children:i.name}),e.jsx(J,{children:i.version})]},a))})]})]})}export{re as default};
//# sourceMappingURL=Home-2057fd13.js.map
