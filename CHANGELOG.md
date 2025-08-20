# 变更日志

## [1.1.0] - 2024-01-XX

### 新增功能
- ✨ 支持 `/ai-day` 路径前缀
- 🚀 配置 GitHub Pages 自动部署
- 📦 添加 gh-pages 依赖
- 🔧 创建 GitHub Actions 工作流
- 📝 完善项目文档

### 技术改进
- 🔧 修改 Vite 配置，添加 `base: "/ai-day/"`
- 🔧 修改 React Router 配置，添加 `basename="/ai-day"`
- 🔧 修复所有 TypeScript 编译错误
- 🔧 优化构建配置

### 部署相关
- 🌐 配置 GitHub Pages 部署
- 📄 创建 `public/404.html` 处理 SPA 路由
- 📄 修改 `index.html` 添加 SPA 路由处理脚本
- 📄 创建部署脚本 `deploy.sh`
- 📄 创建部署指南 `DEPLOYMENT.md`

### 文档更新
- 📝 更新 `README.md`，添加部署说明
- 📝 创建 `.gitignore` 文件
- 📝 创建 `CHANGELOG.md` 变更日志

### 修复问题
- 🐛 修复 TypeScript 编译错误
- 🐛 修复未使用变量警告
- 🐛 修复类型转换问题
- 🐛 修复 NodeJS 类型引用问题

### 文件变更
#### 新增文件
- `.github/workflows/deploy.yml` - GitHub Actions 部署工作流
- `public/404.html` - SPA 路由处理
- `deploy.sh` - 部署脚本
- `DEPLOYMENT.md` - 部署指南
- `CHANGELOG.md` - 变更日志
- `.gitignore` - Git 忽略文件

#### 修改文件
- `vite.config.ts` - 添加 base 路径配置
- `src/main.tsx` - 添加 Router basename
- `package.json` - 添加部署脚本和依赖
- `index.html` - 添加 SPA 路由处理脚本
- `README.md` - 更新项目说明
- `src/pages/AIInterviewQuestions.tsx` - 修复类型错误
- `src/pages/InterviewAnalysis.tsx` - 修复未使用变量
- `src/pages/InterviewConducting.tsx` - 修复类型错误
- `src/pages/InterviewSchedule.tsx` - 修复类型错误
- `src/pages/ProjectHighlights.tsx` - 修复未使用变量
- `src/components/DataVisualization.tsx` - 修复未使用变量

### 部署地址
- 生产环境：https://oiscircle.github.io/ai-day
- 本地开发：http://localhost:3000/ai-day

### 下一步计划
- [ ] 集成真实 AI 服务
- [ ] 添加用户认证
- [ ] 实现数据持久化
- [ ] 添加单元测试
- [ ] 性能优化
