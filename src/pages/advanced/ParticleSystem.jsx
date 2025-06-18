import React, { Suspense, useRef, useMemo } from 'react'
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

// Fireworks particle system
function Fireworks({ count = 1000 }) {
  const pointsRef = useRef()
  const velocitiesRef = useRef()
  const lifetimesRef = useRef()
  
  const { positions, colors, velocities, lifetimes } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)
    const lifetimes = new Float32Array(count)
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      
      // Initial position (explosion center)
      positions[i3] = (Math.random() - 0.5) * 2
      positions[i3 + 1] = Math.random() * 2 + 3
      positions[i3 + 2] = (Math.random() - 0.5) * 2
      
      // Random velocity for explosion effect
      velocities[i3] = (Math.random() - 0.5) * 10
      velocities[i3 + 1] = Math.random() * 5 + 2
      velocities[i3 + 2] = (Math.random() - 0.5) * 10
      
      // Random colors
      const hue = Math.random()
      const color = new THREE.Color().setHSL(hue, 1, 0.7)
      colors[i3] = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b
      
      // Random lifetime
      lifetimes[i] = Math.random() * 3 + 1
    }
    
    return { positions, colors, velocities, lifetimes }
  }, [count])
  
  velocitiesRef.current = velocities
  lifetimesRef.current = lifetimes
  
  useFrame((state, delta) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array
      const colors = pointsRef.current.geometry.attributes.color.array
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3
        
        // Update position based on velocity
        positions[i3] += velocitiesRef.current[i3] * delta
        positions[i3 + 1] += velocitiesRef.current[i3 + 1] * delta
        positions[i3 + 2] += velocitiesRef.current[i3 + 2] * delta
        
        // Apply gravity
        velocitiesRef.current[i3 + 1] -= 9.8 * delta
        
        // Fade out over time
        lifetimesRef.current[i] -= delta
        const alpha = Math.max(0, lifetimesRef.current[i] / 3)
        
        // Reset particle if lifetime is over
        if (lifetimesRef.current[i] <= 0) {
          positions[i3] = (Math.random() - 0.5) * 2
          positions[i3 + 1] = Math.random() * 2 + 3
          positions[i3 + 2] = (Math.random() - 0.5) * 2
          
          velocitiesRef.current[i3] = (Math.random() - 0.5) * 10
          velocitiesRef.current[i3 + 1] = Math.random() * 5 + 2
          velocitiesRef.current[i3 + 2] = (Math.random() - 0.5) * 10
          
          lifetimesRef.current[i] = Math.random() * 3 + 1
          
          // New random color
          const hue = Math.random()
          const color = new THREE.Color().setHSL(hue, 1, 0.7)
          colors[i3] = color.r
          colors[i3 + 1] = color.g
          colors[i3 + 2] = color.b
        }
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true
      pointsRef.current.geometry.attributes.color.needsUpdate = true
    }
  })
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        sizeAttenuation
        vertexColors
        transparent
        alphaTest={0.001}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Galaxy spiral particle system
function Galaxy({ count = 5000 }) {
  const pointsRef = useRef()
  
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      
      // Galaxy spiral pattern
      const radius = Math.random() * 15
      const spinAngle = radius * 0.3
      const branchAngle = (i % 3) * (Math.PI * 2 / 3)
      
      const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.5
      const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.5
      const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.5
      
      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX
      positions[i3 + 1] = randomY
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ
      
      // Colors based on distance from center
      const mixedColor = new THREE.Color()
      const distance = Math.sqrt(positions[i3] ** 2 + positions[i3 + 2] ** 2)
      mixedColor.setHSL(0.6 - distance * 0.02, 0.8, 0.6)
      
      colors[i3] = mixedColor.r
      colors[i3 + 1] = mixedColor.g
      colors[i3 + 2] = mixedColor.b
    }
    
    return { positions, colors }
  }, [count])
  
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        sizeAttenuation
        vertexColors
        transparent
        alphaTest={0.001}
        depthWrite={false}
      />
    </points>
  )
}

// Waterfall particle system
function Waterfall({ count = 2000 }) {
  const pointsRef = useRef()
  const velocitiesRef = useRef()
  
  const { positions, colors, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      
      // Start at the top
      positions[i3] = (Math.random() - 0.5) * 4
      positions[i3 + 1] = Math.random() * 10 + 5
      positions[i3 + 2] = (Math.random() - 0.5) * 2
      
      // Downward velocity with some randomness
      velocities[i3] = (Math.random() - 0.5) * 0.5
      velocities[i3 + 1] = -Math.random() * 3 - 2
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.5
      
      // Blue water colors
      const blue = 0.3 + Math.random() * 0.4
      colors[i3] = 0.1
      colors[i3 + 1] = 0.3 + Math.random() * 0.3
      colors[i3 + 2] = blue
    }
    
    return { positions, colors, velocities }
  }, [count])
  
  velocitiesRef.current = velocities
  
  useFrame((state, delta) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3
        
        // Update position
        positions[i3] += velocitiesRef.current[i3] * delta
        positions[i3 + 1] += velocitiesRef.current[i3 + 1] * delta
        positions[i3 + 2] += velocitiesRef.current[i3 + 2] * delta
        
        // Apply gravity
        velocitiesRef.current[i3 + 1] -= 5 * delta
        
        // Reset if below ground
        if (positions[i3 + 1] < -2) {
          positions[i3] = (Math.random() - 0.5) * 4
          positions[i3 + 1] = Math.random() * 10 + 5
          positions[i3 + 2] = (Math.random() - 0.5) * 2
          
          velocitiesRef.current[i3] = (Math.random() - 0.5) * 0.5
          velocitiesRef.current[i3 + 1] = -Math.random() * 3 - 2
          velocitiesRef.current[i3 + 2] = (Math.random() - 0.5) * 0.5
        }
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true
    }
  })
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        sizeAttenuation
        vertexColors
        transparent
        alphaTest={0.001}
        depthWrite={false}
      />
    </points>
  )
}

function Scene() {
  const { 
    particleSystem,
    particleCount,
    particleSize,
    animationSpeed
  } = useControls('粒子控制', {
    particleSystem: {
      value: 'fireworks',
      options: {
        '烟花': 'fireworks',
        '星系': 'galaxy',
        '瀑布': 'waterfall'
      }
    },
    particleCount: { value: 2000, min: 500, max: 10000, step: 500 },
    particleSize: { value: 0.05, min: 0.01, max: 0.2, step: 0.01 },
    animationSpeed: { value: 1, min: 0.1, max: 3, step: 0.1 }
  })
  
  const renderParticleSystem = () => {
    switch (particleSystem) {
      case 'fireworks':
        return <Fireworks count={particleCount} />
      case 'galaxy':
        return <Galaxy count={particleCount} />
      case 'waterfall':
        return <Waterfall count={particleCount} />
      default:
        return <Fireworks count={particleCount} />
    }
  }
  
  return (
    <>
      {renderParticleSystem()}
      
      {/* Ground reference */}
      <mesh position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#2c3e50" transparent opacity={0.1} />
      </mesh>
      
      {/* Title */}
      <Text
        position={[0, 8, 0]}
        fontSize={1}
        color="#00ffff"
        anchorX="center"
        anchorY="middle"
      >
        粒子系统演示
      </Text>
      
      {/* System info */}
      <Text
        position={[0, 7, 0]}
        fontSize={0.4}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        当前系统: {{
          fireworks: '烟花爆炸',
          galaxy: '螺旋星系',
          waterfall: '流水瀑布'
        }[particleSystem]}
      </Text>
    </>
  )
}

function ParticleSystem() {
  return (
    <PageContainer>
      <CanvasContainer>
        <Canvas
          camera={{ position: [0, 5, 15], fov: 75 }}
          gl={{ antialias: true }}
        >
          <Suspense fallback={null}>
            <Scene />
            <ambientLight intensity={0.2} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={0.5}
            />
            <OrbitControls
              enableDamping
              dampingFactor={0.05}
              minDistance={5}
              maxDistance={50}
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
          ✨ 粒子系统
        </InfoTitle>
        
        <InfoDescription>
          粒子系统是创建复杂视觉效果的强大工具，可以模拟火焰、烟雾、爆炸、雨雪等自然现象。Three.js 提供了灵活的粒子系统实现方式。
        </InfoDescription>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem' }}>粒子系统类型</h3>
        <TechList>
          <li><code>烟花系统</code> - 爆炸效果，重力影响，生命周期</li>
          <li><code>星系系统</code> - 螺旋结构，旋转动画，距离着色</li>
          <li><code>瀑布系统</code> - 流体模拟，重力下落，循环重生</li>
        </TechList>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem', marginTop: '2rem' }}>核心组件</h3>
        <TechList>
          <li><code>BufferGeometry</code> - 高效的几何体存储</li>
          <li><code>PointsMaterial</code> - 点材质，支持纹理和颜色</li>
          <li><code>BufferAttribute</code> - 顶点属性（位置、颜色等）</li>
          <li><code>Points</code> - 点云渲染对象</li>
        </TechList>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem', marginTop: '2rem' }}>优化技巧</h3>
        <TechList>
          <li><code>sizeAttenuation</code> - 距离衰减，增强深度感</li>
          <li><code>alphaTest</code> - 透明度测试，提高性能</li>
          <li><code>depthWrite</code> - 深度写入控制</li>
          <li><code>AdditiveBlending</code> - 加法混合，发光效果</li>
          <li><code>frustumCulled</code> - 视锥体剔除</li>
        </TechList>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem', marginTop: '2rem' }}>性能考虑</h3>
        <InfoDescription>
          • 合理控制粒子数量（1000-10000）<br/>
          • 使用 BufferGeometry 而非 Geometry<br/>
          • 避免频繁的几何体重建<br/>
          • 使用纹理图集减少绘制调用<br/>
          • 考虑使用 GPU 粒子系统进行大规模计算
        </InfoDescription>
        
        <CodeSection>
          <summary>🔍 查看核心代码</summary>
          <pre>{`// 创建粒子系统
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
}`}</pre>
        </CodeSection>
      </InfoPanel>
    </PageContainer>
  )
}

export default ParticleSystem