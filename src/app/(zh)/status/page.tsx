import { StatusPageContent } from "@/components/pages/StatusPageContent";
import { getPageMetadata } from "@/lib/seo/pages";
export const metadata = getPageMetadata("zh-TW", "/status");
export default function StatusPage() { return <StatusPageContent locale="zh-TW" />; }
