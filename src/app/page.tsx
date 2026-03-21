import { getTracks } from '@/lib/data';
import { HomeClient } from '@/components/layout/HomeClient';

export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  const tracks = await getTracks();

  return <HomeClient tracks={tracks} />;
}
