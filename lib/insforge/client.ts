import { createClient } from '@supabase/supabase-js';

const insforgeUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const insforgeAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const insforge = createClient(insforgeUrl, insforgeAnonKey);
