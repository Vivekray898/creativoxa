import SiteSettingsForm from "@/components/admin/SiteSettingsForm";

export const metadata = { title: "Site settings" };

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const sp = await searchParams;
  return <SiteSettingsForm saved={sp.saved === "1"} />;
}
