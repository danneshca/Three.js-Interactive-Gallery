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

const ConnectionPanel = styled.div`
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
      background: ${props => props.connected ? '#4CAF50' : '#f44336'};
    }
    
    .status-text {
      color: ${props => props.connected ? '#4CAF50' : '#f44336'};
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
`

const ControlButton = styled.button`
  background: ${props => props.active ? 'var(--accent-color)' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.active ? '#000' : 'var(--text-secondary)'};
  border: 1px solid ${props => props.active ? 'var(--accent-color)' : 'rgba(255, 255, 255, 0.2)'};
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
`

// 模拟WebRTC连接管理器
class CollaborationManager {
  constructor() {
    this.users = new Map()
    this.localUser = {
      id: this.generateUserId(),
      name: `用户${Math.floor(Math.random() * 1000)}`,
      color: this.generateUserColor(),
      cursor: { x: 0, y: 0, z: 0 },
      camera: { position: [0, 0, 5], target: [0, 0, 0] },
      selection: null
    }
    this.connected = false
    this.callbacks = {
      onUserJoin: () => {},
      onUserLeave: () => {},
      onUserUpdate: () => {},
      onObjectUpdate: () => {},
      onConnectionChange: () => {}
    }
    
    // 模拟一些在线用户
    this.simulateUsers()
  }
  
  generateUserId() {
    return 'user_' + Math.random().toString(36).substr(2, 9)
  }
  
  generateUserColor() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd']
    return colors[Math.floor(Math.random() * colors.length)]
  }
  
  simulateUsers() {
    // 添加一些模拟用户
    const mockUsers = [
      { name: '设计师Alice', color: '#ff6b6b' },
      { name: '开发者Bob', color: '#4ecdc4' },
      { name: '产品经理Carol', color: '#45b7d1' }
    ]
    
    mockUsers.forEach((user, index) => {
      const userId = this.generateUserId()
      this.users.set(userId, {
        id: userId,
        name: user.name,
        color: user.color,
        cursor: {
          x: (Math.random() - 0.5) * 10,
          y: (Math.random() - 0.5) * 10,
          z: (Math.random() - 0.5) * 10
        },
        camera: {
          position: [
            Math.random() * 10 - 5,
            Math.random() * 10 - 5,
            Math.random() * 10 - 5
          ],
          target: [0, 0, 0]
        },
        selection: null,
        lastUpdate: Date.now()
      })
    })
  }
  
  connect() {
    // 模拟连接过程
    setTimeout(() => {
      this.connected = true
      this.callbacks.onConnectionChange(true)
      
      // 开始模拟用户活动
      this.startUserSimulation()
    }, 1000)
  }
  
  disconnect() {
    this.connected = false
    this.callbacks.onConnectionChange(false)
    this.users.clear()
  }
  
  startUserSimulation() {
    // 模拟用户光标移动
    setInterval(() => {
      if (!this.connected) return
      
      this.users.forEach((user, userId) => {
        // 随机移动光标
        user.cursor.x += (Math.random() - 0.5) * 0.5
        user.cursor.y += (Math.random() - 0.5) * 0.5
        user.cursor.z += (Math.random() - 0.5) * 0.5
        
        // 限制范围
        user.cursor.x = Math.max(-10, Math.min(10, user.cursor.x))
        user.cursor.y = Math.max(-10, Math.min(10, user.cursor.y))
        user.cursor.z = Math.max(-10, Math.min(10, user.cursor.z))
        
        user.lastUpdate = Date.now()
        this.callbacks.onUserUpdate(user)
      })
    }, 100)
    
    // 模拟用户偶尔选择对象
    setInterval(() => {
      if (!this.connected) return
      
      this.users.forEach((user, userId) => {
        if (Math.random() < 0.1) { // 10%概率选择对象
          user.selection = Math.random() < 0.5 ? `object_${Math.floor(Math.random() * 5)}` : null
          this.callbacks.onUserUpdate(user)
        }
      })
    }, 2000)
  }
  
  updateLocalUser(updates) {
    Object.assign(this.localUser, updates)
    // 在真实应用中，这里会通过WebRTC发送更新
  }
  
  selectObject(objectId) {
    this.localUser.selection = objectId
    this.callbacks.onObjectUpdate({
      type: 'select',
      objectId,
      userId: this.localUser.id
    })
  }
  
  moveObject(objectId, position) {
    this.callbacks.onObjectUpdate({
      type: 'move',
      objectId,
      position,
      userId: this.localUser.id
    })
  }
  
  on(event, callback) {
    this.callbacks[event] = callback
  }
  
  getUsers() {
    return Array.from(this.users.values())
  }
  
  getLocalUser() {
    return this.localUser
  }
}

// 用户光标组件
function UserCursor({ user, isLocal = false }) {
  const meshRef = useRef()
  const textRef = useRef()
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.set(user.cursor.x, user.cursor.y, user.cursor.z)
      
      // 添加轻微的浮动动画
      if (!isLocal) {
        meshRef.current.position.y += Math.sin(Date.now() * 0.003) * 0.1
      }
    }
    
    if (textRef.current) {
      textRef.current.position.set(
        user.cursor.x,
        user.cursor.y + 0.5,
        user.cursor.z
      )
    }
  })
  
  return (
    <group>
      {/* 光标指针 */}
      <group ref={meshRef}>
        <Sphere args={[0.05]} position={[0, 0, 0]}>
          <meshBasicMaterial color={user.color} />
        </Sphere>
        
        {/* 光标尾迹 */}
        <Cylinder args={[0.01, 0.02, 0.3]} position={[0, -0.15, 0]}>
          <meshBasicMaterial color={user.color} transparent opacity={0.7} />
        </Cylinder>
        
        {/* 选择指示器 */}
        {user.selection && (
          <Sphere args={[0.1]} position={[0, 0, 0]}>
            <meshBasicMaterial 
              color={user.color} 
              transparent 
              opacity={0.3}
              wireframe
            />
          </Sphere>
        )}
      </group>
      
      {/* 用户名标签 */}
      <Text
        ref={textRef}
        fontSize={0.2}
        color={user.color}
        anchorX="center"
        anchorY="bottom"
      >
        {user.name}
      </Text>
    </group>
  )
}

// 可交互对象组件
function InteractiveObject({ id, position, color, onSelect, selectedBy }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (meshRef.current) {
      // 旋转动画
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      
      // 选中时的缩放效果
      const scale = selectedBy ? 1.2 : hovered ? 1.1 : 1
      meshRef.current.scale.setScalar(scale)
    }
  })
  
  const handleClick = () => {
    onSelect(id)
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
        color={selectedBy ? selectedBy.color : color}
        emissive={selectedBy ? selectedBy.color : '#000000'}
        emissiveIntensity={selectedBy ? 0.3 : 0}
        wireframe={selectedBy ? true : false}
      />
      
      {/* 选中边框 */}
      {selectedBy && (
        <Box args={[1.1, 1.1, 1.1]}>
          <meshBasicMaterial 
            color={selectedBy.color}
            transparent
            opacity={0.2}
            wireframe
          />
        </Box>
      )}
    </Box>
  )
}

// 相机视锥可视化
function CameraFrustum({ user }) {
  const frustumRef = useRef()
  
  useFrame(() => {
    if (frustumRef.current) {
      frustumRef.current.position.set(...user.camera.position)
      frustumRef.current.lookAt(...user.camera.target)
    }
  })
  
  return (
    <group ref={frustumRef}>
      {/* 相机位置指示器 */}
      <Box args={[0.2, 0.1, 0.3]}>
        <meshBasicMaterial color={user.color} />
      </Box>
      
      {/* 视锥线框 */}
      <group>
        {/* 这里可以添加更复杂的视锥可视化 */}
        <Cylinder args={[0.01, 0.01, 2]} position={[0, 0, -1]}>
          <meshBasicMaterial color={user.color} transparent opacity={0.5} />
        </Cylinder>
      </group>
    </group>
  )
}

function Scene() {
  const [collaboration] = useState(() => new CollaborationManager())
  const [users, setUsers] = useState([])
  const [connected, setConnected] = useState(false)
  const [objects, setObjects] = useState([
    { id: 'object_0', position: [-3, 0, 0], color: '#ff6b6b', selectedBy: null },
    { id: 'object_1', position: [-1, 0, 0], color: '#4ecdc4', selectedBy: null },
    { id: 'object_2', position: [1, 0, 0], color: '#45b7d1', selectedBy: null },
    { id: 'object_3', position: [3, 0, 0], color: '#96ceb4', selectedBy: null },
    { id: 'object_4', position: [0, 2, 0], color: '#feca57', selectedBy: null }
  ])
  
  const {
    showUserCursors,
    showCameraFrustums,
    enableVoiceChat,
    showUserNames
  } = useControls('协作设置', {
    showUserCursors: { value: true, label: '显示用户光标' },
    showCameraFrustums: { value: false, label: '显示相机视锥' },
    enableVoiceChat: { value: false, label: '启用语音聊天' },
    showUserNames: { value: true, label: '显示用户名' }
  })
  
  useEffect(() => {
    // 设置协作事件监听
    collaboration.on('onConnectionChange', setConnected)
    collaboration.on('onUserUpdate', (user) => {
      setUsers(prev => {
        const newUsers = [...prev]
        const index = newUsers.findIndex(u => u.id === user.id)
        if (index >= 0) {
          newUsers[index] = user
        } else {
          newUsers.push(user)
        }
        return newUsers
      })
    })
    
    collaboration.on('onObjectUpdate', (update) => {
      if (update.type === 'select') {
        setObjects(prev => prev.map(obj => ({
          ...obj,
          selectedBy: obj.id === update.objectId ? 
            users.find(u => u.id === update.userId) || collaboration.getLocalUser() : 
            obj.selectedBy
        })))
      }
    })
    
    // 初始化用户列表
    setUsers(collaboration.getUsers())
    
    return () => {
      collaboration.disconnect()
    }
  }, [collaboration, users])
  
  // 鼠标移动更新本地用户光标
  useFrame((state) => {
    if (connected) {
      const { mouse, camera } = state
      
      // 将鼠标坐标转换为世界坐标
      const vector = new THREE.Vector3(mouse.x * 5, mouse.y * 5, 0)
      vector.unproject(camera)
      
      collaboration.updateLocalUser({
        cursor: { x: vector.x, y: vector.y, z: vector.z },
        camera: {
          position: camera.position.toArray(),
          target: [0, 0, 0] // 简化处理
        }
      })
    }
  })
  
  const handleObjectSelect = (objectId) => {
    collaboration.selectObject(objectId)
  }
  
  return (
    <>
      {/* 交互对象 */}
      {objects.map(obj => (
        <InteractiveObject
          key={obj.id}
          id={obj.id}
          position={obj.position}
          color={obj.color}
          selectedBy={obj.selectedBy}
          onSelect={handleObjectSelect}
        />
      ))}
      
      {/* 用户光标 */}
      {connected && showUserCursors && (
        <>
          {users.map(user => (
            <UserCursor key={user.id} user={user} />
          ))}
          <UserCursor user={collaboration.getLocalUser()} isLocal />
        </>
      )}
      
      {/* 相机视锥 */}
      {connected && showCameraFrustums && (
        <>
          {users.map(user => (
            <CameraFrustum key={`camera_${user.id}`} user={user} />
          ))}
        </>
      )}
      
      {/* 地面网格 */}
      <Box position={[0, -2, 0]} args={[20, 0.1, 20]}>
        <meshStandardMaterial color="#2c2c2c" wireframe />
      </Box>
      
      {/* 光照 */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.6} />
      <pointLight position={[-10, 5, -10]} color="#ff0080" intensity={0.3} />
      <pointLight position={[10, 5, 10]} color="#0080ff" intensity={0.3} />
      
      {/* 标题 */}
      <Text
        position={[0, 4, 0]}
        fontSize={1.5}
        color="#00ffff"
        anchorX="center"
        anchorY="middle"
      >
        多用户协作
      </Text>
      
      <Text
        position={[0, 3.5, 0]}
        fontSize={0.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {connected ? `${users.length + 1} 位用户在线` : '离线模式'}
      </Text>
    </>
  )
}

function MultiUserCollaboration() {
  const [collaboration] = useState(() => new CollaborationManager())
  const [connected, setConnected] = useState(false)
  const [users, setUsers] = useState([])
  
  useEffect(() => {
    collaboration.on('onConnectionChange', setConnected)
    collaboration.on('onUserUpdate', () => {
      setUsers(collaboration.getUsers())
    })
    
    setUsers(collaboration.getUsers())
  }, [collaboration])
  
  const handleConnect = () => {
    if (connected) {
      collaboration.disconnect()
    } else {
      collaboration.connect()
    }
  }
  
  return (
    <PageContainer>
      <CanvasContainer>
        <Canvas
          camera={{ position: [8, 5, 8], fov: 75 }}
          gl={{ antialias: true }}
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
          👥 多用户协作
        </InfoTitle>
        
        <InfoDescription>
          基于WebRTC的实时多用户协作系统，支持多人同时编辑3D场景，实时同步用户操作、光标位置和对象状态。
        </InfoDescription>
        
        <ConnectionPanel connected={connected}>
          <div className="connection-status">
            <div className="status-dot"></div>
            <span className="status-text">
              {connected ? '已连接' : '未连接'}
            </span>
          </div>
          
          <ControlButton 
            active={connected}
            onClick={handleConnect}
          >
            {connected ? '断开连接' : '连接协作'}
          </ControlButton>
          
          {connected && (
            <div className="user-list">
              <h4 style={{ color: 'var(--accent-color)', marginBottom: '0.5rem' }}>在线用户</h4>
              
              <div className="user-item">
                <div 
                  className="user-color" 
                  style={{ background: collaboration.getLocalUser().color }}
                ></div>
                <span className="user-name">{collaboration.getLocalUser().name} (你)</span>
                <span className="user-status">本地</span>
              </div>
              
              {users.map(user => (
                <div key={user.id} className="user-item">
                  <div 
                    className="user-color" 
                    style={{ background: user.color }}
                  ></div>
                  <span className="user-name">{user.name}</span>
                  <span className="user-status">在线</span>
                </div>
              ))}
            </div>
          )}
        </ConnectionPanel>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem' }}>核心技术</h3>
        <TechList>
          <li><code>WebRTC</code> - 点对点实时通信</li>
          <li><code>WebSocket</code> - 信令服务器连接</li>
          <li><code>操作同步</code> - 实时同步用户操作</li>
          <li><code>冲突解决</code> - 处理并发编辑冲突</li>
          <li><code>状态管理</code> - 分布式状态同步</li>
        </TechList>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem' }}>协作功能</h3>
        <TechList>
          <li><code>实时光标</code> - 显示其他用户的鼠标位置</li>
          <li><code>对象选择</code> - 多用户对象选择状态</li>
          <li><code>相机同步</code> - 可选的视角同步</li>
          <li><code>语音聊天</code> - 集成语音通信</li>
          <li><code>文字聊天</code> - 实时文字交流</li>
        </TechList>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem' }}>数据同步</h3>
        <TechList>
          <li><code>增量更新</code> - 只传输变化的数据</li>
          <li><code>操作队列</code> - 保证操作顺序一致性</li>
          <li><code>版本控制</code> - 支持撤销和重做</li>
          <li><code>离线支持</code> - 离线操作缓存</li>
        </TechList>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem' }}>应用场景</h3>
        <InfoDescription>
          • 3D设计协作平台<br/>
          • 虚拟会议室<br/>
          • 在线教育培训<br/>
          • 游戏开发工具<br/>
          • 建筑设计评审
        </InfoDescription>
        
        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem' }}>技术挑战</h3>
        <InfoDescription>
          • 网络延迟处理<br/>
          • 并发冲突解决<br/>
          • 大规模用户支持<br/>
          • 数据一致性保证<br/>
          • 安全性和权限控制
        </InfoDescription>
        
        <CodeSection>
          <summary>🔍 查看核心代码</summary>
          <pre>{`// WebRTC协作管理器
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
})`}</pre>
        </CodeSection>
      </InfoPanel>
    </PageContainer>
  )
}

export default MultiUserCollaboration