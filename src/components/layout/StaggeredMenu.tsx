"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { markSkipOpeningTransitionForNextNavigation } from "@/lib/navigation-transition";
import type { Locale } from "@/types/content";

gsap.registerPlugin(useGSAP);

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
  const panelRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const openRef = useRef(false);
  const previousPathRef = useRef(pathname);
  const [isOpen, setIsOpen] = useState(false);

  const menuText = locale === "zh-TW" ? "選單" : "Menu";
  const closeText = locale === "zh-TW" ? "關閉" : "Close";

  useGSAP(
    () => {
      const wrapper = wrapperRef.current;
      const panel = panelRef.current;
      if (!wrapper || !panel) return;

      const layers = Array.from(wrapper.querySelectorAll<HTMLElement>(".sm-menu__layer"));
      const labels = Array.from(wrapper.querySelectorAll<HTMLElement>(".sm-menu__item-label"));
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const duration = (value: number) => (reduced ? 0.001 : value);

      gsap.set([...layers, panel], { xPercent: 100, autoAlpha: 1 });
      gsap.set(labels, { yPercent: 135, rotation: reduced ? 0 : 7 });

      const timeline = gsap.timeline({ paused: true });

      layers.forEach((layer, index) => {
        timeline.to(
          layer,
          { xPercent: 0, duration: duration(0.5), ease: "power4.out" },
          reduced ? 0 : index * 0.07,
        );
      });

      timeline.to(
        panel,
        { xPercent: 0, duration: duration(0.68), ease: "power4.out" },
        reduced ? 0 : 0.12,
      );

      timeline.to(
        labels,
        {
          yPercent: 0,
          rotation: 0,
          duration: duration(0.86),
          ease: "power4.out",
          stagger: reduced ? 0 : 0.075,
        },
        reduced ? 0 : 0.25,
      );

      timelineRef.current = timeline;
      if (openRef.current) timeline.progress(1);

      return () => {
        timeline.kill();
        if (timelineRef.current === timeline) timelineRef.current = null;
      };
    },
    { scope: wrapperRef },
  );

  const setMenuOpen = useCallback((open: boolean) => {
    openRef.current = open;
    setIsOpen(open);

    const timeline = timelineRef.current;
    if (!timeline) {
      window.requestAnimationFrame(() => {
        const pendingTimeline = timelineRef.current;
        if (!pendingTimeline) return;
        if (openRef.current) pendingTimeline.play();
        else pendingTimeline.reverse();
      });
      return;
    }
    if (open) timeline.play();
    else timeline.reverse();
  }, []);

  const toggleMenu = useCallback(() => setMenuOpen(!openRef.current), [setMenuOpen]);

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
            if (normalizedPath !== "/") markSkipOpeningTransitionForNextNavigation();
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
        ref={panelRef}
      >
        <div className="sm-menu__panel-inner">
          <ol className="sm-menu__list">
            {items.map((item) => {
              const itemPath = item.href.replace(/^\/en(?=\/|$)/, "").split("#")[0] || "/";
              const isCurrent = itemPath === normalizedPath;

              return (
                <li className="sm-menu__item" key={item.href}>
                  <Link
                    className="sm-menu__link"
                    href={item.href}
                    aria-label={item.ariaLabel}
                    aria-current={isCurrent ? "page" : undefined}
                    tabIndex={isOpen ? 0 : -1}
                    onClick={() => {
                      if (!isCurrent) markSkipOpeningTransitionForNextNavigation();
                      setMenuOpen(false);
                    }}
                  >
                    <span className="sm-menu__item-label">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </nav>
    </div>
  );
}
