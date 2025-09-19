import { redirect } from 'next/navigation';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const resolved = await searchParams;

  if (resolved.target) {
    redirect(resolved.target);
  }

  return <div>No target URL provided</div>;
}
