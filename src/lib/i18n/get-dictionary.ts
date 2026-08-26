import en from "./dictionaries/en.json";
import zhTW from "./dictionaries/zh-TW.json";
import type { Locale } from "@/types/content";

export type Dictionary = typeof zhTW;

export function getDictionary(locale: Locale): Dictionary {
  return locale === "en" ? en : zhTW;
}
