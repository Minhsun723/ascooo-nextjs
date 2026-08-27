import Link from "next/link";
import { localizeHref } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/types/content";
import { SocialLinks } from "./SocialLinks";

export function Footer({ locale, copy }: { locale: Locale; copy: Dictionary["footer"] }) {
  return (
    <footer className="l-footer">
      <div className="l-footer__container">
        <div className="l-footer__support"><div className="l-footer__support-inner">
          <ul className="l-footer__support-list --legal">
            <li><Link href={localizeHref("/privacy", locale)} className="l-footer__support-link">{copy.privacy}</Link></li>
            <li><Link href={localizeHref("/terms", locale)} className="l-footer__support-link">{copy.terms}</Link></li>
          </ul>
          <ul className="l-footer__support-list --nav">
            <li><Link href={localizeHref("/contact", locale)} className="l-footer__support-link">{copy.contact}</Link></li>
            <li><Link href={localizeHref("/about", locale)} className="l-footer__support-link">{copy.about}</Link></li>
          </ul>
        </div></div>
        <div className="l-footer__bottom">
          <div className="l-footer__legal"><p className="l-footer__legal-text">{copy.copyright}</p></div>
          <div className="l-footer__logo"><Link href={localizeHref("/", locale)} aria-label="Ascooo Home"><img src="/assets/img/logo_dark.svg" alt="Ascooo" /></Link></div>
          <SocialLinks
            className="l-footer__sns"
            ariaLabel={locale === "zh-TW" ? "社群媒體連結" : "Social links"}
          />
        </div>
      </div>
    </footer>
  );
}
