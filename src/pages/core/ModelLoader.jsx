import React, { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, Text, useGLTF, useAnimations, Environment, ContactShadows } from '@react-three/drei'
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

const ModelSelector = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`

const ModelButton = styled.button`
  background: ${props => props.active ? 'var(--accent-color)' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.active ? 'var(--primary-bg)' : 'var(--text-primary)'};
  border: 1px solid ${props => props.active ? 'var(--accent-color)' : 'rgba(255, 255, 255, 0.2)'};
  border-radius: 8px;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
  
  &:hover {
    background: ${props => props.active ? 'var(--accent-color)' : 'rgba(255, 255, 255, 0.2)'};
    transform: translateY(-2px);
  }
`

// Simple 3D models created with code (since we don't have external GLTF files)
function SimpleRobot({ position, scale = 1 }) {
  const groupRef = useRef()
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.3
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })
  
  return (
    <group 
      ref={groupRef} 
      position={position} 
      scale={scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Body */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[1, 1.5, 0.8]} />
        <meshStandardMaterial color={hovered ? "#ff6b6b" : "#4ecdc4"} />
      </mesh>
      
      {/* Head */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color={hovered ? "#45b7d1" : "#2ecc71"} />
      </mesh>
      
      {/* Eyes */}
      <mesh position={[-0.2, 1.3, 0.4]}>
        <sphereGeometry args={[0.1]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.2, 1.3, 0.4]}>
        <sphereGeometry args={[0.1]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      {/* Arms */}
      <mesh position={[-0.8, 0.3, 0]} castShadow>
        <boxGeometry args={[0.3, 1, 0.3]} />
        <meshStandardMaterial color={hovered ? "#f39c12" : "#e67e22"} />
      </mesh>
      <mesh position={[0.8, 0.3, 0]} castShadow>
        <boxGeometry args={[0.3, 1, 0.3]} />
        <meshStandardMaterial color={hovered ? "#f39c12" : "#e67e22"} />
      </mesh>
      
      {/* Legs */}
      <mesh position={[-0.3, -1.2, 0]} castShadow>
        <boxGeometry args={[0.3, 1, 0.3]} />
        <meshStandardMaterial color={hovered ? "#9b59b6" : "#8e44ad"} />
      </mesh>
      <mesh position={[0.3, -1.2, 0]} castShadow>
        <boxGeometry args={[0.3, 1, 0.3]} />
        <meshStandardMaterial color={hovered ? "#9b59b6" : "#8e44ad"} />
      </mesh>
    </group>
  )
}

function AnimatedCar({ position, scale = 1 }) {
  const groupRef = useRef()
  const wheelRefs = [useRef(), useRef(), useRef(), useRef()]
  
  useFrame((state) => {
    if (groupRef.current) {
      // Car movement
      const time = state.clock.elapsedTime
      groupRef.current.position.x = position[0] + Math.sin(time * 0.5) * 3
      
      // Wheel rotation
      wheelRefs.forEach(wheelRef => {
        if (wheelRef.current) {
          wheelRef.current.rotation.x = time * 2
        }
      })
    }
  })
  
  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Car body */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[2, 0.8, 1]} />
        <meshStandardMaterial color="#e74c3c" />
      </mesh>
      
      {/* Car roof */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <boxGeometry args={[1.2, 0.6, 0.9]} />
        <meshStandardMaterial color="#c0392b" />
      </mesh>
      
      {/* Wheels */}
      <mesh ref={wheelRefs[0]} position={[-0.7, 0, 0.6]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
        <meshStandardMaterial color="#2c3e50" />
      </mesh>
      <mesh ref={wheelRefs[1]} position={[0.7, 0, 0.6]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
        <meshStandardMaterial color="#2c3e50" />
      </mesh>
      <mesh ref={wheelRefs[2]} position={[-0.7, 0, -0.6]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
        <meshStandardMaterial color="#2c3e50" />
      </mesh>
      <mesh ref={wheelRefs[3]} position={[0.7, 0, -0.6]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
        <meshStandardMaterial color="#2c3e50" />
      </mesh>
      
      {/* Windows */}
      <mesh position={[0.3, 1.2, 0.46]}>
        <boxGeometry args={[0.8, 0.4, 0.02]} />
        <meshStandardMaterial color="#3498db" transparent opacity={0.7} />
      </mesh>
      <mesh position={[-0.3, 1.2, 0.46]}>
        <boxGeometry args={[0.8, 0.4, 0.02]} />
        <meshStandardMaterial color="#3498db" transparent opacity={0.7} />
      </mesh>
    </group>
  )
}

function FloatingCrystal({ position, scale = 1 }) {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.7
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 0.3
    }
  })
  
  return (
    <mesh ref={meshRef} position={position} scale={scale} castShadow>
      <octahedronGeometry args={[1]} />
      <meshPhysicalMaterial 
        color="#9b59b6"
        metalness={0.1}
        roughness={0.1}
        transmission={0.9}
        thickness={1}
        clearcoat={1}
        clearcoatRoughness={0.1}
      />
    </mesh>
  )
}

function Scene() {
  const [selectedModel, setSelectedModel] = useState('robot')
  
  const { 
    modelScale,
    animationSpeed,
    showWireframe,
    environmentPreset
  } = useControls('模型控制', {
    modelScale: { value: 1, min: 0.5, max: 3, step: 0.1 },
    animationSpeed: { value: 1, min: 0, max: 3, step: 0.1 },
    showWireframe: { value: false },
    environmentPreset: {
      value: 'city',
      options: {
        '城市': 'city',
        '日落': 'sunset',
        '森林': 'forest',
        '工作室': 'studio',
        '仓库': 'warehouse'
      }
    }
  })
  
  const models = {
    robot: <SimpleRobot position={[0, 0, 0]} scale={modelScale} />,
    car: <AnimatedCar position={[0, 0, 0]} scale={modelScale} />,
    crystal: <FloatingCrystal position={[0, 2, 0]} scale={modelScale} />
  }
  
  return (
    <>
      <Environment preset={environmentPreset} />
      
      {/* Ground */}
      <ContactShadows 
        position={[0, -2, 0]} 
        opacity={0.4} 
        scale={20} 
        blur={2} 
        far={4} 
      />
      
      {/* Models */}
      {models[selectedModel]}
      
      {/* Additional scene elements */}
      <mesh position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#2c3e50" transparent opacity={0.1} />
      </mesh>
      
      {/* Title */}
      <Text
        position={[0, 4, 0]}
        fontSize={0.8}
        color="#00ffff"
        anchorX="center"
        anchorY="middle"
      >
        3D 模型展示
      </Text>
      
      {/* Model selector UI in 3D space */}
      <group position={[-4, 2, 0]}>
        <Text
          position={[0, 1, 0]}
          fontSize={0.3}
          color="#ffffff"
          anchorX="center"
        >
          选择模型:
        </Text>
        
        {['robot', 'car', 'crystal'].map((model, index) => (
          <mesh 
            key={model}
            position={[0, 0.5 - index * 0.4, 0]}
            onClick={() => setSelectedModel(model)}
            onPointerOver={(e) => {
              e.object.material.color.setHex(selectedModel === model ? 0x00ffff : 0x4ecdc4)
              document.body.style.cursor = 'pointer'
            }}
            onPointerOut={(e) => {
              e.object.material.color.setHex(selectedModel === model ? 0x00ffff : 0x666666)
              document.body.style.cursor = 'default'
            }}
          >
            <boxGeometry args={[1.5, 0.3, 0.1]} />
            <meshStandardMaterial 
              color={selectedModel === model ? '#00ffff' : '#666666'}
              transparent
              opacity={0.8}
            />
          </mesh>
        ))}
      </group>
    </>
  )
}

function ModelLoader() {
  const [selectedModel, setSelectedModel] = useState('robot')
  
  const modelInfo = {
    robot: {
      name: '机器人模型',
      description: '一个简单的机器人模型，展示了基础的几何体组合和动画效果。',
      features: ['悬浮动画', '鼠标交互', '颜色变化']
    },
    car: {
      name: '汽车模型',
      description: '动画汽车模型，展示了复杂的运动动画和轮子旋转效果。',
      features: ['路径动画', '轮子旋转', '透明窗户']
    },
    crystal: {
      name: '水晶模型',
      description: '透明水晶模型，展示了高级材质效果和物理渲染。',
      features: ['透明材质', '折射效果', '浮动动画']
    }
  }
  
  return (
    <PageContainer>
      <CanvasContainer>
        <Canvas
          shadows
          camera={{ position: [5, 3, 5], fov: 75 }}
          gl={{ antialias: true }}
        >
          <Suspense fallback={null}>
            <Scene />
            <OrbitControls
              enableDamping
              dampingFactor={0.05}
              minDistance={3}
              maxDistance={20}
              maxPolarAngle={Math.PI / 2 + 0.3}
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
          🏗️ 模型加载器
        </InfoTitle>
        
        <InfoDescription>
          Three.js 支持多种 3D 模型格式，其中 GLTF 是最推荐的格式。本演示展示了程序化创建的 3D 模型和动画效果。
        </InfoDescription>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem' }}>模型选择</h3>
        <ModelSelector>
          {Object.entries(modelInfo).map(([key, info]) => (
            <ModelButton
              key={key}
              active={selectedModel === key}
              onClick={() => setSelectedModel(key)}
            >
              {info.name}
            </ModelButton>
          ))}
        </ModelSelector>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem' }}>当前模型信息</h3>
        <InfoDescription>
          <strong>{modelInfo[selectedModel].name}</strong><br/>
          {modelInfo[selectedModel].description}
        </InfoDescription>
        
        <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>特性:</h4>
        <TechList>
          {modelInfo[selectedModel].features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </TechList>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem', marginTop: '2rem' }}>支持的格式</h3>
        <TechList>
          <li><code>GLTF/GLB</code> - 推荐格式，支持动画、材质</li>
          <li><code>FBX</code> - Autodesk 格式，广泛使用</li>
          <li><code>OBJ</code> - 简单几何体格式</li>
          <li><code>DAE</code> - Collada 格式</li>
          <li><code>STL</code> - 3D 打印常用格式</li>
        </TechList>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem', marginTop: '2rem' }}>动画系统</h3>
        <TechList>
          <li><code>AnimationMixer</code> - 动画混合器</li>
          <li><code>AnimationClip</code> - 动画片段</li>
          <li><code>KeyframeTrack</code> - 关键帧轨道</li>
          <li><code>AnimationAction</code> - 动画动作</li>
        </TechList>
        
        <CodeSection>
          <summary>🔍 查看核心代码</summary>
          <pre>{`// GLTF 模型加载
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const loader = new GLTFLoader()
loader.load('model.gltf', (gltf) => {
  const model = gltf.scene
  scene.add(model)
  
  // 动画设置
  const mixer = new THREE.AnimationMixer(model)
  const clips = gltf.animations
  
  clips.forEach((clip) => {
    const action = mixer.clipAction(clip)
    action.play()
  })
  
  // 在渲染循环中更新动画
  function animate() {
    mixer.update(clock.getDelta())
    renderer.render(scene, camera)
  }
})

// 使用 drei 的 useGLTF hook
import { useGLTF, useAnimations } from '@react-three/drei'

function Model() {
  const { scene, animations } = useGLTF('model.gltf')
  const { actions } = useAnimations(animations, scene)
  
  useEffect(() => {
    actions['AnimationName']?.play()
  }, [actions])
  
  return <primitive object={scene} />
}`}</pre>
        </CodeSection>
      </InfoPanel>
    </PageContainer>
  )
}

export default ModelLoader