import { createClient } from '@supabase/supabase-js';

// Pull the keys from the Astro environment (with fallbacks to prevent SSR crashes)
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabasePublishableKey = import.meta.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'placeholder';

// Forge the connection
export const supabase = createClient(supabaseUrl, supabasePublishableKey);
