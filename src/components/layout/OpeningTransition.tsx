"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function OpeningTransition() {
  const rootRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useGSAP(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const firstVisit = !sessionStorage.getItem("ascooo-visited");
    if (reduceMotion) {
      gsap.set(".p-op", { display: "none" });
      return;
    }
    const timeline = gsap.timeline({ onComplete: () => sessionStorage.setItem("ascooo-visited", "1") });
    if (firstVisit) {
      timeline.fromTo(".p-op__logo", { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1, duration: 0.6, ease: "power3.out" })
        .to(".p-op__logo", { autoAlpha: 0, scale: 1.1, duration: 0.4, ease: "power3.in" }, "+=0.3")
        .to(".p-op__overlay", { yPercent: -100, duration: 0.9, ease: "power4.inOut", stagger: 0.1 }, "-=0.2");
    } else {
      gsap.set(".p-op__logo", { display: "none" });
      timeline.to(".p-op__overlay", { yPercent: -100, duration: 0.35, ease: "power2.inOut", stagger: 0.03 });
    }
  }, { scope: rootRef, dependencies: [pathname], revertOnUpdate: true });

  return (
    <div className="p-op" aria-hidden="true" ref={rootRef}>
      <div className="p-op__logo"><img src="/assets/img/logo_light.svg" alt="" /></div>
      {[1, 2, 3, 4, 5].map((number) => <div className={`p-op__overlay --${number}`} key={number} />)}
    </div>
  );
}
