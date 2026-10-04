import CreateScreen from "@/components/admin/screens/CreateScreen";

export const metadata = { title: "New service" };

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const sp = await searchParams;
  return CreateScreen({ resourceKey: "services", searchParams: sp });
}
