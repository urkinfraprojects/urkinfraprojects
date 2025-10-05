// Theme management
class ThemeManager {
    constructor() {
        this.currentTheme = 'light';
        this.themeToggle = document.getElementById('theme-toggle');
        this.themeIcon = document.querySelector('.theme-toggle__icon');
        
        this.init();
    }

    
    init() {
        // Set initial theme
        this.applyTheme(this.currentTheme);
        
        // Add event to theme toggle
        this.themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });
        
        // Add keyboard support for theme toggle
        this.themeToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
    }
    
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.currentTheme);
    }
    
    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.updateThemeIcon(theme);
        
        // Add smooth transition for theme change
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        
        // Remove transition after theme change is complete
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }
    
    updateThemeIcon(theme) {
        if (theme === 'dark') {
            this.themeIcon.textContent = '☀️';
            this.themeToggle.setAttribute('aria-label', 'Switch to light theme');
        } else {
            this.themeIcon.textContent = '🌙';
            this.themeToggle.setAttribute('aria-label', 'Switch to dark theme');
        }
    }
}

// Navigation and smooth scrolling
class Navigation {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }
    
    init() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    this.smoothScrollTo(href);
                }
            });
        });
        
        // Add smooth scrolling to hero action buttons
        const heroButtons = document.querySelectorAll('.hero__actions a');
        heroButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const href = button.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    this.smoothScrollTo(href);
                }
            });
        });
    }
    
    smoothScrollTo(targetId) {
        const target = document.querySelector(targetId);
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
}

// Form handling
class ContactForm {
    constructor() {
        this.form = document.querySelector('.contact-form');
        this.init();
    }
    
    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit(e);
            });
        }
    }
    
    handleSubmit(e) {
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        
        // Validate form
        if (this.validateForm(data)) {
            this.showSuccessMessage();
            this.form.reset();
        } else {
            this.showErrorMessage();
        }
    }
    
    validateForm(data) {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !phone || !message) {
            return false;
        }
        
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return false;
        }
        
        return true;
    }
    
    showSuccessMessage() {
        this.showNotification('Thank you for your message! We will get back to you soon.', 'success');
    }
    
    showErrorMessage() {
        this.showNotification('Please fill in all required fields correctly.', 'error');
    }
    
    showNotification(message, type) {
        // Remove any existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? 'var(--color-success)' : 'var(--color-error)'};
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        notification.textContent = message;
        
        // Add to document
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }
}

// Package selection handling
class PackageSelector {
    constructor() {
        this.packageButtons = document.querySelectorAll('.package-card .btn');
        this.init();
    }
    
    init() {
        this.packageButtons.forEach((button, index) => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.selectPackage(index);
            });
        });
    }
    
    selectPackage(packageIndex) {
        const packages = ['Basic Package', 'Standard Package', 'Premium Package'];
        const packageName = packages[packageIndex] || 'Selected Package';
        
        // Scroll to contact form
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = contactSection.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Pre-fill the service field in contact form
            setTimeout(() => {
                const serviceSelect = document.getElementById('service');
                const messageField = document.getElementById('message');
                
                if (messageField) {
                    messageField.value = `Hi, I'm interested in the ${packageName}. Please provide more information.`;
                    messageField.focus();
                }
            }, 1000);
        }
    }
}

// Intersection Observer for animations
class AnimationObserver {
    constructor() {
        this.observerOptions = {
            root: null,
            rootMargin: '-10% 0px -10% 0px',
            threshold: 0.1
        };
        this.init();
    }
    
    init() {
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver(
                this.handleIntersection.bind(this),
                this.observerOptions
            );
            
            this.observeElements();
        }
    }
    
    observeElements() {
        const elementsToAnimate = document.querySelectorAll(`
            .feature-card,
            .service-card,
            .process-step,
            .package-card,
            .testimonial-card
        `);
        
        elementsToAnimate.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            this.observer.observe(el);
        });
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                this.observer.unobserve(entry.target);
            }
        });
    }
}

// Header scroll behavior
class HeaderScrollBehavior {
    constructor() {
        this.header = document.querySelector('.header');
        this.lastScrollY = 0;
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });
    }
    
    handleScroll() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            this.header.style.boxShadow = 'var(--shadow-md)';
        } else {
            this.header.style.boxShadow = 'var(--shadow-sm)';
        }
        
        this.lastScrollY = currentScrollY;
    }
}

// Loading and performance optimization
class PageOptimizer {
    constructor() {
        this.init();
    }
    
    init() {
        // Defer non-critical animations
        this.deferAnimations();
        
        // Preload critical resources
        this.preloadCriticalResources();
        
        // Add loading class removal
        document.addEventListener('DOMContentLoaded', () => {
            document.body.classList.add('loaded');
        });
    }
    
    deferAnimations() {
        // Defer heavy animations until after initial load
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.body.classList.add('animations-enabled');
            }, 100);
        });
    }
    
    preloadCriticalResources() {
        // Preload font if needed
        const fontLink = document.createElement('link');
        fontLink.rel = 'preload';
        fontLink.href = 'https://r2cdn.perplexity.ai/fonts/FKGroteskNeue.woff2';
        fontLink.as = 'font';
        fontLink.type = 'font/woff2';
        fontLink.crossOrigin = 'anonymous';
        document.head.appendChild(fontLink);
    }
}

// Utility functions
class Utils {
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new ThemeManager();
    new Navigation();
    new ContactForm();
    new PackageSelector();
    new AnimationObserver();
    new HeaderScrollBehavior();
    new PageOptimizer();
    
    console.log('URK Infraprojects website initialized successfully!');
});

// Handle resize events
window.addEventListener('resize', Utils.debounce(() => {
    // Handle any resize-specific logic here
    console.log('Window resized');
}, 250));

// Error handling
window.addEventListener('error', (e) => {
    console.error('Application error:', e.error);
});

// Unhandled promise rejection handling
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    e.preventDefault();
});