import{j as e,C as g,r,O as f,P as j,B as s,a as l,T as u,d as n}from"./react-three-vendor-611369f6.js";import{u as m}from"./leva.esm-82acce57.js";import{d as t}from"./style-vendor-32f1d845.js";import{b as w,ap as S,aq as h,ar as b}from"./three-vendor-1aa2ed72.js";import{m as v}from"./animation-vendor-a22bc070.js";const L=t.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  position: relative;
  padding-top: 80px;
`,y=t.div`
  flex: 1;
  height: calc(100vh - 80px);
  position: relative;
`,M=t(v.div)`
  width: 350px;
  background: rgba(26, 26, 26, 0.95);
  backdrop-filter: blur(20px);
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem;
  overflow-y: auto;
  z-index: 100;
`,I=t.h2`
  color: var(--accent-color);
  font-size: 1.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`,p=t.p`
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
`,x=t.ul`
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
`,R=t.details`
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
`;function P(){return e.jsxs(e.Fragment,{children:[e.jsx(j,{args:[20,20],rotation:[-Math.PI/2,0,0],position:[0,-2,0],receiveShadow:!0,children:e.jsx("meshStandardMaterial",{color:"#2c3e50"})}),e.jsx(s,{position:[-3,0,0],args:[1,1,1],castShadow:!0,receiveShadow:!0,children:e.jsx("meshStandardMaterial",{color:"#e74c3c"})}),e.jsx(l,{position:[0,0,0],args:[.8],castShadow:!0,receiveShadow:!0,children:e.jsx("meshStandardMaterial",{color:"#3498db"})}),e.jsx(s,{position:[3,0,0],args:[1,2,1],castShadow:!0,receiveShadow:!0,children:e.jsx("meshStandardMaterial",{color:"#2ecc71"})}),e.jsx(s,{position:[-1,3,-2],args:[.5,.5,.5],castShadow:!0,children:e.jsx("meshStandardMaterial",{color:"#f39c12"})}),e.jsx(l,{position:[2,2,-1],args:[.4],castShadow:!0,children:e.jsx("meshStandardMaterial",{color:"#9b59b6"})}),e.jsx(s,{position:[0,1,3],args:[.5,4,.5],castShadow:!0,receiveShadow:!0,children:e.jsx("meshStandardMaterial",{color:"#34495e"})}),e.jsx(u,{position:[0,5,0],fontSize:.8,color:"#00ffff",anchorX:"center",anchorY:"middle",children:"光照系统演示"})]})}function z(){const o=r.useRef(),a=r.useRef(),c=r.useRef(),d=r.useRef(),{showHelpers:i}=m("辅助工具",{showHelpers:{value:!0}});return n(i&&o,S,1,"yellow"),n(i&&a,h,.5,"red"),n(i&&c,h,.5,"blue"),n(i&&d,b,"green"),e.jsxs(e.Fragment,{children:[e.jsx("directionalLight",{ref:o,position:[10,10,5],intensity:1,castShadow:!0,"shadow-mapSize-width":2048,"shadow-mapSize-height":2048}),e.jsx("pointLight",{ref:a,position:[-5,3,-5],color:"#ff6b6b",intensity:1,distance:15,castShadow:!0}),e.jsx("pointLight",{ref:c,position:[5,3,5],color:"#4ecdc4",intensity:1,distance:15,castShadow:!0}),e.jsx("spotLight",{ref:d,position:[0,8,0],angle:Math.PI/6,penumbra:.5,intensity:2,color:"#ffffff",castShadow:!0,"shadow-mapSize-width":1024,"shadow-mapSize-height":1024})]})}function C(){const{ambientIntensity:o,directionalIntensity:a,pointIntensity:c,spotIntensity:d,shadowsEnabled:i}=m("光照控制",{ambientIntensity:{value:.3,min:0,max:2,step:.1},directionalIntensity:{value:1,min:0,max:3,step:.1},pointIntensity:{value:1,min:0,max:3,step:.1},spotIntensity:{value:2,min:0,max:5,step:.1},shadowsEnabled:{value:!0}});return e.jsx(e.Fragment,{children:e.jsx("ambientLight",{intensity:o})})}function k(){return e.jsxs(L,{children:[e.jsx(y,{children:e.jsx(g,{shadows:!0,camera:{position:[8,6,8],fov:75},gl:{antialias:!0,shadowMap:{enabled:!0,type:w}},children:e.jsxs(r.Suspense,{fallback:null,children:[e.jsx(P,{}),e.jsx(C,{}),e.jsx(z,{}),e.jsx(f,{enableDamping:!0,dampingFactor:.05,minDistance:3,maxDistance:30})]})})}),e.jsxs(M,{initial:{x:350},animate:{x:0},transition:{duration:.5},children:[e.jsx(I,{children:"💡 光照系统"}),e.jsx(p,{children:"Three.js 提供了多种光源类型来模拟真实世界的光照效果。本演示展示了环境光、方向光、点光源、聚光灯的特性和阴影效果。"}),e.jsx("h3",{style:{color:"var(--accent-color)",marginBottom:"1rem"},children:"光源类型"}),e.jsxs(x,{children:[e.jsxs("li",{children:[e.jsx("code",{children:"AmbientLight"})," - 环境光，均匀照亮所有物体"]}),e.jsxs("li",{children:[e.jsx("code",{children:"DirectionalLight"})," - 方向光，模拟太阳光"]}),e.jsxs("li",{children:[e.jsx("code",{children:"PointLight"})," - 点光源，从一点向四周发光"]}),e.jsxs("li",{children:[e.jsx("code",{children:"SpotLight"})," - 聚光灯，锥形光束"]}),e.jsxs("li",{children:[e.jsx("code",{children:"HemisphereLight"})," - 半球光，模拟天空光"]}),e.jsxs("li",{children:[e.jsx("code",{children:"RectAreaLight"})," - 矩形区域光"]})]}),e.jsx("h3",{style:{color:"var(--accent-color)",marginBottom:"1rem",marginTop:"2rem"},children:"阴影系统"}),e.jsxs(x,{children:[e.jsxs("li",{children:[e.jsx("code",{children:"castShadow"})," - 物体投射阴影"]}),e.jsxs("li",{children:[e.jsx("code",{children:"receiveShadow"})," - 物体接收阴影"]}),e.jsxs("li",{children:[e.jsx("code",{children:"PCFSoftShadowMap"})," - 软阴影算法"]}),e.jsxs("li",{children:[e.jsx("code",{children:"shadow-mapSize"})," - 阴影贴图分辨率"]})]}),e.jsx("h3",{style:{color:"var(--accent-color)",marginBottom:"1rem",marginTop:"2rem"},children:"交互说明"}),e.jsxs(p,{children:["• 使用右侧控制面板调整光照参数",e.jsx("br",{}),"• 观察不同光源的照明效果",e.jsx("br",{}),"• 注意阴影的形成和变化",e.jsx("br",{}),"• 彩色光源会影响物体颜色"]}),e.jsxs(R,{children:[e.jsx("summary",{children:"🔍 查看核心代码"}),e.jsx("pre",{children:`// 方向光设置
const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(10, 10, 5)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 2048
directionalLight.shadow.mapSize.height = 2048

// 点光源设置
const pointLight = new THREE.PointLight(0xff6b6b, 1, 15, 2)
pointLight.position.set(-5, 3, -5)
pointLight.castShadow = true

// 聚光灯设置
const spotLight = new THREE.SpotLight(0xffffff, 2, 20, Math.PI / 6, 0.5)
spotLight.position.set(0, 8, 0)
spotLight.castShadow = true

// 启用阴影
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap`})]})]})]})}export{k as default};
//# sourceMappingURL=LightingSystem-a2ad87a9.js.map
