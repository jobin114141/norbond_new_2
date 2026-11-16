// Header scroll, Direction-aware hide/reveal, and Hero parallax effect
const header = document.getElementById('header');
const heroBg = document.querySelector('.hero-bg-wrapper');
const heroSection = document.getElementById('hero');

let lastScrollY = Math.max(0, window.scrollY);

window.addEventListener('scroll', () => {
    const currentScrollY = Math.max(0, window.scrollY);
    const heroHeight = heroSection ? heroSection.offsetHeight : window.innerHeight;

    // Header scrolled glass style
    if (currentScrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // After hero section: hide when scrolling down, show when scrolling up
    if (currentScrollY > heroHeight - 80) {
        if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 6) {
            // Scrolling down -> hide navbar
            header.classList.add('header-hidden');
        } else if (currentScrollY < lastScrollY && lastScrollY - currentScrollY > 6) {
            // Scrolling up -> reveal navbar
            header.classList.remove('header-hidden');
        }
    } else {
        // Within hero section -> always keep visible
        header.classList.remove('header-hidden');
    }

    // Parallax effect
    if (heroBg && currentScrollY < window.innerHeight) {
        heroBg.style.transform = `translateY(${currentScrollY * 0.4}px)`;
    }

    lastScrollY = currentScrollY;
}, { passive: true });

// Reveal on scroll logic
const revealElements = document.querySelectorAll('.reveal, .reveal-up');

const revealOnScroll = () => {
    revealElements.forEach(el => {
        const elTop = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elTop < windowHeight - 100) {
            el.classList.add('active');
        }
    });
};

// Initial check
revealOnScroll();

// Listen for scroll
window.addEventListener('scroll', revealOnScroll);

// Smooth scroll for nav links (handled by CSS, but good to have if manual control is needed)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Set active navigation link based on current page URL
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    let currentPath = window.location.pathname.split('/').pop();
    
    // Default to index.html if on the root path
    if (currentPath === '') {
        currentPath = 'index.html';
    }

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath) {
            link.classList.add('active');
        }
    });

    initSignatureAccordion();
    initTypographyProximity();
});

// Diverse Excellence - Expanding Cards Accordion
function initSignatureAccordion() {
    const accordion = document.getElementById('signatureAccordion');
    if (!accordion) return;

    const cards = accordion.querySelectorAll('.signature-card');
    if (!cards.length) return;

    cards.forEach((card) => {
        // When hovered over
        card.addEventListener('mouseenter', () => {
            cards.forEach(c => c.classList.remove('is-expanded'));
            card.classList.add('is-expanded');
        });

        // Also support click / tap for touch screens
        card.addEventListener('click', (e) => {
            if (e.target.closest('a')) return;
            cards.forEach(c => c.classList.remove('is-expanded'));
            card.classList.add('is-expanded');
        });
    });
}

// In case script runs after DOMContentLoaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initSignatureAccordion();
    initTypographyProximity();
}

// Typography Proximity Detection Effect
function initTypographyProximity() {
    const waveyuWrapper = document.getElementById('waveyuHugeTypography');
    if (!waveyuWrapper) return;

    const chars = waveyuWrapper.querySelectorAll('.wv-char');
    if (!chars.length) return;

    let mouseX = -9999;
    let mouseY = -9999;
    let isTicking = false;

    // Listen to mouse movement across the document
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (!isTicking) {
            requestAnimationFrame(updateTypographyProximity);
            isTicking = true;
        }
    }, { passive: true });

    // Touch support for touch devices
    const handleTouch = (e) => {
        if (e.touches && e.touches[0]) {
            mouseX = e.touches[0].clientX;
            mouseY = e.touches[0].clientY;
            if (!isTicking) {
                requestAnimationFrame(updateTypographyProximity);
                isTicking = true;
            }
        }
    };
    document.addEventListener('touchmove', handleTouch, { passive: true });
    document.addEventListener('touchstart', handleTouch, { passive: true });

    function updateTypographyProximity() {
        const PROXIMITY_RADIUS = 95;   // Radius in px around character center
        const EXTENDED_TOP_OFFSET = 75; // Detect cursor up to 75px above letter

        chars.forEach(char => {
            const rect = char.getBoundingClientRect();

            // Calculate center of character
            const charCenterX = rect.left + (rect.width / 2);
            const charCenterY = rect.top + (rect.height / 2);

            // Distance from cursor to character center
            const distX = mouseX - charCenterX;
            const distY = mouseY - charCenterY;
            const distance = Math.sqrt(distX * distX + distY * distY);

            // Check if cursor is within circular radius OR in the expanded box above letter
            const isAboveLetter = (
                mouseX >= rect.left - 50 &&
                mouseX <= rect.right + 50 &&
                mouseY >= rect.top - EXTENDED_TOP_OFFSET &&
                mouseY <= rect.bottom + 40
            );

            if (distance < PROXIMITY_RADIUS || isAboveLetter) {
                char.classList.add('active');
            } else {
                char.classList.remove('active');
            }
        });

        isTicking = false;
    }
}
