/**
 * IndexedDB Database Manager
 */
class DatabaseManager {
    constructor() {
        this.db = null;
        this.DB_NAME = 'AndroidInterviewDB';
        this.DB_VERSION = 2;
    }

    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);
            
            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                this.db = request.result;
                resolve(this.db);
            };
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                
                if (!db.objectStoreNames.contains('progress')) {
                    const progressStore = db.createObjectStore('progress', { keyPath: 'questionId' });
                    progressStore.createIndex('status', 'status', { unique: false });
                    progressStore.createIndex('day', 'day', { unique: false });
                }
                
                if (!db.objectStoreNames.contains('bookmarks')) {
                    db.createObjectStore('bookmarks', { keyPath: 'questionId' });
                }
                
                if (!db.objectStoreNames.contains('stats')) {
                    db.createObjectStore('stats', { keyPath: 'key' });
                }
                
                if (!db.objectStoreNames.contains('cards')) {
                    const cardStore = db.createObjectStore('cards', { keyPath: 'id' });
                    cardStore.createIndex('status', 'status', { unique: false });
                }
            };
        });
    }

    async updateProgress(questionId, status, data = {}) {
        if (!this.db) return;
        const transaction = this.db.transaction(['progress'], 'readwrite');
        const store = transaction.objectStore('progress');
        const record = { questionId, status, timestamp: Date.now(), ...data };
        return new Promise((resolve, reject) => {
            const request = store.put(record);
            request.onsuccess = () => resolve(record);
            request.onerror = () => reject(request.error);
        });
    }

    async getProgress(questionId) {
        if (!this.db) return null;
        const transaction = this.db.transaction(['progress'], 'readonly');
        const store = transaction.objectStore('progress');
        return new Promise((resolve, reject) => {
            const request = store.get(questionId);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async getAllProgress() {
        if (!this.db) return [];
        const transaction = this.db.transaction(['progress'], 'readonly');
        const store = transaction.objectStore('progress');
        return new Promise((resolve, reject) => {
            const request = store.getAll();
            request.onsuccess = () => resolve(request.result || []);
            request.onerror = () => reject(request.error);
        });
    }

    async countByStatus() {
        const all = await this.getAllProgress();
        const counts = { mastered: 0, review: 0, weak: 0, unanswered: 0 };
        all.forEach(p => { if (counts[p.status] !== undefined) counts[p.status]++; });
        return counts;
    }

    async saveCardProgress(progress) {
        if (!this.db) return;
        
        if (!this.db.objectStoreNames.contains('cards')) {
            console.warn('Cards store not found');
            return;
        }
        
        const transaction = this.db.transaction(['cards'], 'readwrite');
        const store = transaction.objectStore('cards');
        return new Promise((resolve, reject) => {
            const request = store.put(progress);
            request.onsuccess = () => resolve(progress);
            request.onerror = () => reject(request.error);
        });
    }

    async getCardProgress() {
        if (!this.db) return [];
        
        if (!this.db.objectStoreNames.contains('cards')) {
            return [];
        }
        
        const transaction = this.db.transaction(['cards'], 'readonly');
        const store = transaction.objectStore('cards');
        return new Promise((resolve, reject) => {
            const request = store.getAll();
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }
}
