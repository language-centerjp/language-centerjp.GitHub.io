document.addEventListener('DOMContentLoaded', function() {
  // Language Switcher
  const languageSelect = document.getElementById('languageSelect');
  if (languageSelect) {
    languageSelect.addEventListener('change', function(e) {
      const lang = e.target.value;
      const currentPath = window.location.pathname;
      const newPath = currentPath.replace(/(-en)?\.html$/, lang === 'en' ? '-en.html' : '.html');
      window.location.href = newPath;
    });
  }

  // Mobile Menu
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

  // Active Link
  const currentPage = location.pathname.split('/').pop();
  document.querySelectorAll('.header-nav a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  // Maps
  const mapPlaceholders = document.querySelectorAll('.map-placeholder');

  mapPlaceholders.forEach(container => {
    const iframe = container.nextElementSibling.querySelector('iframe');
    if (iframe) {
      const mapUrl = iframe.src;
      const newIframe = document.createElement('iframe');
      newIframe.src = mapUrl;
      newIframe.style.border = '0';
      newIframe.allowFullscreen = true;
      container.innerHTML = ''; // Clear the "Map loading..." message
      container.appendChild(newIframe); // Append the NEW iframe to the placeholder
    } else {
      container.innerHTML = '<p>Map not available</p>'; // Handle cases where there's no URL
    }
  });
});

  });
});

