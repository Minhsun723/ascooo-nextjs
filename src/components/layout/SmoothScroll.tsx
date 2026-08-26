"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  consumeScrollResetForNavigation,
  SMOOTH_SCROLL_REQUEST_EVENT,
  type SmoothScrollRequestDetail,
} from "@/lib/scroll";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis>(null);

  useLayoutEffect(() => {
    if (!consumeScrollResetForNavigation()) return;

    const lenis = lenisRef.current;
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo({ top: 0, behavior: "auto" });

    const refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => window.cancelAnimationFrame(refreshFrame);
  }, [pathname]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true, touchMultiplier: 2 });
    lenisRef.current = lenis;
    const handleTick = (time: number) => lenis.raf(time * 1000);
    const syncMenuState = () => {
      if (document.body.hasAttribute("data-menu-open")) lenis.stop();
      else lenis.start();
    };
    const handleScrollRequest = (event: Event) => {
      const request = event as CustomEvent<SmoothScrollRequestDetail>;
      request.preventDefault();
      lenis.scrollTo(request.detail.target, { offset: request.detail.offset });
    };
    const menuStateObserver = new MutationObserver(syncMenuState);

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(handleTick);
    gsap.ticker.lagSmoothing(0);
    window.addEventListener(SMOOTH_SCROLL_REQUEST_EVENT, handleScrollRequest);
    menuStateObserver.observe(document.body, { attributes: true, attributeFilter: ["data-menu-open"] });
    syncMenuState();

    return () => {
      menuStateObserver.disconnect();
      window.removeEventListener(SMOOTH_SCROLL_REQUEST_EVENT, handleScrollRequest);
      gsap.ticker.remove(handleTick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);
  return null;
}
