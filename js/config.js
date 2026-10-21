// Paste your Supabase Project URL here (e.g., 'https://xyzcompany.supabase.co')
const SUPABASE_URL = 'https://srolbdwajowxtgmrkals.supabase.co';

// Paste your Supabase 'anon' (public) API Key here
const SUPABASE_ANON_KEY = 'sb_publishable_pjUGvg7m-OGhDPJsTd41SA_LfqGK_A4';

// Export for module systems or window global
if (typeof window !== 'undefined') {
  window.SUPABASE_CONFIG = {
    url: SUPABASE_URL,
    anonKey: SUPABASE_ANON_KEY,
  };
}
