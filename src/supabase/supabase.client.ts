import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.SUPABASE_URL || "http://127.0.0.1/54321" ,
  process.env.ANON_KEY || "1234567890",
);
