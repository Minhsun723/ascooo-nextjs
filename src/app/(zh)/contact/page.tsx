import { ContactPageContent } from "@/components/pages/ContactPageContent";
import { getPageMetadata } from "@/lib/seo/pages";
export const metadata = getPageMetadata("zh-TW", "/contact");
export default function ContactPage() { return <ContactPageContent locale="zh-TW" />; }
