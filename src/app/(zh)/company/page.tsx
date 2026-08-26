import { CompanyPageContent } from "@/components/pages/CompanyPageContent";
import { getPageMetadata } from "@/lib/seo/pages";
export const metadata = getPageMetadata("zh-TW", "/company");
export default function CompanyPage() { return <CompanyPageContent locale="zh-TW" />; }
