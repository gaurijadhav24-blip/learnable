/**
 * LearnAble - Feedback Form Handler
 * ==================================
 * Handles form validation, spam prevention (honeypot + 30s rate limit),
 * and secure insertion into the Supabase 'feedback' table.
 */

function initializeFeedback() {
  // If Supabase is not configured, show friendly warning banner
  if (typeof checkAndShowDatabaseBanner === 'function') {
    checkAndShowDatabaseBanner();
  }

  const feedbackForm = document.getElementById('userFeedbackForm');
  if (feedbackForm) {
    // Remove any inline handler if present and bind single event listener
    feedbackForm.onsubmit = null;
    feedbackForm.addEventListener('submit', handleFeedbackSubmit);
  }
}

async function handleFeedbackSubmit(event) {
  event.preventDefault();

  const form = document.getElementById('userFeedbackForm');
  const submitBtn = form?.querySelector('button[type="submit"]');
  const errorContainer = document.getElementById('feedbackErrorContainer') || createErrorContainer(form);

  // Clear previous errors
  errorContainer.classList.add('hidden');
  errorContainer.textContent = '';

  // 1. Honeypot check for bots
  const honeypot = document.getElementById('hp_field')?.value;
  if (honeypot && honeypot.trim().length > 0) {
    console.warn('Bot submission blocked via honeypot.');
    // Pretend success to bots
    showFeedbackSuccess();
    return;
  }

  // 2. Client-side rate limit: 1 submission per 30 seconds
  const lastSubmitTime = sessionStorage.getItem('learnable_last_feedback');
  if (lastSubmitTime) {
    const elapsedSeconds = Math.floor((Date.now() - parseInt(lastSubmitTime, 10)) / 1000);
    if (elapsedSeconds < 30) {
      const waitRemaining = 30 - elapsedSeconds;
      showError(errorContainer, `Please wait ${waitRemaining} seconds before submitting another feedback entry to prevent spam.`);
      return;
    }
  }

  // 3. Extract and sanitize inputs
  const nameInput = document.getElementById('feedbackName')?.value.trim();
  const name = nameInput || 'Anonymous';
  const userType = document.getElementById('feedbackUserType')?.value;
  const ratingChecked = document.querySelector('input[name="rating"]:checked');
  const ratingVal = ratingChecked ? parseInt(ratingChecked.value, 10) : null;
  const feedbackText = document.getElementById('feedbackText')?.value.trim();
  const suggestionsText = document.getElementById('feedbackSuggestions')?.value.trim();

  // 4. Client-side validations
  if (!userType) {
    showError(errorContainer, 'Please select your role (Learner, Parent, Educator, or Other).');
    return;
  }
  if (!ratingVal || ratingVal < 1 || ratingVal > 5) {
    showError(errorContainer, 'Please select a rating from 1 to 5.');
    return;
  }
  if (!feedbackText) {
    showError(errorContainer, 'Please enter your feedback comments.');
    return;
  }
  if (feedbackText.length > 1000) {
    showError(errorContainer, 'Feedback must be 1000 characters or fewer.');
    return;
  }
  if (suggestionsText && suggestionsText.length > 500) {
    showError(errorContainer, 'Suggestions must be 500 characters or fewer.');
    return;
  }

  // 5. Disable button and show loading state
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.dataset.originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting Feedback...';
  }

  // 6. Send to Supabase (or fallback to localStorage if not configured)
  try {
    if (window.isSupabaseConfigured && window.supabaseClient) {
      const { data, error } = await window.supabaseClient.from('feedback').insert([
        {
          name: name,
          user_type: userType,
          rating: ratingVal,
          feedback: feedbackText,
          suggestions: suggestionsText || null,
        },
      ]);

      if (error) {
        throw new Error(error.message);
      }
    } else {
      // LocalStorage fallback for offline demo
      const fallbackEntry = {
        id: 'local-' + Date.now(),
        name,
        user_type: userType,
        rating: ratingVal,
        feedback: feedbackText,
        suggestions: suggestionsText || null,
        created_at: new Date().toISOString(),
      };
      const existing = JSON.parse(localStorage.getItem('learnableFeedback') || '[]');
      existing.push(fallbackEntry);
      localStorage.setItem('learnableFeedback', JSON.stringify(existing));
    }

    // Record rate limit timestamp
    sessionStorage.setItem('learnable_last_feedback', Date.now().toString());

    // Show success view
    showFeedbackSuccess();
  } catch (err) {
    console.error('Feedback submission error:', err);
    showError(
      errorContainer,
      `Unable to submit feedback: ${err.message || 'Please check your connection or database setup.'}`
    );
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = submitBtn.dataset.originalText || 'Submit Feedback';
    }
  }
}

function createErrorContainer(form) {
  let errorBox = document.getElementById('feedbackErrorContainer');
  if (!errorBox && form) {
    errorBox = document.createElement('div');
    errorBox.id = 'feedbackErrorContainer';
    errorBox.className = 'error-box hidden';
    errorBox.style.marginBottom = '1.5rem';
    form.parentNode.insertBefore(errorBox, form);
  }
  return errorBox;
}

function showError(container, message) {
  if (container) {
    container.textContent = message;
    container.classList.remove('hidden');
    container.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } else {
    alert(message);
  }
}

function showFeedbackSuccess() {
  const form = document.getElementById('userFeedbackForm');
  const successMessage = document.getElementById('feedbackSuccess');
  if (form) form.classList.add('hidden');
  if (successMessage) {
    successMessage.classList.remove('hidden');
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeFeedback);
} else {
  initializeFeedback();
}
