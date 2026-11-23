import type { Metadata } from 'next';
import ContactView from '@/components/pages/contact';
import { pageMeta, metadataByPage } from '@/lib/pageMetadata';
export const metadata: Metadata = pageMeta('contact');
export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(metadataByPage['contact'].jsonld)}}/><ContactView/></>;
}
