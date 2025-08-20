# 部署指南

## GitHub Pages 自动部署

项目已配置 GitHub Actions 自动部署。当你推送代码到 `main` 分支时，会自动触发部署流程。

### 部署地址
- 生产环境：https://oiscircle.github.io/ai-day

### 自动部署流程
1. 推送代码到 `main` 分支
2. GitHub Actions 自动触发构建
3. 构建成功后自动部署到 GitHub Pages
4. 部署完成后可通过上述地址访问

## 手动部署

### 方法一：使用 npm 脚本
```bash
# 安装依赖
npm install

# 部署到 GitHub Pages
npm run deploy
```

### 方法二：使用部署脚本
```bash
# 给脚本执行权限
chmod +x deploy.sh

# 运行部署脚本
./deploy.sh
```

### 方法三：使用 gh-pages 命令
```bash
# 安装 gh-pages
npm install -g gh-pages

# 构建项目
npm run build

# 部署到 GitHub Pages
gh-pages -d dist
```

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问地址：http://localhost:3000/ai-day
```

## 路径前缀说明

项目已配置 `/ai-day` 路径前缀，所有路由都会包含此前缀：

- 首页：`/ai-day/`
- 仪表板：`/ai-day/dashboard`
- 候选人管理：`/ai-day/candidates`
- 面试日程：`/ai-day/interviews`
- AI 面试问题：`/ai-day/ai-questions`
- 面试进行：`/ai-day/interview/:id`
- 面试报告：`/ai-day/reports`
- 面试分析：`/ai-day/analysis`

## 故障排除

### 构建失败
1. 检查 TypeScript 错误：`npm run lint`
2. 清理缓存：`rm -rf node_modules && npm install`
3. 检查依赖版本兼容性

### 部署失败
1. 确保 GitHub 仓库已启用 GitHub Pages
2. 检查 GitHub Actions 权限设置
3. 查看 Actions 日志获取详细错误信息

### 路由问题
1. 确保访问路径包含 `/ai-day` 前缀
2. 检查浏览器控制台是否有 404 错误
3. 验证 `public/404.html` 文件是否正确配置

## 环境配置

### 开发环境
- Node.js 18+
- npm 或 yarn
- 现代浏览器

### 生产环境
- GitHub Pages
- 自动 HTTPS
- CDN 加速

## 性能优化

- 代码分割和懒加载
- 静态资源压缩
- 浏览器缓存优化
- 图片优化

## 监控和分析

- GitHub Actions 构建状态
- GitHub Pages 访问统计
- 浏览器错误监控（可选）
