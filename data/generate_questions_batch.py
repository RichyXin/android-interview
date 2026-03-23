#!/usr/bin/env python3
"""批量生成高质量面试题"""

import json
import os

def ensure_dir(path):
    os.makedirs(os.path.dirname(path), exist_ok=True)

def write_json(path, data):
    ensure_dir(path)
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"Generated: {path} ({len(data['questions'])} questions)")

# 定义题目模板库
question_templates = {
    "Android基础": [
        {
            "q": "Android 四大组件是什么？它们各自的作用和使用场景？",
            "a": "Android 四大组件是 Activity、Service、BroadcastReceiver、ContentProvider。\n\n**Activity**：\n- 作用：提供用户界面，处理用户交互\n- 场景：应用的主界面、详情页\n\n**Service**：\n- 作用：在后台执行长时间运行的操作\n- 场景：音乐播放、文件下载、定时任务\n\n**BroadcastReceiver**：\n- 作用：接收系统和应用发送的广播消息\n- 场景：监听网络变化、电量变化、开机启动\n\n**ContentProvider**：\n- 作用：在不同应用间共享数据\n- 场景：通讯录、相册、系统设置",
            "d": 1, "t": ["Android", "四大组件"]
        },
        {
            "q": "AndroidManifest.xml 的作用是什么？",
            "a": "AndroidManifest.xml 是应用的配置文件，作用包括：\n\n1. **声明组件**：注册 Activity、Service、BroadcastReceiver、ContentProvider\n2. **申请权限**：声明应用需要的权限（如网络、定位、相机）\n3. **配置应用信息**：包名、版本号、应用图标、主题等\n4. **声明硬件要求**：需要的屏幕尺寸、API 级别等\n5. **IntentFilter**：配置组件响应的 Intent\n\n示例：\n```xml\n<manifest>\n    <application android:icon=\"@mipmap/ic_launcher\">\n        <activity android:name=\".MainActivity\">\n            <intent-filter>\n                <action android:name=\"android.intent.action.MAIN\"/>\n            </intent-filter>\n        </activity>\n    </application>\n</manifest>\n```",
            "d": 1, "t": ["Android", "配置"]
        },
        {
            "q": "什么是 Context？Application Context 和 Activity Context 的区别？",
            "a": "Context 是上下文，提供访问应用资源和执行操作的能力。\n\n**主要类型**：\n- Application Context：应用全局，生命周期长\n- Activity Context：绑定 Activity，生命周期短\n\n**区别**：\n| 特性 | Application | Activity |\n|------|-------------|----------|\n| 生命周期 | 应用存活期间 | Activity 存活期间 |\n| 内存泄漏 | 不易泄漏 | 易泄漏 |\n| 显示 Dialog | ❌ 不能 | ✅ 可以 |\n| 启动 Activity | 需要 FLAG_NEW_TASK | 直接启动 |\n\n**使用建议**：\n- 单例/工具类：使用 Application Context\n- UI 操作：使用 Activity Context\n- 避免内存泄漏：优先使用 Application Context",
            "d": 2, "t": ["Android", "Context"]
        }
    ],
    "Kotlin基础": [
        {
            "q": "Kotlin 中的 val 和 var 有什么区别？",
            "a": "**val**：\n- 只读变量，类似 Java final\n- 只能赋值一次\n- 线程安全\n\n**var**：\n- 可变变量\n- 可以多次赋值\n- 普通变量\n\n**示例**：\n```kotlin\nval name = \"Tom\"      // 不可变\n// name = \"Jerry\"    // ❌ 编译错误\n\nvar age = 25          // 可变\nage = 26              // ✅ 可以修改\n```\n\n**最佳实践**：\n- 优先使用 val\n- 只在需要修改时使用 var",
            "d": 1, "t": ["Kotlin", "变量"]
        },
        {
            "q": "Kotlin 的函数参数默认值和命名参数是什么？",
            "a": "**默认参数值**：\n```kotlin\nfun greet(name: String, greeting: String = \"Hello\") {\n    println(\"$greeting, $name!\")\n}\n\ngreet(\"Tom\")                    // Hello, Tom!\ngreet(\"Tom\", \"Hi\")             // Hi, Tom!\n```\n\n**命名参数**：\n```kotlin\nfun createUser(name: String, age: Int, email: String) { }\n\n// 调用时可以指定参数名\ncreateUser(\n    name = \"Tom\",\n    age = 25,\n    email = \"tom@example.com\"\n)\n\n// 可以跳过某些参数（如果有默认值）\ncreateUser(age = 30, name = \"Jerry\", email = \"jerry@example.com\")\n```\n\n**优点**：\n- 提高代码可读性\n- 避免参数顺序错误\n- 可选参数更灵活",
            "d": 1, "t": ["Kotlin", "函数"]
        }
    ],
    "Java并发": [
        {
            "q": "什么是线程安全？如何保证线程安全？",
            "a": "**线程安全**：多个线程同时访问时，程序能正确执行，不会产生数据不一致。\n\n**保证线程安全的方法**：\n\n1. **synchronized**\n```java\nsynchronized void method() { }\n```\n\n2. **ReentrantLock**\n```java\nlock.lock();\ntry { } finally { lock.unlock(); }\n```\n\n3. **原子类**\n```java\nAtomicInteger counter = new AtomicInteger(0);\n```\n\n4. **ThreadLocal**\n```java\nThreadLocal<DateFormat> df = new ThreadLocal<>();\n```\n\n5. **不可变对象**\n```java\nfinal class Immutable {\n    private final int value;\n}\n```\n\n6. **线程安全集合**\n```java\nConcurrentHashMap, CopyOnWriteArrayList\n```",
            "d": 2, "t": ["Java", "线程安全"]
        },
        {
            "q": "synchronized 修饰方法和代码块有什么区别？",
            "a": "**修饰方法**：\n```java\n// 同步实例方法（锁对象是当前实例）\nsynchronized void method() { }\n\n// 同步静态方法（锁对象是 Class 对象）\nstatic synchronized void staticMethod() { }\n```\n\n**修饰代码块**：\n```java\n// 锁当前对象\nsynchronized(this) { }\n\n// 锁指定对象\nsynchronized(obj) { }\n\n// 锁 Class 对象\nsynchronized(MyClass.class) { }\n```\n\n**区别**：\n| 方式 | 粒度 | 灵活度 | 性能 |\n|------|------|--------|------|\n| 方法 | 整个方法 | 低 | 较低 |\n| 代码块 | 部分代码 | 高 | 较高 |\n\n**建议**：\n- 尽量使用代码块，减少锁持有时间\n- 只锁必要代码，提高并发性能",
            "d": 2, "t": ["Java", "锁"]
        }
    ],
    "JVM": [
        {
            "q": "JVM 的内存模型（JMM）是什么？",
            "a": "**Java Memory Model（JMM）**定义了多线程环境下共享变量的访问规则。\n\n**主内存与工作内存**：\n```\n主内存（共享）\n    │\n    ├─ 线程A工作内存（拷贝）\n    │\n    └─ 线程B工作内存（拷贝）\n```\n\n**三大特性**：\n\n1. **原子性**：基本类型的读写是原子的\n2. **可见性**：一个线程修改后，其他线程可见\n3. **有序性**：禁止指令重排序\n\n**实现方式**：\n- volatile：保证可见性和有序性\n- synchronized：保证原子性、可见性、有序性\n- final：保证初始化安全性\n\n**happens-before 规则**：\n- 程序顺序规则\n- volatile 规则\n- 锁规则\n- 传递性",
            "d": 3, "t": ["JVM", "内存模型"]
        }
    ],
    "性能优化": [
        {
            "q": "Android 应用启动速度如何优化？",
            "a": "**启动优化策略**：\n\n1. **延迟初始化**\n```kotlin\n// 使用 by lazy\nval database by lazy { Database.getInstance() }\n\n// 非必要 SDK 延迟加载\nThread { CrashReporter.init() }.start()\n```\n\n2. **异步加载**\n```kotlin\n// 使用 Handler 延迟执行\nHandler().postDelayed({ initThirdParty() }, 2000)\n```\n\n3. **优化布局**\n- 减少布局层级\n- 使用 ConstraintLayout\n- 延迟加载非首屏布局\n\n4. **资源优化**\n- 图片懒加载\n- 字体预加载\n- 主题延迟加载\n\n5. **使用 Startup 库**\n```kotlin\n// 定义初始化任务\nclass DatabaseInitializer : Initializer<Database> {\n    override fun create(context: Context) = Database.getInstance(context)\n}\n```\n\n**测量工具**：\n- Systrace\n- Method Tracing\n- Custom Trace",
            "d": 2, "t": ["Android", "启动优化"]
        }
    ],
    "设计模式": [
        {
            "q": "单例模式有哪些实现方式？各自的优缺点？",
            "a": "**单例模式实现方式**：\n\n1. **饿汉式**\n```java\npublic class Singleton {\n    private static final Singleton INSTANCE = new Singleton();\n    public static Singleton getInstance() { return INSTANCE; }\n}\n```\n优点：线程安全，简单\n缺点：类加载时就创建，可能浪费资源\n\n2. **懒汉式（线程不安全）**\n```java\npublic class Singleton {\n    private static Singleton instance;\n    public static Singleton getInstance() {\n        if (instance == null) instance = new Singleton();\n        return instance;\n    }\n}\n```\n缺点：多线程不安全\n\n3. **懒汉式（synchronized）**\n```java\npublic static synchronized Singleton getInstance() {\n    if (instance == null) instance = new Singleton();\n    return instance;\n}\n```\n缺点：每次调用都同步，性能低\n\n4. **双重检查锁定（DCL）**\n```java\nprivate volatile static Singleton instance;\npublic static Singleton getInstance() {\n    if (instance == null) {\n        synchronized (Singleton.class) {\n            if (instance == null) instance = new Singleton();\n        }\n    }\n    return instance;\n}\n```\n优点：线程安全，高性能\n\n5. **静态内部类**\n```java\npublic class Singleton {\n    private static class Holder {\n        private static final Singleton INSTANCE = new Singleton();\n    }\n    public static Singleton getInstance() { return Holder.INSTANCE; }\n}\n```\n优点：延迟加载，线程安全，无性能问题\n\n6. **枚举（最佳）**\n```java\npublic enum Singleton { INSTANCE; }\n```\n优点：线程安全，防反射攻击，防序列化问题",
            "d": 2, "t": ["设计模式", "单例"]
        }
    ]
}

# 生成大量题目
def generate_massive_questions():
    all_questions = []
    question_id = 1
    
    # 为每个类别生成题目
    for