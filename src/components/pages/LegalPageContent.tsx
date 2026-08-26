import Link from "next/link";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { localizeHref } from "@/lib/i18n/config";
import type { Locale } from "@/types/content";
import { SectionTitle } from "@/components/ui/SectionTitle";

const privacy = {
  "zh-TW": [
    ["個人資訊的收集", "本網站可能在您使用服務時收集必要的個人資訊。收集的資訊將僅用於提供服務及改善使用體驗。"],
    ["個人資訊的使用", "我們收集的個人資訊將用於以下目的：回覆您的諮詢、提供服務相關資訊、改善服務品質。未經您的同意，不會向第三方提供您的個人資訊。"],
    ["Cookie 的使用", "本網站可能使用 Cookie 來改善使用體驗。Cookie 不包含可識別個人身份的資訊，您可以在瀏覽器設定中停用 Cookie。"],
    ["隱私權政策的變更", "本隱私權政策可能會不時更新。變更後的政策將在本頁面公布，自公布之日起生效。"],
  ],
  en: [
    ["Collection of Personal Information", "This website may collect personal information necessary to provide services and improve your experience."],
    ["Use of Personal Information", "We use collected information to answer inquiries, provide service information, and improve service quality. We do not share it with third parties without your consent."],
    ["Use of Cookies", "This website may use cookies to improve your experience. Cookies do not contain personally identifying information, and you can disable them in your browser settings."],
    ["Changes to This Policy", "We may update this Privacy Policy from time to time. Changes take effect when published on this page."],
  ],
} as const;

export function LegalPageContent({ locale, type }: { locale: Locale; type: "privacy" | "terms" }) {
  const dictionary = getDictionary(locale);
  const page = type === "privacy" ? dictionary.privacy_page : dictionary.terms_page;
  const sections = type === "privacy"
    ? privacy[locale]
    : Array.from({ length: 6 }, (_, index) => [dictionary.terms_page[`section${index + 1}_title` as keyof typeof dictionary.terms_page], dictionary.terms_page[`section${index + 1}_text` as keyof typeof dictionary.terms_page]] as const);
  const contactTitle = type === "terms" ? dictionary.terms_page.section7_title : locale === "en" ? "Contact" : "聯絡方式";
  const contactText = type === "terms"
    ? locale === "en" ? "If you have any questions regarding these Terms, please reach us via our contact page." : "如對本條款有任何疑問，請透過聯絡我們頁面與我們聯繫。"
    : locale === "en" ? "If you have questions about this Privacy Policy, please contact us." : "如果您對本隱私權政策有任何疑問，請透過聯絡我們頁面與我們聯繫。";
  return (
    <section className="p-privacy"><div className="p-privacy__container"><SectionTitle title={page.title} caption={page.cap} as="h1" /><div className="p-privacy__body">
      {sections.map(([title, text]) => <section className="p-privacy__section js-reveal" key={title}><h2 className="p-privacy__section-title">{title}</h2><p className="p-privacy__text">{text}</p></section>)}
      <section className="p-privacy__section js-reveal"><h2 className="p-privacy__section-title">{contactTitle}</h2><p className="p-privacy__text">{contactText} <Link href={localizeHref("/contact", locale)} style={{ textDecoration: "underline" }}>{dictionary.nav.contact}</Link></p></section>
    </div></div></section>
  );
}
