import Link from "next/link";
import type { WorkItem } from "@/types/content";

export function WorkCard({ work }: { work: WorkItem }) {
  return (
    <Link href={`/works/${work.slug}`} className="c-card js-reveal">
      <div className="c-card__img">
        <img src={work.image.replace("1200x800", "400x530")} alt={work.title} loading="lazy" />
      </div>
      <div className="c-card__info">
        <div className="c-card__name">{work.title}</div>
        <div className="c-card__release">{work.release}</div>
      </div>
    </Link>
  );
}
