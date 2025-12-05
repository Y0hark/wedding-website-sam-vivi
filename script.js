// Wedding Website JavaScript - Samuel & Viviana
// Interactions, Animations, and Language Toggle

// ========================================
// GLOBAL STATE
// ========================================
let currentLang = 'fr';

// ========================================
// CUSTOM CURSOR
// ========================================
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    if (!cursor || !cursorFollower) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor animation
    function animateCursor() {
        // Main cursor follows directly
        cursorX += (mouseX - cursorX) * 0.9;
        cursorY += (mouseY - cursorY) * 0.9;
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;

        // Follower has delay
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px)`;

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Hide default cursor on mobile
    if ('ontouchstart' in window) {
        cursor.style.display = 'none';
        cursorFollower.style.display = 'none';
        document.body.style.cursor = 'auto';
    }
}

// ========================================
// STICKY NAVIGATION
// ========================================
function initStickyNav() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Hide navbar on scroll down, show on scroll up
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }

        lastScroll = currentScroll;
    });
}

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// SCROLL REVEAL ANIMATIONS
// ========================================
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after animation to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// ========================================
// LANGUAGE TOGGLE
// ========================================
function initLanguageToggle() {
    const langButtons = document.querySelectorAll('.lang-btn');

    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            if (lang !== currentLang) {
                switchLanguage(lang);

                // Update active button
                langButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            }
        });
    });
}

function switchLanguage(lang) {
    currentLang = lang;

    // Update HTML lang attribute
    document.documentElement.lang = lang;

    // Get all elements with translation
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        const translation = getNestedTranslation(translations[lang], key);

        if (translation) {
            // Check if element contains HTML tags
            if (element.innerHTML.includes('<')) {
                // For elements with strong tags, etc.
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = translation;
                element.textContent = tempDiv.textContent;
            } else {
                element.textContent = translation;
            }
        }
    });
}

// Helper function to get nested translation
function getNestedTranslation(obj, path) {
    return path.split('.').reduce((current, key) => current?.[key], obj);
}

// ========================================
// FAQ ACCORDION
// ========================================
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Toggle current item
            const isActive = item.classList.contains('active');

            // Close all items
            faqItems.forEach(i => i.classList.remove('active'));

            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// ========================================
// GALLERY LIGHTBOX
// ========================================
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img) {
                lightboxImg.src = img.src;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}

// ========================================
// PARALLAX EFFECT FOR HERO
// ========================================
function initParallax() {
    // Disable parallax on mobile and tablets for better performance
    if (window.innerWidth <= 968) {
        return;
    }

    const hero = document.querySelector('.hero');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;

        if (scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
}

// ========================================
// LAZY LOADING FOR IMAGES
// ========================================
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ========================================
// FORM VALIDATION (for future RSVP form)
// ========================================
function initFormValidation() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Validate required fields
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });

            if (isValid) {
                // Submit form or handle data
                console.log('Form is valid and ready to submit');
                // form.submit(); // Uncomment when ready
            }
        });
    });
}

// ========================================
// COUNTDOWN TIMER (Optional)
// ========================================
function initCountdown() {
    const weddingDate = new Date('2026-10-03T16:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Update countdown element if it exists
            const countdownElement = document.getElementById('countdown');
            if (countdownElement) {
                countdownElement.innerHTML = `
                    <div class="countdown-item">
                        <span class="countdown-number">${days}</span>
                        <span class="countdown-label">${currentLang === 'fr' ? 'Jours' : 'Días'}</span>
                    </div>
                    <div class="countdown-item">
                        <span class="countdown-number">${hours}</span>
                        <span class="countdown-label">${currentLang === 'fr' ? 'Heures' : 'Horas'}</span>
                    </div>
                    <div class="countdown-item">
                        <span class="countdown-number">${minutes}</span>
                        <span class="countdown-label">${currentLang === 'fr' ? 'Minutes' : 'Minutos'}</span>
                    </div>
                    <div class="countdown-item">
                        <span class="countdown-number">${seconds}</span>
                        <span class="countdown-label">${currentLang === 'fr' ? 'Secondes' : 'Segundos'}</span>
                    </div>
                `;
            }
        } else {
            const countdownElement = document.getElementById('countdown');
            if (countdownElement) {
                countdownElement.innerHTML = currentLang === 'fr'
                    ? "C'est aujourd'hui !"
                    : "¡Es hoy!";
            }
        }
    }

    // Update every second
    setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call
}

// ========================================
// DETECT USER LANGUAGE PREFERENCE
// ========================================
function detectLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;

    // Check if browser is set to Spanish
    if (browserLang.startsWith('es')) {
        currentLang = 'es';

        // Update active button
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === 'es') {
                btn.classList.add('active');
            }
        });

        // Switch to Spanish
        switchLanguage('es');
    }
}

// ========================================
// ADD HOVER EFFECTS TO CARDS
// ========================================
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.info-card, .timeline-content, .photo-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
}

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================
function initPerformanceOptimizations() {
    // Defer non-critical CSS
    const styleSheets = document.querySelectorAll('link[rel="stylesheet"]');
    styleSheets.forEach(sheet => {
        if (!sheet.hasAttribute('media')) {
            sheet.setAttribute('media', 'print');
            sheet.onload = function () {
                sheet.setAttribute('media', 'all');
            };
        }
    });

    // Preload important images
    const heroImages = document.querySelectorAll('.hero img, .about-photos img');
    heroImages.forEach(img => {
        if (img.dataset.src) {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = img.dataset.src;
            document.head.appendChild(link);
        }
    });
}

// ========================================
// ACCESSIBILITY ENHANCEMENTS
// ========================================
function initAccessibility() {
    // Add skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#about';
    skipLink.className = 'skip-to-content';
    skipLink.textContent = currentLang === 'fr' ? 'Aller au contenu' : 'Ir al contenido';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background: var(--navy-blue);
        color: white;
        padding: 8px;
        z-index: 10000;
        text-decoration: none;
    `;
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '0';
    });
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Ensure all interactive elements are keyboard accessible
    const interactiveElements = document.querySelectorAll('button, a, [tabindex]');
    interactiveElements.forEach(el => {
        if (!el.hasAttribute('tabindex') && el.tagName !== 'A') {
            el.setAttribute('tabindex', '0');
        }
    });
}

// ========================================
// LOADING ANIMATION
// ========================================
function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1000);
    }
}

// ========================================
// INITIALIZE ALL FEATURES
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎉 Wedding Website Initialized - Samuel & Viviana');

    // Core functionality
    // initCustomCursor(); // Disabled per user feedback - cursor too slow and affects mouse speed
    initStickyNav();
    initSmoothScroll();
    initScrollReveal();
    initLanguageToggle();
    detectLanguage();

    // Interactive features
    initFAQ();
    initGalleryLightbox();
    initParallax();
    initLazyLoading();
    initCardHoverEffects();

    // Optional features
    // initCountdown(); // Uncomment if you add a countdown element
    // initFormValidation(); // Uncomment when RSVP form is ready

    // Enhancements
    initAccessibility();
    initPerformanceOptimizations();

    // Hide loader
    hideLoader();
});

// ========================================
// HANDLE PAGE VISIBILITY CHANGES
// ========================================
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is not visible
        console.log('Page hidden - pausing animations');
    } else {
        // Resume animations
        console.log('Page visible - resuming animations');
    }
});

// ========================================
// RESIZE HANDLER WITH DEBOUNCE
// ========================================
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        console.log('Window resized - recalculating layouts');
        // Add any resize-specific logic here
    }, 250);
});

// ========================================
// SERVICE WORKER FOR PWA (Optional)
// ========================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable PWA functionality
        // navigator.serviceWorker.register('/sw.js')
        //     .then(reg => console.log('Service Worker registered', reg))
        //     .catch(err => console.log('Service Worker registration failed', err));
    });
}
