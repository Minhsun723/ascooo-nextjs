import type { MetadataRoute } from "next";
import { newsItems, works } from "@/lib/constants/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://ascooo.com";
  const updated = new Date("2026-07-18");
  const pages = ["", "/about", "/company", "/contact", "/works", "/news", "/status", "/privacy", "/terms"];
  return [
    ...pages.map((path) => ({ url: `${base}${path || "/"}`, lastModified: updated, changeFrequency: path === "" ? "weekly" as const : "monthly" as const, priority: path === "" ? 1 : 0.8 })),
    ...pages.map((path) => ({ url: `${base}/en${path}`, lastModified: updated, changeFrequency: "monthly" as const, priority: path === "" ? 1 : 0.8 })),
    ...works.map((work) => ({ url: `${base}/works/${work.slug}`, lastModified: updated, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...newsItems.map((item) => ({ url: `${base}/news/${item.slug}`, lastModified: updated, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
