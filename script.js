// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
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
        },
        // Configuración responsiva
        breakpoints: {
            768: {
                spaceBetween: 30,
            },
            1024: {
                spaceBetween: 50,
            }
        }
    });

    // ========================================
    // LÓGICA DE FLIP CARDS
    // ========================================
    const flipCards = document.querySelectorAll('.flip-card');
    
    flipCards.forEach(card => {
        card.addEventListener('click', function() {
            // Toggle de la clase is-flipped
            this.classList.toggle('is-flipped');
            
            // Pausar autoplay de Swiper temporalmente cuando se interactúa con una tarjeta
            swiper.autoplay.stop();
            setTimeout(() => {
                swiper.autoplay.start();
            }, 3000);
        });
    });

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
        const particlesContainer = document.getElementById('particles-container');
        const particles = ['💖', '💕', '🌸', '✨', '🎨', '🎂', '🌹', '💝', '🦋', '⭐'];
        
        function createParticle() {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            particle.textContent = particles[Math.floor(Math.random() * particles.length)];
            
            // Posición inicial aleatoria en el eje X
            particle.style.left = Math.random() * 100 + '%';
            
            // Duración y retraso aleatorios para un efecto más natural
            const duration = Math.random() * 3 + 7; // Entre 7 y 10 segundos
            const delay = Math.random() * 2; // Hasta 2 segundos de retraso
            
            particle.style.animationDuration = duration + 's';
            particle.style.animationDelay = delay + 's';
            
            particlesContainer.appendChild(particle);
            
            // Eliminar la partícula después de que termine la animación
            setTimeout(() => {
                if (particle && particle.parentNode) {
                    particle.remove();
                }
            }, (duration + delay) * 1000);
        }
        
        // Crear partículas iniciales
        for (let i = 0; i < 10; i++) {
            setTimeout(createParticle, i * 500);
        }
        
        // Crear nuevas partículas cada cierto tiempo
        setInterval(createParticle, 2000);
    }
    
    // Iniciar las partículas
    createFloatingParticles();

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
    // MENSAJE DE CONSOLA ESPECIAL 💕
    // ========================================
    console.log('%c💖 ¡Feliz Cumpleaños, Natalia! 💖', 'color: #D8BFD8; font-size: 20px; font-weight: bold;');
    console.log('%cEsta página fue hecha con todo el amor del mundo para ti ✨', 'color: #87CEEB; font-size: 14px;');
    
});
