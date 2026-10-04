import EditScreen from "@/components/admin/screens/EditScreen";

export const metadata = { title: "Edit FAQ" };

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string; saved?: string }>;
}) {
  const [{ id }, sp] = await Promise.all([params, searchParams]);
  return EditScreen({ resourceKey: "faqs", id, searchParams: sp });
}
