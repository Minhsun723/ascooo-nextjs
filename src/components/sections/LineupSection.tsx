"use client";

import Link from "next/link";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { works } from "@/lib/constants/content";
import { localizeHref } from "@/lib/i18n/config";
import { markScrollResetForNextNavigation } from "@/lib/scroll";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/types/content";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { MoreButton } from "@/components/ui/MoreButton";

export function LineupSection({ locale, copy }: { locale: Locale; copy: Dictionary["lineup"] }) {
  return (
    <section className="p-lineup" id="lineup">
      <div className="p-lineup__container">
        <SectionTitle title={copy.title} caption={copy.cap} />
        <div className="p-lineup__inner"><div className="p-lineup__slide">
          <Swiper className="js-lineup-swiper" modules={[FreeMode]} slidesPerView="auto" spaceBetween={20} freeMode speed={500}>
            {works.slice(0, 5).map((work) => (
              <SwiperSlide key={work.slug}>
                <Link href={`/works/${work.slug}`} className="c-card js-reveal" scroll={false} onNavigate={markScrollResetForNextNavigation}>
                  <div className="c-card__img"><img src={work.image.replace("1200x800", "400x530")} alt={work.title} loading="lazy" /></div>
                  <div className="c-card__info"><div className="c-card__name">{work.title}</div><div className="c-card__release">{work.release}</div></div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div><div className="p-lineup__more"><MoreButton href={localizeHref("/works", locale)} label={copy.more} /></div></div>
      </div>
    </section>
  );
}
