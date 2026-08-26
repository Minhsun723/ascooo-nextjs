import type { Metadata, Viewport } from "next";
import { DM_Sans, Noto_Sans_TC } from "next/font/google";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../globals.css";
import { SiteLayout } from "@/components/layout/SiteLayout";

const dmSans = DM_Sans({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-dm-sans", display: "swap" });
const notoSansTC = Noto_Sans_TC({ subsets: ["latin"], variable: "--font-noto-sans-tc", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://ascooo.com"),
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = { themeColor: "#ffffff", width: "device-width", initialScale: 1 };

export default function ChineseRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW" className={`${dmSans.variable} ${notoSansTC.variable}`}>
      <body><a className="skip-link" href="#main-content">跳至主要內容</a><SiteLayout locale="zh-TW">{children}</SiteLayout></body>
    </html>
  );
}
