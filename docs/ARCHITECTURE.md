# Android 面试学习系统 - 架构设计

## 数据存储方案

### 1. 题目数据分层存储

```
data/
├── index.json              # 题目索引（包含所有题目的元数据，约 50KB）
├── day1/                   # Day 1 题目
│   ├── activity.json       # Activity 相关（30题）
│   ├── fragment.json       # Fragment 相关（25题）
│   └── service.json        # Service 相关（20题）
├── day2/                   # Day 2 题目
│   ├── kotlin_basic.json   # Kotlin 基础（30题）
│   └── kotlin_oop.json     # Kotlin OOP（25题）
├── day3/
├── ...
└── day10/
```

### 2. 本地数据库 (IndexedDB)

使用 IndexedDB 存储：
- **用户学习进度** - 每道题的掌握状态
- **学习记录** - 学习时间、连续天数
- **收藏题目** - 用户标记的题目ID
- **薄弱项分析** - AI 分析的薄弱知识点

### 3. 加载策略

**首页加载**：
- 只加载 `index.json`（题目索引）
- 显示统计信息、学习进度

**按需加载**：
- 用户选择 Day N 时，动态加载对应目录下的 JSON 文件
- 使用缓存机制，避免重复加载

**预加载**：
- 当用户在学习 Day 1 时，后台预加载 Day 2 的数据

## 实现步骤

### 第一步：创建题目索引
生成 `index.json`，包含所有题目的：
- id
- category
- subcategory
- difficulty
- tags
- day
- file_path (指向详细题目文件)

### 第二步：分文件存储题目
每类题目单独一个 JSON 文件，大小控制在 50-100KB

### 第三步：实现 IndexedDB 管理器
封装 IndexedDB 操作：
- 存储学习进度
- 查询薄弱项
- 统计学习数据

### 第四步：实现按需加载
使用动态 import() 或 fetch() 按需加载题目数据

## 文件结构

```
Android_Work/
├── index.html              # 主页面
├── src/
│   ├── app.js             # 主应用逻辑
│   ├── styles.css         # 样式
│   ├── db.js              # IndexedDB 管理
│   ├── loader.js          # 数据加载器
│   ├── ui.js              # UI 组件
│   └── ai.js              # AI 学习助手
├── data/
│   ├── index.json         # 题目索引
│   └── questions/         # 题目数据（按天分类）
│       ├── day1/
│       ├── day2/
│       └── ...
└── assets/                # 图片等资源
```

## 性能优化

1. **Service Worker** - 离线缓存题目数据
2. **Compression** - 使用 gzip/brotli 压缩 JSON
3. **Lazy Load** - 图片、图表按需加载
4. **Virtual Scroll** - 题目列表虚拟滚动

## 数据同步

- 导出：将 IndexedDB 数据导出为 JSON 文件
- 导入：读取 JSON 文件恢复学习进度
- 云端同步（可选）：未来可以接入后端 API
