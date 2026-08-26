"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function PageMotion({ children }: { children: React.ReactNode }) {
  const mainRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useGSAP(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealGroups = [
      [".js-reveal", { y: 0 }],
      [".js-reveal-left", { x: 0 }],
      [".js-reveal-right", { x: 0 }],
      [".js-reveal-scale", { scale: 1 }],
    ] as const;

    if (reduceMotion) {
      for (const [selector, transform] of revealGroups) gsap.set(selector, { autoAlpha: 1, ...transform });
      gsap.set(".c-section-title__bg, .c-section-title__text, .c-section-title__cap", { clearProps: "all" });
      gsap.set(".c-section-title", { "--title-line-scale": 1 });
      return;
    }

    for (const [selector, transform] of revealGroups) {
      ScrollTrigger.batch(selector, {
        start: "top 85%",
        once: true,
        onEnter: (elements) => gsap.to(elements, { autoAlpha: 1, ...transform, duration: 0.8, ease: "power2.out", stagger: 0.1, overwrite: true }),
      });
    }

    gsap.utils.toArray<HTMLElement>(".c-section-title").forEach((title) => {
      const background = title.querySelector(".c-section-title__bg");
      const heading = title.querySelector(".c-section-title__text");
      const caption = title.querySelector(".c-section-title__cap");
      if (background) gsap.fromTo(background, { xPercent: -20, autoAlpha: 0, scale: 0.95, filter: "blur(8px)" }, { xPercent: 0, autoAlpha: 1, scale: 1, filter: "blur(0px)", duration: 1.5, ease: "power3.out", scrollTrigger: { trigger: title, start: "top 85%", once: true } });
      if (heading) gsap.fromTo(heading, { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: title, start: "top 85%", once: true } });
      if (caption) gsap.fromTo(caption, { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, delay: 0.2, ease: "power3.out", scrollTrigger: { trigger: title, start: "top 85%", once: true } });
      gsap.fromTo(title, { "--title-line-scale": 0 }, { "--title-line-scale": 1, duration: 1, ease: "power3.inOut", delay: 0.4, scrollTrigger: { trigger: title, start: "top 85%", once: true } });
    });
  }, { scope: mainRef, dependencies: [pathname], revertOnUpdate: true });

  return <main className="l-main" id="main-content" ref={mainRef}>{children}</main>;
}
