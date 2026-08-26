import { LegalPageContent } from "@/components/pages/LegalPageContent";
import { getPageMetadata } from "@/lib/seo/pages";
export const metadata = getPageMetadata("zh-TW", "/terms");
export default function TermsPage() { return <LegalPageContent locale="zh-TW" type="terms" />; }
