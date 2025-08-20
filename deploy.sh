#!/bin/bash

# AI Interview System 部署脚本
echo "🚀 开始部署 AI Interview System 到 GitHub Pages..."

# 检查是否安装了 gh-pages
if ! command -v gh-pages &> /dev/null; then
    echo "📦 安装 gh-pages..."
    npm install -g gh-pages
fi

# 构建项目
echo "🔨 构建项目..."
npm run build

# 检查构建是否成功
if [ $? -eq 0 ]; then
    echo "✅ 构建成功！"
    
    # 部署到 GitHub Pages
    echo "🌐 部署到 GitHub Pages..."
    gh-pages -d dist
    
    if [ $? -eq 0 ]; then
        echo "🎉 部署成功！"
        echo "📱 访问地址: https://oiscircle.github.io/ai-day"
        echo "⏰ 部署可能需要几分钟时间生效..."
    else
        echo "❌ 部署失败！"
        exit 1
    fi
else
    echo "❌ 构建失败！"
    exit 1
fi
