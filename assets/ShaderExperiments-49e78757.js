import{j as e,C as j,r as n,O as y,T as m,u as f}from"./react-three-vendor-611369f6.js";import{u as w}from"./leva.esm-82acce57.js";import{d as i}from"./style-vendor-32f1d845.js";import{d as v,X as s,h as u,D as x,ao as b}from"./three-vendor-1aa2ed72.js";import{m as S}from"./animation-vendor-a22bc070.js";const D=i.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  position: relative;
  padding-top: 80px;
`,C=i.div`
  flex: 1;
  height: calc(100vh - 80px);
  position: relative;
`,U=i(S.div)`
  width: 350px;
  background: rgba(26, 26, 26, 0.95);
  backdrop-filter: blur(20px);
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem;
  overflow-y: auto;
  z-index: 100;
`,F=i.h2`
  color: var(--accent-color);
  font-size: 1.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`,d=i.p`
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
`,l=i.ul`
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
`,P=i.details`
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
`,M={uniforms:{time:{value:0},resolution:{value:new v},waveSpeed:{value:1},waveAmplitude:{value:.1},waveFrequency:{value:4},waterColor:{value:new s(.1,.3,.8)},foamColor:{value:new s(1,1,1)}},vertexShader:`
    uniform float time;
    uniform float waveAmplitude;
    uniform float waveFrequency;
    uniform float waveSpeed;
    
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    
    void main() {
      vUv = uv;
      
      vec3 pos = position;
      
      // Create wave displacement
      float wave1 = sin(pos.x * waveFrequency + time * waveSpeed) * waveAmplitude;
      float wave2 = sin(pos.z * waveFrequency * 0.7 + time * waveSpeed * 1.3) * waveAmplitude * 0.5;
      float wave3 = sin((pos.x + pos.z) * waveFrequency * 0.3 + time * waveSpeed * 0.8) * waveAmplitude * 0.3;
      
      pos.y += wave1 + wave2 + wave3;
      
      // Calculate normal for lighting
      float dx = cos(pos.x * waveFrequency + time * waveSpeed) * waveFrequency * waveAmplitude;
      float dz = cos(pos.z * waveFrequency * 0.7 + time * waveSpeed * 1.3) * waveFrequency * 0.7 * waveAmplitude * 0.5;
      
      vec3 normal = normalize(vec3(-dx, 1.0, -dz));
      vNormal = normalMatrix * normal;
      
      vPosition = pos;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,fragmentShader:`
    uniform float time;
    uniform vec2 resolution;
    uniform vec3 waterColor;
    uniform vec3 foamColor;
    
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    
    void main() {
      vec2 uv = vUv;
      
      // Animated water texture
      vec2 wave1 = vec2(sin(uv.x * 10.0 + time), cos(uv.y * 10.0 + time)) * 0.02;
      vec2 wave2 = vec2(cos(uv.x * 15.0 - time * 1.5), sin(uv.y * 15.0 - time * 1.5)) * 0.01;
      
      vec2 distortedUv = uv + wave1 + wave2;
      
      // Fresnel effect
      vec3 viewDirection = normalize(cameraPosition - vPosition);
      float fresnel = pow(1.0 - dot(normalize(vNormal), viewDirection), 2.0);
      
      // Foam based on wave height
      float foam = smoothstep(0.05, 0.1, vPosition.y);
      
      // Mix colors
      vec3 color = mix(waterColor, foamColor, foam);
      color = mix(color, vec3(0.8, 0.9, 1.0), fresnel * 0.3);
      
      // Add some sparkle
      float sparkle = sin(distortedUv.x * 50.0) * sin(distortedUv.y * 50.0);
      sparkle = smoothstep(0.8, 1.0, sparkle);
      color += sparkle * 0.2;
      
      gl_FragColor = vec4(color, 0.8);
    }
  `},A={uniforms:{time:{value:0},resolution:{value:new v},fireIntensity:{value:1},fireSpeed:{value:1},fireHeight:{value:2}},vertexShader:`
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,fragmentShader:`
    uniform float time;
    uniform vec2 resolution;
    uniform float fireIntensity;
    uniform float fireSpeed;
    uniform float fireHeight;
    
    varying vec2 vUv;
    varying vec3 vPosition;
    
    // Noise function
    float noise(vec2 p) {
      return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
    }
    
    float smoothNoise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      
      float a = noise(i);
      float b = noise(i + vec2(1.0, 0.0));
      float c = noise(i + vec2(0.0, 1.0));
      float d = noise(i + vec2(1.0, 1.0));
      
      return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
    }
    
    float fractalNoise(vec2 p) {
      float value = 0.0;
      float amplitude = 0.5;
      
      for (int i = 0; i < 6; i++) {
        value += amplitude * smoothNoise(p);
        p *= 2.0;
        amplitude *= 0.5;
      }
      
      return value;
    }
    
    void main() {
      vec2 uv = vUv;
      
      // Create fire shape
      float fireShape = 1.0 - smoothstep(0.0, 0.5, length(uv - vec2(0.5, 0.0)));
      fireShape *= smoothstep(0.0, 0.1, uv.y);
      fireShape *= smoothstep(1.0, 0.7, uv.y);
      
      // Animated noise for fire movement
      vec2 noiseUv = uv * 3.0;
      noiseUv.y -= time * fireSpeed;
      noiseUv.x += sin(uv.y * 10.0 + time * 2.0) * 0.1;
      
      float noise1 = fractalNoise(noiseUv);
      float noise2 = fractalNoise(noiseUv * 2.0 + vec2(100.0));
      
      // Combine noises
      float fireNoise = noise1 * 0.7 + noise2 * 0.3;
      fireNoise = smoothstep(0.3, 0.8, fireNoise);
      
      // Apply fire shape
      float fire = fireShape * fireNoise * fireIntensity;
      
      // Fire colors
      vec3 fireColor1 = vec3(1.0, 0.1, 0.0);  // Red
      vec3 fireColor2 = vec3(1.0, 0.5, 0.0);  // Orange
      vec3 fireColor3 = vec3(1.0, 1.0, 0.2);  // Yellow
      
      // Color gradient based on height and intensity
      vec3 color = mix(fireColor1, fireColor2, uv.y);
      color = mix(color, fireColor3, fire * uv.y);
      
      // Add some blue at the base
      if (uv.y < 0.2) {
        color = mix(vec3(0.0, 0.2, 1.0), color, uv.y * 5.0);
      }
      
      gl_FragColor = vec4(color, fire);
    }
  `};new v,new s(0,1,1);function T({shaderUniforms:r}){const t=n.useRef(),o=n.useMemo(()=>new u({...M,transparent:!0,side:x}),[]);return f(a=>{o&&(o.uniforms.time.value=a.clock.elapsedTime,o.uniforms.waveSpeed.value=r.waveSpeed,o.uniforms.waveAmplitude.value=r.waveAmplitude,o.uniforms.waveFrequency.value=r.waveFrequency)}),e.jsxs("mesh",{ref:t,rotation:[-Math.PI/2,0,0],children:[e.jsx("planeGeometry",{args:[10,10,64,64]}),e.jsx("primitive",{object:o})]})}function z({shaderUniforms:r}){const t=n.useRef(),o=n.useMemo(()=>new u({...A,transparent:!0,side:x,blending:b}),[]);return f(a=>{o&&(o.uniforms.time.value=a.clock.elapsedTime,o.uniforms.fireIntensity.value=r.fireIntensity,o.uniforms.fireSpeed.value=r.fireSpeed)}),e.jsxs("mesh",{ref:t,children:[e.jsx("planeGeometry",{args:[2,3,32,32]}),e.jsx("primitive",{object:o})]})}function q(){return e.jsxs(e.Fragment,{children:[e.jsxs("mesh",{position:[-2,0,0],children:[e.jsx("boxGeometry",{args:[1,1,1]}),e.jsx("meshStandardMaterial",{color:"#ff6b6b"})]}),e.jsxs("mesh",{position:[0,0,0],children:[e.jsx("sphereGeometry",{args:[.7,32,32]}),e.jsx("meshStandardMaterial",{color:"#4ecdc4"})]}),e.jsxs("mesh",{position:[2,0,0],children:[e.jsx("coneGeometry",{args:[.7,1.5,8]}),e.jsx("meshStandardMaterial",{color:"#45b7d1"})]})]})}function N(){const{shaderType:r,waveSpeed:t,waveAmplitude:o,waveFrequency:a,fireIntensity:p,fireSpeed:h,edgeThreshold:g}=w("着色器控制",{shaderType:{value:"water",options:{水波:"water",火焰:"fire",边缘检测:"edge"}},waveSpeed:{value:1,min:.1,max:3,step:.1},waveAmplitude:{value:.1,min:.01,max:.5,step:.01},waveFrequency:{value:4,min:1,max:10,step:.5},fireIntensity:{value:1,min:.1,max:2,step:.1},fireSpeed:{value:1,min:.1,max:3,step:.1},edgeThreshold:{value:.1,min:.01,max:.5,step:.01}}),c={waveSpeed:t,waveAmplitude:o,waveFrequency:a,fireIntensity:p,fireSpeed:h,edgeThreshold:g};return e.jsxs(e.Fragment,{children:[e.jsx("ambientLight",{intensity:.3}),e.jsx("directionalLight",{position:[10,10,5],intensity:.7}),r==="water"&&e.jsx(T,{shaderUniforms:c}),r==="fire"&&e.jsx(z,{shaderUniforms:c}),r==="edge"&&e.jsx(q,{}),r!=="water"&&e.jsxs("mesh",{position:[0,-2,0],rotation:[-Math.PI/2,0,0],children:[e.jsx("planeGeometry",{args:[20,20]}),e.jsx("meshStandardMaterial",{color:"#2c3e50"})]}),e.jsx(m,{position:[0,4,0],fontSize:1,color:"#00ffff",anchorX:"center",anchorY:"middle",children:"着色器实验"}),e.jsxs(m,{position:[0,3,0],fontSize:.4,color:"#ffffff",anchorX:"center",anchorY:"middle",children:["当前着色器: ",{water:"水波模拟",fire:"火焰效果",edge:"边缘检测"}[r]]})]})}function V(){return e.jsxs(D,{children:[e.jsx(C,{children:e.jsx(j,{camera:{position:[0,3,8],fov:75},gl:{antialias:!0},children:e.jsxs(n.Suspense,{fallback:null,children:[e.jsx(N,{}),e.jsx(y,{enableDamping:!0,dampingFactor:.05,minDistance:3,maxDistance:20})]})})}),e.jsxs(U,{initial:{x:350},animate:{x:0},transition:{duration:.5},children:[e.jsx(F,{children:"🧪 着色器实验"}),e.jsx(d,{children:"着色器是GPU编程的核心，通过GLSL（OpenGL Shading Language）可以创建各种复杂的视觉效果，从简单的颜色变化到复杂的物理模拟。"}),e.jsx("h3",{style:{color:"var(--accent-color)",marginBottom:"1rem"},children:"着色器类型"}),e.jsxs(l,{children:[e.jsxs("li",{children:[e.jsx("code",{children:"Vertex Shader"})," - 顶点着色器，处理顶点变换"]}),e.jsxs("li",{children:[e.jsx("code",{children:"Fragment Shader"})," - 片段着色器，处理像素颜色"]}),e.jsxs("li",{children:[e.jsx("code",{children:"Geometry Shader"})," - 几何着色器，生成新几何体"]}),e.jsxs("li",{children:[e.jsx("code",{children:"Compute Shader"})," - 计算着色器，通用GPU计算"]})]}),e.jsx("h3",{style:{color:"var(--accent-color)",marginBottom:"1rem",marginTop:"2rem"},children:"GLSL基础"}),e.jsxs(l,{children:[e.jsxs("li",{children:[e.jsx("code",{children:"vec2/vec3/vec4"})," - 向量类型"]}),e.jsxs("li",{children:[e.jsx("code",{children:"mat2/mat3/mat4"})," - 矩阵类型"]}),e.jsxs("li",{children:[e.jsx("code",{children:"sampler2D"})," - 纹理采样器"]}),e.jsxs("li",{children:[e.jsx("code",{children:"uniform"})," - 全局变量"]}),e.jsxs("li",{children:[e.jsx("code",{children:"varying"})," - 顶点到片段的插值"]}),e.jsxs("li",{children:[e.jsx("code",{children:"attribute"})," - 顶点属性"]})]}),e.jsx("h3",{style:{color:"var(--accent-color)",marginBottom:"1rem",marginTop:"2rem"},children:"内置函数"}),e.jsxs(l,{children:[e.jsxs("li",{children:[e.jsx("code",{children:"sin/cos/tan"})," - 三角函数"]}),e.jsxs("li",{children:[e.jsx("code",{children:"mix/smoothstep"})," - 插值函数"]}),e.jsxs("li",{children:[e.jsx("code",{children:"dot/cross/normalize"})," - 向量运算"]}),e.jsxs("li",{children:[e.jsx("code",{children:"texture2D"})," - 纹理采样"]}),e.jsxs("li",{children:[e.jsx("code",{children:"fract/floor/ceil"})," - 数学函数"]})]}),e.jsx("h3",{style:{color:"var(--accent-color)",marginBottom:"1rem",marginTop:"2rem"},children:"效果实现"}),e.jsxs(l,{children:[e.jsxs("li",{children:[e.jsx("code",{children:"水波效果"})," - 正弦波形变、法线计算、菲涅尔反射"]}),e.jsxs("li",{children:[e.jsx("code",{children:"火焰效果"})," - 分形噪声、颜色渐变、加法混合"]}),e.jsxs("li",{children:[e.jsx("code",{children:"边缘检测"})," - Sobel算子、邻域采样、阈值判断"]})]}),e.jsx("h3",{style:{color:"var(--accent-color)",marginBottom:"1rem",marginTop:"2rem"},children:"优化技巧"}),e.jsxs(d,{children:["• 减少分支语句（if/else）",e.jsx("br",{}),"• 使用内置函数而非自定义",e.jsx("br",{}),"• 预计算常量值",e.jsx("br",{}),"• 合理使用精度修饰符",e.jsx("br",{}),"• 避免在片段着色器中进行复杂计算"]}),e.jsxs(P,{children:[e.jsx("summary",{children:"🔍 查看核心代码"}),e.jsx("pre",{children:`// 水波着色器示例
// Vertex Shader
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vUv = uv;
  
  vec3 pos = position;
  
  // 创建波浪位移
  float wave = sin(pos.x * 4.0 + time) * 0.1;
  pos.y += wave;
  
  vPosition = pos;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}

// Fragment Shader
uniform float time;
uniform vec3 waterColor;

varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vec2 uv = vUv;
  
  // 动画水纹理
  vec2 wave1 = vec2(
    sin(uv.x * 10.0 + time),
    cos(uv.y * 10.0 + time)
  ) * 0.02;
  
  vec2 distortedUv = uv + wave1;
  
  // 菲涅尔效果
  vec3 viewDir = normalize(cameraPosition - vPosition);
  float fresnel = pow(1.0 - dot(normal, viewDir), 2.0);
  
  vec3 color = mix(waterColor, vec3(0.8, 0.9, 1.0), fresnel);
  
  gl_FragColor = vec4(color, 0.8);
}

// 火焰着色器噪声函数
float noise(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

float fractalNoise(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  
  for (int i = 0; i < 6; i++) {
    value += amplitude * noise(p);
    p *= 2.0;
    amplitude *= 0.5;
  }
  
  return value;
}

// 边缘检测Sobel算子
vec2 texel = 1.0 / resolution;

// 采样周围像素
float tl = texture2D(tDiffuse, vUv + vec2(-texel.x, -texel.y)).r;
float tm = texture2D(tDiffuse, vUv + vec2(0.0, -texel.y)).r;
float tr = texture2D(tDiffuse, vUv + vec2(texel.x, -texel.y)).r;
// ... 更多采样点

// Sobel边缘检测
float gx = -tl - 2.0*ml - bl + tr + 2.0*mr + br;
float gy = -tl - 2.0*tm - tr + bl + 2.0*bm + br;

float edge = sqrt(gx*gx + gy*gy);`})]})]})]})}export{V as default};
//# sourceMappingURL=ShaderExperiments-49e78757.js.map
