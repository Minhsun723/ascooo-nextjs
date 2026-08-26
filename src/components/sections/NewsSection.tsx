import { newsItems } from "@/lib/constants/content";
import { localizeHref } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/types/content";
import { MoreButton } from "@/components/ui/MoreButton";
import { NewsListItem } from "@/components/ui/NewsListItem";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function NewsSection({ locale, copy }: { locale: Locale; copy: Dictionary["news"] }) {
  return (
    <section className="p-news" id="news"><div className="p-news__container">
      <SectionTitle title={copy.title} caption={copy.cap} />
      <div className="p-news__inner"><ul>{newsItems.slice(0, 2).map((item) => <li key={item.slug}><NewsListItem item={item} /></li>)}</ul>
        <div className="p-news__more"><MoreButton href={localizeHref("/news", locale)} label={copy.more} /></div>
      </div>
    </div></section>
  );
}
