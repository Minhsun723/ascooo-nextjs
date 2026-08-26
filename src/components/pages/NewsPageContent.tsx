import { newsItems } from "@/lib/constants/content";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/types/content";
import { NewsListItem } from "@/components/ui/NewsListItem";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function NewsPageContent({ locale }: { locale: Locale }) {
  const copy = getDictionary(locale).news_page;
  return <section className="p-news-page"><div className="p-news-page__container"><SectionTitle title={copy.title} caption={copy.cap} as="h1" /><div className="p-news-page__list"><ul>{newsItems.map((item) => <li key={item.slug}><NewsListItem item={item} /></li>)}</ul></div></div></section>;
}
