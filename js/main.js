class LanguageCenter {
  constructor() {
    this.initialize();
  }

  initialize() {
    this.setupEventListeners();
    this.updateViewport();
    this.initLanguageSwitcher();
  }

  setupEventListeners() {
    // Debounce resize events
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => this.updateViewport(), 250);
    });
    
    window.addEventListener('orientationchange', () => {
      this.updateViewport();
    });
  }

  updateViewport() {
    try {
      const vh = window.innerHeight * 0.01;
      const header = document.querySelector('header');
      
      if (header) {
        const headerHeight = header.offsetHeight;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
        document.documentElement.style.scrollPaddingTop = `${headerHeight}px`;
      }
    } catch (error) {
      console.error('Viewport update error:', error);
    }
  }

  initLanguageSwitcher() {
    const languageSelect = document.getElementById('languageSelect');
    if (!languageSelect) return;

    languageSelect.addEventListener('change', (e) => {
      const newLang = e.target.value;
      const currentPath = window.location.pathname;
      
      // Handle index pages differently
      if (currentPath.endsWith('index.html') || currentPath.endsWith('index-en.html')) {
        window.location.href = newLang === 'en' ? 'index-en.html' : 'index.html';
        return;
      }

      // Handle other pages
      const newPath = currentPath.replace(/(-en)?\.html$/, (match) => {
        return newLang === 'en' ? '-en.html' : '.html';
      });

      // Verify page existence before redirecting
      fetch(newPath, { method: 'HEAD' })
        .then(response => {
          if (response.ok) {
            window.location.href = newPath;
          } else {
            console.warn('Page not found, defaulting to index');
            window.location.href = newLang === 'en' ? 'index-en.html' : 'index.html';
          }
        })
        .catch(() => {
          window.location.href = newLang === 'en' ? 'index-en.html' : 'index.html';
        });
    });
  }
}

// Initialize with error handling
document.addEventListener('DOMContentLoaded', () => {
  try {
    new LanguageCenter();
  } catch (error) {
    console.error('Initialization error:', error);
  }
});
