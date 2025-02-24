// main.js - Universal Functionality

document.addEventListener('DOMContentLoaded', function() {
  // ========== Viewport Height Fix ==========
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  window.addEventListener('resize', () => {
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });

  // ========== Smooth Scroll ==========
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if(target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ========== Language Switcher ==========
  const languageSelect = document.getElementById('languageSelect');
  if(languageSelect) {
    const currentPage = window.location.pathname.split('/').pop();
    languageSelect.value = document.documentElement.lang;

    languageSelect.addEventListener('change', function() {
      const newLang = this.value;
      let newPage = currentPage;

      if(newLang === 'ja') {
        newPage = currentPage.includes('-en') ? 
          currentPage.replace('-en.html', '.html') : 
          currentPage.replace('.html', '-en.html');
      } else {
        newPage = currentPage.includes('-en') ? 
          currentPage : 
          currentPage.replace('.html', '-en.html');
      }

      if(currentPage === 'index.html' || currentPage === '') {
        newPage = newLang === 'ja' ? 'index.html' : 'index-en.html';
      }

      window.location.href = newPage;
    });
  }

  // ========== Mobile Navigation Toggle ==========
  const nav = document.querySelector('.header-nav ul');
  if(window.innerWidth <= 576) {
    const toggle = document.createElement('button');
    toggle.className = 'nav-toggle';
    toggle.innerHTML = '☰';
    toggle.setAttribute('aria-label', 'Toggle navigation');
    document.querySelector('header').insertBefore(toggle, nav.parentElement);

    toggle.addEventListener('click', () => {
      nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    });

    window.addEventListener('resize', () => {
      if(window.innerWidth > 576) {
        nav.style.display = 'flex';
      }
    });
  }

  // ========== Placeholder Initializations ==========
  // Initialize sliders
  if(document.querySelector('.testimonial-slider')) {
    // Slider initialization code here
  }

  // Initialize maps
  if(document.querySelector('#map')) {
    // Map initialization code here
  }

  // Form validation
  if(document.querySelector('form')) {
    // Form validation code here
  }
});
