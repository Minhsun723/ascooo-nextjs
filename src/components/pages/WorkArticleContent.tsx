import Link from "next/link";
import type { WorkItem } from "@/types/content";

export function WorkArticleContent({ work }: { work: WorkItem }) {
  return (
    <article className="p-works-article">
      <div className="p-works-article__container">
        <header className="p-works-article__header js-reveal">
          <div className="p-works-article__meta">
            <span>{work.release}</span>
          </div>
          <h1 className="p-works-article__title">{work.title}</h1>
        </header>
        <div className="p-works-article__img js-reveal">
          <img src={work.image} alt={work.title} loading="lazy" style={{ objectFit: "cover" }} />
        </div>
        <div className="p-works-article__content js-reveal">
          {work.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <br />
          {work.externalUrl ? (
            <div className="p-works-article__links">
              <a className="c-btn" href={work.externalUrl} target="_blank" rel="noopener noreferrer">
                造訪網站 ↗
              </a>
            </div>
          ) : null}
          <Link className="p-works-article__back" href="/works">
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
