# Android 面试题大全 - 题目目录

> 总计: **1200+ 道面试题** | 分类: **15 大类别** | 预计学习时间: **10 天**

---

## 📊 题目统计概览

| 类别 | 题目数量 | 难度分布 | 预计学习时长 |
|------|----------|----------|--------------|
| 1. Android 基础 | 150 | 初级 80 / 中级 50 / 高级 20 | Day 1-2 |
| 2. Kotlin 基础与高级 | 120 | 初级 40 / 中级 50 / 高级 30 | Day 2-3 |
| 3. Java 基础与并发 | 150 | 初级 50 / 中级 60 / 高级 40 | Day 3-4 |
| 4. JVM 原理 | 100 | 中级 40 / 高级 60 | Day 4 |
| 5. Android 系统架构 | 100 | 中级 30 / 高级 70 | Day 5 |
| 6. Framework 源码 (Binder/Handler/AMS/WMS) | 100 | 高级 100 | Day 5-6 |
| 7. 性能优化 | 100 | 中级 40 / 高级 60 | Day 6-7 |
| 8. Jetpack & Compose | 100 | 初级 20 / 中级 50 / 高级 30 | Day 7 |
| 9. 设计模式与架构 | 80 | 中级 40 / 高级 40 | Day 8 |
| 10. 常用开源框架 | 80 | 中级 50 / 高级 30 | Day 8-9 |
| 11. NDK/JNI/音视频 | 50 | 高级 50 | Day 9 |
| 12. 网络编程 | 50 | 中级 30 / 高级 20 | Day 9 |
| 13. 数据结构与算法 | 50 | 中级 30 / 高级 20 | Day 10 |
| 14. Flutter/Dart | 40 | 中级 25 / 高级 15 | Day 10 |
| 15. 场景题与系统设计 | 40 | 高级 40 | Day 10 |

**总计: 1200+ 道题目**

---

## 📚 详细分类目录

### Day 1: Android 基础 (150题)

#### 1.1 Activity & Fragment (40题)
- Activity 生命周期及启动模式
- Fragment 生命周期与事务管理
- Activity 与 Fragment 通信
- 配置变更与状态保存
- 任务栈与返回栈管理

#### 1.2 Service & BroadcastReceiver (30题)
- Service 生命周期与类型
- 前台 Service 与后台限制
- IntentService vs WorkManager
- BroadcastReceiver 注册方式
- 本地广播与全局广播

#### 1.3 ContentProvider (15题)
- ContentProvider 原理与使用
- URI 匹配与数据共享
- 权限控制

#### 1.4 View 体系 (40题)
- View 绘制流程 (measure/layout/draw)
- 自定义 View 开发
- 事件分发机制
- SurfaceView vs TextureView
- 动画机制 (属性动画/补间动画)

#### 1.5 消息机制 (25题)
- Handler/Looper/MessageQueue 原理
- 异步消息处理
- HandlerThread 与 IntentService

---

### Day 2-3: Kotlin 基础与高级 (120题)

#### 2.1 Kotlin 基础语法 (30题)
- val/var 区别与延迟初始化
- 空安全机制 (!!/?./?:/let)
- 扩展函数与扩展属性
- 数据类与密封类
- 智能类型转换与类型推断

#### 2.2 Kotlin 面向对象 (25题)
- 类与继承
- 接口与抽象类
- 属性与字段
- 可见性修饰符
- object/ companion object
- data class / sealed class / inline class

#### 2.3 函数式编程 (25题)
- 高阶函数
- Lambda 表达式
- 内联函数 (inline/noinline/crossinline)
- 函数类型与类型别名
- 操作符重载

#### 2.4 协程核心 (40题)
- 协程基础概念与优势
- CoroutineScope/Job/Deferred
- 调度器 (Dispatchers.IO/Default/Main/Unconfined)
- 取消与超时处理
- 异常处理与监督作用域
- Flow 冷流与热流
- Channel 通道通信
- StateFlow/SharedFlow
- 协程与线程关系

---

### Day 3-4: Java 基础与并发 (150题)

#### 3.1 Java 基础语法 (40题)
- 数据类型与包装类
- String/StringBuilder/StringBuffer
- 集合框架 (List/Map/Set)
- 泛型机制
- 注解与反射

#### 3.2 Java 面向对象 (30题)
- 封装/继承/多态
- 抽象类与接口
- 内部类与匿名类
- 重写与重载

#### 3.3 Java 并发基础 (40题)
- Thread/Runnable/Callable
- 线程状态与生命周期
- 线程同步机制 (synchronized/volatile)
- Lock/ReentrantLock/ReadWriteLock
- 原子类与 CAS
- ThreadLocal 原理

#### 3.4 Java 并发工具 (40题)
- 线程池 (ThreadPoolExecutor)
- 阻塞队列 (ArrayBlockingQueue/LinkedBlockingQueue)
- CountDownLatch/CyclicBarrier/Semaphore
- CompletableFuture
- ForkJoinPool
- AQS 原理

---

### Day 4: JVM 原理 (100题)

#### 4.1 JVM 内存模型 (25题)
- 运行时数据区 (堆/栈/方法区)
- 对象内存布局
- 内存分配策略
- OOM 场景分析

#### 4.2 垃圾回收 (35题)
- GC 算法 (标记-清除/复制/整理)
- 垃圾收集器 (Serial/Parallel/CMS/G1/ZGC)
- 引用类型 (强/软/弱/虚)
- GC 调优与监控

#### 4.3 类加载机制 (25题)
- 类加载过程
- 双亲委派模型
- 打破双亲委派
- 自定义类加载器

#### 4.4 字节码与 JIT (15题)
- 字节码指令
- JIT 编译器
- 逃逸分析

---

### Day 5: Android 系统架构 (100题)

#### 5.1 Android 系统分层 (20题)
- Linux Kernel
- HAL (硬件抽象层)
- Native 层 (Libraries/Android Runtime)
- Framework 层
- Application 层

#### 5.2 Android 启动流程 (30题)
- BootLoader
- Linux Kernel 启动
- Init 进程
- Zygote 进程
- SystemServer 启动
- Launcher 启动

#### 5.3 进程间通信 (30题)
- Binder 机制原理
- AIDL 使用与原理
- Binder 驱动分析
- 匿名 Binder 与实名 Binder

#### 5.4 应用进程管理 (20题)
- 进程优先级
- 进程回收策略 (LMK)
- App 沙箱机制

---

### Day 5-6: Framework 源码 (100题)

#### 6.1 Handler 机制深度解析 (25题)
- Looper 准备与循环
- MessageQueue 源码
- Handler 发送与处理消息
- IdleHandler 原理
- 同步屏障

#### 6.2 AMS (ActivityManagerService) (25题)
- Activity 启动流程
- Activity 栈管理
- TaskRecord/ActivityRecord
- 生命周期管理

#### 6.3 WMS (WindowManagerService) (20题)
- Window 类型与层级
- Window 添加流程
- SurfaceFlinger 交互
- 窗口动画

#### 6.4 PMS (PackageManagerService) (15题)
- APK 安装流程
- 签名验证机制
- 权限管理

#### 6.5 其他系统服务 (15题)
- NotificationManagerService
- PowerManagerService
- BatteryStatsService

---

### Day 6-7: 性能优化 (100题)

#### 7.1 UI 性能优化 (30题)
- 布局层级优化
- 过度绘制优化
- 渲染性能 (60fps)
- SurfaceFlinger 分析
- GPU Profile 工具使用

#### 7.2 内存优化 (30题)
- 内存泄漏检测与修复
- MAT/Profiler 工具使用
- 大对象优化
- 图片内存优化
- 内存抖动分析

#### 7.3 启动优化 (20题)
- 冷启动/热启动/温启动
- 启动耗时分析
- 延迟初始化
- 类加载优化

#### 7.4 ANR 与卡顿 (20题)
- ANR 产生原因与类型
- ANR 分析工具
- 卡顿监控与定位
- 主线程耗时优化

---

### Day 7: Jetpack & Compose (100题)

#### 8.1 Architecture Components (40题)
- ViewModel 原理与使用
- LiveData 与生命周期感知
- Room 数据库
- WorkManager 后台任务
- Navigation 组件
- DataBinding

#### 8.2 Dependency Injection (20题)
- Hilt 使用与原理
- Dagger2 基础
- 依赖注入优势

#### 8.3 Jetpack Compose (40题)
- Compose 基础概念
- 声明式 UI 原理
- State 管理
- 副作用处理 (LaunchedEffect/SideEffect)
- 自定义 Composable
- Compose 性能优化

---

### Day 8: 设计模式与架构 (80题)

#### 9.1 常用设计模式 (50题)
- 创建型: 单例/工厂/建造者/原型
- 结构型: 适配器/装饰器/代理/外观/桥接
- 行为型: 观察者/策略/责任链/模板/迭代器

#### 9.2 Android 架构模式 (30题)
- MVC/MVP/MVVM/MVI 对比
- Clean Architecture
- 组件化/模块化
- 插件化原理

---

### Day 8-9: 常用开源框架 (80题)

#### 10.1 网络框架 (25题)
- Retrofit 原理与使用
- OkHttp 拦截器与连接池
- RxJava 操作符与线程切换
- Glide/Picasso 图片加载

#### 10.2 依赖注入 (15题)
- Dagger2/Hilt 原理
- 组件化依赖注入

#### 10.3 响应式编程 (15题)
- RxJava/RxKotlin
- 背压处理
- 操作符链

#### 10.4 其他常用库 (25题)
- EventBus 原理
- LeakCanary 内存检测
- ARouter 路由框架
- GreenDao/Room 数据库

---

### Day 9: NDK/JNI/音视频 (50题)

#### 11.1 JNI/NDK (20题)
- JNI 基础与数据类型转换
- JNIEnv 与线程处理
- 动态注册与静态注册
- CMake 与 NDK Build

#### 11.2 音视频开发 (20题)
- FFmpeg 编译与使用
- H.264/H.265 编解码
- MediaCodec API
- OpenCV 图像处理

#### 11.3 OpenGL ES (10题)
- EGL 与渲染流程
- Shader 编程
- 纹理与 FBO

---

### Day 9: 网络编程 (50题)

#### 12.1 HTTP/HTTPS (20题)
- HTTP 协议原理
- HTTPS 握手过程
- OkHttp 源码解析
- 网络缓存策略

#### 12.2 TCP/IP (20题)
- TCP 三次握手/四次挥手
- Socket 编程
- WebSocket
- 长连接保活

#### 12.3 网络安全 (10题)
- 证书校验
- 防中间人攻击
- 数据加密传输

---

### Day 10: 数据结构与算法 (50题)

#### 13.1 数据结构 (25题)
- 数组/链表/栈/队列
- 哈希表实现
- 二叉树/BST/AVL/红黑树
- 堆/优先队列
- 图与图算法

#### 13.2 算法 (25题)
- 排序算法
- 动态规划
- 贪心算法
- 回溯算法
- 字符串算法

---

### Day 10: Flutter/Dart (40题)

#### 14.1 Dart 语言 (15题)
- 异步编程 (Future/Stream/async-await)
- 隔离 (Isolate)
- Mixin/Extension

#### 14.2 Flutter 框架 (25题)
- Widget 生命周期
- State 管理 (Provider/Riverpod/Bloc)
- 渲染原理
- 平台通道

---

### Day 10: 场景题与系统设计 (40题)

#### 15.1 场景题 (20题)
- 图片加载库设计
- 网络请求框架设计
- 埋点统计方案
- 即时通讯架构

#### 15.2 系统设计 (20题)
- App 架构设计
- 组件化方案
- 热修复框架
- 性能监控平台

---

## 🎯 学习建议

1. **循序渐进**: 按 Day 1-10 的顺序学习，基础知识打牢后再进阶
2. **结合实践**: 每类题目学习后，尝试手写代码实现
3. **重复复习**: 使用艾宾浩斯遗忘曲线复习标记为"不熟"的题目
4. **面试模拟**: Day 10 后进行模拟面试训练

---

*Generated for Android Interview Preparation*
