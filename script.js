// Header scroll and Hero parallax effect
const header = document.getElementById('header');
const heroBg = document.querySelector('.hero-bg-wrapper');

window.addEventListener('scroll', () => {
  // Header effect
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  // Parallax effect
  const scrollValue = window.scrollY;
  if (heroBg && scrollValue < window.innerHeight) {
    heroBg.style.transform = `translateY(${scrollValue * 0.4}px)`;
  }
});

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
