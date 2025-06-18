import React, { Suspense, useRef, useMemo } from 'react'
import { Canvas, useFrame, extend } from '@react-three/fiber'
import { 
  OrbitControls, 
  Text, 
  Environment
} from '@react-three/drei'
import {
  EffectComposer,
  Bloom,
  DepthOfField,
  Noise,
  Vignette,
  ChromaticAberration,
  Glitch
} from '@react-three/postprocessing'
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

// Glowing objects for bloom effect
function GlowingSphere({ position, color, intensity = 1 }) {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })
  
  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial 
        color={color} 
        emissive={color}
        emissiveIntensity={intensity}
        roughness={0.1}
        metalness={0.8}
      />
    </mesh>
  )
}

// Rotating torus for depth of field
function RotatingTorus({ position, color }) {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.8
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.6
    }
  })
  
  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[1, 0.3, 16, 100]} />
      <meshStandardMaterial 
        color={color}
        roughness={0.2}
        metalness={0.9}
      />
    </mesh>
  )
}

// Crystal structure for various effects
function Crystal({ position, scale = 1 }) {
  const meshRef = useRef()
  
  const geometry = useMemo(() => {
    const geo = new THREE.ConeGeometry(0.5, 2, 8)
    return geo
  }, [])
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
    }
  })
  
  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <primitive object={geometry} />
      <meshPhysicalMaterial 
        color="#ffffff"
        transmission={0.9}
        opacity={0.8}
        transparent
        roughness={0}
        metalness={0}
        clearcoat={1}
        clearcoatRoughness={0}
        ior={1.5}
      />
    </mesh>
  )
}

// Scene with multiple objects
function Scene() {
  const {
    enableBloom,
    bloomIntensity,
    bloomRadius,
    enableDOF,
    focusDistance,
    focalLength,
    bokehScale,
    enableNoise,
    noiseIntensity,
    enableVignette,
    vignetteOffset,
    vignetteDarkness,
    enableChromaticAberration,
    chromaticAberrationOffset,
    enableGlitch,
    glitchDelay,
    glitchDuration
  } = useControls('后期处理', {
    enableBloom: { value: true, label: '启用辉光' },
    bloomIntensity: { value: 1.5, min: 0, max: 3, step: 0.1, label: '辉光强度' },
    bloomRadius: { value: 0.4, min: 0, max: 1, step: 0.01, label: '辉光半径' },
    enableDOF: { value: false, label: '启用景深' },
    focusDistance: { value: 0.02, min: 0, max: 0.2, step: 0.001, label: '焦点距离' },
    focalLength: { value: 0.02, min: 0, max: 0.1, step: 0.001, label: '焦距' },
    bokehScale: { value: 2, min: 0, max: 10, step: 0.1, label: '散景缩放' },
    enableNoise: { value: false, label: '启用噪点' },
    noiseIntensity: { value: 0.4, min: 0, max: 1, step: 0.01, label: '噪点强度' },
    enableVignette: { value: false, label: '启用暗角' },
    vignetteOffset: { value: 0.1, min: 0, max: 1, step: 0.01, label: '暗角偏移' },
    vignetteDarkness: { value: 1, min: 0, max: 2, step: 0.1, label: '暗角强度' },
    enableChromaticAberration: { value: false, label: '启用色差' },
    chromaticAberrationOffset: { value: 0.002, min: 0, max: 0.01, step: 0.0001, label: '色差偏移' },
    enableGlitch: { value: false, label: '启用故障' },
    glitchDelay: { value: 1.5, min: 0.1, max: 5, step: 0.1, label: '故障延迟' },
    glitchDuration: { value: 0.6, min: 0.1, max: 2, step: 0.1, label: '故障持续' }
  })
  
  return (
    <>
      {/* Environment */}
      <Environment preset="city" />
      
      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <pointLight position={[-10, -10, -10]} color="#ff0080" intensity={0.5} />
      <pointLight position={[10, -10, 10]} color="#0080ff" intensity={0.5} />
      
      {/* Glowing spheres for bloom */}
      <GlowingSphere position={[-3, 2, 0]} color="#ff0080" intensity={2} />
      <GlowingSphere position={[3, 2, 0]} color="#0080ff" intensity={2} />
      <GlowingSphere position={[0, -2, 3]} color="#80ff00" intensity={1.5} />
      
      {/* Rotating torus */}
      <RotatingTorus position={[0, 0, 0]} color="#ffff00" />
      
      {/* Crystals at different depths */}
      <Crystal position={[-2, -1, -2]} scale={0.8} />
      <Crystal position={[2, 1, -4]} scale={1.2} />
      <Crystal position={[0, 3, -6]} scale={0.6} />
      
      {/* Ground plane */}
      <mesh position={[0, -3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} metalness={0.2} />
      </mesh>
      
      {/* Title */}
      <Text
        position={[0, 5, 0]}
        fontSize={1}
        color="#00ffff"
        anchorX="center"
        anchorY="middle"
      >
        后期处理效果
      </Text>
      
      {/* Post-processing effects */}
      <EffectComposer>
        {enableBloom && (
          <Bloom
            intensity={bloomIntensity}
            radius={bloomRadius}
            luminanceThreshold={0.9}
            luminanceSmoothing={0.025}
          />
        )}
        
        {enableDOF && (
          <DepthOfField
            focusDistance={focusDistance}
            focalLength={focalLength}
            bokehScale={bokehScale}
          />
        )}
        
        {enableNoise && (
          <Noise
            premultiply
            blendFunction={THREE.BlendFunction.ADD}
            opacity={noiseIntensity}
          />
        )}
        
        {enableVignette && (
          <Vignette
            offset={vignetteOffset}
            darkness={vignetteDarkness}
          />
        )}
        
        {enableChromaticAberration && (
          <ChromaticAberration
            offset={[chromaticAberrationOffset, chromaticAberrationOffset]}
          />
        )}
        
        {enableGlitch && (
          <Glitch
            delay={[glitchDelay, glitchDelay + glitchDuration]}
            duration={[glitchDuration * 0.1, glitchDuration]}
            strength={[0.3, 1.0]}
          />
        )}
      </EffectComposer>
    </>
  )
}

function PostProcessing() {
  return (
    <PageContainer>
      <CanvasContainer>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 75 }}
          gl={{ antialias: true, alpha: false }}
        >
          <Suspense fallback={null}>
            <Scene />
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
          🎭 后期处理
        </InfoTitle>
        
        <InfoDescription>
          后期处理是现代3D渲染中的重要技术，通过在渲染完成后对图像进行处理，可以实现各种视觉效果，提升画面质量和艺术表现力。
        </InfoDescription>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem' }}>主要效果</h3>
        <TechList>
          <li><code>Bloom</code> - 辉光效果，让明亮区域产生光晕</li>
          <li><code>Depth of Field</code> - 景深效果，模拟相机焦点</li>
          <li><code>Noise</code> - 噪点效果，增加胶片质感</li>
          <li><code>Vignette</code> - 暗角效果，突出中心区域</li>
          <li><code>Chromatic Aberration</code> - 色差效果，模拟镜头缺陷</li>
          <li><code>Glitch</code> - 故障效果，数字艺术风格</li>
        </TechList>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem', marginTop: '2rem' }}>核心组件</h3>
        <TechList>
          <li><code>EffectComposer</code> - 效果合成器，管理渲染通道</li>
          <li><code>RenderPass</code> - 基础渲染通道</li>
          <li><code>ShaderPass</code> - 着色器通道，自定义效果</li>
          <li><code>WebGLRenderTarget</code> - 渲染目标，存储中间结果</li>
        </TechList>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem', marginTop: '2rem' }}>渲染流程</h3>
        <TechList>
          <li><code>Scene Render</code> - 场景渲染到纹理</li>
          <li><code>Effect Passes</code> - 依次应用各种效果</li>
          <li><code>Blend Modes</code> - 混合模式控制效果叠加</li>
          <li><code>Final Output</code> - 最终输出到屏幕</li>
        </TechList>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem', marginTop: '2rem' }}>性能优化</h3>
        <InfoDescription>
          • 合理控制渲染目标分辨率<br/>
          • 避免过多的渲染通道<br/>
          • 使用半分辨率进行昂贵的效果<br/>
          • 动态启用/禁用效果<br/>
          • 使用 MRT（多渲染目标）优化
        </InfoDescription>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem', marginTop: '2rem' }}>高级技巧</h3>
        <TechList>
          <li><code>Temporal Effects</code> - 时间相关的效果（TAA、Motion Blur）</li>
          <li><code>Screen Space</code> - 屏幕空间效果（SSAO、SSR）</li>
          <li><code>Tone Mapping</code> - 色调映射，HDR到LDR转换</li>
          <li><code>Color Grading</code> - 颜色分级，调整画面色调</li>
        </TechList>
        
        <CodeSection>
          <summary>🔍 查看核心代码</summary>
          <pre>{`// 创建效果合成器
const composer = new EffectComposer(renderer)

// 添加基础渲染通道
const renderPass = new RenderPass(scene, camera)
composer.addPass(renderPass)

// 添加辉光效果
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5,  // intensity
  0.4,  // radius
  0.85  // threshold
)
composer.addPass(bloomPass)

// 添加景深效果
const bokehPass = new BokehPass(scene, camera, {
  focus: 1.0,
  aperture: 0.025,
  maxblur: 0.01
})
composer.addPass(bokehPass)

// 自定义着色器通道
const customShader = {
  uniforms: {
    tDiffuse: { value: null },
    time: { value: 0 },
    intensity: { value: 1.0 }
  },
  vertexShader: \`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  \`,
  fragmentShader: \`
    uniform sampler2D tDiffuse;
    uniform float time;
    uniform float intensity;
    varying vec2 vUv;
    
    void main() {
      vec4 color = texture2D(tDiffuse, vUv);
      
      // 添加噪点
      float noise = fract(sin(dot(vUv * time, vec2(12.9898, 78.233))) * 43758.5453);
      color.rgb += noise * 0.1 * intensity;
      
      gl_FragColor = color;
    }
  \`
}

const customPass = new ShaderPass(customShader)
composer.addPass(customPass)

// 渲染循环
function animate() {
  customPass.uniforms.time.value = performance.now() * 0.001
  
  // 使用合成器渲染而不是直接渲染
  composer.render()
  
  requestAnimationFrame(animate)
}

// 响应窗口大小变化
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  
  renderer.setSize(window.innerWidth, window.innerHeight)
  composer.setSize(window.innerWidth, window.innerHeight)
}`}</pre>
        </CodeSection>
      </InfoPanel>
    </PageContainer>
  )
}

export default PostProcessing