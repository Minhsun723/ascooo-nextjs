import { HomePageContent } from "@/components/pages/HomePageContent";
import { getPageMetadata } from "@/lib/seo/pages";

export const metadata = getPageMetadata("zh-TW", "/");
export default function HomePage() { return <HomePageContent locale="zh-TW" />; }
