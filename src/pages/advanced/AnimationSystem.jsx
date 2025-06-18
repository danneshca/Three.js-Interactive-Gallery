import React, { Suspense, useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, useAnimations } from '@react-three/drei'
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

// Animated Robot with skeletal animation
function AnimatedRobot({ animationType, animationSpeed }) {
  const groupRef = useRef()
  const mixerRef = useRef()
  
  // Create a simple robot geometry with bones
  const robotGeometry = useMemo(() => {
    const group = new THREE.Group()
    
    // Body
    const bodyGeometry = new THREE.BoxGeometry(1, 1.5, 0.5)
    const bodyMaterial = new THREE.MeshStandardMaterial({ color: '#4a90e2' })
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
    body.position.y = 0
    group.add(body)
    
    // Head
    const headGeometry = new THREE.BoxGeometry(0.8, 0.8, 0.8)
    const headMaterial = new THREE.MeshStandardMaterial({ color: '#5ba3f5' })
    const head = new THREE.Mesh(headGeometry, headMaterial)
    head.position.y = 1.15
    group.add(head)
    
    // Arms
    const armGeometry = new THREE.BoxGeometry(0.3, 1, 0.3)
    const armMaterial = new THREE.MeshStandardMaterial({ color: '#357abd' })
    
    const leftArm = new THREE.Mesh(armGeometry, armMaterial)
    leftArm.position.set(-0.8, 0.25, 0)
    leftArm.name = 'leftArm'
    group.add(leftArm)
    
    const rightArm = new THREE.Mesh(armGeometry, armMaterial)
    rightArm.position.set(0.8, 0.25, 0)
    rightArm.name = 'rightArm'
    group.add(rightArm)
    
    // Legs
    const legGeometry = new THREE.BoxGeometry(0.4, 1.2, 0.4)
    const legMaterial = new THREE.MeshStandardMaterial({ color: '#2c5aa0' })
    
    const leftLeg = new THREE.Mesh(legGeometry, legMaterial)
    leftLeg.position.set(-0.3, -1.35, 0)
    leftLeg.name = 'leftLeg'
    group.add(leftLeg)
    
    const rightLeg = new THREE.Mesh(legGeometry, legMaterial)
    rightLeg.position.set(0.3, -1.35, 0)
    rightLeg.name = 'rightLeg'
    group.add(rightLeg)
    
    return group
  }, [])
  
  // Create animations
  const animations = useMemo(() => {
    const clips = []
    
    // Walking animation
    const walkingClip = new THREE.AnimationClip('walking', 2, [
      // Left arm swing
      new THREE.VectorKeyframeTrack(
        'leftArm.rotation[x]',
        [0, 0.5, 1, 1.5, 2],
        [0, Math.PI / 4, 0, -Math.PI / 4, 0]
      ),
      // Right arm swing
      new THREE.VectorKeyframeTrack(
        'rightArm.rotation[x]',
        [0, 0.5, 1, 1.5, 2],
        [0, -Math.PI / 4, 0, Math.PI / 4, 0]
      ),
      // Left leg movement
      new THREE.VectorKeyframeTrack(
        'leftLeg.rotation[x]',
        [0, 0.5, 1, 1.5, 2],
        [0, -Math.PI / 6, 0, Math.PI / 6, 0]
      ),
      // Right leg movement
      new THREE.VectorKeyframeTrack(
        'rightLeg.rotation[x]',
        [0, 0.5, 1, 1.5, 2],
        [0, Math.PI / 6, 0, -Math.PI / 6, 0]
      )
    ])
    
    // Waving animation
    const wavingClip = new THREE.AnimationClip('waving', 1, [
      new THREE.VectorKeyframeTrack(
        'rightArm.rotation[z]',
        [0, 0.25, 0.5, 0.75, 1],
        [0, Math.PI / 3, Math.PI / 6, Math.PI / 3, 0]
      ),
      new THREE.VectorKeyframeTrack(
        'rightArm.rotation[x]',
        [0, 0.25, 0.5, 0.75, 1],
        [0, Math.PI / 6, 0, Math.PI / 6, 0]
      )
    ])
    
    // Dancing animation
    const dancingClip = new THREE.AnimationClip('dancing', 2, [
      // Body rotation
      new THREE.VectorKeyframeTrack(
        '.rotation[y]',
        [0, 0.5, 1, 1.5, 2],
        [0, Math.PI / 4, 0, -Math.PI / 4, 0]
      ),
      // Arms up and down
      new THREE.VectorKeyframeTrack(
        'leftArm.rotation[z]',
        [0, 0.5, 1, 1.5, 2],
        [0, Math.PI / 2, 0, Math.PI / 2, 0]
      ),
      new THREE.VectorKeyframeTrack(
        'rightArm.rotation[z]',
        [0, 0.5, 1, 1.5, 2],
        [0, -Math.PI / 2, 0, -Math.PI / 2, 0]
      )
    ])
    
    clips.push(walkingClip, wavingClip, dancingClip)
    return clips
  }, [])
  
  useEffect(() => {
    if (groupRef.current) {
      mixerRef.current = new THREE.AnimationMixer(groupRef.current)
      
      // Add all animations to the mixer
      animations.forEach(clip => {
        const action = mixerRef.current.clipAction(clip)
        if (clip.name === animationType) {
          action.play()
        }
      })
    }
    
    return () => {
      if (mixerRef.current) {
        mixerRef.current.stopAllAction()
      }
    }
  }, [animations, animationType])
  
  useFrame((state, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta * animationSpeed)
    }
  })
  
  return (
    <group ref={groupRef}>
      <primitive object={robotGeometry} />
    </group>
  )
}

// Path animation component
function PathAnimation({ pathType, animationSpeed }) {
  const sphereRef = useRef()
  const pathRef = useRef()
  
  const { curve, pathPoints } = useMemo(() => {
    let curve
    
    switch (pathType) {
      case 'circle':
        curve = new THREE.EllipseCurve(
          0, 0,
          3, 3,
          0, 2 * Math.PI,
          false,
          0
        )
        break
      case 'figure8':
        const points = []
        for (let i = 0; i <= 100; i++) {
          const t = (i / 100) * Math.PI * 2
          const x = 3 * Math.sin(t)
          const y = 1.5 * Math.sin(2 * t)
          const z = 0
          points.push(new THREE.Vector3(x, y, z))
        }
        curve = new THREE.CatmullRomCurve3(points, true)
        break
      case 'spiral':
        const spiralPoints = []
        for (let i = 0; i <= 200; i++) {
          const t = (i / 200) * Math.PI * 4
          const radius = 3 - (i / 200) * 2
          const x = radius * Math.cos(t)
          const y = (i / 200) * 4 - 2
          const z = radius * Math.sin(t)
          spiralPoints.push(new THREE.Vector3(x, y, z))
        }
        curve = new THREE.CatmullRomCurve3(spiralPoints, false)
        break
      default:
        curve = new THREE.EllipseCurve(0, 0, 3, 3, 0, 2 * Math.PI, false, 0)
    }
    
    const pathPoints = curve.getPoints(200)
    return { curve, pathPoints }
  }, [pathType])
  
  useFrame((state) => {
    if (sphereRef.current && curve) {
      const time = (state.clock.elapsedTime * animationSpeed * 0.1) % 1
      
      if (pathType === 'circle') {
        const point = curve.getPoint(time)
        sphereRef.current.position.set(point.x, 2, point.y)
      } else {
        const point = curve.getPoint(time)
        sphereRef.current.position.copy(point)
        
        // Look ahead for orientation
        const lookAheadTime = (time + 0.01) % 1
        const lookAheadPoint = curve.getPoint(lookAheadTime)
        sphereRef.current.lookAt(lookAheadPoint)
      }
    }
  })
  
  return (
    <group>
      {/* Moving sphere */}
      <mesh ref={sphereRef}>
        <sphereGeometry args={[0.2]} />
        <meshStandardMaterial color="#ff6b6b" emissive="#ff6b6b" emissiveIntensity={0.2} />
      </mesh>
      
      {/* Path visualization */}
      <line ref={pathRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={pathPoints.length}
            array={new Float32Array(pathPoints.flatMap(p => pathType === 'circle' ? [p.x, 2, p.y] : [p.x, p.y, p.z]))}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#00ffff" transparent opacity={0.5} />
      </line>
    </group>
  )
}

function Scene() {
  const {
    showRobot,
    robotAnimation,
    showPath,
    pathType,
    animationSpeed
  } = useControls('动画控制', {
    showRobot: { value: true, label: '显示机器人' },
    robotAnimation: {
      value: 'walking',
      options: {
        '行走': 'walking',
        '挥手': 'waving',
        '跳舞': 'dancing'
      },
      label: '机器人动画'
    },
    showPath: { value: true, label: '显示路径动画' },
    pathType: {
      value: 'circle',
      options: {
        '圆形': 'circle',
        '8字形': 'figure8',
        '螺旋': 'spiral'
      },
      label: '路径类型'
    },
    animationSpeed: { value: 1, min: 0.1, max: 3, step: 0.1, label: '动画速度' }
  })
  
  return (
    <>
      {/* Ground */}
      <mesh position={[0, -2.5, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#2c3e50" />
      </mesh>
      
      {/* Robot */}
      {showRobot && (
        <group position={[-3, 0, 0]}>
          <AnimatedRobot 
            animationType={robotAnimation} 
            animationSpeed={animationSpeed}
          />
        </group>
      )}
      
      {/* Path Animation */}
      {showPath && (
        <group position={[3, 0, 0]}>
          <PathAnimation 
            pathType={pathType} 
            animationSpeed={animationSpeed}
          />
        </group>
      )}
      
      {/* Title */}
      <Text
        position={[0, 6, 0]}
        fontSize={1}
        color="#00ffff"
        anchorX="center"
        anchorY="middle"
      >
        动画系统演示
      </Text>
      
      {/* Info text */}
      <Text
        position={[-3, 3, 0]}
        fontSize={0.3}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        骨骼动画: {{
          walking: '行走循环',
          waving: '挥手动作',
          dancing: '跳舞动作'
        }[robotAnimation]}
      </Text>
      
      <Text
        position={[3, 3, 0]}
        fontSize={0.3}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        路径动画: {{
          circle: '圆形轨道',
          figure8: '8字轨道',
          spiral: '螺旋轨道'
        }[pathType]}
      </Text>
    </>
  )
}

function AnimationSystem() {
  return (
    <PageContainer>
      <CanvasContainer>
        <Canvas
          camera={{ position: [0, 5, 10], fov: 75 }}
          shadows
          gl={{ antialias: true }}
        >
          <Suspense fallback={null}>
            <Scene />
            <ambientLight intensity={0.4} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={0.8}
              castShadow
              shadow-mapSize={[2048, 2048]}
            />
            <OrbitControls
              enableDamping
              dampingFactor={0.05}
              minDistance={5}
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
          🎬 动画系统
        </InfoTitle>
        
        <InfoDescription>
          Three.js 提供了强大的动画系统，支持骨骼动画、变形动画、路径动画等多种动画类型，可以创建复杂的动态效果。
        </InfoDescription>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem' }}>动画类型</h3>
        <TechList>
          <li><code>骨骼动画</code> - 基于骨骼系统的角色动画</li>
          <li><code>变形动画</code> - 顶点位置的直接变化</li>
          <li><code>路径动画</code> - 沿着曲线路径的运动</li>
          <li><code>属性动画</code> - 对象属性的插值变化</li>
        </TechList>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem', marginTop: '2rem' }}>核心组件</h3>
        <TechList>
          <li><code>AnimationMixer</code> - 动画混合器，管理多个动画</li>
          <li><code>AnimationClip</code> - 动画片段，包含关键帧数据</li>
          <li><code>AnimationAction</code> - 动画动作，控制播放状态</li>
          <li><code>KeyframeTrack</code> - 关键帧轨道，存储动画数据</li>
        </TechList>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem', marginTop: '2rem' }}>轨道类型</h3>
        <TechList>
          <li><code>VectorKeyframeTrack</code> - 向量关键帧（位置、旋转、缩放）</li>
          <li><code>QuaternionKeyframeTrack</code> - 四元数关键帧（旋转）</li>
          <li><code>NumberKeyframeTrack</code> - 数值关键帧（透明度等）</li>
          <li><code>ColorKeyframeTrack</code> - 颜色关键帧</li>
        </TechList>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem', marginTop: '2rem' }}>曲线系统</h3>
        <TechList>
          <li><code>CatmullRomCurve3</code> - 平滑的3D曲线</li>
          <li><code>CubicBezierCurve3</code> - 三次贝塞尔曲线</li>
          <li><code>EllipseCurve</code> - 椭圆曲线</li>
          <li><code>SplineCurve</code> - 样条曲线</li>
        </TechList>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem', marginTop: '2rem' }}>动画控制</h3>
        <InfoDescription>
          • 播放控制：play(), stop(), pause()<br/>
          • 混合权重：setEffectiveWeight()<br/>
          • 时间缩放：setEffectiveTimeScale()<br/>
          • 循环模式：setLoop()<br/>
          • 淡入淡出：fadeIn(), fadeOut(), crossFadeTo()
        </InfoDescription>
        
        <CodeSection>
          <summary>🔍 查看核心代码</summary>
          <pre>{`// 创建动画混合器
const mixer = new THREE.AnimationMixer(model)

// 创建动画片段
const walkClip = new THREE.AnimationClip('walk', 2, [
  // 位置轨道
  new THREE.VectorKeyframeTrack(
    'bone.position',
    [0, 0.5, 1, 1.5, 2],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0]
  ),
  // 旋转轨道
  new THREE.QuaternionKeyframeTrack(
    'bone.quaternion',
    [0, 1, 2],
    [0, 0, 0, 1, 0, 0, 0.7071, 0.7071, 0, 0, 0, 1]
  )
])

// 创建动画动作
const walkAction = mixer.clipAction(walkClip)
walkAction.play()

// 路径动画
const curve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(-5, 0, 0),
  new THREE.Vector3(0, 3, 0),
  new THREE.Vector3(5, 0, 0),
  new THREE.Vector3(0, -3, 0)
], true)

// 沿路径移动
function animateAlongPath(t) {
  const point = curve.getPoint(t % 1)
  object.position.copy(point)
  
  // 计算朝向
  const tangent = curve.getTangent(t % 1)
  object.lookAt(object.position.clone().add(tangent))
}

// 动画循环
function animate() {
  const delta = clock.getDelta()
  mixer.update(delta)
  
  const time = clock.getElapsedTime()
  animateAlongPath(time * 0.1)
  
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}`}</pre>
        </CodeSection>
      </InfoPanel>
    </PageContainer>
  )
}

export default AnimationSystem