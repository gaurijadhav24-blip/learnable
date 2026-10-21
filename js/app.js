/**
 * LearnAble - Core Application & Navigation Engine
 * ================================================
 * Handles:
 * - Native app-style responsive mobile navigation drawer with header & close button
 * - Support dropdown on desktop & mobile
 * - Outside click & Escape key listeners
 * - Active nav link highlighting
 * - Accessibility settings restoration
 */

function initializeApp() {
  setupNavigation();
  applyAccessibilitySettings();
  setActiveNavLink();
}

/**
 * Setup responsive navigation menu & hamburger toggle
 */
function setupNavigation() {
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');
  const dropdownBtn = document.querySelector('.nav-dropdown-btn');
  const dropdown = document.querySelector('.nav-dropdown');

  // Insert native mobile drawer header and close button if not present
  if (mainNav && !mainNav.querySelector('.mobile-drawer-header')) {
    const drawerHeader = document.createElement('div');
    drawerHeader.className = 'mobile-drawer-header';
    drawerHeader.innerHTML = `
      <div class="drawer-brand">
        <span class="brand-mark-sm">
          <img src="images/logo-icon.svg" alt="LearnAble Logo" width="36" height="36" />
        </span>
        <div>
          <strong>LearnAble</strong>
          <small style="display:block; font-size: 0.72rem; color: var(--text-secondary); font-weight: 500;">Navigation</small>
        </div>
      </div>
      <button type="button" class="mobile-drawer-close" aria-label="Close navigation menu">✕</button>
    `;
    mainNav.prepend(drawerHeader);

    // Close button click listener
    drawerHeader.querySelector('.mobile-drawer-close').addEventListener('click', (e) => {
      e.stopPropagation();
      closeMobileNav();
    });
  }

  // Insert native mobile drawer footer if not present
  if (mainNav && !mainNav.querySelector('.mobile-drawer-footer')) {
    const drawerFooter = document.createElement('div');
    drawerFooter.className = 'mobile-drawer-footer';
    drawerFooter.innerHTML = `
      <a href="login.html" class="drawer-admin-btn">🔐 Admin Portal</a>
      <p class="drawer-copy">Community Engagement Project | B.Sc. IT</p>
    `;
    mainNav.appendChild(drawerFooter);
  }

  if (navToggle && mainNav) {
    // Open mobile menu
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = mainNav.classList.toggle('active');
      navToggle.classList.toggle('open', isActive);
      navToggle.setAttribute('aria-expanded', String(isActive));
      document.body.classList.toggle('nav-open', isActive);
    });

    // Close when clicking any link inside mainNav
    mainNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        closeMobileNav();
      });
    });

    // Close on outside click (tapping the backdrop overlay)
    document.addEventListener('click', (e) => {
      if (mainNav.classList.contains('active') && !mainNav.contains(e.target) && !navToggle.contains(e.target)) {
        closeMobileNav();
      }
      if (dropdown && !dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
        if (dropdownBtn) dropdownBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (mainNav.classList.contains('active')) {
          closeMobileNav();
          navToggle.focus();
        }
        if (dropdown && dropdown.classList.contains('open')) {
          dropdown.classList.remove('open');
          if (dropdownBtn) {
            dropdownBtn.setAttribute('aria-expanded', 'false');
            dropdownBtn.focus();
          }
        }
      }
    });
  }

  // Handle dropdown on click/tap (works seamlessly on mobile & touchscreens)
  if (dropdownBtn && dropdown) {
    dropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.toggle('open');
      dropdownBtn.setAttribute('aria-expanded', String(isOpen));
    });
  }

  function closeMobileNav() {
    if (mainNav) mainNav.classList.remove('active');
    if (navToggle) {
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
    document.body.classList.remove('nav-open');
  }
}

/**
 * Highlights current page in navigation
 */
function setActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.main-nav a');

  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');

      // If inside dropdown, mark parent dropdown as active too
      const parentDropdown = link.closest('.nav-dropdown');
      if (parentDropdown) {
        const btn = parentDropdown.querySelector('.nav-dropdown-btn');
        if (btn) btn.classList.add('active');
      }
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });
}

/**
 * Apply saved accessibility preferences from localStorage
 */
function applyAccessibilitySettings() {
  try {
    const settings = JSON.parse(localStorage.getItem('accessibilitySettings')) || {};

    if (settings.textSize === 'large') {
      document.body.classList.add('text-large');
    } else if (settings.textSize === 'small') {
      document.body.classList.add('text-small');
    }

    if (settings.highContrast) {
      document.body.classList.add('high-contrast');
    }
  } catch (e) {
    console.warn('Could not read accessibility settings:', e);
  }
}

// Initialize on DOM load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}
