import { createClient } from "@supabase/supabase-js";

export async function uploadThumbnail(image: File) {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_API_KEY!,
  );

  const fileName = image.name || "thumbnail";
  const { data, error } = await supabase.storage
    .from("thumbnails")
    .upload(`${fileName}_${Date.now()}`, image);

  console.log({ data });

  if (error || !data) {
    throw error ?? new Error("Upload failed");
  }

  const urlData = supabase.storage.from("thumbnails").getPublicUrl(data.path);

  return urlData.data.publicUrl;
}
