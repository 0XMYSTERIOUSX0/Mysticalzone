
/**
 * Back to Top Button Functionality
 */
function initBackToTopApp() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/**
 * Initialize Mobile Menu for App Page
 */
function initMobileMenuApp() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenu = document.getElementById('closeMenu');

    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    closeMenu.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.mobile-nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });
}

/**
 * FAQ Accordion Functionality
 */
function initFAQApp() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (!question || !answer) return;
        
        question.addEventListener('click', () => {
            const isOpen = question.getAttribute('aria-expanded') === 'true';
            
            // Close all other items
            faqItems.forEach(other => {
                if (other !== item) {
                    const otherQuestion = other.querySelector('.faq-question');
                    const otherAnswer = other.querySelector('.faq-answer');
                    if (otherQuestion && otherAnswer) {
                        otherQuestion.setAttribute('aria-expanded', 'false');
                        otherAnswer.classList.remove('active');
                    }
                }
            });
            
            // Toggle current item
            question.setAttribute('aria-expanded', !isOpen);
            answer.classList.toggle('active');
        });
    });
}

/**
 * Smooth Scroll Navigation
 */
function initSmoothScrollApp() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Intersection Observer for Fade-In Animations
 */
function initIntersectionObserverApp() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.animation = `slideUp 0.6s ease-out forwards`;
                    observer.unobserve(entry.target);
                }, index * 100);
            }
        });
    }, observerOptions);

    // Observe animated elements
    document.querySelectorAll('[data-animate], .app-feature-item, .carousel-slide').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Lazy Loading Images
 */
function initLazyLoadingApp() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

/**
 * Carousel Functionality for App Page
 */
function initCarouselApp() {
    const carouselContent = document.getElementById('carouselContent');
    const carouselPrev = document.getElementById('carouselPrev');
    const carouselNext = document.getElementById('carouselNext');
    const carouselIndicators = document.getElementById('carouselIndicators');

    if (!carouselContent) return;

    const items = carouselContent.querySelectorAll('.carousel-item');
    let currentIndex = 0;

    // Create indicators
    function createIndicators() {
        carouselIndicators.innerHTML = '';
        items.forEach((_, index) => {
            const indicator = document.createElement('button');
            indicator.className = 'indicator' + (index === 0 ? ' active' : '');
            indicator.setAttribute('aria-label', `Go to slide ${index + 1}`);
            indicator.addEventListener('click', () => goToSlide(index));
            carouselIndicators.appendChild(indicator);
        });
    }

    createIndicators();

    function updateCarousel() {
        // Hide all items
        items.forEach(item => item.classList.remove('active'));
        
        // Show current item
        items[currentIndex].classList.add('active');
        
        // Update indicators
        document.querySelectorAll('.indicator').forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = Math.max(0, Math.min(index, items.length - 1));
        updateCarousel();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % items.length;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateCarousel();
    }

    if (carouselPrev) carouselPrev.addEventListener('click', prevSlide);
    if (carouselNext) carouselNext.addEventListener('click', nextSlide);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (carouselContent && carouselContent.offsetParent !== null) {
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
        }
    });

    // Initialize carousel
    updateCarousel();
}

/**
 * Initialize all app page functionality
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('App page loaded successfully');
    initBackToTopApp();
    initMobileMenuApp();
    initFAQApp();
    initSmoothScrollApp();
    initIntersectionObserverApp();
    initLazyLoadingApp();
    initCarouselApp();
});


function secureDownload() {
    fetch('/app/generate_token.php')
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                window.location.href = '/app/download.php?token=' + data.token;
            } else {
                alert('Token generation failed');
            }
        })
        .catch(() => alert('Download error'));
}


