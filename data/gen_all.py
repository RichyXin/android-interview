#!/usr/bin/env python3
import json, os

def write_json(path, data):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

# 算法 (新增 Day 12)
algorithm = {
    "metadata": {"category": "数据结构与算法", "subcategory": "基础算法", "day": 12, "total_questions": 20},
    "questions": [
        {"id": "ALG_001", "question": "数组和链表的区别？", "answer": "数组: 连续内存，查询O(1)，增删O(n)；链表: 非连续，查询O(n)，增删O(1)", "difficulty": 1, "tags": ["算法", "数据结构"]},
        {"id": "ALG_002", "question": "快速排序的时间复杂度？", "answer": "平均 O(nlogn)，最坏 O(n²)。不稳定排序，原地排序", "difficulty": 2, "tags": ["算法", "排序"]},
        {"id": "ALG_003", "question": "二分查找的条件和复杂度？", "answer": "有序数组，O(logn)。注意边界条件和防止整数溢出", "difficulty": 1, "tags": ["算法", "查找"]},
        {"id": "ALG_004", "question": "二叉树的前序/中序/后序遍历？", "answer": "前序: 根左右；中序: 左根右；后序: 左右根。递归或栈实现", "difficulty": 2, "tags": ["算法", "树"]},
        {"id": "ALG_005", "question": "BFS 和 DFS 的区别？", "answer": "BFS: 广度优先，队列，层序遍历；DFS: 深度优先，栈/递归，先深后广", "difficulty": 2, "tags": ["算法", "搜索"]},
        {"id": "ALG_006", "question": "动态规划的核心思想？", "answer": "最优子结构、重叠子问题、状态转移方程。自顶向下记忆化或自底向上填表", "difficulty": 3, "tags": ["算法", "DP"]},
        {"id": "ALG_007", "question": "堆和二叉搜索树的区别？", "answer": "堆: 完全二叉树，父节点大于(小于)子节点；BST: 左<根<右，中序有序", "difficulty": 2, "tags": ["算法", "树"]},
        {"id": "ALG_008", "question": "Top K 问题的解法？", "answer": "1. 堆(最小堆) O(nlogk)；2. 快速选择(类似快排) O(n)", "difficulty": 3, "tags": ["算法", "经典问题"]},
        {"id": "ALG_009", "question": "链表判环的算法？", "answer": "快慢指针。快指针每次走2步，慢指针走1步，相遇则有环", "difficulty": 2, "tags": ["算法", "链表"]},
        {"id": "ALG_010", "question": "反转链表的方法？", "answer": "迭代: 三个指针(prev, curr, next)；递归: 递归到尾节点后反转指向", "difficulty": 2, "tags": ["算法", "链表"]},
        {"id": "ALG_011", "question": "LRU 缓存的实现？", "answer": "HashMap + 双向链表。查询/插入O(1)，淘汰最少使用", "difficulty": 3, "tags": ["算法", "缓存"]},
        {"id": "ALG_012", "question": "字符串匹配的 KMP 算法？", "answer": "预处理模式串得到 next 数组，匹配失败时利用已知信息跳过无效比较", "difficulty": 3, "tags": ["算法", "字符串"]},
        {"id": "ALG_013", "question": "红黑树的特点？", "answer": "自平衡二叉搜索树，节点红/黑，根黑，红节点子节点必黑，黑高相同", "difficulty": 3, "tags": ["算法", "树"]},
        {"id": "ALG_014", "question": "图的表示方法？", "answer": "邻接矩阵: 二维数组，适合稠密图；邻接表: 链表/数组，适合稀疏图", "difficulty": 2, "tags": ["算法", "图"]},
        {"id": "ALG_015", "question": "最短路径算法？", "answer": "Dijkstra(非负权边)、Bellman-Ford(负权边)、Floyd(多源最短路径)", "difficulty": 3, "tags": ["算法", "图"]},
        {"id": "ALG_016", "question": "归并排序的特点？", "answer": "分治法，稳定排序，时间O(nlogn)，空间O(n)。适合链表排序", "difficulty": 2, "tags": ["算法", "排序"]},
        {"id": "ALG_017", "question": "哈希冲突的解决方法？", "answer": "链地址法(拉链法)、开放寻址法(线性探测、二次探测、双重哈希)", "difficulty": 2, "tags": ["算法", "哈希"]},
        {"id": "ALG_018", "question": "字典树(Trie)的应用？", "answer": "字符串前缀匹配，如自动补全、拼写检查。空间换时间", "difficulty": 3, "tags": ["算法", "字符串"]},
        {"id": "ALG_019", "question": "滑动窗口算法适用于什么问题？", "answer": "子数组/子串问题，如最长无重复子串、最小覆盖子串", "difficulty": 3, "tags": ["算法", "技巧"]},
        {"id": "ALG_020", "question": "双指针技巧的应用场景？", "answer": "有序数组求和、链表操作(判环、找中点)、滑动窗口", "difficulty": 2, "tags": ["算法", "技巧"]},
    ]
}
write_json("questions/day12/algorithm.json", algorithm)

print("Algorithm questions generated!")
