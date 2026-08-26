"use client";

import Link from "next/link";
import { markScrollResetForNextNavigation } from "@/lib/scroll";

interface MoreButtonProps {
  href: string;
  label?: string;
}

export function MoreButton({ href, label = "More" }: MoreButtonProps) {
  return (
    <Link href={href} className="c-btn-more" scroll={false} onNavigate={markScrollResetForNextNavigation}>
      <span className="c-btn-more__icon" aria-hidden="true">
        <span className="c-btn-more__icon-arrow" />
      </span>
      <span className="c-btn-more__text">{label}</span>
    </Link>
  );
}
