# PROJECT KNOWLEDGE BASE

**Generated:** 2026-03-23
**Commit:** b44a93f
**Branch:** main

## OVERVIEW

Android 面试智能学习系统 - 纯静态 Web 应用，600+ 面试题，15 天学习计划，AI 深度解析。Vanilla JS + CSS，无框架依赖，IndexedDB 本地存储。

## STRUCTURE

```
.
├── index.html           # 单页入口，加载所有脚本
├── src/
│   ├── app.js           # 主应用逻辑（1500+ 行）
│   ├── db.js            # IndexedDB 封装
│   ├── loader.js        # 按需加载题目数据
│   ├── config.js        # AI 配置（localStorage 读取）
│   └── styles.css       # CSS 变量主题系统
├── data/
│   ├── index.json       # 题目索引（15 天元数据）
│   └── questions/       # 按天分类的题目 JSON
│       ├── day1/        # Android 基础
│       ├── day2/        # Kotlin
│       └── .../         # 共 15 天
└── docs/                # 预览截图
```

## WHERE TO LOOK

| 任务 | 位置 | 说明 |
|------|------|------|
| 修改 UI 布局 | `index.html` + `src/styles.css` | 单页 HTML，CSS 变量控制主题 |
| 添加新功能 | `src/app.js` → `AndroidInterviewApp` 类 | 所有页面逻辑集中于此 |
| 修改数据加载 | `src/loader.js` → `DataLoader` 类 | 支持按天/分类加载，有缓存 |
| 操作学习进度 | `src/db.js` → `DatabaseManager` 类 | IndexedDB CRUD |
| 配置 AI | `src/config.js` + 浏览器 localStorage | API Key 存 localStorage，不上传 |
| 添加题目 | `data/questions/dayN/*.json` | 按天分文件，格式见下方 |
| 修改题目索引 | `data/index.json` | 控制每天显示哪些题目文件 |

## KEY CLASSES

### AndroidInterviewApp (src/app.js)
主应用类，管理所有页面：
- `navigateTo(page)` - 页面切换
- `loadStudy()` / `loadCards()` / `loadCategories()` - 各页面加载
- `showQuestion(q)` / `rateQuestion(rating)` - 题目操作
- `callAiApi(message)` - AI 调用（支持 DashScope/OpenAI）
- `renderMarkdown(text)` - Markdown + Mermaid 渲染

### DataLoader (src/loader.js)
数据加载器，懒加载 + 缓存：
- `loadIndex()` - 加载题目索引
- `loadDay(day)` - 按天加载所有题目
- `loadQuestions(file)` - 按文件加载（有缓存）
- `preloadNextDay(day)` - 预加载下一天

### DatabaseManager (src/db.js)
IndexedDB 封装：
- `updateProgress(id, status)` - 更新学习进度
- `getAllProgress()` - 获取所有进度
- `saveCardProgress()` - 卡片进度

## DATA FORMAT

### 题目 JSON 格式
```json
{
  "questions": [
    {
      "id": "D1_001",
      "question": "题目内容",
      "answer": "答案（支持 Markdown + Mermaid）",
      "difficulty": 1,
      "category": "Activity",
      "tags": ["Activity", "生命周期"]
    }
  ]
}
```

### 支持的答案格式
- Markdown（代码块、列表、表格）
- Mermaid 流程图：` ```mermaid graph TD ... ``` `
- ASCII 架构图

## CONVENTIONS

### CSS 变量命名
```css
--primary: #00D26A;      /* 主色 */
--bg-primary: #0A0F14;   /* 背景色层级 */
--text-primary: #F9FAFB; /* 文字色层级 */
```

### JS 类模式
- 单例类：`const dataLoader = new DataLoader()`
- 主应用：`new AndroidInterviewApp()` 自动初始化

### 事件绑定
使用 `_hasEvent` 标记避免重复绑定：
```javascript
if (!btn._hasEvent) {
    btn.addEventListener('click', handler);
    btn._hasEvent = true;
}
```

### 数据懒加载
- 首页只加载 `index.json`（~2KB）
- 点击学习时才加载当天题目
- 自动预加载下一天

## ANTI-PATTERNS

- **NEVER** 硬编码 API Key → 使用 localStorage
- **NEVER** 在 app.js 外定义新的 DataLoader → 会冲突
- **NEVER** 忘记给事件加 `_hasEvent` 检查 → 会重复绑定
- **NEVER** 题目 ID 重复 → 会覆盖

## COMMANDS

```bash
# 本地开发
python3 -m http.server 8080

# 部署到服务器
git push origin main
ssh 165.154.6.75 "cd /root/android-interview && git pull && systemctl restart android-interview"

# 访问
# 本地: http://localhost:8080
# 线上: http://165.154.6.75:8081
```

## DEPLOYMENT WORKFLOW

**推送到 GitHub 后必须同步到云服务器：**

```bash
# 1. 提交并推送到 GitHub
git add . && git commit -m "..." && git push origin main

# 2. 同步到云服务器（必须执行）
ssh 165.154.6.75 "cd /root/android-interview && git pull && systemctl restart android-interview"

# 3. 验证部署
curl -s http://165.154.6.75:8081/ | head -20
```

**关键版本发布流程：**

1. 更新 `VERSION` 文件中的版本号
2. 更新 `src/config.js` 中的 `version` 字段
3. 更新 `CHANGELOG.md` 记录变更
4. 提交并推送：`git commit -m "release: v1.x.x"`
5. 同步到云服务器
6. 创建 Git Tag：`git tag -a v1.x.x -m "Release v1.x.x" && git push origin v1.x.x`

## NOTES

- **数据存储**：学习进度在浏览器 IndexedDB，换设备需重新开始
- **AI 功能**：需在 AI 助手页面配置 API Key（阿里云百炼或 OpenAI）
- **Mermaid**：答案中支持 Mermaid 流程图，需用 ` ```mermaid ``` ` 包裹
- **题目状态**：`weak`（不熟）、`review`（需复习）、`mastered`（掌握）
- **服务器服务**：`systemctl status android-interview`

## KNOWN ISSUES

- `js/` 和 `css/` 目录为遗留代码，未使用（可删除）
- `data/*.py` 生成脚本混在数据目录中
- `data/questions.js` 已被 `DataLoader` 替代，可删除