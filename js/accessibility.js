/**
 * LearnAble - Accessibility Controller
 * ====================================
 * Manages WCAG 2.1 accessible features:
 * - Dynamic text resizing (A− / Default / A+)
 * - High-contrast visual mode with visual indicator
 * - Polished, non-intrusive collapsible floating action card
 * - Outside click & Escape key dismissal
 */

function setupAccessibility() {
  const toolbar = document.querySelector('.accessibility-toolbar');
  if (!toolbar) return;

  // Render modern structured accessibility popup
  toolbar.innerHTML = `
    <div class="a11y-toolbar-header">
      <span class="a11y-title">
        <span aria-hidden="true">♿</span>
        <span>Accessibility</span>
      </span>
      <button type="button" class="a11y-close-btn" aria-label="Close accessibility options">✕</button>
    </div>

    <div class="a11y-section">
      <span class="a11y-label">Text Size</span>
      <div class="a11y-btn-group">
        <button type="button" id="decreaseText" class="a11y-btn" aria-label="Decrease text size (Small)">A−</button>
        <button type="button" id="defaultTextSize" class="a11y-btn" aria-label="Default text size (Medium)">A</button>
        <button type="button" id="increaseText" class="a11y-btn" aria-label="Increase text size (Large)">A+</button>
      </div>
    </div>

    <div class="a11y-section">
      <button type="button" id="toggleContrast" class="a11y-full-btn" aria-label="Toggle high contrast mode">
        <span>🌓 High Contrast</span>
        <span class="a11y-status-indicator" id="contrastIndicator">Off</span>
      </button>
    </div>

    <div class="a11y-section a11y-footer">
      <button type="button" id="resetAccessibility" class="a11y-reset-btn" aria-label="Reset all accessibility preferences">↺ Reset to Default</button>
    </div>
  `;

  // Insert floating trigger pill if not present
  let pill = document.getElementById('a11yTogglePill');
  if (!pill) {
    pill = document.createElement('button');
    pill.id = 'a11yTogglePill';
    pill.className = 'a11y-toggle-pill';
    pill.setAttribute('type', 'button');
    pill.setAttribute('aria-label', 'Toggle Accessibility Controls');
    pill.setAttribute('title', 'Accessibility Options (Aa)');
    pill.setAttribute('aria-expanded', 'false');
    pill.innerHTML = '<span aria-hidden="true">Aa</span>';
    document.body.appendChild(pill);
  }

  // Toggle toolbar popup on pill click
  pill.addEventListener('click', (e) => {
    e.stopPropagation();
    const isExpanded = toolbar.classList.toggle('toolbar-expanded');
    pill.setAttribute('aria-expanded', String(isExpanded));
  });

  // Close button inside toolbar header
  const closeBtn = toolbar.querySelector('.a11y-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeAccessibilityToolbar();
    });
  }

  // Close when tapping outside the popup
  document.addEventListener('click', (e) => {
    if (toolbar.classList.contains('toolbar-expanded') && !toolbar.contains(e.target) && !pill.contains(e.target)) {
      closeAccessibilityToolbar();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toolbar.classList.contains('toolbar-expanded')) {
      closeAccessibilityToolbar();
      pill.focus();
    }
  });

  function closeAccessibilityToolbar() {
    toolbar.classList.remove('toolbar-expanded');
    if (pill) pill.setAttribute('aria-expanded', 'false');
  }

  // Wire action buttons
  const increaseBtn = document.getElementById('increaseText');
  const decreaseBtn = document.getElementById('decreaseText');
  const defaultSizeBtn = document.getElementById('defaultTextSize');
  const contrastBtn = document.getElementById('toggleContrast');
  const resetBtn = document.getElementById('resetAccessibility');

  if (increaseBtn) increaseBtn.addEventListener('click', increaseTextSize);
  if (decreaseBtn) decreaseBtn.addEventListener('click', decreaseTextSize);
  if (defaultSizeBtn) defaultSizeBtn.addEventListener('click', defaultTextSize);
  if (contrastBtn) contrastBtn.addEventListener('click', toggleHighContrast);
  if (resetBtn) resetBtn.addEventListener('click', resetAccessibility);

  // Sync initial contrast badge
  updateContrastIndicator();
}

function increaseTextSize() {
  document.body.classList.remove('text-small');
  document.body.classList.add('text-large');
  saveAccessibilityPreference({ textSize: 'large' });
}

function decreaseTextSize() {
  document.body.classList.remove('text-large');
  document.body.classList.add('text-small');
  saveAccessibilityPreference({ textSize: 'small' });
}

function defaultTextSize() {
  document.body.classList.remove('text-large', 'text-small');
  saveAccessibilityPreference({ textSize: 'default' });
}

function toggleHighContrast() {
  const isContrast = document.body.classList.toggle('high-contrast');
  updateContrastIndicator();
  saveAccessibilityPreference({ highContrast: isContrast });
}

function updateContrastIndicator() {
  const indicator = document.getElementById('contrastIndicator');
  if (indicator) {
    const isContrast = document.body.classList.contains('high-contrast');
    indicator.textContent = isContrast ? 'On' : 'Off';
  }
}

function resetAccessibility() {
  document.body.classList.remove('text-large', 'text-small', 'high-contrast');
  updateContrastIndicator();
  localStorage.removeItem('accessibilitySettings');
}

function saveAccessibilityPreference(updates) {
  try {
    const current = JSON.parse(localStorage.getItem('accessibilitySettings')) || {};
    const merged = { ...current, ...updates };
    localStorage.setItem('accessibilitySettings', JSON.stringify(merged));
  } catch (err) {
    console.warn('Could not save accessibility preference:', err);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupAccessibility);
} else {
  setupAccessibility();
}
