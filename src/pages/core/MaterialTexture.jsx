import React, { Suspense, useRef, useMemo } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, Box, Sphere, Plane, Text, useTexture } from '@react-three/drei'
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

// Generate procedural textures
function createProceduralTexture(type = 'checker') {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')
  
  switch (type) {
    case 'checker':
      const size = 64
      for (let x = 0; x < canvas.width; x += size) {
        for (let y = 0; y < canvas.height; y += size) {
          ctx.fillStyle = ((x / size) + (y / size)) % 2 ? '#ffffff' : '#000000'
          ctx.fillRect(x, y, size, size)
        }
      }
      break
      
    case 'gradient':
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, '#ff6b6b')
      gradient.addColorStop(0.5, '#4ecdc4')
      gradient.addColorStop(1, '#45b7d1')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      break
      
    case 'noise':
      const imageData = ctx.createImageData(canvas.width, canvas.height)
      for (let i = 0; i < imageData.data.length; i += 4) {
        const value = Math.random() * 255
        imageData.data[i] = value     // R
        imageData.data[i + 1] = value // G
        imageData.data[i + 2] = value // B
        imageData.data[i + 3] = 255   // A
      }
      ctx.putImageData(imageData, 0, 0)
      break
      
    default:
      ctx.fillStyle = '#4ecdc4'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
  }
  
  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  return texture
}

// Material showcase component
function MaterialSphere({ position, materialType, ...props }) {
  const meshRef = useRef()
  
  const checkerTexture = useMemo(() => createProceduralTexture('checker'), [])
  const gradientTexture = useMemo(() => createProceduralTexture('gradient'), [])
  const noiseTexture = useMemo(() => createProceduralTexture('noise'), [])
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
    }
  })
  
  const getMaterial = () => {
    const baseProps = {
      transparent: true,
      opacity: 0.9
    }
    
    switch (materialType) {
      case 'basic':
        return <meshBasicMaterial color="#ff6b6b" {...baseProps} />
        
      case 'lambert':
        return <meshLambertMaterial color="#4ecdc4" {...baseProps} />
        
      case 'phong':
        return (
          <meshPhongMaterial 
            color="#45b7d1" 
            shininess={100}
            specular="#ffffff"
            {...baseProps} 
          />
        )
        
      case 'standard':
        return (
          <meshStandardMaterial 
            color="#2ecc71"
            metalness={0.3}
            roughness={0.4}
            {...baseProps}
          />
        )
        
      case 'physical':
        return (
          <meshPhysicalMaterial 
            color="#9b59b6"
            metalness={0.8}
            roughness={0.2}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
            {...baseProps}
          />
        )
        
      case 'textured':
        return (
          <meshStandardMaterial 
            map={checkerTexture}
            normalMap={noiseTexture}
            normalScale={[0.5, 0.5]}
            {...baseProps}
          />
        )
        
      case 'emissive':
        return (
          <meshStandardMaterial 
            color="#2c3e50"
            emissive="#f39c12"
            emissiveIntensity={0.5}
            {...baseProps}
          />
        )
        
      case 'wireframe':
        return (
          <meshBasicMaterial 
            color="#00ffff"
            wireframe
            {...baseProps}
          />
        )
        
      default:
        return <meshStandardMaterial color="#ffffff" {...baseProps} />
    }
  }
  
  return (
    <Sphere ref={meshRef} position={position} args={[0.8]} {...props}>
      {getMaterial()}
    </Sphere>
  )
}

// Texture showcase component
function TexturedBox({ position, textureType }) {
  const meshRef = useRef()
  
  const checkerTexture = useMemo(() => createProceduralTexture('checker'), [])
  const gradientTexture = useMemo(() => createProceduralTexture('gradient'), [])
  const noiseTexture = useMemo(() => createProceduralTexture('noise'), [])
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
    }
  })
  
  const getTexture = () => {
    switch (textureType) {
      case 'checker': return checkerTexture
      case 'gradient': return gradientTexture
      case 'noise': return noiseTexture
      default: return null
    }
  }
  
  const texture = getTexture()
  if (texture) {
    texture.repeat.set(2, 2)
  }
  
  return (
    <Box ref={meshRef} position={position} args={[1, 1, 1]} castShadow>
      <meshStandardMaterial 
        map={texture}
        roughness={0.3}
        metalness={0.1}
      />
    </Box>
  )
}

function Scene() {
  const { 
    materialType,
    showTextures,
    textureRepeat,
    roughness,
    metalness
  } = useControls('材质控制', {
    materialType: {
      value: 'standard',
      options: {
        '基础材质': 'basic',
        'Lambert材质': 'lambert',
        'Phong材质': 'phong',
        '标准材质': 'standard',
        '物理材质': 'physical',
        '纹理材质': 'textured',
        '发光材质': 'emissive',
        '线框材质': 'wireframe'
      }
    },
    showTextures: { value: true },
    textureRepeat: { value: 2, min: 1, max: 8, step: 1 },
    roughness: { value: 0.4, min: 0, max: 1, step: 0.1 },
    metalness: { value: 0.3, min: 0, max: 1, step: 0.1 }
  })
  
  return (
    <>
      {/* Ground plane */}
      <Plane 
        args={[20, 20]} 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -2, 0]}
        receiveShadow
      >
        <meshStandardMaterial color="#2c3e50" roughness={0.8} />
      </Plane>
      
      {/* Material showcase spheres */}
      <MaterialSphere 
        position={[0, 0, 0]} 
        materialType={materialType}
        castShadow 
      />
      
      {/* Textured boxes */}
      {showTextures && (
        <>
          <TexturedBox position={[-3, 0, 0]} textureType="checker" />
          <TexturedBox position={[3, 0, 0]} textureType="gradient" />
          <TexturedBox position={[0, 0, 3]} textureType="noise" />
        </>
      )}
      
      {/* Additional objects for comparison */}
      <Box position={[-2, 2, -2]} args={[0.8, 0.8, 0.8]} castShadow>
        <meshStandardMaterial 
          color="#e74c3c" 
          roughness={roughness}
          metalness={metalness}
        />
      </Box>
      
      <Sphere position={[2, 2, -2]} args={[0.6]} castShadow>
        <meshPhysicalMaterial 
          color="#3498db"
          metalness={0.9}
          roughness={0.1}
          clearcoat={1.0}
        />
      </Sphere>
      
      {/* Text label */}
      <Text
        position={[0, 4, 0]}
        fontSize={0.8}
        color="#00ffff"
        anchorX="center"
        anchorY="middle"
      >
        材质与纹理演示
      </Text>
    </>
  )
}

function MaterialTexture() {
  return (
    <PageContainer>
      <CanvasContainer>
        <Canvas
          shadows
          camera={{ position: [6, 4, 6], fov: 75 }}
          gl={{ antialias: true }}
        >
          <Suspense fallback={null}>
            <Scene />
            <ambientLight intensity={0.3} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={1}
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
            />
            <pointLight position={[-10, 5, -10]} intensity={0.5} color="#ff6b6b" />
            <pointLight position={[10, 5, 10]} intensity={0.5} color="#4ecdc4" />
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
          🎨 材质与纹理
        </InfoTitle>
        
        <InfoDescription>
          材质决定了物体表面的视觉特性，包括颜色、反射、透明度等。纹理则为材质提供了更丰富的表面细节。
        </InfoDescription>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem' }}>材质类型</h3>
        <TechList>
          <li><code>MeshBasicMaterial</code> - 不受光照影响的基础材质</li>
          <li><code>MeshLambertMaterial</code> - 漫反射材质</li>
          <li><code>MeshPhongMaterial</code> - 支持镜面反射</li>
          <li><code>MeshStandardMaterial</code> - 基于物理的标准材质</li>
          <li><code>MeshPhysicalMaterial</code> - 高级物理材质</li>
        </TechList>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem', marginTop: '2rem' }}>纹理类型</h3>
        <TechList>
          <li><code>map</code> - 漫反射贴图（颜色）</li>
          <li><code>normalMap</code> - 法线贴图（表面细节）</li>
          <li><code>roughnessMap</code> - 粗糙度贴图</li>
          <li><code>metalnessMap</code> - 金属度贴图</li>
          <li><code>emissiveMap</code> - 发光贴图</li>
          <li><code>envMap</code> - 环境贴图（反射）</li>
        </TechList>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem', marginTop: '2rem' }}>物理属性</h3>
        <TechList>
          <li><code>roughness</code> - 粗糙度 (0=镜面, 1=完全粗糙)</li>
          <li><code>metalness</code> - 金属度 (0=非金属, 1=金属)</li>
          <li><code>clearcoat</code> - 透明涂层强度</li>
          <li><code>transmission</code> - 透射率</li>
        </TechList>
        
        <CodeSection>
          <summary>🔍 查看核心代码</summary>
          <pre>{`// 标准材质设置
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
texture.repeat.set(2, 2)`}</pre>
        </CodeSection>
      </InfoPanel>
    </PageContainer>
  )
}

export default MaterialTexture