import { NewsPageContent } from "@/components/pages/NewsPageContent";
import { getPageMetadata } from "@/lib/seo/pages";
export const metadata = getPageMetadata("zh-TW", "/news");
export default function NewsPage() { return <NewsPageContent locale="zh-TW" />; }
