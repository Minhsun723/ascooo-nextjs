"use client";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const slides = [1, 2, 3, 4, 5];

export function HeroSection() {
  return (
    <section className="p-hero" id="hero" aria-label="Featured works">
      <div className="p-hero__content"><div className="p-hero__slide">
        <Swiper className="js-hero-swiper" modules={[Autoplay, Navigation, Pagination]} slidesPerView="auto" centeredSlides spaceBetween={24} loop speed={800} autoplay={{ delay: 4000, disableOnInteraction: false }} pagination={{ el: ".p-hero__pagination", clickable: true }} navigation={{ prevEl: ".p-hero__slide-btn.--prev", nextEl: ".p-hero__slide-btn.--next" }}>
          {slides.map((number) => (
            <SwiperSlide key={number}><div className="p-hero__slide-img"><img src={`https://placehold.co/800x450/${number === 5 ? "1a1a1a" : `${number}a${number}a${number}a`}/f0f0f0?text=Work+0${number}`} alt={`Work ${String(number).padStart(2, "0")}`} /></div></SwiperSlide>
          ))}
        </Swiper>
        <div className="p-hero__slide-nav">
          <button className="p-hero__slide-btn --prev" type="button" aria-label="Previous slide"><svg aria-hidden="true" width="32" height="12" viewBox="0 0 32 12" fill="none"><path d="M6 11 1 6m0 0 5-5M1 6h31" stroke="currentColor" strokeWidth="1.2" /></svg><span className="p-hero__slide-btn-text">PREV</span></button>
          <div className="p-hero__pagination" />
          <button className="p-hero__slide-btn --next" type="button" aria-label="Next slide"><span className="p-hero__slide-btn-text">NEXT</span><svg aria-hidden="true" width="32" height="12" viewBox="0 0 32 12" fill="none"><path d="m26 1 5 5m0 0-5 5m5-5H0" stroke="currentColor" strokeWidth="1.2" /></svg></button>
        </div>
      </div></div>
    </section>
  );
}
