import SettingsForm from "@/components/admin/SettingsForm";
import { PageHeader } from "@/components/admin/ui";
import { getSiteSettings } from "@/lib/cms/queries";
import { SITE_SETTINGS_GROUPS, flattenSocials } from "@/lib/cms/settings";
import { updateSiteSettings } from "@/lib/cms/actions/settings";

// Server component: loads the singleton site-settings row, flattens the socials
// jsonb into per-network fields for editing, and posts back through the action
// that re-nests them.

export default async function SiteSettingsForm({ saved }: { saved?: boolean }) {
  const row = await getSiteSettings();
  const values = flattenSocials(row as unknown as Record<string, unknown>, row.socials ?? {});

  return (
    <>
      <PageHeader
        title="Site settings"
        description="Contact details, social profiles, footer copy and the default SEO metadata used across the site."
        breadcrumb={[{ label: "Admin", href: "/admin/dashboard" }, { label: "Site settings" }]}
      />

      {saved ? (
        <div
          role="status"
          className="mb-5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-400"
        >
          Site settings updated. Changes appear everywhere immediately.
        </div>
      ) : null}

      <SettingsForm
        groups={SITE_SETTINGS_GROUPS}
        values={values}
        action={updateSiteSettings}
        submitLabel="Save settings"
        note="Only admins can change these. Saving revalidates every public page."
      />
    </>
  );
}
