import type { Locale } from "@/types/content";

export const defaultLocale: Locale = "zh-TW";

export function localizeHref(href: string, locale: Locale) {
  if (!href.startsWith("/") || locale === defaultLocale) return href;
  if (/^\/(works|news)\/[^/]+/.test(href)) return href;
  return href === "/" ? "/en" : `/en${href}`;
}

export function getLanguageAlternates(pathname: string) {
  const cleanPath = pathname === "/" ? "" : pathname;
  return {
    "zh-TW": `https://ascooo.com${cleanPath || "/"}`,
    en: `https://ascooo.com/en${cleanPath}`,
    "x-default": `https://ascooo.com${cleanPath || "/"}`,
  };
}
