import { getDictionary } from "@/lib/i18n/get-dictionary";
import { localizeHref } from "@/lib/i18n/config";
import type { Locale } from "@/types/content";
import { MoreButton } from "@/components/ui/MoreButton";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function AboutPageContent({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);
  const aboutText = dictionary.about.text.replace(/<\/?strong>/g, "").replace(/^Ascooo/, "");
  const headings = locale === "en" ? ["Our Story", "Our Purpose", "Company Profile"] : ["我們的故事", "我們的理念", "公司資訊"];
  return (
    <section className="p-about-page"><div className="p-about-page__container">
      <SectionTitle title={dictionary.about_page.title} caption={dictionary.about_page.cap} as="h1" />
      <div className="p-about-page__hero js-reveal-scale"><div className="p-about-page__hero-bg" aria-hidden="true">Animation × Creation<br />= Ascooo</div><h2 className="p-about-page__hero-text">Animation × Creation<br />= Ascooo</h2></div>
      <div className="p-about-page__body">
        <section className="p-about-page__section js-reveal"><h3 className="p-about-page__section-title">{headings[0]}</h3><p className="p-about-page__text"><strong>Ascooo</strong>{aboutText}</p></section>
        <section className="p-about-page__section js-reveal"><h3 className="p-about-page__section-title">{headings[1]}</h3><p className="p-about-page__text">{dictionary.purpose.text1}</p><p className="p-about-page__text">{dictionary.purpose.text2}</p></section>
        <section className="p-about-page__section js-reveal"><h3 className="p-about-page__section-title">{headings[2]}</h3>
          <div className="c-data-row"><div className="c-data-row__header">{dictionary.company.name_label}</div><div className="c-data-row__content">{dictionary.company.name_value}</div></div>
          <div className="c-data-row"><div className="c-data-row__header">{dictionary.company.business_label}</div><div className="c-data-row__content">{dictionary.company.business_value}</div></div>
          <div className="p-about-page__more"><MoreButton href={localizeHref("/company", locale)} label={dictionary.company.more} /></div>
        </section>
      </div>
    </div></section>
  );
}
