import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
// If keys are missing, we'll handle it gracefully in the app
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type UserProfile = {
  id: string;
  email: string;
  full_name?: string;
  subscription_tier: 'starter' | 'pro' | 'enterprise';
  license_key?: string;
};
