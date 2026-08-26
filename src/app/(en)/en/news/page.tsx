import { NewsPageContent } from "@/components/pages/NewsPageContent";
import { getPageMetadata } from "@/lib/seo/pages";
export const metadata = getPageMetadata("en", "/news");
export default function EnglishNewsPage() { return <NewsPageContent locale="en" />; }
