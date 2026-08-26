import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/types/content";
import { HeroSection } from "@/components/sections/HeroSection";
import { LineupSection } from "@/components/sections/LineupSection";
import { MarqueeSection } from "@/components/sections/MarqueeSection";
import { CompanySection } from "@/components/sections/CompanySection";
import { NewsSection } from "@/components/sections/NewsSection";
import { RelatedSection } from "@/components/sections/RelatedSection";

export function HomePageContent({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);
  return <><HeroSection /><LineupSection locale={locale} copy={dictionary.lineup} /><MarqueeSection /><CompanySection locale={locale} copy={dictionary.company} /><NewsSection locale={locale} copy={dictionary.news} /><RelatedSection locale={locale} /></>;
}
