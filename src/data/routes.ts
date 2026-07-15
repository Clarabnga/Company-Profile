import {getVacancy} from "@/data/site";

export const locales = ["id", "en"] as const;
export type Locale = (typeof locales)[number];

export const branchSlugs = ["bali", "jateng", "kaltim", "jakarta"] as const;
export type BranchSlug = (typeof branchSlugs)[number];

export const localizedSegments = {
  id: {
    about: "tentang-kami",
    services: "layanan",
    contact: "kontak",
    privacy: "kebijakan-privasi",
    admin: "admin-preview",
    careerHub: "karier",
    jobs: "lowongan",
    apply: "lamar",
    success: "berhasil",
  },
  en: {
    about: "about",
    services: "services",
    contact: "contact",
    privacy: "privacy-policy",
    admin: "admin-preview",
    careerHub: "career",
    jobs: "careers",
    apply: "apply",
    success: "success",
  },
} as const satisfies Record<Locale, Record<string, string>>;

export const branchLabels: Record<BranchSlug, Record<Locale, string>> = {
  bali: {id: "Bali", en: "Bali"},
  jateng: {id: "Jawa Tengah", en: "Central Java"},
  kaltim: {id: "Kalimantan Timur", en: "East Kalimantan"},
  jakarta: {id: "Jakarta", en: "Jakarta"},
};

export type CorporateRouteKind =
  | "home"
  | "about"
  | "services"
  | "contact"
  | "privacy"
  | "admin";

export type RouteInfo =
  | {kind: CorporateRouteKind}
  | {kind: "careerHub"}
  | {kind: "regional"; branch: BranchSlug}
  | {kind: "regionalJobs"; branch: BranchSlug}
  | {kind: "job"; branch: BranchSlug; slug: string}
  | {kind: "apply"; branch: BranchSlug; slug: string}
  | {kind: "success"; branch: BranchSlug; slug: string};

export type RouteKind = RouteInfo["kind"];

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function isBranchSlug(value: string): value is BranchSlug {
  return (branchSlugs as readonly string[]).includes(value);
}

export function alternateLocale(locale: Locale): Locale {
  return locale === "id" ? "en" : "id";
}

export function href(locale: Locale, path: string | readonly string[] = ""): string {
  const value = typeof path === "string" ? path : path.join("/");
  const normalized = value.replace(/^\/+|\/+$/g, "");
  return `/${locale}${normalized ? `/${normalized}` : ""}`;
}

export function corporateHref(locale: Locale, kind: CorporateRouteKind): string {
  const segment = localizedSegments[locale];
  switch (kind) {
    case "home":
      return href(locale);
    case "about":
      return href(locale, segment.about);
    case "services":
      return href(locale, segment.services);
    case "contact":
      return href(locale, segment.contact);
    case "privacy":
      return href(locale, segment.privacy);
    case "admin":
      return href(locale, segment.admin);
  }
}

export function careerHubHref(locale: Locale): string {
  return href(locale, localizedSegments[locale].careerHub);
}

export function regionalHref(locale: Locale, branch: BranchSlug): string {
  return href(locale, branch);
}

export function regionalJobsHref(locale: Locale, branch: BranchSlug): string {
  return href(locale, [branch, localizedSegments[locale].jobs]);
}

export function jobHref(locale: Locale, branch: BranchSlug, slug: string): string {
  return href(locale, [branch, localizedSegments[locale].jobs, slug]);
}

export function applyHref(locale: Locale, branch: BranchSlug, slug: string): string {
  return href(locale, [branch, localizedSegments[locale].apply, slug]);
}

export function successHref(locale: Locale, branch: BranchSlug, slug: string): string {
  return href(locale, [
    branch,
    localizedSegments[locale].apply,
    slug,
    localizedSegments[locale].success,
  ]);
}

export function routeHref(locale: Locale, route: RouteInfo): string {
  switch (route.kind) {
    case "home":
    case "about":
    case "services":
    case "contact":
    case "privacy":
    case "admin":
      return corporateHref(locale, route.kind);
    case "careerHub":
      return careerHubHref(locale);
    case "regional":
      return regionalHref(locale, route.branch);
    case "regionalJobs":
      return regionalJobsHref(locale, route.branch);
    case "job":
      return jobHref(locale, route.branch, route.slug);
    case "apply":
      return applyHref(locale, route.branch, route.slug);
    case "success":
      return successHref(locale, route.branch, route.slug);
  }
}

function vacancyBelongsToBranch(branch: BranchSlug, slug: string): boolean {
  return getVacancy(slug)?.branch === branch;
}

export function resolveRoute(locale: Locale, path: readonly string[]): RouteInfo | null {
  const segment = localizedSegments[locale];

  if (path.length === 0) return {kind: "home"};

  if (path.length === 1) {
    const value = path[0];
    if (value === segment.about) return {kind: "about"};
    if (value === segment.services) return {kind: "services"};
    if (value === segment.contact) return {kind: "contact"};
    if (value === segment.privacy) return {kind: "privacy"};
    if (value === segment.admin) return {kind: "admin"};
    if (value === segment.careerHub) return {kind: "careerHub"};
    if (isBranchSlug(value)) return {kind: "regional", branch: value};
    return null;
  }

  const branch = path[0];
  if (!isBranchSlug(branch)) return null;

  if (path.length === 2 && path[1] === segment.jobs) {
    return {kind: "regionalJobs", branch};
  }

  const slug = path[2];
  if (!slug || !vacancyBelongsToBranch(branch, slug)) return null;

  if (path.length === 3 && path[1] === segment.jobs) {
    return {kind: "job", branch, slug};
  }

  if (path.length === 3 && path[1] === segment.apply) {
    return {kind: "apply", branch, slug};
  }

  if (
    path.length === 4 &&
    path[1] === segment.apply &&
    path[3] === segment.success
  ) {
    return {kind: "success", branch, slug};
  }

  return null;
}
