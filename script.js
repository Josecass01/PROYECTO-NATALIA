// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // INICIALIZACIÓN DE AOS (ANIMATE ON SCROLL)
    // ========================================
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        offset: 100
    });
    
    // ========================================
    // MENSAJES ROMÁNTICOS ALEATORIOS
    // ========================================
    const romanticMessages = [
        "💕 Cada día contigo es una nueva aventura...",
        "✨ Tu sonrisa ilumina mi mundo entero",
        "🌸 Eres la razón de mi felicidad",
        "💖 Mi corazón late solo por ti",
        "🎨 Tu arte llena mi vida de color",
        "🌟 Eres mi estrella más brillante",
        "💝 Contigo el amor es real",
        "🦋 Tu belleza va más allá de lo físico",
        "🌹 Cada momento juntos es un regalo",
        "💫 Eres mi sueño hecho realidad",
        "🎭 Tu creatividad me fascina",
        "💐 Hueles a flores y a amor",
        "🎵 Tu voz es mi canción favorita",
        "🌈 Pintas mi vida de colores",
        "💞 Juntos somos infinitos"
    ];
    
    function showRomanticMessage() {
        // Reducir frecuencia en dispositivos móviles para mejor rendimiento
        if (window.innerWidth < 768 && Math.random() < 0.3) return;
        
        const container = document.getElementById('romantic-messages');
        const message = document.createElement('div');
        message.className = 'romantic-message';
        message.textContent = romanticMessages[Math.floor(Math.random() * romanticMessages.length)];
        
        // Posición ajustada para diferentes tamaños de pantalla
        let leftPos, topPos;
        if (window.innerWidth < 768) {
            // En móviles, posiciones más centradas para evitar interferir con el contenido
            leftPos = Math.random() * 60 + 20; // 20% a 80%
            topPos = Math.random() * 40 + 30; // 30% a 70%
        } else {
            // En desktop, posiciones más variadas
            leftPos = Math.random() * 80 + 10; // 10% a 90%
            topPos = Math.random() * 60 + 20; // 20% a 80%
        }
        
        message.style.left = leftPos + '%';
        message.style.top = topPos + '%';
        
        // Asegurar que no interfiera con elementos interactivos en móviles
        message.style.pointerEvents = 'none';
        message.style.zIndex = window.innerWidth < 768 ? '50' : '100';
        
        container.appendChild(message);
        
        // Animación de aparición
        setTimeout(() => message.classList.add('show'), 100);
        
        // Remover después de un tiempo ajustado según el dispositivo
        const displayTime = window.innerWidth < 768 ? 3000 : 4000;
        setTimeout(() => {
            message.classList.remove('show');
            setTimeout(() => message.remove(), 500);
        }, displayTime);
    }
    
    // Mostrar mensajes con frecuencia ajustada según el dispositivo
    const messageInterval = window.innerWidth < 768 ? 12000 : 8000; // Menos frecuente en móviles
    setInterval(showRomanticMessage, messageInterval);
    // Mostrar el primero después de un delay inicial
    setTimeout(showRomanticMessage, window.innerWidth < 768 ? 3000 : 2000);

    // ========================================
    // SISTEMA DE PLAYLIST AUTOMÁTICO
    // ========================================
    let currentTrackIndex = 0;
    let isPlaying = false;
    let currentAudio = null;
    const tracks = [];
    
    // Recopilar todos los audios de las tarjetas
    document.querySelectorAll('.flip-card-back audio').forEach((audio, index) => {
        tracks.push({
            element: audio,
            index: index,
            title: audio.parentElement.querySelector('p').textContent
        });
    });
    
    // Función para reproducir siguiente canción automáticamente
    function playNextTrack() {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }
        
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        currentAudio = tracks[currentTrackIndex].element;
        
        // Intentar reproducir con manejo de errores
        currentAudio.play().then(() => {
            isPlaying = true;
            showTrackNotification(tracks[currentTrackIndex].title);
        }).catch(error => {
            console.log('Error al reproducir siguiente pista:', error);
            isPlaying = false;
        });
    }
    
    // Función para mostrar notificación de canción
    function showTrackNotification(title) {
        const notification = document.createElement('div');
        notification.className = 'track-notification';
        notification.innerHTML = `🎵 Reproduciendo: ${title}`;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // Configurar eventos de audio
    tracks.forEach(track => {
        track.element.addEventListener('ended', playNextTrack);
        track.element.addEventListener('play', function() {
            // Pausar otros audios cuando uno empiece
            tracks.forEach(otherTrack => {
                if (otherTrack.element !== this) {
                    otherTrack.element.pause();
                }
            });
            currentAudio = this;
            currentTrackIndex = track.index;
            isPlaying = true;
        });
        
        track.element.addEventListener('pause', function() {
            if (currentAudio === this) {
                isPlaying = false;
            }
        });
    });
    
    // ========================================
    // CONTROLES GLOBALES DEL REPRODUCTOR
    // ========================================
    const globalPlayBtn = document.getElementById('global-play');
    const globalPauseBtn = document.getElementById('global-pause');
    
    if (globalPlayBtn) {
        globalPlayBtn.addEventListener('click', function() {
            if (tracks.length > 0) {
                if (!currentAudio || currentAudio.paused) {
                    if (!currentAudio) {
                        currentAudio = tracks[0].element;
                        currentTrackIndex = 0;
                    }
                    // Intentar reproducir con manejo de errores
                    currentAudio.play().then(() => {
                        showTrackNotification(tracks[currentTrackIndex].title);
                    }).catch(error => {
                        console.log('Error al reproducir audio:', error);
                        showTrackNotification('⚠️ Error al reproducir. Intenta hacer click en el reproductor.');
                    });
                }
            }
        });
    }
    
    if (globalPauseBtn) {
        globalPauseBtn.addEventListener('click', function() {
            tracks.forEach(track => {
                track.element.pause();
            });
            if (currentAudio) {
                currentAudio.pause();
            }
        });
    }

    // ========================================
    // INICIALIZACIÓN DE SWIPER.JS
    // ========================================
    const swiper = new Swiper('.swiper', {
        effect: 'cards',
        grabCursor: true,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        // Configuración responsiva mejorada
        breakpoints: {
            320: {
                spaceBetween: 10,
                centeredSlides: true,
                slidesPerView: 1,
            },
            480: {
                spaceBetween: 15,
                centeredSlides: true,
            },
            768: {
                spaceBetween: 30,
                centeredSlides: true,
            },
            1024: {
                spaceBetween: 50,
                centeredSlides: true,
            }
        },
        // Ajustes para touch en móviles
        touchRatio: 1,
        touchAngle: 45,
        touchReleaseOnEdges: true,
        // Mejor rendimiento en móviles
        freeMode: false,
        freeModeSticky: true,
        watchSlidesProgress: true,
        // Personalización para dispositivos móviles
        on: {
            init: function() {
                // Ocultar navegación en pantallas pequeñas
                if (window.innerWidth < 768) {
                    document.querySelector('.swiper-button-next').style.display = 'none';
                    document.querySelector('.swiper-button-prev').style.display = 'none';
                }
            },
            resize: function() {
                // Mostrar/ocultar navegación según el tamaño de pantalla
                const nextBtn = document.querySelector('.swiper-button-next');
                const prevBtn = document.querySelector('.swiper-button-prev');
                if (window.innerWidth < 768) {
                    nextBtn.style.display = 'none';
                    prevBtn.style.display = 'none';
                } else {
                    nextBtn.style.display = 'flex';
                    prevBtn.style.display = 'flex';
                }
            }
        }
    });

    // ========================================
    // LÓGICA DE FLIP CARDS (FUNCIONALIDAD ORIGINAL)
    // ========================================
    const flipCards = document.querySelectorAll('.flip-card');
    
    flipCards.forEach(card => {
        // Click en la tarjeta para flip (funcionalidad original)
        card.addEventListener('click', function() {
            // Toggle de la clase is-flipped
            this.classList.toggle('is-flipped');
            
            // Pausar autoplay de Swiper temporalmente cuando se interactúa con una tarjeta
            swiper.autoplay.stop();
            setTimeout(() => {
                swiper.autoplay.start();
            }, 3000);
        });
        
        // Doble click para abrir galería ampliada
        card.addEventListener('dblclick', function(e) {
            e.stopPropagation();
            const image = this.querySelector('img');
            const dedication = this.querySelector('.flip-card-back p').textContent;
            const audioSrc = this.querySelector('.flip-card-back audio source').src;
            const songTitle = this.querySelector('.flip-card-back p.text-xs').textContent;
            
            openImageModalWithDedication(image.src, image.alt, dedication, audioSrc, songTitle);
        });
    });
    
    // ========================================
    // MODAL DE IMAGEN EN PANTALLA COMPLETA CON DEDICATORIA
    // ========================================
    function openImageModalWithDedication(src, alt, dedication, audioSrc, songTitle) {
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="image-modal-content">
                <span class="image-modal-close">&times;</span>
                <img src="${src}" alt="${alt}" class="modal-image">
                <div class="image-modal-controls">
                    <button class="zoom-in">🔍+</button>
                    <button class="zoom-out">🔍-</button>
                    <button class="zoom-reset">⚪</button>
                    <button class="show-dedication" style="background: linear-gradient(135deg, #D8BFD8, #87CEEB);">💌 Ver Dedicatoria</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        const modalImage = modal.querySelector('.modal-image');
        const closeBtn = modal.querySelector('.image-modal-close');
        const zoomInBtn = modal.querySelector('.zoom-in');
        const zoomOutBtn = modal.querySelector('.zoom-out');
        const zoomResetBtn = modal.querySelector('.zoom-reset');
        const dedicationBtn = modal.querySelector('.show-dedication');
        
        let scale = 1;
        let showingDedication = false;
        
        // Cerrar modal
        function closeImageModal() {
            modal.classList.add('closing');
            setTimeout(() => {
                document.body.removeChild(modal);
                document.body.style.overflow = '';
            }, 300);
        }
        
        // Mostrar/ocultar dedicatoria
        function toggleDedication() {
            if (!showingDedication) {
                // Crear overlay de dedicatoria
                const dedicationOverlay = document.createElement('div');
                dedicationOverlay.className = 'dedication-overlay';
                dedicationOverlay.innerHTML = `
                    <div class="dedication-content">
                        <button class="dedication-close">&times;</button>
                        <div class="dedication-text">
                            <p class="text-lg md:text-xl mb-6">${dedication}</p>
                            <audio controls class="w-full max-w-sm mb-4">
                                <source src="${audioSrc}" type="audio/mpeg">
                                Tu navegador no soporta audio HTML5.
                            </audio>
                            <p class="text-sm opacity-75">${songTitle}</p>
                        </div>
                    </div>
                `;
                
                modal.appendChild(dedicationOverlay);
                
                // Eventos para cerrar dedicatoria
                const dedicationClose = dedicationOverlay.querySelector('.dedication-close');
                dedicationClose.addEventListener('click', () => {
                    dedicationOverlay.remove();
                    showingDedication = false;
                    dedicationBtn.textContent = '💌 Ver Dedicatoria';
                });
                
                dedicationOverlay.addEventListener('click', (e) => {
                    if (e.target === dedicationOverlay) {
                        dedicationOverlay.remove();
                        showingDedication = false;
                        dedicationBtn.textContent = '💌 Ver Dedicatoria';
                    }
                });
                
                showingDedication = true;
                dedicationBtn.textContent = '❌ Cerrar Dedicatoria';
                
                // Animación de entrada
                setTimeout(() => dedicationOverlay.classList.add('show'), 10);
            } else {
                const dedicationOverlay = modal.querySelector('.dedication-overlay');
                if (dedicationOverlay) {
                    dedicationOverlay.remove();
                }
                showingDedication = false;
                dedicationBtn.textContent = '💌 Ver Dedicatoria';
            }
        }
        
        // Eventos de cierre
        closeBtn.addEventListener('click', closeImageModal);
        modal.addEventListener('click', function(e) {
            if (e.target === modal) closeImageModal();
        });
        
        // Controles de zoom
        zoomInBtn.addEventListener('click', () => {
            scale += 0.2;
            modalImage.style.transform = `scale(${scale})`;
        });
        
        zoomOutBtn.addEventListener('click', () => {
            scale = Math.max(0.5, scale - 0.2);
            modalImage.style.transform = `scale(${scale})`;
        });
        
        zoomResetBtn.addEventListener('click', () => {
            scale = 1;
            modalImage.style.transform = `scale(${scale})`;
        });
        
        // Mostrar dedicatoria
        dedicationBtn.addEventListener('click', toggleDedication);
        
        // Zoom con rueda del mouse
        modalImage.addEventListener('wheel', function(e) {
            e.preventDefault();
            if (e.deltaY < 0) {
                scale += 0.1;
            } else {
                scale = Math.max(0.5, scale - 0.1);
            }
            this.style.transform = `scale(${scale})`;
        });
        
        // Animación de entrada
        setTimeout(() => modal.classList.add('show'), 10);
    }
    
    // Función original para modal simple (para mantener compatibilidad)
    function openImageModal(src, alt) {
        openImageModalWithDedication(src, alt, '', '', '');
    }

    // ========================================
    // LÓGICA DEL POPUP/MODAL
    // ========================================
    const openLetterBtn = document.getElementById('open-letter-btn');
    const letterModal = document.getElementById('letter-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    
    // Abrir modal
    openLetterBtn.addEventListener('click', function() {
        letterModal.classList.add('is-active');
        document.body.style.overflow = 'hidden'; // Prevenir scroll del body
    });
    
    // Cerrar modal con el botón X
    closeModalBtn.addEventListener('click', function() {
        closeModal();
    });
    
    // Cerrar modal haciendo clic fuera del contenido
    letterModal.addEventListener('click', function(e) {
        if (e.target === letterModal) {
            closeModal();
        }
    });
    
    // Cerrar modal con la tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && letterModal.classList.contains('is-active')) {
            closeModal();
        }
    });
    
    function closeModal() {
        letterModal.classList.remove('is-active');
        document.body.style.overflow = ''; // Restaurar scroll del body
        
        // Pausar audio del modal si está reproduciéndose
        const modalAudio = letterModal.querySelector('audio');
        if (modalAudio && !modalAudio.paused) {
            modalAudio.pause();
        }
    }

    // ========================================
    // GESTIÓN DE AUDIO
    // ========================================
    const allAudios = document.querySelectorAll('audio');
    
    allAudios.forEach(audio => {
        audio.addEventListener('play', function() {
            // Pausar todos los otros audios cuando uno empiece a reproducirse
            allAudios.forEach(otherAudio => {
                if (otherAudio !== this && !otherAudio.paused) {
                    otherAudio.pause();
                }
            });
        });
    });

    // ========================================
    // GENERACIÓN DE PARTÍCULAS FLOTANTES
    // ========================================
    function createFloatingParticles() {
        // Reducir partículas en dispositivos móviles para mejor rendimiento
        if (window.innerWidth < 768 && (Math.random() < 0.7)) return;
        
        const particlesContainer = document.getElementById('particles-container');
        const particles = ['💖', '💕', '🌸', '✨', '🎨', '🎂', '🌹', '💝', '🦋', '⭐'];
        
        function createParticle() {
            // Limitar número de partículas en móviles
            if (window.innerWidth < 768 && particlesContainer.children.length > 3) return;
            if (window.innerWidth >= 768 && particlesContainer.children.length > 8) return;
            
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            particle.textContent = particles[Math.floor(Math.random() * particles.length)];
            
            // Posición inicial aleatoria en el eje X
            particle.style.left = Math.random() * 100 + '%';
            
            // Duración ajustada según el dispositivo
            const baseDuration = window.innerWidth < 768 ? 5 : 7; // Más rápido en móviles
            const duration = Math.random() * 3 + baseDuration;
            const delay = Math.random() * 2;
            
            particle.style.animationDuration = duration + 's';
            particle.style.animationDelay = delay + 's';
            
            // Añadir will-change para mejor rendimiento
            particle.style.willChange = 'transform, opacity';
            
            particlesContainer.appendChild(particle);
            
            // Eliminar la partícula después de que termine la animación
            setTimeout(() => {
                if (particle && particle.parentNode) {
                    particle.style.willChange = 'auto'; // Limpiar will-change
                    particle.remove();
                }
            }, (duration + delay) * 1000);
        }
        
        // Crear partículas iniciales (menos en móviles)
        const initialParticles = window.innerWidth < 768 ? 3 : 10;
        for (let i = 0; i < initialParticles; i++) {
            setTimeout(createParticle, i * 500);
        }
        
        // Crear nuevas partículas con intervalos ajustados
        const particleInterval = window.innerWidth < 768 ? 4000 : 2000;
        setInterval(createParticle, particleInterval);
    }
    
    // Iniciar las partículas solo si no es un dispositivo con preferencia por movimiento reducido
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        createFloatingParticles();
    }

    // ========================================
    // ANIMACIONES DE ENTRADA
    // ========================================
    function observeElements() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, {
            threshold: 0.1
        });

        // Observar elementos que deben animarse al entrar en vista
        const elementsToObserve = document.querySelectorAll('h3, .swiper, section');
        elementsToObserve.forEach(el => observer.observe(el));
    }
    
    // Iniciar observador de animaciones
    observeElements();

    // ========================================
    // OPTIMIZACIÓN DE RENDIMIENTO
    // ========================================
    
    // Lazy loading para imágenes (si es necesario)
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // ========================================
    // SISTEMA DE PARTÍCULAS DE CORAZONES
    // ========================================
    
    function createHeartParticle() {
        const heart = document.createElement('div');
        heart.className = 'heart-particle';
        heart.innerHTML = '💖';
        
        // Posición aleatoria en el ancho de la pantalla
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
        heart.style.opacity = Math.random() * 0.8 + 0.2;
        heart.style.fontSize = (Math.random() * 10 + 15) + 'px';
        
        document.getElementById('particles-container').appendChild(heart);
        
        // Remover la partícula después de la animación
        heart.addEventListener('animationend', () => {
            heart.remove();
        });
    }
    
    // Crear partículas periódicamente
    setInterval(createHeartParticle, 800);
    
    // ========================================
    // EFECTOS VISUALES AVANZADOS Y PARALLAX
    // ========================================
    
    // Partículas más diversas
    function createAdvancedParticle() {
        const particles = ['💖', '💝', '🌸', '🦋', '✨', '💫', '🌟', '💕'];
        const particle = document.createElement('div');
        particle.className = 'advanced-particle';
        particle.innerHTML = particles[Math.floor(Math.random() * particles.length)];
        
        // Propiedades aleatorias
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 4 + 3) + 's';
        particle.style.opacity = Math.random() * 0.7 + 0.3;
        particle.style.fontSize = (Math.random() * 8 + 12) + 'px';
        particle.style.filter = `hue-rotate(${Math.random() * 60}deg)`;
        
        document.getElementById('particles-container').appendChild(particle);
        
        particle.addEventListener('animationend', () => {
            particle.remove();
        });
    }
    
    // Alternar entre partículas normales y avanzadas
    setInterval(() => {
        if (Math.random() > 0.5) {
            createHeartParticle();
        } else {
            createAdvancedParticle();
        }
    }, 600);
    
    // Parallax scrolling mejorado
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        const rate2 = scrolled * -0.3;
        
        // Fondo parallax
        const parallaxBg = document.querySelector('.parallax-bg');
        if (parallaxBg) {
            parallaxBg.style.transform = `translateY(${rate}px)`;
        }
        
        // Corazones flotantes
        const floatingHearts = document.querySelector('.floating-hearts');
        if (floatingHearts) {
            floatingHearts.style.transform = `translateY(${rate2}px)`;
        }
        
        // Elementos con atributo data-speed
        document.querySelectorAll('.parallax').forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
        
        ticking = false;
    }
    
    function requestParallaxUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestParallaxUpdate);
    
    // Efecto de hover mejorado en botones
    document.querySelectorAll('.btn-romantic, button').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) translateY(-2px)';
            this.style.boxShadow = '0 10px 30px rgba(216, 191, 216, 0.4)';
            createButtonSparkles(this);
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
            this.style.boxShadow = '';
        });
    });
    
    // Crear destellos en botones
    function createButtonSparkles(button) {
        for (let i = 0; i < 8; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'button-sparkle';
            sparkle.innerHTML = ['✨', '💫', '⭐', '🌟'][Math.floor(Math.random() * 4)];
            
            const rect = button.getBoundingClientRect();
            sparkle.style.position = 'fixed';
            sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
            sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '9999';
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 1200);
        }
    }
    
    // Efecto de mouse trail romántico
    let mouseTrail = [];
    const maxTrailLength = 10;
    
    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.8) { // Solo a veces para no saturar
            const trail = document.createElement('div');
            trail.className = 'mouse-trail';
            trail.innerHTML = ['💕', '💖', '✨'][Math.floor(Math.random() * 3)];
            trail.style.left = e.clientX + 'px';
            trail.style.top = e.clientY + 'px';
            
            document.body.appendChild(trail);
            mouseTrail.push(trail);
            
            if (mouseTrail.length > maxTrailLength) {
                const oldTrail = mouseTrail.shift();
                oldTrail.remove();
            }
            
            setTimeout(() => {
                trail.remove();
                mouseTrail = mouseTrail.filter(t => t !== trail);
            }, 800);
        }
    });
    
    // Parallax sutil en el scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Animación de entrada para elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                animationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar elementos para animaciones
    document.querySelectorAll('.fade-in-up, .swiper, .btn-romantic').forEach(el => {
        animationObserver.observe(el);
    });

    // ========================================
    // EFECTOS ESPECIALES
    // ========================================
    
    // Efecto de typing completado - remover borde del cursor
    setTimeout(() => {
        const typingElement = document.querySelector('.typing-animation');
        if (typingElement) {
            typingElement.style.borderRight = 'none';
        }
    }, 4000); // Después de que termine la animación de typing
    
    // Efecto de scroll suave para navegación (si se añaden enlaces internos)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ========================================
    // RESPONSIVE RESIZE HANDLER
    // ========================================
    let resizeTimer;
    window.addEventListener('resize', function() {
        // Debounce para evitar múltiples ejecuciones
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Limpiar partículas excesivas si se redimensiona a móvil
            const particlesContainer = document.getElementById('particles-container');
            if (window.innerWidth < 768 && particlesContainer.children.length > 3) {
                Array.from(particlesContainer.children).slice(3).forEach(particle => {
                    particle.remove();
                });
            }
            
            // Ajustar altura del swiper según el nuevo tamaño
            const swiperEl = document.querySelector('.swiper');
            if (swiperEl) {
                if (window.innerWidth < 480) {
                    swiperEl.style.height = '350px';
                } else if (window.innerWidth < 640) {
                    swiperEl.style.height = '450px';
                } else if (window.innerWidth < 768) {
                    swiperEl.style.height = '500px';
                } else if (window.innerWidth < 1024) {
                    swiperEl.style.height = '600px';
                } else {
                    swiperEl.style.height = '650px';
                }
            }
        }, 250);
    });

    // ========================================
    // MENSAJE DE CONSOLA ESPECIAL 💕
    // ========================================
    console.log('%c💖 ¡Feliz Cumpleaños, Natalia! 💖', 'color: #D8BFD8; font-size: 20px; font-weight: bold;');
    console.log('%cEsta página fue hecha con todo el amor del mundo para ti ✨', 'color: #87CEEB; font-size: 14px;');
    
});
