import { WorksPageContent } from "@/components/pages/WorksPageContent";
import { getPageMetadata } from "@/lib/seo/pages";
export const metadata = getPageMetadata("en", "/works");
export default function EnglishWorksPage() { return <WorksPageContent locale="en" />; }
