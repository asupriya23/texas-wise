import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://paugkgluinzzhbraxzxm.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhdWdrZ2x1aW56emhicmF4enhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2MTkxMTcsImV4cCI6MjA1ODE5NTExN30.c5eKhJIUB2VJvcUu0TB-gCV4KcCov4l_Bj568ufizYo";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);