import EnquiryDetail from "@/components/admin/EnquiryDetail";

export const metadata = { title: "Enquiry" };

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const [{ id }, sp] = await Promise.all([params, searchParams]);
  return <EnquiryDetail id={id} searchParams={sp} />;
}
