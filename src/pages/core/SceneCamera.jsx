import React, { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, OrthographicCamera, Box, Sphere, Plane, Text } from '@react-three/drei'
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
  const groupRef = useRef()
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })
  
  return (
    <group ref={groupRef}>
      {/* Ground plane */}
      <Plane args={[20, 20]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <meshStandardMaterial color="#333" wireframe />
      </Plane>
      
      {/* Objects */}
      <Box position={[-3, 0, 0]} args={[1, 1, 1]}>
        <meshStandardMaterial color="#ff6b6b" />
      </Box>
      
      <Sphere position={[0, 0, 0]} args={[0.8]}>
        <meshStandardMaterial color="#4ecdc4" />
      </Sphere>
      
      <Box position={[3, 0, 0]} args={[1, 2, 1]}>
        <meshStandardMaterial color="#45b7d1" />
      </Box>
      
      {/* Floating objects */}
      <Box position={[-1, 3, -2]} args={[0.5, 0.5, 0.5]}>
        <meshStandardMaterial color="#96ceb4" />
      </Box>
      
      <Sphere position={[2, 2, -1]} args={[0.4]}>
        <meshStandardMaterial color="#feca57" />
      </Sphere>
      
      {/* Text labels */}
      <Text
        position={[0, 4, 0]}
        fontSize={0.8}
        color="#00ffff"
        anchorX="center"
        anchorY="middle"
      >
        场景与相机演示
      </Text>
    </group>
  )
}

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-10, 10, -10]} intensity={0.5} color="#ff6b6b" />
      <pointLight position={[10, -10, 10]} intensity={0.5} color="#4ecdc4" />
    </>
  )
}

function CameraController() {
  const { camera, gl } = useThree()
  
  const {
    cameraType,
    fov,
    zoom,
    near,
    far,
    positionX,
    positionY,
    positionZ
  } = useControls('相机控制', {
    cameraType: {
      value: 'perspective',
      options: {
        '透视相机': 'perspective',
        '正交相机': 'orthographic'
      }
    },
    fov: { value: 75, min: 10, max: 120, step: 1 },
    zoom: { value: 1, min: 0.1, max: 5, step: 0.1 },
    near: { value: 0.1, min: 0.01, max: 1, step: 0.01 },
    far: { value: 1000, min: 10, max: 2000, step: 10 },
    positionX: { value: 5, min: -20, max: 20, step: 0.5 },
    positionY: { value: 5, min: -20, max: 20, step: 0.5 },
    positionZ: { value: 5, min: -20, max: 20, step: 0.5 }
  })
  
  React.useEffect(() => {
    camera.position.set(positionX, positionY, positionZ)
    camera.near = near
    camera.far = far
    camera.zoom = zoom
    
    if (cameraType === 'perspective' && camera.type === 'PerspectiveCamera') {
      camera.fov = fov
    }
    
    camera.updateProjectionMatrix()
  }, [camera, cameraType, fov, zoom, near, far, positionX, positionY, positionZ])
  
  return null
}

function SceneCamera() {
  const [cameraType, setCameraType] = useState('perspective')
  
  return (
    <PageContainer>
      <CanvasContainer>
        <Canvas
          shadows
          camera={{ position: [5, 5, 5], fov: 75 }}
          gl={{ antialias: true }}
        >
          <Suspense fallback={null}>
            <Scene />
            <Lighting />
            <CameraController />
            <OrbitControls
              enableDamping
              dampingFactor={0.05}
              minDistance={2}
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
          🎯 场景与相机
        </InfoTitle>
        
        <InfoDescription>
          Three.js 中的相机决定了我们如何观察 3D 场景。本演示展示了透视相机和正交相机的区别，以及各种相机参数的效果。
        </InfoDescription>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem' }}>核心概念</h3>
        <TechList>
          <li><code>PerspectiveCamera</code> - 透视相机，模拟人眼视觉</li>
          <li><code>OrthographicCamera</code> - 正交相机，无透视效果</li>
          <li><code>FOV</code> - 视野角度，影响视觉范围</li>
          <li><code>Near/Far</code> - 近远裁剪面</li>
          <li><code>Position</code> - 相机位置</li>
          <li><code>OrbitControls</code> - 轨道控制器</li>
        </TechList>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem', marginTop: '2rem' }}>交互说明</h3>
        <InfoDescription>
          • 使用右侧控制面板调整相机参数<br/>
          • 鼠标拖拽旋转视角<br/>
          • 滚轮缩放场景<br/>
          • 右键拖拽平移视角
        </InfoDescription>
        
        <CodeSection>
          <summary>🔍 查看核心代码</summary>
          <pre>{`// 透视相机设置
const camera = new THREE.PerspectiveCamera(
  75,  // fov
  window.innerWidth / window.innerHeight,  // aspect
  0.1, // near
  1000 // far
)

// 正交相机设置
const camera = new THREE.OrthographicCamera(
  -width / 2, width / 2,   // left, right
  height / 2, -height / 2, // top, bottom
  0.1, 1000                // near, far
)

// 轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.05`}</pre>
        </CodeSection>
      </InfoPanel>
    </PageContainer>
  )
}

export default SceneCamera