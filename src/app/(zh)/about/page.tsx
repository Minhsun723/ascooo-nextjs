import { AboutPageContent } from "@/components/pages/AboutPageContent";
import { getPageMetadata } from "@/lib/seo/pages";
export const metadata = getPageMetadata("zh-TW", "/about");
export default function AboutPage() { return <AboutPageContent locale="zh-TW" />; }
