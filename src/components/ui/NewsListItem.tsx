import Link from "next/link";
import type { NewsItem } from "@/types/content";

export function NewsListItem({ item, href = `/news/${item.slug}` }: { item: NewsItem; href?: string }) {
  const [year, month, day] = item.date.split(".");
  return (
    <Link href={href} className="c-news-item js-reveal">
      <div className="c-news-item__date">
        <div className="c-news-item__date-year">{year}</div>
        <div className="c-news-item__date-day">{month}.{day}</div>
      </div>
      <div className="c-news-item__title">{item.title}</div>
    </Link>
  );
}
