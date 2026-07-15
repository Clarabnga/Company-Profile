"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import {useRouter} from "next/navigation";
import {
  AlertTriangle,
  ArrowRight,
  Briefcase,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Clock,
  GraduationCap,
  HeartHandshake,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Search,
  ShieldCheck,
  Target,
  Users,
  X,
} from "lucide-react";
import {AssetSlot} from "@/components/AssetSlot";
import {ConsultationForm} from "@/components/ConsultationForm";
import {
  applicants,
  company,
  faqs,
  getVacancy,
  local,
  operationalStandards,
  vacancies,
  type ApplicantStatus,
  type Localized,
  type Vacancy,
} from "@/data/site";
import {
  alternateLocale,
  applyHref,
  branchLabels,
  branchSlugs,
  careerHubHref,
  corporateHref,
  jobHref,
  regionalHref,
  regionalJobsHref,
  resolveRoute,
  routeHref,
  successHref,
  type BranchSlug,
  type Locale,
  type RouteInfo,
} from "@/data/routes";
import styles from "./SiteV2.module.css";

const t=(locale:Locale,id:string,en:string)=>locale==="id"?id:en;
const cx=(...names:Array<string|false|undefined>)=>names.filter(Boolean).join(" ");
const whatsappHref=(number:string,message:string)=>`https://wa.me/${number}?text=${encodeURIComponent(message)}`;

const corporateServices:Array<{id:string;title:Localized;description:Localized;asset:string}>=[
  {id:"security",title:{id:"Layanan Keamanan",en:"Security Services"},description:{id:"Personel keamanan untuk gedung, kawasan usaha, hunian, dan aktivitas operasional dengan ruang lingkup kerja yang jelas.",en:"Security personnel for buildings, business districts, residences, and daily operations with clearly defined responsibilities."},asset:"service-security.jpg"},
  {id:"facility",title:{id:"Cleaning & Facility Support",en:"Cleaning & Facility Support"},description:{id:"Dukungan kebersihan dan fasilitas dengan pembagian area, jadwal, serta pemeriksaan rutin.",en:"Cleaning and facility support with defined work zones, schedules, and routine inspections."},asset:"service-cleaning.jpg"},
  {id:"outsourcing",title:{id:"Outsourcing Operasional",en:"Operational Outsourcing"},description:{id:"Tenaga operasional untuk front office, administrasi, messenger, dan fungsi pendukung perusahaan.",en:"Operational personnel for front office, administration, messenger, and other business-support functions."},asset:"service-office-support.jpg"},
  {id:"logistics",title:{id:"Driver & Logistics Support",en:"Driver & Logistics Support"},description:{id:"Pengemudi dan tenaga logistik untuk mobilitas, distribusi, serta koordinasi perjalanan operasional.",en:"Drivers and logistics personnel supporting mobility, distribution, and operational travel."},asset:"service-driver.jpg"},
  {id:"warehouse",title:{id:"Warehouse Workforce",en:"Warehouse Workforce"},description:{id:"Tenaga penerimaan, pencatatan, penataan, dan pergerakan barang untuk kebutuhan gudang.",en:"Receiving, recording, organising, and goods-movement personnel for warehouse operations."},asset:"service-warehouse.jpg"},
  {id:"training",title:{id:"Pelatihan & Supervisi Operasional",en:"Training & Operational Supervision"},description:{id:"Pembekalan awal, briefing lokasi, koordinasi supervisor, dan evaluasi layanan secara berkala.",en:"Initial preparation, site briefings, supervisor coordination, and periodic service reviews."},asset:"service-hospitality.jpg"},
];

const industryItems:Array<{title:Localized;description:Localized;asset?:string}>=[
  {title:{id:"Retail",en:"Retail"},description:{id:"Gerai, pusat belanja, dan area layanan pelanggan.",en:"Stores, shopping centres, and customer-facing environments."},asset:"industry-retail.jpg"},
  {title:{id:"Hospitality",en:"Hospitality"},description:{id:"Hotel, vila, venue, serta operasional layanan tamu.",en:"Hotels, villas, venues, and guest-service operations."},asset:"industry-hospitality.jpg"},
  {title:{id:"Manufacturing",en:"Manufacturing"},description:{id:"Area produksi dengan kebutuhan disiplin akses dan keselamatan.",en:"Production environments requiring disciplined access and safety support."},asset:"industry-manufacturing.jpg"},
  {title:{id:"Property",en:"Property"},description:{id:"Gedung komersial, hunian, dan kawasan terpadu.",en:"Commercial buildings, residences, and integrated developments."},asset:"industry-property.jpg"},
  {title:{id:"Warehouse",en:"Warehouse"},description:{id:"Gudang, pusat distribusi, dan area penerimaan barang.",en:"Warehouses, distribution centres, and receiving areas."}},
  {title:{id:"Corporate Office",en:"Corporate Office"},description:{id:"Kantor perusahaan dan fungsi pendukung aktivitas harian.",en:"Company offices and support functions for daily operations."}},
];

type BranchProfile={
  title:Localized;
  eyebrow:Localized;
  headline:Localized;
  description:Localized;
  about:Localized;
  focus:Localized;
  departments:Array<Localized>;
  areas:Array<Localized>;
};

const branchProfiles:Record<BranchSlug,BranchProfile>={
  bali:{
    title:{id:"Garda Bali",en:"Garda Bali"},
    eyebrow:{id:"Karier regional · Bali",en:"Regional careers · Bali"},
    headline:{id:"Bangun Karier di Lingkungan Layanan Bali",en:"Build Your Career in Bali's Service Economy"},
    description:{id:"Temukan peran keamanan dan operasional untuk lingkungan hospitality, retail, properti, dan layanan publik di Bali.",en:"Explore security and operational roles across Bali's hospitality, retail, property, and public-facing environments."},
    about:{id:"Tim Bali mendukung lokasi dengan ritme layanan tinggi. Proses kerja menekankan kesiapan bertugas, komunikasi dengan tamu, dan koordinasi lapangan.",en:"The Bali team supports high-service environments, with an emphasis on readiness, guest communication, and field coordination."},
    focus:{id:"Hospitality · Tourism · Service Excellence",en:"Hospitality · Tourism · Service Excellence"},
    departments:[{id:"Keamanan",en:"Security"},{id:"Facility Support",en:"Facility Support"},{id:"Front Office",en:"Front Office"},{id:"Operasional Cabang",en:"Branch Operations"}],
    areas:[{id:"Denpasar",en:"Denpasar"},{id:"Badung",en:"Badung"},{id:"Gianyar",en:"Gianyar"},{id:"Bali Selatan",en:"South Bali"}],
  },
  jateng:{
    title:{id:"Garda Jateng",en:"Garda Central Java"},
    eyebrow:{id:"Karier regional · Jawa Tengah",en:"Regional careers · Central Java"},
    headline:{id:"Tumbuh Bersama Operasional Jawa Tengah",en:"Grow with Central Java Operations"},
    description:{id:"Kenali jalur karier untuk lingkungan manufaktur, pergudangan, kawasan usaha, dan dukungan keamanan regional.",en:"Discover career paths across manufacturing, warehousing, business estates, and regional security support."},
    about:{id:"Tim Jawa Tengah disiapkan untuk kebutuhan tenaga kerja industri dan distribusi dengan briefing kerja yang terstruktur.",en:"The Central Java team supports industrial and distribution workforces with structured job briefings."},
    focus:{id:"Manufacturing · Warehouse · Security",en:"Manufacturing · Warehouse · Security"},
    departments:[{id:"Keamanan Industri",en:"Industrial Security"},{id:"Warehouse",en:"Warehouse"},{id:"Logistics Support",en:"Logistics Support"},{id:"Supervisi",en:"Supervision"}],
    areas:[{id:"Semarang",en:"Semarang"},{id:"Solo Raya",en:"Greater Solo"},{id:"Kendal",en:"Kendal"},{id:"Area industri regional",en:"Regional industrial areas"}],
  },
  kaltim:{
    title:{id:"Garda Kaltim",en:"Garda East Kalimantan"},
    eyebrow:{id:"Karier regional · Kalimantan Timur",en:"Regional careers · East Kalimantan"},
    headline:{id:"Dukung Operasional Industri Kalimantan Timur",en:"Support East Kalimantan's Industrial Operations"},
    description:{id:"Jelajahi fungsi keamanan, logistik, fasilitas, dan dukungan lapangan untuk lingkungan industri regional.",en:"Explore security, logistics, facilities, and field-support functions for regional industrial environments."},
    about:{id:"Tim regional Kalimantan Timur diarahkan untuk lingkungan kerja yang membutuhkan disiplin prosedur, kesiapan lapangan, dan koordinasi antartim.",en:"The East Kalimantan team is designed for environments requiring procedural discipline, field readiness, and cross-team coordination."},
    focus:{id:"Industrial · Logistics · Field Operations",en:"Industrial · Logistics · Field Operations"},
    departments:[{id:"Site Security",en:"Site Security"},{id:"Driver & Logistics",en:"Driver & Logistics"},{id:"Facility Support",en:"Facility Support"},{id:"Field Operations",en:"Field Operations"}],
    areas:[{id:"Balikpapan",en:"Balikpapan"},{id:"Samarinda",en:"Samarinda"},{id:"Kawasan industri",en:"Industrial areas"},{id:"Area proyek regional",en:"Regional project areas"}],
  },
  jakarta:{
    title:{id:"Garda Jakarta",en:"Garda Jakarta"},
    eyebrow:{id:"Karier regional · Jakarta",en:"Regional careers · Jakarta"},
    headline:{id:"Karier untuk Operasional Kota yang Dinamis",en:"Careers for a Dynamic Urban Operation"},
    description:{id:"Kenali peran keamanan, facility, retail, corporate support, dan layanan operasional di wilayah Jakarta.",en:"Explore security, facility, retail, corporate-support, and operational roles across Jakarta."},
    about:{id:"Tim Jakarta mendukung lingkungan dengan arus pengunjung tinggi, jadwal dinamis, dan kebutuhan koordinasi lintas fungsi.",en:"The Jakarta team supports high-footfall environments, dynamic schedules, and cross-functional coordination."},
    focus:{id:"Corporate · Retail · Facility",en:"Corporate · Retail · Facility"},
    departments:[{id:"Corporate Security",en:"Corporate Security"},{id:"Retail Support",en:"Retail Support"},{id:"Office Support",en:"Office Support"},{id:"Facility Operations",en:"Facility Operations"}],
    areas:[{id:"Jakarta Pusat",en:"Central Jakarta"},{id:"Jakarta Selatan",en:"South Jakarta"},{id:"Jakarta Barat",en:"West Jakarta"},{id:"Jakarta Timur",en:"East Jakarta"}],
  },
};

const recruitmentProcess:Array<{title:Localized;description:Localized}>=[
  {title:{id:"Kirim Lamaran",en:"Submit Application"},description:{id:"Pilih posisi regional dan lengkapi formulir demonstrasi singkat.",en:"Choose a regional role and complete the short demonstration form."}},
  {title:{id:"Seleksi Administrasi",en:"Application Review"},description:{id:"Pada layanan resmi, tim memeriksa kesesuaian awal kandidat.",en:"In the live service, the team reviews initial candidate fit."}},
  {title:{id:"Wawancara",en:"Interview"},description:{id:"Kandidat terpilih mengikuti percakapan dan verifikasi resmi.",en:"Shortlisted candidates continue to an official interview and verification."}},
  {title:{id:"Tes atau Simulasi",en:"Assessment"},description:{id:"Tahap disesuaikan dengan tanggung jawab posisi.",en:"The stage is adapted to the responsibilities of each role."}},
  {title:{id:"Penawaran Kerja",en:"Offer"},description:{id:"Detail penempatan dijelaskan melalui kontak perusahaan yang terverifikasi.",en:"Placement details are shared through a verified company contact."}},
];

function corporateWebsiteHref(locale:Locale){
  const base=process.env.NEXT_PUBLIC_MAIN_SITE_URL?.replace(/\/$/,"");
  return base?`${base}/${locale}`:corporateHref(locale,"home");
}

function Brand({locale,regional}:{locale:Locale;regional?:BranchSlug}){
  return <a className={styles.brand} href={regional?regionalHref(locale,regional):corporateHref(locale,"home")}>
    <span aria-hidden="true"><ShieldCheck/></span>
    <b>GARDA KARYA<small>{regional?branchProfiles[regional].title[locale]:"SECURITY & OUTSOURCING"}</small></b>
  </a>;
}

function useLocationHash(){
  const [hash,setHash]=useState("");
  useEffect(()=>{
    const update=()=>setHash(window.location.hash);
    update();
    window.addEventListener("hashchange",update);
    return()=>window.removeEventListener("hashchange",update);
  },[]);
  return hash;
}

type NavigationItem={label:string;href:string;key:string;hash?:boolean};

function Header({locale,route,branch}:{locale:Locale;route:RouteInfo;branch?:BranchSlug}){
  const [open,setOpen]=useState(false);
  const hash=useLocationHash();
  const closeRef=useRef<HTMLButtonElement>(null);
  const triggerRef=useRef<HTMLButtonElement>(null);
  const panelRef=useRef<HTMLDivElement>(null);
  const home=corporateHref(locale,"home");
  const regionalRoot=branch?regionalHref(locale,branch):"";
  const items:NavigationItem[]=branch?[
    {label:t(locale,"Ringkasan","Overview"),href:regionalRoot,key:"regional"},
    {label:t(locale,"Lowongan","Open Positions"),href:regionalJobsHref(locale,branch),key:"jobs"},
    {label:t(locale,"Departemen","Departments"),href:`${regionalRoot}#departments`,key:"departments",hash:true},
    {label:t(locale,"Kehidupan Tim","Life in Branch"),href:`${regionalRoot}#life`,key:"life",hash:true},
    {label:t(locale,"Proses","Process"),href:`${regionalRoot}#process`,key:"process",hash:true},
    {label:"FAQ",href:`${regionalRoot}#faq`,key:"faq",hash:true},
  ]:[
    {label:t(locale,"Beranda","Home"),href:home,key:"home"},
    {label:t(locale,"Tentang","About"),href:corporateHref(locale,"about"),key:"about"},
    {label:t(locale,"Layanan","Services"),href:corporateHref(locale,"services"),key:"services"},
    {label:t(locale,"Industri","Industries"),href:`${home}#industries`,key:"industries",hash:true},
    {label:t(locale,"Karier","Career"),href:careerHubHref(locale),key:"careerHub"},
    {label:t(locale,"Cabang","Branches"),href:`${home}#branches`,key:"branches",hash:true},
    {label:t(locale,"Kontak","Contact"),href:corporateHref(locale,"contact"),key:"contact"},
  ];
  const active=(item:NavigationItem)=>{
    if(item.key==="home")return route.kind==="home"&&!hash;
    if(item.key==="industries"||item.key==="branches"||item.key==="departments"||item.key==="life"||item.key==="process"||item.key==="faq")return hash===`#${item.key}`;
    if(item.key==="jobs")return ["regionalJobs","job","apply","success"].includes(route.kind);
    return route.kind===item.key;
  };
  const other=alternateLocale(locale);
  const languageHref=`${routeHref(other,route)}${hash}`;
  const cta=branch?regionalJobsHref(locale,branch):corporateHref(locale,"contact");
  const ctaLabel=branch?t(locale,"Lihat Lowongan","View Open Roles"):t(locale,"Konsultasi Kebutuhan SDM","Consult Workforce Needs");
  const dismiss=()=>{setOpen(false);requestAnimationFrame(()=>triggerRef.current?.focus())};

  useEffect(()=>{
    if(!open)return;
    closeRef.current?.focus();
    const previous=document.body.style.overflow;
    document.body.style.overflow="hidden";
    const onKey=(event:KeyboardEvent)=>{
      if(event.key==="Escape"){event.preventDefault();dismiss();return}
      if(event.key!=="Tab"||!panelRef.current)return;
      const focusable=Array.from(panelRef.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled])')).filter(item=>item.offsetParent!==null);
      if(!focusable.length)return;
      const first=focusable[0],last=focusable[focusable.length-1];
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
    };
    document.addEventListener("keydown",onKey);
    return()=>{document.removeEventListener("keydown",onKey);document.body.style.overflow=previous};
  },[open]);

  return <>
    <header className={cx(styles.siteHeader,branch&&styles.regionalHeader)}>
      <div className={styles.headerInner}>
        <Brand locale={locale} regional={branch}/>
        <nav className={styles.desktopNav} aria-label={t(locale,"Navigasi utama","Primary navigation")}>
          {items.map(item=><a key={item.key} className={active(item)?styles.activeNav:undefined} aria-current={active(item)?(item.hash?"location":"page"):undefined} href={item.href}>{item.label}</a>)}
        </nav>
        <div className={styles.headerActions}>
          {branch&&<a className={styles.corporateLink} href={corporateWebsiteHref(locale)}>{t(locale,"Website Corporate","Corporate Website")} ↗</a>}
          <a className={styles.language} href={languageHref} aria-label={t(locale,"Switch to English","Ganti ke Bahasa Indonesia")}><span>{locale.toUpperCase()}</span><b>{other.toUpperCase()}</b></a>
          <a className={cx(styles.button,styles.headerCta)} href={cta}>{ctaLabel}</a>
          <button ref={triggerRef} className={styles.menuButton} onClick={()=>setOpen(true)} aria-expanded={open} aria-controls="v2-mobile-menu" aria-label={t(locale,"Buka menu","Open menu")}><Menu/></button>
        </div>
      </div>
    </header>
    {open&&<div className={styles.drawerBackdrop} onClick={event=>{if(event.target===event.currentTarget)dismiss()}}>
      <div ref={panelRef} id="v2-mobile-menu" className={styles.drawer} role="dialog" aria-modal="true" aria-labelledby="v2-mobile-menu-title">
        <button ref={closeRef} className={styles.drawerClose} onClick={dismiss} aria-label={t(locale,"Tutup menu","Close menu")}><X/></button>
        <h2 id="v2-mobile-menu-title" className={styles.srOnly}>{t(locale,"Menu navigasi","Navigation menu")}</h2>
        <Brand locale={locale} regional={branch}/>
        <nav className={styles.drawerNav} aria-label={t(locale,"Navigasi seluler","Mobile navigation")}>
          {items.map(item=><a key={item.key} className={active(item)?styles.activeDrawer:undefined} aria-current={active(item)?(item.hash?"location":"page"):undefined} href={item.href} onClick={()=>setOpen(false)}>{item.label}</a>)}
          {branch&&<a href={corporateWebsiteHref(locale)} onClick={()=>setOpen(false)}>{t(locale,"Kembali ke Website Corporate","Back to Corporate Website")} ↗</a>}
          <a className={styles.button} href={cta} onClick={()=>setOpen(false)}>{ctaLabel}<ArrowRight/></a>
        </nav>
      </div>
    </div>}
  </>;
}

function CorporateFooter({locale}:{locale:Locale}){
  const home=corporateHref(locale,"home");
  return <footer className={styles.footer}>
    <div className={styles.footerGrid}>
      <div className={styles.footerBrand}><Brand locale={locale}/><p>{local(company.description,locale)}</p><div className={styles.social}><a href={company.contacts.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram/></a><a href={company.contacts.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin/></a></div></div>
      <nav aria-labelledby="footer-company"><h2 id="footer-company">{t(locale,"Perusahaan","Company")}</h2><a href={home}>{t(locale,"Beranda","Home")}</a><a href={corporateHref(locale,"about")}>{t(locale,"Tentang","About")}</a><a href={`${home}#industries`}>{t(locale,"Industri","Industries")}</a><a href={`${home}#branches`}>{t(locale,"Cabang","Branches")}</a></nav>
      <nav aria-labelledby="footer-services"><h2 id="footer-services">{t(locale,"Layanan","Services")}</h2>{corporateServices.slice(0,4).map(service=><a key={service.id} href={corporateHref(locale,"services")}>{local(service.title,locale)}</a>)}</nav>
      <nav aria-labelledby="footer-career"><h2 id="footer-career">{t(locale,"Karier","Career")}</h2><a href={careerHubHref(locale)}>{t(locale,"Career Hub","Career Hub")}</a>{branchSlugs.map(branch=><a key={branch} href={regionalHref(locale,branch)}>{branchLabels[branch][locale]}</a>)}</nav>
      <nav aria-labelledby="footer-contact"><h2 id="footer-contact">{t(locale,"Kontak","Contact")}</h2><a href={corporateHref(locale,"contact")}>{t(locale,"Form konsultasi","Consultation form")}</a><a href={`mailto:${company.contacts.email}`}>{company.contacts.email}</a><span>{local(company.contacts.mainOffice,locale)}</span></nav>
    </div>
    <div className={styles.copyright}><span>© {new Date().getFullYear()} {company.name}. {t(locale,"Seluruh hak dilindungi.","All rights reserved.")}</span><a href={corporateHref(locale,"privacy")}>{t(locale,"Kebijakan Privasi","Privacy Notice")}</a></div>
  </footer>;
}

function RegionalFooter({locale,branch}:{locale:Locale;branch:BranchSlug}){
  const profile=branchProfiles[branch];
  return <footer className={cx(styles.footer,styles.regionalFooter)}>
    <div className={styles.regionalFooterGrid}>
      <div><Brand locale={locale} regional={branch}/><p>{local(profile.description,locale)}</p></div>
      <nav aria-label={t(locale,"Navigasi karier regional","Regional career navigation")}><a href={regionalHref(locale,branch)}>{t(locale,"Ringkasan cabang","Branch overview")}</a><a href={regionalJobsHref(locale,branch)}>{t(locale,"Lowongan terbuka","Open positions")}</a><a href={`${regionalHref(locale,branch)}#process`}>{t(locale,"Proses rekrutmen","Recruitment process")}</a><a href={`${regionalHref(locale,branch)}#faq`}>FAQ</a></nav>
      <div className={styles.regionalReturn}><span>{t(locale,"Ekosistem Garda Karya","Garda Karya ecosystem")}</span><a className={styles.buttonLight} href={corporateWebsiteHref(locale)}>{t(locale,"Kembali ke Website Corporate","Back to Corporate Website")} ↗</a></div>
    </div>
  </footer>;
}

function Layout({locale,route,children}:{locale:Locale;route:RouteInfo;children:ReactNode}){
  const branch="branch" in route?route.branch:undefined;
  const allowSchema=process.env.NEXT_PUBLIC_ALLOW_INDEXING==="true";
  const siteUrl=process.env.NEXT_PUBLIC_SITE_URL||"http://localhost:3000";
  const schema=allowSchema?{"@context":"https://schema.org","@type":branch?"LocalBusiness":"Organization",name:company.name,url:new URL(routeHref(locale,route),siteUrl).toString()}:null;
  const showBusinessHelp=!branch&&["home","about","services"].includes(route.kind);
  return <div className={styles.shell} data-fixed-apply={route.kind==="job"?"true":undefined}>
    {schema&&<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,"\\u003c")}}/>}
    <a className={styles.skipLink} href="#main">{t(locale,"Lewati ke konten","Skip to content")}</a>
    <Header locale={locale} route={route} branch={branch}/>
    <main id="main">{children}</main>
    {branch?<RegionalFooter locale={locale} branch={branch}/>:<CorporateFooter locale={locale}/>}
    {showBusinessHelp&&<a className={styles.floatingHelp} href={whatsappHref(company.contacts.whatsapp,t(locale,"Halo, saya ingin mendiskusikan kebutuhan tenaga kerja perusahaan.","Hello, I would like to discuss our company's workforce needs."))} target="_blank" rel="noopener noreferrer"><MessageCircle/><span>{t(locale,"Bantuan bisnis","Business enquiry")}</span></a>}
  </div>;
}

function SectionHeading({eyebrow,title,text,light=false}:{eyebrow:string;title:string;text?:string;light?:boolean}){
  return <div className={cx(styles.sectionHeading,light&&styles.headingLight)}><span>{eyebrow}</span><h2>{title}</h2>{text&&<p>{text}</p>}</div>;
}

function PageHero({eyebrow,title,text}:{eyebrow:string;title:string;text:string}){
  return <section className={styles.pageHero}><div className={styles.container}><span>{eyebrow}</span><h1>{title}</h1><p>{text}</p></div></section>;
}

function TrustSection({locale}:{locale:Locale}){
  const items=[
    {icon:Target,title:t(locale,"Pemetaan kebutuhan","Requirement mapping"),text:t(locale,"Peran, jadwal, lokasi, dan standar kerja disusun sebelum penempatan.","Roles, schedules, locations, and working standards are mapped before deployment.")},
    {icon:GraduationCap,title:t(locale,"Persiapan personel","Workforce preparation"),text:t(locale,"Seleksi dan briefing disesuaikan dengan tanggung jawab setiap lokasi.","Screening and briefings are adapted to each site's responsibilities.")},
    {icon:Users,title:t(locale,"Koordinasi lapangan","Field coordination"),text:t(locale,"Supervisor dan penanggung jawab menjaga komunikasi operasional tetap jelas.","Supervisors and site leads keep operational communication clear.")},
    {icon:ClipboardCheck,title:t(locale,"Tinjauan layanan","Service review"),text:t(locale,"Temuan lapangan menjadi dasar evaluasi dan perbaikan berikutnya.","Field observations inform the next service review and improvement.")},
  ];
  return <section className={styles.trustSection} aria-labelledby="trust-title">
    <div className={styles.container}>
      <div className={styles.trustHeading}><span>{t(locale,"Kerangka kepercayaan","Trust framework")}</span><h2 id="trust-title">{t(locale,"Proses yang dapat dijelaskan, tanggung jawab yang dapat ditelusuri","A process that can be explained, accountability that can be followed")}</h2></div>
      <div className={styles.trustList}>{items.map(({icon:Icon,title,text},index)=><article key={title}><b>0{index+1}</b><Icon/><h3>{title}</h3><p>{text}</p></article>)}</div>
      <div className={styles.assetProof} aria-hidden="true">
        <div>{Array.from({length:6},(_,index)=><AssetSlot key={index} filename={`client-logo-0${index+1}.svg`} label={t(locale,`Slot logo klien ${index+1}`,`Client logo slot ${index+1}`)} className={styles.logoAsset}/>)}</div>
        <div>{Array.from({length:3},(_,index)=><AssetSlot key={index} filename={`certificate-0${index+1}.svg`} label={t(locale,`Slot sertifikat ${index+1}`,`Certificate slot ${index+1}`)} className={styles.certificateAsset}/>)}</div>
      </div>
    </div>
  </section>;
}

function ServicesSection({locale,compact=false}:{locale:Locale;compact?:boolean}){
  return <section className={cx(styles.section,styles.servicesSection,compact&&styles.compactSection)}>
    <div className={styles.container}>
      <SectionHeading eyebrow={t(locale,"Solusi perusahaan","Business solutions")} title={t(locale,"Dukungan tenaga kerja untuk kebutuhan operasional nyata","Workforce support for real operational needs")} text={t(locale,"Setiap layanan dimulai dari konteks lokasi, tanggung jawab, jadwal, dan cara pengawasan yang dibutuhkan perusahaan.","Every service starts with the site's context, responsibilities, schedule, and required supervision model.")}/>
      <div className={styles.serviceGrid}>{corporateServices.map((service,index)=><article key={service.id} className={index===0?styles.featuredService:undefined}>
        <AssetSlot filename={service.asset} label={local(service.title,locale)} className={styles.serviceAsset}/><span>0{index+1}</span><h3>{local(service.title,locale)}</h3><p>{local(service.description,locale)}</p>{index===0&&<a href={corporateHref(locale,"contact")}>{t(locale,"Diskusikan kebutuhan","Discuss your needs")}<ArrowRight/></a>}
      </article>)}</div>
    </div>
  </section>;
}

function WhyGarda({locale}:{locale:Locale}){
  const reasons=[
    t(locale,"Ruang lingkup kerja disusun sebelum personel mulai bertugas.","The scope of work is defined before personnel begin an assignment."),
    t(locale,"Briefing disesuaikan dengan risiko dan karakter setiap lokasi.","Briefings are adapted to each site's risks and operating context."),
    t(locale,"Koordinasi tidak berhenti setelah penempatan berlangsung.","Coordination continues after personnel are deployed."),
    t(locale,"Evaluasi diarahkan pada tindakan perbaikan yang dapat dipahami.","Reviews focus on clear, actionable improvements."),
  ];
  return <section className={cx(styles.section,styles.whySection)}><div className={styles.container}><div className={styles.whyEditorial}><SectionHeading eyebrow={t(locale,"Mengapa Garda Karya","Why Garda Karya")} title={t(locale,"Mitra operasional, bukan sekadar penyedia personel","An operational partner, not only a personnel provider")} text={t(locale,"Kami menghubungkan kebutuhan perusahaan dengan persiapan personel dan koordinasi lapangan dalam satu alur kerja.","We connect business requirements, workforce preparation, and field coordination in one working flow.")}/><a className={styles.textLink} href={corporateHref(locale,"about")}>{t(locale,"Pelajari cara kami bekerja","Learn how we work")}<ArrowRight/></a></div><ol className={styles.reasonList}>{reasons.map((reason,index)=><li key={reason}><span>0{index+1}</span><p>{reason}</p></li>)}</ol></div></section>;
}

function IndustriesSection({locale}:{locale:Locale}){
  return <section id="industries" className={cx(styles.section,styles.industriesSection)}><div className={styles.container}><div className={styles.sectionSplitHeading}><SectionHeading eyebrow={t(locale,"Industri yang kami dukung","Industries we support")} title={t(locale,"Pendekatan berbeda untuk ritme kerja yang berbeda","Different operating rhythms need different support")} text={t(locale,"Kebutuhan tenaga kerja disesuaikan dengan lingkungan, arus pengguna, jam operasional, dan tanggung jawab pada setiap sektor.","Workforce needs are adapted to each sector's environment, footfall, operating hours, and responsibilities.")}/><p>{t(locale,"Satu standar koordinasi. Implementasi disesuaikan dengan konteks lokasi.","One coordination standard, adapted to each site context.")}</p></div><div className={styles.industryList}>{industryItems.map((item,index)=><article key={item.title.en}>{item.asset?<AssetSlot filename={item.asset} label={local(item.title,locale)} className={styles.industryAsset}/>:<div className={styles.industryMark}><Building2/></div>}<span>0{index+1}</span><div><h3>{local(item.title,locale)}</h3><p>{local(item.description,locale)}</p></div></article>)}</div></div></section>;
}

function OperationalProcess({locale}:{locale:Locale}){
  const items=[
    [t(locale,"Konsultasi","Consultation"),t(locale,"Memahami target layanan dan konteks lokasi.","Understand service goals and site context.")],
    [t(locale,"Pemetaan Kebutuhan","Requirement Mapping"),t(locale,"Menetapkan peran, jumlah, jadwal, dan standar kerja.","Define roles, headcount, schedules, and standards.")],
    [t(locale,"Seleksi Personel","Workforce Selection"),t(locale,"Menyesuaikan kandidat dengan kriteria penempatan.","Match candidates to placement criteria.")],
    [t(locale,"Penempatan","Deployment"),t(locale,"Menjalankan briefing dan mobilisasi ke lokasi.","Brief and mobilise personnel to the site.")],
    [t(locale,"Monitoring","Monitoring"),t(locale,"Melakukan supervisi, evaluasi, dan tindak lanjut.","Supervise, review, and follow up.")],
  ];
  return <section className={styles.processSection}><div className={styles.container}><div className={styles.processHeading}><SectionHeading light eyebrow={t(locale,"Operational excellence","Operational excellence")} title={t(locale,"Proses yang jelas dari kebutuhan hingga evaluasi","A clear process from requirement to review")} text={t(locale,"Setiap tahap memiliki tujuan, penanggung jawab, dan keluaran kerja yang dapat dibahas bersama.","Every stage has a clear purpose, owner, and working outcome.")}/><a className={styles.buttonLight} href={corporateHref(locale,"contact")}>{t(locale,"Mulai konsultasi","Start a consultation")}<ArrowRight/></a></div><ol className={styles.processList}>{items.map(([title,text],index)=><li key={title}><b>0{index+1}</b><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol></div></section>;
}

function CoverageSection({locale}:{locale:Locale}){
  return <section id="branches" className={cx(styles.section,styles.coverageSection)}><div className={cx(styles.container,styles.coverageGrid)}><div><SectionHeading eyebrow={t(locale,"Jaringan operasional","Operational network")} title={t(locale,"Koordinasi regional dalam satu standar layanan","Regional coordination within one service standard")} text={t(locale,"Informasi cabang membantu perusahaan memahami konteks wilayah. Ketersediaan personel tetap dikonfirmasi melalui konsultasi kebutuhan.","Branch information helps companies understand regional context. Workforce availability is confirmed through a requirements consultation.")}/><a className={styles.button} href={corporateHref(locale,"contact")}>{t(locale,"Tanyakan cakupan layanan","Discuss service coverage")}<ArrowRight/></a></div><div className={styles.coverageVisual}><AssetSlot filename="coverage-map.svg" label={t(locale,"Peta cakupan operasional Indonesia","Indonesia operational coverage map")} className={styles.mapAsset}/><div className={styles.coverageBranches}>{branchSlugs.map((branch,index)=><div key={branch}><span>0{index+1}</span><b>{branchLabels[branch][locale]}</b><small>{local(branchProfiles[branch].focus,locale)}</small></div>)}</div></div></div></section>;
}

function CareerPreview({locale}:{locale:Locale}){
  return <section className={cx(styles.section,styles.careerPreview)}><div className={styles.container}><div><span>{t(locale,"Karier di Garda Karya","Careers at Garda Karya")}</span><h2>{t(locale,"Kenali budaya kerja sebelum memilih cabang","Understand our working culture before choosing a branch")}</h2><p>{t(locale,"Career Hub membantu kandidat mengenal lingkungan kerja, manfaat, proses rekrutmen, dan jalur regional sebelum memilih cabang.","The Career Hub helps candidates understand our workplace, benefits, recruitment process, and regional paths before choosing a branch.")}</p></div><a className={styles.buttonLight} href={careerHubHref(locale)}>{t(locale,"Jelajahi Career Hub","Explore Career Hub")}<ArrowRight/></a></div></section>;
}

function FinalCorporateCta({locale}:{locale:Locale}){
  return <section className={styles.finalCta}><div className={styles.container}><div><span>{t(locale,"Langkah berikutnya","Next step")}</span><h2>{t(locale,"Diskusikan kebutuhan tenaga kerja perusahaan Anda","Discuss your company's workforce needs")}</h2><p>{t(locale,"Sampaikan jenis layanan, lokasi, dan kebutuhan awal. Formulir demonstrasi tidak mengirim atau menyimpan informasi.","Share the service type, location, and initial requirement. The demonstration form does not submit or store information.")}</p></div><a className={styles.buttonLight} href={corporateHref(locale,"contact")}>{t(locale,"Konsultasi Kebutuhan SDM","Consult Workforce Needs")}<ArrowRight/></a></div></section>;
}

function CorporateHome({locale}:{locale:Locale}){
  return <div className={styles.corporateHome}>
    <section className={styles.hero}><div className={styles.heroCopy}><span>{t(locale,"Solusi outsourcing untuk perusahaan","Outsourcing solutions for business")}</span><h1>{t(locale,"Solusi Outsourcing Profesional untuk Operasional Bisnis yang Lebih Andal","Professional Outsourcing Solutions for More Reliable Business Operations")}</h1><p>{t(locale,"Garda Karya Nusantara membantu perusahaan menempatkan personel terlatih dan terkelola untuk keamanan, fasilitas, logistik, serta dukungan operasional.","Garda Karya Nusantara helps companies deploy trained, well-managed personnel for security, facilities, logistics, and operational support.")}</p><div className={styles.heroActions}><a className={styles.button} href={corporateHref(locale,"contact")}>{t(locale,"Konsultasi Kebutuhan SDM","Consult Workforce Needs")}<ArrowRight/></a><a className={styles.buttonOutline} href={corporateHref(locale,"services")}>{t(locale,"Jelajahi Layanan","Explore Services")}<ArrowRight/></a></div><div className={styles.heroDetail}><ShieldCheck/><span>{t(locale,"Pemetaan kebutuhan · Persiapan personel · Koordinasi lapangan","Requirement mapping · Workforce preparation · Field coordination")}</span></div></div><div className={styles.heroAssets}><AssetSlot filename="hero-company-desktop.jpg" label={t(locale,"Tim operasional perusahaan dalam lingkungan kerja profesional","Corporate operations team in a professional workplace")} className={cx(styles.assetSurface,styles.heroDesktopAsset)} aspect="3 / 2"/><AssetSlot filename="hero-company-mobile.jpg" label={t(locale,"Personel operasional perusahaan untuk tampilan seluler","Corporate operational personnel for mobile view")} className={cx(styles.assetSurface,styles.heroMobileAsset)} aspect="4 / 5"/><div className={styles.heroEditorialNote}><span>GKN / OPERATIONS</span><b>{t(locale,"People prepared for the work behind your business.","People prepared for the work behind your business.")}</b></div></div></section>
    <TrustSection locale={locale}/><ServicesSection locale={locale} compact/><WhyGarda locale={locale}/><IndustriesSection locale={locale}/><OperationalProcess locale={locale}/><CoverageSection locale={locale}/><CareerPreview locale={locale}/><FinalCorporateCta locale={locale}/>
  </div>;
}

function AboutPage({locale}:{locale:Locale}){
  return <><PageHero eyebrow={t(locale,"Profil perusahaan","Company profile")} title={t(locale,"Membangun Operasional yang Lebih Tertata","Building More Dependable Operations")} text={local(company.description,locale)}/><section className={styles.section}><div className={cx(styles.container,styles.aboutIntro)}><div><SectionHeading eyebrow={t(locale,"Tentang Garda Karya","About Garda Karya")} title={t(locale,"Dibangun untuk kebutuhan kerja lapangan yang nyata","Built around real field requirements")} text={local(company.story,locale)}/><p className={styles.lead}>{t(locale,"Kami mengutamakan kejelasan tanggung jawab, kesiapan personel, dan komunikasi yang dapat dipahami oleh perusahaan maupun tim lapangan.","We prioritise clear responsibilities, workforce readiness, and communication that both clients and field teams can understand.")}</p></div><AssetSlot filename="hero-company-desktop.jpg" label={t(locale,"Kolaborasi tim operasional Garda Karya","Garda Karya operations team collaboration")} className={cx(styles.assetSurface,styles.aboutAsset)} aspect="4 / 5"/></div></section><section className={cx(styles.section,styles.valuesSection)}><div className={styles.container}><div className={styles.visionGrid}><article><span>{t(locale,"Visi","Vision")}</span><h2>{local(company.vision,locale)}</h2></article><article><span>{t(locale,"Misi","Mission")}</span><ul>{company.mission.map(item=><li key={item.en}><CheckCircle2/>{local(item,locale)}</li>)}</ul></article></div><div className={styles.standardList}>{operationalStandards.map((item,index)=><div key={item.en}><b>0{index+1}</b><p>{local(item,locale)}</p></div>)}</div></div></section><FinalCorporateCta locale={locale}/></>;
}

function ServicesPage({locale}:{locale:Locale}){
  return <><PageHero eyebrow={t(locale,"Layanan perusahaan","Business services")} title={t(locale,"Dukungan Operasional yang Terukur dan Terjaga","Reliable, Well-Managed Operational Support")} text={t(locale,"Solusi personel disusun berdasarkan kebutuhan lokasi, tanggung jawab, jadwal, dan model koordinasi perusahaan.","Workforce solutions are designed around site requirements, responsibilities, schedules, and the company's coordination model.")}/><ServicesSection locale={locale}/><OperationalProcess locale={locale}/><FinalCorporateCta locale={locale}/></>;
}

function ContactPage({locale}:{locale:Locale}){
  return <><PageHero eyebrow={t(locale,"Konsultasi perusahaan","Business consultation")} title={t(locale,"Mari Membahas Kebutuhan Operasional Anda","Let's Discuss Your Operational Needs")} text={t(locale,"Halaman ini khusus untuk pertanyaan layanan perusahaan. Pertanyaan kandidat tersedia melalui Career Hub dan halaman regional.","This page is dedicated to business service enquiries. Candidate support is available through the Career Hub and regional sites.")}/><section className={cx(styles.section,styles.contactSection)}><div className={cx(styles.container,styles.contactLayout)}><ConsultationForm locale={locale}/><aside className={styles.contactAside}><span>{t(locale,"Kontak perusahaan","Company contact")}</span><h2>{t(locale,"Informasi awal untuk percakapan yang lebih efektif","Useful context for a focused conversation")}</h2><p>{t(locale,"Siapkan jenis layanan, lokasi tenaga kerja, perkiraan jumlah personel, jadwal, dan target mulai. Tim dapat memetakan kebutuhan setelah informasi resmi dikonfirmasi.","Prepare the service type, workforce location, estimated headcount, schedule, and target start date. The team can map requirements after official details are confirmed.")}</p><dl><div><dt><Mail/>{t(locale,"Email perusahaan","Company email")}</dt><dd><a href={`mailto:${company.contacts.email}`}>{company.contacts.email}</a></dd></div><div><dt><MapPin/>{t(locale,"Kantor utama","Main office")}</dt><dd>{local(company.contacts.mainOffice,locale)}</dd></div><div><dt><Clock/>{t(locale,"Jam operasional","Business hours")}</dt><dd>{local(company.contacts.businessHours,locale)}</dd></div></dl><p className={styles.prototypeNote}><ShieldCheck/>{t(locale,"Gunakan formulir demonstrasi untuk meninjau alur konsultasi. Informasi tidak dikirim atau disimpan.","Use the demonstration form to review the consultation flow. Information is not submitted or stored.")}</p></aside></div></section></>;
}

function PrivacyPage({locale}:{locale:Locale}){
  return <><PageHero eyebrow={t(locale,"Informasi privasi","Privacy information")} title={t(locale,"Pemberitahuan Privasi Formulir Demonstrasi","Demonstration Form Privacy Notice")} text={t(locale,"Informasi yang perlu diketahui sebelum menggunakan formulir demonstrasi Garda Karya Nusantara.","What to know before using Garda Karya Nusantara demonstration forms.")}/><article className={styles.legal}><p className={styles.legalNotice}>{t(locale,"Formulir demonstrasi tidak mengirimkan informasi. Informasi yang Anda masukkan tidak diterima, disimpan, atau ditinjau oleh perusahaan.","Demonstration forms do not submit information. Anything you enter is not received, stored, or reviewed by the company.")}</p><h2>{t(locale,"Data yang diminta","Information requested")}</h2><p>{t(locale,"Field konsultasi menunjukkan informasi perusahaan yang mungkin dibutuhkan. Field lamaran menunjukkan informasi dasar kandidat untuk meninjau alurnya.","Consultation fields show the business information that may be needed. Application fields show basic candidate information for reviewing the flow.")}</p><h2>{t(locale,"Tidak ada integrasi eksternal","No external integration")}</h2><p>{t(locale,"Informasi tidak dikirim kepada Garda Karya Nusantara maupun layanan eksternal apa pun.","Information is not sent to Garda Karya Nusantara or to any external service.")}</p><h2>{t(locale,"Jika pengiriman online diaktifkan","If online submission is introduced")}</h2><p>{t(locale,"Pemberitahuan ini akan diperbarui sebelum formulir mulai menerima informasi, termasuk tujuan pemrosesan, periode penyimpanan, dasar pemrosesan, dan kanal kontak privasi.","This notice will be updated before any form begins accepting information, including processing purposes, retention periods, processing basis, and a privacy contact channel.")}</p></article></>;
}

const statusText:Record<Locale,Record<ApplicantStatus,string>>={id:{new:"Baru",review:"Ditinjau",contacted:"Dihubungi",interview:"Wawancara",closed:"Tidak Lanjut"},en:{new:"New",review:"Under Review",contacted:"Contacted",interview:"Interview",closed:"Closed"}};

function AdminPage({locale}:{locale:Locale}){
  const [query,setQuery]=useState("");
  const shown=applicants.filter(item=>`${item.name} ${item.position} ${item.city}`.toLowerCase().includes(query.toLowerCase()));
  return <><PageHero eyebrow={t(locale,"Pratinjau internal","Internal preview")} title={t(locale,"Data Pelamar Contoh","Sample Applicant Data")} text={t(locale,"Tampilan ini mempertahankan fitur pratinjau lama untuk demonstrasi internal dan tidak merepresentasikan data nyata.","This preserves the previous internal preview feature and does not represent real applicant data.")}/><section className={styles.section}><div className={styles.container}><label className={styles.adminSearch}>{t(locale,"Cari data contoh","Search sample data")}<input value={query} onChange={event=>setQuery(event.target.value)} placeholder={t(locale,"Nama, posisi, atau kota","Name, role, or city")}/></label>{shown.length?<div className={styles.adminTable}><table><thead><tr>{[t(locale,"Nama","Name"),t(locale,"Posisi","Position"),t(locale,"Kota","City"),t(locale,"Tanggal","Date"),"Status"].map(head=><th key={head}>{head}</th>)}</tr></thead><tbody>{shown.map(item=><tr key={item.whatsapp}><td>{item.name}</td><td>{item.position}</td><td>{item.city}</td><td>{item.applicationDate}</td><td>{statusText[locale][item.status]}</td></tr>)}</tbody></table></div>:<div className={styles.emptyState}><Search/><h2>{t(locale,"Tidak ada data contoh yang cocok","No matching sample data")}</h2></div>}</div></section></>;
}

function FAQSection({locale,regional=false}:{locale:Locale;regional?:boolean}){
  const items=faqs.slice(0,regional?6:5);
  return <section id="faq" className={cx(styles.section,styles.faqSection)}><div className={styles.container}><SectionHeading eyebrow="FAQ" title={regional?t(locale,"Pertanyaan Kandidat Regional","Regional Candidate Questions"):t(locale,"Pertanyaan Sebelum Memilih Cabang","Questions Before Choosing a Branch")} text={t(locale,"Jawaban berikut menjelaskan alur demonstrasi dan prinsip rekrutmen resmi tanpa menjanjikan ketersediaan posisi.","These answers explain the demonstration flow and official recruitment principles without promising role availability.")}/><div className={styles.faqList}>{items.map(item=><details key={item.question.en}><summary>{local(item.question,locale)}<ChevronDown/></summary><div><p>{local(item.answer,locale)}</p></div></details>)}</div></div></section>;
}

function RecruitmentProcess({locale}:{locale:Locale}){
  return <section id="process" className={styles.recruitmentProcess}><div className={styles.container}><SectionHeading eyebrow={t(locale,"Proses rekrutmen","Recruitment process")} title={t(locale,"Tahapan yang jelas dan tanpa biaya pendaftaran","A clear process with no application fee")} text={t(locale,"Tahapan aktual dapat berbeda menurut posisi dan cabang. Selalu verifikasi kontak recruiter resmi.","Actual stages may vary by role and branch. Always verify the official recruiter contact.")}/><ol>{recruitmentProcess.map((item,index)=><li key={item.title.en}><b>0{index+1}</b><div><h3>{local(item.title,locale)}</h3><p>{local(item.description,locale)}</p></div></li>)}</ol></div></section>;
}

function CareerHubPage({locale}:{locale:Locale}){
  const benefits=[
    [t(locale,"Briefing yang jelas","Clear job briefings"),t(locale,"Memahami peran, lokasi, dan tanggung jawab sebelum proses berlanjut.","Understand the role, location, and responsibilities before proceeding.")],
    [t(locale,"Proses resmi tanpa biaya","Fee-free official process"),t(locale,"Kandidat tidak diminta transfer atau pembayaran pendaftaran.","Candidates are not asked for transfers or application payments.")],
    [t(locale,"Jalur pengembangan","Development paths"),t(locale,"Kesempatan belajar melalui pembekalan dan umpan balik supervisor.","Learning opportunities through preparation and supervisor feedback.")],
    [t(locale,"Konteks kerja lokal","Local working context"),t(locale,"Informasi regional membantu kandidat memahami lingkungan penempatan.","Regional information helps candidates understand the placement environment.")],
  ];
  const stories=[
    [t(locale,"Memulai penugasan pertama","Starting a first assignment"),t(locale,"Dari memahami SOP lokasi hingga membangun kebiasaan laporan yang rapi.","From understanding site procedures to building clear reporting habits.")],
    [t(locale,"Bertumbuh menjadi pemimpin regu","Growing into team leadership"),t(locale,"Pembekalan, konsistensi, dan komunikasi menjadi dasar tanggung jawab yang lebih besar.","Preparation, consistency, and communication support greater responsibility.")],
    [t(locale,"Beradaptasi antarlingkungan kerja","Adapting across work environments"),t(locale,"Setiap lokasi memiliki ritme, pengguna, dan kebutuhan layanan yang berbeda.","Every site has a different rhythm, audience, and service requirement.")],
  ];
  return <div className={styles.careerHub}>
    <section className={styles.careerHero}><div className={styles.careerHeroCopy}><span>{t(locale,"Karier di Garda Karya","Careers at Garda Karya")}</span><h1>{t(locale,"Kerja yang Jelas. Tim yang Saling Menjaga.","Clear Work. A Team That Looks Out for One Another.")}</h1><p>{t(locale,"Kenali lingkungan kerja, manfaat, proses rekrutmen, dan karakter setiap cabang sebelum melihat kesempatan regional.","Explore our workplace, benefits, recruitment process, and each branch's character before viewing regional opportunities.")}</p><div className={styles.heroActions}><a className={styles.buttonLight} href="#life">{t(locale,"Lihat Kehidupan di Garda","Explore Life at Garda")}<ArrowRight/></a><a className={styles.buttonGhost} href="#choose-branch">{t(locale,"Pilih Cabang","Choose Your Branch")}</a></div></div><AssetSlot filename="career-hero.jpg" label={t(locale,"Kehidupan tim Garda Karya","Life at Garda Karya")} className={cx(styles.assetSurface,styles.careerHeroAsset)} aspect="4 / 3"/></section>
    <section id="life" className={cx(styles.section,styles.lifeSection)}><div className={styles.container}><SectionHeading eyebrow={t(locale,"Life at Garda","Life at Garda")} title={t(locale,"Disiplin dalam tugas, manusiawi dalam bekerja","Disciplined in the work, human in the way we work")} text={t(locale,"Budaya kerja dibentuk oleh kesiapan, komunikasi, kepedulian terhadap rekan, dan tanggung jawab pada lokasi penugasan.","Our culture is shaped by readiness, communication, care for colleagues, and responsibility to each assigned site.")}/><div className={styles.lifeGrid}><AssetSlot filename="life-at-garda-01.jpg" label={t(locale,"Briefing tim sebelum penugasan","Team briefing before an assignment")} className={styles.assetSurface}/><div className={styles.lifeStatement}><HeartHandshake/><h3>{t(locale,"Kerja tim yang terasa dalam aktivitas sehari-hari","Teamwork that shows up in daily operations")}</h3><p>{t(locale,"Informasi disampaikan dengan jelas, masalah dibicarakan melalui jalur yang tepat, dan setiap orang memahami dampak pekerjaannya pada tim.","Information is shared clearly, issues follow the right escalation path, and each person understands how their work affects the team.")}</p></div><AssetSlot filename="life-at-garda-02.jpg" label={t(locale,"Kolaborasi personel Garda Karya","Garda Karya personnel collaboration")} className={styles.assetSurface}/></div></div></section>
    <section className={cx(styles.section,styles.storySection)}><div className={styles.container}><SectionHeading eyebrow={t(locale,"Employee stories","Employee stories")} title={t(locale,"Perspektif dari perjalanan kerja di lapangan","Perspectives from a field career journey")} text={t(locale,"Tiga tema berikut menggambarkan hal yang penting dalam perjalanan kerja di lapangan.","These three themes highlight what matters throughout a field career journey.")}/><div className={styles.storyGrid}>{stories.map(([title,text],index)=><article key={title}><AssetSlot filename={`employee-story-0${index+1}.jpg`} label={title} className={styles.storyAsset}/><span>0{index+1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
    <section className={cx(styles.section,styles.benefitSection)}><div className={styles.container}><SectionHeading eyebrow={t(locale,"Manfaat bekerja","Benefits")} title={t(locale,"Dukungan untuk menjalankan peran dengan lebih siap","Support that helps people perform with confidence")}/><div className={styles.benefitGrid}>{benefits.map(([title,text],index)=><article key={title}><b>0{index+1}</b><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
    <RecruitmentProcess locale={locale}/>
    <section className={cx(styles.section,styles.whyJoin)}><div className={cx(styles.container,styles.whyJoinGrid)}><div><SectionHeading eyebrow={t(locale,"Mengapa bergabung","Why join Garda")} title={t(locale,"Ruang untuk belajar dari pekerjaan yang nyata","Room to grow through real operational work")} text={t(locale,"Peran operasional membangun kebiasaan yang berguna: disiplin waktu, komunikasi, perhatian pada detail, dan kemampuan bekerja bersama.","Operational roles build durable habits: time discipline, communication, attention to detail, and teamwork.")}/></div><ul>{[t(locale,"Tanggung jawab dijelaskan sejak awal","Responsibilities explained from the start"),t(locale,"Jalur komunikasi yang lebih terarah","Clearer communication channels"),t(locale,"Pembekalan sesuai kebutuhan penugasan","Preparation adapted to the assignment"),t(locale,"Kesempatan berkembang melalui konsistensi","Growth opportunities through consistent performance")].map(item=><li key={item}><Check/>{item}</li>)}</ul></div></section>
    <section id="choose-branch" className={cx(styles.section,styles.branchSelector)}><div className={styles.container}><SectionHeading eyebrow={t(locale,"Pilih wilayah","Choose your branch")} title={t(locale,"Masuk ke pengalaman karier regional","Continue to a regional career experience")} text={t(locale,"Lowongan, detail posisi, dan formulir lamaran hanya tersedia setelah kandidat memilih cabang.","Vacancies, job details, and application forms are available only after a candidate chooses a branch.")}/><div className={styles.branchCardGrid}>{branchSlugs.map(branch=><a key={branch} className={styles.branchCard} href={regionalHref(locale,branch)}><AssetSlot filename={`branch-${branch}-card.jpg`} label={branchLabels[branch][locale]} className={styles.branchCardAsset}/><span>{local(branchProfiles[branch].focus,locale)}</span><h3>{branchLabels[branch][locale]}</h3><p>{local(branchProfiles[branch].description,locale)}</p><b>{t(locale,"Buka situs regional","Open regional site")}<ArrowRight/></b></a>)}</div></div></section>
    <FAQSection locale={locale}/>
    <section className={styles.backCorporate}><div className={styles.container}><div><span>{t(locale,"Mencari layanan perusahaan?","Looking for business services?")}</span><h2>{t(locale,"Kembali ke website corporate Garda Karya","Return to the Garda Karya corporate website")}</h2></div><a className={styles.buttonLight} href={corporateWebsiteHref(locale)}>{t(locale,"Website Corporate","Corporate Website")} ↗</a></div></section>
  </div>;
}

function RegionalJobCard({locale,branch,vacancy}:{locale:Locale;branch:BranchSlug;vacancy:Vacancy}){
  return <article className={styles.jobCard}><div className={styles.jobCardTop}><span>{local(vacancy.urgency,locale)}</span><small>{vacancy.location}</small></div><h3>{local(vacancy.title,locale)}</h3><p>{local(vacancy.shortDescription,locale)}</p><div className={styles.jobMeta}><span><Briefcase/>{local(vacancy.employmentType,locale)}</span><span><Clock/>{t(locale,"Ditutup","Closes")} {new Date(vacancy.closingDate).toLocaleDateString(locale==="id"?"id-ID":"en-GB",{day:"numeric",month:"short",year:"numeric"})}</span></div><div className={styles.jobActions}><a className={styles.buttonOutline} href={jobHref(locale,branch,vacancy.slug)}>{t(locale,"Lihat Detail","View Details")}</a><a className={styles.button} href={applyHref(locale,branch,vacancy.slug)}>{t(locale,"Tinjau Form Lamaran","Review Application Form")}</a></div></article>;
}

function AntiFraud({locale}:{locale:Locale}){
  return <aside className={styles.antiFraud}><AlertTriangle/><div><h2>{t(locale,"Proses rekrutmen resmi tidak dipungut biaya","Our official recruitment process is free")}</h2><p>{t(locale,"Jangan melakukan pembayaran atau memberikan informasi rekening kepada pihak yang mengatasnamakan perusahaan.","Do not make payments or provide banking information to anyone claiming to represent the company.")}</p></div></aside>;
}

function RegionalPage({locale,branch}:{locale:Locale;branch:BranchSlug}){
  const profile=branchProfiles[branch];
  const branchVacancies=vacancies.filter(vacancy=>vacancy.branch===branch);
  return <div className={styles.regionalPage} data-branch={branch}>
    <section className={styles.regionalHero}><div><span>{local(profile.eyebrow,locale)}</span><h1>{local(profile.headline,locale)}</h1><p>{local(profile.description,locale)}</p><div className={styles.heroActions}><a className={styles.buttonLight} href="#open-positions">{t(locale,"Lihat Lowongan","View Open Positions")}<ArrowRight/></a><a className={styles.buttonGhost} href={corporateWebsiteHref(locale)}>{t(locale,"Website Corporate","Corporate Website")} ↗</a></div></div><AssetSlot filename={`branch-${branch}-hero.jpg`} label={local(profile.headline,locale)} className={cx(styles.assetSurface,styles.regionalHeroAsset)} aspect="4 / 3"/></section>
    <section className={cx(styles.section,styles.branchAbout)}><div className={cx(styles.container,styles.branchAboutGrid)}><div><SectionHeading eyebrow={t(locale,"Tentang cabang","About the branch")} title={branchLabels[branch][locale]} text={local(profile.about,locale)}/><div className={styles.areaChips}>{profile.areas.map(area=><span key={area.en}><MapPin/>{local(area,locale)}</span>)}</div></div><AssetSlot filename={`branch-${branch}-team.jpg`} label={t(locale,`Tim cabang ${branchLabels[branch][locale]}`,`${branchLabels[branch][locale]} branch team`)} className={styles.assetSurface} aspect="3 / 2"/></div></section>
    <section id="open-positions" className={cx(styles.section,styles.openPositions)}><div className={styles.container}><div className={styles.sectionSplitHeading}><SectionHeading eyebrow={t(locale,"Lowongan terbuka","Open positions")} title={t(locale,`Kesempatan di ${branchLabels[branch][locale]}`,`Opportunities in ${branchLabels[branch][locale]}`)} text={t(locale,"Posisi hanya ditampilkan ketika data regional tersedia dan dapat dijelaskan secara lengkap.","Roles are shown only when regional information is available and can be described completely.")}/>{branchVacancies.length>0&&<a className={styles.textLink} href={regionalJobsHref(locale,branch)}>{t(locale,"Lihat semua lowongan","View all open roles")}<ArrowRight/></a>}</div>{branchVacancies.length?<div className={styles.jobGrid}>{branchVacancies.slice(0,3).map(vacancy=><RegionalJobCard key={vacancy.slug} locale={locale} branch={branch} vacancy={vacancy}/>)}</div>:<div className={styles.emptyState}><Briefcase/><h3>{t(locale,"Belum ada posisi terverifikasi untuk cabang ini","No verified openings for this branch yet")}</h3><p>{t(locale,"Kunjungi kembali halaman regional ini ketika informasi lowongan resmi telah tersedia.","Return to this regional page when official vacancy information becomes available.")}</p></div>}</div></section>
    <section id="departments" className={cx(styles.section,styles.departmentSection)}><div className={styles.container}><SectionHeading eyebrow={t(locale,"Departemen","Departments")} title={t(locale,"Jalur kerja yang mendukung kebutuhan wilayah","Work paths shaped around regional needs")} text={local(profile.focus,locale)}/><div className={styles.departmentGrid}>{profile.departments.map((department,index)=><article key={department.en}><span>0{index+1}</span><h3>{local(department,locale)}</h3><p>{t(locale,"Ruang lingkup dan persyaratan dijelaskan pada setiap lowongan resmi.","Scope and requirements are explained in each official vacancy.")}</p></article>)}</div></div></section>
    <section id="life" className={cx(styles.section,styles.regionalLife)}><div className={styles.container}><SectionHeading eyebrow={t(locale,"Kehidupan di cabang","Life in the branch")} title={t(locale,"Lingkungan lokal, cara kerja yang tetap terarah","A local environment with a consistent way of working")} text={t(locale,"Kehidupan cabang dibentuk oleh briefing, koordinasi tim, dan aktivitas bersama di lingkungan setempat.","Branch life is shaped by briefings, team coordination, and shared activities in the local environment.")}/><div className={styles.regionalGallery}>{[1,2,3].map(index=><AssetSlot key={index} filename={`branch-${branch}-gallery-0${index}.jpg`} label={t(locale,`Aktivitas cabang ${branchLabels[branch][locale]} ${index}`,`${branchLabels[branch][locale]} branch activity ${index}`)} className={styles.assetSurface}/>)}</div></div></section>
    <RecruitmentProcess locale={locale}/><FAQSection locale={locale} regional/>
    <section className={styles.hrContact}><div className={styles.container}><div><span>{t(locale,"Kontak HR regional","Regional HR contact")}</span><h2>{t(locale,`Pertanyaan karier untuk ${branchLabels[branch][locale]}`,`Career questions for ${branchLabels[branch][locale]}`)}</h2><p>{t(locale,"Gunakan kontak pusat rekrutmen dan sebutkan cabang serta posisi yang ingin ditanyakan.","Use the central recruitment contact and mention the branch and role you are asking about.")}</p></div><a className={styles.buttonLight} href={whatsappHref(company.contacts.recruitmentWhatsapp,t(locale,`Halo, saya ingin bertanya mengenai karier di cabang ${branchLabels[branch][locale]}.`,`Hello, I would like to ask about careers in the ${branchLabels[branch][locale]} branch.`))} target="_blank" rel="noopener noreferrer"><MessageCircle/>{t(locale,"Hubungi HR","Contact HR")}</a></div></section>
    <div className={styles.regionalSafety}><AntiFraud locale={locale}/><a href={corporateWebsiteHref(locale)}>{t(locale,"Kembali ke Website Corporate","Back to Corporate Website")} ↗</a></div>
  </div>;
}

function RegionalJobsPage({locale,branch}:{locale:Locale;branch:BranchSlug}){
  const [query,setQuery]=useState("");
  const [category,setCategory]=useState("");
  const branchVacancies=useMemo(()=>vacancies.filter(vacancy=>vacancy.branch===branch),[branch]);
  const filtered=branchVacancies.filter(vacancy=>(!query||`${local(vacancy.title,locale)} ${vacancy.location}`.toLowerCase().includes(query.toLowerCase()))&&(!category||vacancy.category===category));
  return <><section className={styles.regionalJobsHero}><div className={styles.container}><span>{t(locale,"Lowongan regional","Regional open positions")}</span><h1>{t(locale,`Karier di ${branchLabels[branch][locale]}`,`Careers in ${branchLabels[branch][locale]}`)}</h1><p>{t(locale,"Cari posisi setelah memilih cabang. Informasi dan proses di halaman ini khusus untuk jalur rekrutmen regional.","Search for roles after choosing a branch. Information and flows on this page belong to the regional recruitment journey.")}</p></div></section><section className={cx(styles.section,styles.regionalJobsSection)}><div className={styles.container}>{branchVacancies.length?<><div className={styles.jobFilters}><label><span>{t(locale,"Cari posisi atau lokasi","Search role or location")}</span><div><Search/><input type="search" value={query} onChange={event=>setQuery(event.target.value)} placeholder={t(locale,"Contoh: Security Officer","Example: Security Officer")}/></div></label><label><span>{t(locale,"Kategori","Category")}</span><select value={category} onChange={event=>setCategory(event.target.value)}><option value="">{t(locale,"Semua kategori","All categories")}</option><option value="security">Security</option><option value="operations">Operations</option><option value="facility">Facility Support</option></select></label></div><p className={styles.resultCount} aria-live="polite">{filtered.length} {t(locale,"posisi ditemukan","roles found")}</p>{filtered.length?<div className={styles.jobGrid}>{filtered.map(vacancy=><RegionalJobCard key={vacancy.slug} locale={locale} branch={branch} vacancy={vacancy}/>)}</div>:<div className={styles.emptyState}><Search/><h2>{t(locale,"Tidak ada posisi yang cocok","No matching roles")}</h2><button className={styles.button} onClick={()=>{setQuery("");setCategory("")}}>{t(locale,"Atur ulang pencarian","Reset search")}</button></div>}</>:<div className={styles.emptyState}><Briefcase/><h2>{t(locale,"Belum ada lowongan terverifikasi","No verified openings yet")}</h2><p>{t(locale,"Informasi cabang tetap tersedia sambil menunggu konfirmasi lowongan resmi.","Branch information remains available while the team awaits confirmed vacancy details.")}</p><a className={styles.buttonOutline} href={regionalHref(locale,branch)}>{t(locale,"Kembali ke halaman cabang","Back to branch page")}</a></div>}<AntiFraud locale={locale}/></div></section></>;
}

function Breadcrumbs({locale,branch,vacancy}:{locale:Locale;branch:BranchSlug;vacancy?:Vacancy}){
  return <nav className={styles.breadcrumbs} aria-label="Breadcrumb"><a href={careerHubHref(locale)}>{t(locale,"Karier","Career")}</a><ArrowRight/><a href={regionalHref(locale,branch)}>{branchLabels[branch][locale]}</a><ArrowRight/><a href={regionalJobsHref(locale,branch)}>{t(locale,"Lowongan","Open positions")}</a>{vacancy&&<><ArrowRight/><span>{local(vacancy.title,locale)}</span></>}</nav>;
}

function JobSection({title,items,numbered=false}:{title:string;items:string[];numbered?:boolean}){
  return <section className={styles.jobContentSection}><h2>{title}</h2><ul>{items.map((item,index)=><li key={item}>{numbered?<b>0{index+1}</b>:<CheckCircle2/>}<span>{item}</span></li>)}</ul></section>;
}

function JobDetailPage({locale,branch,slug}:{locale:Locale;branch:BranchSlug;slug:string}){
  const vacancy=getVacancy(slug)!;
  const related=vacancies.filter(item=>item.branch===branch&&item.slug!==slug).slice(0,2);
  const benefits=[t(locale,"Briefing sebelum penempatan","Pre-assignment briefing"),t(locale,"Koordinasi melalui tim regional","Regional team coordination"),t(locale,"Informasi proses rekrutmen tanpa biaya","Fee-free recruitment information")];
  return <div className={styles.jobPage}><section className={styles.jobHero}><div className={styles.container}><Breadcrumbs locale={locale} branch={branch} vacancy={vacancy}/><div className={styles.jobHeroGrid}><div><span>{local(vacancy.urgency,locale)}</span><h1>{local(vacancy.title,locale)}</h1><p>{local(vacancy.shortDescription,locale)}</p><div className={styles.jobMetaLarge}><span><MapPin/>{vacancy.location}, {branchLabels[branch][locale]}</span><span><Briefcase/>{local(vacancy.employmentType,locale)}</span><span><Clock/>{t(locale,"Ditutup","Closes")} {new Date(vacancy.closingDate).toLocaleDateString(locale==="id"?"id-ID":"en-GB")}</span></div></div><aside><b>{t(locale,"Ringkasan posisi","Role summary")}</b><dl><div><dt>{t(locale,"Cabang","Branch")}</dt><dd>{branchLabels[branch][locale]}</dd></div><div><dt>{t(locale,"Kategori","Category")}</dt><dd>{vacancy.category}</dd></div><div><dt>{t(locale,"Status","Status")}</dt><dd>{local(vacancy.urgency,locale)}</dd></div></dl></aside></div></div></section><section className={styles.jobDetailLayout}><article><JobSection title={t(locale,"Tanggung Jawab","Responsibilities")} items={vacancy.responsibilities.map(item=>local(item,locale))}/><JobSection title={t(locale,"Persyaratan","Requirements")} items={vacancy.requirements.map(item=>local(item,locale))}/><JobSection title={t(locale,"Kualifikasi yang Disukai","Preferred Qualifications")} items={vacancy.preferred.map(item=>local(item,locale))}/><JobSection title={t(locale,"Dukungan dan Manfaat","Support and Benefits")} items={benefits}/><JobSection title={t(locale,"Proses Rekrutmen","Recruitment Process")} items={vacancy.process.map(item=>local(item,locale))} numbered/></article><aside className={styles.applyCard}><span>{t(locale,"Formulir demonstrasi","Demonstration form")}</span><h2>{t(locale,"Tertarik dengan posisi ini?","Interested in this role?")}</h2><p>{t(locale,"Formulir berikut membantu Anda meninjau alur lamaran. Informasi tidak dikirim atau disimpan.","The next form lets you review the application flow. Information is not submitted or stored.")}</p><a className={styles.button} href={applyHref(locale,branch,slug)}>{t(locale,"Tinjau Form Lamaran","Review Application Form")}<ArrowRight/></a><AntiFraud locale={locale}/></aside></section>{related.length>0&&<section className={cx(styles.section,styles.relatedJobs)}><div className={styles.container}><SectionHeading eyebrow={t(locale,"Posisi terkait","Related roles")} title={t(locale,"Kesempatan lain di cabang ini","Other opportunities in this branch")}/><div className={styles.jobGrid}>{related.map(item=><RegionalJobCard key={item.slug} locale={locale} branch={branch} vacancy={item}/>)}</div></div></section>}<div className={styles.mobileApply}><span><small>{vacancy.location}</small><b>{local(vacancy.title,locale)}</b></span><a className={styles.button} href={applyHref(locale,branch,slug)}>{t(locale,"Lamar","Apply")}</a></div></div>;
}

type ApplyField="name"|"phone"|"city"|"age"|"education"|"consent";
type ApplyErrors=Partial<Record<ApplyField,string>>;

function ApplicationPage({locale,branch,slug}:{locale:Locale;branch:BranchSlug;slug:string}){
  const vacancy=getVacancy(slug)!;
  const router=useRouter();
  const [errors,setErrors]=useState<ApplyErrors>({});
  const [loading,setLoading]=useState(false);
  const timer=useRef<ReturnType<typeof setTimeout>|null>(null);
  const summary=useRef<HTMLDivElement>(null);
  const fieldLabels:Record<ApplyField,string>={
    name:t(locale,"Nama Lengkap","Full Name"),
    phone:t(locale,"Nomor WhatsApp","WhatsApp Number"),
    city:t(locale,"Kota Domisili","City of Residence"),
    age:t(locale,"Usia","Age"),
    education:t(locale,"Pendidikan Terakhir","Highest Education"),
    consent:t(locale,"Persetujuan","Consent"),
  };
  useEffect(()=>()=>{if(timer.current)clearTimeout(timer.current)},[]);
  const described=(name:ApplyField)=>errors[name]?`apply-${name}-error`:undefined;
  const submit=(event:FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    if(loading)return;
    const data=new FormData(event.currentTarget);
    const next:ApplyErrors={};
    const name=String(data.get("name")||"").trim();
    const phone=String(data.get("phone")||"").replace(/\s/g,"");
    const city=String(data.get("city")||"").trim();
    const age=Number(data.get("age"));
    if(name.length<3)next.name=t(locale,"Nama minimal 3 karakter.","Name must contain at least 3 characters.");
    if(!/^(\+62|62|0)8\d{8,11}$/.test(phone))next.phone=t(locale,"Masukkan nomor Indonesia yang valid.","Enter a valid Indonesian phone number.");
    if(city.length<2)next.city=t(locale,"Masukkan kota domisili.","Enter your city of residence.");
    if(!age||age<18||age>60)next.age=t(locale,"Usia harus antara 18 dan 60.","Age must be between 18 and 60.");
    if(!data.get("education"))next.education=t(locale,"Pilih pendidikan terakhir.","Select your highest education.");
    if(!data.get("consent"))next.consent=t(locale,"Persetujuan wajib diberikan untuk melanjutkan.","Consent is required to continue.");
    setErrors(next);
    if(Object.keys(next).length){requestAnimationFrame(()=>summary.current?.focus());return}
    setLoading(true);
    timer.current=setTimeout(()=>router.push(successHref(locale,branch,slug)),800);
  };
  const errorEntries=Object.entries(errors) as Array<[ApplyField,string]>;
  return <div className={styles.applicationPage}>
    <section className={styles.applicationHero}><div className={styles.container}>
      <Breadcrumbs locale={locale} branch={branch} vacancy={vacancy}/>
      <span>{t(locale,"Formulir demonstrasi","Demonstration form")}</span>
      <h1>{t(locale,"Lamar","Apply for")} {local(vacancy.title,locale)}</h1>
      <p>{t(locale,"Lengkapi formulir untuk meninjau alurnya. Informasi tidak dikirim, diterima, atau disimpan.","Complete the form to review its flow. Information is not sent, received, or stored.")}</p>
    </div></section>
    <section className={styles.applicationLayout}>
      <form onSubmit={submit} noValidate aria-busy={loading} className={styles.applicationForm}>
        {errorEntries.length>0&&<div ref={summary} className={styles.errorSummary} tabIndex={-1} role="alert"><AlertTriangle/><div><b>{t(locale,"Periksa kembali field berikut:","Review the following fields:")}</b><ul>{errorEntries.map(([field,error])=><li key={field}><a href={`#apply-${field}`}>{fieldLabels[field]}: {error}</a></li>)}</ul></div></div>}
        <div className={styles.formGrid}>
          <label htmlFor="apply-name">{fieldLabels.name}<input id="apply-name" name="name" required aria-required="true" aria-invalid={!!errors.name} aria-describedby={described("name")} disabled={loading}/>{errors.name&&<small id="apply-name-error">{errors.name}</small>}</label>
          <label htmlFor="apply-phone">{fieldLabels.phone}<input id="apply-phone" name="phone" type="tel" required aria-required="true" aria-invalid={!!errors.phone} aria-describedby={described("phone")} disabled={loading}/>{errors.phone&&<small id="apply-phone-error">{errors.phone}</small>}</label>
          <label htmlFor="apply-city">{fieldLabels.city}<input id="apply-city" name="city" required aria-required="true" aria-invalid={!!errors.city} aria-describedby={described("city")} disabled={loading}/>{errors.city&&<small id="apply-city-error">{errors.city}</small>}</label>
          <label htmlFor="apply-age">{fieldLabels.age}<input id="apply-age" name="age" type="number" min="18" max="60" required aria-required="true" aria-invalid={!!errors.age} aria-describedby={described("age")} disabled={loading}/>{errors.age&&<small id="apply-age-error">{errors.age}</small>}</label>
          <label htmlFor="apply-education">{fieldLabels.education}<select id="apply-education" name="education" required aria-required="true" aria-invalid={!!errors.education} aria-describedby={described("education")} disabled={loading}><option value="">{t(locale,"Pilih pendidikan","Select education")}</option><option>SMA / SMK</option><option>Diploma</option><option>{t(locale,"Sarjana","Bachelor's degree")}</option></select>{errors.education&&<small id="apply-education-error">{errors.education}</small>}</label>
          <label>{t(locale,"Posisi","Role")}<input value={local(vacancy.title,locale)} disabled/><input type="hidden" name="position" value={vacancy.slug}/></label>
          <label className={styles.fullField} htmlFor="apply-experience">{t(locale,"Pengalaman Kerja (opsional)","Work Experience (optional)")}<textarea id="apply-experience" name="experience" rows={5} maxLength={500} disabled={loading}/></label>
          <label className={cx(styles.fullField,styles.consentField)} htmlFor="apply-consent"><input id="apply-consent" name="consent" type="checkbox" required aria-required="true" aria-invalid={!!errors.consent} aria-describedby={described("consent")} disabled={loading}/><span>{t(locale,"Saya memahami bahwa formulir demonstrasi ini tidak mengirimkan informasi kepada perusahaan.","I understand that this demonstration form does not submit information to the company.")}</span></label>
          {errors.consent&&<small id="apply-consent-error" className={styles.fullField}>{errors.consent}</small>}
        </div>
        <button type="submit" className={styles.button} disabled={loading}>{loading?t(locale,"Memproses...","Processing..."):t(locale,"Tinjau Alur Lamaran","Review Application Flow")}<ArrowRight/></button>
        <p className={styles.formSecurity}><ShieldCheck/>{t(locale,"Informasi tidak dikirim ke perusahaan atau layanan eksternal.","Information is not sent to the company or any external service.")}</p>
      </form>
      <aside className={styles.applicationAside}><span>{t(locale,"Ringkasan posisi","Role summary")}</span><h2>{local(vacancy.title,locale)}</h2><p><MapPin/>{vacancy.location}, {branchLabels[branch][locale]}</p><p><Briefcase/>{local(vacancy.employmentType,locale)}</p><AntiFraud locale={locale}/></aside>
    </section>
  </div>;
}

function SuccessPage({locale,branch,slug}:{locale:Locale;branch:BranchSlug;slug:string}){
  const vacancy=getVacancy(slug)!;
  return <section className={styles.successPage}><CheckCircle2/><span>{t(locale,"Demonstrasi selesai","Demonstration complete")}</span><h1>{t(locale,"Alur Formulir Lamaran Selesai","Application Form Flow Completed")}</h1><p>{t(locale,"Tidak ada informasi yang dikirim, diterima, disimpan, atau ditinjau. Alur demonstrasi telah selesai untuk","No information was sent, received, stored, or reviewed. The demonstration flow is complete for")} <b>{local(vacancy.title,locale)}</b>.</p><div className={styles.successActions}><a className={styles.button} href={regionalJobsHref(locale,branch)}>{t(locale,"Kembali ke Lowongan Regional","Back to Regional Jobs")}</a><a className={styles.buttonOutline} href={regionalHref(locale,branch)}>{t(locale,"Halaman Cabang","Branch Page")}</a><a className={styles.textLink} href={corporateWebsiteHref(locale)}>{t(locale,"Website Corporate","Corporate Website")} ↗</a></div></section>;
}

export function Site({locale,path}:{locale:Locale;path:string[]}){
  const route=resolveRoute(locale,path);
  if(!route)return null;
  let page:ReactNode;
  switch(route.kind){
    case"home":page=<CorporateHome locale={locale}/>;break;
    case"about":page=<AboutPage locale={locale}/>;break;
    case"services":page=<ServicesPage locale={locale}/>;break;
    case"contact":page=<ContactPage locale={locale}/>;break;
    case"privacy":page=<PrivacyPage locale={locale}/>;break;
    case"admin":page=<AdminPage locale={locale}/>;break;
    case"careerHub":page=<CareerHubPage locale={locale}/>;break;
    case"regional":page=<RegionalPage locale={locale} branch={route.branch}/>;break;
    case"regionalJobs":page=<RegionalJobsPage locale={locale} branch={route.branch}/>;break;
    case"job":page=<JobDetailPage locale={locale} branch={route.branch} slug={route.slug}/>;break;
    case"apply":page=<ApplicationPage locale={locale} branch={route.branch} slug={route.slug}/>;break;
    case"success":page=<SuccessPage locale={locale} branch={route.branch} slug={route.slug}/>;break;
  }
  return <Layout locale={locale} route={route}>{page}</Layout>;
}
