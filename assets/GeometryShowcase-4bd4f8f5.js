import{j as e,C as B,r as h,O as P,T as b,L as T,u as v}from"./react-three-vendor-8ce1f887.js";import{u as z}from"./leva.esm-b659d5ba.js";import{d as u}from"./style-vendor-f8a8899f.js";import{au as A,av as I,aw as D,ax as F,ay as H,az as L,aA as O,I as W,aB as X,aC as Y,a4 as K,aD as V,aE as N,aF as q,e as w,aG as S,s as g,D as k}from"./three-vendor-1aa2ed72.js";import{m as J}from"./animation-vendor-2dec0a74.js";const Q=u.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  position: relative;
  padding-top: 80px;
`,U=u.div`
  flex: 1;
  height: calc(100vh - 80px);
  position: relative;
`,Z=u(J.div)`
  width: 350px;
  background: rgba(26, 26, 26, 0.95);
  backdrop-filter: blur(20px);
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem;
  overflow-y: auto;
  z-index: 100;
`,_=u.h2`
  color: var(--accent-color);
  font-size: 1.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`,M=u.p`
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
`,G=u.ul`
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
`,$=u.details`
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
`;function ee({geometry:d,position:m,color:i,name:o,wireframe:a=!1}){const n=h.useRef();return v(s=>{n.current&&(n.current.rotation.y=s.clock.elapsedTime*.5,n.current.rotation.x=Math.sin(s.clock.elapsedTime*.3)*.2)}),e.jsxs("group",{position:m,children:[e.jsx("mesh",{ref:n,geometry:d,castShadow:!0,receiveShadow:!0,children:e.jsx("meshStandardMaterial",{color:i,wireframe:a,transparent:!0,opacity:a?.8:.9})}),e.jsx(b,{position:[0,-2,0],fontSize:.3,color:"#ffffff",anchorX:"center",anchorY:"middle",children:o})]})}function re({position:d}){const m=h.useMemo(()=>{const o=new S,a=[],n=[],s=[],x=1,p=.5,t=5;a.push(0,0,0),s.push(1,1,0);for(let r=0;r<t*2;r++){const c=r/(t*2)*Math.PI*2,l=r%2===0?x:p;a.push(Math.cos(c)*l,Math.sin(c)*l,0),r%2===0?s.push(1,.5,0):s.push(.5,1,.5)}for(let r=0;r<t*2;r++){const c=(r+1)%(t*2)+1;n.push(0,r+1,c)}return o.setIndex(n),o.setAttribute("position",new g(a,3)),o.setAttribute("color",new g(s,3)),o.computeVertexNormals(),o},[]),i=h.useRef();return v(o=>{i.current&&(i.current.rotation.z=o.clock.elapsedTime*.5)}),e.jsxs("group",{position:d,children:[e.jsx("mesh",{ref:i,geometry:m,children:e.jsx("meshStandardMaterial",{vertexColors:!0,side:k})}),e.jsx(b,{position:[0,-2,0],fontSize:.3,color:"#ffffff",anchorX:"center",anchorY:"middle",children:"自定义几何体"})]})}function oe({position:d}){const m=h.useMemo(()=>{const n=[],s=[],x=[],p=[];for(let r=0;r<=25;r++)for(let c=0;c<=25;c++){const l=r/25,f=c/25,j=l*Math.PI,y=f*2*Math.PI,C=Math.cos(j)*(3+Math.cos(y))*.3,R=Math.sin(j)*(3+Math.cos(y))*.3,E=Math.sin(y)*.3;n.push(C,R,E),x.push(0,0,1),p.push(l,f)}for(let r=0;r<25;r++)for(let c=0;c<25;c++){const l=r*26+c,f=l+25+1,j=l+1,y=f+1;s.push(l,f,j),s.push(f,y,j)}const t=new S;return t.setIndex(s),t.setAttribute("position",new g(n,3)),t.setAttribute("normal",new g(x,3)),t.setAttribute("uv",new g(p,2)),t.computeVertexNormals(),t},[]),i=h.useRef();return v(o=>{i.current&&(i.current.rotation.x=o.clock.elapsedTime*.3,i.current.rotation.y=o.clock.elapsedTime*.5)}),e.jsxs("group",{position:d,children:[e.jsx("mesh",{ref:i,geometry:m,children:e.jsx("meshStandardMaterial",{color:"#9b59b6",side:k,wireframe:!0})}),e.jsx(b,{position:[0,-2,0],fontSize:.3,color:"#ffffff",anchorX:"center",anchorY:"middle",children:"参数几何体"})]})}function te(){const{showWireframe:d,geometryScale:m,animationSpeed:i}=z("几何体控制",{showWireframe:{value:!1},geometryScale:{value:1,min:.5,max:2,step:.1},animationSpeed:{value:1,min:0,max:3,step:.1}}),o=h.useMemo(()=>({box:new A(1,1,1),sphere:new I(.8,32,32),cylinder:new D(.5,.8,1.5,32),cone:new F(.8,1.5,32),torus:new H(.8,.3,16,100),torusKnot:new L(.6,.2,100,16),dodecahedron:new O(.8),icosahedron:new W(.8),octahedron:new X(.8),tetrahedron:new Y(.8),plane:new K(1.5,1.5,10,10),ring:new V(.3,.8,32),tube:new N(new q([new w(-.5,0,0),new w(0,.5,0),new w(.5,0,0),new w(0,-.5,0)],!0),64,.2,8,!0)}),[]),a=["#e74c3c","#3498db","#2ecc71","#f39c12","#9b59b6","#1abc9c","#e67e22","#34495e","#ff6b6b","#4ecdc4","#45b7d1","#96ceb4","#feca57"],n=[[-6,2,0],[-3,2,0],[0,2,0],[3,2,0],[6,2,0],[-6,-1,0],[-3,-1,0],[0,-1,0],[3,-1,0],[6,-1,0],[-4.5,-4,0],[-1.5,-4,0],[1.5,-4,0]],s=["立方体","球体","圆柱体","圆锥体","圆环体","环结体","十二面体","二十面体","八面体","四面体","平面","圆环","管道"];return e.jsxs(e.Fragment,{children:[e.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,-6,0],receiveShadow:!0,children:[e.jsx("planeGeometry",{args:[30,20]}),e.jsx("meshStandardMaterial",{color:"#2c3e50",transparent:!0,opacity:.3})]}),Object.entries(o).map(([x,p],t)=>e.jsx("group",{scale:m,children:e.jsx(ee,{geometry:p,position:n[t],color:a[t],name:s[t],wireframe:d})},x)),e.jsxs("group",{scale:m,children:[e.jsx(re,{position:[4.5,-4,0]}),e.jsx(oe,{position:[7.5,-4,0]})]}),e.jsx(b,{position:[0,5,0],fontSize:1,color:"#00ffff",anchorX:"center",anchorY:"middle",children:"几何体展示厅"}),e.jsx(T,{points:[[-10,0,0],[10,0,0]],color:"#444444",lineWidth:1}),e.jsx(T,{points:[[0,-6,0],[0,6,0]],color:"#444444",lineWidth:1})]})}function le(){return e.jsxs(Q,{children:[e.jsx(U,{children:e.jsx(B,{shadows:!0,camera:{position:[0,0,15],fov:75},gl:{antialias:!0},children:e.jsxs(h.Suspense,{fallback:null,children:[e.jsx(te,{}),e.jsx("ambientLight",{intensity:.4}),e.jsx("directionalLight",{position:[10,10,5],intensity:1,castShadow:!0,"shadow-mapSize-width":2048,"shadow-mapSize-height":2048,"shadow-camera-far":50,"shadow-camera-left":-20,"shadow-camera-right":20,"shadow-camera-top":20,"shadow-camera-bottom":-20}),e.jsx("pointLight",{position:[-10,5,-10],intensity:.3,color:"#ff6b6b"}),e.jsx("pointLight",{position:[10,5,10],intensity:.3,color:"#4ecdc4"}),e.jsx(P,{enableDamping:!0,dampingFactor:.05,minDistance:5,maxDistance:30,maxPolarAngle:Math.PI/2+.5})]})})}),e.jsxs(Z,{initial:{x:350},animate:{x:0},transition:{duration:.5},children:[e.jsx(_,{children:"🔺 几何体展示"}),e.jsx(M,{children:"Three.js 提供了丰富的内置几何体，从基础的立方体、球体到复杂的环结体、参数几何体。每种几何体都有其特定的用途和参数。"}),e.jsx("h3",{style:{color:"var(--accent-color)",marginBottom:"1rem"},children:"基础几何体"}),e.jsxs(G,{children:[e.jsxs("li",{children:[e.jsx("code",{children:"BoxGeometry"})," - 立方体，最常用的几何体"]}),e.jsxs("li",{children:[e.jsx("code",{children:"SphereGeometry"})," - 球体，适合制作球形物体"]}),e.jsxs("li",{children:[e.jsx("code",{children:"CylinderGeometry"})," - 圆柱体，可制作柱子、管道"]}),e.jsxs("li",{children:[e.jsx("code",{children:"ConeGeometry"})," - 圆锥体，制作锥形物体"]}),e.jsxs("li",{children:[e.jsx("code",{children:"PlaneGeometry"})," - 平面，常用作地面、墙面"]})]}),e.jsx("h3",{style:{color:"var(--accent-color)",marginBottom:"1rem",marginTop:"2rem"},children:"高级几何体"}),e.jsxs(G,{children:[e.jsxs("li",{children:[e.jsx("code",{children:"TorusGeometry"})," - 圆环体，甜甜圈形状"]}),e.jsxs("li",{children:[e.jsx("code",{children:"TorusKnotGeometry"})," - 环结体，复杂的扭结形状"]}),e.jsxs("li",{children:[e.jsx("code",{children:"TubeGeometry"})," - 管道几何体，沿路径挤出"]}),e.jsxs("li",{children:[e.jsx("code",{children:"ParametricGeometry"})," - 参数几何体，数学函数定义"]})]}),e.jsx("h3",{style:{color:"var(--accent-color)",marginBottom:"1rem",marginTop:"2rem"},children:"多面体"}),e.jsxs(G,{children:[e.jsxs("li",{children:[e.jsx("code",{children:"TetrahedronGeometry"})," - 四面体，4个三角面"]}),e.jsxs("li",{children:[e.jsx("code",{children:"OctahedronGeometry"})," - 八面体，8个三角面"]}),e.jsxs("li",{children:[e.jsx("code",{children:"DodecahedronGeometry"})," - 十二面体，12个五边形面"]}),e.jsxs("li",{children:[e.jsx("code",{children:"IcosahedronGeometry"})," - 二十面体，20个三角面"]})]}),e.jsx("h3",{style:{color:"var(--accent-color)",marginBottom:"1rem",marginTop:"2rem"},children:"自定义几何体"}),e.jsxs(M,{children:["使用 ",e.jsx("code",{children:"BufferGeometry"})," 可以创建完全自定义的几何体，通过定义顶点、面、法线等数据来构建任意形状。"]}),e.jsxs($,{children:[e.jsx("summary",{children:"🔍 查看核心代码"}),e.jsx("pre",{children:`// 基础几何体创建
const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const sphereGeometry = new THREE.SphereGeometry(0.8, 32, 32)
const torusGeometry = new THREE.TorusGeometry(0.8, 0.3, 16, 100)

// 自定义几何体
const customGeometry = new THREE.BufferGeometry()
const vertices = new Float32Array([
  -1, -1, 0,  // 顶点1
   1, -1, 0,  // 顶点2
   0,  1, 0   // 顶点3
])
customGeometry.setAttribute('position', 
  new THREE.BufferAttribute(vertices, 3))

// 参数几何体
// Create parametric geometry using BufferGeometry
const createParametricGeometry = () => {
  const slices = 25, stacks = 25
  const vertices = [], indices = []
  
  for (let i = 0; i <= slices; i++) {
    for (let j = 0; j <= stacks; j++) {
      const u = (i / slices) * Math.PI * 2
      const v = (j / stacks) * Math.PI
      
      const x = Math.cos(u) * Math.sin(v)
      const y = Math.sin(u) * Math.sin(v)
      const z = Math.cos(v)
      
      vertices.push(x, y, z)
    }
  }
  
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', 
    new THREE.Float32BufferAttribute(vertices, 3))
  return geometry
}
const parametricGeometry = createParametricGeometry()`})]})]})]})}export{le as default};
//# sourceMappingURL=GeometryShowcase-4bd4f8f5.js.map
