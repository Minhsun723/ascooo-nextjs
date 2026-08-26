"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { localizeHref } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/types/content";
import { StaggeredMenu, type StaggeredMenuItem } from "./StaggeredMenu";

interface HeaderProps {
  locale: Locale;
  navigation: Dictionary["nav"];
}

export function Header({ locale, navigation }: HeaderProps) {
  const pathname = usePathname();
  const languageRef = useRef<HTMLDivElement>(null);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
  const mobileMenuItems: StaggeredMenuItem[] = menuLinks.map(([key, href]) => ({
    label: navigation[key],
    ariaLabel: navigation[key],
    href: localizeHref(href, locale),
  }));

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

      <StaggeredMenu
        locale={locale}
        homeHref={localizeHref("/", locale)}
        items={mobileMenuItems}
      />
    </>
  );
}
