import React, { Suspense, useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'
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

// Noise functions for terrain generation
class NoiseGenerator {
  static random(x, y) {
    const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453
    return (n - Math.floor(n))
  }
  
  static interpolate(a, b, t) {
    return a * (1 - t) + b * t
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
  
  static ridgedNoise(x, y, octaves = 4) {
    let total = 0
    let frequency = 1
    let amplitude = 1
    
    for (let i = 0; i < octaves; i++) {
      const n = this.smoothNoise(x * frequency, y * frequency)
      const ridged = 1 - Math.abs(n * 2 - 1)
      total += ridged * amplitude
      amplitude *= 0.5
      frequency *= 2
    }
    
    return total
  }
}

// Terrain component
function Terrain({ 
  size = 100, 
  segments = 128, 
  heightScale = 10, 
  noiseType = 'perlin',
  octaves = 4,
  frequency = 0.05,
  wireframe = false,
  showColors = true
}) {
  const meshRef = useRef()
  const geometryRef = useRef()
  
  const { geometry, heightData } = useMemo(() => {
    const geo = new THREE.PlaneGeometry(size, size, segments, segments)
    const positions = geo.attributes.position.array
    const colors = new Float32Array(positions.length)
    const heightData = new Float32Array((segments + 1) * (segments + 1))
    
    // Generate height data
    for (let i = 0; i <= segments; i++) {
      for (let j = 0; j <= segments; j++) {
        const x = (i / segments - 0.5) * size
        const z = (j / segments - 0.5) * size
        
        let height = 0
        
        switch (noiseType) {
          case 'perlin':
            height = NoiseGenerator.perlinNoise(x * frequency, z * frequency, octaves)
            break
          case 'ridged':
            height = NoiseGenerator.ridgedNoise(x * frequency, z * frequency, octaves)
            break
          case 'simplex':
            // Simplified simplex-like noise
            height = NoiseGenerator.perlinNoise(x * frequency, z * frequency, octaves)
            height = Math.pow(height, 1.5)
            break
          case 'volcanic':
            // Create volcanic terrain
            const distance = Math.sqrt(x * x + z * z)
            const crater = Math.max(0, 1 - distance / (size * 0.3))
            const rim = Math.exp(-Math.pow(distance - size * 0.2, 2) / (2 * Math.pow(size * 0.05, 2)))
            height = crater * 0.3 + rim * 0.8 + NoiseGenerator.perlinNoise(x * frequency * 2, z * frequency * 2, 3) * 0.2
            break
          default:
            height = NoiseGenerator.perlinNoise(x * frequency, z * frequency, octaves)
        }
        
        height *= heightScale
        heightData[i * (segments + 1) + j] = height
        
        // Set vertex height
        const vertexIndex = i * (segments + 1) + j
        positions[vertexIndex * 3 + 1] = height
        
        // Generate colors based on height
        if (showColors) {
          let color
          const normalizedHeight = (height + heightScale) / (heightScale * 2)
          
          if (normalizedHeight < 0.2) {
            // Water/Low areas - blue
            color = new THREE.Color(0.1, 0.3, 0.8)
          } else if (normalizedHeight < 0.4) {
            // Beach/Sand - yellow
            color = new THREE.Color(0.9, 0.8, 0.4)
          } else if (normalizedHeight < 0.6) {
            // Grass - green
            color = new THREE.Color(0.2, 0.7, 0.2)
          } else if (normalizedHeight < 0.8) {
            // Rock - gray
            color = new THREE.Color(0.5, 0.5, 0.5)
          } else {
            // Snow - white
            color = new THREE.Color(0.9, 0.9, 0.9)
          }
          
          colors[vertexIndex * 3] = color.r
          colors[vertexIndex * 3 + 1] = color.g
          colors[vertexIndex * 3 + 2] = color.b
        } else {
          colors[vertexIndex * 3] = 0.5
          colors[vertexIndex * 3 + 1] = 0.5
          colors[vertexIndex * 3 + 2] = 0.5
        }
      }
    }
    
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geo.computeVertexNormals()
    
    return { geometry: geo, heightData }
  }, [size, segments, heightScale, noiseType, octaves, frequency, showColors])
  
  useEffect(() => {
    if (geometryRef.current) {
      geometryRef.current.copy(geometry)
    }
  }, [geometry])
  
  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]}>
      <primitive object={geometry} ref={geometryRef} />
      <meshStandardMaterial 
        vertexColors={showColors}
        wireframe={wireframe}
        side={THREE.DoubleSide}
        color={showColors ? undefined : '#4a90e2'}
      />
    </mesh>
  )
}

// Water plane for low areas
function WaterPlane({ size = 100, level = -2 }) {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.time.value = state.clock.elapsedTime
    }
  })
  
  const waterMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        waterColor: { value: new THREE.Color(0.1, 0.3, 0.8) },
        transparency: { value: 0.6 }
      },
      vertexShader: `
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
      `,
      fragmentShader: `
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
      `,
      transparent: true,
      side: THREE.DoubleSide
    })
  }, [])
  
  return (
    <mesh ref={meshRef} position={[0, level, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[size, size]} />
      <primitive object={waterMaterial} />
    </mesh>
  )
}

// Clouds for atmosphere
function Clouds() {
  const cloudsRef = useRef()
  
  const cloudGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const positions = []
    const colors = []
    
    for (let i = 0; i < 1000; i++) {
      const x = (Math.random() - 0.5) * 200
      const y = Math.random() * 20 + 30
      const z = (Math.random() - 0.5) * 200
      
      positions.push(x, y, z)
      
      const gray = 0.8 + Math.random() * 0.2
      colors.push(gray, gray, gray)
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    
    return geometry
  }, [])
  
  useFrame((state) => {
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = state.clock.elapsedTime * 0.01
    }
  })
  
  return (
    <points ref={cloudsRef}>
      <primitive object={cloudGeometry} />
      <pointsMaterial
        size={3}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.6}
        alphaTest={0.001}
      />
    </points>
  )
}

function Scene() {
  const {
    terrainSize,
    terrainSegments,
    heightScale,
    noiseType,
    octaves,
    frequency,
    wireframe,
    showColors,
    showWater,
    showClouds,
    waterLevel
  } = useControls('地形控制', {
    terrainSize: { value: 100, min: 50, max: 200, step: 10 },
    terrainSegments: { value: 128, min: 32, max: 256, step: 32 },
    heightScale: { value: 10, min: 1, max: 30, step: 1 },
    noiseType: {
      value: 'perlin',
      options: {
        'Perlin噪声': 'perlin',
        '脊状噪声': 'ridged',
        'Simplex噪声': 'simplex',
        '火山地形': 'volcanic'
      }
    },
    octaves: { value: 4, min: 1, max: 8, step: 1 },
    frequency: { value: 0.05, min: 0.01, max: 0.2, step: 0.01 },
    wireframe: { value: false },
    showColors: { value: true },
    showWater: { value: true },
    showClouds: { value: true },
    waterLevel: { value: -2, min: -10, max: 5, step: 0.5 }
  })
  
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[50, 50, 25]}
        intensity={0.8}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={200}
        shadow-camera-left={-100}
        shadow-camera-right={100}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
      />
      
      {/* Terrain */}
      <Terrain
        size={terrainSize}
        segments={terrainSegments}
        heightScale={heightScale}
        noiseType={noiseType}
        octaves={octaves}
        frequency={frequency}
        wireframe={wireframe}
        showColors={showColors}
      />
      
      {/* Water */}
      {showWater && (
        <WaterPlane size={terrainSize} level={waterLevel} />
      )}
      
      {/* Clouds */}
      {showClouds && <Clouds />}
      
      {/* Sky gradient */}
      <mesh>
        <sphereGeometry args={[300, 32, 32]} />
        <meshBasicMaterial
          color={new THREE.Color(0.5, 0.7, 1.0)}
          side={THREE.BackSide}
          transparent
          opacity={0.3}
        />
      </mesh>
      
      {/* Title */}
      <Text
        position={[0, 40, 0]}
        fontSize={3}
        color="#00ffff"
        anchorX="center"
        anchorY="middle"
      >
        程序化地形生成
      </Text>
      
      {/* Info */}
      <Text
        position={[0, 35, 0]}
        fontSize={1}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        噪声类型: {{
          perlin: 'Perlin噪声',
          ridged: '脊状噪声',
          simplex: 'Simplex噪声',
          volcanic: '火山地形'
        }[noiseType]}
      </Text>
    </>
  )
}

function TerrainGeneration() {
  return (
    <PageContainer>
      <CanvasContainer>
        <Canvas
          camera={{ position: [50, 30, 50], fov: 75 }}
          shadows
          gl={{ antialias: true }}
        >
          <Suspense fallback={null}>
            <Scene />
            <OrbitControls
              enableDamping
              dampingFactor={0.05}
              minDistance={10}
              maxDistance={150}
              maxPolarAngle={Math.PI / 2.2}
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
          🏔️ 地形生成
        </InfoTitle>
        
        <InfoDescription>
          程序化地形生成是游戏开发和可视化中的重要技术，通过数学算法和噪声函数可以创建逼真的自然地形，无需手工建模。
        </InfoDescription>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem' }}>噪声算法</h3>
        <TechList>
          <li><code>Perlin噪声</code> - 经典噪声，平滑自然的地形</li>
          <li><code>Simplex噪声</code> - 改进版本，更少的方向性偏差</li>
          <li><code>脊状噪声</code> - 创建山脊和峡谷效果</li>
          <li><code>分形噪声</code> - 多层次细节，增加复杂度</li>
        </TechList>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem', marginTop: '2rem' }}>地形特征</h3>
        <TechList>
          <li><code>高度图</code> - 基于灰度值的高度信息</li>
          <li><code>法线计算</code> - 自动计算表面法线</li>
          <li><code>纹理混合</code> - 基于高度的多纹理混合</li>
          <li><code>LOD系统</code> - 距离相关的细节层次</li>
        </TechList>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem', marginTop: '2rem' }}>生成参数</h3>
        <TechList>
          <li><code>Octaves</code> - 噪声层数，影响细节丰富度</li>
          <li><code>Frequency</code> - 频率，控制地形特征大小</li>
          <li><code>Amplitude</code> - 振幅，控制高度变化范围</li>
          <li><code>Persistence</code> - 持续性，控制细节衰减</li>
        </TechList>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem', marginTop: '2rem' }}>视觉增强</h3>
        <TechList>
          <li><code>顶点着色</code> - 基于高度的颜色变化</li>
          <li><code>水面模拟</code> - 动态水波效果</li>
          <li><code>大气效果</code> - 云层和天空盒</li>
          <li><code>阴影映射</code> - 增强立体感</li>
        </TechList>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem', marginTop: '2rem' }}>优化策略</h3>
        <InfoDescription>
          • 使用LOD减少远距离多边形<br/>
          • 视锥体剔除不可见区域<br/>
          • 分块加载大型地形<br/>
          • GPU计算加速噪声生成<br/>
          • 缓存生成的地形数据
        </InfoDescription>
        
        <CodeSection>
          <summary>🔍 查看核心代码</summary>
          <pre>{`// Perlin噪声实现
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
}`}</pre>
        </CodeSection>
      </InfoPanel>
    </PageContainer>
  )
}

export default TerrainGeneration