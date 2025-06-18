import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background: rgba(10, 10, 10, 0.9);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  
  @media (max-width: 1200px) {
    padding: 0 1.5rem;
  }
  
  @media (max-width: 768px) {
    padding: 0 1rem;
    height: 70px;
  }
  
  @media (max-width: 576px) {
    padding: 0 0.75rem;
    height: 60px;
  }
`

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--accent-color);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    color: #00cccc;
  }
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
    gap: 0.3rem;
  }
  
  @media (max-width: 576px) {
    font-size: 1.1rem;
    
    span {
      font-size: 1.2rem;
    }
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
    
    span {
      display: none;
    }
  }
`

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: 1200px) {
    gap: 1.5rem;
  }
  
  @media (max-width: 992px) {
    gap: 1rem;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`

const NavItem = styled.div`
  position: relative;
  cursor: pointer;
`

const NavLink = styled(Link)`
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    color: var(--accent-color);
    background: rgba(0, 255, 255, 0.1);
  }
  
  &.active {
    color: var(--accent-color);
    background: rgba(0, 255, 255, 0.2);
  }
`

const Dropdown = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 200px;
  background: rgba(26, 26, 26, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1rem 0;
  margin-top: 0.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`

const DropdownItem = styled(Link)`
  display: block;
  color: var(--text-secondary);
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: var(--accent-color);
    background: rgba(0, 255, 255, 0.1);
  }
`

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: var(--text-primary);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: var(--accent-color);
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  @media (max-width: 768px) {
    display: block;
  }
  
  @media (max-width: 576px) {
    font-size: 1.3rem;
    padding: 0.4rem;
  }
`

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 80px;
  left: 0;
  width: 100%;
  height: calc(100vh - 80px);
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(20px);
  padding: 2rem;
  z-index: 999;
  overflow-y: auto;
  
  @media (max-width: 768px) {
    top: 70px;
    height: calc(100vh - 70px);
    padding: 1.5rem;
  }
  
  @media (max-width: 576px) {
    top: 60px;
    height: calc(100vh - 60px);
    padding: 1rem;
  }
`

const menuItems = [
  {
    title: '首页',
    path: '/'
  },
  {
    title: '核心模块',
    items: [
      { title: '场景与相机', path: '/core/scene-camera' },
      { title: '光照系统', path: '/core/lighting' },
      { title: '材质与纹理', path: '/core/materials' },
      { title: '几何体展示', path: '/core/geometry' },
      { title: '模型加载', path: '/core/models' }
    ]
  },
  {
    title: '拓展模块',
    items: [
      { title: '粒子系统', path: '/advanced/particles' },
      { title: '动画系统', path: '/advanced/animation' },
      { title: '后期处理', path: '/advanced/postprocessing' },
      { title: '着色器实验', path: '/advanced/shaders' },
      { title: '地形生成', path: '/advanced/terrain' },
      { title: 'WebXR 体验', path: '/advanced/webxr' }
    ]
  },
  {
    title: '实验功能',
    items: [
      
      { title: '多视角渲染', path: '/experiments/multiviewport' },
      { title: '多用户协作', path: '/experiments/collaborative' },
      { title: '场景导出器', path: '/experiments/exporter' },
      { title: '3D UI 菜单', path: '/experiments/ui3d' }
    ]
  },
  {
    title: '关于',
    path: '/about'
  }
]

function Navigation() {
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const handleMouseEnter = (index) => {
    setActiveDropdown(index)
  }

  const handleMouseLeave = () => {
    setActiveDropdown(null)
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  const isParentActive = (items) => {
    return items?.some(item => location.pathname === item.path)
  }

  return (
    <NavContainer>
      <Logo to="/">
        <span>🎪</span>
        Three.js Interactive Gallery
      </Logo>
      
      <NavMenu>
        {menuItems.map((item, index) => (
          <NavItem
            key={index}
            onMouseEnter={() => item.items && handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {item.path ? (
              <NavLink 
                to={item.path}
                className={isActive(item.path) ? 'active' : ''}
              >
                {item.title}
              </NavLink>
            ) : (
              <NavLink 
                as="span"
                className={isParentActive(item.items) ? 'active' : ''}
              >
                {item.title} ▼
              </NavLink>
            )}
            
            <AnimatePresence>
              {activeDropdown === index && item.items && (
                <Dropdown
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.items.map((subItem, subIndex) => (
                    <DropdownItem
                      key={subIndex}
                      to={subItem.path}
                      onClick={() => setActiveDropdown(null)}
                    >
                      {subItem.title}
                    </DropdownItem>
                  ))}
                </Dropdown>
              )}
            </AnimatePresence>
          </NavItem>
        ))}
      </NavMenu>
      
      <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        ☰
      </MobileMenuButton>
      
      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
          >
            {/* Mobile menu content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {menuItems.map((item, index) => (
                <div key={index}>
                  {item.path ? (
                    <NavLink 
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      style={{ display: 'block', fontSize: '1.2rem' }}
                    >
                      {item.title}
                    </NavLink>
                  ) : (
                    <div>
                      <div style={{ 
                        color: 'var(--accent-color)', 
                        fontSize: '1.2rem', 
                        fontWeight: '600',
                        marginBottom: '0.5rem'
                      }}>
                        {item.title}
                      </div>
                      {item.items?.map((subItem, subIndex) => (
                        <NavLink
                          key={subIndex}
                          to={subItem.path}
                          onClick={() => setMobileMenuOpen(false)}
                          style={{ 
                            display: 'block', 
                            marginLeft: '1rem',
                            marginBottom: '0.5rem'
                          }}
                        >
                          {subItem.title}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </MobileMenu>
        )}
      </AnimatePresence>
    </NavContainer>
  )
}

export default Navigation