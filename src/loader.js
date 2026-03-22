/**
 * 数据加载器 - 按需加载题目
 * 支持缓存和预加载
 */

class DataLoader {
    constructor() {
        this.cache = new Map();
        this.loading = new Map();
        this.indexData = null;
    }

    // 加载题目索引
    async loadIndex() {
        if (this.indexData) {
            return this.indexData;
        }

        try {
            const response = await fetch('data/index.json?v=' + Date.now());
            this.indexData = await response.json();
            return this.indexData;
        } catch (error) {
            console.error('Failed to load index:', error);
            throw error;
        }
    }

    // 按文件路径加载题目
    async loadQuestions(filePath) {
        // 检查缓存
        if (this.cache.has(filePath)) {
            return this.cache.get(filePath);
        }

        // 检查是否正在加载
        if (this.loading.has(filePath)) {
            return await this.loading.get(filePath);
        }

        // 开始加载
        const loadPromise = this._fetchQuestions(filePath);
        this.loading.set(filePath, loadPromise);

        try {
            const questions = await loadPromise;
            this.cache.set(filePath, questions);
            this.loading.delete(filePath);
            return questions;
        } catch (error) {
            this.loading.delete(filePath);
            throw error;
        }
    }

    async _fetchQuestions(filePath) {
        const response = await fetch(`data/questions/${filePath}`);
        if (!response.ok) {
            throw new Error(`Failed to load ${filePath}: ${response.status}`);
        }
        const data = await response.json();
        return data.questions || [];
    }

    // 根据 Day 加载所有题目
    async loadDay(day) {
        const index = await this.loadIndex();
        const dayCategories = index.categories.filter(c => c.day === day);
        
        const allQuestions = [];
        for (const category of dayCategories) {
            for (const file of category.files) {
                const questions = await this.loadQuestions(file);
                // 添加额外信息
                questions.forEach(q => {
                    q.day = day;
                    q.category = category.name;
                });
                allQuestions.push(...questions);
            }
        }
        
        return allQuestions;
    }

    // 根据分类加载题目
    async loadCategory(categoryId) {
        const index = await this.loadIndex();
        const category = index.categories.find(c => c.id === categoryId);
        
        if (!category) {
            throw new Error(`Category not found: ${categoryId}`);
        }

        const allQuestions = [];
        for (const file of category.files) {
            const questions = await this.loadQuestions(file);
            questions.forEach(q => {
                q.category = category.name;
            });
            allQuestions.push(...questions);
        }
        
        return allQuestions;
    }

    // 加载单个题目
    async loadQuestion(questionId) {
        const index = await this.loadIndex();
        const questionMeta = index.questions_index.find(q => q.id === questionId);
        
        if (!questionMeta) {
            throw new Error(`Question not found: ${questionId}`);
        }

        const questions = await this.loadQuestions(questionMeta.file);
        const question = questions.find(q => q.id === questionId);
        
        if (question) {
            question.day = questionMeta.day;
            question.category = questionMeta.category;
        }
        
        return question;
    }

    // 搜索题目
    async searchQuestions(keyword) {
        const index = await this.loadIndex();
        const matched = index.questions_index.filter(q => 
            q.question.toLowerCase().includes(keyword.toLowerCase()) ||
            q.tags.some(tag => tag.toLowerCase().includes(keyword.toLowerCase()))
        );

        // 加载前 20 个匹配的题目详情
        const questions = [];
        for (const meta of matched.slice(0, 20)) {
            try {
                const q = await this.loadQuestion(meta.id);
                if (q) questions.push(q);
            } catch (e) {
                console.warn(`Failed to load question ${meta.id}:`, e);
            }
        }
        
        return questions;
    }

    // 预加载下一天的题目
    async preloadNextDay(currentDay) {
        const nextDay = currentDay + 1;
        if (nextDay > 10) return;

        try {
            const index = await this.loadIndex();
            const dayCategories = index.categories.filter(c => c.day === nextDay);
            
            for (const category of dayCategories) {
                for (const file of category.files) {
                    if (!this.cache.has(file)) {
                        this.loadQuestions(file).catch(() => {});
                    }
                }
            }
        } catch (e) {
            console.warn('Preload failed:', e);
        }
    }

    // 获取分类统计
    async getCategoryStats() {
        const index = await this.loadIndex();
        return index.categories.map(c => ({
            id: c.id,
            name: c.name,
            day: c.day,
            total: c.question_count,
            difficulty: c.difficulty_distribution
        }));
    }

    // 清除缓存
    clearCache() {
        this.cache.clear();
        this.loading.clear();
    }

    // 获取缓存大小
    getCacheSize() {
        let size = 0;
        this.cache.forEach(questions => {
            size += JSON.stringify(questions).length;
        });
        return size;
    }
}

// 全局实例
const dataLoader = new DataLoader();
