import Link from "next/link";
import type { NewsItem } from "@/types/content";

export function NewsArticleContent({ item }: { item: NewsItem }) {
  return (
    <article className="p-news-article">
      <div className="p-news-article__container">
        <header className="p-news-article__header js-reveal">
          <div className="p-news-article__date">
            <span>{item.date}</span>
          </div>
          <h1 className="p-news-article__title">{item.title}</h1>
        </header>
        <div className="p-news-article__content js-reveal">
          {item.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <br />
          <Link className="p-news-article__back" href="/news">
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            返回列表
          </Link>
        </div>
      </div>
    </article>
  );
}
