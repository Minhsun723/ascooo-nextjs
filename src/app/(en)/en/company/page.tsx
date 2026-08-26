import { CompanyPageContent } from "@/components/pages/CompanyPageContent";
import { getPageMetadata } from "@/lib/seo/pages";
export const metadata = getPageMetadata("en", "/company");
export default function EnglishCompanyPage() { return <CompanyPageContent locale="en" />; }
