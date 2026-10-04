import { notFound } from "next/navigation";
import ResourceForm from "@/components/admin/ResourceForm";
import { Notice, PageHeader } from "@/components/admin/ui";
import { createResource } from "@/lib/cms/actions/store";
import { getResource } from "@/lib/cms/resources";

export default async function CreateScreen({
  resourceKey,
  searchParams,
}: {
  resourceKey: string;
  searchParams: { error?: string };
}) {
  const def = getResource(resourceKey);
  if (!def) notFound();

  return (
    <>
      <PageHeader
        title={`New ${def.singular}`}
        description="Everything here can be edited later. Saving publishes nothing until you tick Published."
        breadcrumb={[
          { label: "Admin", href: "/admin/dashboard" },
          { label: def.label, href: def.path },
          { label: `New ${def.singular}` },
        ]}
      />

      <Notice error={searchParams.error} />

      <ResourceForm def={def} action={createResource} submitLabel={`Create ${def.singular}`} />
    </>
  );
}
