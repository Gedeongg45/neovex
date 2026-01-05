/* ========================================
   NEOVEX HOSTING V2 - MAIN.JS
   Script principal del sitio
   ======================================== */

// ============================================
// NAVIGATION SYSTEM
// ============================================
class NavigationSystem {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navToggle = document.getElementById('navToggle');
        this.navMenu = document.getElementById('navMenu');
        this.dropdowns = document.querySelectorAll('.dropdown');
        this.lastScroll = 0;
        this.init();
    }

    init() {
        this.initScrollEffect();
        this.initMobileMenu();
        this.initDropdowns();
        this.initSmoothScroll();
    }

    initScrollEffect() {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }

            this.lastScroll = currentScroll;
        });
    }

    initMobileMenu() {
        if (this.navToggle && this.navMenu) {
            this.navToggle.addEventListener('click', () => {
                this.navMenu.classList.toggle('active');
                this.navToggle.classList.toggle('active');
                document.body.style.overflow = this.navMenu.classList.contains('active') ? 'hidden' : '';
            });

            // Close menu on link click
            const navLinks = this.navMenu.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (window.innerWidth <= 1023) {
                        this.navMenu.classList.remove('active');
                        this.navToggle.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                });
            });
        }
    }

    initDropdowns() {
        this.dropdowns.forEach(dropdown => {
            const trigger = dropdown.querySelector('.nav-link');
            if (window.innerWidth <= 1023) {
                trigger.addEventListener('click', (e) => {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                });
            }
        });
    }

    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#') return;

                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// ============================================
// LANGUAGE SYSTEM
// ============================================
class LanguageSystem {
    constructor() {
        this.langBtn = document.getElementById('langBtn');
        this.currentLangSpan = document.getElementById('currentLang');
        this.langLinks = document.querySelectorAll('.lang-dropdown a');
        this.currentLang = this.detectLanguage();
        this.init();
    }

    init() {
        this.updateDisplay();
        this.attachEventListeners();
    }

    detectLanguage() {
        const path = window.location.pathname;
        if (path.startsWith('/en')) return 'en';
        if (path.startsWith('/fr')) return 'fr';
        return 'es';
    }

    updateDisplay() {
        if (this.currentLangSpan) {
            this.currentLangSpan.textContent = this.currentLang.toUpperCase();
        }
    }

    attachEventListeners() {
        this.langLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const newLang = link.dataset.lang;
                this.switchLanguage(newLang);
            });
        });
    }

    switchLanguage(lang) {
        let newPath = window.location.pathname;
        newPath = newPath.replace(/^\/(en|fr)/, '');
        
        if (lang !== 'es') {
            newPath = `/${lang}${newPath}`;
        }
        
        window.location.href = newPath || '/';
    }
}

// ============================================
// GAMES RENDERER
// ============================================
class GamesRenderer {
    constructor() {
        this.container = document.querySelector('.games-grid');
        if (!this.container) return;
        this.render();
    }

    render() {
        if (!gamesData) return;

        this.container.innerHTML = '';

        gamesData.forEach((game, index) => {
            const gameCard = this.createGameCard(game, index);
            this.container.appendChild(gameCard);
        });
    }

    createGameCard(game, index) {
        const card = document.createElement('div');
        card.className = 'game-card scroll-reveal';
        card.dataset.gameId = game.id;

        card.innerHTML = `
            <div class="game-icon">${game.icon}</div>
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <div class="game-price">Desde $${game.priceFrom.toFixed(2)}/mes</div>
            <a href="${game.page}" class="game-link">
                Ver Planes
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </a>
        `;

        card.addEventListener('click', (e) => {
            if (!e.target.closest('.game-link')) {
                window.location.href = game.page;
            }
        });

        return card;
    }
}

// ============================================
// PLANS RENDERER
// ============================================
class PlansRenderer {
    constructor(game = 'minecraft') {
        this.container = document.querySelector('.plans-grid');
        this.game = game;
        this.currentTier = 'budget';
        if (!this.container) return;
        this.init();
    }

    init() {
        this.renderTierSelector();
        this.render();
    }

    renderTierSelector() {
        const container = document.querySelector('.plans-selector');
        if (!container || !tiersConfig) return;

        container.innerHTML = '';

        Object.entries(tiersConfig).forEach(([key, tier], index) => {
            const button = document.createElement('button');
            button.className = `plan-tier-btn ${index === 0 ? 'active' : ''}`;
            button.dataset.tier = key;

            button.innerHTML = `
                <span class="tier-icon">${tier.icon}</span>
                <span class="tier-name">${tier.name}</span>
                <span class="tier-cpu">${tier.cpu}</span>
            `;

            button.addEventListener('click', () => this.switchTier(key));
            container.appendChild(button);
        });
    }

    render(tier = this.currentTier) {
        if (!plansData || !plansData[this.game] || !plansData[this.game][tier]) return;

        this.currentTier = tier;
        const plans = plansData[this.game][tier];

        this.container.innerHTML = '';

        plans.forEach((plan, index) => {
            const planCard = this.createPlanCard(plan);
            this.container.appendChild(planCard);
        });
    }

    createPlanCard(plan) {
        const card = document.createElement('div');
        card.className = `plan-card ${plan.featured ? 'featured' : ''}`;

        card.innerHTML = `
            <div class="plan-header">
                <h3>${plan.name}</h3>
                <p class="plan-subtitle">${plan.subtitle}</p>
            </div>
            
            <div class="plan-price">
                $${plan.price.toFixed(2)}<span>/mes</span>
            </div>
            
            ${plan.originalPrice ? `
                <div class="plan-discount">
                    <span class="original-price">$${plan.originalPrice.toFixed(2)}</span>
                    <span class="discount-badge">-${plan.discount}</span>
                </div>
            ` : ''}
            
            <div class="plan-specs">
                <div class="spec-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="4" y="4" width="16" height="16" rx="2"/>
                        <rect x="9" y="9" width="6" height="6"/>
                    </svg>
                    <span>${plan.cpu}</span>
                </div>
                <div class="spec-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"/>
                    </svg>
                    <span>${plan.ram}</span>
                </div>
                <div class="spec-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="22" y1="12" x2="2" y2="12"/>
                        <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
                    </svg>
                    <span>${plan.storage}</span>
                </div>
            </div>
            
            <ul class="plan-features">
                ${plan.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            
            <button class="plan-btn" onclick="window.location.href='${plan.link}'">
                Comprar Ahora
            </button>
        `;

        return card;
    }

    switchTier(tier) {
        // Update active button
        document.querySelectorAll('.plan-tier-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const activeBtn = document.querySelector(`[data-tier="${tier}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }

        // Render new plans
        this.render(tier);
    }
}

// ============================================
// LOCATION SELECTOR
// ============================================
class LocationSelector {
    constructor() {
        this.markers = document.querySelectorAll('.location-marker');
        this.cards = document.querySelectorAll('.location-card');
        this.init();
    }

    init() {
        this.markers.forEach(marker => {
            marker.addEventListener('click', () => {
                this.selectLocation(marker.dataset.location);
            });
        });

        this.cards.forEach(card => {
            card.addEventListener('click', () => {
                this.selectLocation(card.dataset.location);
            });
        });
    }

    selectLocation(location) {
        this.cards.forEach(card => {
            if (card.dataset.location === location) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    }
}

// ============================================
// COUNTER ANIMATIONS
// ============================================
class CounterAnimations {
    constructor() {
        this.counters = document.querySelectorAll('[data-count]');
        this.init();
    }

    init() {
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.counted) {
                    this.animateCounter(entry.target);
                    entry.target.dataset.counted = 'true';
                }
            });
        }, observerOptions);

        this.counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(element) {
        const target = parseFloat(element.dataset.count);
        const duration = 2000;
        const startTime = Date.now();
        const startValue = 0;

        const update = () => {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const easeProgress = progress * (2 - progress);
            const currentValue = startValue + (target - startValue) * easeProgress;

            if (target % 1 === 0) {
                element.textContent = Math.floor(currentValue);
            } else {
                element.textContent = currentValue.toFixed(1);
            }

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target % 1 === 0 ? target : target.toFixed(1);
            }
        };

        requestAnimationFrame(update);
    }
}

// ============================================
// PROGRESS BARS
// ============================================
class ProgressBars {
    constructor() {
        this.bars = document.querySelectorAll('.bar-fill');
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.animated) {
                    const width = entry.target.style.width;
                    entry.target.style.width = '0%';
                    
                    setTimeout(() => {
                        entry.target.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
                        entry.target.style.width = width;
                    }, 100);
                    
                    entry.target.dataset.animated = 'true';
                }
            });
        }, { threshold: 0.5 });

        this.bars.forEach(bar => observer.observe(bar));
    }
}

// ============================================
// UTILITIES
// ============================================
const Utils = {
    formatCurrency(amount, currency = 'USD') {
        return new Intl.NumberFormat('es-US', {
            style: 'currency',
            currency: currency
        }).format(amount);
    },

    formatDate(date) {
        return new Intl.DateFormat('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(new Date(date));
    },

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        const colors = {
            success: '#22C55E',
            error: '#EF4444',
            info: '#3B82F6',
            warning: '#F59E0B'
        };

        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${colors[type]};
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            animation: slideIn 0.3s ease;
            font-weight: 600;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
};

// Add notification animations
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Neovex Hosting - Initializing...');

    // Initialize navigation
    new NavigationSystem();

    // Initialize language
    new LanguageSystem();

    // Initialize renderers
    new GamesRenderer();
    new PlansRenderer('minecraft');

    // Initialize location selector
    if (document.querySelector('.location-card')) {
        new LocationSelector();
    }

    // Initialize counters
    new CounterAnimations();

    // Initialize progress bars
    new ProgressBars();

    console.log('✅ Neovex Hosting - Ready!');
});

// Expose utilities globally
window.NeovexUtils = Utils;
