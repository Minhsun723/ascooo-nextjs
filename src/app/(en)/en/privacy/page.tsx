import { LegalPageContent } from "@/components/pages/LegalPageContent";
import { getPageMetadata } from "@/lib/seo/pages";
export const metadata = getPageMetadata("en", "/privacy");
export default function EnglishPrivacyPage() { return <LegalPageContent locale="en" type="privacy" />; }
