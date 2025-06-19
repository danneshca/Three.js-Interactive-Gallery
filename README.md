# Three.js Interactive Gallery

🎪 **一个现代化的Three.js交互式展示平台**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-0.158.0-green.svg)](https://threejs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.5.0-purple.svg)](https://vitejs.dev/)

## 📖 项目简介

Three.js Interactive Gallery 是一个基于 React 和 Three.js 构建的现代化3D交互展示平台。项目展示了Three.js的核心功能、高级特效和实验性技术，为开发者提供了丰富的学习资源和实践案例。

## ✨ 主要特性

### 🎯 核心模块
- **场景与相机** - 多相机系统、视角控制、场景管理
- **光照系统** - 环境光、方向光、点光源、聚光灯、阴影效果
- **材质与纹理** - PBR材质、程序化纹理、材质编辑器
- **几何体展示** - 基础几何体、复杂模型、程序化生成
- **模型加载** - GLTF/GLB模型加载、动画播放

### ⚡ 高级模块
- **粒子系统** - GPU粒子、物理模拟、视觉特效
- **动画系统** - 关键帧动画、变形动画、骨骼动画
- **后期处理** - Bloom、SSAO、景深、色彩校正
- **着色器实验** - 自定义着色器、视觉效果
- **地形生成** - 程序化地形、高度图、纹理混合
- **WebXR体验** - VR/AR支持、沉浸式体验

### 🔬 实验功能
- **多视角渲染** - 分屏显示、多摄像机
- **多用户协作** - 实时协作、状态同步
- **场景导出器** - 场景保存、格式转换
- **3D UI菜单** - 立体界面、空间交互

### 🎨 设计特色
- **响应式设计** - 完美适配各种屏幕尺寸
- **现代UI** - 玻璃态设计、流畅动画
- **无障碍支持** - 键盘导航、屏幕阅读器支持
- **性能优化** - 代码分割、懒加载、内存管理

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0 或 yarn >= 1.22.0
- 现代浏览器（支持WebGL 2.0）

### 安装步骤

1. **克隆项目**
```bash
git clone https://github.com/your-username/threejs-interactive-gallery.git
cd threejs-interactive-gallery
```

2. **安装依赖**
```bash
npm install
# 或者使用 yarn
yarn install
```

3. **启动开发服务器**
```bash
npm run dev
# 或者使用 yarn
yarn dev
```

4. **打开浏览器**
访问 `http://localhost:3000` 查看项目

### 构建部署

```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 📁 项目结构

```
threejs-interactive-gallery/
├── public/                 # 静态资源
├── src/
│   ├── components/         # 通用组件
│   │   ├── Navigation.jsx  # 导航组件
│   │   └── LoadingScreen.jsx # 加载屏幕
│   ├── pages/             # 页面组件
│   │   ├── Home.jsx       # 首页
│   │   ├── About.jsx      # 关于页面
│   │   ├── core/          # 核心功能页面
│   │   ├── advanced/      # 高级功能页面
│   │   └── experiments/   # 实验功能页面
│   ├── App.jsx           # 主应用组件
│   ├── main.jsx          # 应用入口
│   ├── index.css         # 全局样式
│   └── responsive-utils.css # 响应式工具类
├── package.json          # 项目配置
├── vite.config.js        # Vite配置
└── README.md            # 项目文档
```

## 🛠️ 技术栈

### 核心技术
- **React 18** - 用户界面框架
- **Three.js** - 3D图形库
- **@react-three/fiber** - React Three.js渲染器
- **@react-three/drei** - Three.js工具库
- **Vite** - 构建工具

### UI & 动画
- **Styled Components** - CSS-in-JS样式方案
- **Framer Motion** - 动画库
- **GSAP** - 高性能动画库

### 开发工具
- **React Router** - 路由管理
- **Leva** - 调试面板
- **TypeScript** - 类型支持

## 🎮 使用指南

### 导航说明
- **首页** - 项目概览和快速导航
- **核心模块** - Three.js基础功能演示
- **高级模块** - 复杂特效和高级技术
- **实验功能** - 前沿技术探索
- **关于页面** - 项目信息和技术细节

### 交互控制
- **鼠标拖拽** - 旋转视角
- **滚轮** - 缩放场景
- **键盘** - 辅助控制（具体按键见各页面说明）
- **触摸** - 移动端手势支持

### 响应式适配
项目支持以下屏幕尺寸：
- **桌面端** - 1200px及以上
- **平板端** - 768px - 1199px
- **手机端** - 767px及以下

## 🔧 自定义配置

### 主题定制
在 `src/index.css` 中修改CSS变量：

```css
:root {
  --primary-bg: #0a0a0a;        /* 主背景色 */
  --accent-color: #00ffff;       /* 主题色 */
  --text-primary: #ffffff;       /* 主文字色 */
  /* 更多变量... */
}
```

### 添加新页面
1. 在 `src/pages/` 对应目录创建组件
2. 在 `src/App.jsx` 中添加路由
3. 在 `src/components/Navigation.jsx` 中添加导航项

## 🤝 贡献指南

我们欢迎所有形式的贡献！

### 贡献方式
1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

### 开发规范
- 遵循 ESLint 配置
- 使用语义化提交信息
- 添加适当的注释和文档
- 确保响应式兼容性

## 📝 更新日志

### v1.0.0 (2025-06-19)
- ✨ 初始版本发布
- 🎯 完整的核心模块功能
- ⚡ 高级特效和动画系统
- 🔬 实验性功能探索
- 📱 全面响应式适配
- 🎨 现代化UI设计

## 📄 许可证

本项目基于 [MIT License](LICENSE) 开源协议。

## 🙏 致谢

感谢以下开源项目和社区：
- [Three.js](https://threejs.org/) - 强大的3D图形库
- [React Three Fiber](https://github.com/pmndrs/react-three-fiber) - React Three.js生态
- [React](https://reactjs.org/) - 用户界面框架
- [Vite](https://vitejs.dev/) - 快速构建工具


⭐ 如果这个项目对你有帮助，请给我们一个星标！

**Happy Coding! 🚀**
