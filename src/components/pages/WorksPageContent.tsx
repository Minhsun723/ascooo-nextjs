import { workCards } from "@/lib/constants/content";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/types/content";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { WorkCard } from "@/components/ui/WorkCard";

export function WorksPageContent({ locale }: { locale: Locale }) {
  const copy = getDictionary(locale).works_page;
  return <section className="p-works"><div className="p-works__container"><SectionTitle title={copy.title} caption={copy.cap} as="h1" /><div className="p-works__grid">{workCards.map((work) => <WorkCard work={work} key={work.slug} />)}</div></div></section>;
}
