/**
 * ========================================
 * NEOVEX HOSTING - UBICACIONES MEJORADAS
 * Sistema interactivo avanzado con partículas y animaciones
 * ========================================
 */

// ===== PARTÍCULAS DEL HERO =====
class ParticleSystem {
    constructor(container) {
        this.container = container;
        this.particles = [];
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.init();
    }

    init() {
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.container.appendChild(this.canvas);
        
        this.resize();
        this.createParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = this.container.offsetWidth;
        this.canvas.height = this.container.offsetHeight;
    }

    createParticles() {
        const particleCount = Math.min(80, Math.floor(this.canvas.width / 20));
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(159, 83, 255, ${particle.opacity})`;
            this.ctx.fill();
            
            this.ctx.shadowBlur = 15;
            this.ctx.shadowColor = 'rgba(159, 83, 255, 0.8)';
        });
        
        // Dibujar conexiones
        this.particles.forEach((p1, i) => {
            this.particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.strokeStyle = `rgba(159, 83, 255, ${0.2 * (1 - distance / 150)})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar sistema de partículas
    const heroParticles = document.getElementById('heroParticles');
    if (heroParticles) {
        new ParticleSystem(heroParticles);
    }

    // ===== SELECTORES =====
    const beacons = document.querySelectorAll('.location-beacon');
    const cards = document.querySelectorAll('.location-detail-card');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navbar = document.getElementById('navbar');
    const mapControlBtns = document.querySelectorAll('.map-control-btn');

    // ===== SISTEMA DE ACTIVACIÓN DE UBICACIONES =====
    function activateLocation(locationName) {
        beacons.forEach(b => b.classList.remove('active'));
        cards.forEach(c => c.classList.remove('active'));

        const targetBeacon = document.querySelector(`.location-beacon[data-location="${locationName}"]`);
        const targetCard = document.querySelector(`.location-detail-card[data-location="${locationName}"]`);

        if (targetBeacon) {
            targetBeacon.classList.add('active');
            
            // Crear efecto de onda expansiva
            createRipple(targetBeacon);
        }
        
        if (targetCard) {
            targetCard.classList.add('active');
            
            if (window.innerWidth < 768) {
                setTimeout(() => {
                    targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);
            }
        }
    }

    // ===== EFECTO DE ONDA EXPANSIVA =====
    function createRipple(element) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 40px;
            height: 40px;
            border: 3px solid rgba(159, 83, 255, 0.8);
            border-radius: 50%;
            pointer-events: none;
            animation: rippleExpand 1s ease-out;
        `;
        
        element.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 1000);
    }

    // Agregar animación de ripple al CSS
    if (!document.getElementById('ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation';
        style.textContent = `
            @keyframes rippleExpand {
                0% {
                    width: 40px;
                    height: 40px;
                    opacity: 1;
                }
                100% {
                    width: 200px;
                    height: 200px;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // ===== INTERACCIÓN CON BEACONS =====
    beacons.forEach(beacon => {
        beacon.addEventListener('click', () => {
            const location = beacon.getAttribute('data-location');
            activateLocation(location);
            
            // Vibración táctil en móviles
            if (navigator.vibrate) {
                navigator.vibrate(50);
            }
        });

        beacon.addEventListener('mouseenter', () => {
            const location = beacon.getAttribute('data-location');
            const card = document.querySelector(`.location-detail-card[data-location="${location}"]`);
            if (card) {
                card.style.transform = 'translateY(-15px) scale(1.02)';
                card.style.borderColor = 'rgba(159, 83, 255, 0.8)';
            }
        });

        beacon.addEventListener('mouseleave', () => {
            const location = beacon.getAttribute('data-location');
            const card = document.querySelector(`.location-detail-card[data-location="${location}"]`);
            if (card && !card.classList.contains('active')) {
                card.style.transform = '';
                card.style.borderColor = '';
            } else if (card && card.classList.contains('active')) {
                card.style.transform = 'scale(1.03)';
            }
        });
    });

    // ===== INTERACCIÓN CON CARDS =====
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Evitar activar si se clickeó un botón
            if (e.target.closest('.action-button')) return;
            
            const location = this.getAttribute('data-location');
            activateLocation(location);
        });

        // Efecto spotlight mejorado
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            this.style.setProperty('--mouse-x', `${x}%`);
            this.style.setProperty('--mouse-y', `${y}%`);
            
            // Efecto de inclinación suave
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            const rotateX = (mouseY - centerY) / 30;
            const rotateY = (centerX - mouseX) / 30;
            
            this.style.transform = `translateY(-12px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // ===== BOTONES DE ACCIÓN =====
    document.querySelectorAll('.action-button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            
            if (button.classList.contains('notify')) {
                handleNotify(button);
            } else if (button.classList.contains('primary')) {
                handleSpeedTest(button);
            } else if (button.classList.contains('secondary')) {
                handleViewPlans(button);
            }
        });
    });

    // ===== MANEJADORES DE BOTONES =====
    function handleNotify(button) {
        const originalHTML = button.innerHTML;
        
        button.innerHTML = `
            <svg class="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10" stroke-width="3" stroke-linecap="round" stroke-dasharray="31.4 31.4" opacity="0.25"/>
                <circle cx="12" cy="12" r="10" stroke-width="3" stroke-linecap="round" stroke-dasharray="5 26.4">
                    <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/>
                </circle>
            </svg>
            <span>Registrando...</span>
        `;
        
        button.disabled = true;
        
        setTimeout(() => {
            showNotification('¡Perfecto! 🎉 Te notificaremos cuando Brasil esté disponible', 'success');
            button.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                    <path d="M5 10l3 3 7-7" stroke-width="2" stroke-linecap="round"/>
                </svg>
                <span>✓ Notificación Activada</span>
            `;
            button.style.background = 'linear-gradient(135deg, rgba(74, 222, 128, 0.9), rgba(34, 197, 94, 0.9))';
        }, 1500);
    }

    function handleSpeedTest(button) {
        const card = button.closest('.location-detail-card');
        const location = card.getAttribute('data-location');
        const originalHTML = button.innerHTML;
        
        button.innerHTML = `
            <svg class="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10" stroke-width="3" stroke-linecap="round" stroke-dasharray="31.4 31.4" opacity="0.25"/>
                <circle cx="12" cy="12" r="10" stroke-width="3" stroke-linecap="round" stroke-dasharray="5 26.4">
                    <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/>
                </circle>
            </svg>
            <span>Testeando...</span>
        `;
        
        button.disabled = true;
        
        simulateSpeedTest(location, (result) => {
            showNotification(
                `📡 Test completado: ${result.ping}ms latencia • ${result.download}Mbps descarga • ${result.upload}Mbps subida`,
                'success'
            );
            
            button.innerHTML = originalHTML;
            button.disabled = false;
        });
    }

    function handleViewPlans(button) {
        showNotification('Redirigiendo a planes...', 'info');
        setTimeout(() => {
            window.location.href = '#planes';
        }, 500);
    }

    // ===== SIMULADOR DE TEST DE VELOCIDAD =====
    function simulateSpeedTest(location, callback) {
        const speeds = {
            miami: { ping: 8 + Math.floor(Math.random() * 5), download: 850 + Math.floor(Math.random() * 150), upload: 450 + Math.floor(Math.random() * 100) },
            canada: { ping: 10 + Math.floor(Math.random() * 5), download: 900 + Math.floor(Math.random() * 100), upload: 500 + Math.floor(Math.random() * 100) },
            brasil: { ping: 0, download: 0, upload: 0 }
        };
        
        setTimeout(() => {
            callback(speeds[location] || speeds.miami);
        }, 2000);
    }

    // ===== SISTEMA DE NOTIFICACIONES MEJORADO =====
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `custom-notification ${type}`;
        
        const icons = {
            success: '✓',
            error: '✕',
            info: 'ℹ',
            warning: '⚠'
        };
        
        const colors = {
            success: 'rgba(74, 222, 128, 0.95)',
            error: 'rgba(239, 68, 68, 0.95)',
            info: 'rgba(159, 83, 255, 0.95)',
            warning: 'rgba(245, 158, 11, 0.95)'
        };
        
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${icons[type]}</span>
                <span class="notification-text">${message}</span>
                <button class="notification-close">×</button>
            </div>
        `;

        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${colors[type]};
            backdrop-filter: blur(20px);
            color: white;
            padding: 18px 24px;
            border-radius: 14px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
            z-index: 10000;
            animation: slideInRight 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            max-width: 450px;
            min-width: 300px;
        `;

        document.body.appendChild(notification);

        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOutRight 0.4s ease';
            setTimeout(() => notification.remove(), 400);
        });

        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideOutRight 0.4s ease';
                setTimeout(() => notification.remove(), 400);
            }
        }, 5000);
    }

    // ===== CONTROLES DEL MAPA =====
    mapControlBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            mapControlBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const view = this.getAttribute('data-view');
            applyMapView(view);
        });
    });

    function applyMapView(view) {
        const mapImage = document.querySelector('.world-map-image');
        const connectionLines = document.querySelector('.connection-lines');
        
        switch(view) {
            case 'globe':
                mapImage.style.filter = 'drop-shadow(0 0 30px rgba(0,0,0,0.9)) sepia(50%) hue-rotate(220deg) saturate(150%)';
                connectionLines.style.opacity = '0.7';
                break;
            case 'connections':
                mapImage.style.filter = 'drop-shadow(0 0 30px rgba(0,0,0,0.9)) sepia(30%) hue-rotate(220deg) saturate(120%) brightness(0.8)';
                connectionLines.style.opacity = '1';
                break;
            case 'latency':
                mapImage.style.filter = 'drop-shadow(0 0 30px rgba(0,0,0,0.9)) sepia(70%) hue-rotate(320deg) saturate(180%)';
                connectionLines.style.opacity = '0.5';
                break;
        }
        
        showNotification(`Vista cambiada: ${view}`, 'info');
    }

    // ===== COMPARADOR DE UBICACIONES =====
    const locationCheckboxes = document.querySelectorAll('.location-checkbox');
    const comparisonResults = document.getElementById('comparisonResults');
    
    locationCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateComparison);
    });

    function updateComparison() {
        const selectedLocations = Array.from(locationCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.id.replace('compare-', ''));
        
        if (selectedLocations.length === 0) {
            comparisonResults.innerHTML = '<p style="color: #94A3B8; text-align: center;">Selecciona al menos una ubicación para comparar</p>';
            return;
        }
        
        const locationData = {
            miami: { latency: '8-12ms', uptime: '99.98%', speed: '1Gb/s', servers: 45 },
            canada: { latency: '10-14ms', uptime: '99.96%', speed: '1Gb/s', servers: 38 },
            brasil: { latency: '~8ms', uptime: 'N/A', speed: '1Gb/s', servers: 'Q2 2025' }
        };
        
        let html = '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">';
        
        selectedLocations.forEach(loc => {
            const data = locationData[loc];
            const flag = loc === 'miami' ? '🇺🇸' : loc === 'canada' ? '🇨🇦' : '🇧🇷';
            
            html += `
                <div style="background: rgba(159, 83, 255, 0.1); border: 1px solid rgba(159, 83, 255, 0.3); border-radius: 12px; padding: 20px;">
                    <div style="font-size: 2rem; margin-bottom: 10px;">${flag}</div>
                    <h4 style="color: #fff; margin-bottom: 15px; text-transform: capitalize;">${loc}</h4>
                    <div style="display: flex; flex-direction: column; gap: 8px; font-size: 0.9rem;">
                        <div style="display: flex; justify-content: space-between;">
                            <span style="color: #94A3B8;">Latencia:</span>
                            <span style="color: #A78BFA; font-weight: 700;">${data.latency}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <span style="color: #94A3B8;">Uptime:</span>
                            <span style="color: #A78BFA; font-weight: 700;">${data.uptime}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <span style="color: #94A3B8;">Velocidad:</span>
                            <span style="color: #A78BFA; font-weight: 700;">${data.speed}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <span style="color: #94A3B8;">Servidores:</span>
                            <span style="color: #A78BFA; font-weight: 700;">${data.servers}</span>
                        </div>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        comparisonResults.innerHTML = html;
    }

    // Inicializar comparación
    updateComparison();

    // ===== ACTIVAR MIAMI POR DEFECTO =====
    activateLocation('miami');

    // ===== MOBILE NAVIGATION =====
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Animar líneas del toggle
            const spans = navToggle.querySelectorAll('span');
            if (navToggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(8px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.opacity = '1';
                spans[2].style.transform = '';
            }
        });
        
        // Cerrar menú al hacer click en un enlace
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // ===== SCROLL EFFECTS =====
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (navbar) {
            if (currentScroll > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        lastScroll = currentScroll;
    });

    // ===== ANIMACIÓN DE CONTADORES =====
    function animateCounters() {
        const counters = document.querySelectorAll('[data-count]');
        
        counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-count'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                    
                    // Añadir símbolo de porcentaje si es necesario
                    if (counter.parentElement.querySelector('.stat-label')?.textContent.includes('Uptime')) {
                        counter.textContent = target + '%';
                    }
                }
            };

            updateCounter();
        });
    }

    // ===== INTERSECTION OBSERVER PARA ANIMACIONES =====
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animar contadores si es la sección de stats
                if (entry.target.classList.contains('hero-stats-compact') || 
                    entry.target.classList.contains('stats-grid')) {
                    animateCounters();
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar elementos para animación
    const animateElements = document.querySelectorAll('.hero-stats-compact, .stats-grid, .location-detail-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    // ===== MONITOR DE RED EN TIEMPO REAL (SIMULADO) =====
    function updateNetworkMonitor() {
        const activeServers = document.getElementById('activeServers');
        const avgLatency = document.getElementById('avgLatency');
        const blockedAttacks = document.getElementById('blockedAttacks');
        const dataTransfer = document.getElementById('dataTransfer');
        
        if (activeServers) {
            setInterval(() => {
                const current = parseInt(activeServers.textContent);
                const change = Math.floor(Math.random() * 5) - 2;
                activeServers.textContent = Math.max(120, Math.min(135, current + change));
            }, 5000);
        }
        
        if (avgLatency) {
            setInterval(() => {
                const latency = 8 + Math.floor(Math.random() * 4);
                avgLatency.textContent = latency + 'ms';
            }, 3000);
        }
        
        if (blockedAttacks) {
            setInterval(() => {
                const current = parseInt(blockedAttacks.textContent);
                if (Math.random() > 0.7) {
                    blockedAttacks.textContent = current + 1;
                }
            }, 10000);
        }
        
        if (dataTransfer) {
            setInterval(() => {
                const current = parseFloat(dataTransfer.textContent);
                dataTransfer.textContent = (current + 0.1).toFixed(1) + 'TB';
            }, 8000);
        }
    }

    updateNetworkMonitor();

    // ===== EFECTOS DE PARALAJE =====
    window.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        
        const mapContainer = document.querySelector('.world-map-container');
        if (mapContainer && window.innerWidth > 768) {
            mapContainer.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
        }
    });

    // ===== PERFORMANCE BARS ANIMADAS =====
    function animatePerformanceBars() {
        const perfBars = document.querySelectorAll('.perf-fill');
        perfBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }

    // Animar barras cuando las cards son visibles
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animatePerformanceBars();
            }
        });
    }, { threshold: 0.5 });

    cards.forEach(card => cardObserver.observe(card));

    console.log('%c🚀 Neovex Hosting - Ubicaciones Mejoradas', 'color: #9F53FF; font-size: 20px; font-weight: bold;');
    console.log('%c✨ Sistema interactivo cargado correctamente', 'color: #4ADE80; font-size: 14px;');
});

// Agregar estilos de notificación al DOM
if (!document.getElementById('notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }

        .notification-content {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        
        .notification-icon {
            font-size: 24px;
            font-weight: bold;
        }
        
        .notification-text {
            flex: 1;
            font-weight: 600;
            font-size: 15px;
        }

        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 28px;
            cursor: pointer;
            padding: 0;
            line-height: 1;
            opacity: 0.8;
            transition: opacity 0.2s ease;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 6px;
        }
        
        .notification-close:hover {
            opacity: 1;
            background: rgba(255, 255, 255, 0.1);
        }
        
        .spinner {
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}