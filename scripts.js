/**
 * MysticalZone - Interactive JavaScript
 * Handles mobile menu, FAQ accordion, and interactive elements
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive elements
    initMobileMenu();
    initFAQ();
    initSmoothScroll();
    initIntersectionObserver();
    initBackToTop();
});

/**
 * Mobile Menu Functionality
 */
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenu = document.getElementById('closeMenu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
    const mobileCTAButtons = document.querySelectorAll('.mobile-cta-buttons .btn');

    // Toggle menu on hamburger click
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }

    // Close menu on close button click
    if (closeMenu) {
        closeMenu.addEventListener('click', function() {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    }

    // Close menu when clicking on a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });

    // Close menu when clicking CTA buttons
    mobileCTAButtons.forEach(button => {
        button.addEventListener('click', function() {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside of it
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = mobileMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);

        if (!isClickInsideMenu && !isClickOnHamburger && mobileMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });
}

/**
 * FAQ Accordion Functionality
 */
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            // Get the parent FAQ item and the answer
            const faqItem = this.closest('.faq-item');
            const answer = faqItem.querySelector('.faq-answer');
            const isExpanded = this.getAttribute('aria-expanded') === 'true';

            // Close all other open FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    const otherQuestion = item.querySelector('.faq-question');
                    const otherAnswer = item.querySelector('.faq-answer');
                    otherQuestion.setAttribute('aria-expanded', 'false');
                    otherAnswer.classList.remove('active');
                }
            });

            // Toggle the current item
            this.setAttribute('aria-expanded', !isExpanded);
            answer.classList.toggle('active');
        });
    });
}

/**
 * Smooth Scroll Behavior for Anchor Links
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            const href = this.getAttribute('href');

            // Don't prevent default for empty anchors
            if (href === '#') {
                return;
            }

            const target = document.querySelector(href);

            if (target) {
                event.preventDefault();

                // Get header height for offset calculation
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 0;

                // Calculate target position with offset
                const targetPosition = target.offsetTop - headerHeight;

                // Smooth scroll to target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Intersection Observer for Scroll Animations
 */
function initIntersectionObserver() {
    // Create observer options
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Create intersection observer
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add animation classes to elements as they come into view
                setTimeout(() => {
                    entry.target.classList.add('fade-in');
                }, index * 100); // Stagger animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all feature cards and boxes
    const elementsToObserve = document.querySelectorAll(
        '.feature-card, .hero-box, .faq-item, .about-content'
    );

    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Button Click Event Handlers
 * Add event listeners to all buttons for enhanced interactivity
 */
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        // Add ripple effect on click
        button.addEventListener('click', function(event) {
            // Create ripple element
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = event.clientX - rect.left - size / 2;
            const y = event.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });

        // Add feedback on hover
        button.addEventListener('mouseenter', function() {
            // Visual feedback is handled by CSS
        });
    });
});

/**
 * Active Link Indicator in Navigation
 */
document.addEventListener('DOMContentLoaded', function() {
    updateActiveLink();

    // Update active link on scroll
    window.addEventListener('scroll', updateActiveLink);

    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-links a');

        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const header = document.querySelector('.header');
            const headerHeight = header ? header.offsetHeight : 0;

            if (window.pageYOffset >= sectionTop - headerHeight - 50) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }
});

/**
 * Lazy Loading for Images (future proofing)
 */
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('lazy-loaded');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

/**
 * Add CSS for ripple effect animation
 */
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .nav-links a.active {
        color: var(--primary-color);
    }

    .nav-links a.active::after {
        width: 100%;
    }

    /* Ensure smooth transitions */
    * {
        --transition-base: 300ms ease-in-out;
    }
`;
document.head.appendChild(style);

/**
 * Form Validation Helpers (for future use)
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateForm(formData) {
    const errors = [];

    if (!formData.email || !validateEmail(formData.email)) {
        errors.push('Please enter a valid email address.');
    }

    if (!formData.message || formData.message.trim().length < 10) {
        errors.push('Message must be at least 10 characters long.');
    }

    return errors;
}

/**
 * Performance Monitoring
 */
if (window.performance && window.performance.navigation.type === 1) {
    console.log('Page reloaded');
}

// Log page performance metrics
window.addEventListener('load', function() {
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page load time: ' + pageLoadTime + 'ms');
    }
});

/**
 * Back to Top Button Functionality
 */
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');

    // Show/hide button on scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    // Scroll to top on button click
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * Keyboard Navigation Support
 */
document.addEventListener('keydown', function(event) {
    // Close mobile menu on Escape key
    if (event.key === 'Escape') {
        const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobileMenu');

        if (hamburger && mobileMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    }

    // Tab navigation for FAQ
    if (event.key === 'Tab') {
        const faqQuestions = document.querySelectorAll('.faq-question');
        faqQuestions.forEach(question => {
            question.style.outline = 'none'; // Remove default outline
        });
    }
});

/**
 * Track user interactions for analytics
 */
function trackEvent(eventName, eventData) {
    if (window.gtag) {
        gtag('event', eventName, eventData);
    }
    console.log(`Event tracked: ${eventName}`, eventData);
}

// Track CTA button clicks
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        const buttonText = this.textContent.trim();
        trackEvent('button_click', {
            button_text: buttonText
        });
    });
});

// Track navigation clicks
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function() {
        const href = this.getAttribute('href');
        trackEvent('navigation_click', {
            section: href
        });
    });
});

/**
 * Initialize all functionality
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('MysticalZone website loaded successfully');
    initLazyLoading();
});
