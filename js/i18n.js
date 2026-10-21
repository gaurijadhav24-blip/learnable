/**
 * LearnAble - Full Trilingual Translation Engine (English / हिंदी / मराठी)
 * ========================================================================
 * 1. Native Google Translate API Integration:
 *    Translates 100% of the entire page content into Hindi and Marathi,
 *    excluding ONLY the brand name "LearnAble" (.notranslate).
 * 2. Instant Local Dictionary Engine (first-pass zero-lag UI feedback).
 * 3. Dynamic Google Font "Noto Sans Devanagari" loading for crisp typography.
 * 4. Persistent language selection in localStorage across all routes.
 */

// Local dictionary for instant first-pass translation of key UI elements
const translations = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.learningAreas': 'Learning Areas',
    'nav.assessment': 'Assessment Guide',
    'nav.support': 'Support Pathways',
    'nav.learner': 'Learner Support',
    'nav.parent': 'Parent Support',
    'nav.educator': 'Educator Support',
    'nav.activities': 'Activities',
    'nav.resources': 'Resources',
    'nav.faq': 'FAQ',
    'nav.feedback': 'Feedback',
    'nav.admin': 'Admin Portal',
    'nav.logout': 'Logout',
    'brand.title': 'LearnAble',
    'brand.subtitle': 'Learning Disability Awareness & Support',
    'btn.learnMore': 'Learn More',
    'btn.exploreAreas': 'Explore Learning Areas',
    'btn.startActivity': 'Start Activity',
    'btn.viewResources': 'View Resources',
    'btn.submitFeedback': 'Submit Feedback',
    'btn.submitting': 'Submitting...',
    'btn.next': 'Next',
    'btn.previous': 'Previous',
    'btn.finish': 'Finish',
    'btn.restart': 'Restart Activity',
    'btn.reviewAnswers': 'Review Answers',
    'btn.visitResource': 'Visit Resource',
    'btn.login': 'Sign In',
    'btn.exportCsv': 'Export to CSV',
    'btn.backHome': 'Back to Home',
    'btn.takeQuiz': 'Take Practice Quiz →',
    'disclaimer.title': 'Important Educational Disclaimer:',
    'disclaimer.body': 'This portal is for educational awareness and guidance only. It does NOT provide clinical diagnosis, medical evaluation, or treatment. For formal diagnosis, always consult a qualified clinical psychologist, special educator, or developmental pediatrician.',
    'footer.mission': 'LearnAble is a Community Engagement Project (B.Sc. IT) dedicated to building inclusive understanding, practical strategies, and verified support resources for learning differences.',
    'footer.quickLinks': 'Quick Links',
    'footer.project': 'Academic Project',
    'footer.projectSub': 'Community Engagement Project | B.Sc. IT',
    'footer.rights': 'Educational Open Source Project.',
    'feedback.heading': 'Community Feedback',
    'feedback.subheading': 'Help us improve by sharing your thoughts, experiences, and suggestions.'
  },
  hi: {
    'nav.home': 'होम',
    'nav.about': 'परिचय',
    'nav.learningAreas': 'सीखने के क्षेत्र',
    'nav.assessment': 'मार्गदर्शिका',
    'nav.support': 'सहायता मार्ग',
    'nav.learner': 'विद्यार्थी सहायता',
    'nav.parent': 'अभिभावक सहायता',
    'nav.educator': 'शिक्षक सहायता',
    'nav.activities': 'गतिविधियां',
    'nav.resources': 'संसाधन',
    'nav.faq': 'अक्सर पूछे जाने वाले सवाल',
    'nav.feedback': 'प्रतिक्रिया',
    'nav.admin': 'प्रशासक पोर्टल',
    'nav.logout': 'लॉगआउट',
    'brand.title': 'LearnAble',
    'brand.subtitle': 'अधिगम अक्षमता जागरूकता एवं सहायता',
    'btn.learnMore': 'और जानें',
    'btn.exploreAreas': 'सीखने के क्षेत्र देखें',
    'btn.startActivity': 'गतिविधि शुरू करें',
    'btn.viewResources': 'संसाधन देखें',
    'btn.submitFeedback': 'प्रतिक्रिया भेजें',
    'btn.submitting': 'भेज रहे हैं...',
    'btn.next': 'अगला',
    'btn.previous': 'पिछला',
    'btn.finish': 'समाप्त',
    'btn.restart': 'पुनः प्रारंभ करें',
    'btn.reviewAnswers': 'उत्तरों की समीक्षा करें',
    'btn.visitResource': 'संसाधन देखें',
    'btn.login': 'साइन इन करें',
    'btn.exportCsv': 'CSV डाउनलोड करें',
    'btn.backHome': 'होम पेज पर वापस जाएं',
    'btn.takeQuiz': 'अभ्यास प्रश्नोत्तरी शुरू करें →',
    'disclaimer.title': 'महत्वपूर्ण शैक्षणिक अस्वीकरण:',
    'disclaimer.body': 'यह पोर्टल केवल शैक्षणिक जागरूकता और मार्गदर्शन के लिए है। यह कोई मेडिकल जांच या क्लिनिकल निदान प्रदान नहीं करता है। औपचारिक निदान के लिए हमेशा योग्य मनोवैज्ञानिक या विशेष शिक्षक से परामर्श लें।',
    'footer.mission': 'LearnAble एक कम्युनिटी एंगेजमेंट प्रोजेक्ट (B.Sc. IT) है, जो सीखने की विभिन्न क्षमताओं की समझ, व्यावहारिक रणनीतियाँ और सत्यापित सहायता संसाधन उपलब्ध कराने के लिए समर्पित है।',
    'footer.quickLinks': 'त्वरित लिंक',
    'footer.project': 'शैक्षणिक परियोजना',
    'footer.projectSub': 'कम्युनिटी एंगेजमेंट प्रोजेक्ट | B.Sc. IT',
    'footer.rights': 'शैक्षणिक ओपन सोर्स प्रोजेक्ट।',
    'feedback.heading': 'सामुदायिक प्रतिक्रिया',
    'feedback.subheading': 'अपने विचार, अनुभव और सुझाव साझा करके हमें बेहतर बनाने में मदद करें।'
  },
  mr: {
    'nav.home': 'होम',
    'nav.about': 'माहिती',
    'nav.learningAreas': 'शिकण्याचे कार्यक्षेत्र',
    'nav.assessment': 'मार्गदर्शक',
    'nav.support': 'मदत पर्याय',
    'nav.learner': 'विद्यार्थी मदत',
    'nav.parent': 'पालक मदत',
    'nav.educator': 'शिक्षक मदत',
    'nav.activities': 'उपक्रम',
    'nav.resources': 'साधने व स्त्रोत',
    'nav.faq': 'नेहमी विचारले जाणारे प्रश्न',
    'nav.feedback': 'अभिप्राय',
    'nav.admin': 'प्रशासक पोर्टल',
    'nav.logout': 'लॉगआउट',
    'brand.title': 'LearnAble',
    'brand.subtitle': 'शिकण्यातील अडचणी - जनजागृती व मार्गदर्शन',
    'btn.learnMore': 'अधिक जाणून घ्या',
    'btn.exploreAreas': 'कार्यक्षेत्रे पहा',
    'btn.startActivity': 'उपक्रम सुरू करा',
    'btn.viewResources': 'साधने पहा',
    'btn.submitFeedback': 'अभिप्राय पाठवा',
    'btn.submitting': 'पाठवत आहे...',
    'btn.next': 'पुढे',
    'btn.previous': 'मागे',
    'btn.finish': 'पूर्ण करा',
    'btn.restart': 'पुन्हा सुरू करा',
    'btn.reviewAnswers': 'उत्तरांचे पुनरावलोकन करा',
    'btn.visitResource': 'स्त्रोत उघडा',
    'btn.login': 'साइन इन करा',
    'btn.exportCsv': 'CSV डाउनलोड करा',
    'btn.backHome': 'मुख्य पानावर परत जा',
    'btn.takeQuiz': 'सराव प्रश्नमंजुषा सुरू करा →',
    'disclaimer.title': 'महत्त्वाचा शैक्षणिक अस्वीकरण:',
    'disclaimer.body': 'हे पोर्टल केवळ शैक्षणिक जागरूकता आणि मार्गदर्शनासाठी आहे. हे कोणत्याही वैद्यकीय तपासणीचा पर्याय नाही. औपचारिक निदानासाठी नेहमी पात्र मानसशास्त्रज्ञ किंवा विशेष शिक्षकांचा सल्ला घ्यावा.',
    'footer.mission': 'LearnAble हा एक कम्युनिटी एंगेजमेंट प्रोजेक्ट (B.Sc. IT) आहे, जो शिकण्यातील अडचणी, व्यावहारिक धोरणे आणि पडताळणी केलेले सहाय्य स्त्रोत उपलब्ध करून देण्यासाठी समर्पित आहे.',
    'footer.quickLinks': 'महत्त्वाच्या लिंक्स',
    'footer.project': 'शैक्षणिक प्रकल्प',
    'footer.projectSub': 'कम्युनिटी एंगेजमेंट प्रोजेक्ट | B.Sc. IT',
    'footer.rights': 'शैक्षणिक मुक्त स्त्रोत प्रकल्प.',
    'feedback.heading': 'सामुदायिक अभिप्राय',
    'feedback.subheading': 'आपले विचार, अनुभव आणि सूचना शेअर करून पोर्टल अधिक उपयुक्त बनवण्यास मदत करा.'
  }
};

/**
 * Gets currently active language from localStorage (defaults to 'en')
 */
function getCurrentLanguage() {
  return localStorage.getItem('learnable_language') || 'en';
}

/**
 * Dynamically loads Google Font 'Noto Sans Devanagari' when Hindi or Marathi is active
 */
function ensureDevanagariFont() {
  if (document.getElementById('noto-devanagari-font')) return;
  const link = document.createElement('link');
  link.id = 'noto-devanagari-font';
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap';
  document.head.appendChild(link);
}

/**
 * Protects brand name "LearnAble" across the entire DOM from being translated.
 * Marks both container elements and any raw occurrences of "LearnAble" with class="notranslate" and translate="no".
 */
function protectBrandNames() {
  // 1. Mark existing brand title and heading elements (never layout wrappers)
  const brandEls = document.querySelectorAll(
    '.brand strong, .footer-brand-text h3, .drawer-brand strong, [data-brand]'
  );
  brandEls.forEach((el) => {
    el.classList.add('notranslate');
    el.setAttribute('translate', 'no');
  });

  // 2. Wrap any raw text node containing "LearnAble"
  try {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function(node) {
          if (!node.nodeValue || !node.nodeValue.includes('LearnAble')) {
            return NodeFilter.FILTER_SKIP;
          }
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_SKIP;
          if (
            parent.closest('.notranslate') ||
            parent.getAttribute('translate') === 'no' ||
            parent.tagName === 'SCRIPT' ||
            parent.tagName === 'STYLE' ||
            parent.tagName === 'TEXTAREA' ||
            parent.tagName === 'INPUT'
          ) {
            return NodeFilter.FILTER_SKIP;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    const nodesToReplace = [];
    let currentNode;
    while ((currentNode = walker.nextNode())) {
      nodesToReplace.push(currentNode);
    }

    nodesToReplace.forEach((textNode) => {
      const parent = textNode.parentNode;
      if (!parent) return;
      const parts = textNode.nodeValue.split(/(LearnAble)/g);
      const frag = document.createDocumentFragment();
      parts.forEach((part) => {
        if (part === 'LearnAble') {
          const span = document.createElement('span');
          span.className = 'notranslate';
          span.setAttribute('translate', 'no');
          span.textContent = 'LearnAble';
          frag.appendChild(span);
        } else if (part) {
          frag.appendChild(document.createTextNode(part));
        }
      });
      parent.replaceChild(frag, textNode);
    });
  } catch (err) {
    console.debug('Brand protection note:', err);
  }
}

/**
 * Google Translate Initialization Callback (called automatically by script)
 */
window.googleTranslateElementInit = function() {
  new google.translate.TranslateElement({
    pageLanguage: 'en',
    includedLanguages: 'en,hi,mr',
    autoDisplay: false
  }, 'google_translate_element');

  // If Hindi or Marathi is active in localStorage, trigger after a brief tick
  const savedLang = getCurrentLanguage();
  if (savedLang && savedLang !== 'en') {
    setTimeout(() => {
      triggerGoogleTranslate(savedLang);
    }, 300);
  }
};

/**
 * Dynamically injects Google Translate script and off-screen container
 */
function loadGoogleTranslateEngine() {
  // Ensure off-screen mount container exists
  if (!document.getElementById('google_translate_element')) {
    const div = document.createElement('div');
    div.id = 'google_translate_element';
    div.className = 'google-translate-hidden';
    document.body.appendChild(div);
  }

  // Inject script
  if (!document.getElementById('google-translate-script')) {
    const script = document.createElement('script');
    script.id = 'google-translate-script';
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.head.appendChild(script);
  }
}

/**
 * Programmatically triggers Google Translate engine via cookie & select dispatch
 */
function triggerGoogleTranslate(lang) {
  const hostname = window.location.hostname;

  if (lang === 'en') {
    // Clear translation cookie for domain and root
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    if (hostname && hostname !== 'localhost') {
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${hostname};`;
      const parts = hostname.split('.');
      if (parts.length > 1) {
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${parts.slice(-2).join('.')};`;
      }
    }

    const combo = document.querySelector('.goog-te-combo');
    if (combo) {
      const enOpt = Array.from(combo.options).find((o) => o.value === 'en' || o.value === '');
      if (enOpt) {
        combo.value = enOpt.value;
        combo.dispatchEvent(new Event('change'));
      }
    }
    return;
  }

  // Target is 'hi' or 'mr'
  const cookieVal = `/en/${lang}`;
  document.cookie = `googtrans=${cookieVal}; path=/;`;
  if (hostname && hostname !== 'localhost') {
    document.cookie = `googtrans=${cookieVal}; path=/; domain=${hostname};`;
    const parts = hostname.split('.');
    if (parts.length > 1) {
      document.cookie = `googtrans=${cookieVal}; path=/; domain=.${parts.slice(-2).join('.')};`;
    }
  }

  // Poll until Google Translate dropdown is ready, then trigger
  let attempts = 0;
  const maxAttempts = 30; // 6 seconds
  function tryDispatch() {
    const combo = document.querySelector('.goog-te-combo');
    if (combo) {
      combo.value = lang;
      combo.dispatchEvent(new Event('change'));
    } else if (attempts < maxAttempts) {
      attempts++;
      setTimeout(tryDispatch, 200);
    }
  }
  tryDispatch();
}

/**
 * Main application language switcher
 */
function applyLanguage(lang) {
  const targetLang = ['en', 'hi', 'mr'].includes(lang) ? lang : 'en';
  localStorage.setItem('learnable_language', targetLang);
  document.documentElement.lang = targetLang;

  // Protect brand name "LearnAble" from translation
  protectBrandNames();

  // Typography for Devanagari script
  if (targetLang === 'hi' || targetLang === 'mr') {
    ensureDevanagariFont();
    document.body.classList.add('lang-devanagari');
  } else {
    document.body.classList.remove('lang-devanagari');
  }

  // 1. Fast instant local dictionary translation for key elements
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const langDict = translations[targetLang] || translations.en;
    if (langDict[key]) {
      if (el.hasAttribute('data-i18n-attr')) {
        el.setAttribute(el.getAttribute('data-i18n-attr'), langDict[key]);
      } else {
        el.textContent = langDict[key];
      }
    }
  });

  // 2. Trigger Full-Page Google Translation for 100% of all headings, paragraphs, cards & buttons
  triggerGoogleTranslate(targetLang);

  // 3. Sync all language dropdown selectors on the page
  const selectors = document.querySelectorAll('#languageSelector, .language-selector select');
  selectors.forEach((sel) => {
    if (sel.value !== targetLang) {
      sel.value = targetLang;
    }
  });
}

/**
 * Initialize on page load
 */
function initializeI18n() {
  protectBrandNames();
  loadGoogleTranslateEngine();

  const currentLang = getCurrentLanguage();
  applyLanguage(currentLang);

  // Listen for user changes on custom language selector
  const selectors = document.querySelectorAll('#languageSelector, .language-selector select');
  selectors.forEach((sel) => {
    sel.addEventListener('change', (e) => {
      const selected = e.target.value;
      applyLanguage(selected);
      // Give a quick feedback tick and ensure full DOM translation
      setTimeout(() => {
        triggerGoogleTranslate(selected);
      }, 250);
    });
  });
}

// Expose globally
window.applyLanguage = applyLanguage;
window.getCurrentLanguage = getCurrentLanguage;
window.triggerGoogleTranslate = triggerGoogleTranslate;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeI18n);
} else {
  initializeI18n();
}
