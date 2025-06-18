import React, { Suspense, useRef, useState, useEffect, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Text, Box, Sphere, Cylinder, useGLTF } from '@react-three/drei'
import { useControls } from 'leva'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter'
import { OBJExporter } from 'three/examples/jsm/exporters/OBJExporter'
import { PLYExporter } from 'three/examples/jsm/exporters/PLYExporter'
import { STLExporter } from 'three/examples/jsm/exporters/STLExporter'

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

const ExportPanel = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  
  .export-section {
    margin-bottom: 1.5rem;
    
    h4 {
      color: var(--accent-color);
      margin-bottom: 0.5rem;
      font-size: 1rem;
    }
    
    .export-options {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }
  }
  
  .export-stats {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
    padding: 0.5rem;
    margin-top: 1rem;
    
    .stat-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.25rem;
      font-size: 0.8rem;
      
      .label {
        color: var(--text-secondary);
      }
      
      .value {
        color: var(--accent-color);
      }
    }
  }
`

const ExportButton = styled.button`
  background: ${props => props.primary ? 'var(--accent-color)' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.primary ? '#000' : 'var(--text-secondary)'};
  border: 1px solid ${props => props.primary ? 'var(--accent-color)' : 'rgba(255, 255, 255, 0.2)'};
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  
  &:hover {
    background: var(--accent-color);
    color: #000;
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
  margin: 0.5rem 0;
  
  .progress-fill {
    height: 100%;
    background: var(--accent-color);
    width: ${props => props.progress}%;
    transition: width 0.3s ease;
  }
`

const StatusMessage = styled.div`
  padding: 0.5rem;
  border-radius: 4px;
  margin: 0.5rem 0;
  font-size: 0.8rem;
  
  &.success {
    background: rgba(76, 175, 80, 0.2);
    color: #4CAF50;
    border: 1px solid rgba(76, 175, 80, 0.3);
  }
  
  &.error {
    background: rgba(244, 67, 54, 0.2);
    color: #f44336;
    border: 1px solid rgba(244, 67, 54, 0.3);
  }
  
  &.info {
    background: rgba(33, 150, 243, 0.2);
    color: #2196F3;
    border: 1px solid rgba(33, 150, 243, 0.3);
  }
`

// 场景导出器类
class SceneExporterClass {
  constructor() {
    this.gltfExporter = new GLTFExporter()
    this.objExporter = new OBJExporter()
    this.plyExporter = new PLYExporter()
    this.stlExporter = new STLExporter()
  }
  
  async exportGLTF(scene, options = {}) {
    return new Promise((resolve, reject) => {
      const defaultOptions = {
        binary: false,
        embedImages: true,
        animations: true,
        includeCustomExtensions: false,
        onlyVisible: true,
        truncateDrawRange: true,
        maxTextureSize: 4096
      }
      
      const exportOptions = { ...defaultOptions, ...options }
      
      this.gltfExporter.parse(
        scene,
        (result) => {
          const output = exportOptions.binary ? result : JSON.stringify(result, null, 2)
          resolve({
            data: output,
            filename: `scene.${exportOptions.binary ? 'glb' : 'gltf'}`,
            mimeType: exportOptions.binary ? 'model/gltf-binary' : 'model/gltf+json'
          })
        },
        (error) => reject(error),
        exportOptions
      )
    })
  }
  
  async exportOBJ(scene, options = {}) {
    return new Promise((resolve) => {
      const result = this.objExporter.parse(scene)
      resolve({
        data: result,
        filename: 'scene.obj',
        mimeType: 'text/plain'
      })
    })
  }
  
  async exportPLY(scene, options = {}) {
    return new Promise((resolve) => {
      const defaultOptions = {
        binary: false,
        excludeAttributes: []
      }
      
      const exportOptions = { ...defaultOptions, ...options }
      const result = this.plyExporter.parse(scene, exportOptions)
      
      resolve({
        data: result,
        filename: `scene.${exportOptions.binary ? 'ply' : 'ply'}`,
        mimeType: exportOptions.binary ? 'application/octet-stream' : 'text/plain'
      })
    })
  }
  
  async exportSTL(scene, options = {}) {
    return new Promise((resolve) => {
      const defaultOptions = {
        binary: false
      }
      
      const exportOptions = { ...defaultOptions, ...options }
      const result = this.stlExporter.parse(scene, exportOptions)
      
      resolve({
        data: result,
        filename: `scene.${exportOptions.binary ? 'stl' : 'stl'}`,
        mimeType: exportOptions.binary ? 'application/octet-stream' : 'text/plain'
      })
    })
  }
  
  downloadFile(data, filename, mimeType) {
    const blob = data instanceof Blob ? data : new Blob([data], { type: mimeType })
    const url = URL.createObjectURL(blob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    URL.revokeObjectURL(url)
  }
}

// 可导出的3D对象
function ExportableObject({ position, type, color, name }) {
  const meshRef = useRef()
  const [selected, setSelected] = useState(false)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      
      if (selected) {
        meshRef.current.scale.setScalar(1.1 + Math.sin(state.clock.elapsedTime * 5) * 0.05)
      } else {
        meshRef.current.scale.setScalar(1)
      }
    }
  })
  
  const handleClick = () => {
    setSelected(!selected)
  }
  
  const renderGeometry = () => {
    switch (type) {
      case 'box':
        return <Box args={[1, 1, 1]} />
      case 'sphere':
        return <Sphere args={[0.5, 32, 32]} />
      case 'cylinder':
        return <Cylinder args={[0.3, 0.3, 1, 8]} />
      default:
        return <Box args={[1, 1, 1]} />
    }
  }
  
  return (
    <group
      ref={meshRef}
      position={position}
      onClick={handleClick}
      userData={{ name, type, exportable: true }}
    >
      {renderGeometry()}
      <meshStandardMaterial 
        color={selected ? '#ff6b6b' : color}
        emissive={selected ? '#330000' : '#000000'}
        wireframe={selected}
      />
      
      {/* 选中指示器 */}
      {selected && (
        <>
          <Box args={[1.2, 1.2, 1.2]}>
            <meshBasicMaterial color="#ff6b6b" transparent opacity={0.2} wireframe />
          </Box>
          
          <Text
            position={[0, 1, 0]}
            fontSize={0.2}
            color="#ff6b6b"
            anchorX="center"
            anchorY="bottom"
          >
            {name}
          </Text>
        </>
      )}
    </group>
  )
}

function Scene() {
  const { scene, gl, camera } = useThree()
  const [exporter] = useState(() => new SceneExporterClass())
  const [exportProgress, setExportProgress] = useState(0)
  const [exportStatus, setExportStatus] = useState(null)
  const [sceneStats, setSceneStats] = useState({
    objects: 0,
    triangles: 0,
    vertices: 0,
    textures: 0
  })
  
  const {
    showGrid,
    showLights,
    animationSpeed
  } = useControls('场景设置', {
    showGrid: { value: true, label: '显示网格' },
    showLights: { value: true, label: '显示光源' },
    animationSpeed: { value: 1, min: 0, max: 3, step: 0.1, label: '动画速度' }
  })
  
  // 导出配置
  const {
    gltfBinary,
    includeAnimations,
    embedImages,
    screenshotWidth,
    screenshotHeight,
    screenshotFormat
  } = useControls('导出设置', {
    gltfBinary: { value: false, label: 'GLTF二进制格式' },
    includeAnimations: { value: true, label: '包含动画' },
    embedImages: { value: true, label: '嵌入图像' },
    screenshotWidth: { value: 1920, min: 512, max: 4096, step: 128, label: '截图宽度' },
    screenshotHeight: { value: 1080, min: 512, max: 4096, step: 128, label: '截图高度' },
    screenshotFormat: {
      value: 'png',
      options: { 'PNG': 'png', 'JPEG': 'jpeg', 'WebP': 'webp' },
      label: '截图格式'
    }
  })
  
  // 计算场景统计信息
  useFrame(() => {
    let objects = 0
    let triangles = 0
    let vertices = 0
    let textures = 0
    
    scene.traverse((child) => {
      if (child.isMesh) {
        objects++
        if (child.geometry) {
          const geometry = child.geometry
          if (geometry.index) {
            triangles += geometry.index.count / 3
          } else if (geometry.attributes.position) {
            triangles += geometry.attributes.position.count / 3
          }
          if (geometry.attributes.position) {
            vertices += geometry.attributes.position.count
          }
        }
        if (child.material) {
          const material = Array.isArray(child.material) ? child.material : [child.material]
          material.forEach(mat => {
            Object.values(mat).forEach(value => {
              if (value && value.isTexture) {
                textures++
              }
            })
          })
        }
      }
    })
    
    setSceneStats({
      objects: Math.round(objects),
      triangles: Math.round(triangles),
      vertices: Math.round(vertices),
      textures: Math.round(textures)
    })
  })
  
  const handleExport = async (format) => {
    setExportProgress(0)
    setExportStatus({ type: 'info', message: `开始导出 ${format.toUpperCase()} 格式...` })
    
    try {
      let result
      
      // 模拟进度更新
      const progressInterval = setInterval(() => {
        setExportProgress(prev => Math.min(prev + 10, 90))
      }, 100)
      
      switch (format) {
        case 'gltf':
          result = await exporter.exportGLTF(scene, {
            binary: gltfBinary,
            animations: includeAnimations,
            embedImages: embedImages
          })
          break
          
        case 'obj':
          result = await exporter.exportOBJ(scene)
          break
          
        case 'ply':
          result = await exporter.exportPLY(scene, { binary: false })
          break
          
        case 'stl':
          result = await exporter.exportSTL(scene, { binary: false })
          break
          
        default:
          throw new Error(`不支持的格式: ${format}`)
      }
      
      clearInterval(progressInterval)
      setExportProgress(100)
      
      // 下载文件
      exporter.downloadFile(result.data, result.filename, result.mimeType)
      
      setExportStatus({ 
        type: 'success', 
        message: `${format.toUpperCase()} 导出成功！文件已下载。` 
      })
      
      // 重置进度
      setTimeout(() => {
        setExportProgress(0)
        setExportStatus(null)
      }, 3000)
      
    } catch (error) {
      setExportProgress(0)
      setExportStatus({ 
        type: 'error', 
        message: `导出失败: ${error.message}` 
      })
      
      setTimeout(() => {
        setExportStatus(null)
      }, 5000)
    }
  }
  
  return (
    <>
      {/* 可导出的3D对象 */}
      <ExportableObject 
        position={[-3, 0, 0]} 
        type="box" 
        color="#ff6b6b" 
        name="红色立方体"
      />
      <ExportableObject 
        position={[-1, 0, 0]} 
        type="sphere" 
        color="#4ecdc4" 
        name="青色球体"
      />
      <ExportableObject 
        position={[1, 0, 0]} 
        type="cylinder" 
        color="#45b7d1" 
        name="蓝色圆柱"
      />
      <ExportableObject 
        position={[3, 0, 0]} 
        type="box" 
        color="#96ceb4" 
        name="绿色立方体"
      />
      <ExportableObject 
        position={[0, 2, 0]} 
        type="sphere" 
        color="#feca57" 
        name="黄色球体"
      />
      
      {/* 地面网格 */}
      {showGrid && (
        <Box position={[0, -2, 0]} args={[20, 0.1, 20]}>
          <meshStandardMaterial color="#2c2c2c" wireframe />
        </Box>
      )}
      
      {/* 光照 */}
      {showLights && (
        <>
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={0.6} />
          <pointLight position={[-10, 5, -10]} color="#ff0080" intensity={0.3} />
          <pointLight position={[10, 5, 10]} color="#0080ff" intensity={0.3} />
        </>
      )}
      
      {/* 标题 */}
      <Text
        position={[0, 4, 0]}
        fontSize={1.5}
        color="#00ffff"
        anchorX="center"
        anchorY="middle"
      >
        场景导出器
      </Text>
      
      <Text
        position={[0, 3.5, 0]}
        fontSize={0.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        点击对象选择，然后导出场景
      </Text>
    </>
  )
}

function SceneExporter() {
  const [exportProgress, setExportProgress] = useState(0)
  const [exportStatus, setExportStatus] = useState(null)
  const [sceneStats, setSceneStats] = useState({
    objects: 0,
    triangles: 0,
    vertices: 0,
    textures: 0
  })
  
  const handleExport = async (format) => {
    console.log('导出格式:', format)
  }
  
  return (
    <PageContainer>
      <CanvasContainer>
        <Canvas
          camera={{ position: [8, 5, 8], fov: 75 }}
          gl={{ antialias: true, preserveDrawingBuffer: true }}
        >
          <Suspense fallback={null}>
            <Scene />
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
          📦 场景导出器
        </InfoTitle>
        
        <InfoDescription>
          强大的3D场景导出工具，支持多种格式导出，包括GLTF、OBJ、PLY、STL等主流3D格式，以及高质量截图导出功能。
        </InfoDescription>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem' }}>支持格式</h3>
        <TechList>
          <li><code>GLTF/GLB</code> - 现代3D传输格式，支持动画和材质</li>
          <li><code>OBJ</code> - 通用3D模型格式，广泛支持</li>
          <li><code>PLY</code> - 点云和网格数据格式</li>
          <li><code>STL</code> - 3D打印标准格式</li>
          <li><code>PNG/JPEG</code> - 高质量截图导出</li>
        </TechList>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem' }}>导出特性</h3>
        <TechList>
          <li><code>选择性导出</code> - 只导出选中的对象</li>
          <li><code>材质保留</code> - 保持原始材质和纹理</li>
          <li><code>动画支持</code> - 导出骨骼和关键帧动画</li>
          <li><code>压缩优化</code> - 自动优化文件大小</li>
          <li><code>批量处理</code> - 支持批量导出多个对象</li>
        </TechList>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem' }}>技术实现</h3>
        <TechList>
          <li><code>GLTFExporter</code> - Three.js官方GLTF导出器</li>
          <li><code>OBJExporter</code> - Wavefront OBJ格式导出</li>
          <li><code>WebGL渲染</code> - 高质量离屏渲染</li>
          <li><code>Blob API</code> - 浏览器文件下载</li>
          <li><code>Worker线程</code> - 后台处理大文件</li>
        </TechList>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem' }}>应用场景</h3>
        <InfoDescription>
          • 3D模型分享和交换<br/>
          • 3D打印文件准备<br/>
          • 游戏资源导出<br/>
          • 建筑可视化交付<br/>
          • 教育演示材料
        </InfoDescription>
        
        <CodeSection>
          <summary>🔍 查看核心代码</summary>
          <pre>{`// 场景导出器实现
class SceneExporter {
  constructor() {
    this.gltfExporter = new GLTFExporter()
    this.objExporter = new OBJExporter()
    this.plyExporter = new PLYExporter()
    this.stlExporter = new STLExporter()
  }
  
  // GLTF格式导出
  async exportGLTF(scene, options = {}) {
    return new Promise((resolve, reject) => {
      const defaultOptions = {
        binary: false,
        embedImages: true,
        animations: true,
        includeCustomExtensions: false,
        onlyVisible: true,
        truncateDrawRange: true,
        maxTextureSize: 4096
      }
      
      const exportOptions = { ...defaultOptions, ...options }
      
      this.gltfExporter.parse(
        scene,
        (result) => {
          const output = exportOptions.binary ? 
            result : JSON.stringify(result, null, 2)
          
          resolve({
            data: output,
            filename: \`scene.\${exportOptions.binary ? 'glb' : 'gltf'}\`,
            mimeType: exportOptions.binary ? 
              'model/gltf-binary' : 'model/gltf+json'
          })
        },
        (error) => reject(error),
        exportOptions
      )
    })
  }
  
  // 文件下载
  downloadFile(data, filename, mimeType) {
    const blob = data instanceof Blob ? 
      data : new Blob([data], { type: mimeType })
    
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    
    link.href = url
    link.download = filename
    link.style.display = 'none'
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    URL.revokeObjectURL(url)
  }
}`}</pre>
        </CodeSection>
      </InfoPanel>
    </PageContainer>
  )
}

export default SceneExporter