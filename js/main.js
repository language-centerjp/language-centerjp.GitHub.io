/* File: js/main.js */
document.addEventListener('DOMContentLoaded', function() {
  // Language Switcher
  const languageSelect = document.getElementById('languageSelect');
  if(languageSelect) {
    languageSelect.addEventListener('change', function(e) {
      const lang = e.target.value;
      let currentPage = window.location.pathname.split('/').pop();
      if(lang === 'en') {
        if(!currentPage.endsWith('-en.html')) {
          if(currentPage === '' || currentPage === 'index.html') {
            window.location.href = '/en/index-en.html';
          } else {
            let newPage = currentPage.replace('.html', '-en.html');
            window.location.href = '/en/' + newPage;
          }
        }
      } else {
        if(currentPage.includes('-en')) {
          let newPage = currentPage.replace('-en', '');
          window.location.href = '/ja/' + newPage;
        }
      }
    });
  }
});
