// @ts-nocheck
import { supabase } from "./supabase";

const BUCKET = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || process.env.SUPABASE_BUCKET || "media";

// bytes → (path, publicURL)
export async function uploadFile(file: File, prefix = "listings"): Promise<{ path: string; url: string }> {
  const ext = (file.name.split(".").pop() || "bin").toLowerCase();
  const key = `${prefix}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { data, error } = await supabase.storage.from(BUCKET).upload(key, file, { upsert: false });
  if (error) throw error;

  const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(data.path);
  return { path: data.path, url: pub.publicUrl };
}

// helpers for multiple
export async function uploadMany(files: FileList | null, prefix = "listings") {
  if (!files || !files.length) return [];
  const arr = Array.from(files);
  const out: string[] = [];
  for (const f of arr) {
    const { url } = await uploadFile(f, prefix);
    out.push(url);
  }
  return out;
}
