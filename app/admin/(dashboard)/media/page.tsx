import MediaLibrary from "@/components/admin/MediaLibrary";

export const metadata = { title: "Media library" };

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const sp = await searchParams;
  return <MediaLibrary saved={sp.saved} error={sp.error} />;
}
