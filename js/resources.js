/**
 * LearnAble - Verified Resource Directory
 * =======================================
 * Fetches verified resources from Supabase 'resources' table.
 * Provides client-side real-time filtering, search, loading skeletons,
 * and graceful fallback data when offline.
 */

// Fallback verified resources data if database is not connected
const fallbackResources = [
  {
    id: 'fb-1',
    name: 'National Center for Learning Disabilities (NCLD)',
    category: 'Assessment',
    description: 'Authoritative information about assessment, identification, early screening, and support for learning differences.',
    website: 'https://www.ncld.org',
    source: 'NCLD',
    verification_date: '2024-09-01',
    status: 'Verified',
  },
  {
    id: 'fb-2',
    name: 'International Dyslexia Association',
    category: 'Awareness',
    description: 'Global non-profit providing evidence-based research, structured literacy guides, and awareness regarding dyslexia.',
    website: 'https://dyslexiaida.org',
    source: 'IDA',
    verification_date: '2024-09-01',
    status: 'Verified',
  },
  {
    id: 'fb-3',
    name: 'Learning Disabilities Association of America',
    category: 'Learning Support',
    description: 'Comprehensive support resources, study tips, advocacy, and guidance for learners, parents, and educators.',
    website: 'https://ldaamerica.org',
    source: 'LDA',
    verification_date: '2024-09-01',
    status: 'Verified',
  },
  {
    id: 'fb-4',
    name: 'Understood - Learning and Thinking Differences',
    category: 'Parent Support',
    description: 'Practical strategies and expert guidance for parents navigating ADHD, dyslexia, and executive function challenges.',
    website: 'https://www.understood.org',
    source: 'Understood',
    verification_date: '2024-09-01',
    status: 'Verified',
  },
  {
    id: 'fb-5',
    name: 'NIEPID - Inclusive Education & Learning Disability Resources',
    category: 'Teacher Support',
    description: 'National Institute for the Empowerment of Persons with Intellectual Disabilities (Govt. of India) providing screening tools, teacher guidelines, and curriculum adaptations.',
    website: 'https://niepid.nic.in',
    source: 'NIEPID, Govt of India',
    verification_date: '2024-09-01',
    status: 'Verified',
  },
  {
    id: 'fb-6',
    name: 'UNESCO Inclusive Education Framework',
    category: 'Inclusive Education',
    description: 'International guidelines, policy frameworks, and best practices for creating accessible, inclusive education systems.',
    website: 'https://en.unesco.org/themes/inclusion-education',
    source: 'UNESCO',
    verification_date: '2024-09-01',
    status: 'Verified',
  },
];

let allResources = [];

async function initializeResources() {
  if (typeof checkAndShowDatabaseBanner === 'function') {
    checkAndShowDatabaseBanner();
  }

  const searchInput = document.getElementById('resourceSearch');
  const categoryFilter = document.getElementById('categoryFilter');
  const container = document.getElementById('resourcesContainer');

  if (!container) return;

  if (searchInput) {
    searchInput.addEventListener('input', filterResources);
  }
  if (categoryFilter) {
    categoryFilter.addEventListener('change', filterResources);
  }

  // Show loading skeleton
  renderLoadingSkeleton(container);

  // Fetch from Supabase
  try {
    if (window.isSupabaseConfigured && window.supabaseClient) {
      const { data, error } = await window.supabaseClient
        .from('resources')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      allResources = data && data.length > 0 ? data : fallbackResources;
    } else {
      allResources = fallbackResources;
    }
  } catch (err) {
    console.warn('LearnAble: Could not fetch resources from database, using fallback:', err);
    allResources = fallbackResources;
  }

  displayResources(allResources);
}

function renderLoadingSkeleton(container) {
  container.innerHTML = '';
  for (let i = 0; i < 6; i++) {
    const skeleton = document.createElement('div');
    skeleton.className = 'resource-card skeleton-card';
    skeleton.innerHTML = `
      <div class="skeleton-line" style="width: 70%; height: 24px; margin-bottom: 0.75rem;"></div>
      <div class="skeleton-line" style="width: 30%; height: 18px; margin-bottom: 1rem;"></div>
      <div class="skeleton-line" style="width: 100%; height: 16px; margin-bottom: 0.5rem;"></div>
      <div class="skeleton-line" style="width: 90%; height: 16px; margin-bottom: 1rem;"></div>
      <div class="skeleton-line" style="width: 40%; height: 38px; margin-top: 1rem;"></div>
    `;
    container.appendChild(skeleton);
  }
}

function filterResources() {
  const searchInput = document.getElementById('resourceSearch');
  const categoryFilter = document.getElementById('categoryFilter');
  const searchTerm = (searchInput?.value || '').trim().toLowerCase();
  const selectedCategory = categoryFilter?.value || '';

  const filtered = allResources.filter((resource) => {
    const name = (resource.name || '').toLowerCase();
    const desc = (resource.description || '').toLowerCase();
    const source = (resource.source || '').toLowerCase();
    const matchesSearch = !searchTerm || name.includes(searchTerm) || desc.includes(searchTerm) || source.includes(searchTerm);
    const matchesCategory = !selectedCategory || resource.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  displayResources(filtered);
}

function displayResources(resources) {
  const container = document.getElementById('resourcesContainer');
  const noResults = document.getElementById('noResults');

  if (!container) return;

  if (!resources || resources.length === 0) {
    container.innerHTML = '';
    if (noResults) noResults.classList.remove('hidden');
    return;
  }

  if (noResults) noResults.classList.add('hidden');
  container.innerHTML = '';

  resources.forEach((resource) => {
    const card = document.createElement('div');
    card.className = 'resource-card';

    // Safe DOM creation to prevent XSS
    const title = document.createElement('h3');
    title.textContent = resource.name || 'Resource';

    const categoryBadge = document.createElement('span');
    categoryBadge.className = 'resource-category';
    categoryBadge.textContent = resource.category || 'General';

    const desc = document.createElement('p');
    desc.textContent = resource.description || '';

    const meta = document.createElement('div');
    meta.className = 'resource-meta';

    const sourceP = document.createElement('p');
    sourceP.innerHTML = `<strong>Source:</strong> ${escapeHTML(resource.source || 'Verified Partner')}`;

    const dateP = document.createElement('p');
    const dateVal = resource.verification_date || resource.verificationDate || 'Verified';
    dateP.innerHTML = `<strong>Verified:</strong> ${escapeHTML(dateVal)}`;

    meta.appendChild(sourceP);
    meta.appendChild(dateP);

    const actions = document.createElement('div');
    actions.className = 'resource-actions';

    const link = document.createElement('a');
    link.href = resource.website || '#';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.className = 'btn btn-primary';
    link.textContent = typeof t === 'function' ? t('btn.visitResource') : 'Visit Resource';

    actions.appendChild(link);

    card.appendChild(title);
    card.appendChild(categoryBadge);
    card.appendChild(desc);
    card.appendChild(meta);
    card.appendChild(actions);

    container.appendChild(card);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeResources);
} else {
  initializeResources();
}
