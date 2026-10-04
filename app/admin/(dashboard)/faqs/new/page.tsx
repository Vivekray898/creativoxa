import CreateScreen from "@/components/admin/screens/CreateScreen";

export const metadata = { title: "New FAQ" };

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const sp = await searchParams;
  return CreateScreen({ resourceKey: "faqs", searchParams: sp });
}
