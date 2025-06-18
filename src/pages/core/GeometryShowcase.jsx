import React, { Suspense, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Line } from '@react-three/drei'
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

// Geometry components
function GeometryMesh({ geometry, position, color, name, wireframe = false }) {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
    }
  })
  
  return (
    <group position={position}>
      <mesh ref={meshRef} geometry={geometry} castShadow receiveShadow>
        <meshStandardMaterial 
          color={color} 
          wireframe={wireframe}
          transparent
          opacity={wireframe ? 0.8 : 0.9}
        />
      </mesh>
      <Text
        position={[0, -2, 0]}
        fontSize={0.3}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
    </group>
  )
}

function CustomGeometry({ position }) {
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    
    // Create a star shape
    const vertices = []
    const indices = []
    const colors = []
    
    const outerRadius = 1
    const innerRadius = 0.5
    const points = 5
    
    // Center vertex
    vertices.push(0, 0, 0)
    colors.push(1, 1, 0) // Yellow center
    
    // Outer and inner vertices
    for (let i = 0; i < points * 2; i++) {
      const angle = (i / (points * 2)) * Math.PI * 2
      const radius = i % 2 === 0 ? outerRadius : innerRadius
      
      vertices.push(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        0
      )
      
      // Alternate colors
      if (i % 2 === 0) {
        colors.push(1, 0.5, 0) // Orange for outer points
      } else {
        colors.push(0.5, 1, 0.5) // Light green for inner points
      }
    }
    
    // Create triangles
    for (let i = 0; i < points * 2; i++) {
      const next = (i + 1) % (points * 2) + 1
      indices.push(0, i + 1, next)
    }
    
    geo.setIndex(indices)
    geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    geo.computeVertexNormals()
    
    return geo
  }, [])
  
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.5
    }
  })
  
  return (
    <group position={position}>
      <mesh ref={meshRef} geometry={geometry}>
        <meshStandardMaterial vertexColors side={THREE.DoubleSide} />
      </mesh>
      <Text
        position={[0, -2, 0]}
        fontSize={0.3}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        自定义几何体
      </Text>
    </group>
  )
}

function ParametricGeometry({ position }) {
  const geometry = useMemo(() => {
    // Create a parametric surface (Klein bottle-like shape) using BufferGeometry
    const slices = 25
    const stacks = 25
    const vertices = []
    const indices = []
    const normals = []
    const uvs = []
    
    for (let i = 0; i <= slices; i++) {
      for (let j = 0; j <= stacks; j++) {
        const u = i / slices
        const v = j / stacks
        
        const uAngle = u * Math.PI
        const vAngle = v * 2 * Math.PI
        
        const x = Math.cos(uAngle) * (3 + Math.cos(vAngle)) * 0.3
        const y = Math.sin(uAngle) * (3 + Math.cos(vAngle)) * 0.3
        const z = Math.sin(vAngle) * 0.3
        
        vertices.push(x, y, z)
        normals.push(0, 0, 1) // Simple normal for now
        uvs.push(u, v)
      }
    }
    
    // Create indices for triangles
    for (let i = 0; i < slices; i++) {
      for (let j = 0; j < stacks; j++) {
        const a = i * (stacks + 1) + j
        const b = a + stacks + 1
        const c = a + 1
        const d = b + 1
        
        indices.push(a, b, c)
        indices.push(b, d, c)
      }
    }
    
    const geometry = new THREE.BufferGeometry()
    geometry.setIndex(indices)
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3))
    geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))
    geometry.computeVertexNormals()
    
    return geometry
  }, [])
  
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
    }
  })
  
  return (
    <group position={position}>
      <mesh ref={meshRef} geometry={geometry}>
        <meshStandardMaterial 
          color="#9b59b6" 
          side={THREE.DoubleSide}
          wireframe
        />
      </mesh>
      <Text
        position={[0, -2, 0]}
        fontSize={0.3}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        参数几何体
      </Text>
    </group>
  )
}

function Scene() {
  const { 
    showWireframe,
    geometryScale,
    animationSpeed
  } = useControls('几何体控制', {
    showWireframe: { value: false },
    geometryScale: { value: 1, min: 0.5, max: 2, step: 0.1 },
    animationSpeed: { value: 1, min: 0, max: 3, step: 0.1 }
  })
  
  // Create geometries
  const geometries = useMemo(() => {
    return {
      box: new THREE.BoxGeometry(1, 1, 1),
      sphere: new THREE.SphereGeometry(0.8, 32, 32),
      cylinder: new THREE.CylinderGeometry(0.5, 0.8, 1.5, 32),
      cone: new THREE.ConeGeometry(0.8, 1.5, 32),
      torus: new THREE.TorusGeometry(0.8, 0.3, 16, 100),
      torusKnot: new THREE.TorusKnotGeometry(0.6, 0.2, 100, 16),
      dodecahedron: new THREE.DodecahedronGeometry(0.8),
      icosahedron: new THREE.IcosahedronGeometry(0.8),
      octahedron: new THREE.OctahedronGeometry(0.8),
      tetrahedron: new THREE.TetrahedronGeometry(0.8),
      plane: new THREE.PlaneGeometry(1.5, 1.5, 10, 10),
      ring: new THREE.RingGeometry(0.3, 0.8, 32),
      tube: new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3([
          new THREE.Vector3(-0.5, 0, 0),
          new THREE.Vector3(0, 0.5, 0),
          new THREE.Vector3(0.5, 0, 0),
          new THREE.Vector3(0, -0.5, 0)
        ], true),
        64, 0.2, 8, true
      )
    }
  }, [])
  
  const colors = [
    '#e74c3c', '#3498db', '#2ecc71', '#f39c12',
    '#9b59b6', '#1abc9c', '#e67e22', '#34495e',
    '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4',
    '#feca57'
  ]
  
  const positions = [
    [-6, 2, 0], [-3, 2, 0], [0, 2, 0], [3, 2, 0], [6, 2, 0],
    [-6, -1, 0], [-3, -1, 0], [0, -1, 0], [3, -1, 0], [6, -1, 0],
    [-4.5, -4, 0], [-1.5, -4, 0], [1.5, -4, 0]
  ]
  
  const names = [
    '立方体', '球体', '圆柱体', '圆锥体', '圆环体',
    '环结体', '十二面体', '二十面体', '八面体', '四面体',
    '平面', '圆环', '管道'
  ]
  
  return (
    <>
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -6, 0]} receiveShadow>
        <planeGeometry args={[30, 20]} />
        <meshStandardMaterial color="#2c3e50" transparent opacity={0.3} />
      </mesh>
      
      {/* Geometry showcase */}
      {Object.entries(geometries).map(([key, geometry], index) => (
        <group key={key} scale={geometryScale}>
          <GeometryMesh
            geometry={geometry}
            position={positions[index]}
            color={colors[index]}
            name={names[index]}
            wireframe={showWireframe}
          />
        </group>
      ))}
      
      {/* Custom geometries */}
      <group scale={geometryScale}>
        <CustomGeometry position={[4.5, -4, 0]} />
        <ParametricGeometry position={[7.5, -4, 0]} />
      </group>
      
      {/* Title */}
      <Text
        position={[0, 5, 0]}
        fontSize={1}
        color="#00ffff"
        anchorX="center"
        anchorY="middle"
      >
        几何体展示厅
      </Text>
      
      {/* Grid lines */}
      <Line
        points={[[-10, 0, 0], [10, 0, 0]]}
        color="#444444"
        lineWidth={1}
      />
      <Line
        points={[[0, -6, 0], [0, 6, 0]]}
        color="#444444"
        lineWidth={1}
      />
    </>
  )
}

function GeometryShowcase() {
  return (
    <PageContainer>
      <CanvasContainer>
        <Canvas
          shadows
          camera={{ position: [0, 0, 15], fov: 75 }}
          gl={{ antialias: true }}
        >
          <Suspense fallback={null}>
            <Scene />
            <ambientLight intensity={0.4} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={1}
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
              shadow-camera-far={50}
              shadow-camera-left={-20}
              shadow-camera-right={20}
              shadow-camera-top={20}
              shadow-camera-bottom={-20}
            />
            <pointLight position={[-10, 5, -10]} intensity={0.3} color="#ff6b6b" />
            <pointLight position={[10, 5, 10]} intensity={0.3} color="#4ecdc4" />
            <OrbitControls
              enableDamping
              dampingFactor={0.05}
              minDistance={5}
              maxDistance={30}
              maxPolarAngle={Math.PI / 2 + 0.5}
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
          🔺 几何体展示
        </InfoTitle>
        
        <InfoDescription>
          Three.js 提供了丰富的内置几何体，从基础的立方体、球体到复杂的环结体、参数几何体。每种几何体都有其特定的用途和参数。
        </InfoDescription>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem' }}>基础几何体</h3>
        <TechList>
          <li><code>BoxGeometry</code> - 立方体，最常用的几何体</li>
          <li><code>SphereGeometry</code> - 球体，适合制作球形物体</li>
          <li><code>CylinderGeometry</code> - 圆柱体，可制作柱子、管道</li>
          <li><code>ConeGeometry</code> - 圆锥体，制作锥形物体</li>
          <li><code>PlaneGeometry</code> - 平面，常用作地面、墙面</li>
        </TechList>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem', marginTop: '2rem' }}>高级几何体</h3>
        <TechList>
          <li><code>TorusGeometry</code> - 圆环体，甜甜圈形状</li>
          <li><code>TorusKnotGeometry</code> - 环结体，复杂的扭结形状</li>
          <li><code>TubeGeometry</code> - 管道几何体，沿路径挤出</li>
          <li><code>ParametricGeometry</code> - 参数几何体，数学函数定义</li>
        </TechList>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem', marginTop: '2rem' }}>多面体</h3>
        <TechList>
          <li><code>TetrahedronGeometry</code> - 四面体，4个三角面</li>
          <li><code>OctahedronGeometry</code> - 八面体，8个三角面</li>
          <li><code>DodecahedronGeometry</code> - 十二面体，12个五边形面</li>
          <li><code>IcosahedronGeometry</code> - 二十面体，20个三角面</li>
        </TechList>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem', marginTop: '2rem' }}>自定义几何体</h3>
        <InfoDescription>
          使用 <code>BufferGeometry</code> 可以创建完全自定义的几何体，通过定义顶点、面、法线等数据来构建任意形状。
        </InfoDescription>
        
        <CodeSection>
          <summary>🔍 查看核心代码</summary>
          <pre>{`// 基础几何体创建
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
const parametricGeometry = createParametricGeometry()`}</pre>
        </CodeSection>
      </InfoPanel>
    </PageContainer>
  )
}

export default GeometryShowcase