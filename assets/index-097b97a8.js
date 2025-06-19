import{r as g,j as e,R as o,_ as a,c as z}from"./react-three-vendor-8ce1f887.js";import{u as P,L as _,R as A,a as r,B as R}from"./react-vendor-4eb53a8b.js";import{d as n,m as y}from"./style-vendor-f8a8899f.js";import{m as b,A as f}from"./animation-vendor-2dec0a74.js";import"./three-vendor-1aa2ed72.js";(function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))d(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const p of s.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&d(p)}).observe(document,{childList:!0,subtree:!0});function h(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function d(i){if(i.ep)return;i.ep=!0;const s=h(i);fetch(i.href,s)}})();const O=n.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background: rgba(10, 10, 10, 0.9);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  
  @media (max-width: 1200px) {
    padding: 0 1.5rem;
  }
  
  @media (max-width: 768px) {
    padding: 0 1rem;
    height: 70px;
  }
  
  @media (max-width: 576px) {
    padding: 0 0.75rem;
    height: 60px;
  }
`,D=n(_)`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--accent-color);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    color: #00cccc;
  }
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
    gap: 0.3rem;
  }
  
  @media (max-width: 576px) {
    font-size: 1.1rem;
    
    span {
      font-size: 1.2rem;
    }
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
    
    span {
      display: none;
    }
  }
`,T=n.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: 1200px) {
    gap: 1.5rem;
  }
  
  @media (max-width: 992px) {
    gap: 1rem;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`,I=n.div`
  position: relative;
  cursor: pointer;
`,v=n(_)`
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    color: var(--accent-color);
    background: rgba(0, 255, 255, 0.1);
  }
  
  &.active {
    color: var(--accent-color);
    background: rgba(0, 255, 255, 0.2);
  }
`,M=n(b.div)`
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 200px;
  background: rgba(26, 26, 26, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1rem 0;
  margin-top: 0.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`,k=n(_)`
  display: block;
  color: var(--text-secondary);
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: var(--accent-color);
    background: rgba(0, 255, 255, 0.1);
  }
`,S=n.button`
  display: none;
  background: none;
  border: none;
  color: var(--text-primary);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: var(--accent-color);
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  @media (max-width: 768px) {
    display: block;
  }
  
  @media (max-width: 576px) {
    font-size: 1.3rem;
    padding: 0.4rem;
  }
`,V=n(b.div)`
  position: fixed;
  top: 80px;
  left: 0;
  width: 100%;
  height: calc(100vh - 80px);
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(20px);
  padding: 2rem;
  z-index: 999;
  overflow-y: auto;
  
  @media (max-width: 768px) {
    top: 70px;
    height: calc(100vh - 70px);
    padding: 1.5rem;
  }
  
  @media (max-width: 576px) {
    top: 60px;
    height: calc(100vh - 60px);
    padding: 1rem;
  }
`,j=[{title:"首页",path:"/"},{title:"核心模块",items:[{title:"场景与相机",path:"/core/scene-camera"},{title:"光照系统",path:"/core/lighting"},{title:"材质与纹理",path:"/core/materials"},{title:"几何体展示",path:"/core/geometry"},{title:"模型加载",path:"/core/models"}]},{title:"拓展模块",items:[{title:"粒子系统",path:"/advanced/particles"},{title:"动画系统",path:"/advanced/animation"},{title:"后期处理",path:"/advanced/postprocessing"},{title:"着色器实验",path:"/advanced/shaders"},{title:"地形生成",path:"/advanced/terrain"},{title:"WebXR 体验",path:"/advanced/webxr"}]},{title:"实验功能",items:[{title:"多视角渲染",path:"/experiments/multiviewport"},{title:"多用户协作",path:"/experiments/collaborative"},{title:"场景导出器",path:"/experiments/exporter"},{title:"3D UI 菜单",path:"/experiments/ui3d"}]},{title:"关于",path:"/about"}];function C(){const[x,c]=g.useState(null),[h,d]=g.useState(!1),i=P(),s=t=>{c(t)},p=()=>{c(null)},w=t=>i.pathname===t,E=t=>t==null?void 0:t.some(l=>i.pathname===l.path);return e.jsxs(O,{children:[e.jsxs(D,{to:"/",children:[e.jsx("span",{children:"🎪"}),"Three.js Interactive Gallery"]}),e.jsx(T,{children:j.map((t,l)=>e.jsxs(I,{onMouseEnter:()=>t.items&&s(l),onMouseLeave:p,children:[t.path?e.jsx(v,{to:t.path,className:w(t.path)?"active":"",children:t.title}):e.jsxs(v,{as:"span",className:E(t.items)?"active":"",children:[t.title," ▼"]}),e.jsx(f,{children:x===l&&t.items&&e.jsx(M,{initial:{opacity:0,y:-10},animate:{opacity:1,y:0},exit:{opacity:0,y:-10},transition:{duration:.2},children:t.items.map((m,u)=>e.jsx(k,{to:m.path,onClick:()=>c(null),children:m.title},u))})})]},l))}),e.jsx(S,{onClick:()=>d(!h),children:"☰"}),e.jsx(f,{children:h&&e.jsx(V,{initial:{opacity:0,x:"100%"},animate:{opacity:1,x:0},exit:{opacity:0,x:"100%"},transition:{duration:.3},children:e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:j.map((t,l)=>{var m;return e.jsx("div",{children:t.path?e.jsx(v,{to:t.path,onClick:()=>d(!1),style:{display:"block",fontSize:"1.2rem"},children:t.title}):e.jsxs("div",{children:[e.jsx("div",{style:{color:"var(--accent-color)",fontSize:"1.2rem",fontWeight:"600",marginBottom:"0.5rem"},children:t.title}),(m=t.items)==null?void 0:m.map((u,L)=>e.jsx(v,{to:u.path,onClick:()=>d(!1),style:{display:"block",marginLeft:"1rem",marginBottom:"0.5rem"},children:u.title},L))]})},l)})})})})]})}const N=y`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`,B=y`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`,G=n.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--primary-bg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`,U=n.div`
  width: 60px;
  height: 60px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top: 3px solid var(--accent-color);
  border-radius: 50%;
  animation: ${N} 1s linear infinite;
  margin-bottom: 2rem;
`,W=n.div`
  color: var(--text-secondary);
  font-size: 1.2rem;
  font-weight: 500;
  animation: ${B} 2s ease-in-out infinite;
`,X=n.div`
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-top: 0.5rem;
  text-align: center;
  max-width: 300px;
`;function $({message:x="加载中...",subtext:c="正在初始化 Three.js 场景"}){return e.jsxs(G,{children:[e.jsx(U,{}),e.jsx(W,{children:x}),e.jsx(X,{children:c})]})}const q=o.lazy(()=>a(()=>import("./Home-75dd3c4e.js"),["assets/Home-75dd3c4e.js","assets/react-three-vendor-8ce1f887.js","assets/three-vendor-1aa2ed72.js","assets/style-vendor-f8a8899f.js","assets/animation-vendor-2dec0a74.js"])),F=o.lazy(()=>a(()=>import("./SceneCamera-6860d71f.js"),["assets/SceneCamera-6860d71f.js","assets/react-three-vendor-8ce1f887.js","assets/three-vendor-1aa2ed72.js","assets/leva.esm-b659d5ba.js","assets/style-vendor-f8a8899f.js","assets/animation-vendor-2dec0a74.js"])),H=o.lazy(()=>a(()=>import("./LightingSystem-b4f6b9f0.js"),["assets/LightingSystem-b4f6b9f0.js","assets/react-three-vendor-8ce1f887.js","assets/three-vendor-1aa2ed72.js","assets/leva.esm-b659d5ba.js","assets/style-vendor-f8a8899f.js","assets/animation-vendor-2dec0a74.js"])),K=o.lazy(()=>a(()=>import("./MaterialTexture-fe70a433.js"),["assets/MaterialTexture-fe70a433.js","assets/react-three-vendor-8ce1f887.js","assets/three-vendor-1aa2ed72.js","assets/leva.esm-b659d5ba.js","assets/style-vendor-f8a8899f.js","assets/animation-vendor-2dec0a74.js"])),J=o.lazy(()=>a(()=>import("./GeometryShowcase-4bd4f8f5.js"),["assets/GeometryShowcase-4bd4f8f5.js","assets/react-three-vendor-8ce1f887.js","assets/three-vendor-1aa2ed72.js","assets/leva.esm-b659d5ba.js","assets/style-vendor-f8a8899f.js","assets/animation-vendor-2dec0a74.js"])),Q=o.lazy(()=>a(()=>import("./ModelLoader-0d8e80a4.js"),["assets/ModelLoader-0d8e80a4.js","assets/react-three-vendor-8ce1f887.js","assets/three-vendor-1aa2ed72.js","assets/leva.esm-b659d5ba.js","assets/style-vendor-f8a8899f.js","assets/animation-vendor-2dec0a74.js"])),Y=o.lazy(()=>a(()=>import("./ParticleSystem-02c2cd42.js"),["assets/ParticleSystem-02c2cd42.js","assets/react-three-vendor-8ce1f887.js","assets/three-vendor-1aa2ed72.js","assets/leva.esm-b659d5ba.js","assets/style-vendor-f8a8899f.js","assets/animation-vendor-2dec0a74.js"])),Z=o.lazy(()=>a(()=>import("./AnimationSystem-8e9793e9.js"),["assets/AnimationSystem-8e9793e9.js","assets/react-three-vendor-8ce1f887.js","assets/three-vendor-1aa2ed72.js","assets/leva.esm-b659d5ba.js","assets/style-vendor-f8a8899f.js","assets/animation-vendor-2dec0a74.js"])),ee=o.lazy(()=>a(()=>import("./PostProcessing-1c03eb06.js"),["assets/PostProcessing-1c03eb06.js","assets/react-three-vendor-8ce1f887.js","assets/three-vendor-1aa2ed72.js","assets/leva.esm-b659d5ba.js","assets/style-vendor-f8a8899f.js","assets/animation-vendor-2dec0a74.js"])),te=o.lazy(()=>a(()=>import("./ShaderExperiments-92fcc3f1.js"),["assets/ShaderExperiments-92fcc3f1.js","assets/react-three-vendor-8ce1f887.js","assets/three-vendor-1aa2ed72.js","assets/leva.esm-b659d5ba.js","assets/style-vendor-f8a8899f.js","assets/animation-vendor-2dec0a74.js"])),ie=o.lazy(()=>a(()=>import("./TerrainGeneration-498902be.js"),["assets/TerrainGeneration-498902be.js","assets/react-three-vendor-8ce1f887.js","assets/three-vendor-1aa2ed72.js","assets/leva.esm-b659d5ba.js","assets/style-vendor-f8a8899f.js","assets/animation-vendor-2dec0a74.js"])),oe=o.lazy(()=>a(()=>import("./WebXRExperience-ad5f5abb.js"),["assets/WebXRExperience-ad5f5abb.js","assets/react-three-vendor-8ce1f887.js","assets/three-vendor-1aa2ed72.js","assets/leva.esm-b659d5ba.js","assets/style-vendor-f8a8899f.js","assets/animation-vendor-2dec0a74.js"])),re=o.lazy(()=>a(()=>import("./MultiViewport-e35c8b74.js"),["assets/MultiViewport-e35c8b74.js","assets/react-three-vendor-8ce1f887.js","assets/three-vendor-1aa2ed72.js","assets/leva.esm-b659d5ba.js","assets/style-vendor-f8a8899f.js","assets/animation-vendor-2dec0a74.js"])),ae=o.lazy(()=>a(()=>import("./MultiUserCollaboration-8ec4c9e8.js"),["assets/MultiUserCollaboration-8ec4c9e8.js","assets/react-three-vendor-8ce1f887.js","assets/three-vendor-1aa2ed72.js","assets/leva.esm-b659d5ba.js","assets/style-vendor-f8a8899f.js","assets/animation-vendor-2dec0a74.js"])),ne=o.lazy(()=>a(()=>import("./SceneExporter-c01e9514.js"),["assets/SceneExporter-c01e9514.js","assets/react-three-vendor-8ce1f887.js","assets/three-vendor-1aa2ed72.js","assets/leva.esm-b659d5ba.js","assets/style-vendor-f8a8899f.js","assets/animation-vendor-2dec0a74.js"])),se=o.lazy(()=>a(()=>import("./ThreeDUIMenu-a08cac57.js"),["assets/ThreeDUIMenu-a08cac57.js","assets/react-three-vendor-8ce1f887.js","assets/three-vendor-1aa2ed72.js","assets/leva.esm-b659d5ba.js","assets/style-vendor-f8a8899f.js","assets/animation-vendor-2dec0a74.js"])),ce=o.lazy(()=>a(()=>import("./About-b623bc69.js"),["assets/About-b623bc69.js","assets/react-three-vendor-8ce1f887.js","assets/three-vendor-1aa2ed72.js","assets/style-vendor-f8a8899f.js","assets/animation-vendor-2dec0a74.js"])),le=n.div`
  width: 100vw;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  
  /* Ensure proper scrolling on mobile */
  -webkit-overflow-scrolling: touch;
  
  /* Prevent horizontal scroll on small screens */
  @media (max-width: 768px) {
    max-width: 100vw;
  }
`,de=n.main`
  width: 100%;
  height: 100%;
  position: relative;
  padding-top: 80px;
  
  @media (max-width: 768px) {
    padding-top: 70px;
  }
  
  @media (max-width: 576px) {
    padding-top: 60px;
  }
`;function pe(){return e.jsxs(le,{children:[e.jsx(C,{}),e.jsx(de,{children:e.jsx(g.Suspense,{fallback:e.jsx($,{}),children:e.jsxs(A,{children:[e.jsx(r,{path:"/",element:e.jsx(q,{})}),e.jsx(r,{path:"/core/scene-camera",element:e.jsx(F,{})}),e.jsx(r,{path:"/core/lighting",element:e.jsx(H,{})}),e.jsx(r,{path:"/core/materials",element:e.jsx(K,{})}),e.jsx(r,{path:"/core/geometry",element:e.jsx(J,{})}),e.jsx(r,{path:"/core/models",element:e.jsx(Q,{})}),e.jsx(r,{path:"/advanced/particles",element:e.jsx(Y,{})}),e.jsx(r,{path:"/advanced/animation",element:e.jsx(Z,{})}),e.jsx(r,{path:"/advanced/postprocessing",element:e.jsx(ee,{})}),e.jsx(r,{path:"/advanced/shaders",element:e.jsx(te,{})}),e.jsx(r,{path:"/advanced/terrain",element:e.jsx(ie,{})}),e.jsx(r,{path:"/advanced/webxr",element:e.jsx(oe,{})}),e.jsx(r,{path:"/experiments/multiviewport",element:e.jsx(re,{})}),e.jsx(r,{path:"/experiments/collaborative",element:e.jsx(ae,{})}),e.jsx(r,{path:"/experiments/exporter",element:e.jsx(ne,{})}),e.jsx(r,{path:"/experiments/ui3d",element:e.jsx(se,{})}),e.jsx(r,{path:"/about",element:e.jsx(ce,{})})]})})})]})}z.createRoot(document.getElementById("root")).render(e.jsx(o.StrictMode,{children:e.jsx(R,{future:{v7_startTransition:!0,v7_relativeSplatPath:!0},children:e.jsx(pe,{})})}));
//# sourceMappingURL=index-097b97a8.js.map
