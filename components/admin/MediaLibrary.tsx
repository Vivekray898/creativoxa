import Icon from "@/components/ui/Icon";
import MediaUploader from "@/components/admin/MediaUploader";
import ConfirmAction from "@/components/admin/ConfirmAction";
import { EmptyState, Notice, PageHeader, adminButton } from "@/components/admin/ui";
import { listMedia } from "@/lib/cms/media";
import { deleteMedia } from "@/lib/cms/actions/media";
import { formatBytes } from "@/lib/media-upload";

// Server component: reads the storage bucket through the admin session, so no
// extra client-side fetching and no duplicate uploader implementation.

export default async function MediaLibrary({
  saved,
  error,
}: {
  saved?: string;
  error?: string;
}) {
  const media = await listMedia();

  return (
    <>
      <PageHeader
        title="Media library"
        description="Upload, browse and manage images for services, case studies, insights and settings."
        breadcrumb={[{ label: "Admin", href: "/admin/dashboard" }, { label: "Media library" }]}
      />

      <Notice saved={saved} error={error} />

      <div className="mb-4">
        <MediaUploader />
      </div>

      {media.length === 0 ? (
        <EmptyState
          icon="image"
          title="No media yet"
          description="Upload images above — they become available to every image field in the CMS."
        />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {media.map((item) => (
            <figure
              key={item.url}
              className="group overflow-hidden rounded-xl border border-line bg-background"
            >
              <div className="aspect-square w-full overflow-hidden bg-surface-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.url}
                  alt={item.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <figcaption className="p-3">
                <p className="truncate text-xs font-semibold text-foreground" title={item.name}>
                  {item.name}
                </p>
                <p className="mt-0.5 text-[11px] text-faint">
                  {formatBytes(item.size)}
                  {item.createdAt ? ` · ${new Date(item.createdAt).toLocaleDateString()}` : ""}
                </p>
                <div className="mt-2.5 flex items-center justify-between gap-2">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={adminButton.quiet}
                  >
                    <Icon name="externalLink" className="h-3.5 w-3.5" />
                    Open
                  </a>
                  <ConfirmAction
                    action={deleteMedia}
                    fields={{ url: item.url }}
                    label="Delete"
                    message="Sure?"
                  />
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </>
  );
}
