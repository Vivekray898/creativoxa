import SettingsForm from "@/components/admin/SettingsForm";
import { PageHeader } from "@/components/admin/ui";
import { getHomepageSettings } from "@/lib/cms/queries";
import { HOMEPAGE_GROUPS } from "@/lib/cms/settings";
import { updateHomepageSettings } from "@/lib/cms/actions/settings";

// Server component: loads the singleton homepage row and renders it through the
// shared settings form, so the hero and section headings are editable without
// touching code.

export default async function HomepageSettingsForm({ saved }: { saved?: boolean }) {
  const row = await getHomepageSettings();

  return (
    <>
      <PageHeader
        title="Homepage"
        description="Hero copy, section headings and the final call to action. Design and layout stay in code — this controls the words."
        breadcrumb={[
          { label: "Admin", href: "/admin/dashboard" },
          { label: "Pages" },
          { label: "Homepage" },
        ]}
      />

      {saved ? (
        <div
          role="status"
          className="mb-5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-400"
        >
          Homepage content updated. Changes appear on the live site immediately.
        </div>
      ) : null}

      <SettingsForm
        groups={HOMEPAGE_GROUPS}
        values={row as unknown as Record<string, unknown>}
        action={updateHomepageSettings}
        submitLabel="Save homepage"
        note="Saving revalidates the homepage right away."
      />
    </>
  );
}
