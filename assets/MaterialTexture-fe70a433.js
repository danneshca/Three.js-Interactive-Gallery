import{j as e,C as M,r as o,O as b,P as T,B as g,a as f,T as v,u as j}from"./react-three-vendor-8ce1f887.js";import{u as w}from"./leva.esm-b659d5ba.js";import{d}from"./style-vendor-f8a8899f.js";import{as as y,at as p}from"./three-vendor-1aa2ed72.js";import{m as S}from"./animation-vendor-2dec0a74.js";const k=d.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  position: relative;
  padding-top: 80px;
`,R=d.div`
  flex: 1;
  height: calc(100vh - 80px);
  position: relative;
`,z=d(S.div)`
  width: 350px;
  background: rgba(26, 26, 26, 0.95);
  backdrop-filter: blur(20px);
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem;
  overflow-y: auto;
  z-index: 100;
`,P=d.h2`
  color: var(--accent-color);
  font-size: 1.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`,C=d.p`
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
`,m=d.ul`
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
`,E=d.details`
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
`;function x(l="checker"){const t=document.createElement("canvas");t.width=512,t.height=512;const s=t.getContext("2d");switch(l){case"checker":for(let r=0;r<t.width;r+=64)for(let i=0;i<t.height;i+=64)s.fillStyle=(r/64+i/64)%2?"#ffffff":"#000000",s.fillRect(r,i,64,64);break;case"gradient":const c=s.createLinearGradient(0,0,t.width,t.height);c.addColorStop(0,"#ff6b6b"),c.addColorStop(.5,"#4ecdc4"),c.addColorStop(1,"#45b7d1"),s.fillStyle=c,s.fillRect(0,0,t.width,t.height);break;case"noise":const n=s.createImageData(t.width,t.height);for(let r=0;r<n.data.length;r+=4){const i=Math.random()*255;n.data[r]=i,n.data[r+1]=i,n.data[r+2]=i,n.data[r+3]=255}s.putImageData(n,0,0);break;default:s.fillStyle="#4ecdc4",s.fillRect(0,0,t.width,t.height)}const a=new y(t);return a.wrapS=p,a.wrapT=p,a}function L({position:l,materialType:t,...s}){const a=o.useRef(),h=o.useMemo(()=>x("checker"),[]);o.useMemo(()=>x("gradient"),[]);const c=o.useMemo(()=>x("noise"),[]);j(r=>{a.current&&(a.current.rotation.y=r.clock.elapsedTime*.5,a.current.rotation.x=Math.sin(r.clock.elapsedTime*.3)*.2)});const n=()=>{const r={transparent:!0,opacity:.9};switch(t){case"basic":return e.jsx("meshBasicMaterial",{color:"#ff6b6b",...r});case"lambert":return e.jsx("meshLambertMaterial",{color:"#4ecdc4",...r});case"phong":return e.jsx("meshPhongMaterial",{color:"#45b7d1",shininess:100,specular:"#ffffff",...r});case"standard":return e.jsx("meshStandardMaterial",{color:"#2ecc71",metalness:.3,roughness:.4,...r});case"physical":return e.jsx("meshPhysicalMaterial",{color:"#9b59b6",metalness:.8,roughness:.2,clearcoat:1,clearcoatRoughness:.1,...r});case"textured":return e.jsx("meshStandardMaterial",{map:h,normalMap:c,normalScale:[.5,.5],...r});case"emissive":return e.jsx("meshStandardMaterial",{color:"#2c3e50",emissive:"#f39c12",emissiveIntensity:.5,...r});case"wireframe":return e.jsx("meshBasicMaterial",{color:"#00ffff",wireframe:!0,...r});default:return e.jsx("meshStandardMaterial",{color:"#ffffff",...r})}};return e.jsx(f,{ref:a,position:l,args:[.8],...s,children:n()})}function u({position:l,textureType:t}){const s=o.useRef(),a=o.useMemo(()=>x("checker"),[]),h=o.useMemo(()=>x("gradient"),[]),c=o.useMemo(()=>x("noise"),[]);j(i=>{s.current&&(s.current.rotation.y=i.clock.elapsedTime*.3,s.current.rotation.x=i.clock.elapsedTime*.2)});const r=(()=>{switch(t){case"checker":return a;case"gradient":return h;case"noise":return c;default:return null}})();return r&&r.repeat.set(2,2),e.jsx(g,{ref:s,position:l,args:[1,1,1],castShadow:!0,children:e.jsx("meshStandardMaterial",{map:r,roughness:.3,metalness:.1})})}function B(){const{materialType:l,showTextures:t,textureRepeat:s,roughness:a,metalness:h}=w("材质控制",{materialType:{value:"standard",options:{基础材质:"basic",Lambert材质:"lambert",Phong材质:"phong",标准材质:"standard",物理材质:"physical",纹理材质:"textured",发光材质:"emissive",线框材质:"wireframe"}},showTextures:{value:!0},textureRepeat:{value:2,min:1,max:8,step:1},roughness:{value:.4,min:0,max:1,step:.1},metalness:{value:.3,min:0,max:1,step:.1}});return e.jsxs(e.Fragment,{children:[e.jsx(T,{args:[20,20],rotation:[-Math.PI/2,0,0],position:[0,-2,0],receiveShadow:!0,children:e.jsx("meshStandardMaterial",{color:"#2c3e50",roughness:.8})}),e.jsx(L,{position:[0,0,0],materialType:l,castShadow:!0}),t&&e.jsxs(e.Fragment,{children:[e.jsx(u,{position:[-3,0,0],textureType:"checker"}),e.jsx(u,{position:[3,0,0],textureType:"gradient"}),e.jsx(u,{position:[0,0,3],textureType:"noise"})]}),e.jsx(g,{position:[-2,2,-2],args:[.8,.8,.8],castShadow:!0,children:e.jsx("meshStandardMaterial",{color:"#e74c3c",roughness:a,metalness:h})}),e.jsx(f,{position:[2,2,-2],args:[.6],castShadow:!0,children:e.jsx("meshPhysicalMaterial",{color:"#3498db",metalness:.9,roughness:.1,clearcoat:1})}),e.jsx(v,{position:[0,4,0],fontSize:.8,color:"#00ffff",anchorX:"center",anchorY:"middle",children:"材质与纹理演示"})]})}function O(){return e.jsxs(k,{children:[e.jsx(R,{children:e.jsx(M,{shadows:!0,camera:{position:[6,4,6],fov:75},gl:{antialias:!0},children:e.jsxs(o.Suspense,{fallback:null,children:[e.jsx(B,{}),e.jsx("ambientLight",{intensity:.3}),e.jsx("directionalLight",{position:[10,10,5],intensity:1,castShadow:!0,"shadow-mapSize-width":2048,"shadow-mapSize-height":2048}),e.jsx("pointLight",{position:[-10,5,-10],intensity:.5,color:"#ff6b6b"}),e.jsx("pointLight",{position:[10,5,10],intensity:.5,color:"#4ecdc4"}),e.jsx(b,{enableDamping:!0,dampingFactor:.05,minDistance:3,maxDistance:20})]})})}),e.jsxs(z,{initial:{x:350},animate:{x:0},transition:{duration:.5},children:[e.jsx(P,{children:"🎨 材质与纹理"}),e.jsx(C,{children:"材质决定了物体表面的视觉特性，包括颜色、反射、透明度等。纹理则为材质提供了更丰富的表面细节。"}),e.jsx("h3",{style:{color:"var(--accent-color)",marginBottom:"1rem"},children:"材质类型"}),e.jsxs(m,{children:[e.jsxs("li",{children:[e.jsx("code",{children:"MeshBasicMaterial"})," - 不受光照影响的基础材质"]}),e.jsxs("li",{children:[e.jsx("code",{children:"MeshLambertMaterial"})," - 漫反射材质"]}),e.jsxs("li",{children:[e.jsx("code",{children:"MeshPhongMaterial"})," - 支持镜面反射"]}),e.jsxs("li",{children:[e.jsx("code",{children:"MeshStandardMaterial"})," - 基于物理的标准材质"]}),e.jsxs("li",{children:[e.jsx("code",{children:"MeshPhysicalMaterial"})," - 高级物理材质"]})]}),e.jsx("h3",{style:{color:"var(--accent-color)",marginBottom:"1rem",marginTop:"2rem"},children:"纹理类型"}),e.jsxs(m,{children:[e.jsxs("li",{children:[e.jsx("code",{children:"map"})," - 漫反射贴图（颜色）"]}),e.jsxs("li",{children:[e.jsx("code",{children:"normalMap"})," - 法线贴图（表面细节）"]}),e.jsxs("li",{children:[e.jsx("code",{children:"roughnessMap"})," - 粗糙度贴图"]}),e.jsxs("li",{children:[e.jsx("code",{children:"metalnessMap"})," - 金属度贴图"]}),e.jsxs("li",{children:[e.jsx("code",{children:"emissiveMap"})," - 发光贴图"]}),e.jsxs("li",{children:[e.jsx("code",{children:"envMap"})," - 环境贴图（反射）"]})]}),e.jsx("h3",{style:{color:"var(--accent-color)",marginBottom:"1rem",marginTop:"2rem"},children:"物理属性"}),e.jsxs(m,{children:[e.jsxs("li",{children:[e.jsx("code",{children:"roughness"})," - 粗糙度 (0=镜面, 1=完全粗糙)"]}),e.jsxs("li",{children:[e.jsx("code",{children:"metalness"})," - 金属度 (0=非金属, 1=金属)"]}),e.jsxs("li",{children:[e.jsx("code",{children:"clearcoat"})," - 透明涂层强度"]}),e.jsxs("li",{children:[e.jsx("code",{children:"transmission"})," - 透射率"]})]}),e.jsxs(E,{children:[e.jsx("summary",{children:"🔍 查看核心代码"}),e.jsx("pre",{children:`// 标准材质设置
const material = new THREE.MeshStandardMaterial({
  color: 0x2ecc71,
  roughness: 0.4,
  metalness: 0.3,
  map: diffuseTexture,
  normalMap: normalTexture,
  roughnessMap: roughnessTexture
})

// 物理材质设置
const physicalMaterial = new THREE.MeshPhysicalMaterial({
  color: 0x9b59b6,
  metalness: 0.8,
  roughness: 0.2,
  clearcoat: 1.0,
  clearcoatRoughness: 0.1,
  transmission: 0.9,
  thickness: 1.0
})

// 纹理设置
const texture = new THREE.TextureLoader().load('texture.jpg')
texture.wrapS = THREE.RepeatWrapping
texture.wrapT = THREE.RepeatWrapping
texture.repeat.set(2, 2)`})]})]})]})}export{O as default};
//# sourceMappingURL=MaterialTexture-fe70a433.js.map
