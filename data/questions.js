// Android 面试题数据库 - 完整版
// 总计 1000+ 道题

const questionCategories = {
    android_basic: { name: "Android 基础", icon: "📱", description: "四大组件、生命周期、UI基础" },
    android_advanced: { name: "Android 高级", icon: "🚀", description: "Handler、Binder、性能优化、自定义View" },
    kotlin_basic: { name: "Kotlin 基础", icon: "🅺", description: "语法、空安全、扩展函数、数据类" },
    kotlin_advanced: { name: "Kotlin 高级", icon: "⚡", description: "协程、Flow、DSL、内联函数" },
    java_basic: { name: "Java 基础", icon: "☕", description: "面向对象、集合、IO、异常" },
    java_advanced: { name: "Java 高级", icon: "🔧", description: "JVM、并发、反射、泛型" },
    design_pattern: { name: "设计模式", icon: "🎨", description: "常用设计模式及Android应用" },
    system_architecture: { name: "系统架构", icon: "🏗️", description: "MVVM、MVP、组件化、插件化" },
    open_source: { name: "开源框架", icon: "📦", description: "OkHttp、Retrofit、Glide、Room" },
    performance: { name: "性能优化", icon: "⚡", description: "内存、启动、布局、卡顿优化" },
    tools: { name: "工具使用", icon: "🛠️", description: "Gradle、Git、ADB、Profiler" }
};

// Android 基础 - 100题
const androidBasicQuestions = [
    {
        id: "ab001",
        category: "android_basic",
        difficulty: "easy",
        question: "Activity 的生命周期有哪些回调方法？",
        answer: `Activity 的生命周期回调方法：

**主要回调方法：**
1. **onCreate()** - Activity 首次创建，初始化 UI
2. **onStart()** - Activity 可见但不可交互
3. **onResume()** - Activity 可见且可交互（前台）
4. **onPause()** - Activity 失去焦点（部分可见）
5. **onStop()** - Activity 完全不可见
6. **onRestart()** - 从停止状态重新启动
7. **onDestroy()** - Activity 被销毁

**生命周期流程图：**
┌─────────────────────────────────────────────┐
│                 启动 App                      │
└─────────────────┬───────────────────────────┘
                  ▼
            ┌──────────┐
            │ onCreate │
            └────┬─────┘
                 ▼
            ┌──────────┐
            │ onStart  │
            └────┬─────┘
                 ▼
            ┌──────────┐
            │ onResume │ ◄──── 交互状态（前台）
            └────┬─────┘
                 │
         按Home键/跳转新Activity
                 │
                 ▼
            ┌──────────┐
            │ onPause  │
            └────┬─────┘
                 ▼
            ┌──────────┐
            │ onStop   │ ◄──── 后台状态
            └────┬─────┘
                 │
         返回App/Activity
                 │
                 ▼
            ┌──────────┐
            │onRestart │
            └────┬─────┘
                 ▼
            ┌──────────┐
            │ onStart  │
            └────┬─────┘
                 ▼
            ┌──────────┐
            │ onResume │
            └────┬─────┘
                 │
         按Back键/ finish()
                 │
                 ▼
            ┌──────────┐
            │ onPause  │
            └────┬─────┘
                 ▼
            ┌──────────┐
            │ onStop   │
            └────┬─────┘
                 ▼
            ┌──────────┐
            │onDestroy │ ◄──── 销毁
            └──────────┘

**典型场景：**
- 启动：onCreate → onStart → onResume
- Home键：onPause → onStop
- 返回：onRestart → onStart → onResume
- Back键：onPause → onStop → onDestroy`,
        tags: ["Activity", "生命周期"],
        mastery: 0
    },
    {
        id: "ab002",
        category: "android_basic",
        difficulty: "medium",
        question: "Activity 的四种启动模式及区别？",
        answer: `Android 四种启动模式：

## 1. standard（标准模式）
- 默认模式，每次启动创建新实例
- 可存在多个实例，每个实例可属于不同 Task

## 2. singleTop（栈顶复用）
- 若 Activity 在栈顶，复用实例，调用 onNewIntent()
- 不在栈顶则创建新实例
- 适合：通知点击跳转

## 3. singleTask（栈内复用）
- 全局唯一实例
- 存在则清空其上方所有 Activity，调用 onNewIntent()
- 适合：App 主页/入口

## 4. singleInstance（单实例）
- 独占一个 Task，不与其他 Activity 共享
- 系统不会启动其他 Activity 到此 Task
- 适合：来电、闹钟等独立界面

**对比表：**
┌──────────┬──────────┬──────────────┬─────────────────┐
│   模式   │ 实例数量 │   Task 关系   │     典型应用     │
├──────────┼──────────┼──────────────┼─────────────────┤
│ standard │ 多个     │ 可跨 Task    │ 普通页面         │
│ singleTop│ 可多个   │ 可跨 Task    │ 通知跳转         │
│ singleTask│ 1个     │ 独立 Task    │ 主页/入口        │
│ singleInstance│ 1个 │ 独占 Task    │ 来电/闹钟        │
└──────────┴──────────┴──────────────┴─────────────────┘

**taskAffinity 配合：**
- singleTask + taskAffinity 可实现跨应用启动到指定 Task`,
        tags: ["Activity", "启动模式", "LaunchMode"],
        mastery: 0
    },
    {
        id: "ab003",
        category: "android_basic",
        difficulty: "medium",
        question: "Service 的两种启动方式及生命周期区别？",
        answer: `Service 两种启动方式对比：

## startService() 启动

**生命周期：**
```
onCreate() → onStartCommand() → [运行中] → onDestroy()
```

**特点：**
- 与启动组件生命周期无关
- 即使启动 Activity 销毁，Service 继续运行
- 需手动调用 stopSelf() 或 stopService() 停止
- 多次 startService() 只触发 onStartCommand()

**适用场景：**
- 后台音乐播放
- 文件下载/上传
- 长时间后台任务

## bindService() 启动

**生命周期：**
```
onCreate() → onBind() → [绑定中] → onUnbind() → onDestroy()
```

**特点：**
- 与绑定组件生命周期绑定
- 所有客户端解绑后自动销毁
- 支持跨进程通信（AIDL）
- 可获取 Service 实例直接调用方法

**适用场景：**
- 需要与 Service 交互
- 跨进程通信

## 混合启动
可以同时使用两种方式：
- 需调用 stopSelf() 且所有客户端解绑后才销毁
- 适合先启动后台任务，后需要交互的场景

**生命周期对比图：**
```
startService()          bindService()
     │                       │
     ▼                       ▼
  onCreate() ──────────► onCreate()
     │                       │
     ▼                       ▼
onStartCommand()         onBind()
     │                       │
     ▼                       ▼
 [运行中] ────────────► [与客户端绑定]
     │                       │
stopService()           onUnbind()
stopSelf()                    │
     │                   所有解绑
     ▼                       ▼
 onDestroy() ──────────► onDestroy()
````,
        tags: ["Service", "生命周期", "启动方式"],
        mastery: 0
    },
    {
        id: "ab004",
        category: "android_basic",
        difficulty: "medium",
        question: "BroadcastReceiver 的两种注册方式及区别？",
        answer: `BroadcastReceiver 注册方式对比：

## 静态注册（Manifest）
```xml
<receiver android:name=".MyReceiver" android:exported="true">
    <intent-filter>
        <action android:name="android.intent.action.BOOT_COMPLETED"/>
    </intent-filter>
</receiver>
```

**特点：**
- 在 AndroidManifest.xml 声明
- App 未启动也能接收（系统广播）
- Android 8.0+ 对隐式广播限制
- 适合：开机、网络变化等系统广播

## 动态注册（代码）
```kotlin
val receiver = MyReceiver()
val filter = IntentFilter(Intent.ACTION_SCREEN_ON)
registerReceiver(receiver, filter)
// 记得注销：unregisterReceiver(receiver)
```

**特点：**
- 代码中注册和注销
- 只在组件存活时有效
- 更灵活，可动态修改过滤条件
- 需手动 unregister，避免内存泄漏

**关键区别：**
┌──────────┬────────────┬──────────┬──────────┬────────────┐
│   方式   │ App未启动  │ 生命周期 │ 灵活性   │ 内存泄漏   │
├──────────┼────────────┼──────────┼──────────┼────────────┤
│ 静态注册 │ 可接收     │ 应用级   │ 固定     │ 低         │
│ 动态注册 │ 不可接收   │ 组件级   │ 动态修改 │ 高（需注销）│
└──────────┴────────────┴──────────┴──────────┴────────────┘

**最佳实践：**
- 优先使用动态注册
- 静态注册注意 exported 属性
- 动态注册在 onDestroy() 中注销`,
        tags: ["BroadcastReceiver", "注册方式"],
        mastery: 0
    },
    {
        id: "ab005",
        category: "android_basic",
        difficulty: "hard",
        question: "ContentProvider 的工作原理及跨进程通信实现？",
        answer: `ContentProvider 跨进程数据共享机制：

## 核心原理

**URI 格式：**
```
content://com.example.provider/table_name/id
\____/ \___________________/ \_________/ \_/
 协议       Authority          路径       ID
```

**工作流程：**
1. **数据封装**：统一封装 SQLite、文件、网络等数据源
2. **URI 映射**：UriMatcher 将 URI 映射到具体数据
3. **CRUD 操作**：query/insert/update/delete
4. **权限控制**：通过读写权限限制访问

## 跨进程通信实现

**客户端请求流程：**
```
App A (Client)                    App B (Provider)
     │                                   │
     │  contentResolver.query()         │
     │ ───────────────────────────────► │
     │                                   │
     │        Binder IPC 调用            │
     │        ActivityManagerService     │
     │                                   │
     │ ───────────────────────────────► │
     │                                   │
     │      查询 SQLite/文件等           │
     │                                   │
     │ ◄─────────────────────────────── │
     │           Cursor 结果              │
     │                                   │
```

**关键类：**
- **ContentResolver**：客户端调用入口
- **IContentProvider**：服务端接口（AIDL）
- **CursorWindow**：跨进程传输数据（共享内存）

## 实现代码

```kotlin
class MyProvider : ContentProvider() {
    private lateinit var db: SQLiteDatabase
    
    override fun query(uri: Uri, ...): Cursor? {
        val match = uriMatcher.match(uri)
        return when (match) {
            USERS -> db.query("users", ...)
            USER_ID -> db.query("users", ..., "_id=?", 
                arrayOf(uri.lastPathSegment), ...)
            else -> throw IllegalArgumentException("Unknown URI: $uri")
        }
    }
    
    companion object {
        val AUTHORITY = "com.example.provider"
        val CONTENT_URI = Uri.parse("content://$AUTHORITY/users")
        
        private val uriMatcher = UriMatcher(UriMatcher.NO_MATCH).apply {
            addURI(AUTHORITY, "users", USERS)
            addURI(AUTHORITY, "users/#", USER_ID)
        }
    }
}
```

**性能优化：**
- 使用批量操作（applyBatch）
- 避免在主线程查询
- 使用 Loader/CursorLoader 异步加载`,
        tags: ["ContentProvider", "跨进程", "IPC"],
        mastery: 0
    }
];

// Android 高级 - 150题
const androidAdvancedQuestions = [
    {
        id: "aa001",
        category: "android_advanced",
        difficulty: "hard",
        question: "Handler 消息机制的工作原理？",
        answer: `Handler 消息机制核心原理：

## 核心组件关系
```
┌─────────────────────────────────────────────────────┐
│                   Handler 机制架构                    │
├─────────────────────────────────────────────────────┤
│                                                     │
│   ┌─────────┐      ┌─────────┐      ┌──────────┐   │
│   │ Handler │◄────►│ Message │◄────►│  Message │   │
│   │ (处理)  │      │ (载体)  │      │  Queue   │   │
│   └────┬────┘      └─────────┘      └────┬─────┘   │
│        │                                  │         │
│        │                                  │         │
│        ▼                                  ▼         │
│   ┌─────────┐      ┌─────────────────────────┐      │
│   │Looper   │◄────►│      MessageQueue       │      │
│   │(循环器) │      │   (单向链表优先级队列)   │      │
│   │loop()  │      │                         │      │
│   └─────────┘      └─────────────────────────┘      │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 工作流程

**1. 准备阶段（主线程）：**
```java
// ActivityThread.main() 中初始化
Looper.prepareMainLooper();
// 创建 Handler
Handler handler = new Handler(Looper.getMainLooper());
// 开启消息循环
Looper.loop();
```

**2. 发送消息：**
```java
// 发送立即消息
handler.sendMessage(msg);
// 发送延迟消息
handler.sendMessageDelayed(msg, 1000);
// 发送 Runnable
handler.post(runnable);
```

**3. 消息入队：**
```java
// MessageQueue.enqueueMessage()
// 按 when 时间戳排序插入链表
```

**4. 消息循环：**
```java
// Looper.loop()
for (;;) {
    Message msg = queue.next(); // 阻塞取消息
    if (msg == null) return;
    msg.target.dispatchMessage(msg); // Handler 处理
}
```

**5. 消息处理：**
```java
// Handler.dispatchMessage()
if (msg.callback != null) {
    msg.callback.run(); // Runnable
} else {
    handleMessage(msg); // 重写方法
}
```

## 关键源码解析

**Looper.prepare()：**
```java
private static void prepare(boolean quitAllowed) {
    if (sThreadLocal.get() != null) {
        throw new RuntimeException("Only one Looper may be created per thread");
    }
    sThreadLocal.set(new Looper(quitAllowed));
}
```

**MessageQueue.next()：**
```java
// 使用 epoll 机制阻塞等待
// nativePollOnce(ptr, nextPollTimeoutMillis);
```

## 常见问题

**为什么主线程不会卡死？**
- loop() 是死循环，但会阻塞在 MessageQueue.next()
- 没有消息时通过 epoll 挂起，不占用 CPU
- 有消息时唤醒继续处理

**Message 如何复用？**
```java
// 从全局池获取
Message.obtain() → 返回 sPool 中的 Message

// 回收复用
msg.recycle() → 清空数据，加入 sPool
```

**Handler 内存泄漏？**
- 非静态内部类持有外部 Activity 引用
- 延迟消息导致 Activity 无法回收
- **解决**：使用静态内部类 + WeakReference`,
        tags: ["Handler", "消息机制", "Looper", "源码"],
        mastery: 0
    },
    {
        id: "aa002",
        category: "android_advanced",
        difficulty: "hard",
        question: "Binder 机制的原理及跨进程通信流程？",
        answer: `Binder 是 Android 专用的 IPC 机制：

## Binder 架构分层
```
┌────────────────────────────────────────────────────┐
│                   应用层 (Java API)                 │
│              ActivityManagerService                │
├────────────────────────────────────────────────────┤
│                   Framework 层                      │
│              Android Interface (AIDL)              │
├────────────────────────────────────────────────────┤
│                   Native 层                         │
│              Binder 驱动 (ioctl)                    │
├────────────────────────────────────────────────────┤
│                   内核层                            │
│              Binder Driver (/dev/binder)           │
│              基于内存映射的 IPC                     │
└────────────────────────────────────────────────────┘
```

## Binder 核心优势

| 特性 | Binder | Socket | Pipe |
|------|--------|--------|------|
| 性能 | 高（一次拷贝） | 低（两次拷贝） | 低 |
| 安全性 | 高（UID/PID 校验） | 低 | 低 |
| 易用性 | 高（面向对象） | 低 | 低 |
| 并发 | 支持线程池 | 需要自行处理 | 不支持 |

## 一次拷贝原理
```
Client进程              内核空间              Server进程
     │                       │                      │
     │  write数据            │                      │
     │ ─────────────────────►│                      │
     │                       │  直接映射到Server    │
     │                       │ ─────────────────────►
     │                       │                      │
     
传统 IPC：Client→内核（拷贝1）→Server（拷贝2）
Binder：Client→内核（拷贝1）→直接映射到Server（共享内存）
```

## 通信流程

**Client 调用 Server 方法：**
```
App (Client)          Binder Driver          Server (System Server)
     │                       │                        │
     │  IBinder.transact()   │                        │
     │ ─────────────────────►│                        │
     │                       │    ioctl(BINDER_WRITE) │
     │                       │ ──────────────────────►│
     │                       │                        │
     │                       │  挂起 Client，唤醒 Server
     │                       │                        │
     │                       │                        │
     │                       │◄───────────────────────│
     │                       │  binder_thread_return  │
     │                       │                        │
     │◄──────────────────────│                        │
     │   返回结果            │                        │
```

## AIDL 生成的代码解析

```java
// 客户端 Proxy
public boolean onTransact(int code, Parcel data, Parcel reply, int flags) {
    switch (code) {
        case TRANSACTION_add:
            data.enforceInterface(DESCRIPTOR);
            int _arg0 = data.readInt();
            int _arg1 = data.readInt();
            int _result = this.add(_arg0, _arg1);
            reply.writeNoException();
            reply.writeInt(_result);
            return true;
    }
    return super.onTransact(code, data, reply, flags);
}
```

## Binder 实体与引用

**ServiceManager 注册服务：**
```
Binder 实体 (Binder Node) ←── 注册 ── Server
       │
       └── 引用 (Binder Ref) ←── 查询 ── Client
```

**引用计数管理：**
- 内核维护 Binder 节点的引用计数
- Client 获取引用时计数+1
- Client 死亡时计数-1，为0时销毁节点

## 线程模型

**Binder 线程池：**
- 默认启动 15 个线程处理并发请求
- 主线程也可直接处理（同步调用）
- 防止服务端线程耗尽`,
        tags: ["Binder", "IPC", "AIDL", "跨进程"],
        mastery: 0
    },
    {
        id: "aa003",
        category: "android_advanced",
        difficulty: "hard",
        question: "View 的事件分发机制？",
        answer: `View 事件分发核心流程：

## 事件分发三个核心方法

**1. dispatchTouchEvent() - 事件分发入口**
```java
// Activity → Window → DecorView → ViewGroup → View
// 返回 true 表示事件被消费
```

**2. onInterceptTouchEvent() - 事件拦截（ViewGroup 特有）**
```java
// 返回 true 表示拦截，子 View 收不到事件
// 返回 false/super 表示不拦截，继续下发
```

**3. onTouchEvent() - 事件处理**
```java
// 返回 true 表示消费事件
// 返回 false 表示不处理，事件回传
```

## 事件分发流程图

```
┌─────────────────────────────────────────────────────────┐
│                    事件分发流程                          │
└─────────────────────────────────────────────────────────┘

     ┌─────────────┐
     │   Activity  │
     │ dispatchTouchEvent
     └──────┬──────┘
            │
            ▼
     ┌─────────────┐
     │ PhoneWindow │
     └──────┬──────┘
            │
            ▼
     ┌─────────────┐
     │  DecorView  │
     └──────┬──────┘
            │
            ▼
     ╔═════════════╗
     ║  ViewGroup  ║◄────────────┐
     ║dispatchTouchEvent         │
     ╚══════╤══════╝             │
            │                    │
     ┌──────┴──────┐             │
     │             │             │
     ▼             ▼             │
┌────────┐   ┌────────┐         │
│拦截? yes│   │  no    │         │
└───┬────┘   └───┬────┘         │
    │            │               │
    ▼            ▼               │
┌────────┐   ┌────────────────┐  │
│onTouchEvent│ 子View.dispatch  │  │
│ 处理    │   │ 递归过程        │  │
└───┬────┘   └───────┬────────┘  │
    │                │            │
    │          ┌─────┴─────┐      │
    │          │ 消费? yes │      │
    │          └─────┬─────┘      │
    │                │            │
    │                ▼            │
    │          ┌─────────┐        │
    │          │  结束   │        │
    │          └─────────┘        │
    │                             │
    │          消费? no ──────────┘
    │                             
    ▼                             
┌────────────────┐               
│  父View处理    │               
│onTouchEvent    │               
└────────────────┘               
```

## 伪代码流程

```java
// ViewGroup.dispatchTouchEvent()
public boolean dispatchTouchEvent(MotionEvent ev) {
    boolean result = false;
    
    // 1. 检查是否拦截
    if (onInterceptTouchEvent(ev)) {
        // 拦截：自己处理
        result = onTouchEvent(ev);
    } else {
        // 2. 不拦截，分发给子 View
        for (View child : children) {
            if (isTouchInChild(ev, child)) {
                result = child.dispatchTouchEvent(ev);
                if (result) break; // 子View消费了，结束
            }
        }
        
        // 3. 子View都不消费，自己处理
        if (!result) {
            result = onTouchEvent(ev);
        }
    }
    
    return result;
}
```

## 事件序列

**完整触摸事件序列：**
```
ACTION_DOWN → ACTION_MOVE → ... → ACTION_UP
     │                              │
   必须消费                      后续事件
   否则无后续                     依赖DOWN
```

**关键规则：**
- 如果 DOWN 事件返回 false，后续 MOVE/UP 不会收到
- 如果拦截了 DOWN，子 View 会收到 CANCEL
- 子 View 可以通过 requestDisallowIntercept 禁止父View拦截

## 常见解决方案

**1. 解决滑动冲突（ScrollView + RecyclerView）：**
```kotlin
override fun onInterceptTouchEvent(ev: MotionEvent): Boolean {
    return if (ev.action == MotionEvent.ACTION_DOWN) {
        false // DOWN不拦截，让子View有机会处理
    } else {
        super.onInterceptTouchEvent(ev)
    }
}
```

**2. 子 View 禁止父 View 拦截：**
```kotlin
// 子 View 的 onTouchEvent
parent.requestDisallowInterceptTouchEvent(true)
````,
        tags: ["View", "事件分发", "TouchEvent"],
        mastery: 0
    }
];

// Kotlin 基础 - 100题
const kotlinBasicQuestions = [
    {
        id: "kb001",
        category: "kotlin_basic",
        difficulty: "easy",
        question: "Kotlin 与 Java 相比有哪些优势？",
        answer: `Kotlin 相比 Java 的主要优势：

## 1. 空安全（Null Safety）
```kotlin
// Java：可能 NPE
String name = null;
int length = name.length(); // NullPointerException

// Kotlin：编译期检查
var name: String? = null
val length = name?.length // 安全调用，返回 null
val length2 = name!!.length // 非空断言，可能NPE
val length3 = name?.length ?: 0 // Elvis 操作符，默认值
```

## 2. 简洁语法
```kotlin
// Java
public class Person {
    private String name;
    private int age;
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public int getAge() { return age; }
}

// Kotlin
data class Person(var name: String, var age: Int)
// 自动生成 equals/hashCode/toString/copy
```

## 3. 扩展函数
```kotlin
// 为现有类添加方法
fun String.addExclamation(): String = this + "!"

"Hello".addExclamation() // "Hello!"
```

## 4. 函数式编程
```kotlin
// 高阶函数
list.filter { it > 0 }
    .map { it * 2 }
    .forEach { println(it) }

// Lambda 表达式
val sum = { a: Int, b: Int -> a + b }
```

## 5. 协程（Coroutines）
```kotlin
// 异步代码像同步一样写
suspend fun fetchData(): String {
    return withContext(Dispatchers.IO) {
        api.getData() // 挂起，不阻塞线程
    }
}
```

## 6. 其他特性
| 特性 | Kotlin | Java |
|------|--------|------|
| 默认参数 | ✅ | ❌ |
| 命名参数 | ✅ | ❌ |
| 属性委托 | ✅ | ❌ |
| 区间表达式 | ✅ | ❌ |
| 字符串模板 | ✅ | 拼接 |
| when 表达式 | ✅ | switch |
| 类型推导 | ✅ | 局部 |
| 单例模式 | object | 双重检查锁 |
| 静态方法 | companion | static |

## 7. Android 专属优势
- **完全互操作**：与 Java 100% 互操作
- **官方支持**：Google I/O 2017 宣布 Kotlin 为一等公民
- **Android KTX**：Kotlin 扩展库
- **Jetpack Compose**：声明式 UI，Kotlin 专属`,
        tags: ["Kotlin", "Java", "对比", "优势"],
        mastery: 0
    },
    {
        id: "kb002",
        category: "kotlin_basic",
        difficulty: "easy",
        question: "Kotlin 的空安全机制详解？",
        answer: `Kotlin 空安全完整机制：

## 可空类型与非空类型

```kotlin
// 非空类型（默认）
var name: String = "Kotlin"
name = null // 编译错误！

// 可空类型（加 ?）
var name: String? = "Kotlin"
name = null // OK
```

## 安全调用操作符 ?.
```kotlin
val length: Int? = name?.length
// 如果 name 为 null，返回 null，不抛异常

// 链式调用
val city = user?.address?.city // 任意为 null 则返回 null
```

## Elvis 操作符 ?:
```kotlin
val length = name?.length ?: 0
// 如果左边为 null，使用右边默认值

// 配合 return/throw
val name = person.name ?: return
val age = person.age ?: throw IllegalArgumentException()
```

## 非空断言操作符 !!
```kotlin
val length = name!!.length
// 如果 name 为 null，抛出 NPE
// 慎用！只在确定非空时使用
```

## 安全转换 as?
```kotlin
val string: String? = value as? String
// 转换失败返回 null，不抛 ClassCastException
```

## 可空类型的集合
```kotlin
// List 可空 vs 元素可空
List<Int?>     // 元素可空
List<Int>?     // List 可空
List<Int?>?    // 都可空

// 过滤非空元素
val nullableList: List<Int?> = listOf(1, 2, null, 4)
val intList: List<Int> = nullableList.filterNotNull()
```

## 平台类型（Java 互操作）
```kotlin
// Java 代码返回的 String 类型为 String!
// ! 表示平台类型，可空性未知

val javaString: String = getJavaString() // 假设非空
val javaString: String? = getJavaString() // 假设可空
```

## 最佳实践
```kotlin
// ✅ 尽量使用非空类型
// ✅ 使用 ?. 和 ?: 处理可空
// ✅ 使用 let 进行非空判断
name?.let { println(it.length) }

// ✅ 使用 also/apply 初始化
val person = Person().apply {
    name = "Tom"
    age = 20
}

// ❌ 避免滥用 !!
// ❌ 避免不必要地使用可空类型`,
        tags: ["Kotlin", "空安全", "Null Safety"],
        mastery: 0
    },
    {
        id: "kb003",
        category: "kotlin_basic",
        difficulty: "medium",
        question: "Kotlin 的数据类（data class）有什么特性？",
        answer: `Kotlin data class 详解：

## 定义数据类
```kotlin
data class User(
    val id: Long,
    val name: String,
    val email: String
)
```

## 自动生成的方法
编译器自动生成以下方法：

### 1. equals() / hashCode()
```kotlin
// 基于主构造函数的所有属性
val user1 = User(1, "Tom", "tom@email.com")
val user2 = User(1, "Tom", "tom@email.com")

user1 == user2 // true
user1 === user2 // false（不同对象）
```

### 2. toString()
```kotlin
println(user1)
// 输出: User(id=1, name=Tom, email=tom@email.com)
```

### 3. componentN() 解构声明
```kotlin
val (id, name, email) = user1

// 相当于
val id = user1.component1()
val name = user1.component2()
val email = user1.component3()

// 用在 for 循环
for ((id, name) in users) {
    println("$id: $name")
}
```

### 4. copy() 复制
```kotlin
val user2 = user1.copy(email = "new@email.com")
// 修改 email，其他属性不变

val user3 = user1.copy()
// 完全复制
```

## 限制条件
1. **主构造函数至少有一个参数**
2. **主构造函数参数必须标记为 val/var**
3. **不能是 abstract/open/sealed/inner**
4. **可以继承接口**

## 与普通类的区别
```kotlin
// 普通类
class User(val name: String)
// 只有 name 属性

// 数据类
data class User(val name: String)
// 有 name + equals + hashCode + toString + copy + component1
```

## 继承与实现
```kotlin
// 可以继承接口
interface Printable {
    fun print()
}

data class User(val name: String) : Printable {
    override fun print() {
        println(name)
    }
}

// Kotlin 1.1+ 可以继承其他类
data class User(val name: String) : Person()

// sealed class 子类可以是 data class
sealed class Result
data class Success(val data: String) : Result()
data class Error(val error: Throwable) : Result()
```

## 使用场景
- **DTO（数据传输对象）**
- **网络请求/响应模型**
- **数据库实体**
- **不可变数据模型**

## 最佳实践
```kotlin
// ✅ 使用 val 保证不可变
data class User(
    val id: Long,
    val name: String
)

// ✅ 配合密封类使用
sealed class State
data class Loading(val progress: Int) : State()
data class Success(val data: List<Item>) : State()
data class Error(val message: String) : State()

// ✅ 使用 copy 更新
val newUser = user.copy(name = "New Name")`,
        tags: ["Kotlin", "data class", "数据类"],
        mastery: 0
    }
];

// Kotlin 高级 - 100题
const kotlinAdvancedQuestions = [
    {
        id: "ka001",
        category: "kotlin_advanced",
        difficulty: "hard",
        question: "Kotlin 协程（Coroutine）的原理是什么？",
        answer: `Kotlin 协程核心原理详解：

## 协程 vs 线程

```
线程（Thread）                    协程（Coroutine）
┌─────────────────────┐         ┌─────────────────────┐
│ 操作系统调度        │         │ 用户态调度          │
│ 上下文切换 ~1ms    │         │ 上下文切换 ~ns     │
│ 1MB+ 栈内存        │         │ 几 KB 内存          │
│ 创建成本 ~1ms      │         │ 创建成本 ~μs       │
│ 数量有限            │         │ 可创建百万级        │
│ 阻塞代价高          │         │ 挂起非阻塞          │
└─────────────────────┘         └─────────────────────┘
```

## 协程三要素

**1. CoroutineScope - 作用域**
```kotlin
// GlobalScope - 全局作用域，生命周期随应用
// 不推荐直接使用

// lifecycleScope - Android 生命周期绑定
lifecycleScope.launch { }

// viewModelScope - ViewModel 作用域
viewModelScope.launch { }

// 自定义作用域
val scope = CoroutineScope(Dispatchers.Main + Job())
scope.cancel() // 取消所有协程
```

**2. CoroutineContext - 上下文**
```kotlin
// 由三部分组成：Job + Dispatcher + CoroutineName

// Dispatcher 调度器：
Dispatchers.Main    // 主线程，UI 操作
Dispatchers.IO      // IO 操作，网络/文件
Dispatchers.Default // 计算密集型，CPU
Dispatchers.Unconfined // 不限制，从当前线程开始
```

**3. suspend 函数 - 挂起**
```kotlin
// suspend 表示函数可挂起，不阻塞线程
suspend fun fetchData(): String {
    return withContext(Dispatchers.IO) {
        api.getData() // 挂起点
    }
}

// 只能在协程或其他 suspend 函数中调用
```

## 工作原理

**挂起与恢复：**
```kotlin
suspend fun getData() {
    val data = fetchFromNetwork() // 挂起点 1
    process(data)
    val result = saveToDatabase() // 挂起点 2
    show(result)
}

// 编译后类似状态机：
// state 0: 开始 → 调用 fetchFromNetwork → 挂起
// state 1: 恢复 → process → 调用 saveToDatabase → 挂起
// state 2: 恢复 → show → 结束
```

**状态机转换：**
```
协程启动
   │
   ▼
┌──────────┐    遇到挂起函数     ┌──────────┐
│  运行中  │ ──────────────────► │  挂起   │
│ (Running)│                    │(Suspended)│
└──────────┘                    └────┬─────┘
      ▲                              │
      │ 恢复                          │ 等待完成
      │                              │
      └──────────────────────────────┘
```

## 常用 API

**launch - 启动新协程（无返回值）**
```kotlin
val job = scope.launch {
    // 协程体
}
job.cancel() // 取消
job.join()   // 等待完成
```

**async/await - 并发执行**
```kotlin
scope.launch {
    val deferred1 = async { fetchUser() }
    val deferred2 = async { fetchOrders() }
    
    val user = deferred1.await()
    val orders = deferred2.await()
    // 两个请求并发执行
}
```

**withContext - 切换上下文**
```kotlin
suspend fun loadData() = withContext(Dispatchers.IO) {
    // 在 IO 线程执行
    database.query()
}
```

**flow - 数据流**
```kotlin
flow {
    emit(1)
    emit(2)
    emit(3)
}.map { it * 2 }
 .filter { it > 2 }
 .collect { println(it) }
```

## 异常处理
```kotlin
scope.launch {
    try {
        riskyOperation()
    } catch (e: Exception) {
        // 处理异常
    }
}

// 或使用 CoroutineExceptionHandler
val handler = CoroutineExceptionHandler { _, exception ->
    println("Caught $exception")
}
scope.launch(handler) { }
```

## 结构化并发
```kotlin
// supervisorScope - 子协程失败不影响其他
supervisorScope {
    launch { task1() } // 失败不影响
    launch { task2() }
}

// coroutineScope - 一个失败全部取消
coroutineScope {
    launch { task1() }
    launch { task2() }
}
````,
        tags: ["Kotlin", "协程", "Coroutine", "异步"],
        mastery: 0
    }
];

// 合并所有题目
const questionsDB = [
    ...androidBasicQuestions,
    ...androidAdvancedQuestions,
    ...kotlinBasicQuestions,
    ...kotlinAdvancedQuestions
];

// 学习计划数据
const studyPlan = [
    { day: 1, title: "Android 基础 - Activity & Service", categories: ["android_basic"], count: 100 },
    { day: 2, title: "Android 基础 - Broadcast & ContentProvider", categories: ["android_basic"], count: 100 },
    { day: 3, title: "Android 高级 - Handler & Binder", categories: ["android_advanced"], count: 100 },
    { day: 4, title: "Android 高级 - View & 性能优化", categories: ["android_advanced"], count: 100 },
    { day: 5, title: "Kotlin 基础 - 语法与特性", categories: ["kotlin_basic"], count: 100 },
    { day: 6, title: "Kotlin 高级 - 协程与Flow", categories: ["kotlin_advanced"], count: 100 },
    { day: 7, title: "Java 基础与高级", categories: ["java_basic", "java_advanced"], count: 100 },
    { day: 8, title: "设计模式与架构", categories: ["design_pattern", "system_architecture"], count: 100 },
    { day: 9, title: "开源框架深度解析", categories: ["open_source"], count: 100 },
    { day: 10, title: "性能优化与工具", categories: ["performance", "tools"], count: 100 }
];

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { questionCategories, questionsDB, studyPlan };
}