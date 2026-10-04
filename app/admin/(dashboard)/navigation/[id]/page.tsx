import EditScreen from "@/components/admin/screens/EditScreen";

export const metadata = { title: "Edit navigation item" };

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string; saved?: string }>;
}) {
  const [{ id }, sp] = await Promise.all([params, searchParams]);
  return EditScreen({ resourceKey: "navigation_items", id, searchParams: sp });
}
