import{j as e,C as X,r as x,O as G,T as E,u as A}from"./react-three-vendor-8ce1f887.js";import{u as I}from"./leva.esm-b659d5ba.js";import{d as w}from"./style-vendor-f8a8899f.js";import{X as j,aW as Y,a4 as B,aZ as D,D as U,h as F,aG as V,s as N}from"./three-vendor-1aa2ed72.js";import{m as L}from"./animation-vendor-2dec0a74.js";const O=w.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  position: relative;
  padding-top: 80px;
`,W=w.div`
  flex: 1;
  height: calc(100vh - 80px);
  position: relative;
`,_=w(L.div)`
  width: 350px;
  background: rgba(26, 26, 26, 0.95);
  backdrop-filter: blur(20px);
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem;
  overflow-y: auto;
  z-index: 100;
`,Z=w.h2`
  color: var(--accent-color);
  font-size: 1.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`,R=w.p`
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
`,z=w.ul`
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
`,q=w.details`
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
`;class S{static random(t,r){const o=Math.sin(t*12.9898+r*78.233)*43758.5453;return o-Math.floor(o)}static interpolate(t,r,o){return t*(1-o)+r*o}static smoothNoise(t,r){const o=Math.floor(t),s=Math.floor(r),i=t-o,c=r-s,a=this.random(o,s),m=this.random(o+1,s),l=this.random(o,s+1),p=this.random(o+1,s+1),T=this.interpolate(a,m,i),y=this.interpolate(l,p,i);return this.interpolate(T,y,c)}static perlinNoise(t,r,o=4,s=.5){let i=0,c=1,a=1,m=0;for(let l=0;l<o;l++)i+=this.smoothNoise(t*c,r*c)*a,m+=a,a*=s,c*=2;return i/m}static ridgedNoise(t,r,o=4){let s=0,i=1,c=1;for(let a=0;a<o;a++){const m=this.smoothNoise(t*i,r*i),l=1-Math.abs(m*2-1);s+=l*c,c*=.5,i*=2}return s}}function J({size:n=100,segments:t=128,heightScale:r=10,noiseType:o="perlin",octaves:s=4,frequency:i=.05,wireframe:c=!1,showColors:a=!0}){const m=x.useRef(),l=x.useRef(),{geometry:p,heightData:T}=x.useMemo(()=>{const y=new B(n,n,t,t),k=y.attributes.position.array,u=new Float32Array(k.length),P=new Float32Array((t+1)*(t+1));for(let M=0;M<=t;M++)for(let C=0;C<=t;C++){const v=(M/t-.5)*n,f=(C/t-.5)*n;let d=0;switch(o){case"perlin":d=S.perlinNoise(v*i,f*i,s);break;case"ridged":d=S.ridgedNoise(v*i,f*i,s);break;case"simplex":d=S.perlinNoise(v*i,f*i,s),d=Math.pow(d,1.5);break;case"volcanic":const h=Math.sqrt(v*v+f*f),b=Math.max(0,1-h/(n*.3)),H=Math.exp(-Math.pow(h-n*.2,2)/(2*Math.pow(n*.05,2)));d=b*.3+H*.8+S.perlinNoise(v*i*2,f*i*2,3)*.2;break;default:d=S.perlinNoise(v*i,f*i,s)}d*=r,P[M*(t+1)+C]=d;const g=M*(t+1)+C;if(k[g*3+1]=d,a){let h;const b=(d+r)/(r*2);b<.2?h=new j(.1,.3,.8):b<.4?h=new j(.9,.8,.4):b<.6?h=new j(.2,.7,.2):b<.8?h=new j(.5,.5,.5):h=new j(.9,.9,.9),u[g*3]=h.r,u[g*3+1]=h.g,u[g*3+2]=h.b}else u[g*3]=.5,u[g*3+1]=.5,u[g*3+2]=.5}return y.setAttribute("color",new D(u,3)),y.computeVertexNormals(),{geometry:y,heightData:P}},[n,t,r,o,s,i,a]);return x.useEffect(()=>{l.current&&l.current.copy(p)},[p]),e.jsxs("mesh",{ref:m,rotation:[-Math.PI/2,0,0],children:[e.jsx("primitive",{object:p,ref:l}),e.jsx("meshStandardMaterial",{vertexColors:a,wireframe:c,side:U,color:a?void 0:"#4a90e2"})]})}function K({size:n=100,level:t=-2}){const r=x.useRef();A(s=>{r.current&&(r.current.material.uniforms.time.value=s.clock.elapsedTime)});const o=x.useMemo(()=>new F({uniforms:{time:{value:0},waterColor:{value:new j(.1,.3,.8)},transparency:{value:.6}},vertexShader:`
        uniform float time;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          vUv = uv;
          vec3 pos = position;
          
          // Small wave animation
          pos.z += sin(pos.x * 0.1 + time) * 0.1;
          pos.z += cos(pos.y * 0.1 + time * 1.3) * 0.05;
          
          vPosition = pos;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,fragmentShader:`
        uniform float time;
        uniform vec3 waterColor;
        uniform float transparency;
        
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          vec2 uv = vUv;
          
          // Animated water texture
          vec2 wave1 = vec2(sin(uv.x * 10.0 + time), cos(uv.y * 10.0 + time)) * 0.02;
          vec2 wave2 = vec2(cos(uv.x * 15.0 - time * 1.5), sin(uv.y * 15.0 - time * 1.5)) * 0.01;
          
          vec2 distortedUv = uv + wave1 + wave2;
          
          vec3 color = waterColor;
          
          // Add some sparkle
          float sparkle = sin(distortedUv.x * 50.0) * sin(distortedUv.y * 50.0);
          sparkle = smoothstep(0.8, 1.0, sparkle);
          color += sparkle * 0.2;
          
          gl_FragColor = vec4(color, transparency);
        }
      `,transparent:!0,side:U}),[]);return e.jsxs("mesh",{ref:r,position:[0,t,0],rotation:[-Math.PI/2,0,0],children:[e.jsx("planeGeometry",{args:[n,n]}),e.jsx("primitive",{object:o})]})}function Q(){const n=x.useRef(),t=x.useMemo(()=>{const r=new V,o=[],s=[];for(let i=0;i<1e3;i++){const c=(Math.random()-.5)*200,a=Math.random()*20+30,m=(Math.random()-.5)*200;o.push(c,a,m);const l=.8+Math.random()*.2;s.push(l,l,l)}return r.setAttribute("position",new N(o,3)),r.setAttribute("color",new N(s,3)),r},[]);return A(r=>{n.current&&(n.current.rotation.y=r.clock.elapsedTime*.01)}),e.jsxs("points",{ref:n,children:[e.jsx("primitive",{object:t}),e.jsx("pointsMaterial",{size:3,sizeAttenuation:!0,vertexColors:!0,transparent:!0,opacity:.6,alphaTest:.001})]})}function $(){const{terrainSize:n,terrainSegments:t,heightScale:r,noiseType:o,octaves:s,frequency:i,wireframe:c,showColors:a,showWater:m,showClouds:l,waterLevel:p}=I("地形控制",{terrainSize:{value:100,min:50,max:200,step:10},terrainSegments:{value:128,min:32,max:256,step:32},heightScale:{value:10,min:1,max:30,step:1},noiseType:{value:"perlin",options:{Perlin噪声:"perlin",脊状噪声:"ridged",Simplex噪声:"simplex",火山地形:"volcanic"}},octaves:{value:4,min:1,max:8,step:1},frequency:{value:.05,min:.01,max:.2,step:.01},wireframe:{value:!1},showColors:{value:!0},showWater:{value:!0},showClouds:{value:!0},waterLevel:{value:-2,min:-10,max:5,step:.5}});return e.jsxs(e.Fragment,{children:[e.jsx("ambientLight",{intensity:.4}),e.jsx("directionalLight",{position:[50,50,25],intensity:.8,castShadow:!0,"shadow-mapSize":[2048,2048],"shadow-camera-far":200,"shadow-camera-left":-100,"shadow-camera-right":100,"shadow-camera-top":100,"shadow-camera-bottom":-100}),e.jsx(J,{size:n,segments:t,heightScale:r,noiseType:o,octaves:s,frequency:i,wireframe:c,showColors:a}),m&&e.jsx(K,{size:n,level:p}),l&&e.jsx(Q,{}),e.jsxs("mesh",{children:[e.jsx("sphereGeometry",{args:[300,32,32]}),e.jsx("meshBasicMaterial",{color:new j(.5,.7,1),side:Y,transparent:!0,opacity:.3})]}),e.jsx(E,{position:[0,40,0],fontSize:3,color:"#00ffff",anchorX:"center",anchorY:"middle",children:"程序化地形生成"}),e.jsxs(E,{position:[0,35,0],fontSize:1,color:"#ffffff",anchorX:"center",anchorY:"middle",children:["噪声类型: ",{perlin:"Perlin噪声",ridged:"脊状噪声",simplex:"Simplex噪声",volcanic:"火山地形"}[o]]})]})}function se(){return e.jsxs(O,{children:[e.jsx(W,{children:e.jsx(X,{camera:{position:[50,30,50],fov:75},shadows:!0,gl:{antialias:!0},children:e.jsxs(x.Suspense,{fallback:null,children:[e.jsx($,{}),e.jsx(G,{enableDamping:!0,dampingFactor:.05,minDistance:10,maxDistance:150,maxPolarAngle:Math.PI/2.2})]})})}),e.jsxs(_,{initial:{x:350},animate:{x:0},transition:{duration:.5},children:[e.jsx(Z,{children:"🏔️ 地形生成"}),e.jsx(R,{children:"程序化地形生成是游戏开发和可视化中的重要技术，通过数学算法和噪声函数可以创建逼真的自然地形，无需手工建模。"}),e.jsx("h3",{style:{color:"var(--accent-color)",marginBottom:"1rem"},children:"噪声算法"}),e.jsxs(z,{children:[e.jsxs("li",{children:[e.jsx("code",{children:"Perlin噪声"})," - 经典噪声，平滑自然的地形"]}),e.jsxs("li",{children:[e.jsx("code",{children:"Simplex噪声"})," - 改进版本，更少的方向性偏差"]}),e.jsxs("li",{children:[e.jsx("code",{children:"脊状噪声"})," - 创建山脊和峡谷效果"]}),e.jsxs("li",{children:[e.jsx("code",{children:"分形噪声"})," - 多层次细节，增加复杂度"]})]}),e.jsx("h3",{style:{color:"var(--accent-color)",marginBottom:"1rem",marginTop:"2rem"},children:"地形特征"}),e.jsxs(z,{children:[e.jsxs("li",{children:[e.jsx("code",{children:"高度图"})," - 基于灰度值的高度信息"]}),e.jsxs("li",{children:[e.jsx("code",{children:"法线计算"})," - 自动计算表面法线"]}),e.jsxs("li",{children:[e.jsx("code",{children:"纹理混合"})," - 基于高度的多纹理混合"]}),e.jsxs("li",{children:[e.jsx("code",{children:"LOD系统"})," - 距离相关的细节层次"]})]}),e.jsx("h3",{style:{color:"var(--accent-color)",marginBottom:"1rem",marginTop:"2rem"},children:"生成参数"}),e.jsxs(z,{children:[e.jsxs("li",{children:[e.jsx("code",{children:"Octaves"})," - 噪声层数，影响细节丰富度"]}),e.jsxs("li",{children:[e.jsx("code",{children:"Frequency"})," - 频率，控制地形特征大小"]}),e.jsxs("li",{children:[e.jsx("code",{children:"Amplitude"})," - 振幅，控制高度变化范围"]}),e.jsxs("li",{children:[e.jsx("code",{children:"Persistence"})," - 持续性，控制细节衰减"]})]}),e.jsx("h3",{style:{color:"var(--accent-color)",marginBottom:"1rem",marginTop:"2rem"},children:"视觉增强"}),e.jsxs(z,{children:[e.jsxs("li",{children:[e.jsx("code",{children:"顶点着色"})," - 基于高度的颜色变化"]}),e.jsxs("li",{children:[e.jsx("code",{children:"水面模拟"})," - 动态水波效果"]}),e.jsxs("li",{children:[e.jsx("code",{children:"大气效果"})," - 云层和天空盒"]}),e.jsxs("li",{children:[e.jsx("code",{children:"阴影映射"})," - 增强立体感"]})]}),e.jsx("h3",{style:{color:"var(--accent-color)",marginBottom:"1rem",marginTop:"2rem"},children:"优化策略"}),e.jsxs(R,{children:["• 使用LOD减少远距离多边形",e.jsx("br",{}),"• 视锥体剔除不可见区域",e.jsx("br",{}),"• 分块加载大型地形",e.jsx("br",{}),"• GPU计算加速噪声生成",e.jsx("br",{}),"• 缓存生成的地形数据"]}),e.jsxs(q,{children:[e.jsx("summary",{children:"🔍 查看核心代码"}),e.jsx("pre",{children:`// Perlin噪声实现
class NoiseGenerator {
  static perlinNoise(x, y, octaves = 4, persistence = 0.5) {
    let total = 0
    let frequency = 1
    let amplitude = 1
    let maxValue = 0
    
    for (let i = 0; i < octaves; i++) {
      total += this.smoothNoise(x * frequency, y * frequency) * amplitude
      maxValue += amplitude
      amplitude *= persistence
      frequency *= 2
    }
    
    return total / maxValue
  }
  
  static smoothNoise(x, y) {
    const intX = Math.floor(x)
    const intY = Math.floor(y)
    const fracX = x - intX
    const fracY = y - intY
    
    const a = this.random(intX, intY)
    const b = this.random(intX + 1, intY)
    const c = this.random(intX, intY + 1)
    const d = this.random(intX + 1, intY + 1)
    
    const i1 = this.interpolate(a, b, fracX)
    const i2 = this.interpolate(c, d, fracX)
    
    return this.interpolate(i1, i2, fracY)
  }
}

// 地形生成
function generateTerrain(size, segments, heightScale) {
  const geometry = new THREE.PlaneGeometry(size, size, segments, segments)
  const positions = geometry.attributes.position.array
  const colors = new Float32Array(positions.length)
  
  for (let i = 0; i <= segments; i++) {
    for (let j = 0; j <= segments; j++) {
      const x = (i / segments - 0.5) * size
      const z = (j / segments - 0.5) * size
      
      // 生成高度
      const height = NoiseGenerator.perlinNoise(
        x * 0.05, z * 0.05, 4, 0.5
      ) * heightScale
      
      const vertexIndex = i * (segments + 1) + j
      positions[vertexIndex * 3 + 1] = height
      
      // 基于高度的颜色
      const normalizedHeight = (height + heightScale) / (heightScale * 2)
      let color
      
      if (normalizedHeight < 0.2) {
        color = new THREE.Color(0.1, 0.3, 0.8) // 水
      } else if (normalizedHeight < 0.4) {
        color = new THREE.Color(0.9, 0.8, 0.4) // 沙滩
      } else if (normalizedHeight < 0.6) {
        color = new THREE.Color(0.2, 0.7, 0.2) // 草地
      } else if (normalizedHeight < 0.8) {
        color = new THREE.Color(0.5, 0.5, 0.5) // 岩石
      } else {
        color = new THREE.Color(0.9, 0.9, 0.9) // 雪
      }
      
      colors[vertexIndex * 3] = color.r
      colors[vertexIndex * 3 + 1] = color.g
      colors[vertexIndex * 3 + 2] = color.b
    }
  }
  
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  geometry.computeVertexNormals()
  
  return geometry
}

// 水面着色器
const waterShader = {
  uniforms: {
    time: { value: 0 },
    waterColor: { value: new THREE.Color(0.1, 0.3, 0.8) }
  },
  vertexShader: \`
    uniform float time;
    varying vec2 vUv;
    
    void main() {
      vUv = uv;
      vec3 pos = position;
      
      // 水波动画
      pos.z += sin(pos.x * 0.1 + time) * 0.1;
      pos.z += cos(pos.y * 0.1 + time * 1.3) * 0.05;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  \`,
  fragmentShader: \`
    uniform float time;
    uniform vec3 waterColor;
    varying vec2 vUv;
    
    void main() {
      vec2 wave = vec2(
        sin(vUv.x * 10.0 + time),
        cos(vUv.y * 10.0 + time)
      ) * 0.02;
      
      vec3 color = waterColor;
      
      // 添加波光
      float sparkle = sin((vUv.x + wave.x) * 50.0) * 
                     sin((vUv.y + wave.y) * 50.0);
      sparkle = smoothstep(0.8, 1.0, sparkle);
      color += sparkle * 0.2;
      
      gl_FragColor = vec4(color, 0.6);
    }
  \`
}`})]})]})]})}export{se as default};
//# sourceMappingURL=TerrainGeneration-498902be.js.map
