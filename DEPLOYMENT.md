# GitHub Pages 部署指南

本文档详细说明如何将 Three.js Interactive Gallery 项目部署到 GitHub Pages。

## 🚀 快速部署

### 1. 准备工作

确保您已经：
- 将项目推送到 GitHub 仓库
- 仓库名称为 `threejs-interactive-gallery`
- 安装了所有依赖：`npm install`

### 2. 一键部署

```bash
# 构建并部署到 GitHub Pages
npm run deploy
```

### 3. 配置 GitHub Pages

1. 进入 GitHub 仓库设置页面
2. 找到 "Pages" 选项
3. 选择 "Deploy from a branch"
4. 选择 `gh-pages` 分支
5. 选择 `/ (root)` 文件夹
6. 点击 "Save"

## 🔧 技术实现

### SPA 路由支持

为了解决 GitHub Pages 不支持客户端路由的问题，我们实施了以下解决方案：

#### 1. 404.html 重定向
```html
<!-- public/404.html -->
<script type="text/javascript">
  // 将 404 页面重定向到 index.html 并保留路由信息
  var pathSegmentsToKeep = 1; // GitHub Pages 项目页面设置为 1
  var l = window.location;
  l.replace(
    l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
    l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
    l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
    (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
    l.hash
  );
</script>
```

#### 2. index.html 路由恢复
```html
<!-- index.html -->
<script type="text/javascript">
  // 从查询参数中恢复原始路由
  (function(l) {
    if (l.search[1] === '/' ) {
      var decoded = l.search.slice(1).split('&').map(function(s) { 
        return s.replace(/~and~/g, '&')
      }).join('?');
      window.history.replaceState(null, null,
          l.pathname.slice(0, -1) + decoded + l.hash
      );
    }
  }(window.location))
</script>
```

#### 3. Vite 配置
```javascript
// vite.config.js
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/threejs-interactive-gallery/' : '/',
  // ... 其他配置
})
```

## 📁 文件结构

部署相关文件：
```
threejs-interactive-gallery/
├── public/
│   └── 404.html              # GitHub Pages SPA 路由支持
├── index.html                # 主页面（包含路由恢复脚本）
├── vite.config.js            # Vite 配置（包含 base 路径）
├── package.json              # 部署脚本
└── DEPLOYMENT.md             # 本文档
```

## 🌐 访问地址

部署成功后，您的网站将在以下地址可用：
```
https://[your-username].github.io/threejs-interactive-gallery/
```

## 🔍 常见问题

### Q1: 页面显示 404 错误
**原因**: GitHub Pages 不支持客户端路由  
**解决**: 确保 `public/404.html` 文件存在且配置正确

### Q2: 资源加载失败
**原因**: 基础路径配置错误  
**解决**: 检查 `vite.config.js` 中的 `base` 配置

### Q3: 部署后样式丢失
**原因**: CSS 文件路径错误  
**解决**: 确保所有资源使用相对路径

### Q4: 路由跳转不工作
**原因**: React Router 配置问题  
**解决**: 确保使用 `BrowserRouter` 而不是 `HashRouter`

## 🛠️ 高级配置

### 自定义域名

1. 在 `public/` 目录下创建 `CNAME` 文件：
```
your-domain.com
```

2. 在域名提供商处配置 DNS：
```
Type: CNAME
Name: www (或 @)
Value: [your-username].github.io
```

### 环境变量

创建 `.env.production` 文件：
```env
VITE_BASE_URL=https://[your-username].github.io/threejs-interactive-gallery/
VITE_API_URL=https://api.your-domain.com
```

### 构建优化

```javascript
// vite.config.js
export default defineConfig({
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false, // 生产环境关闭 sourcemap
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          three: ['three', '@react-three/fiber', '@react-three/drei']
        }
      }
    }
  }
})
```

## 📊 部署监控

### GitHub Actions 自动部署

创建 `.github/workflows/deploy.yml`：
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### 部署状态检查

```bash
# 检查部署状态
curl -I https://[your-username].github.io/threejs-interactive-gallery/

# 检查特定路由
curl -I https://[your-username].github.io/threejs-interactive-gallery/core/scene-camera
```

## 🔒 安全考虑

1. **HTTPS**: GitHub Pages 自动提供 HTTPS
2. **CSP**: 在 `index.html` 中添加内容安全策略
3. **环境变量**: 不要在前端代码中暴露敏感信息

## 📈 性能优化

1. **CDN**: 利用 GitHub Pages 的全球 CDN
2. **缓存**: 配置适当的缓存策略
3. **压缩**: 启用 Gzip 压缩
4. **懒加载**: 使用 React.lazy() 进行代码分割

---

## 🎯 部署检查清单

- [ ] 项目已推送到 GitHub
- [ ] `public/404.html` 文件已创建
- [ ] `index.html` 包含路由恢复脚本
- [ ] `vite.config.js` 配置了正确的 base 路径
- [ ] 运行 `npm run deploy` 成功
- [ ] GitHub Pages 设置正确
- [ ] 网站可以正常访问
- [ ] 所有路由都能正常工作
- [ ] 资源文件加载正常

完成以上步骤后，您的 Three.js Interactive Gallery 就可以在 GitHub Pages 上正常运行了！🎉