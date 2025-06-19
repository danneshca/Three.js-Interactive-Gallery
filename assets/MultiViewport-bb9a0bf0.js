import{j as e,r as n,C as p,O as h,B as d,T as k,u as c,a as T,g as V}from"./react-three-vendor-611369f6.js";import{u as y}from"./leva.esm-82acce57.js";import{d as a}from"./style-vendor-32f1d845.js";import{m as z}from"./animation-vendor-a22bc070.js";import"./three-vendor-1aa2ed72.js";const M=a.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  position: relative;
  padding-top: 80px;
`,R=a.div`
  flex: 1;
  height: calc(100vh - 80px);
  position: relative;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 2fr 1fr;
  gap: 2px;
  background: #000;
`,m=a.div`
  position: relative;
  overflow: hidden;
  border: 2px solid ${t=>t.active?"var(--accent-color)":"rgba(255, 255, 255, 0.2)"};
  transition: border-color 0.3s ease;
  
  &:hover {
    border-color: var(--accent-color);
  }
  
  canvas {
    width: 100% !important;
    height: 100% !important;
  }
`,x=a.div`
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
`,u=a.div`
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
`,N=a(z.div)`
  width: 350px;
  background: rgba(26, 26, 26, 0.95);
  backdrop-filter: blur(20px);
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem;
  overflow-y: auto;
  z-index: 100;
`,D=a.h2`
  color: var(--accent-color);
  font-size: 1.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`,j=a.p`
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
`,l=a.ul`
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
`,H=a.details`
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
`;function w({position:t,color:i,speed:r=1}){const o=n.useRef();return c(s=>{o.current&&(o.current.rotation.x=s.clock.elapsedTime*r,o.current.rotation.y=s.clock.elapsedTime*r*.7,o.current.position.y=t[1]+Math.sin(s.clock.elapsedTime*2)*.5)}),e.jsx(d,{ref:o,position:t,args:[1,1,1],children:e.jsx("meshStandardMaterial",{color:i})})}function f({position:t,color:i,speed:r=1}){const o=n.useRef();return c(s=>{o.current&&(o.current.position.x=t[0]+Math.cos(s.clock.elapsedTime*r)*2,o.current.position.z=t[2]+Math.sin(s.clock.elapsedTime*r)*2,o.current.scale.setScalar(1+Math.sin(s.clock.elapsedTime*3)*.2))}),e.jsx(T,{ref:o,position:t,args:[.5,32,32],children:e.jsx("meshStandardMaterial",{color:i,emissive:i,emissiveIntensity:.2})})}function S({position:t,color:i,speed:r=1}){const o=n.useRef();return c(s=>{o.current&&(o.current.rotation.z=s.clock.elapsedTime*r,o.current.position.y=t[1]+Math.cos(s.clock.elapsedTime*1.5)*1)}),e.jsx(V,{ref:o,position:t,args:[.3,.3,2,8],children:e.jsx("meshStandardMaterial",{color:i,wireframe:!0})})}function v(){const{animationSpeed:t,showWireframe:i,lightIntensity:r}=y("场景设置",{animationSpeed:{value:1,min:0,max:3,step:.1,label:"动画速度"},showWireframe:{value:!1,label:"线框模式"},lightIntensity:{value:.6,min:0,max:2,step:.1,label:"光照强度"}});return e.jsxs(e.Fragment,{children:[e.jsx(w,{position:[-3,0,0],color:"#ff6b6b",speed:t}),e.jsx(w,{position:[3,0,0],color:"#4ecdc4",speed:t*.8}),e.jsx(w,{position:[0,3,0],color:"#45b7d1",speed:t*1.2}),e.jsx(f,{position:[-2,-2,2],color:"#96ceb4",speed:t}),e.jsx(f,{position:[2,-2,2],color:"#feca57",speed:t*.6}),e.jsx(f,{position:[0,-2,-2],color:"#ff9ff3",speed:t*1.4}),e.jsx(S,{position:[0,0,3],color:"#54a0ff",speed:t}),e.jsx(S,{position:[0,0,-3],color:"#5f27cd",speed:t*.9}),e.jsx(d,{position:[0,-4,0],args:[20,.1,20],children:e.jsx("meshStandardMaterial",{color:"#2c2c2c",wireframe:i})}),Array.from({length:10},(o,s)=>e.jsxs("group",{children:[e.jsx(d,{position:[s*2-10,-3.9,0],args:[.05,.2,20],children:e.jsx("meshBasicMaterial",{color:"#444444"})}),e.jsx(d,{position:[0,-3.9,s*2-10],args:[20,.2,.05],children:e.jsx("meshBasicMaterial",{color:"#444444"})})]},s)),e.jsx("ambientLight",{intensity:.3}),e.jsx("directionalLight",{position:[10,10,5],intensity:r,castShadow:!0,"shadow-mapSize-width":2048,"shadow-mapSize-height":2048}),e.jsx("pointLight",{position:[-10,5,-10],color:"#ff0080",intensity:.3}),e.jsx("pointLight",{position:[10,5,10],color:"#0080ff",intensity:.3}),e.jsx(k,{position:[0,6,0],fontSize:1.5,color:"#00ffff",anchorX:"center",anchorY:"middle",children:"多视角渲染"})]})}function P({onStatsUpdate:t}){return c(i=>{t({fps:Math.round(1/i.clock.getDelta()),triangles:i.gl.info.render.triangles})}),null}function F(){const[t,i]=n.useState({fps:0,triangles:0}),r=n.useCallback(o=>{i(o)},[]);return e.jsxs(m,{active:!0,children:[e.jsx(x,{children:"主视角 - 透视相机"}),e.jsxs(u,{children:[e.jsxs("div",{className:"stat-line",children:["FPS: ",t.fps]}),e.jsxs("div",{className:"stat-line",children:["三角形: ",t.triangles]}),e.jsx("div",{className:"stat-line",children:"位置: 自由移动"})]}),e.jsxs(p,{camera:{position:[8,5,8],fov:75},gl:{antialias:!0},shadows:!0,children:[e.jsx(P,{onStatsUpdate:r}),e.jsxs(n.Suspense,{fallback:null,children:[e.jsx(v,{}),e.jsx(h,{enableDamping:!0,dampingFactor:.05,minDistance:3,maxDistance:30})]})]})]})}function O({onStatsUpdate:t}){return c(i=>{var r;t({zoom:((r=i.camera.zoom)==null?void 0:r.toFixed(2))||1,visible:i.scene.children.length})}),null}function B(){const[t,i]=n.useState({zoom:1,visible:0}),r=n.useCallback(o=>{i(o)},[]);return e.jsxs(m,{children:[e.jsx(x,{children:"顶视图 - 正交相机"}),e.jsxs(u,{children:[e.jsxs("div",{className:"stat-line",children:["缩放: ",t.zoom,"x"]}),e.jsxs("div",{className:"stat-line",children:["对象: ",t.visible]}),e.jsx("div",{className:"stat-line",children:"投影: 正交"})]}),e.jsxs(p,{orthographic:!0,camera:{position:[0,20,0],zoom:50},gl:{antialias:!0},children:[e.jsx(O,{onStatsUpdate:r}),e.jsxs(n.Suspense,{fallback:null,children:[e.jsx(v,{}),e.jsx(h,{enableRotate:!1,enableDamping:!0,dampingFactor:.05,minZoom:20,maxZoom:100})]})]})]})}function L({onStatsUpdate:t}){return c(i=>{const r=i.camera;t({angle:Math.round(Math.atan2(r.position.z,r.position.x)*180/Math.PI),distance:Math.round(r.position.length())})}),null}function A(){const[t,i]=n.useState({angle:0,distance:0}),r=n.useCallback(o=>{i(o)},[]);return e.jsxs(m,{children:[e.jsx(x,{children:"侧视图 - 固定角度"}),e.jsxs(u,{children:[e.jsxs("div",{className:"stat-line",children:["角度: ",t.angle,"°"]}),e.jsxs("div",{className:"stat-line",children:["距离: ",t.distance]}),e.jsx("div",{className:"stat-line",children:"模式: 固定"})]}),e.jsxs(p,{camera:{position:[15,0,0],fov:60},gl:{antialias:!0},children:[e.jsx(L,{onStatsUpdate:r}),e.jsxs(n.Suspense,{fallback:null,children:[e.jsx(v,{}),e.jsx(h,{enablePan:!1,enableZoom:!0,enableRotate:!1,minDistance:10,maxDistance:25})]})]})]})}function I({onStatsUpdate:t,cameraMode:i,fov:r,zoom:o}){return c(s=>{t({mode:i,fov:i==="perspective"?r:o})}),null}function U(){const[t,i]=n.useState("perspective"),[r,o]=n.useState({mode:"perspective",fov:75}),{cameraType:s,fov:g,zoom:b}=y("自由视角",{cameraType:{value:"perspective",options:{透视相机:"perspective",正交相机:"orthographic"},label:"相机类型"},fov:{value:75,min:30,max:120,step:5,label:"FOV"},zoom:{value:50,min:10,max:100,step:5,label:"正交缩放"}});n.useEffect(()=>{i(s)},[s]);const C=n.useCallback(E=>{o(E)},[]);return e.jsxs(m,{children:[e.jsx(x,{children:"自由视角 - 可切换"}),e.jsxs(u,{children:[e.jsxs("div",{className:"stat-line",children:["模式: ",r.mode]}),e.jsxs("div",{className:"stat-line",children:[t==="perspective"?"FOV":"缩放",": ",r.fov]}),e.jsx("div",{className:"stat-line",children:"控制: 完全自由"})]}),e.jsxs(p,{orthographic:t==="orthographic",camera:t==="perspective"?{position:[5,5,5],fov:g}:{position:[5,5,5],zoom:b},gl:{antialias:!0},children:[e.jsx(I,{onStatsUpdate:C,cameraMode:t,fov:g,zoom:b}),e.jsxs(n.Suspense,{fallback:null,children:[e.jsx(v,{}),e.jsx(h,{enableDamping:!0,dampingFactor:.05,minDistance:2,maxDistance:20})]})]})]})}function Y(){return e.jsxs(M,{children:[e.jsxs(R,{children:[e.jsx(F,{}),e.jsx(B,{}),e.jsx(A,{}),e.jsx(U,{})]}),e.jsxs(N,{initial:{x:350},animate:{x:0},transition:{duration:.5},children:[e.jsx(D,{children:"📱 多视角渲染"}),e.jsx(j,{children:"多视角渲染技术允许同时从不同角度和投影方式观察同一个3D场景，常用于3D建模软件、游戏开发工具和科学可视化应用。"}),e.jsx("h3",{style:{color:"var(--accent-color)",marginBottom:"1rem"},children:"视角类型"}),e.jsxs(l,{children:[e.jsxs("li",{children:[e.jsx("code",{children:"主视角"})," - 透视相机，自由移动控制"]}),e.jsxs("li",{children:[e.jsx("code",{children:"顶视图"})," - 正交投影，俯视角度"]}),e.jsxs("li",{children:[e.jsx("code",{children:"侧视图"})," - 固定角度，侧面观察"]}),e.jsxs("li",{children:[e.jsx("code",{children:"自由视角"})," - 可切换相机类型"]})]}),e.jsx("h3",{style:{color:"var(--accent-color)",marginBottom:"1rem"},children:"技术特性"}),e.jsxs(l,{children:[e.jsxs("li",{children:[e.jsx("code",{children:"共享场景"})," - 所有视角渲染同一场景"]}),e.jsxs("li",{children:[e.jsx("code",{children:"独立控制"})," - 每个视角独立的相机控制"]}),e.jsxs("li",{children:[e.jsx("code",{children:"实时同步"})," - 场景变化实时反映到所有视角"]}),e.jsxs("li",{children:[e.jsx("code",{children:"性能优化"})," - 智能剔除和LOD管理"]}),e.jsxs("li",{children:[e.jsx("code",{children:"响应式布局"})," - 自适应视口大小"]})]}),e.jsx("h3",{style:{color:"var(--accent-color)",marginBottom:"1rem"},children:"相机系统"}),e.jsxs(l,{children:[e.jsxs("li",{children:[e.jsx("code",{children:"透视相机"})," - 模拟人眼视觉，有景深效果"]}),e.jsxs("li",{children:[e.jsx("code",{children:"正交相机"})," - 平行投影，无透视变形"]}),e.jsxs("li",{children:[e.jsx("code",{children:"视锥剔除"})," - 只渲染视野内的对象"]}),e.jsxs("li",{children:[e.jsx("code",{children:"近远裁剪"})," - 控制渲染距离范围"]})]}),e.jsx("h3",{style:{color:"var(--accent-color)",marginBottom:"1rem"},children:"应用场景"}),e.jsxs(j,{children:["• 3D建模和动画软件",e.jsx("br",{}),"• 游戏关卡编辑器",e.jsx("br",{}),"• 建筑设计可视化",e.jsx("br",{}),"• 医学影像分析",e.jsx("br",{}),"• 工程CAD系统"]}),e.jsx("h3",{style:{color:"var(--accent-color)",marginBottom:"1rem"},children:"性能优化"}),e.jsxs(l,{children:[e.jsxs("li",{children:[e.jsx("code",{children:"视锥剔除"})," - 剔除视野外的对象"]}),e.jsxs("li",{children:[e.jsx("code",{children:"LOD系统"})," - 根据距离调整细节级别"]}),e.jsxs("li",{children:[e.jsx("code",{children:"实例化渲染"})," - 批量渲染相同对象"]}),e.jsxs("li",{children:[e.jsx("code",{children:"纹理共享"})," - 多视角共享纹理资源"]}),e.jsxs("li",{children:[e.jsx("code",{children:"渲染队列"})," - 优化渲染顺序"]})]}),e.jsx("h3",{style:{color:"var(--accent-color)",marginBottom:"1rem"},children:"交互特性"}),e.jsxs(j,{children:["• 独立的相机控制器",e.jsx("br",{}),"• 视角间的焦点同步",e.jsx("br",{}),"• 鼠标悬停高亮",e.jsx("br",{}),"• 键盘快捷键切换",e.jsx("br",{}),"• 视角状态保存"]}),e.jsxs(H,{children:[e.jsx("summary",{children:"🔍 查看核心代码"}),e.jsx("pre",{children:`// 多视角渲染管理器
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
})`})]})]})]})}export{Y as default};
//# sourceMappingURL=MultiViewport-bb9a0bf0.js.map
