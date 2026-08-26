import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/types/content";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StatusDashboard } from "@/components/status/StatusDashboard";

export function StatusPageContent({ locale }: { locale: Locale }) {
  const copy = getDictionary(locale).status_page;
  return <section className="p-status"><div className="p-status__container"><SectionTitle title={copy.title} caption={copy.cap} as="h1" /><StatusDashboard locale={locale} /></div></section>;
}
