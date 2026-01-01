// Authentication System for Auto Nest Admin
class AuthSystem {
    constructor() {
        this.SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours
        this.INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutes
        this.init();
    }

    init() {
        this.checkPageAndRedirect();
        this.setupEventListeners();
    }

    // Check current page and redirect if needed
    checkPageAndRedirect() {
        const currentPage = window.location.pathname;
        const isLoggedIn = this.isLoggedIn();

        console.log('Current Page:', currentPage);
        console.log('Is Logged In:', isLoggedIn);

        // If on login page and already logged in, redirect to admin
        if (this.isLoginPage() && isLoggedIn) {
            console.log('Already logged in, redirecting to admin...');
            setTimeout(() => {
                window.location.href = 'admin.html';
            }, 100);
            return;
        }

        // Initialize appropriate page
        if (this.isLoginPage() && !isLoggedIn) {
            this.initLoginPage();
        } else if (this.isAdminPage() && isLoggedIn) {
            this.initAdminPage();
        }
    }

    // Check if current page is login page
    isLoginPage() {
        const path = window.location.pathname;
        return path.includes('login.html') || 
               path.endsWith('/login') || 
               document.getElementById('loginForm') !== null;
    }

    // Check if current page is admin page
    isAdminPage() {
        const path = window.location.pathname;
        return path.includes('admin.html') || 
               path.includes('admin/') ||
               document.querySelector('.admin-wrapper') !== null ||
               document.querySelector('.admin-sidebar') !== null;
    }

    // Show redirect message before going to login
    showLoginRedirectMessage() {
        // Create overlay message
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(26, 26, 46, 0.95);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: white;
            z-index: 9999;
            font-family: 'Segoe UI', sans-serif;
        `;

        const message = document.createElement('div');
        message.style.cssText = `
            text-align: center;
            padding: 40px;
            max-width: 500px;
        `;

        const icon = document.createElement('div');
        icon.innerHTML = '🔒';
        icon.style.cssText = `
            font-size: 60px;
            margin-bottom: 20px;
        `;

        const heading = document.createElement('h2');
        heading.textContent = 'Session Expired';
        heading.style.cssText = `
            font-size: 28px;
            margin-bottom: 15px;
            color: #e94560;
        `;

        const text = document.createElement('p');
        text.textContent = 'Your session has expired or you need to log in. Redirecting to login page...';
        text.style.cssText = `
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 20px;
            opacity: 0.9;
        `;

        const spinner = document.createElement('div');
        spinner.style.cssText = `
            width: 40px;
            height: 40px;
            border: 4px solid rgba(233, 69, 96, 0.3);
            border-radius: 50%;
            border-top-color: #e94560;
            animation: spin 1s linear infinite;
            margin: 20px auto;
        `;

        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);

        message.appendChild(icon);
        message.appendChild(heading);
        message.appendChild(text);
        message.appendChild(spinner);
        overlay.appendChild(message);
        document.body.appendChild(overlay);

        // Remove overlay after redirect
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        }, 1500);
    }

    // Initialize login page
    initLoginPage() {
        const loginForm = document.getElementById('loginForm');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const togglePassword = document.getElementById('togglePassword');
        const forgotLink = document.getElementById('forgotPassword');
        const forgotModal = document.getElementById('forgotModal');

        // Focus on email input
        if (emailInput) {
            emailInput.focus();
        }

        // Toggle password visibility
        if (togglePassword && passwordInput) {
            togglePassword.addEventListener('click', () => {
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
                
                const eyeIcon = togglePassword.querySelector('.eye-icon');
                if (eyeIcon) {
                    if (type === 'text') {
                        eyeIcon.innerHTML = '<path fill="#666" d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>';
                    } else {
                        eyeIcon.innerHTML = '<path fill="#666" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>';
                    }
                }
            });
        }

        // Handle login form submission
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Handle forgot password
        if (forgotLink && forgotModal) {
            forgotLink.addEventListener('click', (e) => {
                e.preventDefault();
                forgotModal.style.display = 'flex';
            });

            // Close modal handlers
            const closeButtons = document.querySelectorAll('.close-modal, .btn-secondary');
            closeButtons.forEach(button => {
                button.addEventListener('click', () => {
                    forgotModal.style.display = 'none';
                });
            });

            // Close on outside click
            forgotModal.addEventListener('click', (e) => {
                if (e.target === forgotModal) {
                    forgotModal.style.display = 'none';
                }
            });
        }

        // Auto-check for existing session (in case of back button)
        if (this.isLoggedIn()) {
            console.log('Session found, redirecting...');
            setTimeout(() => {
                window.location.href = 'admin.html';
            }, 500);
        }
    }

    // Handle login form submission
    async handleLogin(e) {
        e.preventDefault();
        
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const loginBtn = document.getElementById('loginBtn');
        const errorAlert = document.getElementById('errorAlert');
        const errorMessage = document.getElementById('errorMessage');
        
        if (!emailInput || !passwordInput) return;

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        // Reset errors
        this.resetErrors();
        if (errorAlert) errorAlert.style.display = 'none';

        // Validate inputs
        if (!this.validateLoginInputs(email, password)) {
            return;
        }

        // Show loading state
        if (loginBtn) {
            const originalText = loginBtn.querySelector('.btn-text').textContent;
            loginBtn.querySelector('.btn-text').textContent = 'Authenticating...';
            loginBtn.disabled = true;

            try {
                // Simulate API call delay
                await this.simulateApiCall();
                
                // Demo credentials check (replace with real API call)
                if (email === 'admin@autonest.com' && password === 'admin123') {
                    // Store login data
                    this.storeLoginData({
                        email: email,
                        name: 'Admin User',
                        role: 'admin',
                        loginTime: new Date().toISOString(),
                        lastActivity: Date.now(),
                        sessionId: this.generateSessionId()
                    });

                    // Show success state
                    loginBtn.querySelector('.btn-text').textContent = 'Login Successful!';
                    
                    // Redirect to admin page
                    setTimeout(() => {
                        window.location.href = 'admin.html';
                    }, 1000);
                } else {
                    throw new Error('Invalid credentials');
                }
            } catch (error) {
                // Show error
                if (errorMessage) {
                    errorMessage.textContent = error.message || 'Invalid credentials. Please try again.';
                }
                if (errorAlert) {
                    errorAlert.style.display = 'flex';
                    errorAlert.style.animation = 'none';
                    setTimeout(() => {
                        errorAlert.style.animation = 'shake 0.5s';
                    }, 10);
                }

                // Reset button
                loginBtn.querySelector('.btn-text').textContent = originalText;
                loginBtn.disabled = false;
            }
        }
    }

    // Validate login inputs
    validateLoginInputs(email, password) {
        let isValid = true;
        
        // Email validation
        if (!email) {
            this.showError('email-error', 'Email is required');
            isValid = false;
        } else if (!this.isValidEmail(email)) {
            this.showError('email-error', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Password validation
        if (!password) {
            this.showError('password-error', 'Password is required');
            isValid = false;
        } else if (password.length < 6) {
            this.showError('password-error', 'Password must be at least 6 characters');
            isValid = false;
        }
        
        return isValid;
    }

    // Initialize admin page
    initAdminPage() {
        if (!this.isLoggedIn()) {
            this.redirectToLogin();
            return;
        }

        this.updateAdminProfile();
        this.setupLogout();
        this.setupSessionMonitoring();
        this.updateLastActivity();
    }

    // Store login data in localStorage
    storeLoginData(userData) {
        const authData = {
            ...userData,
            expiresAt: Date.now() + this.SESSION_DURATION
        };
        
        localStorage.setItem('auth_token', this.generateAuthToken());
        localStorage.setItem('user_data', JSON.stringify(authData));
        localStorage.setItem('last_activity', Date.now().toString());
        sessionStorage.setItem('is_authenticated', 'true');
        
        console.log('Login data stored:', authData);
    }

    // Generate auth token
    generateAuthToken() {
        return 'auth_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Generate session ID
    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Check if user is logged in
    isLoggedIn() {
        const authToken = localStorage.getItem('auth_token');
        const userData = localStorage.getItem('user_data');
        
        console.log('Checking login status...');
        console.log('Auth Token:', !!authToken);
        console.log('User Data:', !!userData);
        
        if (!authToken || !userData) {
            console.log('No auth token or user data found');
            return false;
        }
        
        try {
            const user = JSON.parse(userData);
            
            // Check session expiration
            if (user.expiresAt && Date.now() > user.expiresAt) {
                console.log('Session expired');
                this.logout();
                return false;
            }
            
            // Check inactivity timeout
            const lastActivity = localStorage.getItem('last_activity');
            if (lastActivity && (Date.now() - parseInt(lastActivity)) > this.INACTIVITY_TIMEOUT) {
                console.log('Inactivity timeout');
                this.logout();
                return false;
            }
            
            console.log('User is logged in:', user.email);
            return true;
        } catch (e) {
            console.error('Error parsing user data:', e);
            return false;
        }
    }

    // Get current user data
    getCurrentUser() {
        const userData = localStorage.getItem('user_data');
        if (!userData) return null;
        
        try {
            return JSON.parse(userData);
        } catch (e) {
            return null;
        }
    }

    // Update admin profile with user data
    updateAdminProfile() {
        const user = this.getCurrentUser();
        if (!user) return;
        
        // Update admin name input
        const adminNameInput = document.getElementById('admin-name');
        if (adminNameInput) {
            adminNameInput.value = user.name || 'Admin User';
        }
        
        // Update admin email input
        const adminEmailInput = document.getElementById('admin-email');
        if (adminEmailInput) {
            adminEmailInput.value = user.email || 'admin@autonest.com';
        }
        
        // Update admin profile image preview
        this.updateProfileImage(user);
        
        // Update last login display
        this.updateLastLoginDisplay(user);
    }

    // Update profile image with initials
    updateProfileImage(user) {
        const profileImg = document.getElementById('profile-img-preview');
        if (!profileImg) return;
        
        // Check if we already have an image or it's the default icon
        if (profileImg.src.includes('user-solid.svg') || profileImg.src.includes('data:image/svg')) {
            const initials = this.getInitials(user.name || 'Admin User');
            this.createInitialsAvatar(profileImg, initials);
        }
    }

    // Get initials from name
    getInitials(name) {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
    }

    // Create initials avatar
    createInitialsAvatar(element, initials) {
        const canvas = document.createElement('canvas');
        canvas.width = 100;
        canvas.height = 100;
        const ctx = canvas.getContext('2d');
        
        // Background color based on initials
        const colors = ['#e94560', '#0f3460', '#1a1a2e', '#4CAF50', '#FF9800'];
        const colorIndex = initials.charCodeAt(0) % colors.length;
        ctx.fillStyle = colors[colorIndex];
        ctx.fillRect(0, 0, 100, 100);
        
        // Draw initials
        ctx.fillStyle = 'white';
        ctx.font = 'bold 40px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(initials, 50, 50);
        
        element.src = canvas.toDataURL();
    }

    // Update last login display
    updateLastLoginDisplay(user) {
        if (!user || !user.loginTime) return;
        
        const loginTime = new Date(user.loginTime);
        const now = new Date();
        const diffMs = now - loginTime;
        const diffMins = Math.floor(diffMs / 60000);
        
        let timeString;
        if (diffMins < 1) {
            timeString = 'Just now';
        } else if (diffMins < 60) {
            timeString = `${diffMins} minute${diffMins === 1 ? '' : 's'} ago`;
        } else if (diffMins < 1440) {
            const hours = Math.floor(diffMins / 60);
            timeString = `${hours} hour${hours === 1 ? '' : 's'} ago`;
        } else {
            const days = Math.floor(diffMins / 1440);
            timeString = `${days} day${days === 1 ? '' : 's'} ago`;
        }
        
        // You could display this in a tooltip or status bar
        console.log(`Last login: ${timeString}`);
    }

    // Setup logout functionality
    setupLogout() {
        // Find all logout buttons
        const logoutSelectors = [
            '[data-section="logout"]',
            '.btn-logout-account',
            '.logout-link',
            '.nav-link[data-section="logout"]'
        ];
        
        logoutSelectors.forEach(selector => {
            const buttons = document.querySelectorAll(selector);
            buttons.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.logout();
                });
            });
        });
    }

    // Setup session monitoring
    setupSessionMonitoring() {
        // Monitor user activity
        const activityEvents = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
        
        const updateActivity = () => {
            localStorage.setItem('last_activity', Date.now().toString());
        };
        
        activityEvents.forEach(event => {
            document.addEventListener(event, updateActivity, { passive: true });
        });
        
        // Check session every minute
        setInterval(() => {
            if (!this.isLoggedIn()) {
                this.redirectToLogin();
            }
        }, 60000);
    }

    // Update last activity timestamp
    updateLastActivity() {
        localStorage.setItem('last_activity', Date.now().toString());
    }

    // Logout function
    logout() {
        // Show logout confirmation
        if (confirm('Are you sure you want to log out?')) {
            this.performLogout();
        }
    }

    // Perform actual logout
    performLogout() {
        // Clear all authentication data
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
        localStorage.removeItem('last_activity');
        sessionStorage.removeItem('is_authenticated');
        
        // Clear any session-specific data
        sessionStorage.clear();
        
        // Redirect to login page
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 300);
    }

    // Redirect to login page
    redirectToLogin() {
        // Don't redirect if already on login page
        if (this.isLoginPage()) return;
        
        // Store intended destination for redirect back after login
        sessionStorage.setItem('redirect_after_login', window.location.href);
        
        // Redirect to login
        window.location.href = 'login.html';
    }

    // Simulate API call delay
    simulateApiCall() {
        return new Promise(resolve => {
            setTimeout(resolve, 1000);
        });
    }

    // Validate email format
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Show error message
    showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    // Reset all error messages
    resetErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.textContent = '';
            element.style.display = 'none';
        });
    }

    // Setup event listeners
    setupEventListeners() {
        // Input validation on blur
        document.addEventListener('blur', (e) => {
            if (e.target.matches('input[type="email"]')) {
                this.validateEmailInput(e.target);
            } else if (e.target.matches('input[type="password"]')) {
                this.validatePasswordInput(e.target);
            }
        }, true);

        // Clear errors on input
        document.addEventListener('input', (e) => {
            if (e.target.matches('input[type="email"], input[type="password"]')) {
                this.clearInputError(e.target);
            }
        }, true);
    }

    // Validate email input
    validateEmailInput(input) {
        const value = input.value.trim();
        const errorId = input.id + '-error';
        
        if (value && !this.isValidEmail(value)) {
            this.showError(errorId, 'Please enter a valid email address');
        }
    }

    // Validate password input
    validatePasswordInput(input) {
        const value = input.value;
        const errorId = input.id + '-error';
        
        if (value && value.length < 6) {
            this.showError(errorId, 'Password must be at least 6 characters');
        }
    }

    // Clear input error
    clearInputError(input) {
        const errorId = input.id + '-error';
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    }
}

// Initialize authentication system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.auth = new AuthSystem();
});

// Also check on page load (in case DOMContentLoaded already fired)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.auth = new AuthSystem();
    });
} else {
    window.auth = new AuthSystem();
}