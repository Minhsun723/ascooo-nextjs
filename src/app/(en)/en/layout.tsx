import type { Metadata, Viewport } from "next";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../globals.css";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { fontStyles } from "@/lib/fonts";

export const metadata: Metadata = {
  metadataBase: new URL("https://ascooo.com"),
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = { themeColor: "#ffffff", width: "device-width", initialScale: 1 };

export default function EnglishRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={fontStyles}><SiteLayout locale="en">{children}</SiteLayout></body>
    </html>
  );
}
