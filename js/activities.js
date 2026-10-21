/**
 * LearnAble - Learning Differences Interactive Awareness Activity
 * ===============================================================
 * Loads questions from Supabase 'quiz_questions' & 'quiz_options'
 * (falls back to built-in 10 questions if offline/unconfigured).
 * Records anonymous completion in 'quiz_attempts'.
 * Populates recommended resources dynamically and provides a full answer review.
 */

// Fallback questions if database is offline or not configured
const defaultQuizQuestions = [
  {
    id: 'q-1',
    question: 'What is a learning disability?',
    options: [
      { text: 'A sign of low intelligence', correct: false },
      { text: 'A difference in how a person processes information', correct: true },
      { text: 'Something that only affects reading', correct: false },
      { text: 'A temporary difficulty that always goes away', correct: false },
    ],
  },
  {
    id: 'q-2',
    question: 'True or False: A learning disability means a person is not intelligent.',
    options: [
      { text: 'True', correct: false },
      { text: 'False', correct: true },
    ],
  },
  {
    id: 'q-3',
    question: 'Which of the following is a common learning area that may need support?',
    options: [
      { text: 'Reading', correct: true },
      { text: 'Being happy', correct: false },
      { text: 'Playing sports', correct: false },
      { text: 'Eating healthy', correct: false },
    ],
  },
  {
    id: 'q-4',
    question: 'What should happen when a learner shows persistent difficulty?',
    options: [
      { text: 'Ignore it and hope it goes away', correct: false },
      { text: 'Consider talking to a parent, teacher, or professional', correct: true },
      { text: 'Label the child as having a disability immediately', correct: false },
      { text: 'Give up on the learner', correct: false },
    ],
  },
  {
    id: 'q-5',
    question: 'Can this website diagnose a learning disability?',
    options: [
      { text: 'Yes, this website can diagnose', correct: false },
      { text: 'No, only qualified professionals can diagnose', correct: true },
      { text: 'Maybe, depending on the results', correct: false },
      { text: 'Teachers can diagnose on this website', correct: false },
    ],
  },
  {
    id: 'q-6',
    question: 'Which of these is a helpful teaching strategy for learners with reading difficulties?',
    options: [
      { text: 'Guided reading and repeated practice', correct: true },
      { text: 'Criticizing mistakes loudly', correct: false },
      { text: 'Giving very complex texts', correct: false },
      { text: 'Avoiding all support', correct: false },
    ],
  },
  {
    id: 'q-7',
    question: 'How can parents best support a child with learning difficulties?',
    options: [
      { text: 'Use positive communication and break tasks into smaller steps', correct: true },
      { text: 'Compare the child to other students', correct: false },
      { text: 'Do all the work for the child', correct: false },
      { text: 'Use harsh language to motivate them', correct: false },
    ],
  },
  {
    id: 'q-8',
    question: 'What is differentiated learning?',
    options: [
      { text: 'Teaching all students the same way', correct: false },
      { text: 'Adjusting content and methods to match different learner needs', correct: true },
      { text: 'Only helping struggling students', correct: false },
      { text: 'Teaching different subjects', correct: false },
    ],
  },
  {
    id: 'q-9',
    question: 'When should a learner seek professional guidance for learning difficulties?',
    options: [
      { text: 'After one bad test', correct: false },
      { text: 'When difficulties persist over time despite support', correct: true },
      { text: 'Never', correct: false },
      { text: 'Only if the teacher says so', correct: false },
    ],
  },
  {
    id: 'q-10',
    question: 'What is NOT a sign of a learning disability?',
    options: [
      { text: 'Difficulty with spelling', correct: false },
      { text: 'Difficulty understanding instructions', correct: false },
      { text: 'Sometimes forgetting homework', correct: true },
      { text: 'Persistent difficulty with reading', correct: false },
    ],
  },
];

let activeQuestions = [...defaultQuizQuestions];
let currentQuestionIndex = 0;
let userAnswers = []; // Index of selected option per question

async function initializeActivity() {
  if (typeof checkAndShowDatabaseBanner === 'function') {
    checkAndShowDatabaseBanner();
  }

  // Attempt to fetch questions from Supabase
  await loadQuestionsFromDatabase();

  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const restartBtn = document.getElementById('restartBtn');
  const reviewBtn = document.getElementById('reviewAnswersBtn');

  if (prevBtn) {
    prevBtn.addEventListener('click', handlePrevious);
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', handleNext);
  }
  if (restartBtn) {
    restartBtn.addEventListener('click', restartQuiz);
  }
  if (reviewBtn) {
    reviewBtn.addEventListener('click', toggleReviewSection);
  }

  updateTotalCountDisplay();
  renderQuestion();
}

async function loadQuestionsFromDatabase() {
  if (!window.isSupabaseConfigured || !window.supabaseClient) {
    activeQuestions = defaultQuizQuestions;
    return;
  }

  try {
    const { data, error } = await window.supabaseClient
      .from('quiz_questions')
      .select('id, question, sort_order, is_active, quiz_options(id, option_text, is_correct, sort_order)')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error) throw error;

    if (data && data.length > 0) {
      activeQuestions = data.map((q) => {
        const sortedOptions = (q.quiz_options || []).sort((a, b) => a.sort_order - b.sort_order);
        return {
          id: q.id,
          question: q.question,
          options: sortedOptions.map((opt) => ({
            id: opt.id,
            text: opt.option_text,
            correct: opt.is_correct,
          })),
        };
      });
    }
  } catch (err) {
    console.warn('LearnAble: Could not load questions from database, using fallback set:', err);
    activeQuestions = defaultQuizQuestions;
  }
}

function updateTotalCountDisplay() {
  const totalSpan = document.getElementById('totalQuestions');
  if (totalSpan) {
    totalSpan.textContent = activeQuestions.length;
  }
}

function renderQuestion() {
  const container = document.getElementById('questionContainer');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const currentSpan = document.getElementById('currentQuestion');
  const progressFill = document.getElementById('progressFill');

  if (!container || !activeQuestions.length) return;

  const q = activeQuestions[currentQuestionIndex];
  container.innerHTML = '';

  const qCard = document.createElement('div');
  qCard.className = 'quiz-question-box';

  const qNum = document.createElement('span');
  qNum.className = 'quiz-question-number';
  qNum.textContent = `Question ${currentQuestionIndex + 1} of ${activeQuestions.length}`;

  const qTitle = document.createElement('h3');
  qTitle.className = 'quiz-question-title';
  qTitle.textContent = q.question;

  qCard.appendChild(qNum);
  qCard.appendChild(qTitle);

  const optionsGrid = document.createElement('div');
  optionsGrid.className = 'question-options-grid';
  optionsGrid.setAttribute('role', 'radiogroup');
  optionsGrid.setAttribute('aria-label', q.question);

  q.options.forEach((opt, idx) => {
    const isSelected = userAnswers[currentQuestionIndex] === idx;

    const optLabel = document.createElement('label');
    optLabel.className = `question-option-label ${isSelected ? 'selected' : ''}`;
    optLabel.htmlFor = `quiz-opt-${currentQuestionIndex}-${idx}`;

    const radioInput = document.createElement('input');
    radioInput.type = 'radio';
    radioInput.id = `quiz-opt-${currentQuestionIndex}-${idx}`;
    radioInput.name = `question-${currentQuestionIndex}`;
    radioInput.value = idx;
    radioInput.checked = isSelected;

    radioInput.addEventListener('change', () => {
      userAnswers[currentQuestionIndex] = idx;
      // Update visual selection styles
      const labels = optionsGrid.querySelectorAll('.question-option-label');
      labels.forEach((l) => l.classList.remove('selected'));
      optLabel.classList.add('selected');
    });

    const optLetter = document.createElement('span');
    optLetter.className = 'option-badge';
    optLetter.textContent = String.fromCharCode(65 + idx); // A, B, C, D

    const optText = document.createElement('span');
    optText.className = 'option-text';
    optText.textContent = opt.text;

    optLabel.appendChild(radioInput);
    optLabel.appendChild(optLetter);
    optLabel.appendChild(optText);

    optionsGrid.appendChild(optLabel);
  });

  qCard.appendChild(optionsGrid);
  container.appendChild(qCard);

  // Update progress bar
  if (currentSpan) currentSpan.textContent = currentQuestionIndex + 1;
  if (progressFill) {
    const pct = ((currentQuestionIndex + 1) / activeQuestions.length) * 100;
    progressFill.style.width = `${pct}%`;
  }

  // Update button states
  if (prevBtn) prevBtn.disabled = currentQuestionIndex === 0;
  if (nextBtn) {
    const isLast = currentQuestionIndex === activeQuestions.length - 1;
    nextBtn.textContent = isLast ? (typeof t === 'function' ? t('btn.finish') : 'Finish Activity') : (typeof t === 'function' ? t('btn.next') : 'Next');
  }
}

function handlePrevious() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    renderQuestion();
  }
}

function handleNext() {
  // If user hasn't selected an option for current question, remind them politely
  if (userAnswers[currentQuestionIndex] === undefined || userAnswers[currentQuestionIndex] === null) {
    if (!confirm('You have not selected an option for this question yet. Would you like to proceed anyway?')) {
      return;
    }
  }

  if (currentQuestionIndex < activeQuestions.length - 1) {
    currentQuestionIndex++;
    renderQuestion();
  } else {
    showResults();
  }
}

async function showResults() {
  const quizMode = document.getElementById('activityQuiz');
  const resultsMode = document.getElementById('activityResults');

  // Compute score
  let correctCount = 0;
  const detailedAnswers = [];

  activeQuestions.forEach((q, idx) => {
    const chosenIdx = userAnswers[idx];
    const isAnswered = chosenIdx !== undefined && chosenIdx !== null;
    const isCorrect = isAnswered && q.options[chosenIdx]?.correct === true;

    if (isCorrect) correctCount++;

    detailedAnswers.push({
      question_id: q.id,
      question: q.question,
      chosen_index: isAnswered ? chosenIdx : null,
      chosen_text: isAnswered ? q.options[chosenIdx]?.text : 'No response',
      is_correct: isCorrect,
    });
  });

  const total = activeQuestions.length;
  const percentage = Math.round((correctCount / total) * 100);

  // Display results
  const scorePercentEl = document.getElementById('scorePercentage');
  const scoreMsgEl = document.getElementById('scoreMessage');
  const resultTextEl = document.getElementById('resultText');

  if (scorePercentEl) scorePercentEl.textContent = percentage;
  if (scoreMsgEl) scoreMsgEl.textContent = `You answered ${correctCount} of ${total} correctly! (${percentage}%)`;

  let feedbackMsg = '';
  if (percentage >= 80) {
    feedbackMsg = 'Excellent understanding! You demonstrated a comprehensive awareness of learning differences, non-diagnostic boundaries, and supportive educational strategies.';
  } else if (percentage >= 60) {
    feedbackMsg = 'Good awareness! You understand the foundational concepts well. Explore our Learning Areas and Support modules to further deepen your knowledge.';
  } else {
    feedbackMsg = 'Thank you for participating! Learning differences are often misunderstood. We encourage you to browse our About and Learning Areas sections to build further confidence.';
  }

  if (resultTextEl) resultTextEl.textContent = feedbackMsg;

  // Insert into Supabase 'quiz_attempts'
  try {
    if (window.isSupabaseConfigured && window.supabaseClient) {
      await window.supabaseClient.from('quiz_attempts').insert([
        {
          score: correctCount,
          total: total,
          percentage: percentage,
          user_type: 'General Learner',
          answers: detailedAnswers,
        },
      ]);
    } else {
      // Local fallback
      const attempts = JSON.parse(localStorage.getItem('learnableQuizAttempts') || '[]');
      attempts.push({
        score: correctCount,
        total,
        percentage,
        user_type: 'General Learner',
        answers: detailedAnswers,
        created_at: new Date().toISOString(),
      });
      localStorage.setItem('learnableQuizAttempts', JSON.stringify(attempts));
    }
  } catch (err) {
    console.warn('LearnAble: Could not record quiz attempt:', err);
  }

  // Populate suggested resources from database
  await loadSuggestedResources();

  // Populate answer review
  buildAnswersReview(detailedAnswers);

  if (quizMode) quizMode.classList.add('hidden');
  if (resultsMode) {
    resultsMode.classList.remove('hidden');
    resultsMode.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

async function loadSuggestedResources() {
  const resourceList = document.getElementById('resourceList');
  if (!resourceList) return;

  try {
    let resources = [];
    if (window.isSupabaseConfigured && window.supabaseClient) {
      const { data } = await window.supabaseClient
        .from('resources')
        .select('name, category, website')
        .limit(4);
      if (data && data.length > 0) resources = data;
    }

    if (resources.length > 0) {
      resourceList.innerHTML = '';
      resources.forEach((r) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = r.website;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.textContent = `${r.name} (${r.category})`;
        li.appendChild(a);
        resourceList.appendChild(li);
      });
    }
  } catch (err) {
    console.warn('Could not populate suggested resources:', err);
  }
}

function buildAnswersReview(detailedAnswers) {
  let reviewContainer = document.getElementById('quizAnswersReview');
  if (!reviewContainer) {
    reviewContainer = document.createElement('div');
    reviewContainer.id = 'quizAnswersReview';
    reviewContainer.className = 'quiz-review-section hidden';

    const restartBtn = document.getElementById('restartBtn');
    if (restartBtn && restartBtn.parentNode) {
      restartBtn.parentNode.insertBefore(reviewContainer, restartBtn);
    }
  }

  // Add Review toggle button if not already present
  if (!document.getElementById('reviewAnswersBtn')) {
    const reviewToggle = document.createElement('button');
    reviewToggle.id = 'reviewAnswersBtn';
    reviewToggle.className = 'btn btn-outline';
    reviewToggle.style.marginBottom = '1rem';
    reviewToggle.style.marginRight = '0.5rem';
    reviewToggle.textContent = typeof t === 'function' ? t('btn.reviewAnswers') : 'Review All Answers';
    reviewToggle.addEventListener('click', toggleReviewSection);

    const restartBtn = document.getElementById('restartBtn');
    if (restartBtn && restartBtn.parentNode) {
      restartBtn.parentNode.insertBefore(reviewToggle, restartBtn);
    }
  }

  reviewContainer.innerHTML = `
    <h3 style="margin-top: 1.5rem; margin-bottom: 1rem;">Detailed Answer Review</h3>
  `;

  activeQuestions.forEach((q, idx) => {
    const detail = detailedAnswers[idx];
    const card = document.createElement('div');
    card.className = `review-item ${detail.is_correct ? 'correct' : 'incorrect'}`;

    const correctOption = q.options.find((o) => o.correct);

    card.innerHTML = `
      <div class="review-header">
        <span class="review-status ${detail.is_correct ? 'badge-pass' : 'badge-fail'}">
          ${detail.is_correct ? '✔️ Correct' : '❌ Incorrect'}
        </span>
        <strong style="font-size: 1rem;">Q${idx + 1}: ${escapeHTML(q.question)}</strong>
      </div>
      <div class="review-body" style="margin-top: 0.5rem; font-size: 0.92rem;">
        <p><strong>Your Answer:</strong> <span class="${detail.is_correct ? 'text-success' : 'text-danger'}">${escapeHTML(detail.chosen_text)}</span></p>
        ${!detail.is_correct ? `<p><strong>Correct Answer:</strong> <span class="text-success">${escapeHTML(correctOption ? correctOption.text : 'N/A')}</span></p>` : ''}
      </div>
    `;

    reviewContainer.appendChild(card);
  });
}

function toggleReviewSection() {
  const reviewContainer = document.getElementById('quizAnswersReview');
  const reviewBtn = document.getElementById('reviewAnswersBtn');
  if (reviewContainer) {
    const isHidden = reviewContainer.classList.contains('hidden');
    if (isHidden) {
      reviewContainer.classList.remove('hidden');
      if (reviewBtn) reviewBtn.textContent = 'Hide Answer Review';
      reviewContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
      reviewContainer.classList.add('hidden');
      if (reviewBtn) reviewBtn.textContent = typeof t === 'function' ? t('btn.reviewAnswers') : 'Review All Answers';
    }
  }
}

function restartQuiz() {
  currentQuestionIndex = 0;
  userAnswers = [];

  const quizMode = document.getElementById('activityQuiz');
  const resultsMode = document.getElementById('activityResults');
  const reviewContainer = document.getElementById('quizAnswersReview');
  const reviewBtn = document.getElementById('reviewAnswersBtn');

  if (reviewContainer) reviewContainer.classList.add('hidden');
  if (reviewBtn) reviewBtn.textContent = typeof t === 'function' ? t('btn.reviewAnswers') : 'Review All Answers';

  if (resultsMode) resultsMode.classList.add('hidden');
  if (quizMode) {
    quizMode.classList.remove('hidden');
    renderQuestion();
    quizMode.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeActivity);
} else {
  initializeActivity();
}
