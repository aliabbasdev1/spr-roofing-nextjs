import type { Metadata } from 'next';
import {notFound} from 'next/navigation';
import {metadataByPage, pageMeta} from '@/lib/pageMetadata';
import V0 from "@/components/pages/services-commercial-roofing";
import V1 from "@/components/pages/services-gutter-repairs";
import V2 from "@/components/pages/services-metal-roofing";
import V3 from "@/components/pages/services-roof-inspections";
import V4 from "@/components/pages/services-roof-leak-repairs";
import V5 from "@/components/pages/services-roof-painting";
import V6 from "@/components/pages/services-roof-restoration";
import V7 from "@/components/pages/services-storm-damage-repairs";
import V8 from "@/components/pages/services-tile-roof-repairs";

export const dynamicParams = false;
const views = {"commercial-roofing":V0,
  "gutter-repairs":V1,
  "metal-roofing":V2,
  "roof-inspections":V3,
  "roof-leak-repairs":V4,
  "roof-painting":V5,
  "roof-restoration":V6,
  "storm-damage-repairs":V7,
  "tile-roof-repairs":V8} as const;
type Params={params:Promise<{slug:string}>};
export function generateStaticParams(){return Object.keys(views).map(slug=>({slug}));}
export async function generateMetadata({params}:Params):Promise<Metadata>{
 const {slug}=await params;
 if(!(slug in views))return {title:'Page not found'};
 return pageMeta(`services/${slug}` as keyof typeof metadataByPage);
}
export default async function ServicePage({params}:Params){
 const {slug}=await params;
 if(!(slug in views))notFound();
 const View=views[slug as keyof typeof views];
 const info=metadataByPage[`services/${slug}` as keyof typeof metadataByPage];
 return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(info.jsonld)}}/><View/></>;
}
