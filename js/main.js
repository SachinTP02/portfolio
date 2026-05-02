/**
 * main.js — Portfolio interactivity
 * Features:
 *  1. Nav scroll shrink
 *  2. Hamburger menu toggle
 *  3. Scroll spy (active nav link)
 *  4. Scroll-triggered fade-in animations
 *  5. Smooth scroll with nav-height offset
 *  6. Footer copyright year
 */

(function () {
  'use strict';

  const NAV_WRAPPER = document.getElementById('navbar');
  const NAV_TOGGLE  = document.getElementById('nav-toggle');
  const NAV_MENU    = document.getElementById('nav-menu');
  const NAV_LINKS   = document.querySelectorAll('.nav-link[href^="#"]');
  const SECTIONS    = document.querySelectorAll('main section[id]');

  // ─────────────────────────────────────────────
  // 1. NAV SCROLL SHRINK
  // ─────────────────────────────────────────────
  function handleNavScroll() {
    if (window.scrollY > 20) {
      NAV_WRAPPER.classList.add('nav--scrolled');
    } else {
      NAV_WRAPPER.classList.remove('nav--scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  // Run once on load in case page is already scrolled
  handleNavScroll();

  // ─────────────────────────────────────────────
  // 2. HAMBURGER MENU TOGGLE
  // ─────────────────────────────────────────────
  function openMenu() {
    NAV_MENU.classList.add('nav-menu--open');
    NAV_TOGGLE.classList.add('hamburger--open');
    NAV_TOGGLE.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    NAV_MENU.classList.remove('nav-menu--open');
    NAV_TOGGLE.classList.remove('hamburger--open');
    NAV_TOGGLE.setAttribute('aria-expanded', 'false');
  }

  NAV_TOGGLE.addEventListener('click', function () {
    const isOpen = NAV_MENU.classList.contains('nav-menu--open');
    isOpen ? closeMenu() : openMenu();
  });

  // Close on any nav link click
  NAV_LINKS.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  // ─────────────────────────────────────────────
  // 3. SCROLL SPY — active nav link
  // ─────────────────────────────────────────────
  function setActiveLink(id) {
    NAV_LINKS.forEach(function (link) {
      link.classList.remove('nav-link--active');
      if (link.getAttribute('href') === '#' + id) {
        link.classList.add('nav-link--active');
      }
    });
  }

  if ('IntersectionObserver' in window && SECTIONS.length) {
    const spyObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-40% 0px -55% 0px',
        threshold: 0
      }
    );

    SECTIONS.forEach(function (section) {
      spyObserver.observe(section);
    });
  }

  // ─────────────────────────────────────────────
  // 4. SCROLL-TRIGGERED FADE-IN ANIMATIONS
  // ─────────────────────────────────────────────
  const animatedEls = document.querySelectorAll('.animate-on-scroll');

  if ('IntersectionObserver' in window && animatedEls.length) {
    const fadeObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // one-shot
          }
        });
      },
      {
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.12
      }
    );

    animatedEls.forEach(function (el) {
      fadeObserver.observe(el);
    });
  } else {
    // Fallback: show all immediately if observer not supported
    animatedEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  // ─────────────────────────────────────────────
  // 5. SMOOTH SCROLL WITH NAV-HEIGHT OFFSET
  // ─────────────────────────────────────────────
  // CSS scroll-behavior:smooth + scroll-padding-top handle most cases.
  // This JS version closes the mobile menu and ensures correct offset.
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      closeMenu();

      // Small delay so menu close animation doesn't interfere with scroll
      setTimeout(function () {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    });
  });

  // ─────────────────────────────────────────────
  // 6. FOOTER YEAR
  // ─────────────────────────────────────────────
  const yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

})();
