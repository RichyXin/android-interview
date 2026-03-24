/**
 * 配置文件 - 请在本地创建 config.local.js 覆盖这些设置
 * config.local.js 不会被提交到 Git
 */

const config = {
    // AI API 配置
    ai: {
        // 阿里云百炼 API Key
        // 请替换为你的实际 API Key
        apiKey: localStorage.getItem('ai_api_key') || '',
        
        // 默认模型
        model: 'qwen-turbo',
        
        // API 端点
        endpoint: 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation'
    },
    
    // 应用配置
    app: {
        name: 'Android 面试题大全',
        version: '1.2.0',
        description: '智能学习系统 - 590+ 面试题'
    },
    
    // 学习配置
    study: {
        dailyTarget: 20,
        totalDays: 16
    }
};

// 尝试加载本地配置（如果存在）
try {
    if (typeof window !== 'undefined' && window.localConfig) {
        Object.assign(config, window.localConfig);
    }
} catch (e) {
    console.log('No local config found');
}

// 导出配置
if (typeof module !== 'undefined' && module.exports) {
    module.exports = config;
} else if (typeof window !== 'undefined') {
    window.appConfig = config;
}
