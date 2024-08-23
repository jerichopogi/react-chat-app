import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cxndclzhyhperzkbvlzl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4bmRjbHpoeWhwZXJ6a2J2bHpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ0Mzk4MjMsImV4cCI6MjA0MDAxNTgyM30.vZWaTF7GI32_-t-pbP74U-e_VXYEMFZT-s01_mZEBsg';

export const supabase = createClient(supabaseUrl, supabaseKey);
