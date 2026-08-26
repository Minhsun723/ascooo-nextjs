import { localizeHref } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/types/content";
import { MoreButton } from "@/components/ui/MoreButton";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function CompanySection({ locale, copy }: { locale: Locale; copy: Dictionary["company"] }) {
  const rows = [
    [copy.name_label, copy.name_value], [copy.capital_label, copy.capital_value],
    [copy.representatives_label, copy.representative1_name], [copy.location_label, copy.location_value],
    [copy.business_label, copy.business_value],
  ];
  return (
    <section className="p-company" id="company"><div className="p-company__container">
      <SectionTitle title={copy.title} />
      <div className="p-company__inner">{rows.map(([label, value]) => <div className="c-data-row js-reveal" key={label}><div className="c-data-row__header">{label}</div><div className="c-data-row__content">{value}</div></div>)}</div>
      <div className="p-company__more"><MoreButton href={localizeHref("/company", locale)} label={copy.more} /></div>
    </div></section>
  );
}
