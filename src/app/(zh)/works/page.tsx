import { WorksPageContent } from "@/components/pages/WorksPageContent";
import { getPageMetadata } from "@/lib/seo/pages";
export const metadata = getPageMetadata("zh-TW", "/works");
export default function WorksPage() { return <WorksPageContent locale="zh-TW" />; }
