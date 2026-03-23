# src/ - Core Application Logic

## OVERVIEW

核心应用代码：单页应用逻辑、数据加载器、IndexedDB 封装、CSS 主题系统。

## WHERE TO LOOK

| 任务 | 文件 | 关键函数 |
|------|------|----------|
| 页面切换 | app.js | `navigateTo(page)` |
| 题目显示 | app.js | `showQuestion(q)` |
| AI 调用 | app.js | `callAiApi(message)` |
| Markdown 渲染 | app.js | `renderMarkdown(text)` |
| 懒加载数据 | loader.js | `loadDay(day)` |
| 缓存管理 | loader.js | `cache.clear()` |
| 存储进度 | db.js | `updateProgress(id, status)` |

## KEY PATTERNS

### 事件防重复绑定
```javascript
if (!btn._hasEvent) {
    btn.addEventListener('click', handler);
    btn._hasEvent = true;
}
```

### 懒加载 + 预加载
```javascript
// 懒加载当天
await this.loader.loadDay(1);
// 自动预加载下一天
this.loader.preloadNextDay(1);
```

### AI 配置来源
1. localStorage `ai_config` 键（优先）
2. `window.localConfig`（config.local.js）

## ANTI-PATTERNS

- 不要在 app.js 外 new DataLoader() → 全局单例已存在
- 不要用 `as any` 或 `@ts-ignore` → 此项目无 TS
- 不要忘记 Mermaid 初始化 → `mermaid.initialize()` 在 index.html

## FILE SIZES

| 文件 | 行数 | 说明 |
|------|------|------|
| app.js | 1500+ | 主逻辑，需关注复杂度 |
| loader.js | 220 | 数据加载 |
| db.js | 120 | 数据库操作 |
| styles.css | 2100+ | 样式，CSS 变量在开头 |
| config.js | 48 | 配置模板 |