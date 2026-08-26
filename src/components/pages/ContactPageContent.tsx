import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/types/content";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function ContactPageContent({ locale }: { locale: Locale }) {
  const copy = getDictionary(locale).contact_page;
  const fields = [
    { id: "contact-name", name: "name", label: copy.name_label, type: "text" },
    { id: "contact-email", name: "email", label: copy.email_label, type: "email" },
    { id: "contact-subject", name: "subject", label: copy.subject_label, type: "text" },
  ];
  return (
    <section className="p-contact"><div className="p-contact__container">
      <SectionTitle title={copy.title} caption={copy.cap} as="h1" />
      <div className="p-contact__form js-reveal"><form id="contact-form">
        {fields.map((field) => <div className="c-form-group" key={field.id}><label className="c-form-label" htmlFor={field.id}>{field.label}</label><input className="c-form-input" type={field.type} id={field.id} name={field.name} required /></div>)}
        <div className="c-form-group"><label className="c-form-label" htmlFor="contact-message">{copy.message_label}</label><textarea className="c-form-textarea" id="contact-message" name="message" required /></div>
        <button className="c-form-submit" type="submit">{copy.submit}</button>
      </form></div>
    </div></section>
  );
}
