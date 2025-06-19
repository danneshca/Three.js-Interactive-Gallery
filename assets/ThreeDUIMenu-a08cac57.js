import{f as L,j as e,C as H,r as c,O as z,a as B,T as N,u as M,H as P,P as F,B as U}from"./react-three-vendor-8ce1f887.js";import{u as O}from"./leva.esm-b659d5ba.js";import{d as m}from"./style-vendor-f8a8899f.js";import{e as g,b9 as D,J as k,d as Y,aW as A,G as V}from"./three-vendor-1aa2ed72.js";import{m as $}from"./animation-vendor-2dec0a74.js";new g;new g;class X extends D{constructor(n=document.createElement("div")){super(),this.isCSS3DObject=!0,this.element=n,this.element.style.position="absolute",this.element.style.pointerEvents="auto",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.addEventListener("removed",function(){this.traverse(function(t){t.element instanceof Element&&t.element.parentNode!==null&&t.element.parentNode.removeChild(t.element)})})}copy(n,t){return super.copy(n,t),this.element=n.element.cloneNode(!0),this}}new k;new k;class G extends D{constructor(n=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=n,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new Y(.5,.5),this.addEventListener("removed",function(){this.traverse(function(t){t.element instanceof Element&&t.element.parentNode!==null&&t.element.parentNode.removeChild(t.element)})})}copy(n,t){return super.copy(n,t),this.element=n.element.cloneNode(!0),this.center=n.center,this}}new g;new k;new k;new g;new g;L({CSS3DObject:X,CSS2DObject:G});const W=m.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  position: relative;
  padding-top: 80px;
`,q=m.div`
  flex: 1;
  height: calc(100vh - 80px);
  position: relative;
`,J=m($.div)`
  width: 350px;
  background: rgba(26, 26, 26, 0.95);
  backdrop-filter: blur(20px);
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem;
  overflow-y: auto;
  z-index: 100;
`,K=m.h2`
  color: var(--accent-color);
  font-size: 1.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`,v=m.p`
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
`,w=m.ul`
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
`,Q=m.details`
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
`,Z=m.div`
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
`,_=m.div`
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
`,ee=m.div`
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
`;function S({position:i,rotation:n,title:t,children:o,onClose:r,visible:s=!0}){const a=c.useRef(),[d,p]=c.useState(!1);return M(f=>{if(a.current&&s){a.current.position.y=i[1]+Math.sin(f.clock.elapsedTime*2)*.05;const u=d?1.05:1;a.current.scale.lerp(new g(u,u,u),.1)}}),s?e.jsxs("group",{ref:a,position:i,rotation:n,onPointerEnter:()=>p(!0),onPointerLeave:()=>p(!1),children:[e.jsx(P,{transform:!0,occlude:!0,distanceFactor:10,position:[0,0,.01],children:e.jsxs(Z,{children:[e.jsxs("div",{className:"panel-header",children:[e.jsx("h3",{children:t}),r&&e.jsx("div",{className:"close-btn",onClick:r,children:"×"})]}),e.jsx("div",{className:"panel-content",children:o})]})}),e.jsx(F,{args:[3.5,2.5],children:e.jsx("meshBasicMaterial",{color:d?"#001122":"#000011",transparent:!0,opacity:.1})})]}):null}function te({position:i,items:n,onItemClick:t}){const o=c.useRef(),[r,s]=c.useState(!1);M(d=>{o.current&&(o.current.rotation.z=d.clock.elapsedTime*.2)});const a=()=>{s(!r)};return e.jsx("group",{ref:o,position:i,children:e.jsx(P,{transform:!0,distanceFactor:8,children:e.jsxs(_,{children:[e.jsx("button",{className:"center-button",onClick:a,children:r?"×":"☰"}),r&&e.jsx("div",{className:"menu-items",children:n.map((d,p)=>{const f=p/n.length*Math.PI*2,u=80,j=Math.cos(f)*u,x=Math.sin(f)*u;return e.jsx("div",{className:"menu-item",style:{left:`calc(50% + ${j}px - 20px)`,top:`calc(50% + ${x}px - 20px)`},onClick:()=>t(d),children:d.icon},p)})})]})})})}function ne({position:i,tabs:n,activeTab:t,onTabChange:o}){return e.jsx("group",{position:i,children:e.jsx(P,{transform:!0,distanceFactor:12,children:e.jsxs(ee,{children:[e.jsx("div",{className:"tab-headers",children:n.map((r,s)=>e.jsx("div",{className:`tab-header ${t===s?"active":""}`,onClick:()=>o(s),children:r.title},s))}),e.jsx("div",{className:"tab-content",children:n[t]&&n[t].content})]})})})}function C({position:i,text:n,color:t="#00ffff",onClick:o}){const r=c.useRef(),[s,a]=c.useState(!1),[d,p]=c.useState(!1);M(u=>{if(r.current){const j=i[1]+(s?.1:0)+(d?-.05:0);r.current.position.y=V.lerp(r.current.position.y,j,.1);const x=s?1.1:1;r.current.scale.lerp(new g(x,x,x),.1)}});const f=()=>{p(!0),setTimeout(()=>p(!1),150),o&&o()};return e.jsxs("group",{ref:r,position:i,onPointerEnter:()=>a(!0),onPointerLeave:()=>a(!1),onClick:f,children:[e.jsx(U,{args:[2,.5,.2],children:e.jsx("meshStandardMaterial",{color:s?"#ffffff":t,emissive:s?t:"#000000",emissiveIntensity:s?.2:0})}),e.jsx(N,{position:[0,0,.11],fontSize:.2,color:s?"#000000":"#ffffff",anchorX:"center",anchorY:"middle",children:n})]})}function se(){const[i,n]=c.useState({settings:!0,tools:!0,info:!1}),[t,o]=c.useState(0),[r,s]=c.useState("#00ffff"),[a,d]=c.useState(50),{showPanels:p,showButtons:f,showCircularMenu:u,showTabMenu:j,panelDistance:x,animationSpeed:re}=O("3D UI 设置",{showPanels:{value:!0,label:"显示面板"},showButtons:{value:!0,label:"显示按钮"},showCircularMenu:{value:!0,label:"显示圆形菜单"},showTabMenu:{value:!0,label:"显示标签菜单"},panelDistance:{value:5,min:3,max:10,step:.5,label:"面板距离"},animationSpeed:{value:1,min:.1,max:3,step:.1,label:"动画速度"}}),T=[{icon:"🏠",label:"主页",action:"home"},{icon:"⚙️",label:"设置",action:"settings"},{icon:"📊",label:"数据",action:"data"},{icon:"💡",label:"帮助",action:"help"},{icon:"🔍",label:"搜索",action:"search"},{icon:"📁",label:"文件",action:"files"}],I=[{title:"概览",content:e.jsxs("div",{className:"content-section",children:[e.jsx("h4",{children:"系统状态"}),e.jsx("p",{children:"所有系统运行正常，性能良好。"}),e.jsxs("div",{className:"action-buttons",children:[e.jsx("button",{children:"刷新"}),e.jsx("button",{children:"详情"})]})]})},{title:"设置",content:e.jsxs("div",{className:"content-section",children:[e.jsx("h4",{children:"系统配置"}),e.jsx("p",{children:"调整系统参数和偏好设置。"}),e.jsxs("div",{className:"action-buttons",children:[e.jsx("button",{children:"保存"}),e.jsx("button",{children:"重置"})]})]})},{title:"工具",content:e.jsxs("div",{className:"content-section",children:[e.jsx("h4",{children:"实用工具"}),e.jsx("p",{children:"访问各种系统工具和实用程序。"}),e.jsxs("div",{className:"action-buttons",children:[e.jsx("button",{children:"启动"}),e.jsx("button",{children:"配置"})]})]})}],R=["#ff0000","#00ff00","#0000ff","#ffff00","#ff00ff","#00ffff"],E=l=>{console.log("圆形菜单点击:",l)},h=l=>{console.log("按钮点击:",l),l==="toggle-info"&&n(b=>({...b,info:!b.info}))},y=l=>{n(b=>({...b,[l]:!1}))};return e.jsxs(e.Fragment,{children:[e.jsx("ambientLight",{intensity:.4}),e.jsx("directionalLight",{position:[10,10,5],intensity:.6}),e.jsx("pointLight",{position:[-10,5,-10],color:"#ff0080",intensity:.3}),e.jsx("pointLight",{position:[10,5,10],color:"#0080ff",intensity:.3}),e.jsx(B,{args:[50],position:[0,0,0],children:e.jsx("meshBasicMaterial",{color:"#000011",side:A})}),p&&e.jsxs(e.Fragment,{children:[e.jsxs(S,{position:[-x,2,0],rotation:[0,Math.PI/6,0],title:"设置面板",visible:i.settings,onClose:()=>y("settings"),children:[e.jsxs("div",{className:"menu-item",onClick:()=>h("option1"),children:[e.jsx("span",{className:"icon",children:"🎨"}),e.jsx("span",{className:"label",children:"主题设置"})]}),e.jsxs("div",{className:"menu-item",onClick:()=>h("option2"),children:[e.jsx("span",{className:"icon",children:"🔊"}),e.jsx("span",{className:"label",children:"音频设置"})]}),e.jsxs("div",{className:"menu-item",onClick:()=>h("option3"),children:[e.jsx("span",{className:"icon",children:"🌐"}),e.jsx("span",{className:"label",children:"网络设置"})]}),e.jsxs("div",{className:"slider-control",children:[e.jsxs("label",{children:["音量: ",a,"%"]}),e.jsx("input",{type:"range",min:"0",max:"100",value:a,onChange:l=>d(l.target.value)})]}),e.jsxs("div",{className:"color-picker",children:[e.jsx("label",{children:"主题颜色"}),e.jsx("div",{className:"color-options",children:R.map((l,b)=>e.jsx("div",{className:`color-option ${r===l?"selected":""}`,style:{backgroundColor:l},onClick:()=>s(l)},b))})]})]}),e.jsxs(S,{position:[x,2,0],rotation:[0,-Math.PI/6,0],title:"工具面板",visible:i.tools,onClose:()=>y("tools"),children:[e.jsxs("div",{className:"menu-item",onClick:()=>h("tool1"),children:[e.jsx("span",{className:"icon",children:"📐"}),e.jsx("span",{className:"label",children:"测量工具"})]}),e.jsxs("div",{className:"menu-item",onClick:()=>h("tool2"),children:[e.jsx("span",{className:"icon",children:"✏️"}),e.jsx("span",{className:"label",children:"绘图工具"})]}),e.jsxs("div",{className:"menu-item",onClick:()=>h("tool3"),children:[e.jsx("span",{className:"icon",children:"🔍"}),e.jsx("span",{className:"label",children:"检查工具"})]}),e.jsxs("div",{className:"menu-item",onClick:()=>h("tool4"),children:[e.jsx("span",{className:"icon",children:"📊"}),e.jsx("span",{className:"label",children:"分析工具"})]})]}),e.jsxs(S,{position:[0,2,-x],rotation:[0,0,0],title:"信息面板",visible:i.info,onClose:()=>y("info"),children:[e.jsxs("div",{className:"menu-item",children:[e.jsx("span",{className:"icon",children:"📈"}),e.jsx("span",{className:"label",children:"性能监控"})]}),e.jsxs("div",{className:"menu-item",children:[e.jsx("span",{className:"icon",children:"💾"}),e.jsx("span",{className:"label",children:"存储状态"})]}),e.jsxs("div",{className:"menu-item",children:[e.jsx("span",{className:"icon",children:"🌡️"}),e.jsx("span",{className:"label",children:"系统温度"})]})]})]}),u&&e.jsx(te,{position:[-3,-1,2],items:T,onItemClick:E}),j&&e.jsx(ne,{position:[3,-1,2],tabs:I,activeTab:t,onTabChange:o}),f&&e.jsxs(e.Fragment,{children:[e.jsx(C,{position:[-2,-2,0],text:"开始",color:"#00ff00",onClick:()=>h("start")}),e.jsx(C,{position:[0,-2,0],text:"暂停",color:"#ffff00",onClick:()=>h("pause")}),e.jsx(C,{position:[2,-2,0],text:"停止",color:"#ff0000",onClick:()=>h("stop")}),e.jsx(C,{position:[0,-3,0],text:"信息",color:"#00ffff",onClick:()=>h("toggle-info")})]}),e.jsx(N,{position:[0,5,0],fontSize:1.5,color:"#00ffff",anchorX:"center",anchorY:"middle",children:"3D UI 菜单系统"}),e.jsx(N,{position:[0,4.5,0],fontSize:.5,color:"#ffffff",anchorX:"center",anchorY:"middle",children:"交互式三维用户界面演示"})]})}function de(){return e.jsxs(W,{children:[e.jsx(q,{children:e.jsx(H,{camera:{position:[0,0,10],fov:75},gl:{antialias:!0},children:e.jsxs(c.Suspense,{fallback:null,children:[e.jsx(se,{}),e.jsx(z,{enableDamping:!0,dampingFactor:.05,minDistance:5,maxDistance:20,maxPolarAngle:Math.PI/1.5})]})})}),e.jsxs(J,{initial:{x:350},animate:{x:0},transition:{duration:.5},children:[e.jsx(K,{children:"🎛️ 3D UI 菜单"}),e.jsx(v,{children:"创新的三维用户界面系统，将传统的2D界面元素融入3D空间，提供沉浸式的交互体验和直观的空间导航。"}),e.jsx("h3",{style:{color:"var(--accent-color)",marginBottom:"1rem"},children:"核心特性"}),e.jsxs(w,{children:[e.jsxs("li",{children:[e.jsx("code",{children:"3D面板"})," - 浮动在3D空间中的交互面板"]}),e.jsxs("li",{children:[e.jsx("code",{children:"圆形菜单"})," - 径向布局的快速访问菜单"]}),e.jsxs("li",{children:[e.jsx("code",{children:"标签界面"})," - 多页面内容的3D标签系统"]}),e.jsxs("li",{children:[e.jsx("code",{children:"立体按钮"})," - 具有深度感的3D按钮"]}),e.jsxs("li",{children:[e.jsx("code",{children:"空间导航"})," - 基于3D坐标的界面布局"]})]}),e.jsx("h3",{style:{color:"var(--accent-color)",marginBottom:"1rem"},children:"交互方式"}),e.jsxs(w,{children:[e.jsxs("li",{children:[e.jsx("code",{children:"鼠标悬停"})," - 元素高亮和缩放效果"]}),e.jsxs("li",{children:[e.jsx("code",{children:"点击交互"})," - 3D按钮和菜单项响应"]}),e.jsxs("li",{children:[e.jsx("code",{children:"拖拽操作"})," - 面板位置和大小调整"]}),e.jsxs("li",{children:[e.jsx("code",{children:"手势控制"})," - 支持触摸和手势操作"]}),e.jsxs("li",{children:[e.jsx("code",{children:"键盘快捷键"})," - 快速访问和导航"]})]}),e.jsx("h3",{style:{color:"var(--accent-color)",marginBottom:"1rem"},children:"技术实现"}),e.jsxs(w,{children:[e.jsxs("li",{children:[e.jsx("code",{children:"CSS3DRenderer"})," - HTML元素的3D渲染"]}),e.jsxs("li",{children:[e.jsx("code",{children:"CSS2DRenderer"})," - 2D标签的3D定位"]}),e.jsxs("li",{children:[e.jsx("code",{children:"Html组件"})," - React Three Fiber的HTML集成"]}),e.jsxs("li",{children:[e.jsx("code",{children:"Transform3D"})," - CSS 3D变换和动画"]}),e.jsxs("li",{children:[e.jsx("code",{children:"事件系统"})," - 3D空间中的事件处理"]})]}),e.jsx("h3",{style:{color:"var(--accent-color)",marginBottom:"1rem"},children:"设计原则"}),e.jsxs(v,{children:["• 空间层次感和深度感",e.jsx("br",{}),"• 直观的视觉反馈",e.jsx("br",{}),"• 流畅的动画过渡",e.jsx("br",{}),"• 一致的交互模式",e.jsx("br",{}),"• 可访问性和易用性"]}),e.jsx("h3",{style:{color:"var(--accent-color)",marginBottom:"1rem"},children:"应用场景"}),e.jsxs(v,{children:["• VR/AR应用界面",e.jsx("br",{}),"• 3D建模软件",e.jsx("br",{}),"• 游戏用户界面",e.jsx("br",{}),"• 数据可视化控制台",e.jsx("br",{}),"• 沉浸式展示系统"]}),e.jsx("h3",{style:{color:"var(--accent-color)",marginBottom:"1rem"},children:"性能优化"}),e.jsxs(v,{children:["• DOM元素的合理使用",e.jsx("br",{}),"• CSS3D硬件加速",e.jsx("br",{}),"• 事件委托和防抖",e.jsx("br",{}),"• 视锥体剔除优化",e.jsx("br",{}),"• 渲染层级管理"]}),e.jsxs(Q,{children:[e.jsx("summary",{children:"🔍 查看核心代码"}),e.jsx("pre",{children:`// 3D UI面板组件
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
uiManager.arrangeInCircle(panels, [0, 0, 0], 5)`})]})]})]})}export{de as default};
//# sourceMappingURL=ThreeDUIMenu-a08cac57.js.map
