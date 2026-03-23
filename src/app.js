/**
 * Android 面试学习系统 - 主应用逻辑
 * Enhanced AI Integration
 */

class AndroidInterviewApp {
    constructor() {
        this.db = null;
        this.loader = null;
        this.currentPage = 'dashboard';
        this.currentQuestion = null;
        this.currentQuestions = [];
        this.currentDay = 1;
        this.questionsCache = new Map();
        this.progressCache = new Map();
        this.aiConfig = this.loadAiConfig();
        
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
            
            // 初始化 AI 配置
            this.initAiConfig();
            
            // 加载初始数据
            await this.loadDashboard();
            
            console.log('App initialized successfully');
        } catch (error) {
            console.error('Failed to initialize app:', error);
            this.showToast('初始化失败，请刷新页面重试', 'error');
        }
    }

    // ==================== AI Configuration ====================
    loadAiConfig() {
        const saved = localStorage.getItem('ai_config');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error('Failed to parse AI config:', e);
            }
        }
        return {
            apiKey: '',
            model: 'qwen-turbo',
            temperature: 0.7,
            provider: 'dashscope' // dashscope, openai, etc.
        };
    }

    saveAiConfig() {
        localStorage.setItem('ai_config', JSON.stringify(this.aiConfig));
    }

    initAiConfig() {
        // AI 配置按钮
        document.getElementById('settingsBtn')?.addEventListener('click', () => {
            this.openAiConfigModal();
        });

        // 绑定 AI 配置模态框事件
        this.bindAiConfigEvents();
    }

    bindAiConfigEvents() {
        const modal = document.getElementById('aiConfigModal');
        const closeBtn = document.getElementById('closeAiConfig');
        const saveBtn = document.getElementById('saveAiConfig');
        const testBtn = document.getElementById('testAiConnection');
        const toggleBtn = document.getElementById('toggleApiKey');
        const apiKeyInput = document.getElementById('aiApiKey');
        const modelSelect = document.getElementById('aiModel');
        const tempSlider = document.getElementById('aiTemperature');

        // 关闭模态框
        closeBtn?.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        // 点击外部关闭
        modal?.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });

        // 切换 API Key 可见性
        toggleBtn?.addEventListener('click', () => {
            const type = apiKeyInput.type === 'password' ? 'text' : 'password';
            apiKeyInput.type = type;
            toggleBtn.textContent = type === 'password' ? '👁️' : '🙈';
        });

        // 温度滑块
        tempSlider?.addEventListener('input', (e) => {
            const value = e.target.value / 100;
            document.getElementById('temperatureValue').textContent = value.toFixed(1);
        });

        // 保存配置
        saveBtn?.addEventListener('click', () => {
            this.aiConfig = {
                apiKey: apiKeyInput.value.trim(),
                model: modelSelect.value,
                temperature: parseInt(tempSlider.value) / 100,
                provider: this.getProviderFromModel(modelSelect.value)
            };
            this.saveAiConfig();
            this.showConfigStatus('配置已保存', 'success');
            setTimeout(() => modal.classList.remove('active'), 1000);
        });

        // 测试连接
        testBtn?.addEventListener('click', () => {
            this.testAiConnection();
        });
    }

    getProviderFromModel(model) {
        if (model.startsWith('qwen')) return 'dashscope';
        if (model.startsWith('gpt')) return 'openai';
        if (model.startsWith('claude')) return 'anthropic';
        if (model.startsWith('deepseek')) return 'deepseek';
        return 'dashscope';
    }

    openAiConfigModal() {
        const modal = document.getElementById('aiConfigModal');
        const apiKeyInput = document.getElementById('aiApiKey');
        const modelSelect = document.getElementById('aiModel');
        const tempSlider = document.getElementById('aiTemperature');

        // 填充当前配置
        apiKeyInput.value = this.aiConfig.apiKey || '';
        modelSelect.value = this.aiConfig.model || 'qwen-turbo';
        tempSlider.value = (this.aiConfig.temperature || 0.7) * 100;
        document.getElementById('temperatureValue').textContent = 
            (this.aiConfig.temperature || 0.7).toFixed(1);

        modal.classList.add('active');
    }

    async testAiConnection() {
        const apiKey = document.getElementById('aiApiKey').value.trim();
        if (!apiKey) {
            this.showConfigStatus('请输入 API Key', 'error');
            return;
        }

        this.showConfigStatus('正在测试连接...', 'info');

        try {
            const response = await this.callAiApi('Hello', true);
            if (response && !response.includes('错误')) {
                this.showConfigStatus('连接成功！', 'success');
            } else {
                this.showConfigStatus('连接失败，请检查 API Key', 'error');
            }
        } catch (error) {
            this.showConfigStatus(`连接失败: ${error.message}`, 'error');
        }
    }

    showConfigStatus(message, type) {
        const statusEl = document.getElementById('aiConfigStatus');
        statusEl.textContent = message;
        statusEl.className = 'config-status ' + type;
        
        setTimeout(() => {
            statusEl.textContent = '';
            statusEl.className = 'config-status';
        }, 5000);
    }

    // ==================== Core Events ====================
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
        
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['已掌握', '学习中', '未开始'],
                datasets: [{
                    data: [10, 20, 70],
                    backgroundColor: ['#00D26A', '#F59E0B', '#1F2937'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { color: '#9CA3AF' }
                    }
                }
            }
        });
    }

    // ==================== Study ====================
    async loadStudy() {
        try {
            // 加载当前天数的题目
            const questions = await this.loader.loadDay(this.currentDay);
            
            // 过滤掉已掌握的题目
            const filteredQuestions = [];
            for (const q of questions) {
                const progress = await this.db.getProgress(q.id);
                if (!progress || progress.status !== 'mastered') {
                    filteredQuestions.push(q);
                }
            }
            
            this.currentQuestions = filteredQuestions;
            
            // 显示第一题
            if (filteredQuestions.length > 0) {
                await this.showQuestion(filteredQuestions[0]);
            } else {
                document.getElementById('qTitle').textContent = '🎉 该章节所有题目都已掌握！';
                document.getElementById('aBody').innerHTML = '<p>你可以选择其他天数继续学习。</p>';
            }

            // 更新计数
            document.getElementById('currentNum').textContent = filteredQuestions.length > 0 ? '1' : '0';
            document.getElementById('totalNum').textContent = filteredQuestions.length;

            // 绑定学习页面事件
            this.bindStudyEvents();
            
        } catch (error) {
            console.error('Failed to load study:', error);
            this.showToast('加载题目失败', 'error');
        }
    }

    bindStudyEvents() {
        // 避免重复绑定，先移除旧的事件监听器
        const prevBtn = document.getElementById('prevQuestion');
        const nextBtn = document.getElementById('nextQuestion');
        const revealBtn = document.getElementById('revealAnswer');
        
        // 使用新的处理方式，避免重复绑定
        if (prevBtn && !prevBtn._hasEvent) {
            prevBtn.addEventListener('click', () => this.prevQuestion());
            prevBtn._hasEvent = true;
        }
        if (nextBtn && !nextBtn._hasEvent) {
            nextBtn.addEventListener('click', () => this.nextQuestion());
            nextBtn._hasEvent = true;
        }
        if (revealBtn && !revealBtn._hasEvent) {
            revealBtn.addEventListener('click', () => {
                document.getElementById('answerContent').style.display = 'block';
                document.getElementById('revealAnswer').style.display = 'none';
            });
            revealBtn._hasEvent = true;
        }

        // 掌握程度按钮 - 使用事件委托
        const ratingContainer = document.querySelector('.rating-buttons');
        if (ratingContainer && !ratingContainer._hasEvent) {
            ratingContainer.addEventListener('click', (e) => {
                const btn = e.target.closest('.rating-btn');
                if (btn) {
                    const rating = btn.dataset.rating;
                    this.rateQuestion(rating);
                }
            });
            ratingContainer._hasEvent = true;
        }

        // AI 按钮同样处理
        const aiLearnBtn = document.getElementById('aiLearnBtn');
        if (aiLearnBtn && !aiLearnBtn._hasEvent) {
            aiLearnBtn.addEventListener('click', () => {
                if (!this.currentQuestion) {
                    this.showToast('请先选择一道题目', 'error');
                    return;
                }
                this.navigateTo('chat');
                setTimeout(() => this.explainWithAi(this.currentQuestion), 100);
            });
            aiLearnBtn._hasEvent = true;
        }

        const aiDeepBtn = document.getElementById('aiDeepAnalysisBtn');
        if (aiDeepBtn && !aiDeepBtn._hasEvent) {
            aiDeepBtn.addEventListener('click', () => {
                if (!this.currentQuestion) {
                    this.showToast('请先选择一道题目', 'error');
                    return;
                }
                this.showAiDeepAnalysis(this.currentQuestion);
            });
            aiDeepBtn._hasEvent = true;
        }

        // 快速提问按钮
        const quickActions = document.querySelector('.quick-actions');
        if (quickActions && !quickActions._hasEvent) {
            quickActions.addEventListener('click', (e) => {
                const btn = e.target.closest('.quick-action-btn');
                if (btn) {
                    const prompt = btn.dataset.prompt;
                    this.handleQuickAction(prompt);
                }
            });
            quickActions._hasEvent = true;
        }

        // 天数筛选器
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
        this.questionsCache.set(question.id, question);

        // 更新显示
        document.getElementById('qCategory').textContent = question.category || 'Android基础';
        document.getElementById('qSubcategory').textContent = question.subcategory || '';
        document.getElementById('qDifficulty').textContent = this.getDifficultyText(question.difficulty);
        document.getElementById('qDifficulty').className = `tag difficulty-tag difficulty-${question.difficulty}`;
        document.getElementById('qDay').textContent = `Day ${question.day}`;
        document.getElementById('qTitle').textContent = question.question;
        
        // 渲染答案
        const answerHtml = this.renderMarkdown(question.answer || '暂无答案');
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
        
        // 自动切换到下一题（延迟500ms让用户看到反馈）
        setTimeout(() => {
            this.nextQuestion();
        }, 500);
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
        const currentIndex = this.currentQuestions.findIndex(q => q.id === this.currentQuestion?.id);
        if (currentIndex === -1) return;
        const prevIndex = currentIndex === 0 ? this.currentQuestions.length - 1 : currentIndex - 1;
        this.showQuestion(this.currentQuestions[prevIndex]);
        document.getElementById('currentNum').textContent = prevIndex + 1;
    }

    nextQuestion() {
        if (!this.currentQuestions || this.currentQuestions.length === 0) return;
        const currentIndex = this.currentQuestions.findIndex(q => q.id === this.currentQuestion?.id);
        if (currentIndex === -1) return;
        const nextIndex = currentIndex === this.currentQuestions.length - 1 ? 0 : currentIndex + 1;
        this.showQuestion(this.currentQuestions[nextIndex]);
        document.getElementById('currentNum').textContent = nextIndex + 1;
    }

    // ==================== AI Deep Analysis ====================
    async showAiDeepAnalysis(question) {
        const modal = document.getElementById('aiResponseModal');
        const titleEl = document.getElementById('aiResponseTitle');
        const subtitleEl = document.getElementById('aiResponseSubtitle');
        const contentEl = document.getElementById('aiResponseContent');

        titleEl.textContent = '🧠 AI 深度解析';
        subtitleEl.textContent = `正在分析: ${question.question.substring(0, 30)}...`;
        contentEl.innerHTML = `
            <div class="ai-loading">
                <div class="ai-loading-spinner"></div>
                <p>AI 正在深度分析中，请稍候...</p>
            </div>
        `;

        modal.classList.add('active');

        // 关闭按钮事件
        document.getElementById('closeAiResponse')?.addEventListener('click', () => {
            modal.classList.remove('active');
        });
        document.getElementById('closeAiResponseBtn')?.addEventListener('click', () => {
            modal.classList.remove('active');
        });
        document.getElementById('copyAiResponse')?.addEventListener('click', () => {
            const text = contentEl.innerText;
            navigator.clipboard.writeText(text).then(() => {
                this.showToast('内容已复制到剪贴板', 'success');
            });
        });

        // 调用 AI
        const prompt = `请对以下 Android 面试题进行深度解析：

题目：${question.question}

参考答案：${question.answer}

请从以下几个方面进行分析：
1. 核心知识点讲解
2. 易错点和面试陷阱
3. 相关扩展知识
4. 实际应用场景
5. 面试回答技巧

请用中文回答，结构清晰。`;

        try {
            const response = await this.callAiApi(prompt);
            contentEl.innerHTML = this.renderMarkdown(response);
            subtitleEl.textContent = '分析完成';
        } catch (error) {
            contentEl.innerHTML = `
                <div class="chat-message error">
                    <div class="chat-content">
                        <div class="chat-text">
                            <span class="chat-error-icon">⚠️</span>
                            获取 AI 分析失败: ${error.message}
                        </div>
                    </div>
                </div>
            `;
            subtitleEl.textContent = '分析失败';
        }
    }

    // ==================== Quick Actions ====================
    async handleQuickAction(prompt) {
        if (!this.currentQuestion) {
            this.showToast('请先选择一道题目', 'error');
            return;
        }

        let message = '';
        switch(prompt) {
            case 'explain':
                message = `请详细解释这道 Android 面试题：\n\n题目：${this.currentQuestion.question}\n\n参考答案：${this.currentQuestion.answer}\n\n请用通俗易懂的方式解释，并补充关键知识点。`;
                break;
            case 'knowledge':
                message = `这道 Android 面试题涉及哪些相关知识点？\n\n题目：${this.currentQuestion.question}\n\n请列出相关的核心概念、原理和技术栈。`;
                break;
            case 'extend':
                message = `请基于这道 Android 面试题，举一反三，提供几道类似的进阶题目和延伸问题：\n\n题目：${this.currentQuestion.question}\n\n请包含：1. 难度递增的变体题 2. 实际应用场景 3. 相关面试常考题。`;
                break;
        }

        // 在聊天页面显示
        this.navigateTo('chat');
        setTimeout(() => {
            document.getElementById('chatInput').value = message;
            this.sendAiMessage();
        }, 100);
    }

    // ==================== Flash Cards ====================
    initCardState() {
        this.cardState = {
            allCards: [],
            cards: [],
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
            const allQuestions = [];
            const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
            
            for (const day of days) {
                try {
                    const dayQuestions = await this.loader.loadDay(day);
                    if (dayQuestions && Array.isArray(dayQuestions)) {
                        dayQuestions.forEach((q, idx) => {
                            if (q && q.id) {
                                allQuestions.push({
                                    ...q,
                                    uniqueId: `${day}_${q.id}`,
                                    day: day,
                                    cardStatus: 'new'
                                });
                            }
                        });
                    }
                } catch (dayError) {
                    console.warn(`Failed to load day ${day}:`, dayError);
                }
            }
            
            this.cardState.allCards = allQuestions;
            this.cardState.stats.total = allQuestions.length;
            
            const savedProgress = await this.db.getCardProgress();
            if (savedProgress && savedProgress.length > 0) {
                savedProgress.forEach(progress => {
                    const card = this.cardState.allCards.find(c => c.uniqueId === progress.id);
                    if (card) {
                        card.cardStatus = progress.status;
                    }
                });
            }
            
            this.filterCards();
            this.updateCardStats();
            console.log(`Loaded ${allQuestions.length} cards`);
        } catch (error) {
            console.error('Failed to load card data:', error);
            this.showToast('加载卡片数据失败', 'error');
        }
    }

    bindCardEvents() {
        const flashcard = document.getElementById('flashcard');
        flashcard?.addEventListener('click', (e) => {
            if (!e.target.closest('.card-btn')) {
                this.flipCard();
            }
        });

        document.querySelectorAll('.card-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const rating = e.currentTarget.dataset.rating;
                this.rateCard(rating);
            });
        });

        document.getElementById('cardDayFilter')?.addEventListener('change', (e) => {
            this.cardState.filter.day = e.target.value;
            this.filterCards();
        });

        document.getElementById('cardStatusFilter')?.addEventListener('change', (e) => {
            this.cardState.filter.status = e.target.value;
            this.filterCards();
        });

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
        
        switch(rating) {
            case 'again':
            case 'hard':
                currentCard.cardStatus = 'learning';
                break;
            case 'good':
            case 'easy':
                currentCard.cardStatus = 'mastered';
                break;
        }
        
        this.saveCardProgress(currentCard);
        
        const feedback = {
            'again': '已标记为需要复习',
            'hard': '已记录为困难',
            'good': '掌握良好！',
            'easy': '太棒了！'
        };
        this.showToast(feedback[rating], 'success');
        
        setTimeout(() => this.nextCard(), 500);
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
        if (this.cardState.isFlipped) {
            this.cardState.isFlipped = false;
            flashcard?.classList.remove('flipped');
        }
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
        let filtered = [...this.cardState.allCards];
        if (this.cardState.filter.day !== 'all') {
            filtered = filtered.filter(c => c.day === parseInt(this.cardState.filter.day));
        }
        if (this.cardState.filter.status && this.cardState.filter.status !== 'all') {
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
            this.loadCardData().then(() => this.displayCard());
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
            filter: { search: '', difficulty: 'all', status: 'all' },
            expandedCategories: new Set()
        };
    }

    async loadCategoryData() {
        try {
            const index = await this.loader.loadIndex();
            this.categoryState.categories = index.categories.map(cat => ({
                id: cat.id,
                name: cat.name,
                day: cat.day,
                count: cat.question_count || 0,
                files: cat.files || [],
                expanded: false,
                selected: false
            }));
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
        treeContainer.innerHTML = this.categoryState.categories.map(cat => `
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

    bindCategoryEvents() {
        document.getElementById('categoryTree')?.addEventListener('click', (e) => {
            const item = e.target.closest('.category-item');
            if (item) {
                this.selectCategory(item.dataset.id);
            }
        });
        document.getElementById('categorySearch')?.addEventListener('input', (e) => {
            this.categoryState.filter.search = e.target.value.toLowerCase();
            this.filterCategories();
        });
    }

    async selectCategory(categoryId) {
        this.categoryState.categories.forEach(cat => {
            cat.selected = cat.id === categoryId;
        });
        this.renderCategoryTree();
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
        if (this.categoryState.filter.search) {
            questions = questions.filter(q => 
                q.question.toLowerCase().includes(this.categoryState.filter.search) ||
                q.answer.toLowerCase().includes(this.categoryState.filter.search)
            );
        }
        if (questions.length === 0) {
            container.innerHTML = '<div class="empty-state"><span class="empty-icon">📭</span><p>暂无题目</p></div>';
            return;
        }
        container.innerHTML = questions.map((q, idx) => `
            <div class="question-list-item" data-id="${q.id}">
                <div class="question-header">
                    <span class="question-number">#${idx + 1}</span>
                    <span class="question-difficulty ${this.getDifficultyClass(q.difficulty)}">
                        ${this.getDifficultyText(q.difficulty)}
                    </span>
                </div>
                <div class="question-content">${q.question}</div>
                <div class="question-actions">
                    <button class="btn-secondary btn-sm view-question-btn" data-id="${q.id}">查看</button>
                </div>
            </div>
        `).join('');
        document.getElementById('categoryQuestionCount').textContent = `${questions.length} 题`;
        
        // 绑定查看按钮事件
        container.querySelectorAll('.view-question-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const questionId = e.target.dataset.id;
                this.viewQuestionFromCategory(questionId);
            });
        });
    }

    async viewQuestionFromCategory(questionId) {
        const question = this.categoryState.questions.find(q => q.id === questionId);
        if (!question) return;
        
        // 切换到学习页面并显示该题目
        this.navigateTo('study');
        
        // 等待页面加载完成后显示题目
        setTimeout(() => {
            this.currentQuestions = this.categoryState.questions;
            this.showQuestion(question);
            const currentIndex = this.currentQuestions.findIndex(q => q.id === questionId);
            document.getElementById('currentNum').textContent = currentIndex + 1;
            document.getElementById('totalNum').textContent = this.currentQuestions.length;
        }, 100);
    }

    updateCategoryHeader(category) {
        document.getElementById('currentCategoryTitle').textContent = category.name;
        document.getElementById('categoryQuestionCount').textContent = `${category.count} 题`;
    }

    // ==================== Weakness ====================
    async loadWeakness() {
        this.showToast('薄弱项分析功能开发中', 'info');
    }

    // ==================== Mock ====================
    async loadMock() {
        this.showToast('模拟面试功能开发中', 'info');
    }

    // ==================== AI Chat ====================
    async loadChat() {
        await this.initAiChat();
    }

    async initAiChat() {
        const chatContainer = document.getElementById('chatContainer');
        const chatInput = document.getElementById('chatInput');
        const sendBtn = document.getElementById('sendMessage');
        
        if (!chatContainer) return;
        
        // 只初始化一次欢迎消息
        if (chatContainer.children.length === 0) {
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
        }
        
        sendBtn?.addEventListener('click', () => this.sendAiMessage());
        chatInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendAiMessage();
            }
        });
        
        this.addQuickPrompts();
    }
    
    addQuickPrompts() {
        const prompts = [
            { icon: '📖', text: '解释当前题目', action: 'explain_current' },
            { icon: '🔗', text: '相关知识点', action: 'related_knowledge' },
            { icon: '💡', text: '举一反三', action: 'similar_questions' },
            { icon: '🎯', text: '分析薄弱知识点', action: 'analyze_weakness' },
            { icon: '📝', text: '生成模拟面试', action: 'generate_mock' },
            { icon: '🎓', text: '学习建议', action: 'study_advice' }
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
                    message = `请详细解释这道面试题：\n\n题目：${this.currentQuestion.question}\n\n参考答案：${this.currentQuestion.answer}`;
                } else {
                    message = '请帮我解释 Android 中 Binder 机制的原理和作用';
                }
                break;
            case 'related_knowledge':
                if (this.currentQuestion) {
                    message = `这道 Android 面试题涉及哪些相关知识点？\n\n题目：${this.currentQuestion.question}`;
                } else {
                    message = 'Android 中有哪些重要的性能优化知识点？';
                }
                break;
            case 'similar_questions':
                if (this.currentQuestion) {
                    message = `请基于这道 Android 面试题，举一反三，提供几道类似的进阶题目：\n\n题目：${this.currentQuestion.question}`;
                } else {
                    message = '请给我出几道关于 Handler 的面试题，难度递增';
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
        const sendBtn = document.getElementById('sendMessage');
        const message = input.value.trim();
        if (!message) return;
        
        // 添加用户消息
        this.addChatMessage('user', message);
        input.value = '';
        
        // 禁用发送按钮
        sendBtn.disabled = true;
        
        // 显示 AI 思考中
        const loadingId = this.showAiLoading();
        
        try {
            const response = await this.callAiApi(message);
            this.removeAiLoading(loadingId);
            this.addChatMessage('ai', response);
        } catch (error) {
            this.removeAiLoading(loadingId);
            this.addChatMessage('error', `抱歉，AI 服务暂时不可用: ${error.message}`);
        } finally {
            sendBtn.disabled = false;
        }
    }

    addChatMessage(role, content) {
        const container = document.getElementById('chatContainer');
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${role}-message`;
        
        const avatar = role === 'ai' ? '🤖' : role === 'error' ? '⚠️' : '👤';
        const isMarkdown = role === 'ai';
        
        if (role === 'error') {
            messageDiv.innerHTML = `
                <div class="chat-avatar">${avatar}</div>
                <div class="chat-content">
                    <div class="chat-text" style="color: var(--accent)">${content}</div>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="chat-avatar">${avatar}</div>
                <div class="chat-content">
                    <div class="chat-text">${isMarkdown ? this.renderMarkdown(content) : this.escapeHtml(content)}</div>
                </div>
            `;
        }
        
        container.appendChild(messageDiv);
        container.scrollTop = container.scrollHeight;
    }

    showAiLoading() {
        const container = document.getElementById('chatContainer');
        const id = 'loading-' + Date.now();
        const loadingDiv = document.createElement('div');
        loadingDiv.id = id;
        loadingDiv.className = 'chat-message ai-message loading';
        loadingDiv.innerHTML = `
            <div class="chat-avatar">🤖</div>
            <div class="chat-content">
                <div class="loading-indicator">
                    <div class="loading-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <span>思考中...</span>
                </div>
            </div>
        `;
        container.appendChild(loadingDiv);
        container.scrollTop = container.scrollHeight;
        return id;
    }

    removeAiLoading(id) {
        const el = document.getElementById(id);
        if (el) el.remove();
    }

    async callAiApi(message, isTest = false) {
        const apiKey = this.aiConfig.apiKey;
        
        if (!apiKey) {
            if (isTest) throw new Error('请先配置 API Key');
            return this.getMockAiResponse(message);
        }
        
        const provider = this.aiConfig.provider;
        let url, body, headers;
        
        if (provider === 'dashscope') {
            url = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation';
            headers = {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            };
            body = {
                model: this.aiConfig.model,
                input: {
                    messages: [
                        {
                            role: 'system',
                            content: '你是 Android 面试专家助手。请用中文回答，提供详细的面试知识点解析、代码示例和学习建议。回答要结构清晰，重点突出。'
                        },
                        { role: 'user', content: message }
                    ]
                },
                parameters: {
                    result_format: 'message',
                    max_tokens: 2000,
                    temperature: this.aiConfig.temperature
                }
            };
        } else if (provider === 'openai') {
            url = 'https://api.openai.com/v1/chat/completions';
            headers = {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            };
            body = {
                model: this.aiConfig.model,
                messages: [
                    {
                        role: 'system',
                        content: '你是 Android 面试专家助手。请用中文回答，提供详细的面试知识点解析、代码示例和学习建议。回答要结构清晰，重点突出。'
                    },
                    { role: 'user', content: message }
                ],
                max_tokens: 2000,
                temperature: this.aiConfig.temperature
            };
        } else {
            throw new Error('不支持的 AI 提供商');
        }
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers,
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                throw new Error(`API 错误: ${response.status}`);
            }

            const data = await response.json();
            
            if (provider === 'dashscope') {
                return data.output?.choices?.[0]?.message?.content || 'AI 没有返回有效回答';
            } else {
                return data.choices?.[0]?.message?.content || 'AI 没有返回有效回答';
            }
        } catch (error) {
            console.error('AI API call failed:', error);
            if (isTest) throw error;
            return this.getMockAiResponse(message);
        }
    }
    
    explainWithAi(question) {
        const message = `请详细解释这道面试题：\n\n题目：${question.question}\n\n参考答案：${question.answer}\n\n请提供深度解析、易错点和相关扩展知识。`;
        document.getElementById('chatInput').value = message;
        this.sendAiMessage();
    }
    
    getMockAiResponse(message) {
        const lowerMsg = message.toLowerCase();
        
        if (lowerMsg.includes('handler')) {
            return `## Handler 机制详解

### 核心作用
1. **线程间通信** - 子线程通过 Handler 向主线程发送消息
2. **异步处理** - 避免在主线程执行耗时操作
3. **消息调度** - 通过 MessageQueue 实现延迟执行

### 核心组件
- **Handler** - 发送和处理消息
- **Looper** - 消息循环
- **MessageQueue** - 消息队列
- **Message** - 消息载体

### 代码示例
\`\`\`kotlin
// 子线程处理耗时任务后更新 UI
thread {
    val result = loadData()
    handler.post {
        textView.text = result
    }
}
\`\`\`

### 面试要点
- Handler 不会阻塞主线程的原因
- 内存泄漏问题及解决方案
- IdleHandler 的使用场景`;
        }
        
        if (lowerMsg.includes('binder')) {
            return `## Binder 机制解析

### 什么是 Binder
Binder 是 Android 特有的跨进程通信（IPC）机制，基于 OpenBinder 实现。

### 核心优势
1. **性能高效** - 只进行一次内存拷贝
2. **安全可靠** - 基于 C/S 架构，支持身份校验
3. **面向对象** - 使用代理模式封装底层细节

### 工作流程
1. Client 获取 Service 的 Binder 引用
2. Client 通过 transact() 发送请求
3. Binder 驱动将数据拷贝到 Server 进程
4. Server 的 onTransact() 处理请求
5. 结果通过 Binder 驱动返回 Client

### 面试常问
- Binder 与 AIDL 的关系
- Binder 驱动的作用
- 如何实现自定义 Binder 服务`;
        }
        
        return `## Android 面试知识点解析

您提出了一个很好的问题！让我为您详细分析：

### 核心概念
这是一个重要的 Android 面试知识点，涉及以下关键内容：

### 学习建议
1. **理解原理** - 深入理解底层机制
2. **动手实践** - 编写 Demo 验证知识点
3. **总结套路** - 形成自己的回答模板

### 相关扩展
- Android 系统架构
- Framework 层源码
- 性能优化技巧

如果您有具体的代码或题目需要分析，欢迎继续提问！`;
    }

    renderMarkdown(text) {
        if (!text) return '';
        
        // Step 1: 先处理 Mermaid 图表，提取并替换为占位符
        let mermaidId = 0;
        const mermaidBlocks = [];
        
        text = text.replace(/```mermaid\s*\n([\s\S]*?)```/g, (match, content) => {
            const id = `mermaid-${mermaidId++}`;
            mermaidBlocks.push({ id, content: content.trim() });
            return `__MERMAID_PLACEHOLDER_${id}__`;
        });
        
        // Step 2: 处理普通代码块（非 Mermaid）
        text = text.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>');
        
        // Step 3: 其他 Markdown 处理
        text = text.replace(/\`([^`]+)\`/g, '<code>$1</code>')
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.+?)\*/g, '<em>$1</em>')
            .replace(/^### (.+)$/gm, '<h4>$1</h4>')
            .replace(/^## (.+)$/gm, '<h3>$1</h3>')
            .replace(/^# (.+)$/gm, '<h2>$1</h2>')
            .replace(/^- (.+)$/gm, '<li>$1</li>')
            .replace(/(<li>.+<\/li>\n?)+/g, '<ul>$&</ul>')
            .replace(/\n/g, '<br>');
        
        // Step 4: 恢复 Mermaid 占位符为实际的 Mermaid div
        mermaidBlocks.forEach(({ id, content }) => {
            text = text.replace(
                `__MERMAID_PLACEHOLDER_${id}__`,
                `<div class="mermaid">${content}</div>`
            );
        });
        
        // Step 5: 渲染 Mermaid 图表
        if (mermaidBlocks.length > 0 && typeof mermaid !== 'undefined') {
            setTimeout(() => {
                try {
                    mermaid.run({
                        querySelector: '.mermaid'
                    });
                } catch (e) {
                    console.error('Mermaid run error:', e);
                }
            }, 100);
        }
        
        return text;
    }

    escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // ==================== Utilities ====================
    handleSearch(keyword) {
        if (keyword.length < 2) return;
        console.log('Search:', keyword);
    }

    openSettings() {
        this.openAiConfigModal();
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
        setTimeout(() => toast.remove(), 3000);
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    window.app = new AndroidInterviewApp();
});
