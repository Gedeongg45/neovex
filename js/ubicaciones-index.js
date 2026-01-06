/**
 * ========================================
 * NEOVEX HOSTING - UBICACIONES SECTION (INDEX)
 * Interacciones minimalistas y elegantes
 * ========================================
 */

(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        
        // ===== SELECTORES =====
        const locationPins = document.querySelectorAll('.location-pin');
        const locationCards = document.querySelectorAll('.location-card');
        const actionButtons = document.querySelectorAll('.action-btn');
        const mapWrapper = document.querySelector('.seamless-map-wrapper');

        // ===== SINCRONIZACIÓN PINS Y CARDS =====
        function syncPinsAndCards() {
            locationPins.forEach(pin => {
                const location = pin.getAttribute('data-location');

                // Click en pin activa card
                pin.addEventListener('click', function() {
                    activateLocation(location);
                    createRippleEffect(this);
                });

                // Hover en pin resalta card
                pin.addEventListener('mouseenter', function() {
                    highlightCard(location, true);
                });

                pin.addEventListener('mouseleave', function() {
                    highlightCard(location, false);
                });
            });

            locationCards.forEach(card => {
                const location = card.getAttribute('data-location');

                // Click en card activa y hace scroll suave
                card.addEventListener('click', function() {
                    activateLocation(location);
                    highlightPin(location);
                });

                // Hover en card resalta pin
                card.addEventListener('mouseenter', function() {
                    highlightPin(location, true);
                });

                card.addEventListener('mouseleave', function() {
                    highlightPin(location, false);
                });
            });
        }

        // ===== ACTIVAR UBICACIÓN =====
        function activateLocation(location) {
            // Remover clase active de todas las cards
            locationCards.forEach(card => card.classList.remove('active'));

            // Agregar clase active a la card seleccionada
            const targetCard = document.querySelector(`.location-card[data-location="${location}"]`);
            if (targetCard) {
                targetCard.classList.add('active');

                // Scroll suave en móvil
                if (window.innerWidth < 768) {
                    setTimeout(() => {
                        targetCard.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'nearest' 
                        });
                    }, 100);
                }
            }

            // Feedback visual
            showToast(`📍 ${capitalizeLocation(location)} seleccionado`);
        }

        // ===== RESALTAR CARD =====
        function highlightCard(location, highlight = true) {
            const card = document.querySelector(`.location-card[data-location="${location}"]`);
            if (!card) return;

            if (highlight) {
                card.style.transform = 'translateY(-15px) scale(1.02)';
                card.style.borderColor = 'rgba(159, 83, 255, 0.8)';
                card.style.boxShadow = '0 20px 70px rgba(159, 83, 255, 0.4)';
            } else if (!card.classList.contains('active')) {
                card.style.transform = '';
                card.style.borderColor = '';
                card.style.boxShadow = '';
            }
        }

        // ===== RESALTAR PIN =====
        function highlightPin(location, highlight = true) {
            const pin = document.querySelector(`.location-pin[data-location="${location}"]`);
            if (!pin) return;

            if (highlight) {
                pin.style.transform = 'translate(-50%, -50%) scale(1.4)';
                pin.style.zIndex = '30';
                
                const pinDot = pin.querySelector('.pin-dot');
                if (pinDot) {
                    pinDot.style.transform = 'translate(-50%, -50%) scale(1.6)';
                }
            } else {
                pin.style.transform = '';
                pin.style.zIndex = '';
                
                const pinDot = pin.querySelector('.pin-dot');
                if (pinDot) {
                    pinDot.style.transform = '';
                }
            }
        }

        // ===== EFECTO RIPPLE =====
        function createRippleEffect(element) {
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 30px;
                height: 30px;
                border: 3px solid rgba(159, 83, 255, 0.9);
                border-radius: 50%;
                pointer-events: none;
                animation: ripple 1s cubic-bezier(0.34, 1.56, 0.64, 1);
                z-index: 25;
            `;

            element.appendChild(ripple);
            setTimeout(() => ripple.remove(), 1000);
        }

        // Agregar animación ripple
        if (!document.getElementById('ripple-animation')) {
            const style = document.createElement('style');
            style.id = 'ripple-animation';
            style.textContent = `
                @keyframes ripple {
                    0% {
                        width: 30px;
                        height: 30px;
                        opacity: 1;
                    }
                    100% {
                        width: 100px;
                        height: 100px;
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        // ===== BOTONES DE ACCIÓN =====
        function setupActionButtons() {
            actionButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.stopPropagation();

                    const card = this.closest('.location-card');
                    const location = card.getAttribute('data-location');

                    if (this.classList.contains('notify')) {
                        handleNotification(this, location);
                    } else {
                        handlePingTest(this, location);
                    }
                });
            });
        }

        // ===== MANEJADOR DE NOTIFICACIONES =====
        function handleNotification(button, location) {
            const originalText = button.textContent;
            
            button.innerHTML = `
                <svg style="animation: spin 1s linear infinite; display: inline-block; margin-right: 8px;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" stroke-width="3" opacity="0.25"/>
                    <path d="M12 2 A10 10 0 0 1 22 12" stroke-width="3" stroke-linecap="round"/>
                </svg>
                Registrando...
            `;
            button.disabled = true;

            setTimeout(() => {
                button.innerHTML = '✓ Te notificaremos';
                button.style.background = 'linear-gradient(135deg, rgba(74, 222, 128, 0.3), rgba(34, 197, 94, 0.3))';
                button.style.borderColor = 'rgba(74, 222, 128, 0.6)';
                
                showToast(`¡Perfecto! Te avisaremos cuando ${capitalizeLocation(location)} esté disponible 🎉`);
            }, 1500);
        }

        // ===== MANEJADOR DE PING TEST =====
        function handlePingTest(button, location) {
            const originalText = button.textContent;
            
            button.innerHTML = `
                <svg style="animation: spin 1s linear infinite; display: inline-block; margin-right: 8px;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" stroke-width="3" opacity="0.25"/>
                    <path d="M12 2 A10 10 0 0 1 22 12" stroke-width="3" stroke-linecap="round"/>
                </svg>
                Testeando...
            `;
            button.disabled = true;

            // Simular test de ping
            setTimeout(() => {
                const pingResults = {
                    miami: Math.floor(Math.random() * 4) + 8,    // 8-11ms
                    canada: Math.floor(Math.random() * 4) + 10,  // 10-13ms
                    brasil: 'N/A'
                };

                const ping = pingResults[location];
                
                if (ping !== 'N/A') {
                    showToast(`📡 Ping a ${capitalizeLocation(location)}: ${ping}ms - ¡Excelente conexión!`);
                    
                    // Actualizar el valor en la card
                    const card = button.closest('.location-card');
                    const msValue = card.querySelector('.ms-value');
                    if (msValue) {
                        msValue.textContent = ping + 'ms';
                        msValue.style.animation = 'none';
                        setTimeout(() => {
                            msValue.style.animation = '';
                        }, 10);
                    }
                }

                button.innerHTML = originalText;
                button.disabled = false;
            }, 2000);
        }

        // ===== SISTEMA DE TOAST =====
        function showToast(message) {
            // Remover toast anterior si existe
            const existingToast = document.querySelector('.location-toast');
            if (existingToast) {
                existingToast.remove();
            }

            const toast = document.createElement('div');
            toast.className = 'location-toast';
            toast.textContent = message;
            
            toast.style.cssText = `
                position: fixed;
                bottom: 30px;
                left: 50%;
                transform: translateX(-50%) translateY(100px);
                padding: 16px 28px;
                background: rgba(15, 10, 25, 0.95);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(159, 83, 255, 0.5);
                border-radius: 12px;
                color: #ffffff;
                font-weight: 600;
                font-size: 14px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);
                z-index: 10000;
                opacity: 0;
                transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
                pointer-events: none;
            `;

            document.body.appendChild(toast);

            // Animar entrada
            setTimeout(() => {
                toast.style.transform = 'translateX(-50%) translateY(0)';
                toast.style.opacity = '1';
            }, 10);

            // Remover después de 3 segundos
            setTimeout(() => {
                toast.style.transform = 'translateX(-50%) translateY(100px)';
                toast.style.opacity = '0';
                setTimeout(() => toast.remove(), 400);
            }, 3000);
        }

        // ===== EFECTO PARALLAX EN MAPA =====
        function setupMapParallax() {
            if (!mapWrapper || window.innerWidth < 768) return;

            let isHovering = false;

            mapWrapper.addEventListener('mouseenter', () => {
                isHovering = true;
            });

            mapWrapper.addEventListener('mouseleave', () => {
                isHovering = false;
                mapWrapper.style.transform = '';
            });

            window.addEventListener('mousemove', (e) => {
                if (!isHovering) return;

                const rect = mapWrapper.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;

                const moveX = x * 15;
                const moveY = y * 15;

                mapWrapper.style.transform = `translateX(${moveX}px) translateY(${moveY}px) scale(1.02)`;
            });
        }

        // ===== ACTUALIZAR LATENCIAS EN TIEMPO REAL =====
        function updateLatencies() {
            setInterval(() => {
                locationCards.forEach(card => {
                    const location = card.getAttribute('data-location');
                    if (location === 'brasil') return; // Skip upcoming location

                    const msValue = card.querySelector('.ms-value');
                    if (!msValue || !msValue.textContent.includes('ms')) return;

                    const basePing = location === 'miami' ? 9 : 12;
                    const variation = Math.floor(Math.random() * 3) - 1;
                    const newPing = basePing + variation;

                    msValue.textContent = newPing + 'ms';
                });
            }, 8000);
        }

        // ===== INTERSECTION OBSERVER PARA ANIMACIONES =====
        function setupIntersectionObserver() {
            const observerOptions = {
                threshold: 0.2,
                rootMargin: '0px 0px -100px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            // Observar elementos
            const elementsToAnimate = document.querySelectorAll('.location-card, .seamless-map-wrapper');
            elementsToAnimate.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                observer.observe(el);
            });
        }

        // ===== HELPER: CAPITALIZAR NOMBRE DE UBICACIÓN =====
        function capitalizeLocation(location) {
            const names = {
                miami: 'Miami',
                canada: 'Canadá',
                brasil: 'Brasil'
            };
            return names[location] || location;
        }

        // ===== AGREGAR SPINNER CSS =====
        if (!document.getElementById('spinner-animation')) {
            const style = document.createElement('style');
            style.id = 'spinner-animation';
            style.textContent = `
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }

        // ===== INICIALIZAR TODO =====
        function init() {
            console.log('%c🗺️ Locations Section - Inicializando...', 'color: #9F53FF; font-weight: bold;');
            
            syncPinsAndCards();
            setupActionButtons();
            setupMapParallax();
            updateLatencies();
            setupIntersectionObserver();

            // Activar Miami por defecto
            setTimeout(() => {
                activateLocation('miami');
            }, 500);

            console.log('%c✨ Locations Section - Cargado exitosamente', 'color: #4ADE80; font-weight: bold;');
        }

        init();
    });

})();