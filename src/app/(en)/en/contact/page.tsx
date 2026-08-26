import { ContactPageContent } from "@/components/pages/ContactPageContent";
import { getPageMetadata } from "@/lib/seo/pages";
export const metadata = getPageMetadata("en", "/contact");
export default function EnglishContactPage() { return <ContactPageContent locale="en" />; }
