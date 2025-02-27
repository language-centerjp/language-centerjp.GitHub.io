document.addEventListener('DOMContentLoaded', function() {
  // Language Switcher
  const languageSelect = document.getElementById('languageSelect');
  if(languageSelect) {
    languageSelect.addEventListener('change', function(e) {
      const lang = e.target.value;
      const currentPath = window.location.pathname;
      const newPath = currentPath.replace(/(-en)?\.html$/, lang === 'en' ? '-en.html' : '.html');
      window.location.href = newPath;
    });
  }

  // Mobile Nav Toggle
  const navContainer = document.querySelector('.header-nav');
  const mobileMenuButton = document.createElement('button');
  mobileMenuButton.innerHTML = '☰';
  mobileMenuButton.classList.add('mobile-menu-toggle');
  navContainer.prepend(mobileMenuButton);

  mobileMenuButton.addEventListener('click', function(e) {
    e.stopPropagation();
    document.querySelector('.header-nav ul').classList.toggle('active');
  });

  // Close mobile menu on click outside
  document.addEventListener('click', function(e) {
    if(!e.target.closest('.header-nav')) {
      document.querySelector('.header-nav ul').classList.remove('active');
    }
  });

  // Set active navigation link
  const currentPage = location.pathname.split('/').pop();
  document.querySelectorAll('.header-nav a').forEach(link => {
    if(link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  // Initialize Maps
  const mapContainers = document.querySelectorAll('.map-placeholder');
  mapContainers.forEach(container => {
    container.innerHTML = '<iframe src="https://maps.google.com/maps?q=埼玉県川口市本町1-1-1&output=embed" style="border:0" allowfullscreen></iframe>';
  });
});
