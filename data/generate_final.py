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

# Day 8: Jetpack
jetpack = {
    "metadata": {"category": "Jetpack", "subcategory": "架构组件", "day": 8, "total_questions": 10},
    "questions": [
        {"id": "JP_001", "question": "ViewModel 的作用？", "answer": "在配置变更时保存 UI 数据，生命周期感知，与 UI 层解耦。", "difficulty": 1, "tags": ["Android", "Jetpack"]},
        {"id": "JP_002", "question": "LiveData 和 MutableLiveData 的区别？", "answer": "LiveData: 只读；MutableLiveData: 可修改，提供 setValue/postValue 方法。", "difficulty": 1, "tags": ["Android", "Jetpack"]},
        {"id": "JP_003", "question": "Room 数据库的三层架构？", "answer": "Entity(实体)、DAO(数据访问)、Database(数据库持有者)。", "difficulty": 2, "tags": ["Android", "Room"]},
        {"id": "JP_004", "question": "WorkManager 的使用场景？", "answer": "需要保证执行的后台任务，即使应用退出或设备重启也会执行。支持链式任务。", "difficulty": 2, "tags": ["Android", "Jetpack"]},
        {"id": "JP_005", "question": "DataBinding 的优势？", "answer": "减少 findViewById，实现数据和 UI 的自动同步，支持双向绑定。", "difficulty": 2, "tags": ["Android", "Jetpack"]},
        {"id": "JP_006", "question": "Navigation 组件的核心概念？", "answer": "NavGraph(导航图)、NavController(导航控制器)、Destination(目的地)。", "difficulty": 2, "tags": ["Android", "Jetpack"]},
        {"id": "JP_007", "question": "Lifecycle 组件的作用？", "answer": "让其他组件感知生命周期变化，避免内存泄漏，如 Presenter 在 onDestroy 时自动清理。", "difficulty": 2, "tags": ["Android", "Jetpack"]},
        {"id": "JP_008", "question": "Paging 库的分页策略？", "answer": "从数据源分页加载数据，支持网络、数据库或两者组合，自动处理预加载。", "difficulty": 3, "tags": ["Android", "Jetpack"]},
        {"id": "JP_009", "question": "Compose 的重组是什么？", "answer": "状态变化时自动重新执行可组合函数，智能比较跳过未变化部分。", "difficulty": 3, "tags": ["Android", "Compose"]},
        {"id": "JP_010", "question": "Compose 的 remember 和 mutableStateOf？", "answer": "remember: 跨重组保持值；mutableStateOf: 创建可变状态，变化触发重组。", "difficulty": 3, "tags": ["Android", "Compose"]},
    ]
}
write_json("questions/day8/jetpack.json", jetpack)

# Day 9: 设计模式
design = {
    "metadata": {"category": "设计模式", "subcategory": "常用模式", "day": 9, "total_questions": 10},
    "questions": [
        {"id": "DP_001", "question": "单例模式的实现方式？", "answer": "饿汉式、懒汉式(线程安全)、DCL、静态内部类、枚举(最佳)。", "difficulty": 2, "tags": ["设计模式", "单例"]},
        {"id": "DP_002", "question": "观察者模式在 Android 中的应用？", "answer": "LiveData、广播、点击事件监听、RxJava 等都使用观察者模式。", "difficulty": 2, "tags": ["设计模式", "观察者"]},
        {"id": "DP_003", "question": "Builder 模式的使用场景？", "answer": "构造参数多时，如 AlertDialog.Builder、OkHttpClient.Builder。", "difficulty": 2, "tags": ["设计模式", "Builder"]},
        {"id": "DP_004", "question": "代理模式的分类？", "answer": "静态代理、动态代理(JDK Proxy)、CGLIB 代理。Retrofit 使用动态代理。", "difficulty": 3, "tags": ["设计模式", "代理"]},
        {"id": "DP_005", "question": "MVC、MVP、MVVM 的区别？", "answer": "MVC: View 和 Controller 耦合；MVP: Presenter 桥接，接口臃肿；MVVM: 数据驱动，双向绑定，架构清晰。", "difficulty": 2, "tags": ["设计模式", "架构"]},
        {"id": "DP_006", "question": "工厂模式的类型？", "answer": "简单工厂、工厂方法、抽象工厂。Android 的 BitmapFactory 是简单工厂。", "difficulty": 2, "tags": ["设计模式", "工厂"]},
        {"id": "DP_007", "question": "装饰模式和代理模式的区别？", "answer": "装饰: 增强功能，可叠加；代理: 控制访问，通常单一层级。", "difficulty": 3, "tags": ["设计模式"]},
        {"id": "DP_008", "question": "策略模式的应用？", "answer": "定义算法族，分别封装，可互换。Android 中的 ListAdapter 排序策略。", "difficulty": 3, "tags": ["设计模式", "策略"]},
        {"id": "DP_009", "question": "责任链模式是什么？", "answer": "多个处理器串成链，请求沿链传递直到被处理。OkHttp 的 Interceptor。", "difficulty": 3, "tags": ["设计模式"]},
        {"id": "DP_010", "question": "依赖注入的原理？", "answer": "不直接创建依赖，由外部容器提供。Dagger、Hilt 实现编译期注入。", "difficulty": 3, "tags": ["设计模式", "DI"]},
    ]
}
write_json("questions/day9/design_pattern.json", design)

# Day 10: 开源框架
libs = {
    "metadata": {"category": "开源框架", "subcategory": "常用库", "day": 10, "total_questions": 10},
    "questions": [
        {"id": "LIB_001", "question": "OkHttp 的拦截器链原理？", "answer": "Interceptor 按顺序执行，可修改请求和响应。应用拦截器(只一次)、网络拦截器(可能多次)。", "difficulty": 3, "tags": ["框架", "网络"]},
        {"id": "LIB_002", "question": "Retrofit 的动态代理原理？", "answer": "通过 Proxy.newProxyInstance 生成接口实现，将方法调用转为 HTTP 请求。", "difficulty": 3, "tags": ["框架", "网络"]},
        {"id": "LIB_003", "question": "Glide 的图片缓存策略？", "answer": "三级缓存: 活动资源(弱引用)、内存缓存(LRU)、磁盘缓存。", "difficulty": 2, "tags": ["框架", "图片"]},
        {"id": "LIB_004", "question": "RxJava 的线程切换操作符？", "answer": "subscribeOn: 指定订阅线程；observeOn: 指定观察线程，可多次切换。", "difficulty": 3, "tags": ["框架", "RxJava"]},
        {"id": "LIB_005", "question": "EventBus 的线程模式？", "answer": "POSTING(发送线程)、MAIN(主线程)、MAIN_ORDERED(主队列)、BACKGROUND(后台)、ASYNC(独立线程)。", "difficulty": 2, "tags": ["框架", "通信"]},
        {"id": "LIB_006", "question": "LeakCanary 的检测原理？", "answer": "弱引用观察对象，触发 GC 后检查引用是否进入引用队列，未进入则判定泄漏。", "difficulty": 3, "tags": ["框架", "内存"]},
        {"id": "LIB_007", "question": "ARouter 的路由原理？", "answer": "编译期生成路由表，运行期通过 APT 生成的类加载目标 Activity 并跳转。", "difficulty": 3, "tags": ["框架", "路由"]},
        {"id": "LIB_008", "question": "Dagger 的依赖注入过程？", "answer": "编译期生成 Component、Module、Provider 代码，运行时通过生成的工厂类提供实例。", "difficulty": 3, "tags": ["框架", "DI"]},
        {"id": "LIB_009", "question": "Gson 和 Jackson 的区别？", "answer": "Gson: 简洁易用；Jackson: 性能更好，功能更强。Gson 使用反射，Kotlin 推荐 Moshi。", "difficulty": 2, "tags": ["框架", "JSON"]},
        {"id": "LIB_010", "question": "Room 和 GreenDAO 的区别？", "answer": "Room: 官方支持，编译期检查，与 LiveData/Flow 集成；GreenDAO: 性能高，但需额外配置。", "difficulty": 2, "tags": ["框架", "数据库"]},
    ]
}
write_json("questions/day10/opensource.json", libs)

print("All question files generated!")
