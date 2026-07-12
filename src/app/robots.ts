import type {MetadataRoute} from "next";
export default function robots():MetadataRoute.Robots{const base=process.env.NEXT_PUBLIC_SITE_URL||"http://localhost:3000";const allowed=process.env.NEXT_PUBLIC_ALLOW_INDEXING==="true";return {rules:{userAgent:"*",...(allowed?{allow:"/"}:{disallow:"/"})},sitemap:`${base}/sitemap.xml`,host:base}}
