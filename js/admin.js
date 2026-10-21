/**
 * LearnAble - Admin Dashboard Logic
 * =================================
 * Secure admin controller using Supabase PostgreSQL & Auth.
 * Features:
 * - Session & RLS admin verification (is_admin function check)
 * - Real-time resource management (Add, Edit, Delete)
 * - Community feedback moderation & CSV export
 * - Quiz activity tracking, scoring analytics & CSV export
 * - Question status toggle
 */

let currentAdminUser = null;
let allAdminResources = [];
let allAdminFeedback = [];
let allAdminAttempts = [];
let allAdminQuestions = [];

/**
 * Initializes dashboard on page load. Checks Supabase auth session.
 */
async function initializeAdminDashboard() {
  if (typeof checkAndShowDatabaseBanner === 'function') {
    checkAndShowDatabaseBanner();
  }

  // 1. Check if database is configured
  if (!window.isSupabaseConfigured || !window.supabaseClient) {
    showUnauthorizedScreen('Database credentials not configured in js/config.js. Please see SUPABASE_SETUP.md (Step 5).');
    return;
  }

  // 2. Verify Authentication and Admin Status
  try {
    const adminCheck = await window.checkAdminStatus();

    if (!adminCheck.user) {
      // User is not signed in at all
      window.location.replace('login.html');
      return;
    }

    if (!adminCheck.isAdmin) {
      // User is signed in, but NOT registered in the 'admins' table
      const email = adminCheck.user.email || 'Your account';
      const uid = adminCheck.user.id;
      showUnauthorizedScreen(`
        Signed in as <strong>${escapeHTML(email)}</strong> (UID: <code>${escapeHTML(uid)}</code>).<br/><br/>
        This account is not authorized in the <code>public.admins</code> table. Only users in the admins table have permission to manage portal data.<br/><br/>
        <strong>To resolve this:</strong> Copy your UID above, open the Supabase SQL Editor, and run:<br/>
        <code>insert into public.admins (user_id) values ('${escapeHTML(uid)}');</code>
      `);
      return;
    }

    // Authenticated & Authorized!
    currentAdminUser = adminCheck.user;
    document.getElementById('currentAdminEmail').textContent = currentAdminUser.email;
    document.getElementById('authorizedApp').classList.remove('hidden');
    document.getElementById('unauthorizedView').classList.add('hidden');

    // Setup UI and load dashboard
    setupTabNavigation();
    setupFilterListeners();
    await loadAllDashboardData();
  } catch (err) {
    console.error('Admin initialization error:', err);
    showUnauthorizedScreen('An unexpected error occurred verifying admin session: ' + err.message);
  }
}

function showUnauthorizedScreen(htmlMessage) {
  const unauthorizedView = document.getElementById('unauthorizedView');
  const msgEl = document.getElementById('unauthorizedMsg');
  const appEl = document.getElementById('authorizedApp');

  if (appEl) appEl.classList.add('hidden');
  if (unauthorizedView && msgEl) {
    msgEl.innerHTML = htmlMessage;
    unauthorizedView.classList.remove('hidden');
  }
}

/**
 * Tab Navigation Setup
 */
function setupTabNavigation() {
  const navBtns = document.querySelectorAll('.admin-nav-item[data-tab]');
  navBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      switchTab(tabId);
    });
  });
}

function switchTab(tabId) {
  // Update sidebar active buttons
  document.querySelectorAll('.admin-nav-item[data-tab]').forEach((btn) => {
    if (btn.getAttribute('data-tab') === tabId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Switch tab panes
  document.querySelectorAll('.admin-tab-pane').forEach((pane) => {
    pane.classList.remove('active');
  });

  const targetPane = document.getElementById(tabId);
  if (targetPane) {
    targetPane.classList.add('active');
  }

  // Update top bar title
  const titleMap = {
    'dashboard': 'Dashboard Overview',
    'resources-mgmt': 'Manage Resources',
    'feedback-view': 'Community Feedback',
    'activities-view': 'Quiz Activity Analytics',
    'quiz-questions-mgmt': 'Manage Quiz Questions',
  };
  const titleEl = document.getElementById('pageSectionTitle');
  if (titleEl && titleMap[tabId]) {
    titleEl.textContent = titleMap[tabId];
  }
}

window.switchTab = switchTab;

/**
 * Filter change event listeners
 */
function setupFilterListeners() {
  const resSearch = document.getElementById('adminResourceSearch');
  const resCat = document.getElementById('adminCategoryFilter');
  if (resSearch) resSearch.addEventListener('input', filterAndRenderAdminResources);
  if (resCat) resCat.addEventListener('change', filterAndRenderAdminResources);

  const fbUserType = document.getElementById('feedbackUserTypeFilter');
  const fbRating = document.getElementById('feedbackRatingFilter');
  if (fbUserType) fbUserType.addEventListener('change', filterAndRenderAdminFeedback);
  if (fbRating) fbRating.addEventListener('change', filterAndRenderAdminFeedback);
}

/**
 * Loads all data concurrently from Supabase
 */
async function loadAllDashboardData() {
  await Promise.all([
    fetchAdminResources(),
    fetchAdminFeedback(),
    fetchAdminAttempts(),
    fetchAdminQuestions(),
  ]);
  updateDashboardAnalytics();
}

/**
 * ----------------------------------------------------------------------------
 * 1. RESOURCES CRUD
 * ----------------------------------------------------------------------------
 */
async function fetchAdminResources() {
  try {
    const { data, error } = await window.supabaseClient
      .from('resources')
      .select('*')
      .order('name', { ascending: true });

    if (error) throw error;
    allAdminResources = data || [];
    filterAndRenderAdminResources();
  } catch (err) {
    console.error('Error fetching admin resources:', err);
    const tbody = document.getElementById('adminResourcesTableBody');
    if (tbody) tbody.innerHTML = `<tr><td colspan="5" style="color: var(--danger); text-align: center;">Error loading resources: ${escapeHTML(err.message)}</td></tr>`;
  }
}

function filterAndRenderAdminResources() {
  const search = (document.getElementById('adminResourceSearch')?.value || '').trim().toLowerCase();
  const cat = document.getElementById('adminCategoryFilter')?.value || '';
  const tbody = document.getElementById('adminResourcesTableBody');
  if (!tbody) return;

  const filtered = allAdminResources.filter((r) => {
    const matchSearch = !search ||
      (r.name && r.name.toLowerCase().includes(search)) ||
      (r.description && r.description.toLowerCase().includes(search)) ||
      (r.source && r.source.toLowerCase().includes(search));
    const matchCat = !cat || r.category === cat;
    return matchSearch && matchCat;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 2rem; color: var(--text-secondary);">No resources match your search or filter.</td></tr>`;
    return;
  }

  tbody.innerHTML = '';
  filtered.forEach((r) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <strong>${escapeHTML(r.name)}</strong>
        <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.25rem;">${escapeHTML(r.description)}</p>
        <a href="${escapeHTML(r.website)}" target="_blank" rel="noopener noreferrer" style="font-size: 0.8rem; color: var(--primary);">Visit Website ↗</a>
      </td>
      <td><span class="resource-category">${escapeHTML(r.category)}</span></td>
      <td>${escapeHTML(r.source)}</td>
      <td style="font-size: 0.88rem;">${escapeHTML(r.verification_date || r.verificationDate || 'Verified')}</td>
      <td>
        <div class="action-btns-group">
          <button class="btn btn-outline" style="padding: 0.35rem 0.65rem; font-size: 0.82rem;" onclick="openEditResourceModal('${r.id}')">Edit</button>
          <button class="btn btn-danger" style="padding: 0.35rem 0.65rem; font-size: 0.82rem;" onclick="handleDeleteResource('${r.id}', '${escapeHTML(r.name)}')">Delete</button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function openAddResourceModal() {
  const card = document.getElementById('resourceEditorCard');
  const title = document.getElementById('resourceEditorTitle');
  const form = document.getElementById('resourceForm');
  document.getElementById('editResourceId').value = '';
  form.reset();
  title.textContent = 'Add New Verified Resource';
  card.classList.remove('hidden');
  card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
window.openAddResourceModal = openAddResourceModal;

function openEditResourceModal(id) {
  const resource = allAdminResources.find((r) => String(r.id) === String(id));
  if (!resource) return;

  const card = document.getElementById('resourceEditorCard');
  const title = document.getElementById('resourceEditorTitle');
  document.getElementById('editResourceId').value = resource.id;
  document.getElementById('resFormName').value = resource.name || '';
  document.getElementById('resFormCategory').value = resource.category || '';
  document.getElementById('resFormDesc').value = resource.description || '';
  document.getElementById('resFormWebsite').value = resource.website || '';
  document.getElementById('resFormSource').value = resource.source || '';

  title.textContent = 'Edit Resource: ' + resource.name;
  card.classList.remove('hidden');
  card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
window.openEditResourceModal = openEditResourceModal;

function closeResourceEditor() {
  document.getElementById('resourceEditorCard')?.classList.add('hidden');
}
window.closeResourceEditor = closeResourceEditor;

async function handleSaveResource(event) {
  event.preventDefault();
  const id = document.getElementById('editResourceId').value;
  const name = document.getElementById('resFormName').value.trim();
  const category = document.getElementById('resFormCategory').value;
  const description = document.getElementById('resFormDesc').value.trim();
  const website = document.getElementById('resFormWebsite').value.trim();
  const source = document.getElementById('resFormSource').value.trim();
  const saveBtn = document.getElementById('saveResourceBtn');

  if (!name || !category || !description || !website || !source) {
    alert('Please fill out all required fields.');
    return;
  }

  saveBtn.disabled = true;
  saveBtn.textContent = 'Saving...';

  try {
    if (id) {
      // Update existing
      const { error } = await window.supabaseClient
        .from('resources')
        .update({ name, category, description, website, source })
        .eq('id', id);

      if (error) throw error;
    } else {
      // Insert new
      const { error } = await window.supabaseClient
        .from('resources')
        .insert([{
          name,
          category,
          description,
          website,
          source,
          verification_date: new Date().toISOString().split('T')[0],
          status: 'Verified'
        }]);

      if (error) throw error;
    }

    closeResourceEditor();
    await fetchAdminResources();
    updateDashboardAnalytics();
  } catch (err) {
    console.error('Error saving resource:', err);
    alert('Failed to save resource: ' + err.message);
  } finally {
    saveBtn.disabled = false;
    saveBtn.textContent = 'Save Resource';
  }
}
window.handleSaveResource = handleSaveResource;

async function handleDeleteResource(id, name) {
  if (!confirm(`Are you sure you want to delete the resource "${name}"?\nThis cannot be undone.`)) {
    return;
  }

  try {
    const { error } = await window.supabaseClient
      .from('resources')
      .delete()
      .eq('id', id);

    if (error) throw error;
    await fetchAdminResources();
    updateDashboardAnalytics();
  } catch (err) {
    console.error('Error deleting resource:', err);
    alert('Failed to delete resource: ' + err.message);
  }
}
window.handleDeleteResource = handleDeleteResource;


/**
 * ----------------------------------------------------------------------------
 * 2. FEEDBACK MANAGEMENT & EXPORT
 * ----------------------------------------------------------------------------
 */
async function fetchAdminFeedback() {
  try {
    const { data, error } = await window.supabaseClient
      .from('feedback')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    allAdminFeedback = data || [];
    filterAndRenderAdminFeedback();
  } catch (err) {
    console.error('Error fetching admin feedback:', err);
    const tbody = document.getElementById('adminFeedbackTableBody');
    if (tbody) tbody.innerHTML = `<tr><td colspan="6" style="color: var(--danger); text-align: center;">Error loading feedback: ${escapeHTML(err.message)}</td></tr>`;
  }
}

function filterAndRenderAdminFeedback() {
  const role = document.getElementById('feedbackUserTypeFilter')?.value || '';
  const rating = document.getElementById('feedbackRatingFilter')?.value || '';
  const tbody = document.getElementById('adminFeedbackTableBody');
  const countDisplay = document.getElementById('feedbackCountDisplay');
  if (!tbody) return;

  const filtered = allAdminFeedback.filter((item) => {
    const matchRole = !role || item.user_type === role;
    const matchRating = !rating || String(item.rating) === String(rating);
    return matchRole && matchRating;
  });

  if (countDisplay) {
    countDisplay.textContent = `Showing ${filtered.length} of ${allAdminFeedback.length} entries`;
  }

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; padding: 2rem; color: var(--text-secondary);">No feedback entries matching selected criteria.</td></tr>`;
    return;
  }

  tbody.innerHTML = '';
  filtered.forEach((item) => {
    const tr = document.createElement('tr');
    const dateStr = item.created_at ? new Date(item.created_at).toLocaleString('en-IN') : 'Recent';
    const stars = '★'.repeat(item.rating) + '☆'.repeat(5 - item.rating);

    tr.innerHTML = `
      <td>
        <strong>${escapeHTML(item.name || 'Anonymous')}</strong><br/>
        <span class="resource-category" style="font-size: 0.78rem;">${escapeHTML(item.user_type || 'Other')}</span>
      </td>
      <td>
        <span style="color: #f59e0b; font-size: 1.1rem;" title="${item.rating}/5">${stars}</span>
        <span style="font-size: 0.85rem; font-weight: 600; margin-left: 0.25rem;">${item.rating}/5</span>
      </td>
      <td style="max-width: 320px; line-height: 1.45;">${escapeHTML(item.feedback)}</td>
      <td style="max-width: 220px; color: var(--text-secondary); font-size: 0.88rem;">${escapeHTML(item.suggestions || '—')}</td>
      <td style="font-size: 0.82rem; white-space: nowrap; color: var(--text-secondary);">${escapeHTML(dateStr)}</td>
      <td>
        <button class="btn btn-danger" style="padding: 0.35rem 0.65rem; font-size: 0.82rem;" onclick="handleDeleteFeedback('${item.id}')">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

async function handleDeleteFeedback(id) {
  if (!confirm('Are you sure you want to delete this feedback entry?')) return;

  try {
    const { error } = await window.supabaseClient
      .from('feedback')
      .delete()
      .eq('id', id);

    if (error) throw error;
    await fetchAdminFeedback();
    updateDashboardAnalytics();
  } catch (err) {
    console.error('Error deleting feedback:', err);
    alert('Failed to delete feedback: ' + err.message);
  }
}
window.handleDeleteFeedback = handleDeleteFeedback;

function exportFeedbackToCSV() {
  if (!allAdminFeedback || allAdminFeedback.length === 0) {
    alert('No feedback data available to export.');
    return;
  }

  const headers = ['ID', 'Name', 'User Type', 'Rating', 'Feedback', 'Suggestions', 'Created At'];
  const rows = allAdminFeedback.map((f) => [
    `"${f.id}"`,
    `"${(f.name || 'Anonymous').replace(/"/g, '""')}"`,
    `"${(f.user_type || '').replace(/"/g, '""')}"`,
    f.rating,
    `"${(f.feedback || '').replace(/"/g, '""')}"`,
    `"${(f.suggestions || '').replace(/"/g, '""')}"`,
    `"${f.created_at || ''}"`,
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
  downloadBlob(csvContent, 'learnable-feedback.csv', 'text/csv;charset=utf-8;');
}
window.exportFeedbackToCSV = exportFeedbackToCSV;


/**
 * ----------------------------------------------------------------------------
 * 3. QUIZ ATTEMPTS & ANALYTICS
 * ----------------------------------------------------------------------------
 */
async function fetchAdminAttempts() {
  try {
    const { data, error } = await window.supabaseClient
      .from('quiz_attempts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    allAdminAttempts = data || [];
    renderAdminAttempts();
  } catch (err) {
    console.error('Error fetching admin attempts:', err);
    const tbody = document.getElementById('adminAttemptsTableBody');
    if (tbody) tbody.innerHTML = `<tr><td colspan="5" style="color: var(--danger); text-align: center;">Error loading attempts: ${escapeHTML(err.message)}</td></tr>`;
  }
}

function renderAdminAttempts() {
  const tbody = document.getElementById('adminAttemptsTableBody');
  const totalEl = document.getElementById('actTotalAttempts');
  const avgScoreEl = document.getElementById('actAvgScore');
  const passRateEl = document.getElementById('actPassRate');
  if (!tbody) return;

  const total = allAdminAttempts.length;
  if (totalEl) totalEl.textContent = total;

  if (total === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 2rem; color: var(--text-secondary);">No quiz attempts completed yet.</td></tr>`;
    if (avgScoreEl) avgScoreEl.textContent = '0%';
    if (passRateEl) passRateEl.textContent = '0%';
    return;
  }

  const sumScore = allAdminAttempts.reduce((acc, curr) => acc + (curr.percentage || 0), 0);
  const avg = Math.round(sumScore / total);
  const passCount = allAdminAttempts.filter((a) => (a.percentage || 0) >= 60).length;
  const passRate = Math.round((passCount / total) * 100);

  if (avgScoreEl) avgScoreEl.textContent = `${avg}%`;
  if (passRateEl) passRateEl.textContent = `${passRate}%`;

  tbody.innerHTML = '';
  allAdminAttempts.forEach((att) => {
    const tr = document.createElement('tr');
    const dateStr = att.created_at ? new Date(att.created_at).toLocaleString('en-IN') : 'Recent';
    const isPassing = (att.percentage || 0) >= 60;

    tr.innerHTML = `
      <td style="font-size: 0.88rem;">${escapeHTML(dateStr)}</td>
      <td><strong>${att.score} / ${att.total}</strong></td>
      <td>
        <span class="review-status ${isPassing ? 'badge-pass' : 'badge-warn'}">
          ${att.percentage}%
        </span>
      </td>
      <td>${escapeHTML(att.user_type || 'General Learner')}</td>
      <td>${isPassing ? '✅ Proficient' : '📖 In Progress'}</td>
    `;
    tbody.appendChild(tr);
  });
}

function exportQuizAttemptsToCSV() {
  if (!allAdminAttempts || allAdminAttempts.length === 0) {
    alert('No quiz attempts data available to export.');
    return;
  }

  const headers = ['ID', 'Score', 'Total', 'Percentage', 'User Type', 'Created At'];
  const rows = allAdminAttempts.map((a) => [
    `"${a.id}"`,
    a.score,
    a.total,
    a.percentage,
    `"${(a.user_type || '').replace(/"/g, '""')}"`,
    `"${a.created_at || ''}"`,
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
  downloadBlob(csvContent, 'learnable-quiz-attempts.csv', 'text/csv;charset=utf-8;');
}
window.exportQuizAttemptsToCSV = exportQuizAttemptsToCSV;


/**
 * ----------------------------------------------------------------------------
 * 4. QUIZ QUESTIONS MANAGEMENT
 * ----------------------------------------------------------------------------
 */
async function fetchAdminQuestions() {
  try {
    const { data, error } = await window.supabaseClient
      .from('quiz_questions')
      .select('id, question, sort_order, is_active, quiz_options(id)')
      .order('sort_order', { ascending: true });

    if (error) throw error;
    allAdminQuestions = data || [];
    renderAdminQuestions();
  } catch (err) {
    console.error('Error fetching questions:', err);
    const tbody = document.getElementById('adminQuestionsTableBody');
    if (tbody) tbody.innerHTML = `<tr><td colspan="5" style="color: var(--danger); text-align: center;">Error loading questions: ${escapeHTML(err.message)}</td></tr>`;
  }
}

function renderAdminQuestions() {
  const tbody = document.getElementById('adminQuestionsTableBody');
  if (!tbody) return;

  if (allAdminQuestions.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 2rem;">No questions found in database.</td></tr>`;
    return;
  }

  tbody.innerHTML = '';
  allAdminQuestions.forEach((q, idx) => {
    const tr = document.createElement('tr');
    const optCount = q.quiz_options ? q.quiz_options.length : 0;

    tr.innerHTML = `
      <td>${idx + 1}</td>
      <td><strong>${escapeHTML(q.question)}</strong></td>
      <td>${optCount} options</td>
      <td>
        <span class="review-status ${q.is_active ? 'badge-pass' : 'badge-fail'}">
          ${q.is_active ? 'Active' : 'Disabled'}
        </span>
      </td>
      <td>
        <button class="btn btn-outline" style="padding: 0.35rem 0.65rem; font-size: 0.82rem;" onclick="toggleQuestionActive('${q.id}', ${q.is_active})">
          ${q.is_active ? 'Disable' : 'Enable'}
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

async function toggleQuestionActive(id, currentStatus) {
  try {
    const { error } = await window.supabaseClient
      .from('quiz_questions')
      .update({ is_active: !currentStatus })
      .eq('id', id);

    if (error) throw error;
    await fetchAdminQuestions();
  } catch (err) {
    console.error('Error toggling question:', err);
    alert('Failed to update question status: ' + err.message);
  }
}
window.toggleQuestionActive = toggleQuestionActive;


/**
 * ----------------------------------------------------------------------------
 * 5. DASHBOARD STATS REFRESH
 * ----------------------------------------------------------------------------
 */
function updateDashboardAnalytics() {
  const totalRes = allAdminResources.length;
  const totalFb = allAdminFeedback.length;
  const totalAtt = allAdminAttempts.length;

  document.getElementById('dashTotalResources').textContent = totalRes;
  document.getElementById('dashTotalFeedback').textContent = totalFb;
  document.getElementById('dashTotalAttempts').textContent = totalAtt;

  // Average Rating
  if (totalFb > 0) {
    const ratingSum = allAdminFeedback.reduce((acc, curr) => acc + (curr.rating || 0), 0);
    const avgRating = (ratingSum / totalFb).toFixed(1);
    document.getElementById('dashAvgRating').textContent = `Avg Rating: ${avgRating} / 5.0`;
  } else {
    document.getElementById('dashAvgRating').textContent = 'Avg Rating: -- / 5';
  }

  // Average Score
  if (totalAtt > 0) {
    const scoreSum = allAdminAttempts.reduce((acc, curr) => acc + (curr.percentage || 0), 0);
    const avgScore = Math.round(scoreSum / totalAtt);
    document.getElementById('dashAvgScore').textContent = `Avg Score: ${avgScore}%`;
  } else {
    document.getElementById('dashAvgScore').textContent = 'Avg Score: --%';
  }

  // Breakdown by Role
  const roleBreakdownContainer = document.getElementById('roleBreakdownList');
  if (roleBreakdownContainer) {
    const roles = ['Learner', 'Parent', 'Educator', 'Other'];
    roleBreakdownContainer.innerHTML = '';

    roles.forEach((r) => {
      const count = allAdminFeedback.filter((item) => item.user_type === r).length;
      const pct = totalFb > 0 ? Math.round((count / totalFb) * 100) : 0;

      const box = document.createElement('div');
      box.style.background = 'var(--bg-soft)';
      box.style.padding = '0.85rem';
      box.style.borderRadius = '6px';
      box.style.border = '1px solid var(--border-color)';
      box.innerHTML = `
        <div style="font-weight: 600; font-size: 0.95rem;">${r}</div>
        <div style="font-size: 1.4rem; font-weight: 700; color: var(--primary); margin: 0.25rem 0;">${count}</div>
        <div style="font-size: 0.8rem; color: var(--text-secondary);">${pct}% of submissions</div>
      `;
      roleBreakdownContainer.appendChild(box);
    });
  }

  // Recent Feedback snippet
  const recentContainer = document.getElementById('dashRecentFeedback');
  if (recentContainer) {
    const recent = allAdminFeedback.slice(0, 3);
    if (recent.length === 0) {
      recentContainer.innerHTML = '<p style="color: var(--text-secondary); margin: 0;">No feedback entries yet.</p>';
    } else {
      recentContainer.innerHTML = '';
      recent.forEach((item) => {
        const itemEl = document.createElement('div');
        itemEl.style.padding = '0.75rem 0';
        itemEl.style.borderBottom = '1px solid var(--border-color)';
        itemEl.innerHTML = `
          <div style="display: flex; justify-content: space-between; font-size: 0.9rem;">
            <strong>${escapeHTML(item.name || 'Anonymous')} (${escapeHTML(item.user_type)})</strong>
            <span style="color: #f59e0b;">${'★'.repeat(item.rating)}</span>
          </div>
          <p style="margin: 0.25rem 0; font-size: 0.88rem; color: var(--gray-700);">${escapeHTML(item.feedback)}</p>
        `;
        recentContainer.appendChild(itemEl);
      });
    }
  }
}

/**
 * Helper to download CSV in browser
 */
function downloadBlob(content, filename, contentType) {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const pom = document.createElement('a');
  pom.href = url;
  pom.setAttribute('download', filename);
  pom.click();
  URL.revokeObjectURL(url);
}

/**
 * Sign out admin session
 */
async function handleAdminLogout() {
  if (window.supabaseClient) {
    try {
      await window.supabaseClient.auth.signOut();
    } catch (err) {
      console.warn('SignOut error:', err);
    }
  }
  window.location.replace('login.html');
}
window.handleAdminLogout = handleAdminLogout;

// Run initialization
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeAdminDashboard);
} else {
  initializeAdminDashboard();
}
