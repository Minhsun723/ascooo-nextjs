import { StatusPageContent } from "@/components/pages/StatusPageContent";
import { getPageMetadata } from "@/lib/seo/pages";
export const metadata = getPageMetadata("en", "/status");
export default function EnglishStatusPage() { return <StatusPageContent locale="en" />; }
