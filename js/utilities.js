/* ========================================
   NEOVEX HOSTING V2 - UTILITIES.JS
   Herramientas y utilidades del sitio
   ======================================== */

// ============================================
// PING TESTER
// ============================================
class PingTester {
    constructor() {
        this.servers = {
            miami: {
                url: 'https://miami.neovex.host/ping',
                fallback: 'https://cloudflare.com/cdn-cgi/trace',
                name: 'Miami',
                element: null
            },
            canada: {
                url: 'https://canada.neovex.host/ping',
                fallback: 'https://cloudflare.com/cdn-cgi/trace',
                name: 'Canadá',
                element: null
            },
            brasil: {
                url: 'https://brasil.neovex.host/ping',
                fallback: 'https://cloudflare.com/cdn-cgi/trace',
                name: 'Brasil',
                element: null,
                upcoming: true
            }
        };
        
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupElements());
        } else {
            this.setupElements();
        }
    }

    setupElements() {
        const locationCards = document.querySelectorAll('.location-card');
        
        locationCards.forEach(card => {
            const location = card.getAttribute('data-location');
            if (this.servers[location]) {
                this.servers[location].element = card.querySelector('.ping-value');
                
                if (!this.servers[location].upcoming) {
                    this.measurePing(location);
                    
                    const testBtn = card.querySelector('.location-test');
                    if (testBtn && !testBtn.classList.contains('disabled')) {
                        testBtn.addEventListener('click', (e) => {
                            e.preventDefault();
                            this.testPing(location);
                        });
                    }
                }
            }
        });
    }

    async measurePing(location) {
        const server = this.servers[location];
        if (!server.element) return;

        server.element.textContent = '...';
        server.element.classList.add('measuring');

        try {
            const ping = await this.ping(server.url, server.fallback);
            
            if (ping !== null) {
                server.element.textContent = `${ping}ms`;
                server.element.classList.remove('measuring');
                server.element.classList.add('measured');
                this.addQualityClass(server.element.closest('.location-card'), ping);
            } else {
                server.element.textContent = 'N/A';
                server.element.classList.remove('measuring');
            }
        } catch (error) {
            console.error(`Error midiendo ping para ${location}:`, error);
            server.element.textContent = 'Error';
            server.element.classList.remove('measuring');
        }
    }

    async ping(url, fallbackUrl) {
        const startTime = performance.now();
        
        try {
            await fetch(url, {
                method: 'HEAD',
                mode: 'no-cors',
                cache: 'no-cache'
            });
            
            const endTime = performance.now();
            return Math.round(endTime - startTime);
        } catch (error) {
            try {
                const fallbackStart = performance.now();
                await fetch(fallbackUrl, {
                    method: 'HEAD',
                    mode: 'no-cors',
                    cache: 'no-cache'
                });
                const fallbackEnd = performance.now();
                return Math.round(fallbackEnd - fallbackStart);
            } catch (fallbackError) {
                console.error('Ambos intentos de ping fallaron:', fallbackError);
                return null;
            }
        }
    }

    async testPing(location) {
        const server = this.servers[location];
        const card = server.element.closest('.location-card');
        const testBtn = card.querySelector('.location-test');
        
        testBtn.classList.add('testing');
        testBtn.textContent = 'Midiendo...';
        
        const pings = [];
        for (let i = 0; i < 3; i++) {
            const ping = await this.ping(server.url, server.fallback);
            if (ping !== null) {
                pings.push(ping);
            }
            await new Promise(resolve => setTimeout(resolve, 200));
        }
        
        if (pings.length > 0) {
            const avgPing = Math.round(pings.reduce((a, b) => a + b) / pings.length);
            const minPing = Math.min(...pings);
            const maxPing = Math.max(...pings);
            
            server.element.textContent = `${avgPing}ms`;
            this.addQualityClass(card, avgPing);
            this.showPingResults(location, avgPing, minPing, maxPing);
        }
        
        testBtn.classList.remove('testing');
        testBtn.textContent = 'Test de Ping';
    }

    addQualityClass(card, ping) {
        card.classList.remove('ping-excellent', 'ping-good', 'ping-fair', 'ping-poor');
        
        if (ping < 30) {
            card.classList.add('ping-excellent');
        } else if (ping < 60) {
            card.classList.add('ping-good');
        } else if (ping < 100) {
            card.classList.add('ping-fair');
        } else {
            card.classList.add('ping-poor');
        }
    }

    showPingResults(location, avg, min, max) {
        const server = this.servers[location];
        const card = server.element.closest('.location-card');
        let tooltip = card.querySelector('.ping-tooltip');
        
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.className = 'ping-tooltip';
            card.appendChild(tooltip);
        }
        
        tooltip.innerHTML = `
            <div class="ping-stats">
                <div class="ping-stat">
                    <span class="label">Promedio:</span>
                    <span class="value">${avg}ms</span>
                </div>
                <div class="ping-stat">
                    <span class="label">Mínimo:</span>
                    <span class="value">${min}ms</span>
                </div>
                <div class="ping-stat">
                    <span class="label">Máximo:</span>
                    <span class="value">${max}ms</span>
                </div>
            </div>
        `;
        
        tooltip.classList.add('show');
        
        setTimeout(() => {
            tooltip.classList.remove('show');
        }, 5000);
    }

    startAutoRefresh(interval = 60000) {
        setInterval(() => {
            Object.keys(this.servers).forEach(location => {
                if (!this.servers[location].upcoming) {
                    this.measurePing(location);
                }
            });
        }, interval);
    }
}

// ============================================
// CLIPBOARD UTILITY
// ============================================
class ClipboardManager {
    static copy(text, showNotification = true) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                if (showNotification && window.NeovexUtils) {
                    window.NeovexUtils.showNotification('Copiado al portapapeles', 'success');
                }
            }).catch(err => {
                console.error('Error al copiar:', err);
                if (showNotification && window.NeovexUtils) {
                    window.NeovexUtils.showNotification('Error al copiar', 'error');
                }
            });
        } else {
            // Fallback para navegadores antiguos
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            document.body.appendChild(textArea);
            textArea.select();
            
            try {
                document.execCommand('copy');
                if (showNotification && window.NeovexUtils) {
                    window.NeovexUtils.showNotification('Copiado al portapapeles', 'success');
                }
            } catch (err) {
                console.error('Error al copiar:', err);
                if (showNotification && window.NeovexUtils) {
                    window.NeovexUtils.showNotification('Error al copiar', 'error');
                }
            }
            
            document.body.removeChild(textArea);
        }
    }
}

// ============================================
// FORM VALIDATOR
// ============================================
class FormValidator {
    static validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    static validatePhone(phone) {
        const re = /^[\d\s\-\+\(\)]+$/;
        return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
    }

    static validateRequired(value) {
        return value && value.trim().length > 0;
    }

    static validateMinLength(value, min) {
        return value && value.length >= min;
    }

    static validateMaxLength(value, max) {
        return value && value.length <= max;
    }
}

// ============================================
// LOCAL STORAGE MANAGER
// ============================================
class StorageManager {
    static set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Error saving to localStorage:', e);
            return false;
        }
    }

    static get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.error('Error reading from localStorage:', e);
            return defaultValue;
        }
    }

    static remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('Error removing from localStorage:', e);
            return false;
        }
    }

    static clear() {
        try {
            localStorage.clear();
            return true;
        } catch (e) {
            console.error('Error clearing localStorage:', e);
            return false;
        }
    }
}

// ============================================
// URL UTILITY
// ============================================
class URLUtil {
    static getParam(name) {
        const params = new URLSearchParams(window.location.search);
        return params.get(name);
    }

    static getAllParams() {
        const params = new URLSearchParams(window.location.search);
        const result = {};
        for (const [key, value] of params) {
            result[key] = value;
        }
        return result;
    }

    static setParam(name, value) {
        const url = new URL(window.location);
        url.searchParams.set(name, value);
        window.history.pushState({}, '', url);
    }

    static removeParam(name) {
        const url = new URL(window.location);
        url.searchParams.delete(name);
        window.history.pushState({}, '', url);
    }
}

// ============================================
// DEVICE DETECTOR
// ============================================
class DeviceDetector {
    static isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    static isTablet() {
        return /iPad|Android/i.test(navigator.userAgent) && window.innerWidth >= 768;
    }

    static isDesktop() {
        return !this.isMobile() && !this.isTablet();
    }

    static getTouchSupport() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }

    static getViewportSize() {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        };
    }
}

// ============================================
// COOKIE MANAGER
// ============================================
class CookieManager {
    static set(name, value, days = 365) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    }

    static get(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    static delete(name) {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`;
    }
}

// ============================================
// DEBOUNCE & THROTTLE
// ============================================
class TimingUtils {
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
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// ============================================
// ANALYTICS TRACKER
// ============================================
class AnalyticsTracker {
    static trackEvent(category, action, label = '', value = 0) {
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                'event_category': category,
                'event_label': label,
                'value': value
            });
        }
        
        console.log('Event tracked:', { category, action, label, value });
    }

    static trackPageView(page) {
        if (typeof gtag !== 'undefined') {
            gtag('config', 'GA_MEASUREMENT_ID', {
                'page_path': page
            });
        }
        
        console.log('Page view tracked:', page);
    }

    static trackPurchase(transactionId, value, currency = 'USD') {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'purchase', {
                'transaction_id': transactionId,
                'value': value,
                'currency': currency
            });
        }
        
        console.log('Purchase tracked:', { transactionId, value, currency });
    }
}

// ============================================
// INITIALIZE UTILITIES
// ============================================
function initUtilities() {
    console.log('🔧 Initializing Utilities...');

    // Initialize ping tester
    new PingTester();

    // Expose utilities globally
    window.NeovexUtilities = {
        PingTester,
        ClipboardManager,
        FormValidator,
        StorageManager,
        URLUtil,
        DeviceDetector,
        CookieManager,
        TimingUtils,
        AnalyticsTracker
    };

    console.log('✅ Utilities Ready!');
}

// Auto-initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUtilities);
} else {
    initUtilities();
}

// Export for modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PingTester,
        ClipboardManager,
        FormValidator,
        StorageManager,
        URLUtil,
        DeviceDetector,
        CookieManager,
        TimingUtils,
        AnalyticsTracker,
        initUtilities
    };
}
