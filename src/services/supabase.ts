import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if credentials are set
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : (null as any); // Fallback to null in local demo mode

if (!isSupabaseConfigured) {
  console.warn(
    'CareerAI: Supabase environment variables (VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY) are missing. ' +
    'The platform is automatically running in Local Demo Mode using LocalStorage.'
  );
}
