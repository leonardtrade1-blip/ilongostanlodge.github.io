/* ========================================
   ILONGOSTAN LODGE — Main JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules
  initNavbar();
  initScrollReveal();
  initParallax();
  initParticles();
  initMediaExperience();
  initSmoothScroll();
  initCounterAnimation();
  initRoomExplorer();
  initResponsiveUI();
});

// Global YouTube Handler for "Native" Feel
function playYoutube(containerId, videoId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  const poster = container.querySelector('.video-overlay');
  const playerArea = container.querySelector('.yt-player-container');
  
  if (playerArea) {
    playerArea.innerHTML = `
      <iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1" 
        allow="autoplay; fullscreen" 
        allowfullscreen></iframe>
    `;
    container.classList.add('playing');
    if (poster) poster.classList.add('hidden');
  }
}
window.playYoutube = playYoutube;

/* ========================================
   UNIFIED MEDIA EXPERIENCE (TOUR & ROOMS)
   ======================================== */
function initMediaExperience() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector('.lightbox-img');
  
  // 1. Image Lightbox (Delegation for perfection + dynamic content)
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-full-view], [data-lightbox]');
    if (!trigger) return;

    e.preventDefault();
    const src = trigger.getAttribute('data-full-view') || trigger.getAttribute('data-lightbox');
    if (src) {
      lightboxImg.src = src;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });

  // 2. Performance: Memory Management (Cleanup after closing)
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
      setTimeout(() => { lightboxImg.src = ''; }, 400); 
    }
  });
}

/* ========================================
   ROOM EXPLORER — Dynamic Interaction
   ======================================== */
function initRoomExplorer() {
  const explorerContainer = document.querySelector('.room-explorer');
  if (!explorerContainer) return;

  const tabs = document.querySelectorAll('.explorer-tab');
  const heroImage = document.getElementById('heroImage');
  const heroCounter = document.getElementById('heroCounter');
  const thumbStrip = document.getElementById('explorerThumbs');
  const title = document.getElementById('roomTitle');
  const desc = document.getElementById('roomDesc');
  const categoryBadge = document.getElementById('roomCategory');
  const imageCountEl = document.getElementById('roomImageCount');
  const prevBtn = document.getElementById('heroPrev');
  const nextBtn = document.getElementById('heroNext');
  const fullscreenBtn = document.getElementById('heroFullscreen');

  let currentImages = [];
  let currentIndex = 0;

  const roomData = {
    standard: {
      title: "Standard Room",
      category: "STANDARD",
      desc: "Our standard rooms offer elegant design and premium furniture at an affordable price. Experience the ILONGOSTAN standard of comfort with handcrafted dark wood furniture and premium bedding.",
      ytId: "kIR3uH8tgv4",
      images: [
        "rooms explore/STANDARD/ROOM PICS FOR STANDARD ROOMS/20260401_093044.jpg",
        "rooms explore/STANDARD/ROOM PICS FOR STANDARD ROOMS/20260401_093109.jpg",
        "rooms explore/STANDARD/ROOM PICS FOR STANDARD ROOMS/20260401_093135.jpg"
      ],
      features: [
        { icon: "🛏️", label: "Premium Bed", detail: "King-size comfort" },
        { icon: "❄️", label: "Climate Control", detail: "Split AC system" },
        { icon: "🚿", label: "Private Bath", detail: "Stone-finished" },
        { icon: "✨", label: "Luxury Finish", detail: "Dark wood & stone" }
      ]
    },
    executive: {
      title: "Executive Suite",
      category: "EXECUTIVE",
      desc: "Superior furniture and spacious sizing for those who prioritize both business and relaxation. Designed for the modern professional with elegant views and premium finishes throughout.",
      ytId: "gWdzuTZ27a4",
      images: [
        "rooms explore/DELUXE/EXECUTIVE/ROOM PICS FOR EXECUTIVE ROOM/20260401_092037.jpg",
        "rooms explore/DELUXE/EXECUTIVE/ROOM PICS FOR EXECUTIVE ROOM/20260401_092042.jpg",
        "rooms explore/DELUXE/EXECUTIVE/ROOM PICS FOR EXECUTIVE ROOM/20260401_092100.jpg",
        "rooms explore/DELUXE/EXECUTIVE/ROOM PICS FOR EXECUTIVE ROOM/20260401_092116.jpg",
        "rooms explore/DELUXE/EXECUTIVE/ROOM PICS FOR EXECUTIVE ROOM/20260401_092122.jpg",
        "rooms explore/DELUXE/EXECUTIVE/ROOM PICS FOR EXECUTIVE ROOM/20260401_092214.jpg",
        "rooms explore/DELUXE/EXECUTIVE/ROOM PICS FOR EXECUTIVE ROOM/20260401_092235.jpg",
        "rooms explore/DELUXE/EXECUTIVE/ROOM PICS FOR EXECUTIVE ROOM/20260401_092258.jpg",
        "rooms explore/DELUXE/EXECUTIVE/ROOM PICS FOR EXECUTIVE ROOM/20260401_092330.jpg"
      ],
      features: [
        { icon: "🛏️", label: "Executive Bed", detail: "Oversized king" },
        { icon: "💼", label: "Work Desk", detail: "Business ready" },
        { icon: "🚿", label: "Rain Shower", detail: "Premium fixtures" },
        { icon: "🪟", label: "Elegant Views", detail: "Panoramic windows" }
      ]
    },
    king: {
      title: "Royal King Suite",
      category: "ROYAL · KING",
      desc: "Our most grand suite, featuring elegant views and furniture that redefined royalty. Experience the ultimate Ilongostan luxury with spacious design and meticulous craftsmanship.",
      ytId: "zT-iayLN3OM",
      images: [
        "rooms explore/DELUXE/ROYAL/KING/ROOM PICS FOR THE KING ROOM/20260401_093636.jpg",
        "rooms explore/DELUXE/ROYAL/KING/ROOM PICS FOR THE KING ROOM/20260401_093648.jpg",
        "rooms explore/DELUXE/ROYAL/KING/ROOM PICS FOR THE KING ROOM/20260401_093651.jpg",
        "rooms explore/DELUXE/ROYAL/KING/ROOM PICS FOR THE KING ROOM/20260401_093659.jpg",
        "rooms explore/DELUXE/ROYAL/KING/ROOM PICS FOR THE KING ROOM/20260401_093719.jpg",
        "rooms explore/DELUXE/ROYAL/KING/ROOM PICS FOR THE KING ROOM/20260401_093728.jpg",
        "rooms explore/DELUXE/ROYAL/KING/ROOM PICS FOR THE KING ROOM/20260401_093755.jpg",
        "rooms explore/DELUXE/ROYAL/KING/ROOM PICS FOR THE KING ROOM/20260401_093959.jpg",
        "rooms explore/DELUXE/ROYAL/KING/ROOM PICS FOR THE KING ROOM/20260401_094004.jpg",
        "rooms explore/DELUXE/ROYAL/KING/ROOM PICS FOR THE KING ROOM/20260401_094032.jpg",
        "rooms explore/DELUXE/ROYAL/KING/ROOM PICS FOR THE KING ROOM/20260401_094043.jpg",
        "rooms explore/DELUXE/ROYAL/KING/ROOM PICS FOR THE KING ROOM/20260401_094049.jpg",
        "rooms explore/DELUXE/ROYAL/KING/ROOM PICS FOR THE KING ROOM/20260401_094054.jpg",
        "rooms explore/DELUXE/ROYAL/KING/ROOM PICS FOR THE KING ROOM/20260401_094058.jpg"
      ],
      features: [
        { icon: "👑", label: "Royal Bed", detail: "Grand king suite" },
        { icon: "🏔️", label: "Grand Views", detail: "Panoramic skyline" },
        { icon: "🛁", label: "Luxury Bath", detail: "Spa-level design" },
        { icon: "💎", label: "Premium Suite", detail: "Crown jewel" }
      ]
    },
    prince: {
      title: "Royal Prince Room",
      category: "ROYAL · PRINCE",
      desc: "Discover elegant spacing and luxurious views. Every corner is crafted with sophisticated furniture and premium finishes. A room that embodies princely comfort and modern luxury.",
      ytId: "4LDvjx9NQ9k",
      images: [
        "rooms explore/DELUXE/ROYAL/PRINCE/PICTURES FOR THE PRINCE ROOM/20260401_091329.jpg",
        "rooms explore/DELUXE/ROYAL/PRINCE/PICTURES FOR THE PRINCE ROOM/20260401_091348.jpg",
        "rooms explore/DELUXE/ROYAL/PRINCE/PICTURES FOR THE PRINCE ROOM/20260401_091430.jpg",
        "rooms explore/DELUXE/ROYAL/PRINCE/PICTURES FOR THE PRINCE ROOM/20260401_091435.jpg",
        "rooms explore/DELUXE/ROYAL/PRINCE/PICTURES FOR THE PRINCE ROOM/20260401_091450.jpg",
        "rooms explore/DELUXE/ROYAL/PRINCE/PICTURES FOR THE PRINCE ROOM/20260401_091519.jpg",
        "rooms explore/DELUXE/ROYAL/PRINCE/PICTURES FOR THE PRINCE ROOM/20260401_091525.jpg",
        "rooms explore/DELUXE/ROYAL/PRINCE/PICTURES FOR THE PRINCE ROOM/20260401_091602.jpg",
        "rooms explore/DELUXE/ROYAL/PRINCE/PICTURES FOR THE PRINCE ROOM/20260401_091608.jpg",
        "rooms explore/DELUXE/ROYAL/PRINCE/PICTURES FOR THE PRINCE ROOM/20260401_091624.jpg",
        "rooms explore/DELUXE/ROYAL/PRINCE/PICTURES FOR THE PRINCE ROOM/20260401_091900.jpg"
      ],
      features: [
        { icon: "🤴", label: "Prince Suite", detail: "Elegant sizing" },
        { icon: "🪟", label: "Luxury Views", detail: "Scenic balcony" },
        { icon: "🚿", label: "Designer Bath", detail: "Backlit mirror" },
        { icon: "🎨", label: "Art Décor", detail: "Custom finishes" }
      ]
    },
    queen: {
      title: "Royal Queen Suite",
      category: "ROYAL · QUEEN",
      desc: "Elegant balcony views and a state-of-the-art bathroom design. Comfort meets a futuristic aesthetic for an unforgettable stay. The Queen Suite offers the perfect harmony of luxury and tranquility.",
      ytId: "nyjKFixFnhg",
      images: [
        "rooms explore/DELUXE/ROYAL/QUEEN/ROOM PICS FOR THE QUEEN ROOM/20260401_095940.jpg",
        "rooms explore/DELUXE/ROYAL/QUEEN/ROOM PICS FOR THE QUEEN ROOM/20260401_095943.jpg",
        "rooms explore/DELUXE/ROYAL/QUEEN/ROOM PICS FOR THE QUEEN ROOM/20260401_100005.jpg",
        "rooms explore/DELUXE/ROYAL/QUEEN/ROOM PICS FOR THE QUEEN ROOM/20260401_100012.jpg",
        "rooms explore/DELUXE/ROYAL/QUEEN/ROOM PICS FOR THE QUEEN ROOM/20260401_100023.jpg",
        "rooms explore/DELUXE/ROYAL/QUEEN/ROOM PICS FOR THE QUEEN ROOM/20260401_100029.jpg",
        "rooms explore/DELUXE/ROYAL/QUEEN/ROOM PICS FOR THE QUEEN ROOM/20260401_100044.jpg",
        "rooms explore/DELUXE/ROYAL/QUEEN/ROOM PICS FOR THE QUEEN ROOM/20260401_100054.jpg",
        "rooms explore/DELUXE/ROYAL/QUEEN/ROOM PICS FOR THE QUEEN ROOM/20260401_100103.jpg",
        "rooms explore/DELUXE/ROYAL/QUEEN/ROOM PICS FOR THE QUEEN ROOM/20260401_100108.jpg",
        "rooms explore/DELUXE/ROYAL/QUEEN/ROOM PICS FOR THE QUEEN ROOM/20260401_100127.jpg",
        "rooms explore/DELUXE/ROYAL/QUEEN/ROOM PICS FOR THE QUEEN ROOM/20260401_100131.jpg"
      ],
      features: [
        { icon: "👸", label: "Queen Suite", detail: "Luxury balcony" },
        { icon: "🌅", label: "Balcony View", detail: "Sunrise vista" },
        { icon: "🛁", label: "Spa Bath", detail: "Rainfall shower" },
        { icon: "✨", label: "Futuristic", detail: "State-of-the-art" }
      ]
    }
  };

  function navigateTo(index) {
    if (!currentImages.length) return;
    currentIndex = ((index % currentImages.length) + currentImages.length) % currentImages.length;
    
    // Fade transition
    heroImage.style.opacity = '0';
    setTimeout(() => {
      heroImage.src = currentImages[currentIndex];
      heroImage.onload = () => { heroImage.style.opacity = '1'; };
    }, 200);
    
    heroCounter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
    
    // Update active thumbnail
    thumbStrip.querySelectorAll('.thumb-item').forEach((t, i) => {
      t.classList.toggle('active', i === currentIndex);
    });
    
    // Scroll active thumbnail into view
    const activeThumb = thumbStrip.querySelector('.thumb-item.active');
    if (activeThumb) {
      activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }

  function updateDisplay(roomKey) {
    const data = roomData[roomKey];
    if (!data) return;

    const displayArea = document.querySelector('.explorer-content');
    displayArea.style.opacity = '0';
    displayArea.style.transform = 'translateY(12px)';
    
    setTimeout(() => {
      // Update text
      title.textContent = data.title;
      desc.textContent = data.desc;
      categoryBadge.textContent = data.category;
      
      // Update features
      const featuresEl = document.getElementById('roomFeatures');
      featuresEl.innerHTML = data.features.map(f => `
        <div class="room-feature">
          <span class="feature-icon">${f.icon}</span>
          <div>
            <span class="feature-label">${f.label}</span>
            <span class="feature-detail">${f.detail}</span>
          </div>
        </div>
      `).join('');

      // Update image count
      imageCountEl.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
        <span>${data.images.length} Photos</span> · 
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        <span>1 Video Tour</span>
      `;
      
      // Handle YouTube Video (Poster-First & Top-Crop)
      const videoContainer = document.getElementById('explorerVideoContainer');
      if (data.ytId && videoContainer) {
        // Use first image as poster
        const posterImg = data.images[0] || '';
        
        videoContainer.classList.remove('playing');
        videoContainer.innerHTML = `
          <div class="yt-responsive-wrap">
            <div class="video-overlay" onclick="playYoutube('explorerVideoContainer', '${data.ytId}')" style="background-image: url('${posterImg}');">
              <div class="play-icon-custom">▶</div>
            </div>
            <div class="yt-player-container"></div>
          </div>
        `;
      }

      // Set images & build thumbnails
      currentImages = data.images;
      currentIndex = 0;
      
      thumbStrip.innerHTML = '';
      data.images.forEach((imgSrc, idx) => {
        const thumb = document.createElement('div');
        thumb.className = 'thumb-item' + (idx === 0 ? ' active' : '');
        
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = `${data.title} - Photo ${idx + 1}`;
        // Don't use loading="lazy" to avoid opacity:0 CSS issue
        
        thumb.appendChild(img);
        thumb.addEventListener('click', () => navigateTo(idx));
        thumbStrip.appendChild(thumb);
      });

      // Set hero image
      if (data.images.length > 0) {
        heroImage.src = data.images[0];
        heroImage.style.opacity = '1';
        heroCounter.textContent = `1 / ${data.images.length}`;
      }

      displayArea.style.opacity = '1';
      displayArea.style.transform = 'translateY(0)';
    }, 350);
  }

  // Navigation buttons
  if (prevBtn) prevBtn.addEventListener('click', () => navigateTo(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => navigateTo(currentIndex + 1));
  
  // Fullscreen button — opens lightbox
  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', () => {
      const lightbox = document.getElementById('lightbox');
      const lightboxImg = lightbox?.querySelector('.lightbox-img');
      if (lightbox && lightboxImg && currentImages[currentIndex]) {
        lightboxImg.src = currentImages[currentIndex];
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    const explorer = document.querySelector('.room-explorer');
    if (!explorer) return;
    const rect = explorer.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isVisible) {
      if (e.key === 'ArrowLeft') navigateTo(currentIndex - 1);
      if (e.key === 'ArrowRight') navigateTo(currentIndex + 1);
    }
  });

  // Tab clicks
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const roomKey = tab.dataset.room;
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      updateDisplay(roomKey);
    });
  });

  // Initial load
  updateDisplay('standard');
}

/* ========================================
   MAP SWITCHER (Homepage)
   ======================================== */
function switchMap(branch) {
  const mapFrame = document.getElementById('mainContactMap');
  const items = document.querySelectorAll('.contact-item');
  if (!mapFrame) return;

  const maps = {
    dodoma: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.5855452285!2d35.74790781!3d-6.160475899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x184de50002b66217%3A0x30a03666a5d842d5!2sIlongostan%20lodge%20dodoma!5e0!3m2!1sen!2stz!4v1712000000000!5m2!1sen!2stz",
    dar: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.5!2d39.2244762!3d-6.8724553!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185c49dba0538c39%3A0x7a36e1cba854b90e!2sIlongostan%20lodge%20Dar%20es%20salaam.!5e0!3m2!1sen!2stz!4v1712000000000!5m2!1sen!2stz",
    mbeya: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15788.97!2d33.43341!3d-8.89448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1900a00041cc036f%3A0x798c1fc809b1be52!2sIlongostan%20lodge%20Mbeya!5e0!3m2!1sen!2stz!4v1711990000000!5m2!1sen!2stz"
  };

  // Switch Source
  mapFrame.style.opacity = '0.4';
  setTimeout(() => {
    mapFrame.src = maps[branch] || maps.dodoma;
    mapFrame.style.opacity = '1';
  }, 300);

  // Active Class Toggle
  items.forEach(item => {
    item.classList.remove('active');
    if (item.dataset.location === branch) item.classList.add('active');
  });
}

// Attach to window for the onclick handler in HTML
window.switchMap = switchMap;

/* ========================================
   RESPONSIVE UI & INTELLIGENCE
   ======================================== */
function initResponsiveUI() {
  const detectUI = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Add orientation classes
    if (width > height) {
      document.body.classList.add('landscape');
      document.body.classList.remove('portrait');
    } else {
      document.body.classList.add('portrait');
      document.body.classList.remove('landscape');
    }
  };

  window.addEventListener('resize', detectUI);
  detectUI();
}

/* ========================================
   NAVBAR
   ======================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }
  
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });
  }
}

/* ========================================
   SCROLL REVEAL (Optimized)
   ======================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  revealElements.forEach(el => observer.observe(el));
}

/* ========================================
   PARALLAX
   ======================================== */
function initParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  if (!parallaxElements.length) return;
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    parallaxElements.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.3;
      el.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
}

/* ========================================
   PARTICLES (Performance Optimized)
   ======================================== */
function initParticles() {
  const container = document.querySelector('.hero-particles');
  if (!container) return;
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < 15; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDelay = Math.random() * 5 + 's';
    fragment.appendChild(p);
  }
  container.appendChild(fragment);
}

/* ========================================
   UTILITY
   ======================================== */
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.style.opacity = '0';
    setTimeout(() => preloader.style.display = 'none', 600);
  }
});

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      if (this.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

function initCounterAnimation() {
  const counters = document.querySelectorAll('[data-count]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        let current = 0;
        const step = target / 50;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            el.textContent = target + (el.dataset.suffix || '');
            clearInterval(timer);
          } else {
            el.textContent = Math.floor(current) + (el.dataset.suffix || '');
          }
        }, 30);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}
