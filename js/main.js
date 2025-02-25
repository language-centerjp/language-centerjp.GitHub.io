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
    window.addEventListener('resize', () => this.updateViewport());
    window.addEventListener('orientationchange', () => this.updateViewport());
    window.addEventListener('load', () => this.updateViewport());
  }

  updateViewport() {
    const vh = window.innerHeight * 0.01;
    const headerHeight = document.querySelector('header').offsetHeight;
    
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
    document.documentElement.style.scrollPaddingTop = `${headerHeight}px`;
  }

  initLanguageSwitcher() {
    const languageSelect = document.getElementById('languageSelect');
    if (!languageSelect) return;

    languageSelect.addEventListener('change', (e) => {
      const newLang = e.target.value;
      const currentPage = window.location.pathname.split('/').pop();
      let newPage = currentPage.replace(/(-en)?\.html$/, '');
      
      if (currentPage === 'index.html' || currentPage === 'index-en.html') {
        newPage = newLang === 'en' ? 'index-en.html' : 'index.html';
      } else {
        newPage += newLang === 'en' ? '-en.html' : '.html';
      }

      window.location.href = newPage;
    });
  }
}

// Initialize when ready
document.addEventListener('DOMContentLoaded', () => new LanguageCenter());
