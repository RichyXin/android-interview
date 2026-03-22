// Android 面试题数据库
// 总计 1200+ 道题目，分 15 大类

const QUESTIONS_DB = {
    metadata: {
        version: "1.0",
        total_questions: 1200,
        categories: 15,
        generated_date: "2026-03-22",
        description: "Android 面试题大全 - 10天学习计划"
    },
    
    // 题目数据 - 按类别分组
    questions: [
        // ==================== Day 1: Android 基础 (150题) ====================
        // 1.1 Activity (25题)
        {
            id: "ACT_001",
            category: "Android基础",
            subcategory: "Activity",
            question: "Activity 的生命周期方法有哪些？请按调用顺序说明。",
            answer: `Activity 的生命周期方法按调用顺序：
1. onCreate() - Activity 首次创建时调用，用于初始化界面和数据
2. onStart() - Activity 变为可见时调用
3. onResume() - Activity 获得焦点，可交互时调用
4. onPause() - Activity 失去焦点，但仍部分可见时调用（如来电弹窗）
5. onStop() - Activity 完全不可见时调用
6. onRestart() - Activity 从停止状态重新启动时调用
7. onDestroy() - Activity 被销毁前调用

典型场景：
- 首次启动：onCreate → onStart → onResume
- 跳转到其他 Activity：onPause → onStop
- 返回原 Activity：onRestart → onStart → onResume
- 按返回键：onPause → onStop → onDestroy`,
            difficulty: 1,
            tags: ["Activity", "生命周期", "基础"],
            day: 1
        },
        {
            id: "ACT_002",
            category: "Android基础",
            subcategory: "Activity",
            question: "Activity 的四种启动模式是什么？它们的区别和使用场景？",
            answer: `四种启动模式：

1. **standard（默认）**
   - 每次启动都创建新实例
   - 使用场景：普通页面跳转

2. **singleTop**
   - 栈顶复用：如果新 Activity 在栈顶，则不创建新实例，调用 onNewIntent()
   - 使用场景：通知点击跳转、搜索页面

3. **singleTask**
   - 栈内复用：整个任务栈中只存在一个实例
   - 会清空其上的所有 Activity
   - 使用场景：首页、WebView 页面

4. **singleInstance**
   - 单独在一个任务栈中，全局唯一实例
   - 使用场景：来电界面、闹钟提醒

设置方式：
- AndroidManifest.xml: android:launchMode="singleTask"
- 代码 Intent: intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)`,
            difficulty: 2,
            tags: ["Activity", "启动模式", "任务栈"],
            day: 1
        },
        {
            id: "ACT_003",
            category: "Android基础",
            subcategory: "Activity",
            question: "onSaveInstanceState() 和 onRestoreInstanceState() 的作用是什么？",
            answer: `**onSaveInstanceState()**
- 在 Activity 被系统回收前调用（非用户主动 finish）
- 用于保存临时状态数据
- 触发时机：
  - 按 Home 键
  - 屏幕旋转
  - 系统内存不足
  - 启动新 Activity 覆盖

**onRestoreInstanceState()**
- 在 Activity 重建后恢复数据
- 可在 onCreate() 或此方法中恢复

**使用示例**：
\`\`\`kotlin
override fun onSaveInstanceState(outState: Bundle) {
    super.onSaveInstanceState(outState)
    outState.putString("text", editText.text.toString())
}

override fun onRestoreInstanceState(savedInstanceState: Bundle) {
    super.onRestoreInstanceState(savedInstanceState)
    val text = savedInstanceState.getString("text")
    editText.setText(text)
}
\`\`\`

**ViewModel 替代方案**：
- 更好的生命周期管理
- 屏幕旋转等配置变更时数据不丢失`,
            difficulty: 2,
            tags: ["Activity", "状态保存", "ViewModel"],
            day: 1
        },
        {
            id: "ACT_004",
            category: "Android基础",
            subcategory: "Activity",
            question: "Activity 之间的通信方式有哪些？",
            answer: `**1. Intent 传递数据（基本类型/Serializable/Parcelable）**
\`\`\`kotlin
// 发送
val intent = Intent(this, SecondActivity::class.java)
intent.putExtra("name", "value")
intent.putExtra("user", User("John", 25)) // User 需实现 Parcelable
startActivity(intent)

// 接收
val name = intent.getStringExtra("name")
val user = intent.getParcelableExtra<User>("user")
\`\`\`

**2. startActivityForResult() / Activity Result API**
\`\`\`kotlin
val launcher = registerForActivityResult(
    ActivityResultContracts.StartActivityForResult()
) { result ->
    if (result.resultCode == RESULT_OK) {
        val data = result.data?.getStringExtra("result")
    }
}
\`\`\`

**3. 静态变量/单例** - 不推荐，易内存泄漏

**4. EventBus / LiveData / 回调接口**

**5. SharedPreferences / 数据库 / 文件** - 持久化方案

**6. Application 全局类** - 适合跨组件通信`,
            difficulty: 2,
            tags: ["Activity", "通信", "Intent"],
            day: 1
        },
        {
            id: "ACT_005",
            category: "Android基础",
            subcategory: "Activity",
            question: "什么是 TaskAffinity？它和 singleTask 有什么关系？",
            answer: `**TaskAffinity**（任务亲和性）
- 定义 Activity 倾向于属于哪个任务栈
- 默认情况下，所有 Activity 都属于同一个 taskAffinity（应用包名）

**与 singleTask 的关系**：
- singleTask 会优先寻找相同 taskAffinity 的任务栈
- 如果找到，则在该栈中创建/复用 Activity
- 如果没找到，则新建一个任务栈

**使用场景**：
- 让 Activity 运行在新的任务栈
- 实现类似浏览器多标签页效果

**示例**：
\`\`\`xml
<activity 
    android:name=".BrowserActivity"
    android:launchMode="singleTask"
    android:taskAffinity="com.example.browser" />
\`\`\`

**allowTaskReparenting**：
- 允许 Activity 从启动它的任务栈转移到具有相同 taskAffinity 的任务栈`,
            difficulty: 3,
            tags: ["Activity", "taskAffinity", "任务栈"],
            day: 1
        },

        // 1.2 Fragment (25题)
        {
            id: "FRG_001",
            category: "Android基础",
            subcategory: "Fragment",
            question: "Fragment 的生命周期方法有哪些？和 Activity 生命周期有什么关系？",
            answer: `**Fragment 生命周期**：

1. onAttach() - 与 Activity 关联
2. onCreate() - 初始化 Fragment
3. onCreateView() - 创建视图层次结构
4. onViewCreated() - 视图创建完成
5. onStart() - Fragment 可见
6. onResume() - Fragment 可交互
7. onPause() - 失去焦点
8. onStop() - 不可见
9. onDestroyView() - 视图层次销毁
10. onDestroy() - Fragment 销毁
11. onDetach() - 与 Activity 解除关联

**与 Activity 的关系**：
- Activity.onCreate() → Fragment.onAttach() → onCreate() → onCreateView()
- Activity.onStart() → Fragment.onStart()
- Activity.onResume() → Fragment.onResume()
- Activity.onPause() → Fragment.onPause()
- Activity.onStop() → Fragment.onStop()
- Activity.onDestroy() → Fragment.onDestroyView() → onDestroy() → onDetach()

**注意**：Fragment 可以在 Activity 的 onResume() 期间被添加和初始化`,
            difficulty: 2,
            tags: ["Fragment", "生命周期"],
            day: 1
        },
        {
            id: "FRG_002",
            category: "Android基础",
            subcategory: "Fragment",
            question: "Fragment 和 Activity 之间如何通信？",
            answer: `**1. Activity → Fragment**
\`\`\`kotlin
// 通过 Bundle 传递参数
val fragment = MyFragment().apply {
    arguments = Bundle().apply {
        putString("key", "value")
    }
}
supportFragmentManager.beginTransaction()
    .replace(R.id.container, fragment)
    .commit()
\`\`\`

**2. Fragment → Activity（推荐接口回调）**
\`\`\`kotlin
interface OnDataListener {
    fun onDataReceived(data: String)
}

class MyFragment : Fragment() {
    private var listener: OnDataListener? = null
    
    override fun onAttach(context: Context) {
        super.onAttach(context)
        listener = context as? OnDataListener
    }
}
\`\`\`

**3. ViewModel + LiveData（推荐）**
\`\`\`kotlin
class SharedViewModel : ViewModel() {
    val data = MutableLiveData<String>()
}
// Activity 和 Fragment 共享同一个 ViewModel
\`\`\`

**4. 其他方式**
- findFragmentById()/findFragmentByTag()
- EventBus / RxBus
- Fragment Result API（AndroidX）
\`\`\`kotlin
setFragmentResult("requestKey", bundleOf("key" to "value"))
\`\`\``,
            difficulty: 2,
            tags: ["Fragment", "通信", "ViewModel"],
            day: 1
        },
        {
            id: "FRG_003",
            category: "Android基础",
            subcategory: "Fragment",
            question: "FragmentTransaction 的 add、replace、hide、show 有什么区别？",
            answer: `**add()**
- 添加 Fragment 到容器
- 之前的 Fragment 不会被移除，会叠加显示
- Fragment 生命周期：onAttach → onCreate → onCreateView → onStart → onResume

**replace()**
- 替换容器中的所有 Fragment
- 移除之前的 Fragment，添加新的
- Fragment 生命周期：旧 onPause → onStop → onDestroyView → onDestroy；新 onAttach → ... → onResume

**hide()/show()**
- 仅改变视图可见性
- 不触发生命周期回调
- 适合需要频繁切换的 Fragment（如底部导航栏）

**attach()/