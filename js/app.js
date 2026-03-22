/**
 * Android 面试宝典 - 主应用逻辑
 * 功能：学习管理、进度追踪、薄弱项分析、AI学习助手
 */

// 应用状态
const AppState = {
    currentPage: 'dashboard',
    currentQuestion: 0,
    studyMode: 'plan', // plan, category, weakness, random
    questions: [],
    studyRecords: {}, // questionId -> { mastery, lastReview, reviewCount }
    settings: {
        dailyGoal: 100,
        reminderTime: '09:00',
        aiAssistant: true,
        darkMode: true
    },
    userStats: {
        totalLearned: 0,
        totalMastered: 0,
        totalWeak: 0,
        streakDays: 1,
        lastStudyDate: null
    }
};

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    loadData();
    setupEventListeners();
    updateDashboard();
    checkDailyStreak();
}

// 加载数据
function loadData() {
    // 从 localStorage 加载学习记录
    const saved = localStorage.getItem('android_interview_records');
    if (saved) {
        AppState.studyRecords = JSON.parse(saved);
    }
    
    const savedStats = localStorage.getItem('android_interview_stats');
    if (savedStats) {
        AppState.userStats = JSON.parse(savedStats);
    }
    
    // 加载问题数据（从 questions.js）
    if (typeof questionsDB !== 'undefined') {
        AppState.questions = questionsDB;
    }
    
    // 计算统计数据
    calculateStats();
}

// 保存数据
function saveData() {
    localStorage.setItem('android_interview_records', JSON.stringify(AppState.studyRecords));
    localStorage.setItem('android_interview_stats', JSON.stringify(AppState.userStats));
}

// 计算统计数据
function calculateStats() {
    let learned = 0, mastered = 0, weak = 0;
    
    for (const [id, record] of Object.entries(AppState.studyRecords)) {
        learned++;
        if (record.mastery === 2) mastered++;
        if (record.mastery === 0) weak++;
    }
    
    AppState.userStats.totalLearned = learned;
    AppState.userStats.totalMastered = mastered;
    AppState.userStats.totalWeak = weak;
}

// 检查连续学习天数
function checkDailyStreak() {
    const today = new Date().toDateString();
    const lastDate = AppState.userStats.lastStudyDate;
    
    if (lastDate) {
        const last = new Date(lastDate);
        const diff = (new Date() - last) / (1000 * 60 * 60 * 24);
        
        if (diff >= 2) {
            AppState.userStats.streakDays = 1; // 断开，重新开始
        }
    }
    
    saveData();
}

// 设置事件监听
function setupEventListeners() {
    // 导航菜单
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const page = item.dataset.page;
            navigateTo(page);
        });
    });
    
    // 菜单折叠
    document.getElementById('menuToggle')?.addEventListener('click', toggleSidebar);
    
    // 继续学习按钮
    document.getElementById('continueStudy')?.addEventListener('click', () => {
        navigateTo('study');
    });
    
    // 查看计划按钮
    document.getElementById('viewPlan')?.addEventListener('click', () => {
        navigateTo('plan');
    });
    
    // 薄弱项训练按钮
    document.getElementById('trainWeakness')?.addEventListener('click', () => {
        navigateTo('weakness');
    });
    
    // 同步按钮
    document.getElementById('syncBtn')?.addEventListener('click', syncData);
    
    // 键盘快捷键
    document.addEventListener('keydown', handleKeyboard);
}

// 导航到指定页面
function navigateTo(page) {
    // 更新导航状态
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.page === page);
    });
    
    // 更新页面显示
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(page + 'Page')?.classList.add('active');
    
    // 更新标题
    const titles = {
        dashboard: '学习概览',
        study: '开始学习',
        plan: '10天学习计划',
        weakness: '薄弱项训练',
        categories: '分类浏览',
        statistics: '数据统计',
        settings: '设置'
    };
    document.getElementById('pageTitle').textContent = titles[page] || 'Android 面试宝典';
    
    AppState.currentPage = page;
    
    // 页面特定初始化
    switch(page) {
        case 'study':
            initStudyPage();
            break;
        case 'plan':
            initPlanPage();
            break;
        case 'weakness':
            initWeaknessPage();
            break;
        case 'categories':
            initCategoriesPage();
            break;
        case 'statistics':
            initStatisticsPage();
            break;
    }
}

// 更新仪表盘
function updateDashboard() {
    // 总体进度
    const total = AppState.questions.length;
    const learned = AppState.userStats.totalLearned;
    const percent = total > 0 ? Math.round((learned / total) * 100) : 0;
    
    document.getElementById('overallPercent').textContent = percent + '%';
    document.getElementById('overallProgress').setAttribute('stroke-dasharray', `${percent}, 100`);
    
    // 统计数据
    document.getElementById('totalLearned').textContent = AppState.userStats.totalLearned;
    document.getElementById('totalMastered').textContent = AppState.userStats.totalMastered;
    document.getElementById('totalWeak').textContent = AppState.userStats.totalWeak;
    document.getElementById('streakDays').textContent = AppState.userStats.streakDays;
    
    // 今日任务
    const todayCount = Math.min(100, total - learned);
    document.getElementById('todayTasks').textContent = `0/${todayCount}`;
    
    // 更新分类进度
    updateCategoryProgress();
    
    // 更新薄弱项提醒
    updateWeaknessCard();
}

// 更新分类进度
function updateCategoryProgress() {
    const container = document.getElementById('categoryProgress');
    if (!container) return;
    
    const categories = {};
    AppState.questions.forEach(q => {
        if (!categories[q.category]) {
            categories[q.category] = { total: 0, learned: 0 };
        }
        categories[q.category].total++;
        if (AppState.studyRecords[q.id]) {
            categories[q.category].learned++;
        }
    });
    
    container.innerHTML = Object.entries(categories).map(([cat, stats]) => {
        const percent = Math.round((stats.learned / stats.total) * 100);
        const catInfo = questionCategories[cat];
        return `
            <div class="category-item">
                <div class="category-icon">${catInfo?.icon || '📚'}</div>
                <div class="category-info">
                    <div class="category-name">${catInfo?.name || cat}</div>
                    <div class="category-desc">${stats.learned}/${stats.total} 题</div>
                </div>
                <div class="category-bar">
                    <div class="category-bar-fill" style="width: ${percent}%"></div>
                </div>
                <span class="category-percent">${percent}%</span>
            </div>
        `;
    }).join('');
}

// 更新薄弱项卡片
function updateWeaknessCard() {
    const weakCount = AppState.userStats.totalWeak;
    document.getElementById('weakCount').textContent = weakCount;
    
    const summary = document.getElementById('weaknessSummary');
    if (weakCount === 0) {
        summary.textContent = '暂无薄弱项，继续保持！';
    } else {
        summary.textContent = `你有 ${weakCount} 个薄弱知识点需要加强`;
    }
}

// 切换侧边栏
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('collapsed');
}

// 同步数据（预留接口）
function syncData() {
    // TODO: 实现与服务器同步
    // 现在仅保存到 localStorage
    saveData();
    
    const btn = document.getElementById('syncBtn');
    btn.innerHTML = '<span>✅</span> 已同步';
    setTimeout(() => {
        btn.innerHTML = '<span>🔄</span> 同步记录';
    }, 2000);
}

// 键盘快捷键
function handleKeyboard(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    
    switch(e.key) {
        case '1':
            navigateTo('