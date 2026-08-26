import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/types/content";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function CompanyPageContent({ locale }: { locale: Locale }) {
  const { company, company_page: page } = getDictionary(locale);
  const rows = [
    [company.name_label, company.name_value], [company.capital_label, company.capital_value],
    [company.representatives_label, company.representative1_name], [company.location_label, company.location_value],
    [company.business_label, company.business_value], [company.phone_label, company.phone_value], [company.fax_label, company.fax_value],
  ];
  return (
    <section className="p-company-page"><div className="p-company-page__container">
      <SectionTitle title={page.title} caption={page.cap} as="h1" />
      <div className="p-company-page__hero js-reveal-scale"><div className="p-company-page__hero-bg" aria-hidden="true">Ascooo Inc.</div><h2 className="p-company-page__hero-text">Ascooo Inc.</h2></div>
      <div className="p-company-page__body"><section className="p-company-page__section js-reveal"><h3 className="p-company-page__section-title">{page.cap}</h3>
        {rows.map(([label, value]) => <div className="c-data-row" key={label}><div className="c-data-row__header">{label}</div><div className="c-data-row__content">{value}</div></div>)}
        <div className="c-data-row"><div className="c-data-row__header">{company.map_label}</div><div className="c-data-row__content"><span>{company.map_value}</span><div className="p-company-page__map"><iframe title={company.map_value} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.7042578502577!2d121.5647572!3d25.0441097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442abb6da80a7ad%3A0xacc4d11dc963103c!2sTaipei%20101!5e0!3m2!1sen!2stw!4v1689150000000!5m2!1sen!2stw" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div></div></div>
      </section></div>
    </div></section>
  );
}
