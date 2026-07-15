import type {MetadataRoute} from "next";
import {
  branchSlugs,
  careerHubHref,
  corporateHref,
  isBranchSlug,
  jobHref,
  locales,
  regionalHref,
  regionalJobsHref,
  type CorporateRouteKind,
} from "@/data/routes";
import {vacancies} from "@/data/site";

const publicCorporateRoutes: CorporateRouteKind[] = [
  "home",
  "about",
  "services",
  "contact",
  "privacy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const absolute = (path: string) => new URL(path, base).toString();
  const output: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const kind of publicCorporateRoutes) {
      output.push({
        url: absolute(corporateHref(locale, kind)),
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: kind === "home" ? 1 : kind === "services" ? 0.9 : 0.7,
      });
    }

    output.push({
      url: absolute(careerHubHref(locale)),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    });

    for (const branch of branchSlugs) {
      output.push(
        {
          url: absolute(regionalHref(locale, branch)),
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.8,
        },
        {
          url: absolute(regionalJobsHref(locale, branch)),
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.8,
        },
      );
    }

    for (const vacancy of vacancies) {
      if (!isBranchSlug(vacancy.branch)) continue;
      output.push({
        url: absolute(jobHref(locale, vacancy.branch, vacancy.slug)),
        lastModified: vacancy.postedDate,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  }

  return output;
}
