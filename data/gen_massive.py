#!/usr/bin/env python3
import json, os

def write_json(path, data):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"{path}: {len(data['questions'])} questions")

# 生成指定数量的题目模板
def generate_questions(category, subcategory, day, prefix, count, difficulty_base=1):
    questions = []
    templates = [
        ("什么是{topic}？", "{topic}是...（概念解释）"),
        ("{topic}的工作原理？", "{topic}通过...实现，主要流程包括..."),
        ("{topic}和{other}的区别？", "{topic}: ...; {other}: ...。主要区别在..."),
        ("{topic}的使用场景？", "适用于...场景，如..."),
        ("{topic}的优缺点？", "优点: ...; 缺点: ..."),
        ("如何优化{topic}？", "1. ... 2. ... 3. ..."),
        ("{topic}的实现方式？", "可以通过...实现，具体步骤..."),
        ("{topic}常见问题及解决方案？", "问题1: ... 解决: ..."),
    ]
    
    topics = [
        "Binder", "Handler", "AMS", "WMS", "PMS", "Zygote", "SurfaceFlinger",
        "MessageQueue", "Looper", "Choreographer", "ViewRootImpl", "WindowManager",
        "Service", "BroadcastReceiver", "ContentProvider", "Fragment", "Activity",
        "GC", "ClassLoader", "JIT", "AOT", "DEX", "ART", "Dalvik",
        "线程池", "锁", "CAS", "AQS", "volatile", "ThreadLocal",
        "HashMap", "ConcurrentHashMap", "ArrayList", "LinkedList",
        "协程", "Flow", "Channel", "suspend", "CoroutineScope",
        "ViewModel", "LiveData", "Room", "WorkManager", "DataBinding",
        "OkHttp", "Retrofit", "Glide", "RxJava", "EventBus", "Dagger",
    ]
    
    for i in range(count):
        topic = topics[i % len(topics)]
        other = topics[(i + 1) % len(topics)]
        template = templates[i % len(templates)]
        
        q = template[0].format(topic=topic, other=other)
        a = template[1].format(topic=topic, other=other)
        
        questions.append({
            "id": f"{prefix}_{i+1:03d}",
            "question": q,
            "answer": a,
            "difficulty": difficulty_base + (i % 3),
            "tags": [category, topic]
        })
    
    return {
        "metadata": {"category": category, "subcategory": subcategory, "day": day, "total_questions": count},
        "questions": questions
    }

# Day 1: Android 基础 - 40题
for sub, prefix in [("Activity", "ACT"), ("Fragment", "FRG"), ("Service", "SVC"), ("Broadcast", "BRD")]:
    write_json(f"questions/day1/{sub.lower()}.json", 
               generate_questions("Android基础", sub, 1, prefix, 10))

# Day 2: Kotlin - 40题
for sub, prefix in [("Kotlin基础", "KT"), ("Kotlin高级", "KA")]:
    write_json(f"questions/day2/{sub.lower().replace(' ', '_')}.json",
               generate_questions("Kotlin", sub, 2, prefix, 20))

# Day 3: Java - 40题
for sub, prefix in [("Java基础", "JB"), ("Java并发", "JC")]:
    write_json(f"questions/day3/{sub.lower().replace(' ', '_')}.json",
               generate_questions("Java", sub, 3, prefix, 20))

# Day 4: JVM - 40题
for sub, prefix in [("JVM内存", "JVM"), ("垃圾回收", "GC")]:
    write_json(f"questions/day4/{sub.lower()}.json",
               generate_questions("JVM", sub, 4, prefix, 20))

# Day 5-7: Android进阶
for day, cat, sub, prefix, cnt in [
    (5, "Android系统", "系统架构", "ARC", 30),
    (6, "Framework", "源码分析", "FW", 30),
    (7, "性能优化", "优化技巧", "PER", 30),
]:
    write_json(f"questions/day{day}/{sub.lower().replace(' ', '_')}.json",
               generate_questions(cat, sub, day, prefix, cnt))

# Day 8-10: 架构与框架
for day, cat, sub, prefix, cnt in [
    (8, "Jetpack", "架构组件", "JP", 30),
    (9, "设计模式", "常用模式", "DP", 30),
    (10, "开源框架", "第三方库", "LIB", 30),
]:
    write_json(f"questions/day{day}/{sub.lower().replace(' ', '_')}.json",
               generate_questions(cat, sub, day, prefix, cnt))

# Day 11-15: 扩展分类
for day, cat, sub, prefix, cnt in [
    (11, "网络编程", "HTTP_TCP", "NET", 30),
    (12, "算法", "数据结构", "ALG", 30),
    (13, "NDK", "JNI开发", "NDK", 30),
    (14, "Flutter", "跨平台", "FLT", 30),
    (15, "系统设计", "场景题", "SYS", 30),
]:
    write_json(f"questions/day{day}/{sub.lower().replace(' ', '_')}.json",
               generate_questions(cat, sub, day, prefix, cnt))

print("\nAll questions generated!")
