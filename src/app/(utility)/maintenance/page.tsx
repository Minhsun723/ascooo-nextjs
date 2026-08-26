import Link from "next/link";
import Script from "next/script";

export default function MaintenancePage() {
  return (
    <main className="maintenance">
      <header className="maintenance__header"><Link className="maintenance__brand" href="/" aria-label="Ascooo 首頁"><img src="/assets/img/logo_dark.svg" alt="Ascooo" /></Link><p className="maintenance__status"><span className="maintenance__status-dot" aria-hidden="true" />Scheduled maintenance</p></header>
      <section className="maintenance__content" aria-labelledby="maintenance-title"><div className="maintenance__copy"><p className="maintenance__eyebrow">WE&apos;LL BE RIGHT BACK</p><h1 id="maintenance-title">網站維護中</h1><p className="maintenance__description">我們正在進行系統維護，讓下一次見面更加順暢。<br />請稍後再回來看看。</p></div><div className="maintenance__visual" aria-hidden="true"><div className="maintenance__halo" /><dotlottie-wc class="maintenance__animation" src="https://lottie.host/a73e7448-6dce-49cb-9ce9-cd13e0154bd0/e3eBmoTraF.lottie" autoplay loop /></div></section>
      <footer className="maintenance__footer"><p>© Ascooo Inc.</p></footer>
      <Script type="module" src="https://unpkg.com/@lottiefiles/dotlottie-wc@0.9.4/dist/dotlottie-wc.js" strategy="afterInteractive" />
    </main>
  );
}
