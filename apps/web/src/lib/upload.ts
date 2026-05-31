import { createClient } from "@supabase/supabase-js";

export async function uploadThumbnail(image: File) {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_API_KEY!,
  );

  const fileBuffer = await image.arrayBuffer();
  const safeFileName = (image.name || "thumbnail")
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9._-]/g, "");
  const filePath = `${Date.now()}-${safeFileName}`;

  const { data, error } = await supabase.storage
    .from("thumbnails")
    .upload(filePath, fileBuffer, {
      contentType: image.type || "application/octet-stream",
      upsert: false,
    });

  if (error || !data) {
    throw error ?? new Error("Upload failed");
  }

  const urlData = supabase.storage.from("thumbnails").getPublicUrl(data.path);

  return urlData.data.publicUrl;
}
