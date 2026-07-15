import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {Site} from "@/components/Site";
import {
  alternateLocale,
  branchLabels,
  isLocale,
  resolveRoute,
  routeHref,
  type Locale,
  type RouteInfo,
} from "@/data/routes";
import {getVacancy,local} from "@/data/site";

const adminPreviewEnabled=process.env.ENABLE_ADMIN_PREVIEW==="true";

function pageCopy(locale:Locale,route:RouteInfo):[string,string]{
  const id=locale==="id";
  switch(route.kind){
    case"home":return[
      id?"Solusi Outsourcing Profesional untuk Operasional Bisnis":"Professional Outsourcing Solutions for Business Operations",
      id?"Dukungan tenaga kerja terlatih dan terkelola untuk keamanan, fasilitas, logistik, serta operasional perusahaan.":"Trained, well-managed personnel for security, facilities, logistics, and business operations.",
    ];
    case"about":return[
      id?"Tentang Garda Karya Nusantara":"About Garda Karya Nusantara",
      id?"Profil, cara kerja, dan komitmen operasional PT Garda Karya Nusantara.":"Learn about PT Garda Karya Nusantara, our working process, and operational commitment.",
    ];
    case"services":return[
      id?"Layanan Outsourcing dan Dukungan Operasional":"Outsourcing and Operational Support Services",
      id?"Solusi keamanan, fasilitas, outsourcing operasional, logistik, warehouse, pelatihan, dan supervisi.":"Security, facilities, operational outsourcing, logistics, warehouse, training, and supervision solutions.",
    ];
    case"contact":return[
      id?"Konsultasi Kebutuhan Tenaga Kerja":"Workforce Requirements Consultation",
      id?"Diskusikan kebutuhan layanan perusahaan melalui formulir demonstrasi yang tidak mengirim atau menyimpan data.":"Discuss business service requirements through a demonstration form that does not submit or store data.",
    ];
    case"privacy":return[
      id?"Pemberitahuan Privasi Formulir Demonstrasi":"Demonstration Form Privacy Notice",
      id?"Penjelasan mengenai informasi pada formulir demonstrasi yang tidak dikirim atau disimpan.":"How information is handled in demonstration forms that do not submit or store data.",
    ];
    case"admin":return[
      id?"Pratinjau Data Pelamar Contoh":"Sample Applicant Data Preview",
      id?"Tampilan internal berisi data demonstrasi, bukan data pelamar nyata.":"An internal view containing demonstration data, not real applicant information.",
    ];
    case"careerHub":return[
      id?"Karier di Garda Karya Nusantara":"Careers at Garda Karya Nusantara",
      id?"Kenali kehidupan kerja, manfaat, proses rekrutmen, dan jalur karier regional Garda Karya Nusantara.":"Explore working life, benefits, recruitment, and regional career paths at Garda Karya Nusantara.",
    ];
    case"regional":{
      const branch=branchLabels[route.branch][locale];
      return[
        id?`Karier Regional ${branch}`:`${branch} Regional Careers`,
        id?`Informasi lingkungan kerja, departemen, proses rekrutmen, dan kesempatan regional Garda Karya di ${branch}.`:`Work environment, departments, recruitment process, and regional Garda Karya opportunities in ${branch}.`,
      ];
    }
    case"regionalJobs":{
      const branch=branchLabels[route.branch][locale];
      return[
        id?`Lowongan Kerja ${branch}`:`${branch} Open Positions`,
        id?`Lowongan keamanan dan operasional yang telah tersedia untuk wilayah ${branch}.`:`Available security and operational roles for the ${branch} region.`,
      ];
    }
    case"job":{
      const vacancy=getVacancy(route.slug)!;
      return[local(vacancy.title,locale),local(vacancy.shortDescription,locale)];
    }
    case"apply":{
      const vacancy=getVacancy(route.slug)!;
      const title=local(vacancy.title,locale);
      return[
        id?`Demonstrasi Lamaran ${title}`:`Application Demonstration for ${title}`,
        id?`Tinjau perilaku formulir lamaran untuk ${title}. Data tidak dikirim atau disimpan.`:`Preview the application form behavior for ${title}. Data is not submitted or stored.`,
      ];
    }
    case"success":{
      const vacancy=getVacancy(route.slug)!;
      const title=local(vacancy.title,locale);
      return[
        id?`Demonstrasi Lamaran ${title} Selesai`:`Application Demonstration for ${title} Completed`,
        id?"Alur demonstrasi selesai; tidak ada data yang dikirim, diterima, atau disimpan.":"The demonstration flow completed; no data was sent, received, or stored.",
      ];
    }
  }
}

export async function generateMetadata({params}:{params:Promise<{locale:string;path?:string[]}>}):Promise<Metadata>{
  const {locale:rawLocale,path=[]}=await params;
  if(!isLocale(rawLocale))return{title:"404",robots:{index:false,follow:false}};
  const route=resolveRoute(rawLocale,path);
  if(!route||(route.kind==="admin"&&!adminPreviewEnabled))return{title:rawLocale==="id"?"Halaman Tidak Ditemukan":"Page Not Found",robots:{index:false,follow:false}};
  const [title,description]=pageCopy(rawLocale,route);
  const base=process.env.NEXT_PUBLIC_SITE_URL||"http://localhost:3000";
  const currentPath=routeHref(rawLocale,route);
  const other=alternateLocale(rawLocale);
  const otherPath=routeHref(other,route);
  const currentUrl=new URL(currentPath,base).toString();
  const otherUrl=new URL(otherPath,base).toString();
  const privatePage=["admin","apply","success"].includes(route.kind);
  return{
    title,
    description,
    alternates:{canonical:currentUrl,languages:{[rawLocale]:currentUrl,[other]:otherUrl}},
    openGraph:{title,description,url:currentUrl},
    twitter:{title,description},
    robots:privatePage?{index:false,follow:false}:undefined,
  };
}

export default async function Page({params}:{params:Promise<{locale:string;path?:string[]}>}){
  const {locale:rawLocale,path=[]}=await params;
  if(!isLocale(rawLocale))notFound();
  const route=resolveRoute(rawLocale,path);
  if(!route||(route.kind==="admin"&&!adminPreviewEnabled))notFound();
  return <Site locale={rawLocale} path={path}/>;
}
