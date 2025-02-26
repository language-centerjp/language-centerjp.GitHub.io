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
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => this.updateViewport(), 250);
    });
    
    window.addEventListener('orientationchange', () => this.updateViewport());
  }

  updateViewport() {
    try {
      const vh = window.innerHeight * 0.01;
      const header = document.querySelector('header');
      if (!header) return;

      const headerHeight = header.offsetHeight;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
      document.documentElement.style.scrollPaddingTop = `${headerHeight}px`;
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
      
      const redirect = (path) => {
        window.location.href = path;
        sessionStorage.setItem('langPref', newLang);
      };

      if (currentPath.endsWith('index.html') || currentPath.endsWith('index-en.html')) {
        redirect(newLang === 'en' ? 'index-en.html' : 'index.html');
        return;
      }

      const newPath = currentPath.replace(/(-en)?\.html$/, newLang === 'en' ? '-en.html' : '.html');
      
      fetch(newPath, { method: 'HEAD' })
        .then(response => response.ok ? redirect(newPath) : redirect('index.html'))
        .catch(() => redirect('index.html'));
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  try {
    new LanguageCenter();
  } catch (error) {
    console.error('Initialization error:', error);
  }
});
