import type { Metadata } from 'next';
import HomeView from '@/components/pages/home';
import { pageMeta, metadataByPage } from '@/lib/pageMetadata';
export const metadata: Metadata = pageMeta('home');
export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(metadataByPage['home'].jsonld)}}/><HomeView/></>;
}
