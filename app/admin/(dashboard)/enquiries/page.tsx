import EnquiriesTable from "@/components/admin/EnquiriesTable";

export const metadata = { title: "Enquiries" };

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; saved?: string; error?: string }>;
}) {
  const sp = await searchParams;
  return <EnquiriesTable searchParams={sp} />;
}
