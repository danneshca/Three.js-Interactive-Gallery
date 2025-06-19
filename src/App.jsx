import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import styled from 'styled-components'

// Components
import Navigation from './components/Navigation'
import LoadingScreen from './components/LoadingScreen'

// Lazy load pages for code splitting
const Home = React.lazy(() => import('./pages/Home'))
const SceneCamera = React.lazy(() => import('./pages/core/SceneCamera'))
const LightingSystem = React.lazy(() => import('./pages/core/LightingSystem'))
const MaterialTexture = React.lazy(() => import('./pages/core/MaterialTexture'))
const GeometryShowcase = React.lazy(() => import('./pages/core/GeometryShowcase'))
const ModelLoader = React.lazy(() => import('./pages/core/ModelLoader'))
const ParticleSystem = React.lazy(() => import('./pages/advanced/ParticleSystem'))
const AnimationSystem = React.lazy(() => import('./pages/advanced/AnimationSystem'))
const PostProcessing = React.lazy(() => import('./pages/advanced/PostProcessing'))
const ShaderExperiments = React.lazy(() => import('./pages/advanced/ShaderExperiments'))
const TerrainGeneration = React.lazy(() => import('./pages/advanced/TerrainGeneration'))
const WebXRExperience = React.lazy(() => import('./pages/advanced/WebXRExperience'))
const MultiViewport = React.lazy(() => import('./pages/experiments/MultiViewport'))
const MultiUserCollaboration = React.lazy(() => import('./pages/experiments/MultiUserCollaboration'))
const SceneExporter = React.lazy(() => import('./pages/experiments/SceneExporter'))
const ThreeDUIMenu = React.lazy(() => import('./pages/experiments/ThreeDUIMenu'))
const About = React.lazy(() => import('./pages/About'))

const AppContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  
  /* Ensure proper scrolling on mobile */
  -webkit-overflow-scrolling: touch;
  
  /* Prevent horizontal scroll on small screens */
  @media (max-width: 768px) {
    max-width: 100vw;
  }
`

const MainContent = styled.main`
  width: 100%;
  height: 100%;
  position: relative;
  padding-top: 80px;
  
  @media (max-width: 768px) {
    padding-top: 70px;
  }
  
  @media (max-width: 576px) {
    padding-top: 60px;
  }
`

function App() {
  return (
    <AppContainer>
      <Navigation />
      <MainContent>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            {/* 首页 */}
            <Route path="/" element={<Home />} />
            
            {/* 核心模块 */}
            <Route path="/core/scene-camera" element={<SceneCamera />} />
            <Route path="/core/lighting" element={<LightingSystem />} />
            <Route path="/core/materials" element={<MaterialTexture />} />
            <Route path="/core/geometry" element={<GeometryShowcase />} />
            <Route path="/core/models" element={<ModelLoader />} />
            
            {/* 拓展模块 */}
            <Route path="/advanced/particles" element={<ParticleSystem />} />
            <Route path="/advanced/animation" element={<AnimationSystem />} />
            <Route path="/advanced/postprocessing" element={<PostProcessing />} />
            <Route path="/advanced/shaders" element={<ShaderExperiments />} />
            <Route path="/advanced/terrain" element={<TerrainGeneration />} />
            <Route path="/advanced/webxr" element={<WebXRExperience />} />
            
            {/* 实验功能 */}

            <Route path="/experiments/multiviewport" element={<MultiViewport />} />
            <Route path="/experiments/collaborative" element={<MultiUserCollaboration />} />
            <Route path="/experiments/exporter" element={<SceneExporter />} />
            <Route path="/experiments/ui3d" element={<ThreeDUIMenu />} />
            
            {/* 关于页面 */}
            <Route path="/about" element={<About />} />
          </Routes>
        </Suspense>
      </MainContent>
    </AppContainer>
  )
}

export default App