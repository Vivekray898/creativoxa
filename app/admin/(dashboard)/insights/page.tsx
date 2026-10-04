import ListScreen from "@/components/admin/screens/ListScreen";

export const metadata = { title: "Insights" };

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  return ListScreen({ resourceKey: "insights", searchParams: sp });
}
