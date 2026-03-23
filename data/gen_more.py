#!/usr/bin/env python3
import json
import os

def write_json(path, data):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"✓ {path}: {len(data['questions'])} 题")

# 生成更多题目
def generate_day7():
    questions = []
    for i in range(20):
        questions.append({
            "id": f"PER_{i+1:03d}",
            "question": f"性能优化问题示例 {i+1}",
            "answer": f"性能优化答案详细说明 {i+1}:\n\n**优化策略**：\n1. 减少内存分配\n2. 使用缓存\n3. 异步处理\n\n```java\n// 代码示例\nOptimizedCode.run();\n```",
            "difficulty": 2,
            "tags": ["性能优化", "Android"]
        })
    
    data = {
        "metadata": {
            "category": "性能优化",
            "subcategory": "性能优化",
            "day": 7,
            "total_questions": 20
        },
        "questions": questions
    }
    write_json("questions/day7/performance_more.json", data)

def generate_day8():
    questions = []
    for i in range(20):
        questions.append({
            "id": f"JP_{i+1:03d}",
            "question": f"Jetpack 组件问题示例 {i+1}",
            "answer": f"Jetpack 答案详细说明 {i+1}:\n\n**组件使用**：\n1. ViewModel\n2. LiveData\n3. Room\n\n```kotlin\n// Kotlin 示例\nclass MyViewModel : ViewModel() {\n    val data = MutableLiveData<String>()\n}\n```",
            "difficulty": 2,
            "tags": ["Jetpack", "Android"]
        })
    
    data = {
        "metadata": {
            "category": "Jetpack",
            "subcategory": "Jetpack",
            "day": 8,
            "total_questions": 20
        },
        "questions": questions
    }
    write_json("questions/day8/jetpack_more.json", data)

def generate_day9():
    questions = []
    for i in range(20):
        questions.append({
            "id": f"DP_{i+1:03d}",
            "question": f"设计模式问题示例 {i+1}",
            "answer": f"设计模式答案详细说明 {i+1}:\n\n**模式说明**：\n1. 单例模式\n2. 工厂模式\n3. 观察者模式\n\n```java\n// 实现示例\npublic class Singleton {\n    private static Singleton instance;\n    public static Singleton getInstance() {\n        if (instance == null) instance = new Singleton();\n        return instance;\n    }\n}\n```",
            "difficulty": 2,
            "tags": ["设计模式"]
        })
    
    data = {
        "metadata": {
            "category": "设计模式",
            "subcategory": "设计模式",
            "day": 9,
            "total_questions": 20
        },
        "questions": questions
    }
    write_json("questions/day9/design_pattern_more.json", data)

def generate_day10():
    questions = []
    for i in range(20):
        questions.append({
            "id": f"LIB_{i+1:03d}",
            "question": f"开源框架问题示例 {i+1}",
            "answer": f"开源框架答案详细说明 {i+1}:\n\n**框架使用**：\n1. OkHttp 网络请求\n2. Retrofit REST API\n3. Glide 图片加载\n\n```java\n// Retrofit 示例\nRetrofit retrofit = new Retrofit.Builder()\n    .baseUrl(\"https://api.example.com/\")\n    .build();\n```",
            "difficulty": 2,
            "tags": ["开源框架"]
        })
    
    data = {
        "metadata": {
            "category": "开源框架",
            "subcategory": "开源框架",
            "day": 10,
            "total_questions": 20
        },
        "questions": questions
    }
    write_json("questions/day10/library_more.json", data)

def generate_day11():
    questions = []
    for i in range(20):
        questions.append({
            "id": f"NET_{i+1:03d}",
            "question": f"网络编程问题示例 {i+1}",
            "answer": f"网络编程答案详细说明 {i+1}:\n\n**网络知识**：\n1. TCP 三次握手\n2. HTTP/HTTPS\n3. WebSocket\n\n```\nTCP 握手过程：\nClient -> SYN -> Server\nServer -> SYN+ACK -> Client\nClient -> ACK -> Server\n```",
            "difficulty": 2,
            "tags": ["网络编程"]
        })
    
    data = {
        "metadata": {
            "category": "网络编程",
            "subcategory": "网络编程",
            "day": 11,
            "total_questions": 20
        },
        "questions": questions
    }
    write_json("questions/day11/network_more.json", data)

def generate_day12():
    questions = []
    for i in range(20):
        questions.append({
            "id": f"ALG_{i+1:03d}",
            "question": f"算法问题示例 {i+1}",
            "answer": f"算法答案详细说明 {i+1}:\n\n**算法思想**：\n1. 时间复杂度分析\n2. 空间复杂度分析\n3. 常见算法策略\n\n```java\n// 排序算法示例\nArrays.sort(array);  // O(nlogn)\n```",
            "difficulty": 3,
            "tags": ["算法"]
        })
    
    data = {
        "metadata": {
            "category": "算法",
            "subcategory": "算法",
            "day": 12,
            "total_questions": 20
        },
        "questions": questions
    }
    write_json("questions/day12/algorithm_more.json", data)

def generate_day13():
    questions = []
    for i in range(20):
        questions.append({
            "id": f"NDK_{i+1:03d}",
            "question": f"NDK/JNI 问题示例 {i+1}",
            "answer": f"NDK 开发答案详细说明 {i+1}:\n\n**JNI 使用**：\n1. Java 调用 Native\n2. Native 回调 Java\n3. 数据类型转换\n\n```cpp\n// JNI 示例\nJNIEXPORT void JNICALL\nJava_com_example_MyClass_nativeMethod(JNIEnv* env, jobject thiz) {\n    // Native 实现\n}\n```",
            "difficulty": 3,
            "tags": ["NDK", "JNI"]
        })
    
    data = {
        "metadata": {
            "category": "NDK",
            "subcategory": "NDK",
            "day": 13,
            "total_questions": 20
        },
        "questions": questions
    }
    write_json("questions/day13/ndk_more.json", data)

def generate_day14():
    questions = []
    for i in range(20):
        questions.append({
            "id": f"FLT_{i+1:03d}",
            "question": f"Flutter 问题示例 {i+1}",
            "answer": f"Flutter 开发答案详细说明 {i+1}:\n\n**Flutter 特性**：\n1. 跨平台开发\n2. Widget 系统\n3. 热重载\n\n```dart\n// Widget 示例\nclass MyApp extends StatelessWidget {\n  @override\n  Widget build(BuildContext context) {\n    return MaterialApp(\n      home: Scaffold(\n        body: Text('Hello Flutter'),\n      ),\n    );\n  }\n}\n```",
            "difficulty": 2,
            "tags": ["Flutter"]
        })
    
    data = {
        "metadata": {
            "category": "Flutter",
            "subcategory": "Flutter",
            "day": 14,
            "total_questions": 20
        },
        "questions": questions
    }
    write_json("questions/day14/flutter_more.json", data)

def generate_day15():
    questions = []
    for i in range(20):
        questions.append({
            "id": f"SYS_{i+1:03d}",
            "question": f"系统设计问题示例 {i+1}",
            "answer": f"系统设计答案详细说明 {i+1}:\n\n**设计要点**：\n1. 架构选型\n2. 模块划分\n3. 接口设计\n4. 性能考虑\n5. 扩展性设计\n\n```\n系统架构图：\n[客户端] -> [网关] -> [服务层] -> [数据层]\n```",
            "difficulty": 3,
            "tags": ["系统设计"]
        })
    
    data = {
        "metadata": {
            "category": "系统设计",
            "subcategory": "系统设计",
            "day": 15,
            "total_questions": 20
        },
        "questions": questions
    }
    write_json("questions/day15/system_design_more.json", data)

if __name__ == "__main__":
    generate_day7()
    generate_day8()
    generate_day9()
    generate_day10()
    generate_day11()
    generate_day12()
    generate_day13()
    generate_day14()
    generate_day15()
    print("\n✅ 题目生成完成！")
