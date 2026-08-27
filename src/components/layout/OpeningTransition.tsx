"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { consumeSkipOpeningTransitionForNavigation } from "@/lib/navigation-transition";

gsap.registerPlugin(useGSAP);

export function OpeningTransition() {
  const rootRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useGSAP(() => {
    const root = rootRef.current;
    if (!root) return;

    const heroSlide = document.querySelector<HTMLElement>(".p-hero__slide");

    if (consumeSkipOpeningTransitionForNavigation()) {
      gsap.set(root, { display: "none" });
      if (heroSlide) gsap.set(heroSlide, { clearProps: "opacity,transform,filter" });
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const firstVisit = !sessionStorage.getItem("ascooo-visited");
    if (reduceMotion) {
      gsap.set(root, { display: "none" });
      if (heroSlide) gsap.set(heroSlide, { clearProps: "opacity,transform,filter" });
      return;
    }

    if (heroSlide) {
      gsap.set(heroSlide, { autoAlpha: 0, y: 40, filter: "blur(8px)" });
    }

    gsap.set(root, { display: "block" });
    const timeline = gsap.timeline({ onComplete: () => sessionStorage.setItem("ascooo-visited", "1") });
    if (firstVisit) {
      timeline.fromTo(".p-op__logo", { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1, duration: 0.6, ease: "power3.out" })
        .to(".p-op__logo", { autoAlpha: 0, scale: 1.1, duration: 0.4, ease: "power3.in" }, "+=0.3")
        .to(".p-op__overlay", { yPercent: -100, duration: 0.9, ease: "power4.inOut", stagger: 0.1 }, "-=0.2");
    } else {
      gsap.set(".p-op__logo", { display: "none" });
      timeline.to(".p-op__overlay", { yPercent: -100, duration: 0.35, ease: "power2.inOut", stagger: 0.03 });
    }

    if (heroSlide) {
      timeline.to(heroSlide, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power3.out" });
    }
  }, { scope: rootRef, dependencies: [pathname], revertOnUpdate: true });

  return (
    <div className="p-op" aria-hidden="true" ref={rootRef}>
      <div className="p-op__logo"><img src="/assets/img/logo_light.svg" alt="" /></div>
      {[1, 2, 3, 4, 5].map((number) => <div className={`p-op__overlay --${number}`} key={number} />)}
    </div>
  );
}
