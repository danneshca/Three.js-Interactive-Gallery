import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import glsl from 'vite-plugin-glsl'

export default defineConfig({
  base: process.env.GITHUB_PAGES_CUSTOM_DOMAIN === 'true' ? '/' : 
        (process.env.NODE_ENV === 'production' ? '/threejs-interactive-gallery/' : '/'),
  plugins: [
    react(),
    glsl()
  ],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          // 将 Three.js 相关库分离到单独的 chunk
          'three-vendor': ['three'],
          'react-three-vendor': ['@react-three/fiber', '@react-three/drei'],
          // 将 React 相关库分离
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // 将动画和样式库分离
          'animation-vendor': ['framer-motion', 'gsap'],
          'style-vendor': ['styled-components']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/drei']
  }
})