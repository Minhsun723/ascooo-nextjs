import type { CSSProperties } from "react";
import { DM_Sans, Noto_Sans_TC } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  display: "swap",
});

export const fontStyles = {
  "--font-display": dmSans.style.fontFamily,
  "--font-body": `${notoSansTC.style.fontFamily}, ${dmSans.style.fontFamily}`,
} as CSSProperties;
