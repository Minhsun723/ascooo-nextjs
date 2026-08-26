import { AboutPageContent } from "@/components/pages/AboutPageContent";
import { getPageMetadata } from "@/lib/seo/pages";
export const metadata = getPageMetadata("en", "/about");
export default function EnglishAboutPage() { return <AboutPageContent locale="en" />; }
