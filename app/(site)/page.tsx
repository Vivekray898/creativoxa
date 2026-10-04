import { Fragment } from "react";
import { renderHomeSection } from "@/components/sections/registry";
import { getHomepageSettings, getPageSections } from "@/lib/cms/queries";
import type { HomepageSettingsRow } from "@/types/cms";

// The homepage re-renders every 5 minutes; admin edits additionally trigger an
// immediate revalidation of this path.
export const revalidate = 300;

// No metadata export here: the root layout already supplies the site-wide title
// and description from Site settings → SEO defaults.

/** Section keys that expose an editable heading in Homepage settings. */
function heading(sectionKey: string, settings: HomepageSettingsRow) {
  switch (sectionKey) {
    case "services":
      return {
        title: settings.services_section_title,
        description: settings.services_section_description,
      };
    case "industries":
      return {
        title: settings.industries_section_title,
        description: settings.industries_section_description,
      };
    case "process":
      return {
        title: settings.process_section_title,
        description: settings.process_section_description,
      };
    case "work":
      return {
        title: settings.work_section_title,
        description: settings.work_section_description,
      };
    case "insights":
      return {
        title: settings.insights_section_title,
        description: settings.insights_section_description,
      };
    default:
      return { title: null, description: null };
  }
}

export default async function HomePage() {
  const [settings, sections] = await Promise.all([getHomepageSettings(), getPageSections("home")]);

  return (
    <>
      {sections.map((section, i) => {
        const { title, description } = heading(section.section_key, settings);
        return (
          <Fragment key={section.section_key}>
            {renderHomeSection(section.section_key, {
              // The chapter number is the rendered position, so it stays correct
              // when sections are reordered or disabled in the admin.
              index: String(i + 1).padStart(2, "0"),
              title,
              description,
              settings,
            })}
          </Fragment>
        );
      })}
    </>
  );
}
