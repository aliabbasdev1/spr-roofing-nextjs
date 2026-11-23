import type { Metadata } from 'next';
import ServiceAreasView from '@/components/pages/service-areas';
import { pageMeta, metadataByPage } from '@/lib/pageMetadata';
export const metadata: Metadata = pageMeta('service-areas');
export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(metadataByPage['service-areas'].jsonld)}}/><ServiceAreasView/></>;
}
