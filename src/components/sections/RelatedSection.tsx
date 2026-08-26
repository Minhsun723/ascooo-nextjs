import Link from "next/link";
import type { Locale } from "@/types/content";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function RelatedSection({ locale }: { locale: Locale }) {
  const language = locale === "en" ? "en" : "zh";
  const items = [
    { href: "https://logo.ascooo.com", image: `/assets/img/related/${language}/logotype_${language}.png`, label: locale === "en" ? "Logotype finder" : "標準字尋找工具" },
    { href: "https://resonance.ascooo.com", image: "/assets/img/related/resonance.png", label: "RESONANCE" },
    { href: "http://23.145.28.161:5174/", image: "/assets/img/related/impactcopilot.png", label: "Impact Copilot" },
    { href: locale === "en" ? "/en" : "/", image: `/assets/img/related/${language}/nolink_${language}.png`, label: locale === "en" ? "Nothing here" : "這裡沒東西" },
  ];
  return (
    <section className="p-related" aria-labelledby="related-title"><div className="p-related__container">
      <SectionTitle title="Links" caption={locale === "en" ? "Related Websites" : "相關網站"} id="related-title" />
      <ul className="p-related__grid">{items.map((item) => <li className="p-related__item js-reveal" key={item.label}>{item.href.startsWith("http") ? <a href={item.href} className="p-related-card" aria-label={item.label} target="_blank" rel="noopener noreferrer"><img src={item.image} alt={item.label} loading="lazy" /></a> : <Link href={item.href} className="p-related-card" aria-label={item.label}><img src={item.image} alt={item.label} loading="lazy" /></Link>}</li>)}</ul>
    </div></section>
  );
}
