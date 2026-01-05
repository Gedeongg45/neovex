/* ========================================
   NEOVEX HOSTING V2 - ANIMATIONS.JS
   Efectos visuales y animaciones premium
   ======================================== */

// ============================================
// SCROLL REVEAL
// ============================================
class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll('.scroll-reveal');
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px'
        });

        this.elements.forEach(el => observer.observe(el));
    }
}

// ============================================
// 3D CARD EFFECTS
// ============================================
class Card3DEffect {
    constructor() {
        this.cards = document.querySelectorAll('.card-3d-ultra, .game-card, .plan-card, .server-card');
        this.init();
    }

    init() {
        this.cards.forEach(card => {
            card.addEventListener('mousemove', (e) => this.handleMove(e, card));
            card.addEventListener('mouseleave', () => this.handleLeave(card));
        });
    }

    handleMove(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * 12;
        const rotateY = ((centerX - x) / centerX) * 12;
        
        card.style.setProperty('--rotate-x', `${rotateX}deg`);
        card.style.setProperty('--rotate-y', `${rotateY}deg`);
        card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
        card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
    }

    handleLeave(card) {
        card.style.setProperty('--rotate-x', '0deg');
        card.style.setProperty('--rotate-y', '0deg');
        card.style.setProperty('--mouse-x', '50%');
        card.style.setProperty('--mouse-y', '50%');
    }
}

// ============================================
// RIPPLE EFFECT
// ============================================
class RippleEffect {
    constructor() {
        this.elements = document.querySelectorAll('.btn-ultra, .btn-primary, .btn-hero-primary, .plan-btn, .ripple-container');
        this.init();
    }

    init() {
        this.elements.forEach(element => {
            element.addEventListener('click', (e) => this.createRipple(e, element));
        });
    }

    createRipple(e, element) {
        const ripple = document.createElement('span');
        ripple.className = 'ripple-wave';
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
}

// ============================================
// PARTICLE SYSTEM
// ============================================
class ParticleSystem {
    constructor() {
        this.container = document.getElementById('particles');
        if (!this.container) return;
        
        this.particles = [];
        this.particleCount = 60;
        this.colors = ['#9F53FF', '#B981FF', '#7B3FCC', '#5F27FF'];
        this.init();
    }

    init() {
        this.createParticles();
    }

    createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            setTimeout(() => {
                this.createParticle();
            }, i * 100);
        }
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle-enhanced';
        
        const size = Math.random() * 6 + 2;
        const startX = Math.random() * 100;
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 10;
        const opacity = Math.random() * 0.8 + 0.2;
        const xDrift = (Math.random() - 0.5) * 100;
        const color = this.colors[Math.floor(Math.random() * this.colors.length)];
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            left: ${startX}%;
            bottom: -20px;
            pointer-events: none;
            box-shadow: 0 0 ${size * 4}px ${color};
            opacity: ${opacity};
        `;
        
        particle.style.setProperty('--x-drift', `${xDrift}px`);
        particle.style.animation = `particleFloat ${duration}s linear ${delay}s infinite`;
        
        this.container.appendChild(particle);
        this.particles.push(particle);
    }

    destroy() {
        this.particles.forEach(p => p.remove());
        this.particles = [];
    }
}

// Add particle animation keyframes
const particleStyles = document.createElement('style');
particleStyles.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(0) translateX(0) scale(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-120vh) translateX(var(--x-drift, 60px)) scale(1);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyles);

// ============================================
// ENHANCED SCROLL EFFECTS
// ============================================
class EnhancedScrollEffects {
    constructor() {
        this.ticking = false;
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            if (!this.ticking) {
                window.requestAnimationFrame(() => {
                    this.handleScroll();
                    this.ticking = false;
                });
                this.ticking = true;
            }
        });
    }

    handleScroll() {
        const scrolled = window.pageYOffset;
        
        // Parallax effect on hero visual
        const hero = document.querySelector('.hero-visual');
        if (hero) {
            const offset = scrolled * 0.3;
            hero.style.transform = `translateY(${offset}px)`;
        }

        // Reveal elements
        document.querySelectorAll('.scroll-reveal').forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight * 0.8;
            
            if (isVisible) {
                element.classList.add('revealed');
            }
        });
    }
}

// ============================================
// SMOOTH TRANSITIONS
// ============================================
class SmoothTransitions {
    constructor() {
        this.init();
    }

    init() {
        // Fade in on load
        window.addEventListener('load', () => {
            document.body.style.opacity = '0';
            setTimeout(() => {
                document.body.style.transition = 'opacity 0.5s ease';
                document.body.style.opacity = '1';
            }, 100);
        });

        // Fade out on navigate (only for internal links)
        document.querySelectorAll('a[href^="/"]:not([href^="#"])').forEach(link => {
            link.addEventListener('click', (e) => {
                if (e.ctrlKey || e.metaKey) return;
                
                e.preventDefault();
                const href = link.getAttribute('href');
                
                document.body.style.opacity = '0';
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            });
        });
    }
}

// ============================================
// THEME ADJUSTER
// ============================================
class ThemeAdjuster {
    constructor() {
        this.checkTime();
        setInterval(() => this.checkTime(), 60000);
    }

    checkTime() {
        const hour = new Date().getHours();
        const isDark = hour < 6 || hour > 20;
        
        if (isDark) {
            document.documentElement.style.setProperty('--bg-primary', '#060A14');
            document.documentElement.style.setProperty('--bg-secondary', '#0C1018');
        } else {
            document.documentElement.style.setProperty('--bg-primary', '#0F172A');
            document.documentElement.style.setProperty('--bg-secondary', '#1E293B');
        }
    }
}

// ============================================
// ANIMATION OBSERVER
// ============================================
class AnimationObserver {
    constructor() {
        this.init();
    }

    init() {
        const options = {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, options);

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }
}

// ============================================
// PERFORMANCE MONITOR (Development Only)
// ============================================
class PerformanceMonitor {
    constructor() {
        if (window.location.hostname !== 'localhost') return;
        
        this.fps = 0;
        this.lastTime = performance.now();
        this.frames = 0;
        this.init();
    }

    init() {
        this.measure();
        
        setInterval(() => {
            console.log(`FPS: ${this.fps}`);
        }, 5000);
    }

    measure() {
        this.frames++;
        const currentTime = performance.now();
        
        if (currentTime >= this.lastTime + 1000) {
            this.fps = Math.round((this.frames * 1000) / (currentTime - this.lastTime));
            this.frames = 0;
            this.lastTime = currentTime;
        }
        
        requestAnimationFrame(() => this.measure());
    }
}

// ============================================
// ADD ANIMATION CLASSES
// ============================================
function addAnimationClasses() {
    // Add card-ultra class to cards
    document.querySelectorAll('.game-card, .plan-card, .feature-card').forEach(card => {
        card.classList.add('card-ultra');
    });

    // Add btn-ultra class to buttons
    document.querySelectorAll('.btn-primary, .btn-hero-primary, .plan-btn').forEach(btn => {
        btn.classList.add('btn-ultra');
    });

    // Add animate-on-scroll to sections
    document.querySelectorAll('section').forEach((section, index) => {
        if (index > 0) {
            section.classList.add('animate-on-scroll');
        }
    });

    // Add text-gradient-ultra to gradient text
    document.querySelectorAll('.gradient-text').forEach(text => {
        text.classList.add('text-gradient-ultra');
    });
}

// ============================================
// INITIALIZE ANIMATIONS
// ============================================
function initAnimations() {
    console.log('🎨 Initializing Animations...');

    // Scroll reveal
    new ScrollReveal();

    // 3D card effects
    new Card3DEffect();

    // Ripple effects
    new RippleEffect();

    // Particle system
    new ParticleSystem();

    // Enhanced scroll effects
    new EnhancedScrollEffects();

    // Smooth transitions
    new SmoothTransitions();

    // Theme adjuster
    new ThemeAdjuster();

    // Animation observer
    new AnimationObserver();

    // Performance monitor (dev only)
    new PerformanceMonitor();

    // Add animation classes
    addAnimationClasses();

    console.log('✨ Animations Ready!');
}

// Auto-initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
} else {
    initAnimations();
}

// Export for modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ScrollReveal,
        Card3DEffect,
        RippleEffect,
        ParticleSystem,
        EnhancedScrollEffects,
        SmoothTransitions,
        ThemeAdjuster,
        AnimationObserver,
        PerformanceMonitor,
        initAnimations
    };
}
