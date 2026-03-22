#!/usr/bin/env python3
import json
import os

def ensure_dir(path):
    os.makedirs(os.path.dirname(path), exist_ok=True)

def write_json(path, data):
    ensure_dir(path)
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"Generated: {path}")

# Day 5-10 questions
system_arch = {
    "metadata": {"category": "Android系统架构", "subcategory": "系统架构", "day": 5, "total_questions": 10},
    "questions": [
        {"id": "ARC_001", "question": "Android 系统架构分为哪几层？", "answer": "Linux 内核层、硬件抽象层 HAL、系统运行库层、应用框架层、应用层。", "difficulty": 1, "tags": ["Android", "架构"]},
        {"id": "ARC_002", "question": "Zygote 进程的作用？", "answer": "Android 的 init 进程启动的第一个 Java 进程，负责孵化所有应用进程，通过 fork 提高效率。", "difficulty": 2, "tags": ["Android", "进程"]},
        {"id": "ARC_003", "question": "SystemServer 是什么？", "answer": "Zygote 孵化的第一个进程，启动并管理所有系统服务，如 AMS、WMS、PMS 等。", "difficulty": 2, "tags": ["Android", "系统服务"]},
        {"id": "ARC_004", "question": "Binder 机制的作用？", "answer": "Android 跨进程通信 IPC 机制，基于 C/S 架构，一次拷贝，性能优于传统 IPC。", "difficulty": 2, "tags": ["Android", "Binder"]},
        {"id": "ARC_005", "question": "AIDL 是什么？", "answer": "Android 接口定义语言，用于生成 Binder 通信的代理类和存根类，简化跨进程调用。", "difficulty": 2, "tags": ["Android", "AIDL"]},
        {"id": "ARC_006", "question": "Android 应用启动流程？", "answer": "点击图标 → Launcher 通知 AMS → AMS 请求 Zygote fork 进程 → 创建 Application → 启动 MainActivity。", "difficulty": 3, "tags": ["Android", "启动流程"]},
        {"id": "ARC_007", "question": "什么是 HAL？", "answer": "Hardware Abstraction Layer，硬件抽象层，将硬件操作封装，使 Framework 与硬件解耦。", "difficulty": 2, "tags": ["Android", "HAL"]},
        {"id": "ARC_008", "question": "Android 进程优先级？", "answer": "前台进程 > 可见进程 > 服务进程 > 后台进程 > 空进程。优先级低的容易被系统回收。", "difficulty": 2, "tags": ["Android", "进程"]},
        {"id": "ARC_009", "question": "Android 中的 Context 是什么？", "answer": "上下文，提供应用环境和资源访问。Application、Activity、Service 都是 Context 的子类。", "difficulty": 1, "tags": ["Android", "Context"]},
        {"id": "ARC_010", "question": "AndroidManifest.xml 的作用？", "answer": "应用配置清单，声明组件、权限、最小 SDK 版本、应用包名等元信息。", "difficulty": 1, "tags": ["Android", "配置"]},
    ]
}
write_json("questions/day5/system_arch.json", system_arch)

framework = {
    "metadata": {"category": "Framework源码", "subcategory": "核心组件", "day": 6, "total_questions": 10},
    "questions": [
        {"id": "FW_001", "question": "Handler 机制的原理？", "answer": "Handler 发送消息到 MessageQueue，Looper 循环取出消息并分发给 Handler 处理。", "difficulty": 2, "tags": ["Android", "Handler"]},
        {"id": "FW_002", "question": "MessageQueue 的数据结构？", "answer": "单链表实现的优先级队列，按 when 时间排序，支持插入屏障消息。", "difficulty": 3, "tags": ["Android", "Handler"]},
        {"id": "FW_003", "question": "IdleHandler 是什么？", "answer": "在 MessageQueue 空闲时执行，用于延迟初始化或低优先级任务。", "difficulty": 3, "tags": ["Android", "Handler"]},
        {"id": "FW_004", "question": "Choreographer 的作用？", "answer": "管理帧率，通过接收 VSync 信号协调动画、输入、绘制的时机，避免卡顿。", "difficulty": 3, "tags": ["Android", "UI"]},
        {"id": "FW_005", "question": "View 的绘制流程？", "answer": "measure(测量) → layout(布局) → draw(绘制)，分别确定大小、位置、内容。", "difficulty": 2, "tags": ["Android", "View"]},
        {"id": "FW_006", "question": "requestLayout 和 invalidate 的区别？", "answer": "requestLayout: 重新测量和布局；invalidate: 仅重绘当前 View，不重新测量。", "difficulty": 2, "tags": ["Android", "View"]},
        {"id": "FW_007", "question": "View 的事件分发机制？", "answer": "Activity → PhoneWindow → DecorView → ViewGroup → View。dispatchTouchEvent → onInterceptTouchEvent → onTouchEvent。", "difficulty": 3, "tags": ["Android", "事件"]},
        {"id": "FW_008", "question": "Window 和 WindowManager 的关系？", "answer": "Window 是抽象概念，PhoneWindow 是具体实现；WindowManager 管理 Window 的添加、更新、删除。", "difficulty": 3, "tags": ["Android", "Window"]},
        {"id": "FW_009", "question": "AMS 是什么？主要职责？", "answer": "ActivityManagerService，管理系统四大组件生命周期、进程调度、任务栈等。", "difficulty": 3, "tags": ["Android", "AMS"]},
        {"id": "FW_010", "question": "WMS 是什么？主要职责？", "answer": "WindowManagerService，管理窗口的层级、大小、位置、焦点等。", "difficulty": 3, "tags": ["Android", "WMS"]},
    ]
}
write_json("questions/day6/framework.json", framework)

performance = {
    "metadata": {"category": "性能优化", "subcategory": "优化技巧", "day": 7, "total_questions": 10},
    "questions": [
        {"id": "PER_001", "question": "如何检测内存泄漏？", "answer": "使用 LeakCanary 自动检测，或 Android Profiler 手动分析堆转储。", "difficulty": 2, "tags": ["Android", "内存"]},
        {"id": "PER_002", "question": "Bitmap 优化方法？", "answer": "使用 inSampleSize 压缩、inBitmap 复用内存、RGB_565 格式、及时 recycle。", "difficulty": 2, "tags": ["Android", "Bitmap"]},
        {"id": "PER_003", "question": "RecyclerView 的优化技巧？", "answer": "使用 DiffUtil、setHasFixedSize、ViewHolder 复用、分页加载、减少过度绘制。", "difficulty": 2, "tags": ["Android", "RecyclerView"]},
        {"id": "PER_004", "question": "过度绘制如何检测和优化？", "answer": "开发者选项 GPU 过度绘制调试，优化方法: 移除不必要背景、使用 clipRect、减少层级。", "difficulty": 2, "tags": ["Android", "UI"]},
        {"id": "PER_005", "question": "启动速度优化方法？", "answer": "延迟初始化、异步加载、使用 Startup 库、减少 Application 工作量、布局预加载。", "difficulty": 3, "tags": ["Android", "启动"]},
        {"id": "PER_006", "question": "APK 瘦身方法？", "answer": "移除无用资源、使用 AndResGuard、图片压缩/WebP、开启混淆、分包。", "difficulty": 2, "tags": ["Android", "APK"]},
        {"id": "PER_007", "question": "卡顿优化思路？", "answer": "Systrace/Profiler 定位问题，优化主线程耗时操作、减少布局层级、避免频繁 GC。", "difficulty": 2, "tags": ["Android", "性能"]},
        {"id": "PER_008", "question": "电量优化方法？", "answer": "减少 Alarm/Job 频率、合并网络请求、使用 WorkManager、传感器按需注册。", "difficulty": 2, "tags": ["Android", "电量"]},
        {"id": "PER_009", "question": "什么是 TraceView？", "answer": "性能分析工具，可查看方法执行时间和调用栈，但开销较大。", "difficulty": 2, "tags": ["Android", "工具"]},
        {"id": "PER_010", "question": "LayoutInflater 的优化？", "answer": "使用 AsyncLayoutInflater 异步加载布局，或使用 ViewStub 延迟加载。", "difficulty": 3, "tags": ["Android", "布局"]},
    ]
}
write_json("questions/day7/performance.json", performance)

print("Generated day5-7 questions!")
