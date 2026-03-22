/**
 * 学习模式逻辑
 * 功能：闪卡学习、进度跟踪、掌握度标记、AI辅助学习
 */

// 学习状态
const StudyState = {
    currentIndex: 0,
    questions: [],
    mode: 'plan', // plan, category, weakness, random
    showAnswer: false,
    category: null,
    day: 1
};

// 初始化学习页面
function initStudyPage() {
    // 获取学习模式参数
    const params = getStudyParams();
    StudyState.mode = params.mode || 'plan';
    StudyState.category = params.category;
    StudyState.day = params.day || 1;
    
    // 加载题目
    loadQuestions();
    
    // 渲染学习界面
    renderStudyInterface();
    
    // 显示第一题
    showQuestion(0);
}

// 获取学习参数
function getStudyParams() {
    const hash = window.location.hash;
    const params = {};
    
    if (hash.includes('category=')) {
        params.mode = 'category';
        params.category = hash.split('category=')[1].split('&')[0];
    } else if (hash.includes('weakness')) {
        params.mode = 'weakness';
    } else if (hash.includes('day=')) {
        params.mode = 'plan';
        params.day = parseInt(hash.split('day=')[1]) || 1;
    }
    
    return params;
}

// 加载题目
function loadQuestions() {
    let questions = [];
    
    switch(StudyState.mode) {
        case 'plan':
            // 按10天计划加载
            questions = getDayQuestions(StudyState.day);
            break;
        case 'category':
            // 按分类加载
            questions = AppState.questions.filter(q => q.category === StudyState.category);
            break;
        case 'weakness':
            // 加载薄弱项
            questions = getWeaknessQuestions();
            break;
        case 'random':
            // 随机加载
            questions = [...AppState.questions].sort(() => Math.random() - 0.5);
            break;
    }
    
    StudyState.questions = questions;
}

// 获取指定天数的题目
function getDayQuestions(day) {
    // 10天学习计划分布
    const dayPlans = {
        1: { categories: ['android_basic'], range: [0, 100] },
        2: { categories: ['android_basic', 'android_advanced'], range: [100, 200] },
        3: { categories: ['android_advanced'], range: [200, 300] },
        4: { categories: ['kotlin_basic'], range: [300, 400] },
        5: { categories: ['kotlin_advanced'], range: [400, 500] },
        6: { categories: ['java_basic'], range: [500, 600] },
        7: { categories: ['java_advanced'], range: [600, 700] },
        8: { categories: ['design_pattern'], range: [700, 800] },
        9: { categories: ['system_architecture', 'open_source'], range: [800, 900] },
        10: { categories: ['performance', 'tools'], range: [900, 1000] }
    };
    
    const plan = dayPlans[day] || dayPlans[1];
    return AppState.questions.filter(q => plan.categories.includes(q.category));
}

// 获取薄弱项题目
function getWeaknessQuestions() {
    const weakIds = Object.entries(AppState.studyRecords)
        .filter(([id, record]) => record.mastery === 0)
        .map(([id]) => id);
    
    if (weakIds.length === 0) {
        // 如果没有薄弱项，推荐一些未学习的题目
        return AppState.questions.filter(q => !AppState.studyRecords[q.id]).slice(0, 50);
    }
    
    return AppState.questions.filter(q => weakIds.includes(q.id));
}

// 渲染学习界面
function renderStudyInterface() {
    const content = document.getElementById('contentArea');
    
    content.innerHTML = `
        <div class="study-container" id="studyContainer">
            <!-- 进度栏 -->
            <div class="study-progress-bar">
                <div class="progress-info">
                    <span class="progress-text">进度: <strong id="progressCurrent">1</strong> / <strong id="progressTotal">${StudyState.questions.length}</strong></span>
                    <span class="category-tag" id="currentCategory">分类</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" id="progressFill" style="width: 0%"></div>
                </div>
            </div>
            
            <!-- 闪卡区域 -->
            <div class="flashcard-container">
                <div class="flashcard" id="flashcard">
                    <div class="flashcard-inner" id="flashcardInner">
                        <!-- 问题面 -->
                        <div class="flashcard-front">
                            <div class="difficulty-badge" id="difficultyBadge">简单</div>
                            <div class="question-content" id="questionContent">
                                <h3>题目加载中...</h3>
                            </div>
                            <div class="question-tags" id="questionTags"></div>
                        </div>
                        
                        <!-- 答案面 -->
                        <div class="flashcard-back">
                            <div class="answer-content" id="answerContent">
                                <h4>参考答案</h4>
                                <div class="answer-body" id="answerBody"></div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- 翻页提示 -->
                <div class="flip-hint" id="flipHint">
                    <span>👆 点击卡片查看答案</span>
                </div>
            </div>
            
            <!-- 掌握度评估 -->
            <div class="mastery-section" id="masterySection" style="display: none;">
                <h4>掌握程度如何？</h4>
                <div class="mastery-buttons">
                    <button class="mastery-btn mastery-again" data-level="0">
                        <span>😵</span>
                        <span>完全不熟</span>
                    </button>
                    <button class="mastery-btn mastery-hard" data-level="1">
                        <span>🤔</span>
                        <span>有点印象</span>
                    </button>
                    <button class="mastery-btn mastery-good" data-level="2">
                        <span>😊</span>
                        <span>基本掌握</span>
                    </button>
                    <button class="mastery-btn mastery-easy" data-level="3">
                        <span>🤩</span>
                        <span>完全掌握</span>
                    </button>
                </div>
            </div>
            
            <!-- AI 学习助手 -->
            <div class="ai-section" id="aiSection">
                <button class="btn btn-ai" id="aiLearnBtn">
                    <span>🤖</span>
                    <span>AI 深入学习</span>
                </button>
                <div class="ai-chat" id="aiChat" style="display: none;">
                    <div class="ai-messages" id="aiMessages"></div>
                    <div class="ai-input-area">
                        <input type="text" class="ai-input" id="aiInput" placeholder="输入你的问题...">
                        <button class="btn btn-primary btn-sm" id="aiSendBtn">发送</button>
                    </div>
                </div>
            </div>
            
            <!-- 导航按钮 -->
            <div class="study-nav">
                <button class="btn btn-secondary" id="prevBtn" disabled>
                    <span>⬅️</span> 上一题
                </button>
                <div class="nav-actions">
                    <button class="btn btn-outline btn-sm" id="bookmarkBtn">
                        <span>🔖</span> 收藏
                    </button>
                    <button class="btn btn-outline btn-sm" id="shareBtn">
                        <span>📤</span> 分享
                    </button>
                </div>
                <button class="btn btn-primary" id="nextBtn">
                    下一题 <span>➡️</span>
                </button>
            </div>
        </div>
    `;
    
    // 绑定事件
    document.getElementById('flashcard').addEventListener('click', flipCard);
    document.getElementById('