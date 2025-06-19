import{r as n,j as e}from"./react-three-vendor-8ce1f887.js";import{d as r}from"./style-vendor-f8a8899f.js";import{m as d}from"./animation-vendor-2dec0a74.js";import"./three-vendor-1aa2ed72.js";const o={container:{initial:{opacity:0,y:50},animate:{opacity:1,y:0},transition:{duration:.8}},featureCard:{initial:{opacity:0,y:20},animate:{opacity:1,y:0},whileHover:{scale:1.05},transition:{duration:.5}},techItem:{initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},whileHover:{scale:1.1},transition:{duration:.3}}},i={mobile:"480px",tablet:"768px",desktop:"1024px"},s=r.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  padding-top: 120px;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  
  @media (max-width: ${i.mobile}) {
    padding: 1rem 0.5rem;
    padding-top: 100px;
  }
`,c=r(d.div)`
  max-width: 900px;
  width: 100%;
  text-align: center;
  background: rgba(26, 26, 26, 0.9);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  
  @media (max-width: ${i.tablet}) {
    padding: 2rem;
    border-radius: 16px;
  }
  
  @media (max-width: ${i.mobile}) {
    padding: 1.5rem;
    border-radius: 12px;
    margin: 0 0.5rem;
  }
`,p=r.h1`
  color: var(--accent-color);
  font-size: clamp(2rem, 5vw, 3rem);
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #00ffff, #ff00ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
  letter-spacing: -0.02em;
`,x=r.h2`
  color: var(--text-secondary);
  font-size: clamp(1.1rem, 3vw, 1.5rem);
  margin-bottom: 2rem;
  font-weight: 300;
  line-height: 1.4;
`,b=r.p`
  color: var(--text-secondary);
  font-size: clamp(1rem, 2.5vw, 1.1rem);
  line-height: 1.8;
  margin-bottom: 2rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`,g=r.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
  
  @media (max-width: ${i.tablet}) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
  }
  
  @media (max-width: ${i.mobile}) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`,h=r(d.div)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: left;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(0, 255, 255, 0.3);
    box-shadow: 0 8px 25px rgba(0, 255, 255, 0.1);
  }
  
  &:focus-visible {
    outline: 2px solid var(--accent-color);
    outline-offset: 2px;
  }
  
  h3 {
    color: var(--accent-color);
    margin-bottom: 0.5rem;
    font-size: clamp(1.1rem, 2.5vw, 1.2rem);
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  p {
    color: var(--text-secondary);
    font-size: clamp(0.85rem, 2vw, 0.9rem);
    line-height: 1.6;
    margin: 0;
  }
  
  @media (max-width: ${i.mobile}) {
    padding: 1.25rem;
  }
`,u=r.section`
  margin-top: 2rem;
  
  h3 {
    color: var(--accent-color);
    margin-bottom: 1rem;
    font-size: clamp(1.2rem, 3vw, 1.4rem);
    font-weight: 600;
  }
  
  .tech-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    justify-content: center;
    
    @media (max-width: ${i.mobile}) {
      gap: 0.5rem;
    }
  }
`,f=r(d.span)`
  background: rgba(0, 255, 255, 0.1);
  color: var(--accent-color);
  padding: 0.6rem 1.2rem;
  border-radius: 25px;
  font-size: clamp(0.8rem, 2vw, 0.9rem);
  font-weight: 500;
  border: 1px solid rgba(0, 255, 255, 0.3);
  transition: all 0.3s ease;
  cursor: pointer;
  user-select: none;
  
  &:hover {
    background: rgba(0, 255, 255, 0.2);
    border-color: rgba(0, 255, 255, 0.5);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 255, 255, 0.2);
  }
  
  &:focus-visible {
    outline: 2px solid var(--accent-color);
    outline-offset: 2px;
  }
  
  @media (max-width: ${i.mobile}) {
    padding: 0.5rem 1rem;
  }
`,w=[{id:"core",title:"🎯 核心模块",description:"场景相机控制、光照系统、材质纹理、几何体展示、模型加载等基础功能模块"},{id:"advanced",title:"🚀 高级功能",description:"粒子系统、动画系统、后处理效果、着色器实验、地形生成、WebXR体验"},{id:"experimental",title:"🧪 实验功能",description:"多视口渲染、多用户协作、场景导出、3D UI菜单等前沿技术"},{id:"responsive",title:"📱 响应式设计",description:"适配各种设备尺寸，提供流畅的跨平台3D体验"},{id:"ui",title:"🎨 现代UI",description:"基于Styled Components和Framer Motion的现代化用户界面"},{id:"performance",title:"⚡ 高性能",description:"优化的渲染管线，支持复杂场景的实时渲染"}],v=["React","Three.js","@react-three/fiber","@react-three/drei","Styled Components","Framer Motion","Leva","WebGL","GLSL","WebXR","WebRTC","Vite"],l=n.memo(({feature:t,index:a})=>e.jsxs(h,{...o.featureCard,transition:{...o.featureCard.transition,delay:a*.1},tabIndex:0,role:"article","aria-label":`功能特性: ${t.title}`,children:[e.jsx("h3",{children:t.title}),e.jsx("p",{children:t.description})]},t.id));l.displayName="FeatureCard";const m=n.memo(()=>e.jsxs(u,{children:[e.jsx("h3",{children:"🛠️ 技术栈"}),e.jsx("div",{className:"tech-list",role:"list","aria-label":"使用的技术栈",children:v.map((t,a)=>e.jsx(f,{...o.techItem,transition:{...o.techItem.transition,delay:a*.05},tabIndex:0,role:"listitem","aria-label":`技术: ${t}`,children:t},t))})]}));m.displayName="TechStack";const y=n.memo(()=>e.jsx(s,{role:"main",children:e.jsxs(c,{...o.container,as:"article","aria-labelledby":"about-title",children:[e.jsx(p,{id:"about-title",children:"Three.js 展示平台"}),e.jsx(x,{children:"现代化的3D Web开发技术展示"}),e.jsx(b,{children:"这是一个基于React和Three.js构建的综合性3D技术展示平台， 旨在展示现代Web 3D开发的各种技术和最佳实践。 从基础的场景搭建到高级的着色器编程，从简单的几何体到复杂的粒子系统， 这个平台涵盖了3D Web开发的方方面面。"}),e.jsxs(g,{role:"region","aria-labelledby":"features-title",children:[e.jsx("h2",{id:"features-title",style:{display:"none"},children:"功能特性"}),w.map((t,a)=>e.jsx(l,{feature:t,index:a},t.id))]}),e.jsx(m,{})]})}));y.displayName="About";export{y as default};
//# sourceMappingURL=About-b623bc69.js.map
