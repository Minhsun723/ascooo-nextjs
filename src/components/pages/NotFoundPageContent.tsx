import Link from "next/link";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/types/content";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function NotFoundPageContent({ locale }: { locale: Locale }) {
  const copy = getDictionary(locale).not_found;
  return (
    <section className="p-404" aria-labelledby="not-found-title">
      <div className="p-404__container">
        <SectionTitle title={copy.title} caption={copy.cap} as="h1" id="not-found-title" />
        <div className="p-404__actions">
          <Link className="c-form-submit p-404__button" href={locale === "en" ? "/en" : "/"}>
            {copy.btn}
          </Link>
        </div>
      </div>
    </section>
  );
}
