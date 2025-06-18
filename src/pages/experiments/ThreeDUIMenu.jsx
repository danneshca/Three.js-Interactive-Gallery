import React, { Suspense, useRef, useState, useEffect, useCallback } from 'react'
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber'
import { OrbitControls, Text, Box, Sphere, Plane, Html, useTexture } from '@react-three/drei'
import { useControls } from 'leva'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer'
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer'

// 扩展Three.js组件
extend({ CSS3DObject, CSS2DObject })

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

// 3D UI面板样式
const UIPanel = styled.div`
  background: linear-gradient(135deg, 
    rgba(0, 255, 255, 0.1) 0%, 
    rgba(255, 0, 255, 0.1) 100%);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 20px;
  width: 300px;
  color: white;
  font-family: 'Arial', sans-serif;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  
  .panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    
    h3 {
      margin: 0;
      color: #00ffff;
      font-size: 18px;
    }
    
    .close-btn {
      background: rgba(255, 0, 0, 0.3);
      border: 1px solid rgba(255, 0, 0, 0.5);
      border-radius: 50%;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #ff4444;
      font-size: 12px;
      transition: all 0.3s ease;
      
      &:hover {
        background: rgba(255, 0, 0, 0.5);
        transform: scale(1.1);
      }
    }
  }
  
  .panel-content {
    .menu-item {
      display: flex;
      align-items: center;
      padding: 10px;
      margin: 5px 0;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &:hover {
        background: rgba(0, 255, 255, 0.2);
        transform: translateX(5px);
      }
      
      .icon {
        margin-right: 10px;
        font-size: 16px;
      }
      
      .label {
        font-size: 14px;
      }
    }
    
    .slider-control {
      margin: 15px 0;
      
      label {
        display: block;
        margin-bottom: 5px;
        font-size: 12px;
        color: #cccccc;
      }
      
      input[type="range"] {
        width: 100%;
        height: 4px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 2px;
        outline: none;
        
        &::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          background: #00ffff;
          border-radius: 50%;
          cursor: pointer;
        }
      }
    }
    
    .color-picker {
      margin: 15px 0;
      
      label {
        display: block;
        margin-bottom: 5px;
        font-size: 12px;
        color: #cccccc;
      }
      
      .color-options {
        display: flex;
        gap: 8px;
        
        .color-option {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid transparent;
          transition: all 0.3s ease;
          
          &:hover {
            transform: scale(1.2);
          }
          
          &.selected {
            border-color: #00ffff;
            box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
          }
        }
      }
    }
  }
`

const CircularMenu = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  
  .center-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60px;
    height: 60px;
    background: linear-gradient(45deg, #00ffff, #ff00ff);
    border: none;
    border-radius: 50%;
    color: white;
    font-size: 24px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 20px rgba(0, 255, 255, 0.3);
    
    &:hover {
      transform: translate(-50%, -50%) scale(1.1);
      box-shadow: 0 6px 30px rgba(0, 255, 255, 0.5);
    }
  }
  
  .menu-items {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    
    .menu-item {
      position: absolute;
      width: 40px;
      height: 40px;
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
      color: white;
      font-size: 16px;
      
      &:hover {
        background: rgba(0, 255, 255, 0.3);
        transform: scale(1.2);
        box-shadow: 0 4px 15px rgba(0, 255, 255, 0.4);
      }
    }
  }
`

const TabMenu = styled.div`
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(15px);
  border-radius: 12px;
  overflow: hidden;
  width: 400px;
  
  .tab-headers {
    display: flex;
    background: rgba(255, 255, 255, 0.1);
    
    .tab-header {
      flex: 1;
      padding: 12px 20px;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s ease;
      color: #cccccc;
      border-bottom: 2px solid transparent;
      
      &:hover {
        background: rgba(255, 255, 255, 0.1);
        color: white;
      }
      
      &.active {
        background: rgba(0, 255, 255, 0.2);
        color: #00ffff;
        border-bottom-color: #00ffff;
      }
    }
  }
  
  .tab-content {
    padding: 20px;
    min-height: 200px;
    
    .content-section {
      margin-bottom: 15px;
      
      h4 {
        color: #00ffff;
        margin-bottom: 10px;
        font-size: 16px;
      }
      
      p {
        color: #cccccc;
        line-height: 1.5;
        margin-bottom: 10px;
      }
      
      .action-buttons {
        display: flex;
        gap: 10px;
        
        button {
          background: rgba(0, 255, 255, 0.2);
          border: 1px solid rgba(0, 255, 255, 0.5);
          color: #00ffff;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s ease;
          
          &:hover {
            background: rgba(0, 255, 255, 0.3);
            transform: translateY(-2px);
          }
        }
      }
    }
  }
`

// 3D UI面板组件
function ThreeDPanel({ position, rotation, title, children, onClose, visible = true }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (meshRef.current && visible) {
      // 轻微的浮动动画
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.05
      
      // 悬停时的缩放效果
      const targetScale = hovered ? 1.05 : 1
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }
  })
  
  if (!visible) return null
  
  return (
    <group
      ref={meshRef}
      position={position}
      rotation={rotation}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <Html
        transform
        occlude
        distanceFactor={10}
        position={[0, 0, 0.01]}
      >
        <UIPanel>
          <div className="panel-header">
            <h3>{title}</h3>
            {onClose && (
              <div className="close-btn" onClick={onClose}>
                ×
              </div>
            )}
          </div>
          <div className="panel-content">
            {children}
          </div>
        </UIPanel>
      </Html>
      
      {/* 背景面板 */}
      <Plane args={[3.5, 2.5]}>
        <meshBasicMaterial 
          color={hovered ? '#001122' : '#000011'} 
          transparent 
          opacity={0.1}
        />
      </Plane>
    </group>
  )
}

// 圆形菜单组件
function CircularMenuComponent({ position, items, onItemClick }) {
  const groupRef = useRef()
  const [expanded, setExpanded] = useState(false)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.2
    }
  })
  
  const toggleMenu = () => {
    setExpanded(!expanded)
  }
  
  return (
    <group ref={groupRef} position={position}>
      <Html transform distanceFactor={8}>
        <CircularMenu>
          <button className="center-button" onClick={toggleMenu}>
            {expanded ? '×' : '☰'}
          </button>
          
          {expanded && (
            <div className="menu-items">
              {items.map((item, index) => {
                const angle = (index / items.length) * Math.PI * 2
                const radius = 80
                const x = Math.cos(angle) * radius
                const y = Math.sin(angle) * radius
                
                return (
                  <div
                    key={index}
                    className="menu-item"
                    style={{
                      left: `calc(50% + ${x}px - 20px)`,
                      top: `calc(50% + ${y}px - 20px)`
                    }}
                    onClick={() => onItemClick(item)}
                  >
                    {item.icon}
                  </div>
                )
              })}
            </div>
          )}
        </CircularMenu>
      </Html>
    </group>
  )
}

// 标签菜单组件
function TabMenuComponent({ position, tabs, activeTab, onTabChange }) {
  return (
    <group position={position}>
      <Html transform distanceFactor={12}>
        <TabMenu>
          <div className="tab-headers">
            {tabs.map((tab, index) => (
              <div
                key={index}
                className={`tab-header ${activeTab === index ? 'active' : ''}`}
                onClick={() => onTabChange(index)}
              >
                {tab.title}
              </div>
            ))}
          </div>
          
          <div className="tab-content">
            {tabs[activeTab] && tabs[activeTab].content}
          </div>
        </TabMenu>
      </Html>
    </group>
  )
}

// 3D按钮组件
function ThreeDButton({ position, text, color = '#00ffff', onClick }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  
  useFrame((state) => {
    if (meshRef.current) {
      const targetY = position[1] + (hovered ? 0.1 : 0) + (clicked ? -0.05 : 0)
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.1)
      
      const targetScale = hovered ? 1.1 : 1
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }
  })
  
  const handleClick = () => {
    setClicked(true)
    setTimeout(() => setClicked(false), 150)
    if (onClick) onClick()
  }
  
  return (
    <group
      ref={meshRef}
      position={position}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onClick={handleClick}
    >
      <Box args={[2, 0.5, 0.2]}>
        <meshStandardMaterial 
          color={hovered ? '#ffffff' : color}
          emissive={hovered ? color : '#000000'}
          emissiveIntensity={hovered ? 0.2 : 0}
        />
      </Box>
      
      <Text
        position={[0, 0, 0.11]}
        fontSize={0.2}
        color={hovered ? '#000000' : '#ffffff'}
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </group>
  )
}

// 主场景组件
function Scene() {
  const [panels, setPanels] = useState({
    settings: true,
    tools: true,
    info: false
  })
  
  const [activeTab, setActiveTab] = useState(0)
  const [selectedColor, setSelectedColor] = useState('#00ffff')
  const [sliderValue, setSliderValue] = useState(50)
  
  const {
    showPanels,
    showButtons,
    showCircularMenu,
    showTabMenu,
    panelDistance,
    animationSpeed
  } = useControls('3D UI 设置', {
    showPanels: { value: true, label: '显示面板' },
    showButtons: { value: true, label: '显示按钮' },
    showCircularMenu: { value: true, label: '显示圆形菜单' },
    showTabMenu: { value: true, label: '显示标签菜单' },
    panelDistance: { value: 5, min: 3, max: 10, step: 0.5, label: '面板距离' },
    animationSpeed: { value: 1, min: 0.1, max: 3, step: 0.1, label: '动画速度' }
  })
  
  // 圆形菜单项
  const circularMenuItems = [
    { icon: '🏠', label: '主页', action: 'home' },
    { icon: '⚙️', label: '设置', action: 'settings' },
    { icon: '📊', label: '数据', action: 'data' },
    { icon: '💡', label: '帮助', action: 'help' },
    { icon: '🔍', label: '搜索', action: 'search' },
    { icon: '📁', label: '文件', action: 'files' }
  ]
  
  // 标签菜单内容
  const tabMenuTabs = [
    {
      title: '概览',
      content: (
        <div className="content-section">
          <h4>系统状态</h4>
          <p>所有系统运行正常，性能良好。</p>
          <div className="action-buttons">
            <button>刷新</button>
            <button>详情</button>
          </div>
        </div>
      )
    },
    {
      title: '设置',
      content: (
        <div className="content-section">
          <h4>系统配置</h4>
          <p>调整系统参数和偏好设置。</p>
          <div className="action-buttons">
            <button>保存</button>
            <button>重置</button>
          </div>
        </div>
      )
    },
    {
      title: '工具',
      content: (
        <div className="content-section">
          <h4>实用工具</h4>
          <p>访问各种系统工具和实用程序。</p>
          <div className="action-buttons">
            <button>启动</button>
            <button>配置</button>
          </div>
        </div>
      )
    }
  ]
  
  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff']
  
  const handleCircularMenuClick = (item) => {
    console.log('圆形菜单点击:', item)
  }
  
  const handleButtonClick = (action) => {
    console.log('按钮点击:', action)
    if (action === 'toggle-info') {
      setPanels(prev => ({ ...prev, info: !prev.info }))
    }
  }
  
  const closePanelHandler = (panelName) => {
    setPanels(prev => ({ ...prev, [panelName]: false }))
  }
  
  return (
    <>
      {/* 环境光照 */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.6} />
      <pointLight position={[-10, 5, -10]} color="#ff0080" intensity={0.3} />
      <pointLight position={[10, 5, 10]} color="#0080ff" intensity={0.3} />
      
      {/* 背景环境 */}
      <Sphere args={[50]} position={[0, 0, 0]}>
        <meshBasicMaterial color="#000011" side={THREE.BackSide} />
      </Sphere>
      
      {/* 3D UI面板 */}
      {showPanels && (
        <>
          <ThreeDPanel
            position={[-panelDistance, 2, 0]}
            rotation={[0, Math.PI / 6, 0]}
            title="设置面板"
            visible={panels.settings}
            onClose={() => closePanelHandler('settings')}
          >
            <div className="menu-item" onClick={() => handleButtonClick('option1')}>
              <span className="icon">🎨</span>
              <span className="label">主题设置</span>
            </div>
            <div className="menu-item" onClick={() => handleButtonClick('option2')}>
              <span className="icon">🔊</span>
              <span className="label">音频设置</span>
            </div>
            <div className="menu-item" onClick={() => handleButtonClick('option3')}>
              <span className="icon">🌐</span>
              <span className="label">网络设置</span>
            </div>
            
            <div className="slider-control">
              <label>音量: {sliderValue}%</label>
              <input
                type="range"
                min="0"
                max="100"
                value={sliderValue}
                onChange={(e) => setSliderValue(e.target.value)}
              />
            </div>
            
            <div className="color-picker">
              <label>主题颜色</label>
              <div className="color-options">
                {colors.map((color, index) => (
                  <div
                    key={index}
                    className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>
          </ThreeDPanel>
          
          <ThreeDPanel
            position={[panelDistance, 2, 0]}
            rotation={[0, -Math.PI / 6, 0]}
            title="工具面板"
            visible={panels.tools}
            onClose={() => closePanelHandler('tools')}
          >
            <div className="menu-item" onClick={() => handleButtonClick('tool1')}>
              <span className="icon">📐</span>
              <span className="label">测量工具</span>
            </div>
            <div className="menu-item" onClick={() => handleButtonClick('tool2')}>
              <span className="icon">✏️</span>
              <span className="label">绘图工具</span>
            </div>
            <div className="menu-item" onClick={() => handleButtonClick('tool3')}>
              <span className="icon">🔍</span>
              <span className="label">检查工具</span>
            </div>
            <div className="menu-item" onClick={() => handleButtonClick('tool4')}>
              <span className="icon">📊</span>
              <span className="label">分析工具</span>
            </div>
          </ThreeDPanel>
          
          <ThreeDPanel
            position={[0, 2, -panelDistance]}
            rotation={[0, 0, 0]}
            title="信息面板"
            visible={panels.info}
            onClose={() => closePanelHandler('info')}
          >
            <div className="menu-item">
              <span className="icon">📈</span>
              <span className="label">性能监控</span>
            </div>
            <div className="menu-item">
              <span className="icon">💾</span>
              <span className="label">存储状态</span>
            </div>
            <div className="menu-item">
              <span className="icon">🌡️</span>
              <span className="label">系统温度</span>
            </div>
          </ThreeDPanel>
        </>
      )}
      
      {/* 圆形菜单 */}
      {showCircularMenu && (
        <CircularMenuComponent
          position={[-3, -1, 2]}
          items={circularMenuItems}
          onItemClick={handleCircularMenuClick}
        />
      )}
      
      {/* 标签菜单 */}
      {showTabMenu && (
        <TabMenuComponent
          position={[3, -1, 2]}
          tabs={tabMenuTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      )}
      
      {/* 3D按钮 */}
      {showButtons && (
        <>
          <ThreeDButton
            position={[-2, -2, 0]}
            text="开始"
            color="#00ff00"
            onClick={() => handleButtonClick('start')}
          />
          
          <ThreeDButton
            position={[0, -2, 0]}
            text="暂停"
            color="#ffff00"
            onClick={() => handleButtonClick('pause')}
          />
          
          <ThreeDButton
            position={[2, -2, 0]}
            text="停止"
            color="#ff0000"
            onClick={() => handleButtonClick('stop')}
          />
          
          <ThreeDButton
            position={[0, -3, 0]}
            text="信息"
            color="#00ffff"
            onClick={() => handleButtonClick('toggle-info')}
          />
        </>
      )}
      
      {/* 标题 */}
      <Text
        position={[0, 5, 0]}
        fontSize={1.5}
        color="#00ffff"
        anchorX="center"
        anchorY="middle"
      >
        3D UI 菜单系统
      </Text>
      
      <Text
        position={[0, 4.5, 0]}
        fontSize={0.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        交互式三维用户界面演示
      </Text>
    </>
  )
}

function ThreeDUIMenu() {
  return (
    <PageContainer>
      <CanvasContainer>
        <Canvas
          camera={{ position: [0, 0, 10], fov: 75 }}
          gl={{ antialias: true }}
        >
          <Suspense fallback={null}>
            <Scene />
            <OrbitControls
              enableDamping
              dampingFactor={0.05}
              minDistance={5}
              maxDistance={20}
              maxPolarAngle={Math.PI / 1.5}
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
          🎛️ 3D UI 菜单
        </InfoTitle>
        
        <InfoDescription>
          创新的三维用户界面系统，将传统的2D界面元素融入3D空间，提供沉浸式的交互体验和直观的空间导航。
        </InfoDescription>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem' }}>核心特性</h3>
        <TechList>
          <li><code>3D面板</code> - 浮动在3D空间中的交互面板</li>
          <li><code>圆形菜单</code> - 径向布局的快速访问菜单</li>
          <li><code>标签界面</code> - 多页面内容的3D标签系统</li>
          <li><code>立体按钮</code> - 具有深度感的3D按钮</li>
          <li><code>空间导航</code> - 基于3D坐标的界面布局</li>
        </TechList>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem' }}>交互方式</h3>
        <TechList>
          <li><code>鼠标悬停</code> - 元素高亮和缩放效果</li>
          <li><code>点击交互</code> - 3D按钮和菜单项响应</li>
          <li><code>拖拽操作</code> - 面板位置和大小调整</li>
          <li><code>手势控制</code> - 支持触摸和手势操作</li>
          <li><code>键盘快捷键</code> - 快速访问和导航</li>
        </TechList>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem' }}>技术实现</h3>
        <TechList>
          <li><code>CSS3DRenderer</code> - HTML元素的3D渲染</li>
          <li><code>CSS2DRenderer</code> - 2D标签的3D定位</li>
          <li><code>Html组件</code> - React Three Fiber的HTML集成</li>
          <li><code>Transform3D</code> - CSS 3D变换和动画</li>
          <li><code>事件系统</code> - 3D空间中的事件处理</li>
        </TechList>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem' }}>设计原则</h3>
        <InfoDescription>
          • 空间层次感和深度感<br/>
          • 直观的视觉反馈<br/>
          • 流畅的动画过渡<br/>
          • 一致的交互模式<br/>
          • 可访问性和易用性
        </InfoDescription>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem' }}>应用场景</h3>
        <InfoDescription>
          • VR/AR应用界面<br/>
          • 3D建模软件<br/>
          • 游戏用户界面<br/>
          • 数据可视化控制台<br/>
          • 沉浸式展示系统
        </InfoDescription>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem' }}>性能优化</h3>
        <InfoDescription>
          • DOM元素的合理使用<br/>
          • CSS3D硬件加速<br/>
          • 事件委托和防抖<br/>
          • 视锥体剔除优化<br/>
          • 渲染层级管理
        </InfoDescription>
        
        <CodeSection>
          <summary>🔍 查看核心代码</summary>
          <pre>{`// 3D UI面板组件
function ThreeDPanel({ position, rotation, title, children, onClose, visible = true }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (meshRef.current && visible) {
      // 轻微的浮动动画
      meshRef.current.position.y = position[1] + 
        Math.sin(state.clock.elapsedTime * 2) * 0.05
      
      // 悬停时的缩放效果
      const targetScale = hovered ? 1.05 : 1
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale), 0.1
      )
    }
  })
  
  if (!visible) return null
  
  return (
    <group
      ref={meshRef}
      position={position}
      rotation={rotation}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* HTML内容在3D空间中渲染 */}
      <Html
        transform
        occlude
        distanceFactor={10}
        position={[0, 0, 0.01]}
      >
        <UIPanel>
          <div className="panel-header">
            <h3>{title}</h3>
            {onClose && (
              <div className="close-btn" onClick={onClose}>
                ×
              </div>
            )}
          </div>
          <div className="panel-content">
            {children}
          </div>
        </UIPanel>
      </Html>
      
      {/* 3D背景面板 */}
      <Plane args={[3.5, 2.5]}>
        <meshBasicMaterial 
          color={hovered ? '#001122' : '#000011'} 
          transparent 
          opacity={0.1}
        />
      </Plane>
    </group>
  )
}

// 圆形菜单组件
function CircularMenuComponent({ position, items, onItemClick }) {
  const groupRef = useRef()
  const [expanded, setExpanded] = useState(false)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.2
    }
  })
  
  const toggleMenu = () => {
    setExpanded(!expanded)
  }
  
  return (
    <group ref={groupRef} position={position}>
      <Html transform distanceFactor={8}>
        <CircularMenu>
          <button className="center-button" onClick={toggleMenu}>
            {expanded ? '×' : '☰'}
          </button>
          
          {expanded && (
            <div className="menu-items">
              {items.map((item, index) => {
                const angle = (index / items.length) * Math.PI * 2
                const radius = 80
                const x = Math.cos(angle) * radius
                const y = Math.sin(angle) * radius
                
                return (
                  <div
                    key={index}
                    className="menu-item"
                    style={{
                      left: \`calc(50% + \${x}px - 20px)\`,
                      top: \`calc(50% + \${y}px - 20px)\`
                    }}
                    onClick={() => onItemClick(item)}
                  >
                    {item.icon}
                  </div>
                )
              })}
            </div>
          )}
        </CircularMenu>
      </Html>
    </group>
  )
}

// 3D按钮组件
function ThreeDButton({ position, text, color = '#00ffff', onClick }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  
  useFrame((state) => {
    if (meshRef.current) {
      const targetY = position[1] + (hovered ? 0.1 : 0) + (clicked ? -0.05 : 0)
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y, targetY, 0.1
      )
      
      const targetScale = hovered ? 1.1 : 1
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale), 0.1
      )
    }
  })
  
  const handleClick = () => {
    setClicked(true)
    setTimeout(() => setClicked(false), 150)
    if (onClick) onClick()
  }
  
  return (
    <group
      ref={meshRef}
      position={position}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onClick={handleClick}
    >
      <Box args={[2, 0.5, 0.2]}>
        <meshStandardMaterial 
          color={hovered ? '#ffffff' : color}
          emissive={hovered ? color : '#000000'}
          emissiveIntensity={hovered ? 0.2 : 0}
        />
      </Box>
      
      <Text
        position={[0, 0, 0.11]}
        fontSize={0.2}
        color={hovered ? '#000000' : '#ffffff'}
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </group>
  )
}

// CSS3D渲染器集成
function useCSS3DRenderer() {
  const { gl, scene, camera } = useThree()
  const [css3dRenderer, setCSS3DRenderer] = useState(null)
  
  useEffect(() => {
    const renderer = new CSS3DRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.domElement.style.position = 'absolute'
    renderer.domElement.style.top = '0'
    renderer.domElement.style.pointerEvents = 'none'
    
    document.body.appendChild(renderer.domElement)
    setCSS3DRenderer(renderer)
    
    return () => {
      document.body.removeChild(renderer.domElement)
    }
  }, [])
  
  useFrame(() => {
    if (css3dRenderer) {
      css3dRenderer.render(scene, camera)
    }
  })
  
  return css3dRenderer
}

// 标签菜单组件
function TabMenuComponent({ position, tabs, activeTab, onTabChange }) {
  return (
    <group position={position}>
      <Html transform distanceFactor={12}>
        <TabMenu>
          <div className="tab-headers">
            {tabs.map((tab, index) => (
              <div
                key={index}
                className={\`tab-header \${activeTab === index ? 'active' : ''}\`}
                onClick={() => onTabChange(index)}
              >
                {tab.title}
              </div>
            ))}
          </div>
          
          <div className="tab-content">
            {tabs[activeTab] && tabs[activeTab].content}
          </div>
        </TabMenu>
      </Html>
    </group>
  )
}

// 3D UI管理器
class ThreeDUIManager {
  constructor() {
    this.panels = new Map()
    this.menus = new Map()
    this.buttons = new Map()
    this.eventListeners = new Map()
  }
  
  // 注册UI元素
  registerPanel(id, panel) {
    this.panels.set(id, panel)
  }
  
  registerMenu(id, menu) {
    this.menus.set(id, menu)
  }
  
  registerButton(id, button) {
    this.buttons.set(id, button)
  }
  
  // 显示/隐藏面板
  showPanel(id) {
    const panel = this.panels.get(id)
    if (panel) {
      panel.visible = true
    }
  }
  
  hidePanel(id) {
    const panel = this.panels.get(id)
    if (panel) {
      panel.visible = false
    }
  }
  
  // 切换面板状态
  togglePanel(id) {
    const panel = this.panels.get(id)
    if (panel) {
      panel.visible = !panel.visible
    }
  }
  
  // 更新面板位置
  updatePanelPosition(id, position) {
    const panel = this.panels.get(id)
    if (panel) {
      panel.position = position
    }
  }
  
  // 添加事件监听器
  addEventListener(elementId, event, callback) {
    if (!this.eventListeners.has(elementId)) {
      this.eventListeners.set(elementId, new Map())
    }
    this.eventListeners.get(elementId).set(event, callback)
  }
  
  // 触发事件
  triggerEvent(elementId, event, data) {
    const elementListeners = this.eventListeners.get(elementId)
    if (elementListeners && elementListeners.has(event)) {
      elementListeners.get(event)(data)
    }
  }
  
  // 布局管理
  arrangeInCircle(elements, center, radius) {
    elements.forEach((element, index) => {
      const angle = (index / elements.length) * Math.PI * 2
      const x = center[0] + Math.cos(angle) * radius
      const y = center[1]
      const z = center[2] + Math.sin(angle) * radius
      
      element.position = [x, y, z]
      element.rotation = [0, -angle, 0]
    })
  }
  
  arrangeInGrid(elements, rows, cols, spacing) {
    elements.forEach((element, index) => {
      const row = Math.floor(index / cols)
      const col = index % cols
      
      const x = (col - (cols - 1) / 2) * spacing[0]
      const y = (row - (rows - 1) / 2) * spacing[1]
      const z = 0
      
      element.position = [x, y, z]
    })
  }
  
  // 动画管理
  animateToPosition(elementId, targetPosition, duration = 1000) {
    const element = this.getElement(elementId)
    if (!element) return
    
    const startPosition = [...element.position]
    const startTime = Date.now()
    
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // 使用缓动函数
      const easeProgress = this.easeInOutCubic(progress)
      
      element.position = [
        startPosition[0] + (targetPosition[0] - startPosition[0]) * easeProgress,
        startPosition[1] + (targetPosition[1] - startPosition[1]) * easeProgress,
        startPosition[2] + (targetPosition[2] - startPosition[2]) * easeProgress
      ]
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    animate()
  }
  
  // 缓动函数
  easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
  }
  
  // 获取元素
  getElement(id) {
    return this.panels.get(id) || this.menus.get(id) || this.buttons.get(id)
  }
  
  // 清理资源
  dispose() {
    this.panels.clear()
    this.menus.clear()
    this.buttons.clear()
    this.eventListeners.clear()
  }
}

// 使用示例
const uiManager = new ThreeDUIManager()

// 注册UI元素
uiManager.registerPanel('settings', {
  position: [-5, 2, 0],
  rotation: [0, Math.PI / 6, 0],
  visible: true
})

// 添加事件监听
uiManager.addEventListener('settings', 'click', (data) => {
  console.log('设置面板被点击:', data)
})

// 动画到新位置
uiManager.animateToPosition('settings', [0, 3, -2], 1500)

// 圆形布局
const panels = ['panel1', 'panel2', 'panel3', 'panel4']
uiManager.arrangeInCircle(panels, [0, 0, 0], 5)`}</pre>
        </CodeSection>
      </InfoPanel>
    </PageContainer>
  )
}

export default ThreeDUIMenu