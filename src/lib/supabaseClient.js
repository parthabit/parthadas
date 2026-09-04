import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

// If env vars aren't set (e.g. running the static export without a backend),
// `supabase` stays null and callers fall back to the bundled static data.
export const supabase = url && key ? createClient(url, key) : null;

export const STORAGE_BUCKET = "project-images";

export default supabase;
