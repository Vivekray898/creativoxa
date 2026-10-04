import HomepageSettingsForm from "@/components/admin/HomepageSettingsForm";

export const metadata = { title: "Homepage" };

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const sp = await searchParams;
  return <HomepageSettingsForm saved={sp.saved === "1"} />;
}
