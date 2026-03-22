#!/usr/bin/env python3
"""生成 Android 面试题数据库 - 1200+ 题目"""

import json
import os

def ensure_dir(path):
    os.makedirs(os.path.dirname(path), exist_ok=True)

def write_json(path, data):
    ensure_dir(path)
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

# ==================== Day 1: Android 基础 ====================
def generate_day1():
    # Activity 题目 (15题)
    activity = {
        "metadata": {"category": "Android基础", "subcategory": "Activity", "day": 1, "total_questions": 15},
        "questions": [
            {
                "id": "ACT_001",
                "question": "Activity 的生命周期方法有哪些？请按调用顺序说明。",
                "answer": "Activity 生命周期方法：onCreate() → onStart() → onResume() → onPause() → onStop() → onRestart() → onDestroy()。典型场景：首次启动走 onCreate→onStart→onResume；跳转其他 Activity 走 onPause→onStop；返回走 onRestart→onStart→onResume。",
                "difficulty": 1,
                "tags": ["Activity", "生命周期"]
            },
            {
                "id": "ACT_002",
                "question": "Activity 的四种启动模式是什么？",
                "answer": "1. standard: 每次创建新实例；2. singleTop: 栈顶复用；3. singleTask: 栈内复用，清空其上 Activity；4. singleInstance: 单独任务栈，全局唯一。",
                "difficulty": 2,
                "tags": ["Activity", "启动模式"]
            },
            {
                "id": "ACT_003",
                "question": "onSaveInstanceState() 的作用是什么？",
                "answer": "在 Activity 被系统回收前调用，用于保存临时状态。触发时机：Home 键、屏幕旋转、内存不足等。可用 ViewModel 替代。",
                "difficulty": 2,
                "tags": ["Activity", "状态保存"]
            },
            {
                "id": "ACT_004",
                "question": "Activity 之间如何通信？",
                "answer": "1. Intent 传递数据；2. Activity Result API；3. ViewModel + LiveData；4. EventBus；5. 共享文件/数据库。",
                "difficulty": 2,
                "tags": ["Activity", "通信"]
            },
            {
                "id": "ACT_005",
                "question": "什么是 TaskAffinity？",
                "answer": "定义 Activity 倾向于属于哪个任务栈。singleTask 会优先寻找相同 taskAffinity 的栈，找不到则新建任务栈。",
                "difficulty": 3,
                "tags": ["Activity", "taskAffinity"]
            },
            {
                "id": "ACT_006",
                "question": "onNewIntent() 什么时候调用？",
                "answer": "当 Activity 为 singleTop 或 singleTask 模式且已存在时，不创建新实例，而是调用 onNewIntent() 传递新 Intent。",
                "difficulty": 2,
                "tags": ["Activity", "启动模式"]
            },
            {
                "id": "ACT_007",
                "question": "如何启动 Activity 并等待返回结果？",
                "answer": "新版使用 Activity Result API：registerForActivityResult() 注册回调，launch() 启动。旧版使用 startActivityForResult()。",
                "difficulty": 1,
                "tags": ["Activity", "startActivityForResult"]
            },
            {
                "id": "ACT_008",
                "question": "Activity 窗口添加流程是怎样的？",
                "answer": "onResume() → makeVisible() → WindowManager.addView() → ViewRootImpl.setView() → WMS.addToDisplay()。最终通过 Binder 调用系统服务。",
                "difficulty": 3,
                "tags": ["Activity", "Window", "源码"]
            },
            {
                "id": "ACT_009",
                "question": "ViewModelStore 是什么？",
                "answer": "存储 ViewModel 的容器。配置变更时保留 ViewModel，Activity 真正 finish 时才清理。通过 ViewModelProvider 获取。",
                "difficulty": 2,
                "tags": ["Activity", "ViewModel"]
            },
            {
                "id": "ACT_010",
                "question": "屏幕旋转时如何保存数据？",
                "answer": "1. ViewModel（推荐）；2. onSaveInstanceState()；3. 设置 configChanges 属性并自行处理。",
                "difficulty": 2,
                "tags": ["Activity", "配置变更"]
            },
            {
                "id": "ACT_011",
                "question": "Activity.finish() 和 System.exit(0) 的区别？",
                "answer": "finish() 只是关闭当前 Activity，返回上一个 Activity 或桌面；System.exit(0) 杀死整个进程。",
                "difficulty": 2,
                "tags": ["Activity", "进程"]
            },
            {
                "id": "ACT_012",
                "question": "Activity 启动流程涉及哪些 IPC 调用？",
                "answer": "ActivityThread → AMS (startActivity) → Zygote (fork 进程) → ActivityThread (handleLaunchActivity) → Instrumentation (newActivity) → Activity (onCreate)。",
                "difficulty": 3,
                "tags": ["Activity", "启动流程", "IPC"]
            },
            {
                "id": "ACT_013",
                "question": "Activity 的启动模式在源码中如何实现？",
                "answer": "AMS 在 startActivity() 中根据 launchMode 和 Intent Flag 计算启动模式，决定是创建新实例还是复用已有实例。",
                "difficulty": 3,
                "tags": ["Activity", "启动模式", "源码"]
            },
            {
                "id": "ACT_014",
                "question": "如何处理 Activity 的内存泄漏？",
                "answer": "1. 避免在 Activity 中使用静态变量持有 Context；2. 及时取消网络请求/定时器；3. 使用 WeakReference；4. 使用 LeakCanary 检测。",
                "difficulty": 2,
                "tags": ["Activity", "内存泄漏"]
            },
            {
                "id": "ACT_015",
                "question": "Activity 的 theme 中 windowIsTranslucent 的作用？",
                "answer": "设置窗口为半透明。配合 windowBackground 可实现透明 Activity，常用于实现类似 Dialog 的效果。",
                "difficulty": 2,
                "tags": ["Activity", "主题"]
            }
        ]
    }
    
    # Fragment 题目 (10题)
    fragment = {
        "metadata": {"category": "Android基础", "subcategory": "Fragment", "day": 1, "total_questions": 10},
        "questions": [
            {
                "id": "FRG_001",
                "question": "Fragment 的生命周期方法有哪些？",
                "answer": "onAttach → onCreate → onCreateView → onViewCreated → onStart → onResume → onPause → onStop → onDestroyView → onDestroy → onDetach。",
                "difficulty": 2,
                "tags": ["Fragment", "生命周期"]
            },
            {
                "id": "FRG_002",
                "question": "Fragment 和 Activity 如何通信？",
                "answer": "1. 接口回调；2. ViewModel + LiveData（推荐）；3. Fragment Result API；4. EventBus。",
                "difficulty": 2,
                "tags": ["Fragment", "通信"]
            },
            {
                "id": "FRG_003",
                "question": "add() 和 replace() 的区别？",
                "answer": "add() 添加新 Fragment，之前的保留；replace() 替换所有 Fragment，先移除旧的。",
                "difficulty": 2,
                "tags": ["Fragment", "事务"]
            },
            {
                "id": "FRG_004",
                "question": "hide() 和 show() 是否会触发生命周期？",
                "answer": "不会。hide/show 只改变 View 的 visibility，适合频繁切换的底部导航栏。",
                "difficulty": 2,
                "tags": ["Fragment", "生命周期"]
            },
            {
                "id": "FRG_005",
                "question": "Fragment 的懒加载如何实现？",
                "answer": "重写 onHiddenChanged() 或使用 viewLifecycleOwner 观察生命周期，配合 ViewPager2 的 registerOnPageChangeCallback。",
                "difficulty": 2,
                "tags": ["Fragment", "性能"]
            },
            {
                "id": "FRG_006",
                "question": "getActivity() 返回 null 的原因？",
                "answer": "Fragment 已与 Activity 解绑（onDetach 后）或尚未 attach。使用 requireActivity() 会抛异常，使用前先判断 isAdded()。",
                "difficulty": 2,
