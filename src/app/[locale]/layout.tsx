import type {Metadata} from "next";
import {setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";
import "../globals.css";

export function generateStaticParams(){
  return[{locale:"id"},{locale:"en"}];
}

export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{
  const {locale}=await params;
  const id=locale==="id";
  const base=new URL(process.env.NEXT_PUBLIC_SITE_URL||"http://localhost:3000");
  const index=process.env.NEXT_PUBLIC_ALLOW_INDEXING==="true";
  return{
    metadataBase:base,
    title:{
      default:`${id?"Solusi Outsourcing Profesional":"Professional Outsourcing Solutions"} | PT Garda Karya Nusantara`,
      template:"%s | PT Garda Karya Nusantara",
    },
    description:id
      ?"Dukungan tenaga kerja terlatih dan terkelola untuk operasional perusahaan."
      :"Trained, well-managed workforce support for business operations.",
    robots:{index,follow:index},
    alternates:{canonical:`/${locale}`,languages:{id:"/id",en:"/en","x-default":"/id"}},
    openGraph:{type:"website",siteName:"PT Garda Karya Nusantara",locale:id?"id_ID":"en_US"},
    twitter:{card:"summary"},
  };
}

export default async function LocaleLayout({children,params}:{children:React.ReactNode;params:Promise<{locale:string}>}){
  const {locale}=await params;
  if(locale!=="id"&&locale!=="en")notFound();
  setRequestLocale(locale);
  return <html lang={locale}><body>{children}</body></html>;
}
