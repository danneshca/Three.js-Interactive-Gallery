import React, { Suspense, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Plane } from '@react-three/drei'
import { useControls } from 'leva'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import * as THREE from 'three'

const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  position: relative;
  padding-top: 80px;
`

const CanvasContainer = styled.div`
  flex: 1;
  height: calc(100vh - 80px);
  position: relative;
`

const InfoPanel = styled(motion.div)`
  width: 350px;
  background: rgba(26, 26, 26, 0.95);
  backdrop-filter: blur(20px);
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem;
  overflow-y: auto;
  z-index: 100;
`

const InfoTitle = styled.h2`
  color: var(--accent-color);
  font-size: 1.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const InfoDescription = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
`

const TechList = styled.ul`
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
`

const CodeSection = styled.details`
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
`

// Water wave shader
const waterShader = {
  uniforms: {
    time: { value: 0 },
    resolution: { value: new THREE.Vector2() },
    waveSpeed: { value: 1.0 },
    waveAmplitude: { value: 0.1 },
    waveFrequency: { value: 4.0 },
    waterColor: { value: new THREE.Color(0.1, 0.3, 0.8) },
    foamColor: { value: new THREE.Color(1.0, 1.0, 1.0) }
  },
  vertexShader: `
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
  `,
  fragmentShader: `
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
  `
}

// Fire shader
const fireShader = {
  uniforms: {
    time: { value: 0 },
    resolution: { value: new THREE.Vector2() },
    fireIntensity: { value: 1.0 },
    fireSpeed: { value: 1.0 },
    fireHeight: { value: 2.0 }
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
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
  `
}

// Edge detection shader
const edgeDetectionShader = {
  uniforms: {
    tDiffuse: { value: null },
    resolution: { value: new THREE.Vector2() },
    edgeThreshold: { value: 0.1 },
    edgeColor: { value: new THREE.Color(0, 1, 1) }
  },
  vertexShader: `
    varying vec2 vUv;
    
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform vec2 resolution;
    uniform float edgeThreshold;
    uniform vec3 edgeColor;
    
    varying vec2 vUv;
    
    void main() {
      vec2 texel = 1.0 / resolution;
      
      // Sample surrounding pixels
      float tl = length(texture2D(tDiffuse, vUv + vec2(-texel.x, -texel.y)).rgb);
      float tm = length(texture2D(tDiffuse, vUv + vec2(0.0, -texel.y)).rgb);
      float tr = length(texture2D(tDiffuse, vUv + vec2(texel.x, -texel.y)).rgb);
      float ml = length(texture2D(tDiffuse, vUv + vec2(-texel.x, 0.0)).rgb);
      float mm = length(texture2D(tDiffuse, vUv).rgb);
      float mr = length(texture2D(tDiffuse, vUv + vec2(texel.x, 0.0)).rgb);
      float bl = length(texture2D(tDiffuse, vUv + vec2(-texel.x, texel.y)).rgb);
      float bm = length(texture2D(tDiffuse, vUv + vec2(0.0, texel.y)).rgb);
      float br = length(texture2D(tDiffuse, vUv + vec2(texel.x, texel.y)).rgb);
      
      // Sobel edge detection
      float gx = -tl - 2.0 * ml - bl + tr + 2.0 * mr + br;
      float gy = -tl - 2.0 * tm - tr + bl + 2.0 * bm + br;
      
      float edge = sqrt(gx * gx + gy * gy);
      
      vec3 originalColor = texture2D(tDiffuse, vUv).rgb;
      
      if (edge > edgeThreshold) {
        gl_FragColor = vec4(edgeColor, 1.0);
      } else {
        gl_FragColor = vec4(originalColor * 0.3, 1.0);
      }
    }
  `
}

// Water plane component
function WaterPlane({ shaderUniforms }) {
  const meshRef = useRef()
  
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      ...waterShader,
      transparent: true,
      side: THREE.DoubleSide
    })
  }, [])
  
  useFrame((state) => {
    if (material) {
      material.uniforms.time.value = state.clock.elapsedTime
      material.uniforms.waveSpeed.value = shaderUniforms.waveSpeed
      material.uniforms.waveAmplitude.value = shaderUniforms.waveAmplitude
      material.uniforms.waveFrequency.value = shaderUniforms.waveFrequency
    }
  })
  
  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[10, 10, 64, 64]} />
      <primitive object={material} />
    </mesh>
  )
}

// Fire plane component
function FirePlane({ shaderUniforms }) {
  const meshRef = useRef()
  
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      ...fireShader,
      transparent: true,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    })
  }, [])
  
  useFrame((state) => {
    if (material) {
      material.uniforms.time.value = state.clock.elapsedTime
      material.uniforms.fireIntensity.value = shaderUniforms.fireIntensity
      material.uniforms.fireSpeed.value = shaderUniforms.fireSpeed
    }
  })
  
  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 3, 32, 32]} />
      <primitive object={material} />
    </mesh>
  )
}

// Scene objects for edge detection
function SceneObjects() {
  return (
    <>
      <mesh position={[-2, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#ff6b6b" />
      </mesh>
      
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial color="#4ecdc4" />
      </mesh>
      
      <mesh position={[2, 0, 0]}>
        <coneGeometry args={[0.7, 1.5, 8]} />
        <meshStandardMaterial color="#45b7d1" />
      </mesh>
    </>
  )
}

function Scene() {
  const {
    shaderType,
    waveSpeed,
    waveAmplitude,
    waveFrequency,
    fireIntensity,
    fireSpeed,
    edgeThreshold
  } = useControls('着色器控制', {
    shaderType: {
      value: 'water',
      options: {
        '水波': 'water',
        '火焰': 'fire',
        '边缘检测': 'edge'
      }
    },
    waveSpeed: { value: 1.0, min: 0.1, max: 3.0, step: 0.1 },
    waveAmplitude: { value: 0.1, min: 0.01, max: 0.5, step: 0.01 },
    waveFrequency: { value: 4.0, min: 1.0, max: 10.0, step: 0.5 },
    fireIntensity: { value: 1.0, min: 0.1, max: 2.0, step: 0.1 },
    fireSpeed: { value: 1.0, min: 0.1, max: 3.0, step: 0.1 },
    edgeThreshold: { value: 0.1, min: 0.01, max: 0.5, step: 0.01 }
  })
  
  const shaderUniforms = {
    waveSpeed,
    waveAmplitude,
    waveFrequency,
    fireIntensity,
    fireSpeed,
    edgeThreshold
  }
  
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={0.7} />
      
      {/* Shader demonstrations */}
      {shaderType === 'water' && (
        <WaterPlane shaderUniforms={shaderUniforms} />
      )}
      
      {shaderType === 'fire' && (
        <FirePlane shaderUniforms={shaderUniforms} />
      )}
      
      {shaderType === 'edge' && (
        <SceneObjects />
      )}
      
      {/* Ground reference */}
      {shaderType !== 'water' && (
        <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#2c3e50" />
        </mesh>
      )}
      
      {/* Title */}
      <Text
        position={[0, 4, 0]}
        fontSize={1}
        color="#00ffff"
        anchorX="center"
        anchorY="middle"
      >
        着色器实验
      </Text>
      
      {/* Shader info */}
      <Text
        position={[0, 3, 0]}
        fontSize={0.4}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        当前着色器: {{
          water: '水波模拟',
          fire: '火焰效果',
          edge: '边缘检测'
        }[shaderType]}
      </Text>
    </>
  )
}

function ShaderExperiments() {
  return (
    <PageContainer>
      <CanvasContainer>
        <Canvas
          camera={{ position: [0, 3, 8], fov: 75 }}
          gl={{ antialias: true }}
        >
          <Suspense fallback={null}>
            <Scene />
            <OrbitControls
              enableDamping
              dampingFactor={0.05}
              minDistance={3}
              maxDistance={20}
            />
          </Suspense>
        </Canvas>
      </CanvasContainer>
      
      <InfoPanel
        initial={{ x: 350 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <InfoTitle>
          🧪 着色器实验
        </InfoTitle>
        
        <InfoDescription>
          着色器是GPU编程的核心，通过GLSL（OpenGL Shading Language）可以创建各种复杂的视觉效果，从简单的颜色变化到复杂的物理模拟。
        </InfoDescription>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem' }}>着色器类型</h3>
        <TechList>
          <li><code>Vertex Shader</code> - 顶点着色器，处理顶点变换</li>
          <li><code>Fragment Shader</code> - 片段着色器，处理像素颜色</li>
          <li><code>Geometry Shader</code> - 几何着色器，生成新几何体</li>
          <li><code>Compute Shader</code> - 计算着色器，通用GPU计算</li>
        </TechList>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem', marginTop: '2rem' }}>GLSL基础</h3>
        <TechList>
          <li><code>vec2/vec3/vec4</code> - 向量类型</li>
          <li><code>mat2/mat3/mat4</code> - 矩阵类型</li>
          <li><code>sampler2D</code> - 纹理采样器</li>
          <li><code>uniform</code> - 全局变量</li>
          <li><code>varying</code> - 顶点到片段的插值</li>
          <li><code>attribute</code> - 顶点属性</li>
        </TechList>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem', marginTop: '2rem' }}>内置函数</h3>
        <TechList>
          <li><code>sin/cos/tan</code> - 三角函数</li>
          <li><code>mix/smoothstep</code> - 插值函数</li>
          <li><code>dot/cross/normalize</code> - 向量运算</li>
          <li><code>texture2D</code> - 纹理采样</li>
          <li><code>fract/floor/ceil</code> - 数学函数</li>
        </TechList>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem', marginTop: '2rem' }}>效果实现</h3>
        <TechList>
          <li><code>水波效果</code> - 正弦波形变、法线计算、菲涅尔反射</li>
          <li><code>火焰效果</code> - 分形噪声、颜色渐变、加法混合</li>
          <li><code>边缘检测</code> - Sobel算子、邻域采样、阈值判断</li>
        </TechList>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem', marginTop: '2rem' }}>优化技巧</h3>
        <InfoDescription>
          • 减少分支语句（if/else）<br/>
          • 使用内置函数而非自定义<br/>
          • 预计算常量值<br/>
          • 合理使用精度修饰符<br/>
          • 避免在片段着色器中进行复杂计算
        </InfoDescription>
        
        <CodeSection>
          <summary>🔍 查看核心代码</summary>
          <pre>{`// 水波着色器示例
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

float edge = sqrt(gx*gx + gy*gy);`}</pre>
        </CodeSection>
      </InfoPanel>
    </PageContainer>
  )
}

export default ShaderExperiments