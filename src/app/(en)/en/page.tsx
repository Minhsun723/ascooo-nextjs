import { HomePageContent } from "@/components/pages/HomePageContent";
import { getPageMetadata } from "@/lib/seo/pages";
export const metadata = getPageMetadata("en", "/");
export default function EnglishHomePage() { return <HomePageContent locale="en" />; }
