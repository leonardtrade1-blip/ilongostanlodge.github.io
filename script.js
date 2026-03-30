/* ========================================
   ILONGOSTAN LODGE — Main JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules
  initNavbar();
  initScrollReveal();
  initParallax();
  initParticles();
  initLightbox();
  initVideoAutoplay();
  initSmoothScroll();
  initCounterAnimation();
});

/* ========================================
   NAVBAR
   ======================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navOverlay = document.querySelector('.nav-overlay');
  
  // Scroll effect
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
  
  // Mobile toggle
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
      if (navOverlay) navOverlay.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });
  }
  
  // Close on overlay click
  if (navOverlay) {
    navOverlay.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
      navOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
  
  // Close on link click (mobile)
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
        if (navOverlay) navOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
}

/* ========================================
   SCROLL REVEAL
   ======================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  
  if (!revealElements.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Once revealed, stop observing for performance
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  revealElements.forEach(el => observer.observe(el));
}

/* ========================================
   PARALLAX EFFECT
   ======================================== */
function initParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  if (!parallaxElements.length) return;
  
  let ticking = false;
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.pageYOffset;
        
        parallaxElements.forEach(el => {
          const speed = parseFloat(el.dataset.parallax) || 0.3;
          const offset = scrollY * speed;
          el.style.transform = `translateY(${offset}px)`;
        });
        
        ticking = false;
      });
      
      ticking = true;
    }
  });
}

/* ========================================
   FLOATING PARTICLES
   ======================================== */
function initParticles() {
  const container = document.querySelector('.hero-particles');
  if (!container) return;
  
  const particleCount = 30;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random position and timing
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 8 + 's';
    particle.style.animationDuration = (6 + Math.random() * 6) + 's';
    particle.style.width = (2 + Math.random() * 3) + 'px';
    particle.style.height = particle.style.width;
    
    container.appendChild(particle);
  }
}

/* ========================================
   LIGHTBOX — Photo Gallery
   ======================================== */
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;
  
  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const lightboxClose = lightbox.querySelector('.lightbox-close');
  const lightboxPrev = lightbox.querySelector('.lightbox-prev');
  const lightboxNext = lightbox.querySelector('.lightbox-next');
  const lightboxCounter = lightbox.querySelector('.lightbox-counter');
  
  const galleryItems = document.querySelectorAll('[data-lightbox]');
  let currentIndex = 0;
  let images = [];
  
  // Collect all lightbox images
  galleryItems.forEach((item, index) => {
    images.push(item.dataset.lightbox || item.src || item.querySelector('img')?.src);
    
    item.addEventListener('click', (e) => {
      e.preventDefault();
      currentIndex = index;
      openLightbox();
    });
  });
  
  function openLightbox() {
    lightboxImg.src = images[currentIndex];
    lightboxCounter.textContent = `${currentIndex + 1} / ${images.length}`;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateLightbox();
  }
  
  function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateLightbox();
  }
  
  function updateLightbox() {
    lightboxImg.style.opacity = 0;
    setTimeout(() => {
      lightboxImg.src = images[currentIndex];
      lightboxImg.style.opacity = 1;
      lightboxCounter.textContent = `${currentIndex + 1} / ${images.length}`;
    }, 200);
  }
  
  // Events
  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', prevImage);
  lightboxNext.addEventListener('click', nextImage);
  
  // Close on background click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    switch(e.key) {
      case 'Escape': closeLightbox(); break;
      case 'ArrowRight': nextImage(); break;
      case 'ArrowLeft': prevImage(); break;
    }
  });
}

/* ========================================
   VIDEO AUTOPLAY ON SCROLL
   ======================================== */
function initVideoAutoplay() {
  const videos = document.querySelectorAll('video[data-autoplay]');
  if (!videos.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const video = entry.target;
      if (entry.isIntersecting) {
        video.play().catch(() => {}); // Catch autoplay restrictions
      } else {
        video.pause();
      }
    });
  }, {
    threshold: 0.3
  });
  
  videos.forEach(video => observer.observe(video));
}

/* ========================================
   SMOOTH SCROLL
   ======================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ========================================
   COUNTER ANIMATION
   ======================================== */
function initCounterAnimation() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        const duration = 2000;
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // Ease out quart
          const eased = 1 - Math.pow(1 - progress, 4);
          const current = Math.floor(eased * target);
          
          el.textContent = current + (el.dataset.suffix || '');
          
          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            el.textContent = target + (el.dataset.suffix || '');
          }
        }
        
        requestAnimationFrame(updateCounter);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(el => observer.observe(el));
}

/* ========================================
   UTILITY: Preloader
   ======================================== */
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 600);
  }
});
