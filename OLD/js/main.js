// js/main.js - Final Version
document.addEventListener('DOMContentLoaded', function() {
  // Auto-expanding textarea
  const textarea = document.getElementById('message');
  if (textarea) {
    textarea.addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = this.scrollHeight + 'px';
    });
    textarea.dispatchEvent(new Event('input'));
  }

  // Language switcher
  const languageSelect = document.getElementById('languageSelect');
  if (languageSelect) {
    languageSelect.addEventListener('change', function(e) {
      const lang = e.target.value;
      const currentPath = window.location.pathname;
      const newPath = currentPath.replace(/(-en)?\.html$/i, lang === 'en' ? '-en.html' : '.html');
      window.location.href = newPath;
    });
  }

  // Mobile menu initialization
  const navList = document.querySelector('.header-nav ul');
  if (navList) {
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.innerHTML = '☰';
    mobileMenuButton.classList.add('mobile-menu-toggle');
    navList.parentNode.insertBefore(mobileMenuButton, navList);

    mobileMenuButton.addEventListener('click', function(e) {
      e.stopPropagation();
      navList.classList.toggle('active');
    });

    document.addEventListener('click', function(e) {
      if (!e.target.closest('.header-nav')) {
        navList.classList.remove('active');
      }
    });
  }

  // Active link highlighting
  const currentPage = location.pathname.split('/').pop();
  document.querySelectorAll('.header-nav a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  // Contact form submission
  const contactForms = document.querySelectorAll('#contact-form');
  contactForms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const submitBtn = form.querySelector('.submit-btn');
      const btnText = form.querySelector('.btn-text');
      const spinner = form.querySelector('.loading-spinner');
      const messageDiv = form.querySelector('.form-message');

      btnText.style.visibility = 'hidden';
      spinner.style.display = 'block';
      submitBtn.disabled = true;

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          form.reset();
          messageDiv.textContent = form.closest('html').lang === 'ja' ? 
            'メッセージを送信しました。ありがとうございます!' : 
            'Message sent successfully! Thank you.';
          messageDiv.className = 'form-message success';
        } else {
          throw new Error('Server response was not OK');
        }
      } catch (error) {
        messageDiv.textContent = form.closest('html').lang === 'ja' ? 
          '送信に失敗しました。後でもう一度お試しください。' : 
          'Failed to send message. Please try again later.';
        messageDiv.className = 'form-message error';
      } finally {
        messageDiv.style.display = 'block';
        btnText.style.visibility = 'visible';
        spinner.style.display = 'none';
        submitBtn.disabled = false;
        setTimeout(() => {
          messageDiv.style.display = 'none';
        }, 5000);
      }
    });
  });

  // Map loading
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
