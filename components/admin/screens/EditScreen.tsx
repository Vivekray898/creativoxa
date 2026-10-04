import Link from "next/link";
import { notFound } from "next/navigation";
import type { SupabaseClient } from "@supabase/supabase-js";
import Icon from "@/components/ui/Icon";
import ResourceForm from "@/components/admin/ResourceForm";
import ConfirmAction from "@/components/admin/ConfirmAction";
import { Notice, PageHeader, StatusPill, adminButton } from "@/components/admin/ui";
import { deleteResource, updateResource } from "@/lib/cms/actions/store";
import { getResource } from "@/lib/cms/resources";
import { getCurrentUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function EditScreen({
  resourceKey,
  id,
  searchParams,
}: {
  resourceKey: string;
  id: string;
  searchParams: { error?: string; saved?: string };
}) {
  const def = getResource(resourceKey);
  if (!def) notFound();

  const user = await getCurrentUser();
  const supabase = (await createSupabaseServerClient()) as unknown as SupabaseClient;

  const { data, error } = await supabase.from(def.table).select("*").eq("id", id).maybeSingle();

  if (error || !data) {
    return (
      <>
        <PageHeader
          title={`${def.singular} not found`}
          breadcrumb={[
            { label: "Admin", href: "/admin/dashboard" },
            { label: def.label, href: def.path },
          ]}
        />
        <Notice error={error ? error.message : "That record no longer exists."} />
        <Link href={def.path} className={adminButton.secondary}>
          Back to {def.plural}
        </Link>
      </>
    );
  }

  const record = data as Record<string, unknown>;
  const label = String(record.name ?? record.title ?? record.label ?? record.question ?? def.singular);

  return (
    <>
      <PageHeader
        title={label}
        description={def.description}
        breadcrumb={[
          { label: "Admin", href: "/admin/dashboard" },
          { label: def.label, href: def.path },
          { label: "Edit" },
        ]}
        actions={
          <>
            {def.hasPublish ? (
              <StatusPill tone={record.published ? "success" : "muted"}>
                {record.published ? "Published" : "Draft"}
              </StatusPill>
            ) : null}
            {user?.role === "admin" ? (
              <ConfirmAction
                action={deleteResource}
                fields={{ __resource: def.key, __id: id }}
                label={`Delete ${def.singular}`}
                message={`Delete this ${def.singular}? This cannot be undone.`}
                className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-line px-3 text-xs font-semibold text-muted transition-colors hover:border-red-500/40 hover:text-red-600"
              />
            ) : null}
            <Link href={def.path} className={adminButton.quiet}>
              <Icon name="chevronLeft" className="h-3.5 w-3.5" />
              Back
            </Link>
          </>
        }
      />

      <Notice saved={searchParams.saved} error={searchParams.error} />

      <ResourceForm def={def} record={record} action={updateResource} submitLabel="Save changes" />
    </>
  );
}
