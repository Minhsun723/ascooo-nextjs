import type { Metadata, Viewport } from "next";
import { DM_Sans, Noto_Sans_TC } from "next/font/google";
import "../../maintenance.css";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const notoSansTC = Noto_Sans_TC({ subsets: ["latin"], variable: "--font-noto-sans-tc" });

export const metadata: Metadata = { title: "網站維護中｜Ascooo", description: "Ascooo 網站目前正在維護，稍後將恢復服務。", robots: { index: false, follow: false }, icons: { icon: "/favicon.ico" } };
export const viewport: Viewport = { themeColor: "#f4f8fb", width: "device-width", initialScale: 1 };

export default function MaintenanceLayout({ children }: { children: React.ReactNode }) {
  return <html lang="zh-TW" className={`${dmSans.variable} ${notoSansTC.variable}`}><body>{children}</body></html>;
}
