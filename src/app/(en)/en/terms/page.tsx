import { LegalPageContent } from "@/components/pages/LegalPageContent";
import { getPageMetadata } from "@/lib/seo/pages";
export const metadata = getPageMetadata("en", "/terms");
export default function EnglishTermsPage() { return <LegalPageContent locale="en" type="terms" />; }
