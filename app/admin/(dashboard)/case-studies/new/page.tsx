import CreateScreen from "@/components/admin/screens/CreateScreen";

export const metadata = { title: "New case study" };

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const sp = await searchParams;
  return CreateScreen({ resourceKey: "case_studies", searchParams: sp });
}
