"use client";

import { useEffect, useState } from "react";
import { requestSmoothScroll } from "@/lib/scroll";

export function PageTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    if (requestSmoothScroll({ target: 0 })) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <button className={`c-page-top${isVisible ? " is-visible" : ""}`} type="button" aria-label="Scroll to top" onClick={scrollToTop}>
      <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
    </button>
  );
}
