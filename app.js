// ============================================
// QANDA Image Upload System with Mixpanel Analytics
// Design System v4.0 | Korean Language
// ============================================

// Configuration (loaded from config.js)
// CONFIG object is available globally

// Mixpanel Analytics Module
const analytics = {
    initialized: false,
    
    init: () => {
        try {
            if (typeof mixpanel !== 'undefined' && CONFIG.MIXPANEL_TOKEN) {
                mixpanel.init(CONFIG.MIXPANEL_TOKEN, {
                    debug: false,
                    track_pageview: true,
                    persistence: 'localStorage',
                    api_host: 'https://api.mixpanel.com'
                });
                
                // Set super properties
                mixpanel.register({
                    'App Version': CONFIG.APP_VERSION,
                    'App Commit': CONFIG.APP_COMMIT,
                    'App Language': CONFIG.APP_LANGUAGE,
                    'Design System': 'QANDA v4.0',
                    'Platform': 'Web'
                });
                
                analytics.initialized = true;
                console.log('📊 Mixpanel initialized successfully');
                
                // Track page view
                analytics.track('Page Viewed', {
                    'Page': 'Image Upload',
                    'URL': window.location.href
                });
            }
        } catch (error) {
            console.warn('Mixpanel initialization failed:', error);
        }
    },
    
    track: (eventName, properties = {}) => {
        if (analytics.initialized && typeof mixpanel !== 'undefined') {
            try {
                mixpanel.track(eventName, {
                    ...properties,
                    'Timestamp': new Date().toISOString()
                });
                console.log('📊 Event tracked:', eventName, properties);
            } catch (error) {
                console.warn('Mixpanel track failed:', error);
            }
        }
    },
    
    identify: (userId) => {
        if (analytics.initialized && typeof mixpanel !== 'undefined') {
            try {
                mixpanel.identify(userId);
                console.log('👤 User identified:', userId);
            } catch (error) {
                console.warn('Mixpanel identify failed:', error);
            }
        }
    },
    
    setPeople: (properties) => {
        if (analytics.initialized && typeof mixpanel !== 'undefined') {
            try {
                mixpanel.people.set(properties);
            } catch (error) {
                console.warn('Mixpanel people.set failed:', error);
            }
        }
    }
};

// State
const state = {
    selectedFile: null,
    uploadStartTime: null,
    dragTracked: false
};

// DOM Elements
const elements = {
    emailInput: document.getElementById('emailInput'),
    uploadArea: document.getElementById('uploadArea'),
    fileInput: document.getElementById('fileInput'),
    previewContainer: document.getElementById('previewContainer'),
    previewImage: document.getElementById('previewImage'),
    fileName: document.getElementById('fileName'),
    submitBtn: document.getElementById('submitBtn'),
    message: document.getElementById('message')
};

// Validation
const validators = {
    isValidEmail: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    
    isValidImage: (file) => {
        if (!file.type.startsWith('image/')) {
            return { valid: false, error: '이미지 파일을 선택해주세요' };
        }
        if (file.size > CONFIG.MAX_FILE_SIZE) {
            return { valid: false, error: '파일 크기는 5MB 이하여야 합니다' };
        }
        return { valid: true };
    }
};

// UI Utilities
const ui = {
    showMessage: (text, type) => {
        elements.message.textContent = text;
        elements.message.className = `message ${type}`;
        elements.message.style.display = text ? 'block' : 'none';
    },
    
    updateSubmitButton: () => {
        const email = elements.emailInput.value.trim();
        const isValidEmail = validators.isValidEmail(email);
        elements.submitBtn.disabled = !(state.selectedFile && isValidEmail);
    },
    
    setUploading: (isUploading) => {
        if (isUploading) {
            elements.submitBtn.disabled = true;
            elements.submitBtn.innerHTML = '<span class="loader"></span> 업로드 중...';
        } else {
            elements.submitBtn.disabled = false;
            elements.submitBtn.textContent = '제출';
        }
    },
    
    resetForm: () => {
        elements.emailInput.value = '';
        state.selectedFile = null;
        elements.fileInput.value = '';
        elements.previewContainer.style.display = 'none';
        elements.submitBtn.textContent = '제출';
        ui.updateSubmitButton();
    },
    
    showPreview: (file) => {
        elements.fileName.textContent = file.name;
        const reader = new FileReader();
        reader.onload = (e) => {
            elements.previewImage.src = e.target.result;
            elements.previewContainer.style.display = 'block';
            ui.updateSubmitButton();
        };
        reader.readAsDataURL(file);
    }
};

// File Handling
const fileHandler = {
    convertToBase64: (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const base64 = reader.result.split(',')[1];
                resolve(base64);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    },
    
    handleFileSelect: (file) => {
        const validation = validators.isValidImage(file);
        if (!validation.valid) {
            ui.showMessage(validation.error, 'error');
            
            // Track validation error
            analytics.track('File Validation Failed', {
                'Error': validation.error,
                'File Size': file.size,
                'File Type': file.type
            });
            return;
        }
        
        state.selectedFile = file;
        ui.showPreview(file);
        ui.showMessage('', '');
        
        // Track successful file selection
        analytics.track('File Selected', {
            'File Name': file.name,
            'File Size': file.size,
            'File Type': file.type,
            'File Size MB': (file.size / (1024 * 1024)).toFixed(2)
        });
    }
};

// API
const api = {
    uploadImage: async (email, file) => {
        const base64 = await fileHandler.convertToBase64(file);
        
        const data = {
            email: email,
            fileName: file.name,
            fileData: base64,
            mimeType: file.type
        };
        
        const response = await fetch(CONFIG.SCRIPT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain',
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.text();
        console.log('Response:', result);
        
        // Parse response
        try {
            const jsonResult = JSON.parse(result);
            if (!jsonResult.success) {
                throw new Error(jsonResult.error || 'Unknown error');
            }
            return jsonResult;
        } catch (e) {
            if (!response.ok) {
                throw new Error(`${response.status} - ${result}`);
            }
            return { success: true };
        }
    }
};

// Event Handlers
const handlers = {
    handleSubmit: async () => {
        const email = elements.emailInput.value.trim();
        
        if (!email || !state.selectedFile) {
            ui.showMessage('이메일과 이미지를 모두 입력해주세요', 'error');
            
            // Track form validation error
            analytics.track('Form Validation Failed', {
                'Has Email': !!email,
                'Has File': !!state.selectedFile
            });
            return;
        }
        
        // Track upload start
        state.uploadStartTime = Date.now();
        analytics.track('Upload Started', {
            'Email': email,
            'File Name': state.selectedFile.name,
            'File Size': state.selectedFile.size,
            'File Type': state.selectedFile.type
        });
        
        // Identify user by email
        analytics.identify(email);
        analytics.setPeople({
            '$email': email,
            '$last_seen': new Date().toISOString(),
            'Last Upload': new Date().toISOString()
        });
        
        ui.setUploading(true);
        
        try {
            await api.uploadImage(email, state.selectedFile);
            const uploadDuration = Date.now() - state.uploadStartTime;
            
            ui.showMessage('✅ 이미지가 성공적으로 업로드되었습니다!', 'success');
            
            // Track successful upload
            analytics.track('Upload Completed', {
                'Email': email,
                'File Name': state.selectedFile.name,
                'File Size': state.selectedFile.size,
                'File Type': state.selectedFile.type,
                'Duration (ms)': uploadDuration,
                'Duration (s)': (uploadDuration / 1000).toFixed(2),
                'Success': true
            });
            
            ui.resetForm();
        } catch (error) {
            const uploadDuration = Date.now() - state.uploadStartTime;
            console.error('Upload error:', error);
            ui.showMessage(`오류: ${error.message}`, 'error');
            
            // Track upload error
            analytics.track('Upload Failed', {
                'Email': email,
                'File Name': state.selectedFile ? state.selectedFile.name : 'unknown',
                'Error Message': error.message,
                'Duration (ms)': uploadDuration,
                'Duration (s)': (uploadDuration / 1000).toFixed(2),
                'Success': false
            });
            
            ui.setUploading(false);
        }
    },
    
    handleDragOver: (e) => {
        e.preventDefault();
        elements.uploadArea.classList.add('dragover');
        
        // Track drag over (only once per session)
        if (!state.dragTracked) {
            analytics.track('File Drag Started', {
                'Method': 'Drag and Drop'
            });
            state.dragTracked = true;
        }
    },
    
    handleDragLeave: () => {
        elements.uploadArea.classList.remove('dragover');
    },
    
    handleDrop: (e) => {
        e.preventDefault();
        elements.uploadArea.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            analytics.track('File Dropped', {
                'Method': 'Drag and Drop',
                'File Count': files.length
            });
            fileHandler.handleFileSelect(files[0]);
        }
    }
};

// Initialize
function init() {
    // Initialize Mixpanel
    analytics.init();
    
    // Upload area events
    elements.uploadArea.addEventListener('click', () => {
        elements.fileInput.click();
        analytics.track('Upload Area Clicked', {
            'Method': 'Click'
        });
    });
    elements.uploadArea.addEventListener('dragover', handlers.handleDragOver);
    elements.uploadArea.addEventListener('dragleave', handlers.handleDragLeave);
    elements.uploadArea.addEventListener('drop', handlers.handleDrop);
    
    // Keyboard accessibility for upload area (Design System - Accessibility)
    elements.uploadArea.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            elements.fileInput.click();
            analytics.track('Upload Area Activated', {
                'Method': 'Keyboard',
                'Key': e.key
            });
        }
    });
    
    // File input
    elements.fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            fileHandler.handleFileSelect(e.target.files[0]);
        }
    });
    
    // Email input
    elements.emailInput.addEventListener('input', ui.updateSubmitButton);
    
    // Track email input focus
    elements.emailInput.addEventListener('focus', () => {
        analytics.track('Email Input Focused');
    });
    
    // Submit button (can also be triggered by Enter in email field)
    elements.submitBtn.addEventListener('click', handlers.handleSubmit);
    elements.emailInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !elements.submitBtn.disabled) {
            handlers.handleSubmit();
        }
    });
    
    // Log design system version
    console.log('🎨 Design System v4.0 loaded');
    console.log('📋 Commit: 829fcf5980c867e5d6d75d068f6c50c2dc9bf983');
    console.log('🌏 Language: Korean (한국어)');
    console.log('📊 Mixpanel Analytics: Enabled');
}

// Start the app
init();

