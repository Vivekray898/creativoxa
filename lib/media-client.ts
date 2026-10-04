"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { buildStoragePath, isAllowedImage } from "@/lib/media-upload";
import { MEDIA_BUCKET } from "@/types/cms";

/**
 * Validates (client + storage policy both enforce it), compresses when it is
 * worth it, uploads, and returns the public URL.
 *
 * Compression is skipped for SVG (it is already a vector) and for small files,
 * and a compression failure falls back to the original rather than blocking the
 * upload.
 */
export async function uploadImageFile(file: File): Promise<string> {
  const problem = isAllowedImage(file);
  if (problem) throw new Error(problem);

  let payload: File = file;

  if (file.type !== "image/svg+xml" && file.size > 400 * 1024) {
    try {
      const { default: imageCompression } = await import("browser-image-compression");
      payload = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 2000,
        useWebWorker: true,
        initialQuality: 0.85,
      });
    } catch {
      // Keep the original file when compression isn't possible.
    }
  }

  const supabase = createSupabaseBrowserClient();
  const path = buildStoragePath(file.name);

  const { error } = await supabase.storage.from(MEDIA_BUCKET).upload(path, payload, {
    cacheControl: "31536000",
    contentType: payload.type || file.type,
    upsert: false,
  });

  if (error) throw new Error(error.message);

  return supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path).data.publicUrl;
}
