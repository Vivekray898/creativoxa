import { createSupabaseServerClient } from "@/lib/supabase/server";
import { MEDIA_BUCKET, type MediaObject } from "@/types/cms";
import { MEDIA_FOLDER, publicUrlFor } from "@/lib/media-upload";

export { MEDIA_FOLDER, publicUrlFor, storagePathFromUrl } from "@/lib/media-upload";

/** Every file currently in the bucket, newest first. */
export async function listMedia(): Promise<MediaObject[]> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.storage.from(MEDIA_BUCKET).list(MEDIA_FOLDER, {
    limit: 200,
    sortBy: { column: "created_at", order: "desc" },
  });

  if (error || !data) return [];

  return data
    .filter((entry) => entry.name && entry.id)
    .map((entry) => ({
      name: entry.name,
      url: publicUrlFor(`${MEDIA_FOLDER}/${entry.name}`),
      size: (entry.metadata as { size?: number } | null)?.size ?? null,
      createdAt: entry.created_at ?? null,
    }));
}

/**
 * Which record, if any, still points at this file.
 *
 * Deleting an image another page uses would silently break that page, so the
 * library refuses instead of guessing.
 */
export async function findMediaUsage(url: string): Promise<string | null> {
  const supabase = await createSupabaseServerClient();

  const checks: { label: string; run: () => PromiseLike<{ count: number | null; error: unknown }> }[] = [
    {
      label: "a service",
      run: () =>
        supabase.from("services").select("id", { count: "exact", head: true }).eq("image_url", url),
    },
    {
      label: "an industry",
      run: () =>
        supabase.from("industries").select("id", { count: "exact", head: true }).eq("image_url", url),
    },
    {
      label: "a case study",
      run: () =>
        supabase
          .from("case_studies")
          .select("id", { count: "exact", head: true })
          .eq("featured_image", url),
    },
    {
      label: "an insight",
      run: () =>
        supabase.from("insights").select("id", { count: "exact", head: true }).eq("featured_image", url),
    },
    {
      label: "a testimonial",
      run: () =>
        supabase.from("testimonials").select("id", { count: "exact", head: true }).eq("photo_url", url),
    },
    {
      label: "Site settings",
      run: () =>
        supabase.from("site_settings").select("id", { count: "exact", head: true }).eq("og_image", url),
    },
    {
      label: "Homepage settings",
      run: () =>
        supabase
          .from("homepage_settings")
          .select("id", { count: "exact", head: true })
          .eq("hero_image", url),
    },
  ];

  for (const check of checks) {
    const { count, error } = await check.run();
    if (!error && count && count > 0) return check.label;
  }

  return null;
}
