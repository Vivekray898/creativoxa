"use client";

import { useState } from "react";
import Icon from "@/components/ui/Icon";
import { listMediaForPicker } from "@/lib/cms/actions/media";
import { uploadImageFile } from "@/lib/media-client";
import { formatBytes } from "@/lib/media-upload";
import { adminInput, adminLabel } from "@/components/admin/ui";
import { MEDIA_ACCEPT, type MediaObject } from "@/types/cms";

/**
 * Image field used by every content form: paste a URL, upload a file, or pick
 * something already in the media library. The value posted with the form is
 * always the resolved public URL.
 */
export default function ImageUploadField({
  name,
  label = "Image",
  help,
  defaultValue = "",
}: {
  name: string;
  label?: string;
  help?: string;
  defaultValue?: string | null;
}) {
  const [value, setValue] = useState(defaultValue ?? "");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [library, setLibrary] = useState<MediaObject[] | null>(null);
  const [loadingLibrary, setLoadingLibrary] = useState(false);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      const url = await uploadImageFile(file);
      setValue(url);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  async function openLibrary() {
    setLibraryOpen(true);
    if (library) return;
    setLoadingLibrary(true);
    try {
      setLibrary(await listMediaForPicker());
    } catch {
      setLibrary([]);
    } finally {
      setLoadingLibrary(false);
    }
  }

  return (
    <div>
      <span className={adminLabel}>{label}</span>

      <div className="flex flex-wrap items-start gap-4">
        <div className="flex h-20 w-28 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-line bg-surface-2">
          {value ? (
            // Plain <img>: the URL is arbitrary (any host the admin pasted), so
            // the optimiser's domain allowlist doesn't apply to a preview.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <Icon name="image" className="h-5 w-5 text-faint" />
          )}
        </div>

        <div className="min-w-[16rem] flex-1 space-y-2">
          <input
            type="text"
            name={name}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="/work/project.png or https://…"
            className={adminInput}
          />

          <div className="flex flex-wrap items-center gap-2">
            <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-line px-2.5 py-1.5 text-xs font-semibold text-muted transition-colors hover:border-line-strong hover:text-foreground">
              <Icon name="upload" className="h-3.5 w-3.5" />
              {uploading ? "Uploading…" : "Upload"}
              <input
                type="file"
                accept={MEDIA_ACCEPT}
                className="sr-only"
                onChange={(event) => {
                  void handleFile(event.target.files?.[0]);
                  event.target.value = "";
                }}
              />
            </label>

            <button
              type="button"
              onClick={() => (libraryOpen ? setLibraryOpen(false) : void openLibrary())}
              className="inline-flex items-center gap-1.5 rounded-lg border border-line px-2.5 py-1.5 text-xs font-semibold text-muted transition-colors hover:border-line-strong hover:text-foreground"
            >
              <Icon name="grid" className="h-3.5 w-3.5" />
              {libraryOpen ? "Close library" : "Choose existing"}
            </button>

            {value ? (
              <button
                type="button"
                onClick={() => setValue("")}
                className="inline-flex items-center gap-1.5 rounded-lg border border-line px-2.5 py-1.5 text-xs font-semibold text-muted transition-colors hover:text-red-600"
              >
                <Icon name="close" className="h-3.5 w-3.5" />
                Clear
              </button>
            ) : null}
          </div>

          {error ? <p className="text-xs text-red-600 dark:text-red-400">{error}</p> : null}
          {help ? <p className="text-xs leading-relaxed text-faint">{help}</p> : null}
        </div>
      </div>

      {libraryOpen ? (
        <div className="mt-4 rounded-xl border border-line bg-surface-2/50 p-3">
          {loadingLibrary ? (
            <p className="py-6 text-center text-xs text-muted">Loading library…</p>
          ) : library && library.length > 0 ? (
            <ul className="grid max-h-64 grid-cols-3 gap-2 overflow-y-auto sm:grid-cols-5">
              {library.map((item) => (
                <li key={item.url}>
                  <button
                    type="button"
                    onClick={() => {
                      setValue(item.url);
                      setLibraryOpen(false);
                    }}
                    title={`${item.name} · ${formatBytes(item.size)}`}
                    className={`block w-full overflow-hidden rounded-lg border transition-colors ${
                      value === item.url ? "border-primary" : "border-line hover:border-line-strong"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.url} alt={item.name} className="h-16 w-full object-cover" />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="py-6 text-center text-xs text-muted">
              No files yet — upload one and it will appear here.
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}
