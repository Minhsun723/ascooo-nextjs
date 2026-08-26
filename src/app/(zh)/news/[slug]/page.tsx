import { notFound } from "next/navigation";
import { NewsArticleContent } from "@/components/pages/NewsArticleContent";
import { newsItems } from "@/lib/constants/content";
import { createPageMetadata } from "@/lib/seo/metadata";

export function generateStaticParams() { return newsItems.map((item) => ({ slug: item.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const item = newsItems.find((entry) => entry.slug === slug);
  if (!item) return {};
  return createPageMetadata({ title: `${item.title} | News — Ascooo`, description: item.paragraphs.join(" "), pathname: `/news/${slug}`, locale: "zh-TW", shared: true });
}
export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const item = newsItems.find((entry) => entry.slug === slug);
  if (!item) notFound();
  return <NewsArticleContent item={item} />;
}
