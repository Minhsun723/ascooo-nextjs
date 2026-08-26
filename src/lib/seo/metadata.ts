import type { Metadata } from "next";
import { getLanguageAlternates } from "@/lib/i18n/config";
import type { Locale } from "@/types/content";

const siteUrl = "https://ascooo.com";

export function createPageMetadata({
  title,
  description,
  pathname,
  locale,
  shared = false,
}: {
  title: string;
  description: string;
  pathname: string;
  locale: Locale;
  shared?: boolean;
}): Metadata {
  const localizedPath = locale === "en" && !shared
    ? `/en${pathname === "/" ? "" : pathname}`
    : pathname;
  const canonical = new URL(localizedPath || "/", siteUrl).toString();

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical,
      languages: shared ? undefined : getLanguageAlternates(pathname),
    },
    openGraph: {
      type: "website",
      siteName: "Ascooo",
      title,
      description,
      url: canonical,
      images: [{ url: "/assets/img/og-image.jpg", width: 1200, height: 630, alt: "Ascooo" }],
      locale: locale === "en" ? "en_US" : "zh_TW",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/assets/img/og-image.jpg"],
    },
  };
}
