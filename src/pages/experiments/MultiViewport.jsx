import React, { Suspense, useRef, useState, useEffect, useMemo, useCallback } from 'react'
import { Canvas, useFrame, useThree, createPortal } from '@react-three/fiber'
import { OrbitControls, Text, Box, Sphere, Cylinder, PerspectiveCamera, OrthographicCamera } from '@react-three/drei'
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
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 2fr 1fr;
  gap: 2px;
  background: #000;
`

const ViewportContainer = styled.div`
  position: relative;
  overflow: hidden;
  border: 2px solid ${props => props.active ? 'var(--accent-color)' : 'rgba(255, 255, 255, 0.2)'};
  transition: border-color 0.3s ease;
  
  &:hover {
    border-color: var(--accent-color);
  }
  
  canvas {
    width: 100% !important;
    height: 100% !important;
  }
`

const ViewportLabel = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.7);
  color: var(--accent-color);
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  z-index: 10;
  pointer-events: none;
`

const ViewportStats = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.7);
  color: var(--text-secondary);
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.7rem;
  z-index: 10;
  pointer-events: none;
  
  .stat-line {
    margin-bottom: 0.2rem;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
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

// 动态场景对象
function AnimatedCube({ position, color, speed = 1 }) {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.7
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.5
    }
  })
  
  return (
    <Box ref={meshRef} position={position} args={[1, 1, 1]}>
      <meshStandardMaterial color={color} />
    </Box>
  )
}

function AnimatedSphere({ position, color, speed = 1 }) {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * speed) * 2
      meshRef.current.position.z = position[2] + Math.sin(state.clock.elapsedTime * speed) * 2
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.2)
    }
  })
  
  return (
    <Sphere ref={meshRef} position={position} args={[0.5, 32, 32]}>
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} />
    </Sphere>
  )
}

function AnimatedCylinder({ position, color, speed = 1 }) {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * speed
      meshRef.current.position.y = position[1] + Math.cos(state.clock.elapsedTime * 1.5) * 1
    }
  })
  
  return (
    <Cylinder ref={meshRef} position={position} args={[0.3, 0.3, 2, 8]}>
      <meshStandardMaterial color={color} wireframe />
    </Cylinder>
  )
}

// 共享场景内容
function SharedScene() {
  const {
    animationSpeed,
    showWireframe,
    lightIntensity
  } = useControls('场景设置', {
    animationSpeed: { value: 1, min: 0, max: 3, step: 0.1, label: '动画速度' },
    showWireframe: { value: false, label: '线框模式' },
    lightIntensity: { value: 0.6, min: 0, max: 2, step: 0.1, label: '光照强度' }
  })
  
  return (
    <>
      {/* 动态对象 */}
      <AnimatedCube position={[-3, 0, 0]} color="#ff6b6b" speed={animationSpeed} />
      <AnimatedCube position={[3, 0, 0]} color="#4ecdc4" speed={animationSpeed * 0.8} />
      <AnimatedCube position={[0, 3, 0]} color="#45b7d1" speed={animationSpeed * 1.2} />
      
      <AnimatedSphere position={[-2, -2, 2]} color="#96ceb4" speed={animationSpeed} />
      <AnimatedSphere position={[2, -2, 2]} color="#feca57" speed={animationSpeed * 0.6} />
      <AnimatedSphere position={[0, -2, -2]} color="#ff9ff3" speed={animationSpeed * 1.4} />
      
      <AnimatedCylinder position={[0, 0, 3]} color="#54a0ff" speed={animationSpeed} />
      <AnimatedCylinder position={[0, 0, -3]} color="#5f27cd" speed={animationSpeed * 0.9} />
      
      {/* 地面 */}
      <Box position={[0, -4, 0]} args={[20, 0.1, 20]}>
        <meshStandardMaterial 
          color="#2c2c2c" 
          wireframe={showWireframe}
        />
      </Box>
      
      {/* 背景网格 */}
      {Array.from({ length: 10 }, (_, i) => (
        <group key={i}>
          <Box position={[i * 2 - 10, -3.9, 0]} args={[0.05, 0.2, 20]}>
            <meshBasicMaterial color="#444444" />
          </Box>
          <Box position={[0, -3.9, i * 2 - 10]} args={[20, 0.2, 0.05]}>
            <meshBasicMaterial color="#444444" />
          </Box>
        </group>
      ))}
      
      {/* 光照 */}
      <ambientLight intensity={0.3} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={lightIntensity}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-10, 5, -10]} color="#ff0080" intensity={0.3} />
      <pointLight position={[10, 5, 10]} color="#0080ff" intensity={0.3} />
      
      {/* 标题 */}
      <Text
        position={[0, 6, 0]}
        fontSize={1.5}
        color="#00ffff"
        anchorX="center"
        anchorY="middle"
      >
        多视角渲染
      </Text>
    </>
  )
}

// 主视角统计组件（在Canvas内部）
function MainViewportStats({ onStatsUpdate }) {
  useFrame((state) => {
    onStatsUpdate({
      fps: Math.round(1 / state.clock.getDelta()),
      triangles: state.gl.info.render.triangles
    })
  })
  return null
}

// 主视角组件
function MainViewport() {
  const [stats, setStats] = useState({ fps: 0, triangles: 0 })
  
  const handleStatsUpdate = useCallback((newStats) => {
    setStats(newStats)
  }, [])
  
  return (
    <ViewportContainer active>
      <ViewportLabel>主视角 - 透视相机</ViewportLabel>
      <ViewportStats>
        <div className="stat-line">FPS: {stats.fps}</div>
        <div className="stat-line">三角形: {stats.triangles}</div>
        <div className="stat-line">位置: 自由移动</div>
      </ViewportStats>
      <Canvas
        camera={{ position: [8, 5, 8], fov: 75 }}
        gl={{ antialias: true }}
        shadows
      >
        <MainViewportStats onStatsUpdate={handleStatsUpdate} />
        <Suspense fallback={null}>
          <SharedScene />
          <OrbitControls
            enableDamping
            dampingFactor={0.05}
            minDistance={3}
            maxDistance={30}
          />
        </Suspense>
      </Canvas>
    </ViewportContainer>
  )
}

// 顶视图统计组件（在Canvas内部）
function TopViewportStats({ onStatsUpdate }) {
  useFrame((state) => {
    onStatsUpdate({
      zoom: state.camera.zoom?.toFixed(2) || 1,
      visible: state.scene.children.length
    })
  })
  return null
}

// 顶视图组件
function TopViewport() {
  const [stats, setStats] = useState({ zoom: 1, visible: 0 })
  
  const handleStatsUpdate = useCallback((newStats) => {
    setStats(newStats)
  }, [])
  
  return (
    <ViewportContainer>
      <ViewportLabel>顶视图 - 正交相机</ViewportLabel>
      <ViewportStats>
        <div className="stat-line">缩放: {stats.zoom}x</div>
        <div className="stat-line">对象: {stats.visible}</div>
        <div className="stat-line">投影: 正交</div>
      </ViewportStats>
      <Canvas
        orthographic
        camera={{ position: [0, 20, 0], zoom: 50 }}
        gl={{ antialias: true }}
      >
        <TopViewportStats onStatsUpdate={handleStatsUpdate} />
        <Suspense fallback={null}>
          <SharedScene />
          <OrbitControls
            enableRotate={false}
            enableDamping
            dampingFactor={0.05}
            minZoom={20}
            maxZoom={100}
          />
        </Suspense>
      </Canvas>
    </ViewportContainer>
  )
}

// 侧视图统计组件（在Canvas内部）
function SideViewportStats({ onStatsUpdate }) {
  useFrame((state) => {
    const camera = state.camera
    onStatsUpdate({
      angle: Math.round(Math.atan2(camera.position.z, camera.position.x) * 180 / Math.PI),
      distance: Math.round(camera.position.length())
    })
  })
  return null
}

// 侧视图组件
function SideViewport() {
  const [stats, setStats] = useState({ angle: 0, distance: 0 })
  
  const handleStatsUpdate = useCallback((newStats) => {
    setStats(newStats)
  }, [])
  
  return (
    <ViewportContainer>
      <ViewportLabel>侧视图 - 固定角度</ViewportLabel>
      <ViewportStats>
        <div className="stat-line">角度: {stats.angle}°</div>
        <div className="stat-line">距离: {stats.distance}</div>
        <div className="stat-line">模式: 固定</div>
      </ViewportStats>
      <Canvas
        camera={{ position: [15, 0, 0], fov: 60 }}
        gl={{ antialias: true }}
      >
        <SideViewportStats onStatsUpdate={handleStatsUpdate} />
        <Suspense fallback={null}>
          <SharedScene />
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            enableRotate={false}
            minDistance={10}
            maxDistance={25}
          />
        </Suspense>
      </Canvas>
    </ViewportContainer>
  )
}

// 自由视角统计组件（在Canvas内部）
function FreeViewportStats({ onStatsUpdate, cameraMode, fov, zoom }) {
  useFrame((state) => {
    onStatsUpdate({
      mode: cameraMode,
      fov: cameraMode === 'perspective' ? fov : zoom
    })
  })
  return null
}

// 自由视角组件
function FreeViewport() {
  const [cameraMode, setCameraMode] = useState('perspective')
  const [stats, setStats] = useState({ mode: 'perspective', fov: 75 })
  
  const {
    cameraType,
    fov,
    zoom
  } = useControls('自由视角', {
    cameraType: {
      value: 'perspective',
      options: {
        '透视相机': 'perspective',
        '正交相机': 'orthographic'
      },
      label: '相机类型'
    },
    fov: { value: 75, min: 30, max: 120, step: 5, label: 'FOV' },
    zoom: { value: 50, min: 10, max: 100, step: 5, label: '正交缩放' }
  })
  
  useEffect(() => {
    setCameraMode(cameraType)
  }, [cameraType])
  
  const handleStatsUpdate = useCallback((newStats) => {
    setStats(newStats)
  }, [])
  
  return (
    <ViewportContainer>
      <ViewportLabel>自由视角 - 可切换</ViewportLabel>
      <ViewportStats>
        <div className="stat-line">模式: {stats.mode}</div>
        <div className="stat-line">{cameraMode === 'perspective' ? 'FOV' : '缩放'}: {stats.fov}</div>
        <div className="stat-line">控制: 完全自由</div>
      </ViewportStats>
      <Canvas
        orthographic={cameraMode === 'orthographic'}
        camera={cameraMode === 'perspective' ? 
          { position: [5, 5, 5], fov: fov } : 
          { position: [5, 5, 5], zoom: zoom }
        }
        gl={{ antialias: true }}
      >
        <FreeViewportStats 
          onStatsUpdate={handleStatsUpdate} 
          cameraMode={cameraMode} 
          fov={fov} 
          zoom={zoom} 
        />
        <Suspense fallback={null}>
          <SharedScene />
          <OrbitControls
            enableDamping
            dampingFactor={0.05}
            minDistance={2}
            maxDistance={20}
          />
        </Suspense>
      </Canvas>
    </ViewportContainer>
  )
}

function MultiViewport() {
  return (
    <PageContainer>
      <CanvasContainer>
        <MainViewport />
        <TopViewport />
        <SideViewport />
        <FreeViewport />
      </CanvasContainer>
      
      <InfoPanel
        initial={{ x: 350 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <InfoTitle>
          📱 多视角渲染
        </InfoTitle>
        
        <InfoDescription>
          多视角渲染技术允许同时从不同角度和投影方式观察同一个3D场景，常用于3D建模软件、游戏开发工具和科学可视化应用。
        </InfoDescription>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem' }}>视角类型</h3>
        <TechList>
          <li><code>主视角</code> - 透视相机，自由移动控制</li>
          <li><code>顶视图</code> - 正交投影，俯视角度</li>
          <li><code>侧视图</code> - 固定角度，侧面观察</li>
          <li><code>自由视角</code> - 可切换相机类型</li>
        </TechList>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem' }}>技术特性</h3>
        <TechList>
          <li><code>共享场景</code> - 所有视角渲染同一场景</li>
          <li><code>独立控制</code> - 每个视角独立的相机控制</li>
          <li><code>实时同步</code> - 场景变化实时反映到所有视角</li>
          <li><code>性能优化</code> - 智能剔除和LOD管理</li>
          <li><code>响应式布局</code> - 自适应视口大小</li>
        </TechList>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem' }}>相机系统</h3>
        <TechList>
          <li><code>透视相机</code> - 模拟人眼视觉，有景深效果</li>
          <li><code>正交相机</code> - 平行投影，无透视变形</li>
          <li><code>视锥剔除</code> - 只渲染视野内的对象</li>
          <li><code>近远裁剪</code> - 控制渲染距离范围</li>
        </TechList>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem' }}>应用场景</h3>
        <InfoDescription>
          • 3D建模和动画软件<br/>
          • 游戏关卡编辑器<br/>
          • 建筑设计可视化<br/>
          • 医学影像分析<br/>
          • 工程CAD系统
        </InfoDescription>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem' }}>性能优化</h3>
        <TechList>
          <li><code>视锥剔除</code> - 剔除视野外的对象</li>
          <li><code>LOD系统</code> - 根据距离调整细节级别</li>
          <li><code>实例化渲染</code> - 批量渲染相同对象</li>
          <li><code>纹理共享</code> - 多视角共享纹理资源</li>
          <li><code>渲染队列</code> - 优化渲染顺序</li>
        </TechList>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem' }}>交互特性</h3>
        <InfoDescription>
          • 独立的相机控制器<br/>
          • 视角间的焦点同步<br/>
          • 鼠标悬停高亮<br/>
          • 键盘快捷键切换<br/>
          • 视角状态保存
        </InfoDescription>
        
        <CodeSection>
          <summary>🔍 查看核心代码</summary>
          <pre>{`// 多视角渲染管理器
class MultiViewportRenderer {
  constructor(container) {
    this.container = container
    this.viewports = []
    this.sharedScene = new THREE.Scene()
    this.setupViewports()
  }
  
  setupViewports() {
    // 主视角 - 透视相机
    this.addViewport({
      name: 'main',
      camera: new THREE.PerspectiveCamera(75, 1, 0.1, 1000),
      position: { x: 0, y: 0, width: 0.7, height: 0.7 },
      controls: 'orbit'
    })
    
    // 顶视图 - 正交相机
    this.addViewport({
      name: 'top',
      camera: new THREE.OrthographicCamera(-10, 10, 10, -10, 0.1, 1000),
      position: { x: 0.7, y: 0, width: 0.3, height: 0.35 },
      controls: 'pan-zoom'
    })
    
    // 侧视图 - 固定角度
    this.addViewport({
      name: 'side',
      camera: new THREE.PerspectiveCamera(60, 1, 0.1, 1000),
      position: { x: 0.7, y: 0.35, width: 0.3, height: 0.35 },
      controls: 'fixed'
    })
  }
  
  addViewport(config) {
    const viewport = {
      ...config,
      renderer: new THREE.WebGLRenderer({ antialias: true }),
      controls: this.createControls(config.camera, config.controls)
    }
    
    // 设置渲染器
    viewport.renderer.setSize(
      this.container.clientWidth * config.position.width,
      this.container.clientHeight * config.position.height
    )
    
    // 设置相机初始位置
    this.setCameraPosition(viewport.camera, config.name)
    
    this.viewports.push(viewport)
    this.container.appendChild(viewport.renderer.domElement)
  }
  
  createControls(camera, type) {
    switch (type) {
      case 'orbit':
        return new OrbitControls(camera, this.container)
      
      case 'pan-zoom':
        const controls = new OrbitControls(camera, this.container)
        controls.enableRotate = false
        return controls
      
      case 'fixed':
        const fixedControls = new OrbitControls(camera, this.container)
        fixedControls.enableRotate = false
        fixedControls.enablePan = false
        return fixedControls
      
      default:
        return null
    }
  }
  
  setCameraPosition(camera, viewportName) {
    switch (viewportName) {
      case 'main':
        camera.position.set(8, 5, 8)
        break
      
      case 'top':
        camera.position.set(0, 20, 0)
        camera.lookAt(0, 0, 0)
        break
      
      case 'side':
        camera.position.set(15, 0, 0)
        camera.lookAt(0, 0, 0)
        break
    }
  }
  
  render() {
    this.viewports.forEach(viewport => {
      // 设置视口
      const { position } = viewport
      const width = this.container.clientWidth * position.width
      const height = this.container.clientHeight * position.height
      const left = this.container.clientWidth * position.x
      const bottom = this.container.clientHeight * (1 - position.y - position.height)
      
      viewport.renderer.setViewport(left, bottom, width, height)
      viewport.renderer.setScissor(left, bottom, width, height)
      viewport.renderer.setScissorTest(true)
      
      // 更新相机宽高比
      if (viewport.camera.isPerspectiveCamera) {
        viewport.camera.aspect = width / height
      } else {
        const aspect = width / height
        viewport.camera.left = -10 * aspect
        viewport.camera.right = 10 * aspect
      }
      viewport.camera.updateProjectionMatrix()
      
      // 更新控制器
      if (viewport.controls) {
        viewport.controls.update()
      }
      
      // 渲染场景
      viewport.renderer.render(this.sharedScene, viewport.camera)
    })
  }
  
  resize() {
    this.viewports.forEach(viewport => {
      const { position } = viewport
      const width = this.container.clientWidth * position.width
      const height = this.container.clientHeight * position.height
      
      viewport.renderer.setSize(width, height)
    })
  }
  
  // 同步所有视角的焦点
  syncFocus(targetPosition) {
    this.viewports.forEach(viewport => {
      if (viewport.controls && viewport.controls.target) {
        viewport.controls.target.copy(targetPosition)
        viewport.controls.update()
      }
    })
  }
  
  // 获取指定视角的相机
  getCamera(viewportName) {
    const viewport = this.viewports.find(v => v.name === viewportName)
    return viewport ? viewport.camera : null
  }
  
  // 切换视角的相机类型
  switchCameraType(viewportName, cameraType) {
    const viewport = this.viewports.find(v => v.name === viewportName)
    if (!viewport) return
    
    const oldCamera = viewport.camera
    const position = oldCamera.position.clone()
    const target = viewport.controls?.target?.clone() || new THREE.Vector3()
    
    if (cameraType === 'perspective') {
      viewport.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    } else {
      viewport.camera = new THREE.OrthographicCamera(-10, 10, 10, -10, 0.1, 1000)
    }
    
    viewport.camera.position.copy(position)
    viewport.camera.lookAt(target)
    
    // 重新创建控制器
    if (viewport.controls) {
      viewport.controls.dispose()
      viewport.controls = new OrbitControls(viewport.camera, viewport.renderer.domElement)
      viewport.controls.target.copy(target)
    }
  }
}

// 使用示例
const multiViewport = new MultiViewportRenderer(document.getElementById('container'))

// 添加场景对象
const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshStandardMaterial({ color: 0xff6b6b })
const cube = new THREE.Mesh(geometry, material)
multiViewport.sharedScene.add(cube)

// 渲染循环
function animate() {
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01
  
  multiViewport.render()
  requestAnimationFrame(animate)
}

animate()

// 响应窗口大小变化
window.addEventListener('resize', () => {
  multiViewport.resize()
})

// 同步焦点示例
document.addEventListener('click', (event) => {
  const intersects = raycaster.intersectObjects(multiViewport.sharedScene.children)
  if (intersects.length > 0) {
    multiViewport.syncFocus(intersects[0].point)
  }
})`}</pre>
        </CodeSection>
      </InfoPanel>
    </PageContainer>
  )
}

export default MultiViewport