import { notFound } from "next/navigation";
import { WorkArticleContent } from "@/components/pages/WorkArticleContent";
import { works } from "@/lib/constants/content";
import { createPageMetadata } from "@/lib/seo/metadata";

export function generateStaticParams() { return works.map((work) => ({ slug: work.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const work = works.find((item) => item.slug === slug);
  if (!work) return {};
  return createPageMetadata({ title: `${work.title} | Works — Ascooo`, description: work.description.join(" "), pathname: `/works/${slug}`, locale: "zh-TW", shared: true });
}
export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const work = works.find((item) => item.slug === slug);
  if (!work) notFound();
  return <WorkArticleContent work={work} />;
}
