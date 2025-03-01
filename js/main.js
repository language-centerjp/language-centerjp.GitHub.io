document.addEventListener('DOMContentLoaded', function() {
  // Fixed Language Switcher ===============
  const languageSelect = document.getElementById('languageSelect');
  if (languageSelect) {
    languageSelect.addEventListener('change', function(e) {
      const lang = e.target.value;
      const currentPath = window.location.pathname;
      
      // CORRECTED REGEX PATTERN (THIS IS THE FIX)
      const newPath = currentPath.replace(/(-en|\.html)/g, lang === 'en' ? '-en.html' : '.html');
      
      window.location.href = newPath;
    });
  }

  // Mobile Menu (unchanged) ================
  const navContainer = document.querySelector('.header-nav');
  const mobileMenuButton = document.createElement('button');
  mobileMenuButton.innerHTML = '☰';
  mobileMenuButton.classList.add('mobile-menu-toggle');
  navContainer.prepend(mobileMenuButton);

  mobileMenuButton.addEventListener('click', function(e) {
    e.stopPropagation();
    document.querySelector('.header-nav ul').classList.toggle('active');
  });

  document.addEventListener('click', function(e) {
    if (!e.target.closest('.header-nav')) {
      document.querySelector('.header-nav ul').classList.remove('active');
    }
  });

  // Active Link (unchanged) ================
  const currentPage = location.pathname.split('/').pop();
  document.querySelectorAll('.header-nav a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  // Maps Implementation (unchanged) ========
  const mapPlaceholders = document.querySelectorAll('.map-placeholder');
  mapPlaceholders.forEach(container => {
    const noscript = container.nextElementSibling;
    if (noscript && noscript.tagName === 'NOSCRIPT') {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = noscript.innerHTML;
      const iframe = tempDiv.querySelector('iframe');
      
      if (iframe) {
        const newIframe = document.createElement('iframe');
        newIframe.src = iframe.src;
        newIframe.setAttribute('style', 'border:0');
        newIframe.setAttribute('allowfullscreen', '');
        newIframe.setAttribute('loading', 'lazy');
        newIframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
        container.innerHTML = '';
        container.appendChild(newIframe);
      } else {
        container.innerHTML = '<p>Map not available</p>';
      }
    } else {
      container.innerHTML = '<p>Map not available</p>';
    }
  });
});
