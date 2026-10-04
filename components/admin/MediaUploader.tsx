"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/ui/Icon";
import { uploadImageFile } from "@/lib/media-client";
import { adminButton } from "@/components/admin/ui";
import { MEDIA_ACCEPT } from "@/types/cms";

export default function MediaUploader() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "uploading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;

    setStatus("uploading");
    setMessage("");

    let uploaded = 0;
    for (const file of Array.from(files)) {
      try {
        await uploadImageFile(file);
        uploaded += 1;
      } catch (error) {
        setStatus("error");
        setMessage(`${file.name}: ${error instanceof Error ? error.message : "upload failed."}`);
        break;
      }
    }

    if (uploaded > 0) {
      setStatus("done");
      setMessage(`${uploaded} file${uploaded === 1 ? "" : "s"} uploaded.`);
      router.refresh();
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <label className={`${adminButton.secondary} cursor-pointer`}>
          <Icon name="upload" className="h-4 w-4" />
          {status === "uploading" ? "Uploading…" : "Upload images"}
          <input
            type="file"
            accept={MEDIA_ACCEPT}
            multiple
            className="sr-only"
            disabled={status === "uploading"}
            onChange={(event) => {
              void handleFiles(event.target.files);
              event.target.value = "";
            }}
          />
        </label>
        <p className="text-xs text-muted">
          JPG, PNG, WebP or SVG · up to 5 MB · larger photos are compressed automatically.
        </p>
      </div>

      {message ? (
        <p
          className={`mt-3 text-xs ${
            status === "error" ? "text-red-600 dark:text-red-400" : "text-mint"
          }`}
          role={status === "error" ? "alert" : "status"}
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}
