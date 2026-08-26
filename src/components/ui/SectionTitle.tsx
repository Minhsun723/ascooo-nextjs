interface SectionTitleProps {
  title: string;
  caption?: string;
  as?: "h1" | "h2";
  id?: string;
}

export function SectionTitle({ title, caption, as: Heading = "h2", id }: SectionTitleProps) {
  return (
    <div className="c-section-title">
      <span className="c-section-title__bg" aria-hidden="true">{title}</span>
      <Heading className="c-section-title__text" id={id}>{title}</Heading>
      {caption ? <p className="c-section-title__cap">{caption}</p> : null}
    </div>
  );
}
