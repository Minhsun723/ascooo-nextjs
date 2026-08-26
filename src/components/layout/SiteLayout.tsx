import type { Locale } from "@/types/content";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { OpeningTransition } from "./OpeningTransition";
import { PageMotion } from "./PageMotion";
import { PageTopButton } from "./PageTopButton";
import { SmoothScroll } from "./SmoothScroll";

export function SiteLayout({ children, locale }: { children: React.ReactNode; locale: Locale }) {
  const dictionary = getDictionary(locale);
  return (
    <div className="l-wrap">
      <OpeningTransition />
      <div className="l-wrap__container">
        <Header locale={locale} navigation={dictionary.nav} />
        <PageMotion>{children}</PageMotion>
        <Footer locale={locale} copy={dictionary.footer} />
      </div>
      <PageTopButton />
      <SmoothScroll />
    </div>
  );
}
