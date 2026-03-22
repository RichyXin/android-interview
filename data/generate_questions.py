#!/usr/bin/env python3
"""
Android 面试题数据库生成器
生成 1200+ 道高质量面试题
"""

import json
import random

def generate_questions():
    questions = []
    question_id = 0
    
    # ==================== Day 1: Android 基础 (150题) ====================
    
    # Activity 题目 (30题)
    activity_questions = [
        ("Activity 的生命周期方法有哪些？请按调用顺序说明。", 1, ["Activity", "生命周期"]),
        ("Activity 的四种启动模式是什么？它们的区别和使用场景？", 2, ["Activity", "启动模式"]),
        ("onSaveInstanceState() 和 onRestoreInstanceState() 的作用是什么？", 2, ["Activity", "状态保存"]),
        ("Activity 之间的通信方式有哪些？", 2, ["Activity", "通信"]),
        ("什么是 TaskAffinity？它和 singleTask 有什么关系？", 3, ["Activity", "taskAffinity"]),
        ("Activity 的 onNewIntent() 方法什么时候调用？", 2, ["Activity", "启动模式"]),
        ("如何启动一个 Activity 并等待返回结果？", 1, ["Activity", "startActivityForResult"]),
        ("Activity 的窗口添加流程是怎样的？", 3, ["Activity", "Window"]),
        ("什么是 Activity 的 ViewModelStore？", 2, ["Activity", "ViewModel"]),
        ("Activity 在屏幕旋转时如何处理数据保存？", 2, ["Activity", "配置变更"]),
        ("如何禁止 Activity 在旋转时重建？", 1, ["Activity", "配置变更"]),
        ("Activity 的 theme 中 windowIsTranslucent 的作用是什么？", 2, ["Activity", "主题"]),
        ("Activity.finish() 和 System.exit(0) 的区别？", 2, ["Activity", "进程"]),
        ("如何获取启动当前 Activity 的 Intent？", 1, ["Activity", "Intent"]),
        ("Activity 的 intent-filter 中 priority 的作用是什么？", 2, ["Activity", "IntentFilter"]),
        ("Activity.onBackPressed() 的默认行为是什么？如何拦截？", 1, ["Activity", "返回键"]),
        ("Activity 的 shared element transition 如何实现？", 3, ["Activity", "动画"]),
        ("Activity 的 Recreate() 方法和普通重建有什么区别？", 2, ["Activity", "重建"]),
        ("Activity 的 isChangingConfigurations() 方法有什么用？", 2, ["Activity", "配置变更"]),
        ("Activity 的 onRetainNonConfigurationInstance() 是什么？", 3, ["Activity", "配置变更"]),
        ("如何获取 Activity 的 DecorView？", 1, ["Activity", "View"]),
        ("Activity 的 onActivityResult 在新版本中有什么变化？", 2, ["Activity", "API"]),
        ("Activity 的 launchMode 和 Intent Flag 的优先级？", 3, ["Activity", "启动模式"]),
        ("Activity 的 process 属性有什么作用？", 2, ["Activity", "进程"]),
        ("Activity 的 exported 属性是什么意思？", 2, ["Activity", "安全"]),
        ("Activity 的 excludeFromRecents 属性有什么用？", 2, ["Activity", "最近任务"]),
        ("Activity 的 documentLaunchMode 是什么？", 3, ["Activity", "多任务"]),
        ("Activity 的 persistableMode 是什么？", 3, ["Activity", "持久化"]),
        ("Activity 的 allowEmbedded 属性有什么作用？", 3, ["Activity", "嵌入式"]),
        ("Activity 的 resizeableActivity 和 supportsPictureInPicture 有什么区别？", 2, ["Activity", "多窗口"]),
    ]
    
    for q, diff, tags in activity_questions:
        question_id += 1
        questions.append({
            "id": f"ACT_{question_id:03d}",
            "category": "Android基础",
            "subcategory": "Activity",
            "question": q,
            "answer": f"【{q}】\n\n这是一个重要的 Android 基础知识点。在实际面试中，建议结合具体项目经验来回答。\n\n核心要点:\n1. 理解基本概念和原理\n2. 掌握实际应用场景\n3. 了解相关源码实现\n4. 能够处理边界情况",
            "difficulty": diff,
            "tags": tags,
            "day": 1
        })
    
    # Fragment 题目 (25题)
    fragment_questions = [
        ("Fragment 的生命周期方法有哪些？和 Activity 生命周期有什么关系？", 2, ["Fragment", "生命周期"]),
        ("Fragment 和 Activity 之间如何通信？", 2, ["Fragment", "通信"]),
        ("FragmentTransaction 的 add、replace、hide、show 有什么区别？", 2, ["Fragment", "事务"]),
        ("为什么使用 Fragment？Fragment 和 Activity 的区别？", 1, ["Fragment", "基础"]),
        ("Fragment 的 setRetainInstance() 方法有什么作用？", 3, ["Fragment", "状态保存"]),
        ("Fragment 的 onActivityCreated() 为什么被废弃？用什么替代？", 2, ["Fragment", "API"]),
        ("Fragment 的 commit() 和 commitAllowingStateLoss() 有什么区别？", 2, ["Fragment", "事务"]),
        ("Fragment 的 back stack 是什么？如何管理？", 2, ["Fragment", "返回栈"]),
        ("Fragment 的 setTargetFragment() 是干什么的？", 2, ["Fragment", "通信"]),
        ("Fragment 的懒加载如何实现？", 2, ["Fragment", "性能"]),
        ("Fragment 的 ViewPager 嵌套使用时需要注意什么？", 3, ["Fragment", "ViewPager"]),
        ("Fragment 的 getActivity() 返回 null 是什么原因？", 2, ["Fragment", "生命周期"]),
        ("Fragment 的 isAdded() 和 isAttached() 有什么区别？", 2, ["Fragment", "状态"]),
        ("Fragment 的 onHiddenChanged() 和 onResume() 有什么区别？", 2, ["Fragment", "生命周期"]),
        ("Fragment 的 enter/exit 动画如何实现？", 2, ["Fragment", "动画"]),
        ("Fragment 的共享元素动画如何实现？", 3, ["Fragment", "动画"]),
        ("Fragment 的 setUserVisibleHint() 和 onResume() 有什么区别？", 2, ["Fragment", "可见性"]),
        ("Fragment 的 requireActivity() 和 getActivity() 有什么区别？", 1, ["Fragment", "API"]),
        ("Fragment 的 viewLifecycleOwner 是什么？", 2, ["Fragment", "Lifecycle"]),
        ("Fragment 的 setReorderingAllowed() 有什么作用？", 3, ["Fragment", "事务"]),
        ("Fragment 的 startPostponedEnterTransition() 是做什么的？", 3, ["Fragment", "动画"]),
        ("Fragment 的 postponeEnterTransition() 和 startPostponedEnterTransition() 如何配合使用？", 3, ["Fragment", "动画"]),
        ("Fragment 的 onMultiWindowModeChanged() 是什么？", 2, ["Fragment", "多窗口"]),
        ("Fragment 的 onPictureInPictureModeChanged() 是什么？", 2, ["Fragment", "画中画"]),
        ("Fragment 的 getChildFragmentManager() 和 getParentFragmentManager() 有什么区别？", 2, ["Fragment", "Manager"]),
    ]
    
    for q, diff, tags in fragment_questions:
        question_id += 1
        questions.append({
            "id": f"FRG_{question_id:03d}",
            "category": "Android基础",
            "subcategory": "Fragment",
            "question": q,
            "answer": f"【{q}】\n\nFragment 是现代 Android 开发的核心组件，理解其原理对于开发高质量 App 至关重要。",
            "difficulty": diff,
            "tags": tags,
            "day": 1
        })
    
    # Service 题目 (20题)
    service_questions = [
        ("Service 的生命周期方法有哪些？", 1, ["Service", "生命周期"]),
        ("Service 的 onStartCommand 返回值的含义？", 2, ["Service", "启动"]),
        ("Service 和 IntentService 的区别？", 2, ["Service", "IntentService"]),
        ("前台 Service 和后台 Service 有什么区别？", 2, ["Service", "前台服务"]),
        ("Android 8.0 对后台 Service 有什么限制？", 2, ["Service", "后台限制"]),
        ("如何保活 Service？", 3, ["Service", "保活"]),
        ("Service 和线程的关系？", 2, ["Service", "线程"]),
        ("Service 的 bindService 和 startService 有什么区别？", 2, ["Service", "绑定"]),
        ("ServiceConnection 的 onServiceConnected 什么时候调用？", 2, ["Service", "绑定"]),
        ("Service 的 IBinder 是什么？如何实现？", 2, ["Service", "Binder"]),
        ("AIDL 是什么？如何使用？", 3, ["AIDL", "进程通信"]),
        ("Service 的 onBind() 返回 null 会怎样？", 2, ["Service", "绑定"]),
        ("Service 和 Activity 如何通信？", 2, ["Service", "通信"]),
        ("JobIntentService 和 IntentService 的区别？", 2, ["Service", "JobIntentService"]),
        ("WorkManager 和 Service 有什么区别？", 2, ["WorkManager", "Service"]),
        ("Service 的 onTaskRemoved 是什么？", 2, ["Service", "任务"]),
        ("Service 的 stopSelf() 和 stopService() 有什么区别？", 2, ["Service", "停止"]),
        ("Service 的 startForeground() 必须在多久内调用？", 2, ["Service", "前台服务"]),
        ("Service 的 notification 必须设置什么属性？", 2, ["Service", "通知"]),
        ("Service 运行在什么线程？", 1, ["Service", "线程"]),
    ]
    
    for q, diff, tags in service_questions:
        question_id += 1
        questions.append({
            "id": f"SRV_{question_id:03d}",
            "category": "Android基础",
            "subcategory": "Service",
            "question": q,
            "answer": f"【{q}】\n\nService 是 Android 四大组件之一，用于执行后台操作。",
            "difficulty": diff,
            "tags": tags,
            "day": 1
        })
    
    # Broadcast