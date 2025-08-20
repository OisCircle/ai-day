# AI Interview System

基于 AI 的面试系统前端演示项目

## 项目特性

- 🎯 智能面试问题生成
- 👥 候选人管理
- 📅 面试日程安排
- 📊 面试报告和分析
- 🎨 现代化 UI 设计

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 部署

### GitHub Pages 自动部署

项目已配置 GitHub Actions 自动部署到 GitHub Pages。当你推送代码到 `main` 分支时，会自动触发部署流程。

部署地址：https://oiscircle.github.io/ai-day

### 手动部署

```bash
# 安装 gh-pages
npm install -g gh-pages

# 部署到 GitHub Pages
npm run deploy
```

## 项目结构

```
src/
├── components/          # 通用组件
├── pages/              # 页面组件
├── data/               # 静态数据
├── types/              # TypeScript 类型定义
├── App.tsx             # 主应用组件
└── main.tsx            # 应用入口
```

## 技术栈

- React 18
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Lucide React Icons

## 路由结构

- `/ai-day/` - 首页（重定向到 dashboard）
- `/ai-day/dashboard` - 仪表板
- `/ai-day/highlights` - 项目亮点
- `/ai-day/candidates` - 候选人管理
- `/ai-day/interviews` - 面试日程
- `/ai-day/ai-questions` - AI 面试问题
- `/ai-day/interview/:id` - 面试进行中
- `/ai-day/reports` - 面试报告
- `/ai-day/analysis` - 面试分析

## 许可证

MIT License

