#!/usr/bin/env python3
import json
import os

def ensure_dir(path):
    os.makedirs(os.path.dirname(path), exist_ok=True)

def write_json(path, data):
    ensure_dir(path)
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"Generated: {path} ({len(data['questions'])} questions)")

# Day 1: Android 基础 - 扩充到 40 题 (Activity 20 + Fragment 10 + Service 10)
activity = {
    "metadata": {"category": "Android基础", "subcategory": "Activity", "day": 1, "total_questions": 20},
    "questions": [
        {"id": "ACT_001", "question": "Activity 的生命周期方法有哪些？", "answer": "onCreate → onStart → onResume → onPause → onStop → onRestart → onDestroy", "difficulty": 1, "tags": ["Activity", "生命周期"]},
        {"id": "ACT_002", "question": "Activity 的四种启动模式是什么？", "answer": "standard(默认)、singleTop(栈顶复用)、singleTask(栈内复用)、singleInstance(独立任务栈)", "difficulty": 2, "tags": ["Activity", "启动模式"]},
        {"id": "ACT_003", "question": "onSaveInstanceState() 的作用是什么？", "answer": "在 Activity 被系统回收前调用，用于保存临时状态。触发时机：Home 键、屏幕旋转、内存不足等", "difficulty": 2, "tags": ["Activity", "状态保存"]},
        {"id": "ACT_004", "question": "Activity 之间如何通信？", "answer": "1. Intent 传递数据 2. Activity Result API 3. ViewModel + LiveData 4. EventBus 5. 共享文件/数据库", "difficulty": 2, "tags": ["Activity", "通信"]},
        {"id": "ACT_005", "question": "什么是 TaskAffinity？", "answer": "定义 Activity 倾向于属于哪个任务栈。singleTask 会优先寻找相同 taskAffinity 的栈", "difficulty": 3, "tags": ["Activity", "taskAffinity"]},
        {"id": "ACT_006", "question": "onNewIntent() 什么时候调用？", "answer": "当 Activity 为 singleTop 或 singleTask 模式且已存在时，调用 onNewIntent() 传递新 Intent", "difficulty": 2, "tags": ["Activity", "启动模式"]},
        {"id": "ACT_007", "question": "Activity Result API 的使用方式？", "answer": "registerForActivityResult() 注册回调，launch() 启动。替代 startActivityForResult", "difficulty": 1, "tags": ["Activity", "启动"]},
        {"id": "ACT_008", "question": "Activity 窗口添加流程是怎样的？", "answer": "onResume → makeVisible → WindowManager.addView → ViewRootImpl.setView → WMS.addToDisplay", "difficulty": 3, "tags": ["Activity", "Window", "源码"]},
        {"id": "ACT_009", "question": "ViewModelStore 是什么？", "answer": "存储 ViewModel 的容器。配置变更时保留 ViewModel，Activity finish 时清理", "difficulty": 2, "tags": ["Activity", "ViewModel"]},
        {"id": "ACT_010", "question": "屏幕旋转时如何保存数据？", "answer": "1. ViewModel（推荐）2. onSaveInstanceState() 3. 设置 configChanges 自行处理", "difficulty": 2, "tags": ["Activity", "配置变更"]},
        {"id": "ACT_011", "question": "Activity.finish() 和 System.exit(0) 的区别？", "answer": "finish() 关闭当前 Activity；System.exit(0) 杀死整个进程", "difficulty": 2, "tags": ["Activity", "进程"]},
        {"id": "ACT_012", "question": "Activity 启动流程涉及哪些 IPC 调用？", "answer": "ActivityThread → AMS → Zygote → ActivityThread → Instrumentation → Activity", "difficulty": 3, "tags": ["Activity", "启动流程", "IPC"]},
        {"id": "ACT_013", "question": "如何处理 Activity 的内存泄漏？", "answer": "1. 避免静态变量持有 Context 2. 及时取消网络请求 3. 使用 WeakReference 4. 使用 LeakCanary 检测", "difficulty": 2, "tags": ["Activity", "内存泄漏"]},
        {"id": "ACT_014", "question": "Activity 的 theme 中 windowIsTranslucent 的作用？", "answer": "设置窗口为半透明，配合 windowBackground 可实现透明 Activity 效果", "difficulty": 2, "tags": ["Activity", "主题"]},
        {"id": "ACT_015", "question": "什么是 ContentProvider 的启动模式？", "answer": "singleTask，确保只有一个实例，避免多实例数据不一致问题", "difficulty": 3, "tags": ["Activity", "启动模式"]},
        {"id": "ACT_016", "question": "Activity 的 Intent Flag 有哪些常用值？", "answer": "FLAG_ACTIVITY_NEW_TASK、FLAG_ACTIVITY_CLEAR_TOP、FLAG_ACTIVITY_SINGLE_TOP、FLAG_ACTIVITY_NO_HISTORY", "difficulty": 2, "tags": ["Activity", "Intent"]},
        {"id": "ACT_017", "question": "如何获取 Activity 的返回结果？", "answer": "新版使用 Activity Result API；旧版使用 startActivityForResult + onActivityResult", "difficulty": 1, "tags": ["Activity", "结果返回"]},
        {"id": "ACT_018", "question": "Activity 的 launchMode 和 Intent Flag 的优先级？", "answer": "Intent Flag 优先级高于 manifest 中的 launchMode", "difficulty": 3, "tags": ["Activity", "启动模式"]},
        {"id": "ACT_019", "question": "什么是 Activity 的 clearTaskOnLaunch 属性？", "answer": "设置为 true 时，从主屏幕重新启动应用会清除根 Activity 之上的所有 Activity", "difficulty": 3, "tags": ["Activity", "配置"]},
        {"id": "ACT_020", "question": "Activity 的 excludeFromRecents 属性的作用？", "answer": "设置为 true 时，该 Activity 不会出现在最近任务列表中", "difficulty": 2, "tags": ["Activity", "配置"]},
    ]
}
write_json("questions/day1/activity.json", activity)

service = {
    "metadata": {"category": "Android基础", "subcategory": "Service", "day": 1, "total_questions": 10},
    "questions": [
        {"id": "SVC_001", "question": "Service 的生命周期方法有哪些？", "answer": "onCreate → onStartCommand/onBind → onUnbind → onDestroy", "difficulty": 1, "tags": ["Service", "生命周期"]},
        {"id": "SVC_002", "question": "startService 和 bindService 的区别？", "answer": "startService: 长期运行，与启动者生命周期无关；bindService: 绑定后通信，解绑即销毁", "difficulty": 2, "tags": ["Service", "启动方式"]},
        {"id": "SVC_003", "question": "Service 如何在后台保活？", "answer": "前台 Service(startForeground)、JobScheduler、WorkManager、双进程守护（不推荐）", "difficulty": 3, "tags": ["Service", "保活"]},
        {"id": "SVC_004", "question": "IntentService 的特点？", "answer": "自带工作线程，任务串行执行，执行完毕自动停止。已废弃，推荐使用 WorkManager", "difficulty": 2, "tags": ["Service", "IntentService"]},
        {"id": "SVC_005", "question": "前台 Service 和后台 Service 的区别？", "answer": "前台 Service 显示通知，优先级高不易被回收；后台 Service 优先级低，易被系统回收", "difficulty": 2, "tags": ["Service", "前台"]},
        {"id": "SVC_006", "question": "AIDL 在 Service 中的应用？", "answer": "通过 AIDL 定义接口，实现跨进程通信。Service 中实现接口，客户端绑定后调用", "difficulty": 3, "tags": ["Service", "AIDL"]},
        {"id": "SVC_007", "question": "Service 与线程的区别？", "answer": "Service 运行在主线程，需要手动创建工作线程；线程独立运行，但不易管理生命周期", "difficulty": 2, "tags": ["Service", "线程"]},
        {"id": "SVC_008", "question": "Android 8.0 后台 Service 限制？", "answer": "后台应用启动 Service 会抛出 IllegalStateException，需使用 JobScheduler 或前台 Service", "difficulty": 2, "tags": ["Service", "后台限制"]},
        {"id": "SVC_009", "question": "ServiceConnection 的回调方法？", "answer": "onServiceConnected(): 服务绑定成功；onServiceDisconnected(): 服务异常断开", "difficulty": 1, "tags": ["Service", "绑定"]},
        {"id": "SVC_010", "question": "Service 的 onStartCommand 返回值有哪些？", "answer": "START_STICKY(重建不保留Intent)、START_NOT_STICKY(不重建)、START_REDELIVER_INTENT(重建保留Intent)", "difficulty": 2, "tags": ["Service", "生命周期"]},
    ]
}
write_json("questions/day1/service.json", service)

print("Day 1 complete!")
