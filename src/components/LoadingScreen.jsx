import React from 'react'
import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--primary-bg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`

const LoadingSpinner = styled.div`
  width: 60px;
  height: 60px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top: 3px solid var(--accent-color);
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 2rem;
`

const LoadingText = styled.div`
  color: var(--text-secondary);
  font-size: 1.2rem;
  font-weight: 500;
  animation: ${pulse} 2s ease-in-out infinite;
`

const LoadingSubtext = styled.div`
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-top: 0.5rem;
  text-align: center;
  max-width: 300px;
`

function LoadingScreen({ message = "加载中...", subtext = "正在初始化 Three.js 场景" }) {
  return (
    <LoadingContainer>
      <LoadingSpinner />
      <LoadingText>{message}</LoadingText>
      <LoadingSubtext>{subtext}</LoadingSubtext>
    </LoadingContainer>
  )
}

export default LoadingScreen