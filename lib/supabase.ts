import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tisrkkhaofwddeipatbt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpc3Jra2hhb2Z3ZGRlaXBhdGJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzMzc4NzAsImV4cCI6MjA4NTkxMzg3MH0.nT8voAwRpHVHaGV2bqQwqgBnuQ8mY7mTHXnPAmkxZoQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
