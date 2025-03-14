// js/main.js - Final Verified Version

// BOOKING SYSTEM ============================================
let currentBookingEvent = null;

function showBookingModal(eventData) {
  currentBookingEvent = eventData;
  const modal = document.createElement('div');
  modal.className = 'booking-modal';
  modal.innerHTML = `
    <button class="booking-close" onclick="this.parentElement.remove()">&times;</button>
    <h3>${eventData.title}</h3>
    <div class="time-slots">
      ${eventData.slots.map(slot => `
        <div class="time-slot" data-time="${slot}">
          <span>${new Date(slot).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
          <span>${eventData.availableSeats} seats left</span>
        </div>
      `).join('')}
    </div>
    <form id="bookingForm" style="margin-top: 1.5rem">
      <div class="form-group">
        <input type="email" placeholder="Your email" required>
      </div>
      <button type="submit" class="submit-btn">Confirm Booking</button>
    </form>
  `;
  
  modal.querySelector('#bookingForm').addEventListener('submit', handleBookingSubmit);
  document.body.appendChild(modal);
}

function handleBookingSubmit(e) {
  e.preventDefault();
  const email = e.target.querySelector('input').value;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert('Invalid email format');
    return;
  }
  if (currentBookingEvent) {
    bookClass(currentBookingEvent.id, email);
    e.target.parentElement.remove();
  }
}

function bookClass(eventId, studentEmail) {
  const database = firebase.database();
  database.ref('bookings/' + eventId).push({
    email: studentEmail,
    timestamp: firebase.database.ServerValue.TIMESTAMP
  })
  .catch((error) => {
    console.error('Booking failed:', error);
  });
}

// EXISTING CODE BELOW - NO CHANGES =========================
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

  // ===== NEW FAQ FUNCTIONALITY =====
  // Accordion Functionality
  document.querySelectorAll('.accordion').forEach(button => {
    button.addEventListener('click', () => {
      const isActive = button.classList.contains('active');
      
      // Close all accordions first
      document.querySelectorAll('.accordion').forEach(b => {
        b.classList.remove('active');
        b.nextElementSibling.style.maxHeight = null;
      });
      
      // Open clicked if not active
      if (!isActive) {
        button.classList.add('active');
        const panel = button.nextElementSibling;
        panel.style.maxHeight = `${panel.scrollHeight}px`;
      }
    });
  });

  // FAQ Search Functionality
  document.getElementById('faqSearch')?.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    document.querySelectorAll('.faq-item').forEach(item => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(searchTerm) ? 'block' : 'none';
    });
  });
});

// EVENT FETCHING & CALENDAR INITIALIZATION ====================
let events = [];

fetch('/data/events.json')
  .then(res => res.json())
  .then(data => {
    events = data.classes;
    initializeCalendar(); // Initialize the calendar after loading events
  })
  .catch(error => console.error('Error loading events:', error));

function initializeCalendar() {
  const calendarEl = document.getElementById('calendar-container');
  if (!calendarEl) return;

  const calendar = new FullCalendar.Calendar(calendarEl, {
    locale: document.documentElement.lang === 'ja' ? 'ja' : 'en',
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay'
    },
    events: events.map(event => ({
      id: event.id,
      title: event.title,
      start: event.start,
      end: event.end,
      extendedProps: {
        location: event.location,
        availableSeats: event.availableSeats,
        slots: event.slots
      }
    })),
    eventClick: function(info) {
      showBookingModal({
        id: info.event.id,
        title: info.event.title,
        slots: info.event.extendedProps.slots,
        availableSeats: info.event.extendedProps.availableSeats
      });
    }
  });
  calendar.render();
}
