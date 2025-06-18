import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Box, Sphere, Plane, Text, useHelper } from '@react-three/drei'
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

// 3D Scene Components
function Scene() {
  return (
    <>
      {/* Ground plane */}
      <Plane 
        args={[20, 20]} 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -2, 0]}
        receiveShadow
      >
        <meshStandardMaterial color="#2c3e50" />
      </Plane>
      
      {/* Objects that cast shadows */}
      <Box position={[-3, 0, 0]} args={[1, 1, 1]} castShadow receiveShadow>
        <meshStandardMaterial color="#e74c3c" />
      </Box>
      
      <Sphere position={[0, 0, 0]} args={[0.8]} castShadow receiveShadow>
        <meshStandardMaterial color="#3498db" />
      </Sphere>
      
      <Box position={[3, 0, 0]} args={[1, 2, 1]} castShadow receiveShadow>
        <meshStandardMaterial color="#2ecc71" />
      </Box>
      
      {/* Floating objects */}
      <Box position={[-1, 3, -2]} args={[0.5, 0.5, 0.5]} castShadow>
        <meshStandardMaterial color="#f39c12" />
      </Box>
      
      <Sphere position={[2, 2, -1]} args={[0.4]} castShadow>
        <meshStandardMaterial color="#9b59b6" />
      </Sphere>
      
      {/* Tall pillar */}
      <Box position={[0, 1, 3]} args={[0.5, 4, 0.5]} castShadow receiveShadow>
        <meshStandardMaterial color="#34495e" />
      </Box>
      
      {/* Text label */}
      <Text
        position={[0, 5, 0]}
        fontSize={0.8}
        color="#00ffff"
        anchorX="center"
        anchorY="middle"
      >
        光照系统演示
      </Text>
    </>
  )
}

function AnimatedLight({ position, color, intensity, type = 'point' }) {
  const lightRef = useRef()
  
  useFrame((state) => {
    if (lightRef.current && type === 'point') {
      const time = state.clock.elapsedTime
      lightRef.current.position.x = position[0] + Math.sin(time) * 2
      lightRef.current.position.z = position[2] + Math.cos(time) * 2
    }
  })
  
  if (type === 'directional') {
    return (
      <directionalLight
        ref={lightRef}
        position={position}
        color={color}
        intensity={intensity}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
    )
  }
  
  return (
    <pointLight
      ref={lightRef}
      position={position}
      color={color}
      intensity={intensity}
      distance={20}
      decay={2}
      castShadow
      shadow-mapSize-width={1024}
      shadow-mapSize-height={1024}
    />
  )
}

function LightHelpers() {
  const directionalRef = useRef()
  const pointRef1 = useRef()
  const pointRef2 = useRef()
  const spotRef = useRef()
  
  const { showHelpers } = useControls('辅助工具', {
    showHelpers: { value: true }
  })
  
  useHelper(showHelpers && directionalRef, THREE.DirectionalLightHelper, 1, 'yellow')
  useHelper(showHelpers && pointRef1, THREE.PointLightHelper, 0.5, 'red')
  useHelper(showHelpers && pointRef2, THREE.PointLightHelper, 0.5, 'blue')
  useHelper(showHelpers && spotRef, THREE.SpotLightHelper, 'green')
  
  return (
    <>
      <directionalLight
        ref={directionalRef}
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      
      <pointLight
        ref={pointRef1}
        position={[-5, 3, -5]}
        color="#ff6b6b"
        intensity={1}
        distance={15}
        castShadow
      />
      
      <pointLight
        ref={pointRef2}
        position={[5, 3, 5]}
        color="#4ecdc4"
        intensity={1}
        distance={15}
        castShadow
      />
      
      <spotLight
        ref={spotRef}
        position={[0, 8, 0]}
        angle={Math.PI / 6}
        penumbra={0.5}
        intensity={2}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
    </>
  )
}

function LightingControls() {
  const {
    ambientIntensity,
    directionalIntensity,
    pointIntensity,
    spotIntensity,
    shadowsEnabled
  } = useControls('光照控制', {
    ambientIntensity: { value: 0.3, min: 0, max: 2, step: 0.1 },
    directionalIntensity: { value: 1, min: 0, max: 3, step: 0.1 },
    pointIntensity: { value: 1, min: 0, max: 3, step: 0.1 },
    spotIntensity: { value: 2, min: 0, max: 5, step: 0.1 },
    shadowsEnabled: { value: true }
  })
  
  return (
    <>
      <ambientLight intensity={ambientIntensity} />
    </>
  )
}

function LightingSystem() {
  return (
    <PageContainer>
      <CanvasContainer>
        <Canvas
          shadows
          camera={{ position: [8, 6, 8], fov: 75 }}
          gl={{ antialias: true, shadowMap: { enabled: true, type: THREE.PCFSoftShadowMap } }}
        >
          <Suspense fallback={null}>
            <Scene />
            <LightingControls />
            <LightHelpers />
            <OrbitControls
              enableDamping
              dampingFactor={0.05}
              minDistance={3}
              maxDistance={30}
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
          💡 光照系统
        </InfoTitle>
        
        <InfoDescription>
          Three.js 提供了多种光源类型来模拟真实世界的光照效果。本演示展示了环境光、方向光、点光源、聚光灯的特性和阴影效果。
        </InfoDescription>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem' }}>光源类型</h3>
        <TechList>
          <li><code>AmbientLight</code> - 环境光，均匀照亮所有物体</li>
          <li><code>DirectionalLight</code> - 方向光，模拟太阳光</li>
          <li><code>PointLight</code> - 点光源，从一点向四周发光</li>
          <li><code>SpotLight</code> - 聚光灯，锥形光束</li>
          <li><code>HemisphereLight</code> - 半球光，模拟天空光</li>
          <li><code>RectAreaLight</code> - 矩形区域光</li>
        </TechList>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem', marginTop: '2rem' }}>阴影系统</h3>
        <TechList>
          <li><code>castShadow</code> - 物体投射阴影</li>
          <li><code>receiveShadow</code> - 物体接收阴影</li>
          <li><code>PCFSoftShadowMap</code> - 软阴影算法</li>
          <li><code>shadow-mapSize</code> - 阴影贴图分辨率</li>
        </TechList>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem', marginTop: '2rem' }}>交互说明</h3>
        <InfoDescription>
          • 使用右侧控制面板调整光照参数<br/>
          • 观察不同光源的照明效果<br/>
          • 注意阴影的形成和变化<br/>
          • 彩色光源会影响物体颜色
        </InfoDescription>
        
        <CodeSection>
          <summary>🔍 查看核心代码</summary>
          <pre>{`// 方向光设置
const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(10, 10, 5)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 2048
directionalLight.shadow.mapSize.height = 2048

// 点光源设置
const pointLight = new THREE.PointLight(0xff6b6b, 1, 15, 2)
pointLight.position.set(-5, 3, -5)
pointLight.castShadow = true

// 聚光灯设置
const spotLight = new THREE.SpotLight(0xffffff, 2, 20, Math.PI / 6, 0.5)
spotLight.position.set(0, 8, 0)
spotLight.castShadow = true

// 启用阴影
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap`}</pre>
        </CodeSection>
      </InfoPanel>
    </PageContainer>
  )
}

export default LightingSystem