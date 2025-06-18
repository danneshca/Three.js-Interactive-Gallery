import React, { Suspense, useRef, useState, useEffect, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Text, Box, Sphere, Cylinder } from '@react-three/drei'
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

const XRButton = styled.button`
  background: linear-gradient(135deg, var(--accent-color), #0066cc);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 255, 255, 0.3);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;
  padding: 0.5rem;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.3);
  
  .status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${props => props.status === 'supported' ? '#4CAF50' : 
                          props.status === 'not-supported' ? '#f44336' : '#ff9800'};
  }
`

// Interactive VR/AR objects
function InteractiveBox({ position, color, onSelect }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [selected, setSelected] = useState(false)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      
      if (hovered || selected) {
        meshRef.current.scale.setScalar(1.2)
      } else {
        meshRef.current.scale.setScalar(1)
      }
    }
  })
  
  const handleClick = () => {
    setSelected(!selected)
    onSelect && onSelect(!selected)
  }
  
  return (
    <Box
      ref={meshRef}
      position={position}
      args={[1, 1, 1]}
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <meshStandardMaterial 
        color={selected ? '#ff6b6b' : hovered ? '#4ecdc4' : color}
        emissive={selected ? '#330000' : hovered ? '#001a1a' : '#000000'}
      />
    </Box>
  )
}

function InteractiveSphere({ position, color, onSelect }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [selected, setSelected] = useState(false)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.2
      
      if (hovered || selected) {
        meshRef.current.scale.setScalar(1.3)
      } else {
        meshRef.current.scale.setScalar(1)
      }
    }
  })
  
  const handleClick = () => {
    setSelected(!selected)
    onSelect && onSelect(!selected)
  }
  
  return (
    <Sphere
      ref={meshRef}
      position={position}
      args={[0.5, 32, 32]}
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <meshStandardMaterial 
        color={selected ? '#ff6b6b' : hovered ? '#4ecdc4' : color}
        emissive={selected ? '#330000' : hovered ? '#001a1a' : '#000000'}
        transparent
        opacity={0.8}
      />
    </Sphere>
  )
}

// VR Controller visualization
function VRController({ position, rotation }) {
  const groupRef = useRef()
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.1
    }
  })
  
  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {/* Controller body */}
      <Cylinder args={[0.02, 0.03, 0.15]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#333333" />
      </Cylinder>
      
      {/* Trigger */}
      <Box args={[0.02, 0.01, 0.03]} position={[0, -0.02, 0.05]}>
        <meshStandardMaterial color="#666666" />
      </Box>
      
      {/* Touchpad */}
      <Cylinder args={[0.015, 0.015, 0.005]} position={[0, 0.02, 0.02]}>
        <meshStandardMaterial color="#222222" />
      </Cylinder>
      
      {/* LED indicator */}
      <Sphere args={[0.003]} position={[0, 0.03, 0.03]}>
        <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={0.5} />
      </Sphere>
    </group>
  )
}

// AR Marker simulation
function ARMarker({ position }) {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime
    }
  })
  
  return (
    <group position={position}>
      {/* Marker base */}
      <Box args={[0.1, 0.01, 0.1]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#ffffff" />
      </Box>
      
      {/* AR content */}
      <group ref={meshRef} position={[0, 0.5, 0]}>
        <Sphere args={[0.2]} position={[0, 0, 0]}>
          <meshStandardMaterial 
            color="#ff6b6b" 
            transparent 
            opacity={0.7}
            emissive="#ff0000"
            emissiveIntensity={0.2}
          />
        </Sphere>
        
        <Text
          position={[0, 0.4, 0]}
          fontSize={0.1}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          AR Object
        </Text>
      </group>
    </group>
  )
}

// WebXR Manager Hook
function useWebXR() {
  const { gl } = useThree()
  const [xrSupported, setXrSupported] = useState({
    vr: false,
    ar: false
  })
  const [xrSession, setXrSession] = useState(null)
  
  useEffect(() => {
    if (navigator.xr) {
      // Check VR support
      navigator.xr.isSessionSupported('immersive-vr').then((supported) => {
        setXrSupported(prev => ({ ...prev, vr: supported }))
      }).catch(() => {
        setXrSupported(prev => ({ ...prev, vr: false }))
      })
      
      // Check AR support
      navigator.xr.isSessionSupported('immersive-ar').then((supported) => {
        setXrSupported(prev => ({ ...prev, ar: supported }))
      }).catch(() => {
        setXrSupported(prev => ({ ...prev, ar: false }))
      })
    }
  }, [])
  
  const startVRSession = async () => {
    if (navigator.xr && xrSupported.vr) {
      try {
        const session = await navigator.xr.requestSession('immersive-vr')
        await gl.xr.setSession(session)
        setXrSession(session)
        
        session.addEventListener('end', () => {
          setXrSession(null)
        })
      } catch (error) {
        console.error('Failed to start VR session:', error)
      }
    }
  }
  
  const startARSession = async () => {
    if (navigator.xr && xrSupported.ar) {
      try {
        const session = await navigator.xr.requestSession('immersive-ar', {
          requiredFeatures: ['local-floor'],
          optionalFeatures: ['hand-tracking', 'hit-test']
        })
        await gl.xr.setSession(session)
        setXrSession(session)
        
        session.addEventListener('end', () => {
          setXrSession(null)
        })
      } catch (error) {
        console.error('Failed to start AR session:', error)
      }
    }
  }
  
  const endSession = () => {
    if (xrSession) {
      xrSession.end()
    }
  }
  
  return {
    xrSupported,
    xrSession,
    startVRSession,
    startARSession,
    endSession
  }
}

function Scene() {
  const {
    showVRControllers,
    showARMarkers,
    interactionMode,
    environmentType
  } = useControls('XR设置', {
    showVRControllers: { value: true, label: '显示VR控制器' },
    showARMarkers: { value: true, label: '显示AR标记' },
    interactionMode: {
      value: 'gaze',
      options: {
        '凝视选择': 'gaze',
        '手势控制': 'gesture',
        '控制器': 'controller'
      },
      label: '交互模式'
    },
    environmentType: {
      value: 'room',
      options: {
        '房间': 'room',
        '户外': 'outdoor',
        '太空': 'space'
      },
      label: '环境类型'
    }
  })
  
  const [selectedObjects, setSelectedObjects] = useState([])
  
  const handleObjectSelect = (index, selected) => {
    if (selected) {
      setSelectedObjects(prev => [...prev, index])
    } else {
      setSelectedObjects(prev => prev.filter(i => i !== index))
    }
  }
  
  return (
    <>
      {/* Environment setup */}
      {environmentType === 'room' && (
        <>
          {/* Room walls */}
          <Box args={[10, 0.1, 10]} position={[0, -2, 0]}>
            <meshStandardMaterial color="#8B4513" />
          </Box>
          <Box args={[0.1, 4, 10]} position={[-5, 0, 0]}>
            <meshStandardMaterial color="#DEB887" />
          </Box>
          <Box args={[0.1, 4, 10]} position={[5, 0, 0]}>
            <meshStandardMaterial color="#DEB887" />
          </Box>
          <Box args={[10, 4, 0.1]} position={[0, 0, -5]}>
            <meshStandardMaterial color="#DEB887" />
          </Box>
        </>
      )}
      
      {environmentType === 'space' && (
        <>
          {/* Stars */}
          {Array.from({ length: 100 }, (_, i) => (
            <Sphere
              key={i}
              args={[0.01]}
              position={[
                (Math.random() - 0.5) * 50,
                (Math.random() - 0.5) * 50,
                (Math.random() - 0.5) * 50
              ]}
            >
              <meshBasicMaterial color="#ffffff" />
            </Sphere>
          ))}
        </>
      )}
      
      {/* Interactive objects */}
      <InteractiveBox 
        position={[-2, 1, 0]} 
        color="#ff6b6b"
        onSelect={(selected) => handleObjectSelect(0, selected)}
      />
      <InteractiveBox 
        position={[0, 1, 0]} 
        color="#4ecdc4"
        onSelect={(selected) => handleObjectSelect(1, selected)}
      />
      <InteractiveBox 
        position={[2, 1, 0]} 
        color="#45b7d1"
        onSelect={(selected) => handleObjectSelect(2, selected)}
      />
      
      <InteractiveSphere 
        position={[-1, 2.5, -2]} 
        color="#96ceb4"
        onSelect={(selected) => handleObjectSelect(3, selected)}
      />
      <InteractiveSphere 
        position={[1, 2.5, -2]} 
        color="#feca57"
        onSelect={(selected) => handleObjectSelect(4, selected)}
      />
      
      {/* VR Controllers */}
      {showVRControllers && (
        <>
          <VRController 
            position={[-0.3, 1.2, 0.5]} 
            rotation={[0, 0.2, 0]}
          />
          <VRController 
            position={[0.3, 1.2, 0.5]} 
            rotation={[0, -0.2, 0]}
          />
        </>
      )}
      
      {/* AR Markers */}
      {showARMarkers && (
        <>
          <ARMarker position={[-3, -1.9, -1]} />
          <ARMarker position={[3, -1.9, -1]} />
          <ARMarker position={[0, -1.9, -3]} />
        </>
      )}
      
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.6} />
      <pointLight position={[-10, -10, -10]} color="#ff0080" intensity={0.3} />
      <pointLight position={[10, -10, 10]} color="#0080ff" intensity={0.3} />
      
      {/* Title */}
      <Text
        position={[0, 4, 0]}
        fontSize={1}
        color="#00ffff"
        anchorX="center"
        anchorY="middle"
      >
        WebXR 体验
      </Text>
      
      {/* Info */}
      <Text
        position={[0, 3.5, 0]}
        fontSize={0.3}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        交互模式: {{
          gaze: '凝视选择',
          gesture: '手势控制',
          controller: 'VR控制器'
        }[interactionMode]}
      </Text>
      
      <Text
        position={[0, 3.2, 0]}
        fontSize={0.3}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        已选择对象: {selectedObjects.length}
      </Text>
    </>
  )
}

// WebXR Manager Component (inside Canvas)
function WebXRManager({ onXRStateChange }) {
  const { xrSupported, xrSession, startVRSession, startARSession, endSession } = useWebXR()
  
  useEffect(() => {
    onXRStateChange({ xrSupported, xrSession, startVRSession, startARSession, endSession })
  }, [xrSupported, xrSession, onXRStateChange])
  
  return null
}

function WebXRExperience() {
  const [xrState, setXrState] = useState({
    xrSupported: { vr: false, ar: false },
    xrSession: null,
    startVRSession: () => {},
    startARSession: () => {},
    endSession: () => {}
  })
  
  const handleXRStateChange = useCallback((newState) => {
    setXrState(newState)
  }, [])
  
  return (
    <PageContainer>
      <CanvasContainer>
        <Canvas
          camera={{ position: [0, 2, 5], fov: 75 }}
          gl={{ antialias: true }}
          onCreated={({ gl }) => {
            gl.xr.enabled = true
          }}
        >
          <Suspense fallback={null}>
            <WebXRManager onXRStateChange={handleXRStateChange} />
            <Scene />
            <OrbitControls
              enableDamping
              dampingFactor={0.05}
              minDistance={2}
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
          🥽 WebXR 体验
        </InfoTitle>
        
        <InfoDescription>
          WebXR是Web平台上的虚拟现实(VR)和增强现实(AR)标准，让用户可以直接在浏览器中体验沉浸式内容，无需安装额外应用。
        </InfoDescription>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem' }}>设备支持状态</h3>
        
        <StatusIndicator status={xrState.xrSupported.vr ? 'supported' : 'not-supported'}>
          <div className="status-dot"></div>
          <span>VR支持: {xrState.xrSupported.vr ? '已支持' : '不支持'}</span>
        </StatusIndicator>
        
        <StatusIndicator status={xrState.xrSupported.ar ? 'supported' : 'not-supported'}>
          <div className="status-dot"></div>
          <span>AR支持: {xrState.xrSupported.ar ? '已支持' : '不支持'}</span>
        </StatusIndicator>
        
        <StatusIndicator status={xrState.xrSession ? 'supported' : 'unknown'}>
          <div className="status-dot"></div>
          <span>XR会话: {xrState.xrSession ? '活跃' : '未启动'}</span>
        </StatusIndicator>
        
        <div style={{ marginTop: '1rem' }}>
          {!xrState.xrSession ? (
            <>
              <XRButton 
                onClick={xrState.startVRSession}
                disabled={!xrState.xrSupported.vr}
              >
                启动VR模式
              </XRButton>
              <XRButton 
                onClick={xrState.startARSession}
                disabled={!xrState.xrSupported.ar}
              >
                启动AR模式
              </XRButton>
            </>
          ) : (
            <XRButton onClick={xrState.endSession}>
              退出XR模式
            </XRButton>
          )}
        </div>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem', marginTop: '2rem' }}>核心特性</h3>
        <TechList>
          <li><code>沉浸式体验</code> - 360度虚拟环境</li>
          <li><code>空间追踪</code> - 6DOF头部和手部追踪</li>
          <li><code>立体渲染</code> - 双眼视差效果</li>
          <li><code>手势识别</code> - 自然手部交互</li>
          <li><code>控制器支持</code> - VR控制器输入</li>
        </TechList>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem', marginTop: '2rem' }}>交互方式</h3>
        <TechList>
          <li><code>凝视选择</code> - 通过视线方向选择对象</li>
          <li><code>手势控制</code> - 手部动作识别</li>
          <li><code>控制器</code> - VR控制器按键和触摸</li>
          <li><code>语音命令</code> - 语音识别控制</li>
        </TechList>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem', marginTop: '2rem' }}>AR功能</h3>
        <TechList>
          <li><code>平面检测</code> - 识别现实世界表面</li>
          <li><code>光照估计</code> - 匹配真实环境光照</li>
          <li><code>遮挡处理</code> - 虚拟对象被真实物体遮挡</li>
          <li><code>锚点系统</code> - 虚拟内容固定在空间位置</li>
        </TechList>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem', marginTop: '2rem' }}>性能优化</h3>
        <InfoDescription>
          • 保持90fps的高帧率<br/>
          • 减少延迟防止晕动症<br/>
          • 优化渲染管线<br/>
          • 使用LOD和剔除技术<br/>
          • 合理分配GPU资源
        </InfoDescription>
        
        <CodeSection>
          <summary>🔍 查看核心代码</summary>
          <pre>{`// WebXR会话管理
class WebXRManager {
  async startVRSession() {
    if (!navigator.xr) {
      throw new Error('WebXR not supported')
    }
    
    const session = await navigator.xr.requestSession('immersive-vr', {
      requiredFeatures: ['local-floor'],
      optionalFeatures: ['hand-tracking', 'eye-tracking']
    })
    
    // 设置渲染器
    await renderer.xr.setSession(session)
    
    // 监听会话事件
    session.addEventListener('end', this.onSessionEnd)
    session.addEventListener('inputsourceschange', this.onInputChange)
    
    return session
  }
  
  async startARSession() {
    const session = await navigator.xr.requestSession('immersive-ar', {
      requiredFeatures: ['local-floor'],
      optionalFeatures: ['hit-test', 'dom-overlay', 'light-estimation']
    })
    
    await renderer.xr.setSession(session)
    return session
  }
}

// XR控制器处理
function handleXRControllers(session) {
  const controllers = []
  
  for (let i = 0; i < 2; i++) {
    const controller = renderer.xr.getController(i)
    
    controller.addEventListener('selectstart', (event) => {
      console.log('Controller select start', i)
    })
    
    controller.addEventListener('selectend', (event) => {
      console.log('Controller select end', i)
    })
    
    scene.add(controller)
    controllers.push(controller)
  }
  
  return controllers
}

// 手部追踪
function setupHandTracking(session) {
  const hand1 = renderer.xr.getHand(0)
  const hand2 = renderer.xr.getHand(1)
  
  hand1.addEventListener('pinchstart', (event) => {
    console.log('Pinch start on hand 0')
  })
  
  hand1.addEventListener('pinchend', (event) => {
    console.log('Pinch end on hand 0')
  })
  
  scene.add(hand1)
  scene.add(hand2)
}

// AR平面检测
async function setupARPlaneDetection(session) {
  const referenceSpace = await session.requestReferenceSpace('local-floor')
  
  session.requestAnimationFrame(function onXRFrame(time, frame) {
    const pose = frame.getViewerPose(referenceSpace)
    
    if (pose) {
      // 检测平面
      const hitTestResults = frame.getHitTestResults(hitTestSource)
      
      if (hitTestResults.length > 0) {
        const hit = hitTestResults[0]
        const hitPose = hit.getPose(referenceSpace)
        
        // 在检测到的平面上放置虚拟对象
        placeVirtualObject(hitPose.transform.matrix)
      }
    }
    
    session.requestAnimationFrame(onXRFrame)
  })
}

// 渲染循环
function animate() {
  renderer.setAnimationLoop((time, frame) => {
    if (frame) {
      // XR渲染
      const referenceSpace = renderer.xr.getReferenceSpace()
      const pose = frame.getViewerPose(referenceSpace)
      
      if (pose) {
        // 更新相机位置
        const views = pose.views
        
        for (const view of views) {
          const viewport = session.renderState.baseLayer.getViewport(view)
          renderer.setViewport(viewport.x, viewport.y, viewport.width, viewport.height)
          
          camera.matrix.fromArray(view.transform.inverse.matrix)
          camera.projectionMatrix.fromArray(view.projectionMatrix)
          camera.updateMatrixWorld(true)
          
          renderer.render(scene, camera)
        }
      }
    } else {
      // 普通渲染
      renderer.render(scene, camera)
    }
  })
}`}</pre>
        </CodeSection>
      </InfoPanel>
    </PageContainer>
  )
}

export default WebXRExperience