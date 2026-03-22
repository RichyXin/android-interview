#!/usr/bin/env python3
import json
import os

def write_json(path, data):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"Generated: {path} ({len(data['questions'])} questions)")

# Day 2: Kotlin 基础 - 扩充到 40 题
kotlin_basic = {
    "metadata": {"category": "Kotlin基础", "subcategory": "基础语法", "day": 2, "total_questions": 25},
    "questions": [
        {"id": "KT_001", "question": "val 和 var 的区别？", "answer": "val: 只读变量(相当于 Java final)；var: 可变变量", "difficulty": 1, "tags": ["Kotlin", "变量"]},
        {"id": "KT_002", "question": "Kotlin 的空安全机制有哪些？", "answer": "?. 安全调用、?: Elvis运算符、!! 非空断言、let 安全调用块", "difficulty": 1, "tags": ["Kotlin", "空安全"]},
        {"id": "KT_003", "question": "什么是扩展函数？", "answer": "在不继承的情况下为类添加新函数。定义: fun 类名.函数名() {}", "difficulty": 2, "tags": ["Kotlin", "扩展函数"]},
        {"id": "KT_004", "question": "data class 的作用？", "answer": "自动生成 equals、hashCode、toString、copy、componentN 方法", "difficulty": 1, "tags": ["Kotlin", "数据类"]},
        {"id": "KT_005", "question": "sealed class 是什么？", "answer": "密封类，限制继承层次，子类必须在同一文件。when 表达式无需 else 分支", "difficulty": 2, "tags": ["Kotlin", "密封类"]},
        {"id": "KT_006", "question": "object 和 companion object 的区别？", "answer": "object: 单例类；companion object: 伴生对象，类似 Java static 方法", "difficulty": 2, "tags": ["Kotlin", "单例"]},
        {"id": "KT_007", "question": "lateinit 和 lazy 的区别？", "answer": "lateinit: 延迟初始化，用于 var，需手动检查初始化；lazy: 惰性加载，用于 val，线程安全", "difficulty": 2, "tags": ["Kotlin", "延迟初始化"]},
        {"id": "KT_008", "question": "inline function 的作用？", "answer": "内联函数，编译时将函数体插入调用处，减少函数调用开销，配合 reified 获取泛型类型", "difficulty": 3, "tags": ["Kotlin", "内联函数"]},
        {"id": "KT_009", "question": "高阶函数是什么？", "answer": "接收函数作为参数或返回函数的函数。例如: fun foo(callback: () -> Unit) {}", "difficulty": 2, "tags": ["Kotlin", "高阶函数"]},
        {"id": "KT_010", "question": "Lambda 表达式的 it 是什么？", "answer": "单参数 Lambda 的隐式参数名，可省略声明参数", "difficulty": 1, "tags": ["Kotlin", "Lambda"]},
        {"id": "KT_011", "question": "crossinline 和 noinline 的作用？", "answer": "crossinline: 禁止非局部返回；noinline: 不内联特定参数", "difficulty": 3, "tags": ["Kotlin", "内联"]},
        {"id": "KT_012", "question": "Kotlin 的泛型协变和逆变？", "answer": "out: 协变(只返回，类似 Java <? extends>)；in: 逆变(只接收，类似 Java <? super>)", "difficulty": 3, "tags": ["Kotlin", "泛型"]},
        {"id": "KT_013", "question": "reified 关键字的作用？", "answer": "具体化类型参数，允许在函数体内获取泛型类型信息 T::class", "difficulty": 3, "tags": ["Kotlin", "泛型"]},
        {"id": "KT_014", "question": "Kotlin 的解构声明是什么？", "answer": "将对象分解为多个变量。例如: val (name, age) = user", "difficulty": 2, "tags": ["Kotlin", "解构"]},
        {"id": "KT_015", "question": "属性委托的原理？", "answer": "通过 by 关键字将属性的 get/set 委托给另一个对象，如 lazy、observable、vetoable", "difficulty": 3, "tags": ["Kotlin", "委托"]},
        {"id": "KT_016", "question": "Kotlin 与 Java 互调用的注意事项？", "answer": "Kotlin 调用 Java 注意空安全；Java 调用 Kotlin 注意默认参数、扩展函数需静态调用", "difficulty": 2, "tags": ["Kotlin", "互操作"]},
        {"id": "KT_017", "question": "Kotlin 的类型推断？", "answer": "编译器自动推断变量类型，无需显式声明。val name = \"Tom\" 自动推断为 String", "difficulty": 1, "tags": ["Kotlin", "类型推断"]},
        {"id": "KT_018", "question": "函数默认参数和命名参数？", "answer": "fun foo(a: Int = 0, b: Int = 0)，调用时可 foo(b = 1) 跳过 a", "difficulty": 1, "tags": ["Kotlin", "参数"]},
        {"id": "KT_019", "question": "什么是类型别名？", "answer": "typealias 为现有类型提供替代名称，简化复杂类型签名，如 typealias Name = String", "difficulty": 2, "tags": ["Kotlin", "类型别名"]},
        {"id": "KT_020", "question": "Kotlin 的操作符重载？", "answer": "通过 operator fun 定义，如重载 plus 实现 + 运算符。operator fun plus(other: T): T", "difficulty": 2, "tags": ["Kotlin", "操作符"]},
        {"id": "KT_021", "question": "Kotlin 的作用域函数有哪些？", "answer": "let、run、with、apply、also。区别在于返回值是对象本身还是 lambda 结果", "difficulty": 2, "tags": ["Kotlin", "作用域函数"]},
        {"id": "KT_022", "question": "apply 和 also 的区别？", "answer": "apply: 返回对象本身，this 指向对象；also: 返回对象本身，it 指向对象", "difficulty": 2, "tags": ["Kotlin", "作用域函数"]},
        {"id": "KT_023", "question": "let 和 run 的区别？", "answer": "let: 返回 lambda 结果，it 指向对象；run: 返回 lambda 结果，this 指向对象", "difficulty": 2, "tags": ["Kotlin", "作用域函数"]},
        {"id": "KT_024", "question": "Kotlin 的接口可以有默认实现吗？", "answer": "可以，接口中定义的函数可以有方法体，实现类可选择性重写", "difficulty": 1, "tags": ["Kotlin", "接口"]},
        {"id": "KT_025", "question": "Kotlin 的 @JvmOverloads 注解作用？", "answer": "为带有默认参数的函数生成多个重载方法，供 Java 调用", "difficulty": 2, "tags": ["Kotlin", "注解"]},
    ]
}
write_json("questions/day2/kotlin_basic.json", kotlin_basic)

# Kotlin 协程 - 扩充到 20 题
kotlin_coroutine = {
    "metadata": {"category": "Kotlin高级", "subcategory": "协程", "day": 2, "total_questions": 20},
    "questions": [
        {"id": "KC_001", "question": "什么是协程？", "answer": "轻量级线程，由用户控制调度，可在挂起点暂停和恢复，不阻塞线程", "difficulty": 2, "tags": ["Kotlin", "协程"]},
        {"id": "KC_002", "question": "CoroutineScope 是什么？", "answer": "协程作用域，定义协程的生命周期边界。常见: GlobalScope、lifecycleScope、viewModelScope", "difficulty": 2, "tags": ["Kotlin", "协程"]},
        {"id": "KC_003", "question": "launch 和 async 的区别？", "answer": "launch: 启动新协程，返回 Job；async: 启动并返回 Deferred，可用 await() 获取结果", "difficulty": 2, "tags": ["Kotlin", "协程"]},
        {"id": "KC_004", "question": "Dispatchers 有哪些类型？", "answer": "Main(主线程)、IO(网络IO)、Default(计算密集型)、Unconfined(不限定线程)", "difficulty": 2, "tags": ["Kotlin", "协程"]},
        {"id": "KC_005", "question": "withContext 的作用？", "answer": "切换协程上下文(线程)，执行完毕后自动切换回原上下文", "difficulty": 2, "tags": ["Kotlin", "协程"]},
        {"id": "KC_006", "question": "协程的取消机制？", "answer": "通过 Job.cancel() 取消，需在协程中检查 isActive，挂起函数自动处理取消", "difficulty": 3, "tags": ["Kotlin", "协程"]},
        {"id": "KC_007", "question": "什么是结构化并发？", "answer": "父协程等待所有子协程完成，异常时取消所有子协程。supervisorScope 改变此行为", "difficulty": 3, "tags": ["Kotlin", "协程"]},
        {"id": "KC_008", "question": "Flow 是什么？", "answer": "冷流，类似 RxJava Observable，按需发射数据序列。使用 collect 收集", "difficulty": 3, "tags": ["Kotlin", "Flow"]},
        {"id": "KC_009", "question": "StateFlow 和 SharedFlow 的区别？", "answer": "StateFlow: 有初始值，只保留最新值，适合 UI 状态；SharedFlow: 可配置缓存重放，适合事件", "difficulty": 3, "tags": ["Kotlin", "Flow"]},
        {"id": "KC_010", "question": "Channel 是什么？", "answer": "协程间通信机制，支持 send/receive，类似阻塞队列但非阻塞", "difficulty": 3, "tags": ["Kotlin", "Channel"]},
        {"id": "KC_011", "question": "冷流和热流的区别？", "answer": "冷流(Flow): 每个收集者独立执行；热流(StateFlow/SharedFlow): 活跃时发射，多收集者共享", "difficulty": 3, "tags": ["Kotlin", "Flow"]},
        {"id": "KC_012", "question": "flowOn 的作用？", "answer": "改变上游执行的调度器。多次调用只影响前面的操作符", "difficulty": 3, "tags": ["Kotlin", "Flow"]},
        {"id": "KC_013", "question": "协程异常处理？", "answer": "使用 try-catch 或 CoroutineExceptionHandler。async 在 await() 时抛异常", "difficulty": 3, "tags": ["Kotlin", "协程"]},
        {"id": "KC_014", "question": "suspend 函数的原理？", "answer": "编译器生成状态机，在挂起点保存状态并退出，恢复时从状态机继续执行", "difficulty": 3, "tags": ["Kotlin", "协程"]},
        {"id": "KC_015", "question": "LiveData 和 Flow 如何转换？", "answer": "LiveData 转 Flow: asFlow()；Flow 转 LiveData: asLiveData()", "difficulty": 2, "tags": ["Kotlin", "Flow"]},