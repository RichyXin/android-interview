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

# Day 2: Kotlin 基础
kotlin_basic = {
    "metadata": {"category": "Kotlin基础", "subcategory": "基础语法", "day": 2, "total_questions": 10},
    "questions": [
        {"id": "KT_001", "question": "val 和 var 的区别？", "answer": "val: 只读变量，相当于 Java final；var: 可变变量。", "difficulty": 1, "tags": ["Kotlin", "变量"]},
        {"id": "KT_002", "question": "Kotlin 的空安全机制有哪些？", "answer": "?. 安全调用、?: Elvis运算符、!! 非空断言、let 安全调用块。", "difficulty": 1, "tags": ["Kotlin", "空安全"]},
        {"id": "KT_003", "question": "什么是扩展函数？", "answer": "在不继承的情况下为类添加新函数。定义方式：fun 类名.函数名() {}", "difficulty": 2, "tags": ["Kotlin", "扩展函数"]},
        {"id": "KT_004", "question": "data class 的作用？", "answer": "自动生成 equals、hashCode、toString、copy、componentN 方法。", "difficulty": 1, "tags": ["Kotlin", "数据类"]},
        {"id": "KT_005", "question": "sealed class 是什么？", "answer": "密封类，限制继承层次，子类必须在同一文件。用于 when 表达式时无需 else 分支。", "difficulty": 2, "tags": ["Kotlin", "密封类"]},
        {"id": "KT_006", "question": "object 和 companion object 的区别？", "answer": "object: 单例类；companion object: 伴生对象，类似 Java static 方法。", "difficulty": 2, "tags": ["Kotlin", "单例"]},
        {"id": "KT_007", "question": "lateinit 和 lazy 的区别？", "answer": "lateinit: 延迟初始化，用于 var；lazy: 惰性加载，用于 val，线程安全。", "difficulty": 2, "tags": ["Kotlin", "延迟初始化"]},
        {"id": "KT_008", "question": "inline function 的作用？", "answer": "内联函数，编译时将函数体插入调用处，减少函数调用开销。", "difficulty": 3, "tags": ["Kotlin", "内联函数"]},
        {"id": "KT_009", "question": "高阶函数是什么？", "answer": "接收函数作为参数或返回函数的函数。例如: fun foo(callback: () -> Unit) {}", "difficulty": 2, "tags": ["Kotlin", "高阶函数"]},
        {"id": "KT_010", "question": "Kotlin 与 Java 互调用的注意事项？", "answer": "Kotlin 调用 Java 注意空安全；Java 调用 Kotlin 注意默认参数、扩展函数等。", "difficulty": 2, "tags": ["Kotlin", "互操作"]},
    ]
}
write_json("questions/day2/kotlin_basic.json", kotlin_basic)

# Day 2: Kotlin 协程
kotlin_coroutine = {
    "metadata": {"category": "Kotlin高级", "subcategory": "协程", "day": 2, "total_questions": 10},
    "questions": [
        {"id": "KC_001", "question": "什么是协程？", "answer": "轻量级线程，由用户控制调度，可在挂起点暂停和恢复，不阻塞线程。", "difficulty": 2, "tags": ["Kotlin", "协程"]},
        {"id": "KC_002", "question": "CoroutineScope 是什么？", "answer": "协程作用域，定义协程的生命周期边界。常见: GlobalScope、lifecycleScope、viewModelScope。", "difficulty": 2, "tags": ["Kotlin", "协程"]},
        {"id": "KC_003", "question": "launch 和 async 的区别？", "answer": "launch: 启动新协程，返回 Job；async: 启动并返回 Deferred，可用 await() 获取结果。", "difficulty": 2, "tags": ["Kotlin", "协程"]},
        {"id": "KC_004", "question": "Dispatchers 有哪些类型？", "answer": "Dispatchers.Main(主线程)、IO(网络IO)、Default(计算密集型)、Unconfined(不限定线程)。", "difficulty": 2, "tags": ["Kotlin", "协程"]},
        {"id": "KC_005", "question": "withContext 的作用？", "answer": "切换协程上下文(线程)，执行完毕后自动切换回原上下文。", "difficulty": 2, "tags": ["Kotlin", "协程"]},
        {"id": "KC_006", "question": "协程的取消机制？", "answer": "通过 Job.cancel() 取消，需在协程中检查 isActive，挂起函数自动处理。", "difficulty": 3, "tags": ["Kotlin", "协程"]},
        {"id": "KC_007", "question": "Flow 是什么？", "answer": "冷流，类似 RxJava Observable，按需发射数据序列。使用 collect 收集。", "difficulty": 3, "tags": ["Kotlin", "Flow"]},
        {"id": "KC_008", "question": "StateFlow 和 SharedFlow 的区别？", "answer": "StateFlow: 有初始值，只保留最新值；SharedFlow: 可配置缓存，支持重放。", "difficulty": 3, "tags": ["Kotlin", "Flow"]},
        {"id": "KC_009", "question": "Channel 是什么？", "answer": "协程间通信机制，支持 send/receive，类似阻塞队列但非阻塞。", "difficulty": 3, "tags": ["Kotlin", "Channel"]},
        {"id": "KC_010", "question": "LiveData 和 Flow 如何转换？", "answer": "LiveData 转 Flow: asFlow()；Flow 转 LiveData: asLiveData()。", "difficulty": 2, "tags": ["Kotlin", "Flow"]},
    ]
}
write_json("questions/day2/kotlin_coroutine.json", kotlin_coroutine)

# Day 3: Java 并发
java_concurrent = {
    "metadata": {"category": "Java并发", "subcategory": "多线程", "day": 3, "total_questions": 10},
    "questions": [
        {"id": "JC_001", "question": "线程的几种状态？", "answer": "NEW、RUNNABLE、BLOCKED、WAITING、TIMED_WAITING、TERMINATED。", "difficulty": 1, "tags": ["Java", "线程"]},
        {"id": "JC_002", "question": "synchronized 和 ReentrantLock 的区别？", "answer": "synchronized: JVM 实现，自动释放锁；ReentrantLock: API 实现，需手动释放，支持公平锁、中断、条件变量。", "difficulty": 2, "tags": ["Java", "锁"]},
        {"id": "JC_003", "question": "volatile 的作用？", "answer": "保证可见性（立即写回主内存）和禁止指令重排序，但不保证原子性。", "difficulty": 2, "tags": ["Java", "volatile"]},
        {"id": "JC_004", "question": "线程池的参数有哪些？", "answer": "corePoolSize(核心线程数)、maximumPoolSize(最大线程数)、keepAliveTime(存活时间)、workQueue(任务队列)、handler(拒绝策略)。", "difficulty": 2, "tags": ["Java", "线程池"]},
        {"id": "JC_005", "question": "线程池的拒绝策略有哪些？", "answer": "AbortPolicy(抛异常)、CallerRunsPolicy(调用者执行)、DiscardPolicy(静默丢弃)、DiscardOldestPolicy(丢弃最老任务)。", "difficulty": 2, "tags": ["Java", "线程池"]},
        {"id": "JC_006", "question": "AQS 是什么？", "answer": "AbstractQueuedSynchronizer，抽象队列同步器，是 JUC 的基础，如 ReentrantLock、CountDownLatch 都基于 AQS。", "difficulty": 3, "tags": ["Java", "AQS"]},
        {"id": "JC_007", "question": "CAS 原理及缺点？", "answer": "Compare And Swap，原子操作。缺点: ABA 问题、循环开销大、只能保证单个变量原子性。", "difficulty": 3, "tags": ["Java", "CAS"]},
        {"id": "JC_008", "question": "CountDownLatch 和 CyclicBarrier 的区别？", "answer": "CountDownLatch: 倒计时，到0触发；CyclicBarrier: 循环屏障，到达数量后触发并可重置。", "difficulty": 2, "tags": ["Java", "并发工具"]},
        {"id": "JC_009", "question": "ThreadLocal 原理及内存泄漏？", "answer": "线程本地变量，每个线程有独立副本。内存泄漏: ThreadLocalMap 的 Entry 使用弱引用，ThreadLocal 被回收但 Value 未清。", "difficulty": 3, "tags": ["Java", "ThreadLocal"]},
        {"id": "JC_010", "question": "CompletableFuture 的作用？", "answer": "Java8 异步编程工具，支持链式调用、组合多个异步任务、异常处理。", "difficulty": 3, "tags": ["Java", "异步"]},
    ]
}
write_json("questions/day3/java_concurrent.json", java_concurrent)

# Day 4: JVM
jvm_gc = {
    "metadata": {"category": "JVM", "subcategory": "垃圾回收", "day": 4, "total_questions": 10},
    "questions": [
        {"id": "JVM_001", "question": "JVM 内存分区有哪些？", "answer": "堆(新生代、老年代)、方法区(元空间)、虚拟机栈、本地方法栈、程序计数器。", "difficulty": 1, "tags": ["JVM", "内存"]},
        {"id": "JVM_002", "question": "如何判断对象可回收？", "answer": "可达性分析: 从 GC Roots 出发，不可达的对象可回收。GC Roots 包括栈引用、静态变量、常量等。", "difficulty": 2, "tags": ["JVM", "GC"]},
        {"id": "JVM_003", "question": "垃圾回收算法有哪些？", "answer": "标记-清除、复制、标记-整理、分代收集。", "difficulty": 2, "tags": ["JVM", "GC"]},
        {"id": "JVM_004", "question": "CMS 和 G1 的区别？", "answer": "CMS: 老年代、标记-清除、并发收集、内存碎片；G1: 整堆、标记-整理、可预测停顿、Region 划分。", "difficulty": 3, "tags": ["JVM", "GC"]},
        {"id": "JVM_005", "question": "双亲委派模型是什么？", "answer": "类加载器层级: Bootstrap → Extension → Application → Custom。先让父加载器加载，避免重复加载。", "difficulty": 2, "tags": ["JVM", "类加载"]},
        {"id": "JVM_006", "question": "如何打破双亲委派？", "answer": "重写 loadClass() 方法，如 Tomcat 的 WebAppClassLoader 优先加载 WEB-INF/classes 下的类。", "difficulty": 3, "tags": ["JVM", "类加载"]},
        {"id": "JVM_007", "question": "什么是 STW？", "answer": "Stop The World，GC 时暂停所有用户线程，保证内存一致性。", "difficulty": 2, "tags": ["JVM", "GC"]},
        {"id": "JVM_008", "question": "Minor GC、Major GC、Full GC 的区别？", "answer": "Minor GC: 新生代；Major GC: 老年代；Full GC: 整堆和方法区。", "difficulty": 2, "tags": ["JVM", "GC"]},
        {"id": "JVM_009", "question": "强引用、软引用、弱引用、虚引用的区别？", "answer": "强: 不回收；软: 内存不足回收；弱: GC 时回收；虚: 随时回收，用于跟踪对象回收。", "difficulty": 2, "tags": ["JVM", "引用"]},
        {"id": "JVM_010", "question": "JVM 调优常用参数？", "answer": "-Xms/-Xmx(堆大小)、-XX:NewRatio(新老比例)、-XX:+UseG1GC(使用G1)。", "difficulty": 3, "tags": ["JVM", "调优"]},
    ]
}
write_json("questions/day4/jvm_gc.json", jvm_gc)

print("All question files generated!")
