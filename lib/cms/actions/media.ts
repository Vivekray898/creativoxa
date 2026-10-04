"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { findMediaUsage, listMedia, storagePathFromUrl } from "@/lib/cms/media";
import { requireAdmin, requireStaff, backWithError, backWithSuccess } from "@/lib/cms/actions/shared";
import { MEDIA_BUCKET, type MediaObject } from "@/types/cms";
import { str } from "@/lib/cms/validate";

/** Used by the image field's "choose from library" picker. */
export async function listMediaForPicker(): Promise<MediaObject[]> {
  await requireStaff();
  return listMedia();
}

export async function deleteMedia(formData: FormData) {
  await requireAdmin();

  const url = str(formData, "url");
  if (!url) backWithError("/admin/media", "No file selected.");

  const usedBy = await findMediaUsage(url);
  if (usedBy) {
    backWithError(
      "/admin/media",
      `That image is still used by ${usedBy}. Replace it there first, then delete it.`
    );
  }

  const path = storagePathFromUrl(url);
  if (!path) backWithError("/admin/media", "That file isn't managed by the media library.");

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.storage.from(MEDIA_BUCKET).remove([path]);

  if (error) backWithError("/admin/media", error.message);

  revalidatePath("/admin/media");
  backWithSuccess("/admin/media", "File deleted.");
}
