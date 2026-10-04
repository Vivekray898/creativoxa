import { MEDIA_BUCKET } from "@/types/cms";

// Client-safe helpers (no server imports) — used by the browser uploader and by
// the server-side media library alike, so the rules can never drift apart.

/** Flat folder keeps the library easy to list and de-duplicate. */
export const MEDIA_FOLDER = "uploads";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/svg+xml"];
export const MAX_MEDIA_BYTES = 5 * 1024 * 1024;

export function isAllowedImage(file: { type: string; size: number }): string | null {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return "Only JPG, PNG, WebP and SVG images are allowed.";
  }
  if (file.size > MAX_MEDIA_BYTES) {
    return "Images must be smaller than 5 MB.";
  }
  return null;
}

/** `My Photo (1).PNG` → `uploads/1730000000-my-photo-1.png` */
export function buildStoragePath(fileName: string): string {
  const extension = fileName.includes(".")
    ? `.${fileName.split(".").pop()!.toLowerCase().replace(/[^a-z0-9]/g, "")}`
    : "";
  const base = fileName
    .slice(0, fileName.length - extension.length)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

  return `${MEDIA_FOLDER}/${Date.now()}-${base || "image"}${extension}`;
}

export function publicUrlFor(path: string): string {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) return "";
  return `${base}/storage/v1/object/public/${MEDIA_BUCKET}/${path}`;
}

export function storagePathFromUrl(url: string): string | null {
  const marker = `/storage/v1/object/public/${MEDIA_BUCKET}/`;
  const index = url.indexOf(marker);
  if (index === -1) return null;
  return decodeURIComponent(url.slice(index + marker.length));
}

export function formatBytes(bytes: number | null): string {
  if (!bytes) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
