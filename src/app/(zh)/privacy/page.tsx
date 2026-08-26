import { LegalPageContent } from "@/components/pages/LegalPageContent";
import { getPageMetadata } from "@/lib/seo/pages";
export const metadata = getPageMetadata("zh-TW", "/privacy");
export default function PrivacyPage() { return <LegalPageContent locale="zh-TW" type="privacy" />; }
