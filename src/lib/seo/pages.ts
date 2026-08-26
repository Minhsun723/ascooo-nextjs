import type { Metadata } from "next";
import type { Locale } from "@/types/content";
import { createPageMetadata } from "./metadata";

const descriptions = {
  "zh-TW": {
    "/": "Ascooo 官方網站—探索我們的作品、品牌故事與最新消息。",
    "/about": "關於 Ascooo。",
    "/company": "Ascooo 公司資訊與聯絡方式。",
    "/contact": "聯絡 Ascooo，歡迎與我們聯繫。",
    "/works": "Ascooo 作品一覽—精選動畫與影視內容。",
    "/news": "Ascooo 最新消息與公告。",
    "/status": "Ascooo 系統與服務運作狀態。",
    "/privacy": "Ascooo 隱私權政策。",
    "/terms": "Ascooo 使用者條款。",
  },
  en: {
    "/": "The official Ascooo website—explore our work, story, and latest updates.",
    "/about": "Learn about Ascooo.",
    "/company": "Company profile and contact information for Ascooo.",
    "/contact": "Get in touch with Ascooo.",
    "/works": "Explore selected animation and visual works from Ascooo.",
    "/news": "The latest news and announcements from Ascooo.",
    "/status": "Current system and service status for Ascooo.",
    "/privacy": "Ascooo Privacy Policy.",
    "/terms": "Ascooo Terms of Service.",
  },
} as const;

const titles: Record<keyof typeof descriptions["zh-TW"], string> = {
  "/": "Ascooo",
  "/about": "About — Ascooo",
  "/company": "Company — Ascooo",
  "/contact": "Contact — Ascooo",
  "/works": "Works — Ascooo",
  "/news": "News — Ascooo",
  "/status": "Status — Ascooo",
  "/privacy": "Privacy Policy — Ascooo",
  "/terms": "Terms of Service — Ascooo",
};

export function getPageMetadata(locale: Locale, pathname: keyof typeof titles): Metadata {
  return createPageMetadata({ title: titles[pathname], description: descriptions[locale][pathname], pathname, locale });
}
