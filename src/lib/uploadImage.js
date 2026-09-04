import { supabase, STORAGE_BUCKET } from "./supabaseClient";

export async function uploadProjectImage(file, projectId) {
  if (!supabase) throw new Error("Backend not configured.");
  const ext = file.name.split(".").pop();
  const path = `${projectId}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { error } = await supabase.storage.from(STORAGE_BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw error;

  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export default uploadProjectImage;
