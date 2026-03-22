/**
 * Android 面试学习系统 - 主应用逻辑
 */

class AndroidInterviewApp {
    constructor() {
        this.db = null;
        this.loader = null;
        this.currentPage = 'dashboard';
        this.currentQuestion = null;
        this.currentDay = 1;
        this.questionsCache = new Map();
        this.progressCache = new Map();
        
        this.init();
    }

    async init() {
        try {
            // 初始化数据库
            this.db = new DatabaseManager();
            await this.db.init();
            
            // 初始化数据加载器
            this.loader = new DataLoader();
            await this.loader.loadIndex();
            
            // 绑定事件
            this.bindEvents();
            
            // 加载初始数据
            await this.loadDashboard();
            
            console.log('App initialized successfully');
        } catch (error) {
            console.error('Failed to initialize app:', error);
            this.showToast('初始化失败，请刷新页面重试', 'error');
        }
    }

    bindEvents() {
        // 侧边栏导航
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const page = e.currentTarget.dataset.page;
                this.navigateTo(page);
            });
        });

        // 继续学习按钮
        document.getElementById('continueStudy')?.addEventListener('click', () => {
            this.navigateTo('study');
        });

        // 搜索
        document.getElementById('searchInput')?.addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });

        // 设置按钮
        document.getElementById('settingsBtn')?.addEventListener('click', () => {
            this.openSettings();
        });

        // 导出数据
        document.getElementById('exportData')?.addEventListener('click', () => {
            this.exportData();
        });
    }

    async navigateTo(page) {
        // 更新导航状态
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.page === page) {
                item.classList.add('active');
            }
        });

        // 隐藏所有页面
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        
        // 显示目标页面
        const targetPage = document.getElementById(`${page}Page`);
        if (targetPage) {
            targetPage.classList.add('active');
        }

        // 更新标题
        this.updatePageTitle(page);

        // 加载页面数据
        this.currentPage = page;
        switch(page) {
            case 'dashboard':
                await this.loadDashboard();
                break;
            case 'study':
                await this.loadStudy();
                break;
            case 'cards':
                await this.loadCards();
                break;
            case 'categories':
                await this.loadCategories();
                break;
            case 'weakness':
                await this.loadWeakness();
                break;
            case 'mock':
                await this.loadMock();
                break;
            case 'chat':
                await this.loadChat();
                break;
        }
    }

    updatePageTitle(page) {
        const titles = {
            'dashboard': { title: '学习概览', subtitle: '欢迎使用 Android 面试智能学习系统' },
            'study': { title: '每日学习', subtitle: '按计划系统学习面试知识点' },
            'cards': { title: '记忆卡片', subtitle: '使用卡片模式快速记忆' },
            'categories': { title: '分类浏览', subtitle: '按知识点分类查看题目' },
            'weakness': { title: '薄弱项分析', subtitle: '智能分析你的薄弱环节' },
            'mock': { title: '模拟面试', subtitle: '模拟真实面试场景' },
            'chat': { title: 'AI 助手', subtitle: '有问题随时问 AI' }
        };
        
        const info = titles[page] || titles['dashboard'];
        document.getElementById('pageTitle').textContent = info.title;
        document.getElementById('pageSubtitle').textContent = info.subtitle;
    }

    // ==================== Dashboard ====================
    async loadDashboard() {
        try {
            // 加载统计
            const stats = await this.db.countByStatus();
            const total = 1200;
            const mastered = stats.mastered || 0;
            const review = stats.review || 0;
            const weak = stats.weak || 0;
            const progress = Math.round((mastered / total) * 100);

            // 更新进度圆环
            document.getElementById('progressPercent').textContent = `${progress}%`;
            document.getElementById('progressCircle').style.strokeDashoffset = 283 - (283 * progress / 100);
            
            // 更新统计数字
            document.getElementById('masteredCount').textContent = mastered;
            document.getElementById('reviewCount').textContent = review;
            document.getElementById('weakCount').textContent = weak;
            document.getElementById('weakBadge').textContent = weak;

            // 加载 Day 1 进度
            const day1Questions = await this.loader.loadDay(1);
            const day1Progress = await this.getDayProgress(1, day1Questions.length);
            document.getElementById('currentDay').textContent = '1';
            document.getElementById('dayCompleted').textContent = day1Progress.completed;
            document.getElementById('dayTotal').textContent = day1Questions.length;
            document.getElementById('dayProgress').style.width = `${day1Progress.percentage}%`;

            // 加载分类图表
            this.loadCategoryChart();
            
        } catch (error) {
            console.error('Failed to load dashboard:', error);
        }
    }

    async getDayProgress(day, total) {
        const allProgress = await this.db.getAllProgress();
        const dayProgress = allProgress.filter(p => {
            const q = this.questionsCache.get(p.questionId);
            return q && q.day === day && p.status === 'mastered';
        });
        const completed = dayProgress.length;
        return {
            completed,
            total,
            percentage: Math.round((completed / total) * 100)
        };
    }

    loadCategoryChart() {
        const ctx = document.getElementById('categoryChart');
        if (!ctx) return;
        
        // 简化版图表数据
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['已掌握', '学习中', '未开始'],
                datasets: [{
                    data: [10, 20, 70],
                    backgroundColor: ['#3DDC84', '#FFA726', '#2D333B'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { color: '#B0B8C4' }
                    }
                }
            }
        });
    }

    // ==================== Study ====================
    async loadStudy() {
        try {
            // 加载 Day 1 题目
            const questions = await this.loader.loadDay(this.currentDay);
            this.currentQuestions = questions;
            
            // 显示第一题
            if (questions.length > 0) {
                await this.showQuestion(questions[0]);
            }

            // 更新计数
            document.getElementById('currentNum').textContent = '1';
            document.getElementById('totalNum').textContent = questions.length;

            // 绑定学习页面事件
            this.bindStudyEvents();
            
        } catch (error) {
            console.error('Failed to load study:', error);
            this.showToast('加载题目失败', 'error');
        }
    }

    bindStudyEvents() {
        // 上一题/下一题
        document.getElementById('prevQuestion')?.addEventListener('click', () => {
            this.prevQuestion();
        });
        document.getElementById('nextQuestion')?.addEventListener('click', () => {
            this.nextQuestion();
        });

        // 显示答案
        document.getElementById('revealAnswer')?.addEventListener('click', () => {
            document.getElementById('answerContent').style.display = 'block';
            document.getElementById('revealAnswer').style.display = 'none';
        });

        // 掌握程度按钮
        document.querySelectorAll('.rating-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const rating = e.currentTarget.dataset.rating;
                this.rateQuestion(rating);
            });
        });

        // AI 学习按钮
        document.getElementById('aiLearnBtn')?.addEventListener('click', () => {
            this.openAiModal();
        });

        // 筛选器
        document.getElementById('dayFilter')?.addEventListener('change', (e) => {
            const day = parseInt(e.target.value);
            if (!isNaN(day)) {
                this.currentDay = day;
                this.loadStudy();
            }
        });
    }

    async showQuestion(question) {
        this.currentQuestion = question;
        
        // 缓存题目
        this.questionsCache.set(question.id, question);

        // 更新显示
        document.getElementById('qCategory').textContent = question.category || 'Android基础';
        document.getElementById('qSubcategory').textContent = question.subcategory || '';
        document.getElementById('qDifficulty').textContent = this.getDifficultyText(question.difficulty);
        document.getElementById('qDifficulty').className = `tag difficulty-tag difficulty-${question.difficulty}`;
        document.getElementById('qDay').textContent = `Day ${question.day}`;
        document.getElementById('qTitle').textContent = question.question;
        
        // 渲染答案（支持 Markdown）
        const answerHtml = marked.parse(question.answer || '暂无答案');
        document.getElementById('aBody').innerHTML = answerHtml;

        // 重置答案显示
        document.getElementById('answerContent').style.display = 'none';
        document.getElementById('revealAnswer').style.display = 'flex';

        // 加载当前进度
        const progress = await this.db.getProgress(question.id);
        this.updateRatingButtons(progress?.status);
    }

    getDifficultyText(level) {
        const map = { 1: '初级', 2: '中级', 3: '高级' };
        return map[level] || '中级';
    }

    getDifficultyClass(level) {
        const map = { 1: 'difficulty-easy', 2: 'difficulty-medium', 3: 'difficulty-hard' };
        return map[level] || 'difficulty-medium';
    }

    updateRatingButtons(status) {
        document.querySelectorAll('.rating-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.rating === status) {
                btn.classList.add('active');
            }
        });
    }

    async rateQuestion(rating) {
        if (!this.currentQuestion) return;
        
        await this.db.updateProgress(this.currentQuestion.id, rating, {
            category: this.currentQuestion.category,
            day: this.currentQuestion.day
        });
        
        this.updateRatingButtons(rating);
        this.showToast(`已标记为: ${this.getRatingText(rating)}`, 'success');
    }

    getRatingText(rating) {
        const map = {
            'weak': '完全不熟',
            'review': '需要复习',
            'mastered': '完全掌握'
        };
        return map[rating] || rating;
    }

    prevQuestion() {
        if (!this.currentQuestions || this.currentQuestions.length === 0) return;
        
        // 找到当前题目的索引
        const currentIndex = this.currentQuestions.findIndex(q => q.id === this.currentQuestion?.id);
        if (currentIndex === -1) return;
        
        // 计算上一题索引
        const prevIndex = currentIndex === 0 ? this.currentQuestions.length - 1 : currentIndex - 1;
        
        // 显示上一题
        this.showQuestion(this.currentQuestions[prevIndex]);
        
        // 更新计数显示
        document.getElementById('currentNum').textContent = prevIndex + 1;
    }

    nextQuestion() {
        if (!this.currentQuestions || this.currentQuestions.length === 0) return;
        
        // 找到当前题目的索引
        const currentIndex = this.currentQuestions.findIndex(q => q.id === this.currentQuestion?.id);
        if (currentIndex === -1) return;
        
        // 计算下一题索引
        const nextIndex = currentIndex === this.currentQuestions.length - 1 ? 0 : currentIndex + 1;
        
        // 显示下一题
        this.showQuestion(this.currentQuestions[nextIndex]);
        
        // 更新计数显示
        document.getElementById('currentNum').textContent = nextIndex + 1;
    }

    // ==================== Flash Cards ====================
    initCardState() {
        this.cardState = {
            allCards: [],      // 原始卡片数据
            cards: [],         // 当前显示的卡片（筛选后）
            currentIndex: 0,
            isFlipped: false,
            filter: { day: 'all', status: 'all' },
            stats: { total: 0, learned: 0, mastered: 0 }
        };
    }

    async loadCards() {
        this.initCardState();
        await this.loadCardData();
        this.bindCardEvents();
        this.updateCardStats();
    }

    async loadCardData() {
        try {
            // 获取所有题目作为卡片
            const allQuestions = [];
            const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            
            for (const day of days) {
                const dayQuestions = await this.loader.loadDayQuestions(day);
                if (dayQuestions) {
                    dayQuestions.forEach((q, idx) => {
                        allQuestions.push({
                            ...q,
                            uniqueId: `${day}_${idx}`,
                            day: day,
                            cardStatus: 'new'
                        });
                    });
                }
            }
            
            this.cardState.allCards = allQuestions;
            this.cardState.stats.total = allQuestions.length;
            
            // 尝试从数据库加载卡片进度
            const savedProgress = await this.db.getCardProgress();
            if (savedProgress) {
                savedProgress.forEach(progress => {
                    const card = this.cardState.allCards.find(c => c.uniqueId === progress.id);
                    if (card) {
                        card.cardStatus = progress.status;
                    }
                });
            }
            
            // 应用筛选并显示
            this.filterCards();
            this.updateCardStats();
        } catch (error) {
            console.error('Failed to load card data:', error);
            this.showToast('加载卡片数据失败', 'error');
        }
    }

    bindCardEvents() {
        // 卡片翻转
        const flashcard = document.getElementById('flashcard');
        flashcard?.addEventListener('click', (e) => {
            if (!e.target.closest('.card-btn')) {
                this.flipCard();
            }
        });

        // 评分按钮
        document.querySelectorAll('.card-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const rating = e.currentTarget.dataset.rating;
                this.rateCard(rating);
            });
        });

        // 筛选器
        document.getElementById('cardDayFilter')?.addEventListener('change', (e) => {
            this.cardState.filter.day = e.target.value;
            this.filterCards();
        });

        document.getElementById('cardStatusFilter')?.addEventListener('change', (e) => {
            this.cardState.filter.status = e.target.value;
            this.filterCards();
        });

        // 控制按钮
        document.getElementById('shuffleCards')?.addEventListener('click', () => {
            this.shuffleCards();
        });

        document.getElementById('startCardStudy')?.addEventListener('click', () => {
            this.startCardStudy();
        });
    }

    flipCard() {
        const flashcard = document.getElementById('flashcard');
        if (!flashcard || this.cardState.cards.length === 0) return;
        
        this.cardState.isFlipped = !this.cardState.isFlipped;
        flashcard.classList.toggle('flipped', this.cardState.isFlipped);
    }

    rateCard(rating) {
        if (this.cardState.cards.length === 0) return;
        
        const currentCard = this.cardState.cards[this.cardState.currentIndex];
        
        // 更新卡片状态
        switch(rating) {
            case 'again':
                currentCard.cardStatus = 'learning';
                break;
            case 'hard':
                currentCard.cardStatus = 'learning';
                break;
            case 'good':
                currentCard.cardStatus = 'mastered';
                break;
            case 'easy':
                currentCard.cardStatus = 'mastered';
                break;
        }
        
        // 保存进度
        this.saveCardProgress(currentCard);
        
        // 显示反馈
        const feedback = {
            'again': '已标记为需要复习',
            'hard': '已记录为困难',
            'good': '掌握良好！',
            'easy': '太棒了！'
        };
        this.showToast(feedback[rating], 'success');
        
        // 延迟后显示下一张
        setTimeout(() => {
            this.nextCard();
        }, 500);
    }

    async saveCardProgress(card) {
        try {
            await this.db.saveCardProgress({
                id: card.uniqueId,
                status: card.cardStatus,
                timestamp: Date.now()
            });
            this.updateCardStats();
        } catch (error) {
            console.error('Failed to save card progress:', error);
        }
    }

    nextCard() {
        const flashcard = document.getElementById('flashcard');
        
        // 先翻回正面
        if (this.cardState.isFlipped) {
            this.cardState.isFlipped = false;
            flashcard?.classList.remove('flipped');
        }
        
        // 延迟后切换卡片
        setTimeout(() => {
            this.cardState.currentIndex++;
            if (this.cardState.currentIndex >= this.cardState.cards.length) {
                this.cardState.currentIndex = 0;
                this.showToast('已完成一轮学习！', 'success');
            }
            this.displayCard();
        }, 300);
    }

    displayCard() {
        if (this.cardState.cards.length === 0) {
            document.getElementById('cardQuestion').textContent = '暂无卡片，请选择其他筛选条件';
            document.getElementById('cardAnswer').textContent = '';
            return;
        }
        
        const card = this.cardState.cards[this.cardState.currentIndex];
        document.getElementById('cardCategory').textContent = card.category || `Day ${card.day}`;
        document.getElementById('cardCategoryBack').textContent = card.category || `Day ${card.day}`;
        document.getElementById('cardQuestion').textContent = card.question;
        document.getElementById('cardAnswer').textContent = card.answer;
        document.getElementById('cardProgressText').textContent = 
            `卡片 ${this.cardState.currentIndex + 1} / ${this.cardState.cards.length}`;
    }

    filterCards() {
        // 从原始数据筛选，避免重复筛选导致数据丢失
        let filtered = [...this.cardState.allCards];
        
        // 按天数筛选
        if (this.cardState.filter.day !== 'all') {
            filtered = filtered.filter(c => c.day === parseInt(this.cardState.filter.day));
        }
        
        // 按状态筛选
        if (this.cardState.filter.status !== 'all') {
            filtered = filtered.filter(c => c.cardStatus === this.cardState.filter.status);
        }
        
        this.cardState.cards = filtered;
        this.cardState.currentIndex = 0;
        this.cardState.isFlipped = false;
        document.getElementById('flashcard')?.classList.remove('flipped');
        
        this.displayCard();
    }

    shuffleCards() {
        for (let i = this.cardState.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cardState.cards[i], this.cardState.cards[j]] = 
            [this.cardState.cards[j], this.cardState.cards[i]];
        }
        this.cardState.currentIndex = 0;
        this.cardState.isFlipped = false;
        document.getElementById('flashcard')?.classList.remove('flipped');
        this.displayCard();
        this.showToast('卡片已随机洗牌', 'info');
    }

    startCardStudy() {
        if (this.cardState.cards.length === 0) {
            this.loadCardData().then(() => {
                this.displayCard();
            });
        } else {
            this.cardState.currentIndex = 0;
            this.cardState.isFlipped = false;
            document.getElementById('flashcard')?.classList.remove('flipped');
            this.displayCard();
        }
        this.showToast('开始学习！点击卡片翻转', 'success');
    }

    updateCardStats() {
        const stats = this.cardState.stats;
        const cards = this.cardState.cards;
        
        stats.learned = cards.filter(c => c.cardStatus !== 'new').length;
        stats.mastered = cards.filter(c => c.cardStatus === 'mastered').length;
        
        document.getElementById('cardsTotal').textContent = stats.total;
        document.getElementById('cardsLearned').textContent = stats.learned;
        document.getElementById('cardsMastered').textContent = stats.mastered;
    }

    // ==================== Categories ====================
    async loadCategories() {
        this.initCategoryState();
        await this.loadCategoryData();
        this.renderCategoryTree();
        this.bindCategoryEvents();
    }

    initCategoryState() {
        this.categoryState = {
            categories: [],
            currentCategory: null,
            questions: [],
            filter: {
                search: '',
                difficulty: 'all',
                status: 'all'
            },
            expandedCategories: new Set()
        };
    }

    async loadCategoryData() {
        try {
            const index = await this.loader.loadIndex();
            
            // 构建分类树结构
            this.categoryState.categories = index.categories.map(cat => ({
                id: cat.id,
                name: cat.name,
                day: cat.day,
                count: cat.question_count || 0,
                files: cat.files || [],
                expanded: false,
                selected: false
            }));
            
            // 默认选择第一个分类
            if (this.categoryState.categories.length > 0) {
                this.selectCategory(this.categoryState.categories[0].id);
            }
        } catch (error) {
            console.error('Failed to load category data:', error);
            this.showToast('加载分类数据失败', 'error');
        }
    }

    renderCategoryTree() {
        const treeContainer = document.getElementById('categoryTree');
        if (!treeContainer) return;
        
        const buildTree = (categories) => {
            return categories.map(cat => `
                <div class="category-item ${cat.selected ? 'selected' : ''}" data-id="${cat.id}">
                    <div class="category-item-header">
                        <span class="category-icon">📁</span>
                        <span class="category-name">${cat.name}</span>
                        <span class="category-count">(${cat.count})</span>
                    </div>
                    <div class="category-day">Day ${cat.day}</div>
                </div>
            `).join('');
        };
        
        treeContainer.innerHTML = buildTree(this.categoryState.categories);
    }

    bindCategoryEvents() {
        // 分类点击
        document.getElementById('categoryTree')?.addEventListener('click', (e) => {
            const item = e.target.closest('.category-item');
            if (item) {
                const categoryId = item.dataset.id;
                this.selectCategory(categoryId);
            }
        });
        
        // 搜索筛选
        document.getElementById('categorySearch')?.addEventListener('input', (e) => {
            this.categoryState.filter.search = e.target.value.toLowerCase();
            this.filterCategories();
        });
    }

    async selectCategory(categoryId) {
        // 更新选中状态
        this.categoryState.categories.forEach(cat => {
            cat.selected = cat.id === categoryId;
        });
        
        this.renderCategoryTree();
        
        // 加载该分类的题目
        const category = this.categoryState.categories.find(c => c.id === categoryId);
        if (category) {
            this.categoryState.currentCategory = category;
            await this.loadCategoryQuestions(category);
            this.updateCategoryHeader(category);
        }
    }

    async loadCategoryQuestions(category) {
        try {
            const questions = [];
            
            // 加载该分类的所有题目文件
            for (const file of category.files) {
                const fileQuestions = await this.loader.loadQuestions(file);
                fileQuestions.forEach(q => {
                    q.categoryName = category.name;
                    q.categoryId = category.id;
                });
                questions.push(...fileQuestions);
            }
            
            this.categoryState.questions = questions;
            this.renderCategoryQuestions();
        } catch (error) {
            console.error('Failed to load category questions:', error);
            this.showToast('加载题目失败', 'error');
        }
    }

    renderCategoryQuestions() {
        const container = document.getElementById('categoryQuestionsList');
        if (!container) return;
        
        let questions = this.categoryState.questions;
        
        // 应用筛选
        if (this.categoryState.filter.search) {
            questions = questions.filter(q => 
                q.question.toLowerCase().includes(this.categoryState.filter.search) ||
                q.answer.toLowerCase().includes(this.categoryState.filter.search)
            );
        }
        
        if (questions.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <span class="empty-icon">📭</span>
                    <p>暂无题目</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = questions.map((q, idx) => `
            <div class="question-list-item" data-id="${q.id}">
                <div class="question-header">
                    <span class="question-number">#${idx + 1}</span>
                    <span class="question-difficulty ${this.getDifficultyClass(q.difficulty)}">
                        ${this.getDifficultyText(q.difficulty)}
                    </span>
                    <span class="question-id">${q.id}</span>
                </div>
                <div class="question-content">${q.question}</div>
                <div class="question-answer-preview">
                    ${q.answer.substring(0, 100)}${q.answer.length > 100 ? '...' : ''}
                </div>
                <div class="question-tags">
                    ${(q.tags || []).map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="question-actions">
                    <button class="btn-view-answer" data-id="${q.id}">查看答案</button>
                    <button class="btn-study-now" data-id="${q.id}">去学习</button>
                </div>
            </div>
        `).join('');
        
        // 绑定按钮事件
        container.querySelectorAll('.btn-view-answer').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.dataset.id;
                this.showQuestionAnswer(id);
            });
        });
        
        container.querySelectorAll('.btn-study-now').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.dataset.id;
                this.goToStudyQuestion(id);
            });
        });
        
        // 更新统计
        document.getElementById('categoryQuestionCount').textContent = `${questions.length} 题`;
    }

    showQuestionAnswer(questionId) {
        const question = this.categoryState.questions.find(q => q.id === questionId);
        if (!question) return;
        
        // 创建模态框显示答案
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content question-modal">
                <div class="modal-header">
                    <h3>${question.id}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="question-section">
                        <h4>题目</h4>
                        <div class="question-text">${question.question}</div>
                    </div>
                    <div class="answer-section">
                        <h4>答案</h4>
                        <div class="answer-text">${this.renderMarkdown(question.answer)}</div>
                    </div>
                    <div class="question-meta">
                        <span>难度: ${this.getDifficultyText(question.difficulty)}</span>
                        <span>分类: ${question.categoryName}</span>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-primary" id="closeModal">关闭</button>
                    <button class="btn-secondary" id="goToStudy">去学习此题</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // 绑定关闭事件
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.remove();
        });
        modal.querySelector('#closeModal').addEventListener('click', () => {
            modal.remove();
        });
        modal.querySelector('#goToStudy').addEventListener('click', () => {
            modal.remove();
            this.goToStudyQuestion(questionId);
        });
        
        // 点击外部关闭
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    }

    goToStudyQuestion(questionId) {
        // 跳转到学习页面并定位到该题目
        const question = this.categoryState.questions.find(q => q.id === questionId);
        if (!question) return;
        
        // 切换到学习页面
        this.navigateTo('study');
        
        // 设置天数和题目
        setTimeout(() => {
            document.getElementById('dayFilter').value = question.day;
            this.currentDay = question.day;
            this.loadQuestionsForDay(question.day);
            
            // 找到并高亮该题目
            const targetQuestion = this.questionsCache.get(question.day)?.find(q => q.id === questionId);
            if (targetQuestion) {
                this.currentQuestion = targetQuestion;
                this.displayQuestion();
            }
        }, 100);
    }

    filterCategories() {
        const search = this.categoryState.filter.search.toLowerCase();
        
        if (!search) {
            this.renderCategoryTree();
            return;
        }
        
        // 筛选分类
        const filtered = this.categoryState.categories.filter(cat => 
            cat.name.toLowerCase().includes(search)
        );
        
        // 重新渲染树
        const treeContainer = document.getElementById('categoryTree');
        if (treeContainer) {
            treeContainer.innerHTML = filtered.map(cat => `
                <div class="category-item ${cat.selected ? 'selected' : ''}" data-id="${cat.id}">
                    <div class="category-item-header">
                        <span class="category-icon">📁</span>
                        <span class="category-name">${cat.name}</span>
                        <span class="category-count">(${cat.count})</span>
                    </div>
                    <div class="category-day">Day ${cat.day}</div>
                </div>
            `).join('');
        }
    }

    updateCategoryHeader(category) {
        document.getElementById('currentCategoryTitle').textContent = category.name;
        document.getElementById('categoryQuestionCount').textContent = `${category.count} 题`;
        
        // 计算已掌握数量
        const mastered = this.categoryState.questions.filter(q => 
            this.progressCache.get(q.id)?.status === 'mastered'
        ).length;
        document.getElementById('categoryMasteredCount').textContent = `已掌握 ${mastered}`;
    }

    async loadWeakness() {
        this.showToast('薄弱项分析功能开发中', 'info');
    }

    async loadMock() {
        this.showToast('模拟面试功能开发中', 'info');
    }

    async loadChat() {
        await this.initAiChat();
    }

    // ==================== AI Chat ====================
    async initAiChat() {
        const chatContainer = document.getElementById('chatContainer');
        const chatInput = document.getElementById('chatInput');
        const sendBtn = document.getElementById('sendMessage');
        
        if (!chatContainer) return;
        
        // 清空容器并添加欢迎消息
        chatContainer.innerHTML = `
            <div class="chat-message ai-message">
                <div class="chat-avatar">🤖</div>
                <div class="chat-content">
                    <div class="chat-text">你好！我是你的 Android 面试 AI 助手。我可以帮你：</div>
                    <ul class="chat-list">
                        <li>📚 深入解析面试题目</li>
                        <li>💡 提供学习建议和知识点扩展</li>
                        <li>🎯 分析你的薄弱项并推荐针对性练习</li>
                        <li>📝 生成模拟面试题目</li>
                    </ul>
                    <div class="chat-text">有什么想聊的，随时告诉我！</div>
                </div>
            </div>
        `;
        
        // 绑定发送事件
        sendBtn?.addEventListener('click', () => this.sendAiMessage());
        chatInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendAiMessage();
        });
        
        // 添加快捷提示按钮
        this.addQuickPrompts();
    }
    
    addQuickPrompts() {
        const prompts = [
            { icon: '📖', text: '解释当前题目', action: 'explain_current' },
            { icon: '🎯', text: '分析薄弱知识点', action: 'analyze_weakness' },
            { icon: '📝', text: '生成模拟面试', action: 'generate_mock' },
            { icon: '💡', text: '学习建议', action: 'study_advice' }
        ];
        
        const container = document.getElementById('chatQuickPrompts');
        if (!container) return;
        
        container.innerHTML = prompts.map(p => `
            <button class="quick-prompt-btn" data-action="${p.action}">
                <span class="prompt-icon">${p.icon}</span>
                <span class="prompt-text">${p.text}</span>
            </button>
        `).join('');
        
        container.querySelectorAll('.quick-prompt-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.currentTarget.dataset.action;
                this.handleQuickPrompt(action);
            });
        });
    }
    
    async handleQuickPrompt(action) {
        let message = '';
        switch(action) {
            case 'explain_current':
                if (this.currentQuestion) {
                    message = `请详细解释这道面试题：\n\n题目：${this.currentQuestion.question}\n\n当前答案：${this.currentQuestion.answer}`;
                } else {
                    message = '请帮我解释 Android 中 Binder 机制的原理和作用';
                }
                break;
            case 'analyze_weakness':
                const progress = await this.db.getAllProgress();
                const weakCount = progress.filter(p => p.status === 'weak').length;
                message = `我目前有 ${weakCount} 个薄弱知识点，请帮我分析一下应该如何针对性地改进？`;
                break;
            case 'generate_mock':
                message = '请给我生成一套 Android 初级面试题，包含 Activity、Service、Handler 相关的问题';
                break;
            case 'study_advice':
                message = '我已经学习了 Android 基础和 Kotlin，接下来应该重点学习哪些内容？';
                break;
        }
        
        document.getElementById('chatInput').value = message;
        await this.sendAiMessage();
    }

    async sendAiMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();
        if (!message) return;
        
        // 添加用户消息
        this.addChatMessage('user', message);
        input.value = '';
        
        // 显示 AI 思考中
        const thinkingId = this.showAiThinking();
        
        try {
            const response = await this.callAiApi(message);
            this.removeAiThinking(thinkingId);
            this.addChatMessage('ai', response);
        } catch (error) {
            this.removeAiThinking(thinkingId);
            this.addChatMessage('ai', '抱歉，AI 服务暂时不可用，请稍后重试。错误：' + error.message);
        }
    }

    addChatMessage(role, content) {
        const container = document.getElementById('chatContainer');
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${role}-message`;
        
        const avatar = role === 'ai' ? '🤖' : '👤';
        const isMarkdown = role === 'ai';
        
        messageDiv.innerHTML = `
            <div class="chat-avatar">${avatar}</div>
            <div class="chat-content">
                <div class="chat-text">${isMarkdown ? this.renderMarkdown(content) : this.escapeHtml(content)}</div>
            </div>
        `;
        
        container.appendChild(messageDiv);
        container.scrollTop = container.scrollHeight;
    }

    showAiThinking() {
        const container = document.getElementById('chatContainer');
        const id = 'thinking-' + Date.now();
        const thinkingDiv = document.createElement('div');
        thinkingDiv.id = id;
        thinkingDiv.className = 'chat-message ai-message thinking';
        thinkingDiv.innerHTML = `
            <div class="chat-avatar">🤖</div>
            <div class="chat-content">
                <div class="chat-text">
                    <span class="thinking-dots">思考中<span>.</span><span>.</span><span>.</span></span>
                </div>
            </div>
        `;
        container.appendChild(thinkingDiv);
        container.scrollTop = container.scrollHeight;
        return id;
    }

    removeAiThinking(id) {
        const el = document.getElementById(id);
        if (el) el.remove();
    }

    async callAiApi(message) {
        // 获取 API Key（从配置或本地存储）
        const apiKey = window.appConfig?.ai?.apiKey || localStorage.getItem('ai_api_key');
        
        // 如果没有 API Key，使用演示模式
        if (!apiKey) {
            console.log('AI API Key not found, using mock mode');
            return this.getMockAiResponse(message);
        }
        
        try {
            const response = await fetch('https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: window.appConfig?.ai?.model || 'qwen-turbo',
                    input: {
                        messages: [
                            {
                                role: 'system',
                                content: '你是 Android 面试专家助手。请用中文回答，提供详细的面试知识点解析、代码示例和学习建议。回答要结构清晰，重点突出。'
                            },
                            {
                                role: 'user',
                                content: message
                            }
                        ]
                    },
                    parameters: {
                        result_format: 'message',
                        max_tokens: 2000,
                        temperature: 0.7
                    }
                })
            });

            if (!response.ok) {
                throw new Error(`API 错误: ${response.status}`);
            }

            const data = await response.json();
            return data.output?.choices?.[0]?.message?.content || 'AI 没有返回有效回答';
        } catch (error) {
            console.error('AI API call failed:', error);
            return this.getMockAiResponse(message);
        }
    }
    
    getMockAiResponse(message) {
        // 模拟 AI 回答，用于演示
        const responses = {
            'handler': `## Handler 机制的重要性

Handler 是 Android 中最重要的机制之一，在面试中几乎必问：

### 核心作用
1. **线程间通信** - 子线程通过 Handler 向主线程发送消息，更新 UI
2. **异步处理** - 避免在主线程执行耗时操作，防止 ANR
3. **消息调度** - 通过 MessageQueue 实现延迟执行和定时任务

### 核心组件
- **Handler** - 发送和处理消息
- **Looper** - 消息循环，不断从 MessageQueue 取消息
- **MessageQueue** - 消息队列，存储待处理的消息
- **Message** - 消息载体

### 典型使用场景
\`\`\`kotlin
// 子线程处理耗时任务后更新 UI
thread {
    val result = loadData()
    handler.post {
        textView.text = result  // 在主线程更新 UI
    }
}
\`\`\`

### 面试常见问题
1. **为什么 Handler 不会阻塞主线程？**
   - Looper.loop() 是阻塞的，但它阻塞的是消息队列，不是主线程的 UI 渲染
   
2. **Handler 内存泄漏原因？**
   - 非静态内部类持有外部 Activity 引用，Activity 销毁时消息未处理完

3. **IdleHandler 是什么？**
   - 在 MessageQueue 空闲时执行的回调，用于延迟初始化

需要深入了解哪个方面？`,
            'default': `## 回答您的问题

您的问题很有价值！让我为您详细分析：

### 核心概念
这是一个重要的 Android 面试知识点，在实际开发中经常使用。

### 关键点
1. **原理** - 理解其工作机制和内部实现
2. **使用场景** - 知道在什么情况下使用
3. **注意事项** - 避免常见错误和性能问题
4. **源码分析** - 能简单描述关键源码流程

### 学习建议
- 结合源码学习，理解底层实现
- 多动手实践，写 Demo 验证
- 总结常见面试题和回答套路

如果您有具体的题目或代码需要分析，欢迎继续提问！我可以帮您：
- 深入解析具体题目
- 分析代码问题
- 提供学习路线建议

您还想了解什么？`
        };
        
        // 根据消息内容匹配回答
        const lowerMsg = message.toLowerCase();
        if (lowerMsg.includes('handler')) {
            return responses['handler'];
        }
        
        return responses['default'];
    }

    renderMarkdown(text) {
        // 简单的 Markdown 渲染
        return text
            .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.+?)\*/g, '<em>$1</em>')
            .replace(/^### (.+)$/gm, '<h4>$1</h4>')
            .replace(/^## (.+)$/gm, '<h3>$1</h3>')
            .replace(/^# (.+)$/gm, '<h2>$1</h2>')
            .replace(/^- (.+)$/gm, '<li>$1</li>')
            .replace(/(<li>.+<\/li>\n?)+/g, '<ul>$&</ul>')
            .replace(/\n/g, '<br>');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }



    // ==================== Utilities ====================
    handleSearch(keyword) {
        if (keyword.length < 2) return;
        // 搜索逻辑
        console.log('Search:', keyword);
    }

    openSettings() {
        document.getElementById('settingsModal').classList.add('active');
    }

    openAiModal() {
        document.getElementById('aiModal').classList.add('active');
    }

    async exportData() {
        try {
            const progress = await this.db.getAllProgress();
            const data = {
                version: '1.0',
                exportDate: new Date().toISOString(),
                progress
            };
            
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `android_interview_backup_${Date.now()}.json`;
            a.click();
            URL.revokeObjectURL(url);
            
            this.showToast('数据导出成功', 'success');
        } catch (error) {
            console.error('Export failed:', error);
            this.showToast('导出失败', 'error');
        }
    }

    showToast(message, type = 'info') {
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        container.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    window.app = new AndroidInterviewApp();
});
