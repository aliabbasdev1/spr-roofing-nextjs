import type { Metadata } from 'next';
import AboutView from '@/components/pages/about';
import { pageMeta, metadataByPage } from '@/lib/pageMetadata';
export const metadata: Metadata = pageMeta('about');
export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(metadataByPage['about'].jsonld)}}/><AboutView/></>;
}
