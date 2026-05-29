'use strict';

// ================================================================
// 1. NAVBAR
// ================================================================
(function initNavbar() {
  const navbar   = document.getElementById('navbar');
  const sections = document.querySelectorAll('main section[id], #o-timu');
  const navLinks = document.querySelectorAll('.nav-link');

  function onScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// ================================================================
// 2. HAMBURGER / MOBILE MENI
// ================================================================
(function initMobileMenu() {
  const menuBtn    = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', () => {
    const isOpen = !mobileMenu.classList.contains('hidden');

    if (isOpen) {
      mobileMenu.classList.add('hidden');
      menuBtn.classList.remove('is-open');
      menuBtn.setAttribute('aria-expanded', 'false');
    } else {
      mobileMenu.classList.remove('hidden');
      menuBtn.classList.add('is-open');
      menuBtn.setAttribute('aria-expanded', 'true');
    }
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      menuBtn.classList.remove('is-open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.add('hidden');
      menuBtn.classList.remove('is-open');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  });
})();

// ================================================================
// 3. REVEAL ANIMACIJE
// ================================================================
(function initReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(el => observer.observe(el));
})();

// ================================================================
// 4. TESTIMONIALS SLIDER
// ================================================================
(function initSlider() {
  const track   = document.getElementById('slider-track');
  const wrapper = document.getElementById('slider-wrapper');
  const dotsContainer = document.getElementById('slider-dots');
  const prevBtn = document.getElementById('slider-prev');
  const nextBtn = document.getElementById('slider-next');

  if (!track || !wrapper) return;

  const slides = track.querySelectorAll('.slide');
  const total  = slides.length;
  if (total === 0) return;

  let current    = 0;
  let autoTimer  = null;
  let touchStartX = 0;
  let isDragging  = false;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = `slider-dot ${i === 0 ? 'active' : ''}`;
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Iskustvo ${i + 1} od ${total}`);
    dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;

    dotsContainer.querySelectorAll('.slider-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
      dot.setAttribute('aria-selected', i === current ? 'true' : 'false');
    });

    slides.forEach((slide, i) => {
      slide.setAttribute('aria-hidden', i !== current ? 'true' : 'false');
    });
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { resetAuto(); goTo(current - 1); });
  if (nextBtn) nextBtn.addEventListener('click', () => { resetAuto(); goTo(current + 1); });

  wrapper.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft')  { resetAuto(); goTo(current - 1); }
    if (e.key === 'ArrowRight') { resetAuto(); goTo(current + 1); }
  });

  wrapper.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
    isDragging = true;
  }, { passive: true });

  wrapper.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    isDragging = false;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { // Minimalni swipe prag: 50px
      resetAuto();
      goTo(diff > 0 ? current + 1 : current - 1);
    }
  }, { passive: true });

  function startAuto() {
    autoTimer = setInterval(() => goTo(current + 1), 5500);
  }
  function resetAuto() {
    clearInterval(autoTimer);
    startAuto();
  }

  wrapper.addEventListener('mouseenter', () => clearInterval(autoTimer));
  wrapper.addEventListener('mouseleave', () => startAuto());

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) clearInterval(autoTimer);
    else startAuto();
  });

  // Inicijalizacija
  goTo(0);
  startAuto();
})();

// ================================================================
// 5. FAQ ACCORDION
// ================================================================
(function initAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    if (!trigger || !content) return;

    content.classList.add('hidden');

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('is-open')) {
          otherItem.classList.remove('is-open');
          const otherContent = otherItem.querySelector('.faq-content');
          const otherTrigger = otherItem.querySelector('.faq-trigger');
          if (otherContent) {
            otherContent.classList.remove('is-open');
            setTimeout(() => otherContent.classList.add('hidden'), 350);
          }
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
        }
      });

      if (isOpen) {
        item.classList.remove('is-open');
        content.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
        setTimeout(() => content.classList.add('hidden'), 350);
      } else {
        content.classList.remove('hidden');
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            item.classList.add('is-open');
            content.classList.add('is-open');
            trigger.setAttribute('aria-expanded', 'true');
          });
        });
      }
    });

    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && item.classList.contains('is-open')) {
        trigger.click();
        trigger.focus();
      }
    });
  });
})();

// ================================================================
// 6. KONTAKT FORMA
// ================================================================
(function initContactForm() {
  const form      = document.getElementById('contact-form');
  const msgBox    = document.getElementById('form-message');
  const submitBtn = document.getElementById('submit-btn');

  if (!form) return;

  function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    field.classList.remove('border-red-300', 'border-green-300');
    if (field.hasAttribute('required') && !value) isValid = false;
    if (field.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) isValid = false;
    if (field.type === 'tel'   && value && !/^[+\d\s\-().]{7,20}$/.test(value)) isValid = false;
    if (field.type === 'checkbox' && field.hasAttribute('required') && !field.checked) isValid = false;
    if (!isValid) field.classList.add('border-red-300');
    else if (value || field.type === 'checkbox') field.classList.add('border-green-300');
    return isValid;
  }

  form.querySelectorAll('input, textarea, select').forEach(field => {
    field.addEventListener('blur',  () => validateField(field));
    field.addEventListener('input', () => { if (field.classList.contains('border-red-300')) validateField(field); });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fields = form.querySelectorAll('input, textarea, select');
    let allValid = true;
    fields.forEach(field => { if (!validateField(field)) allValid = false; });

    if (!allValid) {
      showMessage('Molimo vas popunite sva obavezna polja ispravno.', 'error');
      const firstError = form.querySelector('.border-red-300');
      if (firstError) firstError.focus();
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Šaljemo...';

    try {
      const response = await fetch('https://formspree.io/f/xqejgvvn', {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        showMessage('✓ Poruka je uspešno poslata! Javićemo vam se u roku od 24 sata.', 'success');
        form.reset();
        fields.forEach(f => f.classList.remove('border-green-300', 'border-red-300'));
      } else {
        showMessage('Došlo je do greške. Pokušajte ponovo.', 'error');
      }
    } catch {
      showMessage('Greška u komunikaciji sa serverom.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Pošaljite poruku <svg class="inline-block w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>';
    }
  });

  function showMessage(text, type) {
    msgBox.textContent = text;
    msgBox.className = `rounded-2xl px-4 py-3 text-sm font-500 text-center ${type}`;
    msgBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    if (type === 'success') setTimeout(() => { msgBox.className = 'hidden'; }, 6000);
  }
})();

// ================================================================
// 7. SCROLL-TO-TOP
// ================================================================
(function initScrollTop() {
  const btn = document.getElementById('scroll-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// ================================================================
// 8. SMOOTH ANCHOR NAVIGACIJA
// ================================================================
(function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });

      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
    });
  });
})();

