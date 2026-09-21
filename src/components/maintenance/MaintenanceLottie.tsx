"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef } from "react";
import animationData from "./under-construction-animation.json";

type LottieAnimation = {
  destroy: () => void;
  pause: () => void;
  play: () => void;
};

type LottiePlayer = {
  loadAnimation: (options: {
    animationData: unknown;
    autoplay: boolean;
    container: HTMLDivElement;
    loop: boolean;
    renderer: "svg";
    rendererSettings: { preserveAspectRatio: string };
  }) => LottieAnimation;
};

declare global {
  interface Window {
    lottie?: LottiePlayer;
  }
}

export function MaintenanceLottie() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<LottieAnimation | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  const initializeAnimation = useCallback(() => {
    if (!containerRef.current || !window.lottie || animationRef.current) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animation = window.lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop: true,
      autoplay: !motionPreference.matches,
      animationData,
      rendererSettings: { preserveAspectRatio: "xMidYMid meet" },
    });

    const handleMotionPreference = (event: MediaQueryListEvent) => {
      if (event.matches) animation.pause();
      else animation.play();
    };

    motionPreference.addEventListener("change", handleMotionPreference);
    animationRef.current = animation;
    cleanupRef.current = () => {
      motionPreference.removeEventListener("change", handleMotionPreference);
      animation.destroy();
      animationRef.current = null;
    };
  }, []);

  useEffect(() => {
    initializeAnimation();

    return () => {
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, [initializeAnimation]);

  return (
    <>
      <div ref={containerRef} className="maintenance__animation" />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js"
        strategy="afterInteractive"
        onReady={initializeAnimation}
      />
    </>
  );
}
