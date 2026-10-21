/**
 * LearnAble - Supabase Client Initialization & Helpers
 * ====================================================
 * Connects to Supabase using the credentials in js/config.js.
 * Handles unconfigured states gracefully with beginner-friendly banners.
 */

// Helper to escape HTML characters and prevent Cross-Site Scripting (XSS)
function escapeHTML(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Global flag and client instance
let supabaseClient = null;
let isConfigured = false;

(function initSupabase() {
  const config = window.SUPABASE_CONFIG || {
    url: typeof SUPABASE_URL !== 'undefined' ? SUPABASE_URL : '',
    anonKey: typeof SUPABASE_ANON_KEY !== 'undefined' ? SUPABASE_ANON_KEY : '',
  };

  const url = (config.url || '').trim();
  const anonKey = (config.anonKey || '').trim();

  // Check if user has pasted real Supabase credentials
  const isUrlConfigured =
    url.length > 0 &&
    !url.includes('PASTE_YOUR_PROJECT_URL_HERE') &&
    url.startsWith('https://');

  const isKeyConfigured =
    anonKey.length > 0 &&
    !anonKey.includes('PASTE_YOUR_ANON_KEY_HERE') &&
    anonKey.length > 20;

  if (isUrlConfigured && isKeyConfigured) {
    if (window.supabase && typeof window.supabase.createClient === 'function') {
      try {
        supabaseClient = window.supabase.createClient(url, anonKey, {
          auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true,
          },
        });
        isConfigured = true;
      } catch (err) {
        console.warn('LearnAble: Error initializing Supabase client:', err);
      }
    } else {
      console.warn('LearnAble: Supabase CDN script not loaded before supabase-client.js');
    }
  }

  window.isSupabaseConfigured = isConfigured;
  window.supabaseClient = supabaseClient;
  window.escapeHTML = escapeHTML;
})();

/**
 * Shows a friendly banner if the database is not connected yet.
 * Only called on pages that actively require database connection
 * (feedback, resources, activities, admin, login).
 */
function checkAndShowDatabaseBanner() {
  if (window.isSupabaseConfigured) return;

  // Don't duplicate banner if already inserted
  if (document.getElementById('db-setup-banner')) return;

  const banner = document.createElement('div');
  banner.id = 'db-setup-banner';
  banner.setAttribute('role', 'alert');
  banner.className = 'db-setup-banner';
  banner.innerHTML = `
    <div class="db-banner-content">
      <span class="db-banner-icon" aria-hidden="true">ℹ️</span>
      <div class="db-banner-text">
        <strong>Database not connected yet</strong> — see <code>SUPABASE_SETUP.md</code> (Step 5) to connect your free Supabase project, or <a href="setup-check.html" class="db-banner-link">run the Setup Check self-test</a>.
      </div>
    </div>
  `;

  // Insert at top of main content or below header
  const header = document.querySelector('.site-header') || document.querySelector('.admin-header-bar') || document.body;
  if (header && header.nextSibling) {
    header.parentNode.insertBefore(banner, header.nextSibling);
  } else {
    document.body.prepend(banner);
  }
}

/**
 * Checks if the currently authenticated user is listed in the 'admins' table.
 * Returns { isAdmin: boolean, user: object|null, error: any }
 */
async function checkAdminStatus() {
  if (!supabaseClient) {
    return { isAdmin: false, user: null, error: 'Database not connected' };
  }

  try {
    const { data: { session }, error: sessionError } = await supabaseClient.auth.getSession();
    if (sessionError || !session || !session.user) {
      return { isAdmin: false, user: null, error: sessionError || 'No active session' };
    }

    const user = session.user;

    // Check if user's UID exists in public.admins
    const { data: adminData, error: adminError } = await supabaseClient
      .from('admins')
      .select('user_id')
      .eq('user_id', user.id)
      .maybeSingle();

    if (adminError) {
      return { isAdmin: false, user, error: adminError.message };
    }

    return {
      isAdmin: !!adminData,
      user,
      error: null,
    };
  } catch (err) {
    return { isAdmin: false, user: null, error: err.message };
  }
}

window.checkAndShowDatabaseBanner = checkAndShowDatabaseBanner;
window.checkAdminStatus = checkAdminStatus;
