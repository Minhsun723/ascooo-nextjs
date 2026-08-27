"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { markSkipOpeningTransitionForNextNavigation } from "@/lib/navigation-transition";
import type { Locale } from "@/types/content";
import { SocialLinks } from "./SocialLinks";

export interface StaggeredMenuItem {
  label: string;
  ariaLabel: string;
  href: string;
}

interface StaggeredMenuProps {
  locale: Locale;
  homeHref: string;
  items: StaggeredMenuItem[];
}

const LAYER_COLORS = ["var(--color-accent)", "var(--color-accent-alt)"];

export function StaggeredMenu({ locale, homeHref, items }: StaggeredMenuProps) {
  const pathname = usePathname();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef(false);
  const previousPathRef = useRef(pathname);
  const [isOpen, setIsOpen] = useState(false);

  const menuText = locale === "zh-TW" ? "選單" : "Menu";
  const closeText = locale === "zh-TW" ? "關閉" : "Close";

  const setMenuOpen = useCallback((open: boolean) => {
    openRef.current = open;
    setIsOpen(open);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsOpen((current) => {
      const next = !current;
      openRef.current = next;
      return next;
    });
  }, []);

  useEffect(() => {
    document.body.toggleAttribute("data-menu-open", isOpen);
    return () => document.body.removeAttribute("data-menu-open");
  }, [isOpen]);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 1024px)");
    const handleViewportChange = (event: MediaQueryListEvent) => {
      if (!event.matches) setMenuOpen(false);
    };

    mobileQuery.addEventListener("change", handleViewportChange);
    return () => mobileQuery.removeEventListener("change", handleViewportChange);
  }, [setMenuOpen]);

  useEffect(() => {
    if (previousPathRef.current === pathname) return;
    previousPathRef.current = pathname;
    setMenuOpen(false);
  }, [pathname, setMenuOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        toggleRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !wrapperRef.current) return;
      const focusable = Array.from(
        wrapperRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
      ).filter((element) => element.tabIndex !== -1);
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, setMenuOpen]);

  const normalizedPath = pathname.replace(/^\/en(?=\/|$)/, "") || "/";

  return (
    <div className="sm-menu" data-open={isOpen ? "true" : undefined} ref={wrapperRef}>
      <div className="sm-menu__header">
        <Link
          className="sm-menu__logo"
          href={homeHref}
          aria-label="Ascooo Home"
          onClick={() => {
            if (normalizedPath !== "/") {
              markSkipOpeningTransitionForNextNavigation();
              return;
            }
            setMenuOpen(false);
          }}
        >
          <img className="sm-menu__logo-dark" src="/assets/img/logo_dark.svg" alt="Ascooo" />
          <img className="sm-menu__logo-light" src="/assets/img/logo_light.svg" alt="" aria-hidden="true" />
        </Link>

        <button
          className="sm-menu__toggle"
          type="button"
          aria-label={isOpen ? closeText : menuText}
          aria-expanded={isOpen}
          aria-controls="mobile-staggered-menu"
          onClick={toggleMenu}
          ref={toggleRef}
        >
          <span className="sm-menu__icon" aria-hidden="true">
            <span className="sm-menu__icon-line" />
            <span className="sm-menu__icon-line" />
            <span className="sm-menu__icon-line" />
          </span>
        </button>
      </div>

      <div className="sm-menu__layers" aria-hidden="true">
        {LAYER_COLORS.map((color) => (
          <div className="sm-menu__layer" style={{ backgroundColor: color }} key={color} />
        ))}
      </div>

      <nav
        className="sm-menu__panel"
        id="mobile-staggered-menu"
        aria-label={locale === "zh-TW" ? "行動版主選單" : "Mobile navigation"}
        aria-hidden={!isOpen}
        data-lenis-prevent
      >
        <div className="sm-menu__panel-inner">
          <ol className="sm-menu__list">
            {items.map((item, index) => {
              const itemPath = item.href.replace(/^\/en(?=\/|$)/, "").split("#")[0] || "/";
              const isCurrent = itemPath === normalizedPath;

              return (
                <li
                  className="sm-menu__item"
                  key={item.href}
                  style={{ "--sm-item-delay": `${0.25 + index * 0.075}s` } as CSSProperties}
                >
                  <Link
                    className="sm-menu__link"
                    href={item.href}
                    aria-label={item.ariaLabel}
                    aria-current={isCurrent ? "page" : undefined}
                    tabIndex={isOpen ? 0 : -1}
                    onClick={() => {
                      if (!isCurrent) {
                        markSkipOpeningTransitionForNextNavigation();
                        return;
                      }
                      setMenuOpen(false);
                    }}
                  >
                    <span className="sm-menu__item-label">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ol>
          <SocialLinks
            className="sm-menu__social"
            ariaLabel={locale === "zh-TW" ? "社群媒體連結" : "Social links"}
            tabIndex={isOpen ? 0 : -1}
          />
        </div>
      </nav>
    </div>
  );
}
