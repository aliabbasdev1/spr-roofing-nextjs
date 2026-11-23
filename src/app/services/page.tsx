import type { Metadata } from 'next';
import ServicesView from '@/components/pages/services';
import { pageMeta, metadataByPage } from '@/lib/pageMetadata';
export const metadata: Metadata = pageMeta('services');
export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(metadataByPage['services'].jsonld)}}/><ServicesView/></>;
}
