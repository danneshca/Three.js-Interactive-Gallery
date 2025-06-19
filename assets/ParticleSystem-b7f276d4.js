import{j as e,C as S,r as p,O as C,T as v,u as M}from"./react-three-vendor-611369f6.js";import{u as z}from"./leva.esm-82acce57.js";import{d as b}from"./style-vendor-32f1d845.js";import{X as g,ao as T}from"./three-vendor-1aa2ed72.js";import{m as R}from"./animation-vendor-a22bc070.js";const F=b.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  position: relative;
  padding-top: 80px;
`,E=b.div`
  flex: 1;
  height: calc(100vh - 80px);
  position: relative;
`,B=b(R.div)`
  width: 350px;
  background: rgba(26, 26, 26, 0.95);
  backdrop-filter: blur(20px);
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem;
  overflow-y: auto;
  z-index: 100;
`,k=b.h2`
  color: var(--accent-color);
  font-size: 1.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`,w=b.p`
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
`,y=b.ul`
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
`,P=b.details`
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
`;function A({count:r=1e3}){const n=p.useRef(),a=p.useRef(),h=p.useRef(),{positions:l,colors:x,velocities:m,lifetimes:c}=p.useMemo(()=>{const i=new Float32Array(r*3),s=new Float32Array(r*3),t=new Float32Array(r*3),u=new Float32Array(r);for(let d=0;d<r;d++){const o=d*3;i[o]=(Math.random()-.5)*2,i[o+1]=Math.random()*2+3,i[o+2]=(Math.random()-.5)*2,t[o]=(Math.random()-.5)*10,t[o+1]=Math.random()*5+2,t[o+2]=(Math.random()-.5)*10;const j=Math.random(),f=new g().setHSL(j,1,.7);s[o]=f.r,s[o+1]=f.g,s[o+2]=f.b,u[d]=Math.random()*3+1}return{positions:i,colors:s,velocities:t,lifetimes:u}},[r]);return a.current=m,h.current=c,M((i,s)=>{if(n.current){const t=n.current.geometry.attributes.position.array,u=n.current.geometry.attributes.color.array;for(let d=0;d<r;d++){const o=d*3;if(t[o]+=a.current[o]*s,t[o+1]+=a.current[o+1]*s,t[o+2]+=a.current[o+2]*s,a.current[o+1]-=9.8*s,h.current[d]-=s,Math.max(0,h.current[d]/3),h.current[d]<=0){t[o]=(Math.random()-.5)*2,t[o+1]=Math.random()*2+3,t[o+2]=(Math.random()-.5)*2,a.current[o]=(Math.random()-.5)*10,a.current[o+1]=Math.random()*5+2,a.current[o+2]=(Math.random()-.5)*10,h.current[d]=Math.random()*3+1;const j=Math.random(),f=new g().setHSL(j,1,.7);u[o]=f.r,u[o+1]=f.g,u[o+2]=f.b}}n.current.geometry.attributes.position.needsUpdate=!0,n.current.geometry.attributes.color.needsUpdate=!0}}),e.jsxs("points",{ref:n,children:[e.jsxs("bufferGeometry",{children:[e.jsx("bufferAttribute",{attach:"attributes-position",count:r,array:l,itemSize:3}),e.jsx("bufferAttribute",{attach:"attributes-color",count:r,array:x,itemSize:3})]}),e.jsx("pointsMaterial",{size:.1,sizeAttenuation:!0,vertexColors:!0,transparent:!0,alphaTest:.001,depthWrite:!1,blending:T})]})}function G({count:r=5e3}){const n=p.useRef(),{positions:a,colors:h}=p.useMemo(()=>{const l=new Float32Array(r*3),x=new Float32Array(r*3);for(let m=0;m<r;m++){const c=m*3,i=Math.random()*15,s=i*.3,t=m%3*(Math.PI*2/3),u=Math.pow(Math.random(),3)*(Math.random()<.5?1:-1)*.5,d=Math.pow(Math.random(),3)*(Math.random()<.5?1:-1)*.5,o=Math.pow(Math.random(),3)*(Math.random()<.5?1:-1)*.5;l[c]=Math.cos(t+s)*i+u,l[c+1]=d,l[c+2]=Math.sin(t+s)*i+o;const j=new g,f=Math.sqrt(l[c]**2+l[c+2]**2);j.setHSL(.6-f*.02,.8,.6),x[c]=j.r,x[c+1]=j.g,x[c+2]=j.b}return{positions:l,colors:x}},[r]);return M(l=>{n.current&&(n.current.rotation.y=l.clock.elapsedTime*.05)}),e.jsxs("points",{ref:n,children:[e.jsxs("bufferGeometry",{children:[e.jsx("bufferAttribute",{attach:"attributes-position",count:r,array:a,itemSize:3}),e.jsx("bufferAttribute",{attach:"attributes-color",count:r,array:h,itemSize:3})]}),e.jsx("pointsMaterial",{size:.03,sizeAttenuation:!0,vertexColors:!0,transparent:!0,alphaTest:.001,depthWrite:!1})]})}function H({count:r=2e3}){const n=p.useRef(),a=p.useRef(),{positions:h,colors:l,velocities:x}=p.useMemo(()=>{const m=new Float32Array(r*3),c=new Float32Array(r*3),i=new Float32Array(r*3);for(let s=0;s<r;s++){const t=s*3;m[t]=(Math.random()-.5)*4,m[t+1]=Math.random()*10+5,m[t+2]=(Math.random()-.5)*2,i[t]=(Math.random()-.5)*.5,i[t+1]=-Math.random()*3-2,i[t+2]=(Math.random()-.5)*.5;const u=.3+Math.random()*.4;c[t]=.1,c[t+1]=.3+Math.random()*.3,c[t+2]=u}return{positions:m,colors:c,velocities:i}},[r]);return a.current=x,M((m,c)=>{if(n.current){const i=n.current.geometry.attributes.position.array;for(let s=0;s<r;s++){const t=s*3;i[t]+=a.current[t]*c,i[t+1]+=a.current[t+1]*c,i[t+2]+=a.current[t+2]*c,a.current[t+1]-=5*c,i[t+1]<-2&&(i[t]=(Math.random()-.5)*4,i[t+1]=Math.random()*10+5,i[t+2]=(Math.random()-.5)*2,a.current[t]=(Math.random()-.5)*.5,a.current[t+1]=-Math.random()*3-2,a.current[t+2]=(Math.random()-.5)*.5)}n.current.geometry.attributes.position.needsUpdate=!0}}),e.jsxs("points",{ref:n,children:[e.jsxs("bufferGeometry",{children:[e.jsx("bufferAttribute",{attach:"attributes-position",count:r,array:h,itemSize:3}),e.jsx("bufferAttribute",{attach:"attributes-color",count:r,array:l,itemSize:3})]}),e.jsx("pointsMaterial",{size:.05,sizeAttenuation:!0,vertexColors:!0,transparent:!0,alphaTest:.001,depthWrite:!1})]})}function L(){const{particleSystem:r,particleCount:n,particleSize:a,animationSpeed:h}=z("粒子控制",{particleSystem:{value:"fireworks",options:{烟花:"fireworks",星系:"galaxy",瀑布:"waterfall"}},particleCount:{value:2e3,min:500,max:1e4,step:500},particleSize:{value:.05,min:.01,max:.2,step:.01},animationSpeed:{value:1,min:.1,max:3,step:.1}}),l=()=>{switch(r){case"fireworks":return e.jsx(A,{count:n});case"galaxy":return e.jsx(G,{count:n});case"waterfall":return e.jsx(H,{count:n});default:return e.jsx(A,{count:n})}};return e.jsxs(e.Fragment,{children:[l(),e.jsxs("mesh",{position:[0,-2,0],receiveShadow:!0,children:[e.jsx("planeGeometry",{args:[50,50]}),e.jsx("meshStandardMaterial",{color:"#2c3e50",transparent:!0,opacity:.1})]}),e.jsx(v,{position:[0,8,0],fontSize:1,color:"#00ffff",anchorX:"center",anchorY:"middle",children:"粒子系统演示"}),e.jsxs(v,{position:[0,7,0],fontSize:.4,color:"#ffffff",anchorX:"center",anchorY:"middle",children:["当前系统: ",{fireworks:"烟花爆炸",galaxy:"螺旋星系",waterfall:"流水瀑布"}[r]]})]})}function Y(){return e.jsxs(F,{children:[e.jsx(E,{children:e.jsx(S,{camera:{position:[0,5,15],fov:75},gl:{antialias:!0},children:e.jsxs(p.Suspense,{fallback:null,children:[e.jsx(L,{}),e.jsx("ambientLight",{intensity:.2}),e.jsx("directionalLight",{position:[10,10,5],intensity:.5}),e.jsx(C,{enableDamping:!0,dampingFactor:.05,minDistance:5,maxDistance:50})]})})}),e.jsxs(B,{initial:{x:350},animate:{x:0},transition:{duration:.5},children:[e.jsx(k,{children:"✨ 粒子系统"}),e.jsx(w,{children:"粒子系统是创建复杂视觉效果的强大工具，可以模拟火焰、烟雾、爆炸、雨雪等自然现象。Three.js 提供了灵活的粒子系统实现方式。"}),e.jsx("h3",{style:{color:"var(--accent-color)",marginBottom:"1rem"},children:"粒子系统类型"}),e.jsxs(y,{children:[e.jsxs("li",{children:[e.jsx("code",{children:"烟花系统"})," - 爆炸效果，重力影响，生命周期"]}),e.jsxs("li",{children:[e.jsx("code",{children:"星系系统"})," - 螺旋结构，旋转动画，距离着色"]}),e.jsxs("li",{children:[e.jsx("code",{children:"瀑布系统"})," - 流体模拟，重力下落，循环重生"]})]}),e.jsx("h3",{style:{color:"var(--accent-color)",marginBottom:"1rem",marginTop:"2rem"},children:"核心组件"}),e.jsxs(y,{children:[e.jsxs("li",{children:[e.jsx("code",{children:"BufferGeometry"})," - 高效的几何体存储"]}),e.jsxs("li",{children:[e.jsx("code",{children:"PointsMaterial"})," - 点材质，支持纹理和颜色"]}),e.jsxs("li",{children:[e.jsx("code",{children:"BufferAttribute"})," - 顶点属性（位置、颜色等）"]}),e.jsxs("li",{children:[e.jsx("code",{children:"Points"})," - 点云渲染对象"]})]}),e.jsx("h3",{style:{color:"var(--accent-color)",marginBottom:"1rem",marginTop:"2rem"},children:"优化技巧"}),e.jsxs(y,{children:[e.jsxs("li",{children:[e.jsx("code",{children:"sizeAttenuation"})," - 距离衰减，增强深度感"]}),e.jsxs("li",{children:[e.jsx("code",{children:"alphaTest"})," - 透明度测试，提高性能"]}),e.jsxs("li",{children:[e.jsx("code",{children:"depthWrite"})," - 深度写入控制"]}),e.jsxs("li",{children:[e.jsx("code",{children:"AdditiveBlending"})," - 加法混合，发光效果"]}),e.jsxs("li",{children:[e.jsx("code",{children:"frustumCulled"})," - 视锥体剔除"]})]}),e.jsx("h3",{style:{color:"var(--accent-color)",marginBottom:"1rem",marginTop:"2rem"},children:"性能考虑"}),e.jsxs(w,{children:["• 合理控制粒子数量（1000-10000）",e.jsx("br",{}),"• 使用 BufferGeometry 而非 Geometry",e.jsx("br",{}),"• 避免频繁的几何体重建",e.jsx("br",{}),"• 使用纹理图集减少绘制调用",e.jsx("br",{}),"• 考虑使用 GPU 粒子系统进行大规模计算"]}),e.jsxs(P,{children:[e.jsx("summary",{children:"🔍 查看核心代码"}),e.jsx("pre",{children:`// 创建粒子系统
const particleCount = 1000
const positions = new Float32Array(particleCount * 3)
const colors = new Float32Array(particleCount * 3)
const velocities = new Float32Array(particleCount * 3)

// 初始化粒子属性
for (let i = 0; i < particleCount; i++) {
  const i3 = i * 3
  
  // 位置
  positions[i3] = (Math.random() - 0.5) * 10
  positions[i3 + 1] = Math.random() * 5
  positions[i3 + 2] = (Math.random() - 0.5) * 10
  
  // 速度
  velocities[i3] = (Math.random() - 0.5) * 2
  velocities[i3 + 1] = Math.random() * 2
  velocities[i3 + 2] = (Math.random() - 0.5) * 2
  
  // 颜色
  const color = new THREE.Color().setHSL(Math.random(), 1, 0.7)
  colors[i3] = color.r
  colors[i3 + 1] = color.g
  colors[i3 + 2] = color.b
}

// 创建几何体和材质
const geometry = new THREE.BufferGeometry()
geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

const material = new THREE.PointsMaterial({
  size: 0.1,
  sizeAttenuation: true,
  vertexColors: true,
  transparent: true,
  alphaTest: 0.001,
  depthWrite: false
})

const particles = new THREE.Points(geometry, material)
scene.add(particles)

// 动画更新
function updateParticles(delta) {
  const positions = particles.geometry.attributes.position.array
  
  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3
    
    // 更新位置
    positions[i3] += velocities[i3] * delta
    positions[i3 + 1] += velocities[i3 + 1] * delta
    positions[i3 + 2] += velocities[i3 + 2] * delta
    
    // 应用重力
    velocities[i3 + 1] -= 9.8 * delta
  }
  
  particles.geometry.attributes.position.needsUpdate = true
}`})]})]})]})}export{Y as default};
//# sourceMappingURL=ParticleSystem-b7f276d4.js.map
