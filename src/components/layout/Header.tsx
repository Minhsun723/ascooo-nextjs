"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { localizeHref } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/types/content";

interface HeaderProps {
  locale: Locale;
  navigation: Dictionary["nav"];
}

export function Header({ locale, navigation }: HeaderProps) {
  const pathname = usePathname();
  const languageRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useLayoutEffect(() => {
    document.body.toggleAttribute("data-menu-open", isMenuOpen);
    return () => document.body.removeAttribute("data-menu-open");
  }, [isMenuOpen]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!languageRef.current?.contains(event.target as Node)) setIsLanguageOpen(false);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  const sharedDetail = /^\/(works|news)\/[^/]+/.test(pathname);
  const basePath = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  const zhHref = sharedDetail ? "/" : basePath;
  const enHref = sharedDetail ? "/en" : `/en${basePath === "/" ? "" : basePath}`;
  const links = [
    ["top", "/"], ["works", "/works"], ["about", "/about"],
    ["company", "/company"], ["status", "/status"], ["news", "/news"],
  ] as const;
  const menuLinks = [...links, ["contact", "/contact"] as const];

  return (
    <>
      <header className={`l-header${isScrolled ? " is-scrolled" : ""}`} id="header">
        <div className="l-header__brand">
          <Link href={localizeHref("/", locale)} className="l-header__brand-link" aria-label="Ascooo Home">
            <img src="/assets/img/logo_dark.svg" alt="Ascooo" />
          </Link>
        </div>
        <nav className="l-header__nav is-pc" aria-label="Primary navigation">
          <ul className="l-header__nav-list">
            {links.map(([key, href]) => (
              <li key={key}><Link className="l-header__nav-link" href={key === "works" ? (pathname === "/" || pathname === "/en" ? "#lineup" : localizeHref("/#lineup", locale)) : localizeHref(href, locale)}>{navigation[key]}</Link></li>
            ))}
          </ul>
        </nav>
        <div className="l-header__actions">
          <div className="l-lang l-lang--dropdown" ref={languageRef}>
            <button className="l-lang__toggle" type="button" aria-label="Language" aria-expanded={isLanguageOpen} onClick={() => setIsLanguageOpen((open) => !open)}>
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z"/></svg>
            </button>
            <div className={`l-lang__menu${isLanguageOpen ? " is-active" : ""}`}>
              <Link className={`l-lang__btn${locale === "zh-TW" ? " is-active" : ""}`} href={zhHref}>繁體中文</Link>
              <Link className={`l-lang__btn${locale === "en" ? " is-active" : ""}`} href={enHref}>English</Link>
            </div>
          </div>
        </div>
      </header>

      <nav className={`l-nav${isMenuOpen ? " is-open" : ""}`} aria-label="Menu" data-lenis-prevent>
        <div className="l-nav__bg" />
        <div className="l-nav__container">
          <div className="l-nav__brand"><Link href={localizeHref("/", locale)} className="l-nav__brand-link" onClick={() => setIsMenuOpen(false)}><img src="/assets/img/logo_light.svg" alt="Ascooo" /></Link></div>
          <div className="l-nav__content">
            <ul className="l-nav__list">
              {menuLinks.map(([key, href]) => (
                <li className="l-nav__list-item" key={key}>
                  <Link className="l-nav__link" href={localizeHref(href, locale)} onClick={() => setIsMenuOpen(false)}><span className="l-nav__link-text">{navigation[key]}</span></Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      <button className="l-menu" type="button" aria-label={isMenuOpen ? "Close menu" : "Open menu"} aria-expanded={isMenuOpen} onClick={() => setIsMenuOpen((open) => !open)}>
        <span className="l-menu__content">
          <span className="l-menu__line --open"><span className="l-menu__line-bar">MENU</span><span className="l-menu__line-bar" /></span>
          <span className="l-menu__line --close"><span className="l-menu__line-bar" /><span className="l-menu__line-bar" /></span>
        </span>
      </button>
    </>
  );
}
