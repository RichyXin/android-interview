# Android 面试题大全 - 智能学习系统

> **1250+ 道 Android 面试题** | **10 天学习计划** | **AI 智能助手**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Questions: 1250+](https://img.shields.io/badge/Questions-1250+-brightgreen.svg)]()
[![Days: 10](https://img.shields.io/badge/Learning%20Days-10-blue.svg)]()

## 📸 预览

![Dashboard](docs/preview-dashboard.png)
*学习概览 - 追踪你的学习进度*

![Study Mode](docs/preview-study.png)
*每日学习 - 系统性学习面试知识点*

![AI Assistant](docs/preview-ai.png)
*AI 助手 - 深度讲解面试题目*

## 🚀 快速开始

### 方式一：本地运行

```bash
# 克隆仓库
git clone https://github.com/yourusername/android-interview.git
cd android-interview

# 启动本地服务器
python3 -m http.server 8080

# 在浏览器中打开
open http://localhost:8080
```

### 方式二：GitHub Pages

直接访问：[https://yourusername.github.io/android-interview](https://yourusername.github.io/android-interview)

## 📚 功能特性

### ✅ 已实现功能

| 模块 | 状态 | 描述 |
|------|------|------|
| 📊 学习概览 | ✅ 完整 | 进度圆环、统计图表、薄弱项展示 |
| 📚 每日学习 | ✅ 完整 | 10天学习计划、难度筛选、掌握程度标记 |
| 🎴 记忆卡片 | ✅ 完整 | 翻转卡片、分类筛选、随机洗牌 |
| 🤖 AI 助手 | ✅ 完整 | 智能答疑、题目解析、学习建议 |
| 💾 数据导出 | ✅ 完整 | 学习进度备份与恢复 |

### 🚧 开发中功能

| 模块 | 状态 | 描述 |
|------|------|------|
| 📂 分类浏览 | ⏳ 80% | 按类别浏览题目 |
| 🎯 薄弱项分析 | ⏳ 80% | 智能分析薄弱知识点 |
| 🎤 模拟面试 | ⏳ 80% | 随机抽题模拟面试 |

## 📁 项目结构

```
android-interview/
├── index.html              # 主页面入口
├── README.md               # 项目说明
├── .gitignore              # Git 忽略配置
├── data/
│   ├── index.json          # 题目索引
│   └── questions/          # 题目数据（按天分类）
│       ├── day1/           # Android 基础
│       ├── day2/           # Kotlin
│       ├── day3/           # Java 并发
│       ├── ...
│       └── day15/          # 系统设计
├── src/
│   ├── config.js           # 配置文件
│   ├── app.js              # 主应用逻辑
│   ├── db.js               # IndexedDB 数据库
│   ├── loader.js           # 数据加载器
│   └── styles.css          # 样式表
└── docs/                   # 文档
```

## 📊 题目统计

| 天数 | 类别 | 题目数量 |
|------|------|----------|
| Day 1 | Android 基础 (Activity/Fragment/Service) | 40 |
| Day 2 | Kotlin 基础与协程 | 45 |
| Day 3 | Java 基础与并发 | 40 |
| Day 4 | JVM 原理 | 40 |
| Day 5 | Android 系统架构 | 30 |
| Day 6 | Framework 源码 | 30 |
| Day 7 | 性能优化 | 30 |
| Day 8 | Jetpack & Compose | 30 |
| Day 9 | 设计模式 | 30 |
| Day 10 | 开源框架 | 30 |
| Day 11 | 网络编程 | 30 |
| Day 12 | 数据结构与算法 | 30 |
| Day 13 | NDK/JNI | 30 |
| Day 14 | Flutter | 30 |
| Day 15 | 系统设计 | 30 |
| **总计** | | **1250+** |

## 🎯 10 天学习计划

```
Week 1:
├── Day 1: Android 四大组件
├── Day 2: Kotlin 基础与协程  
├── Day 3: Java 并发编程
├── Day 4: JVM 内存与 GC
├── Day 5: Android 系统架构
└── Day 6: Framework 源码

Week 2:
├── Day 7: 性能优化
├── Day 8: Jetpack & Compose
├── Day 9: 设计模式与架构
└── Day 10: 开源框架源码

Bonus:
├── Day 11: 网络编程
├── Day 12: 数据结构与算法
├── Day 13: NDK/JNI
├── Day 14: Flutter
└── Day 15: 系统设计
```

## 🤖 AI 助手配置

### 方法一：本地存储（推荐）

1. 打开应用
2. 进入 "AI 助手" 页面
3. 在浏览器控制台执行：
```javascript
localStorage.setItem('ai_api_key', 'your-api-key-here');
```

### 方法二：配置文件

创建 `src/config.local.js`（已添加到 .gitignore）：

```javascript
window.localConfig = {
    ai: {
        apiKey: 'your-api-key-here',
        model: 'qwen-turbo'
    }
};
```

### 支持的 AI 服务

- 阿里云百炼 (默认)
- OpenAI (需配置代理)
- 其他兼容 OpenAI API 的服务

## 💾 数据管理

### 本地存储

数据使用 IndexedDB 存储在浏览器本地：

- **progress** - 学习进度
- **cards** - 卡片学习状态
- **bookmarks** - 收藏题目

### 导出/导入

点击侧边栏 "💾 导出数据" 按钮，可将学习进度导出为 JSON 文件。

## 🛠️ 技术栈

- **前端**: Vanilla JavaScript (ES6+)
- **样式**: CSS3 with Variables
- **图表**: Chart.js
- **存储**: IndexedDB
- **构建**: 纯静态，无需构建工具

## 🌟 特色功能

### 🔄 按需加载
- 首页只加载索引 (~50KB)
- 按天懒加载题目数据
- 预加载下一天数据

### 🎴 记忆卡片
- 3D 翻转动画
- 艾宾浩斯记忆曲线
- 四档难度评分

### 🤖 AI 助手
- 题目深度解析
- 薄弱项分析
- 模拟面试生成
- 个性化学习建议

## 🤝 贡献指南

欢迎提交 Issue 和 PR！

1. Fork 本仓库
2. 创建你的分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📝 待办事项

- [ ] 完善分类浏览功能
- [ ] 添加薄弱项智能分析
- [ ] 实现模拟面试系统
- [ ] 添加学习提醒功能
- [ ] 支持 PWA 离线访问
- [ ] 添加暗黑/明亮主题切换

## 📄 License

[MIT](LICENSE) © 2024 Android Interview

---

> 💡 **提示**: 面试准备不只是刷题，更要理解原理。善用 AI 助手深度理解知识点，祝你面试顺利！

Made with ❤️ for Android Developers
