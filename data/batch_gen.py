#!/usr/bin/env python3
import json, os

def write_json(path, data):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    return len(data['questions'])

# Day 2: 45题 Kotlin
kt_coroutine = {
    "metadata": {"category": "Kotlin高级", "subcategory": "协程", "day": 2, "total_questions": 15},
    "questions": [
        {"id": "KC_001", "question": "什么是协程？", "answer": "轻量级线程，由用户控制调度，可在挂起点暂停和恢复，不阻塞线程", "difficulty": 2, "tags": ["Kotlin", "协程"]},
        {"id": "KC_002", "question": "CoroutineScope 是什么？", "answer": "协程作用域，定义协程的生命周期边界。常见: GlobalScope、lifecycleScope、viewModelScope", "difficulty": 2, "tags": ["Kotlin", "协程"]},
        {"id": "KC_003", "question": "launch 和 async 的区别？", "answer": "launch: 返回 Job；async: 返回 Deferred，可用 await() 获取结果", "difficulty": 2, "tags": ["Kotlin", "协程"]},
        {"id": "KC_004", "question": "Dispatchers 有哪些类型？", "answer": "Main(主线程)、IO(网络IO)、Default(计算密集型)、Unconfined(不限定线程)", "difficulty": 2, "tags": ["Kotlin", "协程"]},
        {"id": "KC_005", "question": "withContext 的作用？", "answer": "切换协程上下文(线程)，执行完毕后自动切换回原上下文", "difficulty": 2, "tags": ["Kotlin", "协程"]},
        {"id": "KC_006", "question": "Flow 是什么？", "answer": "冷流，类似 RxJava Observable，按需发射数据序列", "difficulty": 3, "tags": ["Kotlin", "Flow"]},
        {"id": "KC_007", "question": "StateFlow 和 SharedFlow 的区别？", "answer": "StateFlow: 有初始值，适合 UI 状态；SharedFlow: 可配置缓存重放，适合事件", "difficulty": 3, "tags": ["Kotlin", "Flow"]},
        {"id": "KC_008", "question": "Channel 是什么？", "answer": "协程间通信机制，支持 send/receive，类似阻塞队列但非阻塞", "difficulty": 3, "tags": ["Kotlin", "Channel"]},
        {"id": "KC_009", "question": "冷流和热流的区别？", "answer": "冷流: 每个收集者独立执行；热流: 多收集者共享数据流", "difficulty": 3, "tags": ["Kotlin", "Flow"]},
        {"id": "KC_010", "question": "suspend 函数的原理？", "answer": "编译器生成状态机，在挂起点保存状态，恢复时从状态机继续执行", "difficulty": 3, "tags": ["Kotlin", "协程"]},
        {"id": "KC_011", "question": "协程的取消机制？", "answer": "通过 Job.cancel() 取消，需在协程中检查 isActive", "difficulty": 3, "tags": ["Kotlin", "协程"]},
        {"id": "KC_012", "question": "什么是结构化并发？", "answer": "父协程等待所有子协程完成，异常时取消所有子协程", "difficulty": 3, "tags": ["Kotlin", "协程"]},
        {"id": "KC_013", "question": "LiveData 和 Flow 如何转换？", "answer": "LiveData 转 Flow: asFlow()；Flow 转 LiveData: asLiveData()", "difficulty": 2, "tags": ["Kotlin", "Flow"]},
        {"id": "KC_014", "question": "flowOn 的作用？", "answer": "改变上游执行的调度器", "difficulty": 3, "tags": ["Kotlin", "Flow"]},
        {"id": "KC_015", "question": "协程异常处理？", "answer": "使用 try-catch 或 CoroutineExceptionHandler。async 在 await() 时抛异常", "difficulty": 3, "tags": ["Kotlin", "协程"]},
    ]
}
write_json("questions/day2/kotlin_coroutine.json", kt_coroutine)

# 新增: Java 基础 (Day 3)
java_basic = {
    "metadata": {"category": "Java基础", "subcategory": "语法", "day": 3, "total_questions": 20},
    "questions": [
        {"id": "JB_001", "question": "String、StringBuilder、StringBuffer 的区别？", "answer": "String: 不可变；StringBuilder: 可变，线程不安全；StringBuffer: 可变，线程安全", "difficulty": 1, "tags": ["Java", "String"]},
        {"id": "JB_002", "question": "== 和 equals() 的区别？", "answer": "==: 比较引用地址；equals(): 比较内容，默认也是 ==，需重写", "difficulty": 1, "tags": ["Java", "基础"]},
        {"id": "JB_003", "question": "hashCode() 和 equals() 的关系？", "answer": "equals 相等则 hashCode 必须相等；重写 equals 必须重写 hashCode", "difficulty": 2, "tags": ["Java", "集合"]},
        {"id": "JB_004", "question": "ArrayList 和 LinkedList 的区别？", "answer": "ArrayList: 数组实现，查询快；LinkedList: 链表实现，增删快", "difficulty": 1, "tags": ["Java", "集合"]},
        {"id": "JB_005", "question": "HashMap 和 HashTable 的区别？", "answer": "HashMap: 非线程安全，允许 null；HashTable: 线程安全，不允许 null", "difficulty": 2, "tags": ["Java", "集合"]},
        {"id": "JB_006", "question": "HashMap 的工作原理？", "answer": "数组+链表/红黑树。put时计算hash，冲突时用链表，长度>8转红黑树", "difficulty": 3, "tags": ["Java", "集合"]},
        {"id": "JB_007", "question": "ConcurrentHashMap 的实现原理？", "answer": "分段锁，Segment 数组，每个 Segment 是独立的锁", "difficulty": 3, "tags": ["Java", "并发"]},
        {"id": "JB_008", "question": "Java 中的反射是什么？", "answer": "运行时获取类的信息并操作，如 Class.forName、getMethod、invoke", "difficulty": 2, "tags": ["Java", "反射"]},
        {"id": "JB_009", "question": "接口和抽象类的区别？", "answer": "接口: 多实现，默认方法无实现；抽象类: 单继承，可有成员变量和方法实现", "difficulty": 1, "tags": ["Java", "基础"]},
        {"id": "JB_010", "question": "Java 的四种引用类型？", "answer": "强引用、软引用(SoftReference)、弱引用(WeakReference)、虚引用(PhantomReference)", "difficulty": 2, "tags": ["Java", "引用"]},
        {"id": "JB_011", "question": "final、finally、finalize 的区别？", "answer": "final: 修饰符；finally: 异常处理块；finalize: Object 的方法，GC 前调用", "difficulty": 1, "tags": ["Java", "基础"]},
        {"id": "JB_012", "question": "static 关键字的作用？", "answer": "修饰类成员表示类级别，不依赖实例。静态方法不能直接访问非静态成员", "difficulty": 1, "tags": ["Java", "基础"]},
        {"id": "JB_013", "question": "Java 的异常体系？", "answer": "Throwable → Error(不可恢复)、Exception → RuntimeException(非受检)、其他(受检)", "difficulty": 2, "tags": ["Java", "异常"]},
        {"id": "JB_014", "question": "深拷贝和浅拷贝的区别？", "answer": "浅拷贝: 复制引用；深拷贝: 递归复制对象，实现 Cloneable 或序列化", "difficulty": 2, "tags": ["Java", "拷贝"]},
        {"id": "JB_015", "question": "序列化和反序列化？", "answer": "对象转字节流和恢复。实现 Serializable 接口，transient 关键字排除字段", "difficulty": 2, "tags": ["Java", "序列化"]},
        {"id": "JB_016", "question": "Java 8 的新特性？", "answer": "Lambda、Stream API、Optional、新日期 API、接口默认方法、方法引用", "difficulty": 2, "tags": ["Java", "新特性"]},
        {"id": "JB_017", "question": "Stream API 的常见操作？", "answer": "map、filter、reduce、collect、forEach、sorted、distinct、limit", "difficulty": 2, "tags": ["Java", "Stream"]},
        {"id": "JB_018", "question": "Optional 的作用？", "answer": "避免 null 检查，链式调用。orElse、orElseThrow、ifPresent、map", "difficulty": 2, "tags": ["Java", "Optional"]},
        {"id": "JB_019", "question": "Comparable 和 Comparator 的区别？", "answer": "Comparable: 内部比较器，类实现；Comparator: 外部比较器，可多个排序规则", "difficulty": 2, "tags": ["Java", "比较器"]},
        {"id": "JB_020", "question": "Java 泛型的类型擦除？", "answer": "编译后泛型信息被擦除，替换为 Object 或边界类型。运行时无法获取泛型类型", "difficulty": 3, "tags": ["Java", "泛型"]},
    ]
}
write_json("questions/day3/java_basic.json", java_basic)

# 新增: 网络编程 (Day 11)
network = {
    "metadata": {"category": "网络编程", "subcategory": "HTTP/TCP", "day": 11, "total_questions": 20},
    "questions": [
        {"id": "NET_001", "question": "TCP 和 UDP 的区别？", "answer": "TCP: 面向连接、可靠、有序、流量控制；UDP: 无连接、不可靠、无序、效率高", "difficulty": 1, "tags": ["网络", "TCP"]},
        {"id": "NET_002", "question": "TCP 三次握手过程？", "answer": "SYN → SYN+ACK → ACK。客户端发起连接，服务端确认并请求，客户端确认", "difficulty": 2, "tags": ["网络", "TCP"]},
        {"id": "NET_003", "question": "TCP 四次挥手过程？", "answer": "FIN → ACK → FIN → ACK。主动关闭方发 FIN，被动方确认；被动方发 FIN，主动方确认", "difficulty": 2, "tags": ["网络", "TCP"]},
        {"id": "NET_004", "question": "为什么 TCP 挥手是四次？", "answer": "因为被动关闭方可能在 ACK 后还有数据要发，不能立即发 FIN，所以 ACK 和 FIN 分开", "difficulty": 2, "tags": ["网络", "TCP"]},
        {"id": "NET_005", "question": "HTTP 和 HTTPS 的区别？", "answer": "HTTPS = HTTP + SSL/TLS，加密传输，端口 443，需要证书", "difficulty": 1, "tags": ["