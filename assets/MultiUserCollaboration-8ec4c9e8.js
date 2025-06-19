import{r as o,j as e,C as O,O as D,u as x,B as p,T as v,a as y,g as I}from"./react-three-vendor-8ce1f887.js";import{u as z}from"./leva.esm-b659d5ba.js";import{d as h}from"./style-vendor-f8a8899f.js";import{e as L}from"./three-vendor-1aa2ed72.js";import{m as N}from"./animation-vendor-2dec0a74.js";const B=h.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  position: relative;
  padding-top: 80px;
`,R=h.div`
  flex: 1;
  height: calc(100vh - 80px);
  position: relative;
`,E=h(N.div)`
  width: 350px;
  background: rgba(26, 26, 26, 0.95);
  backdrop-filter: blur(20px);
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem;
  overflow-y: auto;
  z-index: 100;
`,T=h.h2`
  color: var(--accent-color);
  font-size: 1.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`,b=h.p`
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
`,C=h.ul`
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
`,P=h.details`
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
`,A=h.div`
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  
  .connection-status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
    
    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: ${s=>s.connected?"#4CAF50":"#f44336"};
    }
    
    .status-text {
      color: ${s=>s.connected?"#4CAF50":"#f44336"};
      font-weight: 600;
    }
  }
  
  .user-list {
    .user-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem;
      margin-bottom: 0.5rem;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 4px;
      
      .user-color {
        width: 12px;
        height: 12px;
        border-radius: 50%;
      }
      
      .user-name {
        color: var(--text-secondary);
        font-size: 0.9rem;
      }
      
      .user-status {
        margin-left: auto;
        font-size: 0.8rem;
        color: var(--accent-color);
      }
    }
  }
`,F=h.button`
  background: ${s=>s.active?"var(--accent-color)":"rgba(255, 255, 255, 0.1)"};
  color: ${s=>s.active?"#000":"var(--text-secondary)"};
  border: 1px solid ${s=>s.active?"var(--accent-color)":"rgba(255, 255, 255, 0.2)"};
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  margin: 0.25rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--accent-color);
    color: #000;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;class M{constructor(){this.users=new Map,this.localUser={id:this.generateUserId(),name:`用户${Math.floor(Math.random()*1e3)}`,color:this.generateUserColor(),cursor:{x:0,y:0,z:0},camera:{position:[0,0,5],target:[0,0,0]},selection:null},this.connected=!1,this.callbacks={onUserJoin:()=>{},onUserLeave:()=>{},onUserUpdate:()=>{},onObjectUpdate:()=>{},onConnectionChange:()=>{}},this.simulateUsers()}generateUserId(){return"user_"+Math.random().toString(36).substr(2,9)}generateUserColor(){const t=["#ff6b6b","#4ecdc4","#45b7d1","#96ceb4","#feca57","#ff9ff3","#54a0ff","#5f27cd"];return t[Math.floor(Math.random()*t.length)]}simulateUsers(){[{name:"设计师Alice",color:"#ff6b6b"},{name:"开发者Bob",color:"#4ecdc4"},{name:"产品经理Carol",color:"#45b7d1"}].forEach((a,c)=>{const n=this.generateUserId();this.users.set(n,{id:n,name:a.name,color:a.color,cursor:{x:(Math.random()-.5)*10,y:(Math.random()-.5)*10,z:(Math.random()-.5)*10},camera:{position:[Math.random()*10-5,Math.random()*10-5,Math.random()*10-5],target:[0,0,0]},selection:null,lastUpdate:Date.now()})})}connect(){setTimeout(()=>{this.connected=!0,this.callbacks.onConnectionChange(!0),this.startUserSimulation()},1e3)}disconnect(){this.connected=!1,this.callbacks.onConnectionChange(!1),this.users.clear()}startUserSimulation(){setInterval(()=>{this.connected&&this.users.forEach((t,a)=>{t.cursor.x+=(Math.random()-.5)*.5,t.cursor.y+=(Math.random()-.5)*.5,t.cursor.z+=(Math.random()-.5)*.5,t.cursor.x=Math.max(-10,Math.min(10,t.cursor.x)),t.cursor.y=Math.max(-10,Math.min(10,t.cursor.y)),t.cursor.z=Math.max(-10,Math.min(10,t.cursor.z)),t.lastUpdate=Date.now(),this.callbacks.onUserUpdate(t)})},100),setInterval(()=>{this.connected&&this.users.forEach((t,a)=>{Math.random()<.1&&(t.selection=Math.random()<.5?`object_${Math.floor(Math.random()*5)}`:null,this.callbacks.onUserUpdate(t))})},2e3)}updateLocalUser(t){Object.assign(this.localUser,t)}selectObject(t){this.localUser.selection=t,this.callbacks.onObjectUpdate({type:"select",objectId:t,userId:this.localUser.id})}moveObject(t,a){this.callbacks.onObjectUpdate({type:"move",objectId:t,position:a,userId:this.localUser.id})}on(t,a){this.callbacks[t]=a}getUsers(){return Array.from(this.users.values())}getLocalUser(){return this.localUser}}function w({user:s,isLocal:t=!1}){const a=o.useRef(),c=o.useRef();return x(()=>{a.current&&(a.current.position.set(s.cursor.x,s.cursor.y,s.cursor.z),t||(a.current.position.y+=Math.sin(Date.now()*.003)*.1)),c.current&&c.current.position.set(s.cursor.x,s.cursor.y+.5,s.cursor.z)}),e.jsxs("group",{children:[e.jsxs("group",{ref:a,children:[e.jsx(y,{args:[.05],position:[0,0,0],children:e.jsx("meshBasicMaterial",{color:s.color})}),e.jsx(I,{args:[.01,.02,.3],position:[0,-.15,0],children:e.jsx("meshBasicMaterial",{color:s.color,transparent:!0,opacity:.7})}),s.selection&&e.jsx(y,{args:[.1],position:[0,0,0],children:e.jsx("meshBasicMaterial",{color:s.color,transparent:!0,opacity:.3,wireframe:!0})})]}),e.jsx(v,{ref:c,fontSize:.2,color:s.color,anchorX:"center",anchorY:"bottom",children:s.name})]})}function $({id:s,position:t,color:a,onSelect:c,selectedBy:n}){const l=o.useRef(),[m,g]=o.useState(!1);x(j=>{if(l.current){l.current.rotation.x=j.clock.elapsedTime*.5,l.current.rotation.y=j.clock.elapsedTime*.3;const U=n?1.2:m?1.1:1;l.current.scale.setScalar(U)}});const f=()=>{c(s)};return e.jsxs(p,{ref:l,position:t,args:[1,1,1],onClick:f,onPointerOver:()=>g(!0),onPointerOut:()=>g(!1),children:[e.jsx("meshStandardMaterial",{color:n?n.color:a,emissive:n?n.color:"#000000",emissiveIntensity:n?.3:0,wireframe:!!n}),n&&e.jsx(p,{args:[1.1,1.1,1.1],children:e.jsx("meshBasicMaterial",{color:n.color,transparent:!0,opacity:.2,wireframe:!0})})]})}function _({user:s}){const t=o.useRef();return x(()=>{t.current&&(t.current.position.set(...s.camera.position),t.current.lookAt(...s.camera.target))}),e.jsxs("group",{ref:t,children:[e.jsx(p,{args:[.2,.1,.3],children:e.jsx("meshBasicMaterial",{color:s.color})}),e.jsx("group",{children:e.jsx(I,{args:[.01,.01,2],position:[0,0,-1],children:e.jsx("meshBasicMaterial",{color:s.color,transparent:!0,opacity:.5})})})]})}function W(){const[s]=o.useState(()=>new M),[t,a]=o.useState([]),[c,n]=o.useState(!1),[l,m]=o.useState([{id:"object_0",position:[-3,0,0],color:"#ff6b6b",selectedBy:null},{id:"object_1",position:[-1,0,0],color:"#4ecdc4",selectedBy:null},{id:"object_2",position:[1,0,0],color:"#45b7d1",selectedBy:null},{id:"object_3",position:[3,0,0],color:"#96ceb4",selectedBy:null},{id:"object_4",position:[0,2,0],color:"#feca57",selectedBy:null}]),{showUserCursors:g,showCameraFrustums:f,enableVoiceChat:j,showUserNames:U}=z("协作设置",{showUserCursors:{value:!0,label:"显示用户光标"},showCameraFrustums:{value:!1,label:"显示相机视锥"},enableVoiceChat:{value:!1,label:"启用语音聊天"},showUserNames:{value:!0,label:"显示用户名"}});o.useEffect(()=>(s.on("onConnectionChange",n),s.on("onUserUpdate",r=>{a(u=>{const i=[...u],d=i.findIndex(k=>k.id===r.id);return d>=0?i[d]=r:i.push(r),i})}),s.on("onObjectUpdate",r=>{r.type==="select"&&m(u=>u.map(i=>({...i,selectedBy:i.id===r.objectId?t.find(d=>d.id===r.userId)||s.getLocalUser():i.selectedBy})))}),a(s.getUsers()),()=>{s.disconnect()}),[s,t]),x(r=>{if(c){const{mouse:u,camera:i}=r,d=new L(u.x*5,u.y*5,0);d.unproject(i),s.updateLocalUser({cursor:{x:d.x,y:d.y,z:d.z},camera:{position:i.position.toArray(),target:[0,0,0]}})}});const S=r=>{s.selectObject(r)};return e.jsxs(e.Fragment,{children:[l.map(r=>e.jsx($,{id:r.id,position:r.position,color:r.color,selectedBy:r.selectedBy,onSelect:S},r.id)),c&&g&&e.jsxs(e.Fragment,{children:[t.map(r=>e.jsx(w,{user:r},r.id)),e.jsx(w,{user:s.getLocalUser(),isLocal:!0})]}),c&&f&&e.jsx(e.Fragment,{children:t.map(r=>e.jsx(_,{user:r},`camera_${r.id}`))}),e.jsx(p,{position:[0,-2,0],args:[20,.1,20],children:e.jsx("meshStandardMaterial",{color:"#2c2c2c",wireframe:!0})}),e.jsx("ambientLight",{intensity:.4}),e.jsx("directionalLight",{position:[10,10,5],intensity:.6}),e.jsx("pointLight",{position:[-10,5,-10],color:"#ff0080",intensity:.3}),e.jsx("pointLight",{position:[10,5,10],color:"#0080ff",intensity:.3}),e.jsx(v,{position:[0,4,0],fontSize:1.5,color:"#00ffff",anchorX:"center",anchorY:"middle",children:"多用户协作"}),e.jsx(v,{position:[0,3.5,0],fontSize:.5,color:"#ffffff",anchorX:"center",anchorY:"middle",children:c?`${t.length+1} 位用户在线`:"离线模式"})]})}function q(){const[s]=o.useState(()=>new M),[t,a]=o.useState(!1),[c,n]=o.useState([]);o.useEffect(()=>{s.on("onConnectionChange",a),s.on("onUserUpdate",()=>{n(s.getUsers())}),n(s.getUsers())},[s]);const l=()=>{t?s.disconnect():s.connect()};return e.jsxs(B,{children:[e.jsx(R,{children:e.jsx(O,{camera:{position:[8,5,8],fov:75},gl:{antialias:!0},children:e.jsxs(o.Suspense,{fallback:null,children:[e.jsx(W,{}),e.jsx(D,{enableDamping:!0,dampingFactor:.05,minDistance:3,maxDistance:30})]})})}),e.jsxs(E,{initial:{x:350},animate:{x:0},transition:{duration:.5},children:[e.jsx(T,{children:"👥 多用户协作"}),e.jsx(b,{children:"基于WebRTC的实时多用户协作系统，支持多人同时编辑3D场景，实时同步用户操作、光标位置和对象状态。"}),e.jsxs(A,{connected:t,children:[e.jsxs("div",{className:"connection-status",children:[e.jsx("div",{className:"status-dot"}),e.jsx("span",{className:"status-text",children:t?"已连接":"未连接"})]}),e.jsx(F,{active:t,onClick:l,children:t?"断开连接":"连接协作"}),t&&e.jsxs("div",{className:"user-list",children:[e.jsx("h4",{style:{color:"var(--accent-color)",marginBottom:"0.5rem"},children:"在线用户"}),e.jsxs("div",{className:"user-item",children:[e.jsx("div",{className:"user-color",style:{background:s.getLocalUser().color}}),e.jsxs("span",{className:"user-name",children:[s.getLocalUser().name," (你)"]}),e.jsx("span",{className:"user-status",children:"本地"})]}),c.map(m=>e.jsxs("div",{className:"user-item",children:[e.jsx("div",{className:"user-color",style:{background:m.color}}),e.jsx("span",{className:"user-name",children:m.name}),e.jsx("span",{className:"user-status",children:"在线"})]},m.id))]})]}),e.jsx("h3",{style:{color:"var(--accent-color)",marginBottom:"1rem"},children:"核心技术"}),e.jsxs(C,{children:[e.jsxs("li",{children:[e.jsx("code",{children:"WebRTC"})," - 点对点实时通信"]}),e.jsxs("li",{children:[e.jsx("code",{children:"WebSocket"})," - 信令服务器连接"]}),e.jsxs("li",{children:[e.jsx("code",{children:"操作同步"})," - 实时同步用户操作"]}),e.jsxs("li",{children:[e.jsx("code",{children:"冲突解决"})," - 处理并发编辑冲突"]}),e.jsxs("li",{children:[e.jsx("code",{children:"状态管理"})," - 分布式状态同步"]})]}),e.jsx("h3",{style:{color:"var(--accent-color)",marginBottom:"1rem"},children:"协作功能"}),e.jsxs(C,{children:[e.jsxs("li",{children:[e.jsx("code",{children:"实时光标"})," - 显示其他用户的鼠标位置"]}),e.jsxs("li",{children:[e.jsx("code",{children:"对象选择"})," - 多用户对象选择状态"]}),e.jsxs("li",{children:[e.jsx("code",{children:"相机同步"})," - 可选的视角同步"]}),e.jsxs("li",{children:[e.jsx("code",{children:"语音聊天"})," - 集成语音通信"]}),e.jsxs("li",{children:[e.jsx("code",{children:"文字聊天"})," - 实时文字交流"]})]}),e.jsx("h3",{style:{color:"var(--accent-color)",marginBottom:"1rem"},children:"数据同步"}),e.jsxs(C,{children:[e.jsxs("li",{children:[e.jsx("code",{children:"增量更新"})," - 只传输变化的数据"]}),e.jsxs("li",{children:[e.jsx("code",{children:"操作队列"})," - 保证操作顺序一致性"]}),e.jsxs("li",{children:[e.jsx("code",{children:"版本控制"})," - 支持撤销和重做"]}),e.jsxs("li",{children:[e.jsx("code",{children:"离线支持"})," - 离线操作缓存"]})]}),e.jsx("h3",{style:{color:"var(--accent-color)",marginBottom:"1rem"},children:"应用场景"}),e.jsxs(b,{children:["• 3D设计协作平台",e.jsx("br",{}),"• 虚拟会议室",e.jsx("br",{}),"• 在线教育培训",e.jsx("br",{}),"• 游戏开发工具",e.jsx("br",{}),"• 建筑设计评审"]}),e.jsx("h3",{style:{color:"var(--accent-color)",marginBottom:"1rem"},children:"技术挑战"}),e.jsxs(b,{children:["• 网络延迟处理",e.jsx("br",{}),"• 并发冲突解决",e.jsx("br",{}),"• 大规模用户支持",e.jsx("br",{}),"• 数据一致性保证",e.jsx("br",{}),"• 安全性和权限控制"]}),e.jsxs(P,{children:[e.jsx("summary",{children:"🔍 查看核心代码"}),e.jsx("pre",{children:`// WebRTC协作管理器
class CollaborationManager {
  constructor() {
    this.localUser = this.createUser()
    this.remoteUsers = new Map()
    this.peerConnections = new Map()
    this.dataChannels = new Map()
    this.signalingSocket = null
    
    this.setupSignaling()
  }
  
  async setupSignaling() {
    // 连接信令服务器
    this.signalingSocket = new WebSocket('wss://signaling-server.com')
    
    this.signalingSocket.onmessage = async (event) => {
      const message = JSON.parse(event.data)
      await this.handleSignalingMessage(message)
    }
  }
  
  async handleSignalingMessage(message) {
    switch (message.type) {
      case 'user-joined':
        await this.createPeerConnection(message.userId)
        break
        
      case 'offer':
        await this.handleOffer(message)
        break
        
      case 'answer':
        await this.handleAnswer(message)
        break
        
      case 'ice-candidate':
        await this.handleIceCandidate(message)
        break
        
      case 'user-left':
        this.handleUserLeft(message.userId)
        break
    }
  }
  
  async createPeerConnection(userId) {
    const peerConnection = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'turn:turn-server.com', username: 'user', credential: 'pass' }
      ]
    })
    
    // 创建数据通道
    const dataChannel = peerConnection.createDataChannel('collaboration', {
      ordered: true
    })
    
    dataChannel.onopen = () => {
      console.log('Data channel opened with', userId)
    }
    
    dataChannel.onmessage = (event) => {
      this.handleDataChannelMessage(userId, JSON.parse(event.data))
    }
    
    // ICE候选处理
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        this.sendSignalingMessage({
          type: 'ice-candidate',
          candidate: event.candidate,
          targetUserId: userId
        })
      }
    }
    
    this.peerConnections.set(userId, peerConnection)
    this.dataChannels.set(userId, dataChannel)
    
    // 创建offer
    const offer = await peerConnection.createOffer()
    await peerConnection.setLocalDescription(offer)
    
    this.sendSignalingMessage({
      type: 'offer',
      offer: offer,
      targetUserId: userId
    })
  }
  
  async handleOffer(message) {
    const peerConnection = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' }
      ]
    })
    
    // 处理数据通道
    peerConnection.ondatachannel = (event) => {
      const dataChannel = event.channel
      dataChannel.onmessage = (event) => {
        this.handleDataChannelMessage(message.userId, JSON.parse(event.data))
      }
      this.dataChannels.set(message.userId, dataChannel)
    }
    
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        this.sendSignalingMessage({
          type: 'ice-candidate',
          candidate: event.candidate,
          targetUserId: message.userId
        })
      }
    }
    
    await peerConnection.setRemoteDescription(message.offer)
    
    const answer = await peerConnection.createAnswer()
    await peerConnection.setLocalDescription(answer)
    
    this.sendSignalingMessage({
      type: 'answer',
      answer: answer,
      targetUserId: message.userId
    })
    
    this.peerConnections.set(message.userId, peerConnection)
  }
  
  handleDataChannelMessage(userId, data) {
    switch (data.type) {
      case 'cursor-update':
        this.updateUserCursor(userId, data.position)
        break
        
      case 'object-select':
        this.handleObjectSelection(userId, data.objectId)
        break
        
      case 'object-move':
        this.handleObjectMove(userId, data.objectId, data.position)
        break
        
      case 'camera-update':
        this.updateUserCamera(userId, data.camera)
        break
    }
  }
  
  // 广播数据到所有连接的用户
  broadcastData(data) {
    this.dataChannels.forEach((channel, userId) => {
      if (channel.readyState === 'open') {
        channel.send(JSON.stringify(data))
      }
    })
  }
  
  // 更新本地用户光标位置
  updateCursor(position) {
    this.localUser.cursor = position
    
    this.broadcastData({
      type: 'cursor-update',
      position: position,
      userId: this.localUser.id
    })
  }
  
  // 选择对象
  selectObject(objectId) {
    this.localUser.selectedObject = objectId
    
    this.broadcastData({
      type: 'object-select',
      objectId: objectId,
      userId: this.localUser.id
    })
  }
  
  // 移动对象
  moveObject(objectId, position) {
    this.broadcastData({
      type: 'object-move',
      objectId: objectId,
      position: position,
      userId: this.localUser.id
    })
  }
  
  // 更新相机位置
  updateCamera(camera) {
    this.localUser.camera = camera
    
    this.broadcastData({
      type: 'camera-update',
      camera: camera,
      userId: this.localUser.id
    })
  }
  
  sendSignalingMessage(message) {
    if (this.signalingSocket.readyState === WebSocket.OPEN) {
      this.signalingSocket.send(JSON.stringify(message))
    }
  }
  
  createUser() {
    return {
      id: this.generateUserId(),
      name: \`用户\${Math.floor(Math.random() * 1000)}\`,
      color: this.generateRandomColor(),
      cursor: { x: 0, y: 0, z: 0 },
      camera: { position: [0, 0, 5], target: [0, 0, 0] },
      selectedObject: null
    }
  }
}

// 使用示例
const collaboration = new CollaborationManager()

// 监听用户操作
document.addEventListener('mousemove', (event) => {
  const position = screenToWorldPosition(event.clientX, event.clientY)
  collaboration.updateCursor(position)
})

// 监听对象选择
scene.addEventListener('click', (event) => {
  const intersects = raycaster.intersectObjects(scene.children)
  if (intersects.length > 0) {
    collaboration.selectObject(intersects[0].object.userData.id)
  }
})

// 监听相机变化
controls.addEventListener('change', () => {
  collaboration.updateCamera({
    position: camera.position.toArray(),
    target: controls.target.toArray()
  })
})`})]})]})]})}export{q as default};
//# sourceMappingURL=MultiUserCollaboration-8ec4c9e8.js.map
