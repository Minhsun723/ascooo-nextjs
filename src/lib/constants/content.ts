import type { NewsItem, WorkItem } from "@/types/content";

export const works: WorkItem[] = [
  {
    slug: "1",
    title: "麥當勞盲盒模擬器",
    release: "2025年05月",
    image: "/assets/img/mc_mine.jpg",
    description: [
      "以「Minecraft x 麥當勞」聯名活動為主題的盲盒抽獎模擬器。",
      "麥塊公仔盲盒全套6款，包括大鳥姊姊鞘翅、漢堡神偷殭屍、薯條頭盔、奶昔大哥龍蛋、蘇打藥水及大麥克方塊等角色，每款角色皆以《Minecraft》特有的像素造型設計，生動還原遊戲經典元素。",
    ],
    externalUrl: "https://mcbox.ascooo.com/",
  },
  ...[2, 3, 4, 5, 6].map((number) => {
    const letter = String.fromCharCode(64 + number);
    const isPublished = number < 4;
    return {
      slug: String(number),
      title: `作品標題 ${letter}`,
      release: isPublished ? "2026年公開" : "Coming Soon",
      image: `https://placehold.co/1200x800/${number}a${number}a${number}a/f0f0f0?text=Title+${letter}`,
      description: [
        `這是關於「作品標題 ${letter}」的詳細介紹。Ascooo 致力於為這部作品提供最佳的發行與宣傳策略。`,
      ],
    } satisfies WorkItem;
  }),
];

export const workCards: WorkItem[] = [
  ...works,
  {
    slug: "7",
    title: "作品標題 G",
    release: "Coming Soon",
    image: "https://placehold.co/400x530/7a7a7a/f0f0f0?text=Title+G",
    description: [],
  },
];

export const newsItems: NewsItem[] = [
  {
    slug: "1",
    title: "網站正式上線",
    date: "2026.06.01",
    paragraphs: [
      "感謝各位對 Ascooo 的支持與愛護，我們的官方網站於今日正式上線了。",
      "我們將透過這個平台，為大家帶來更多關於我們的最新消息、作品與服務。未來也將陸續增加更多功能，提供更完善的使用體驗。",
      "敬請期待，並歡迎隨時給予我們寶貴的意見與指教。",
    ],
  },
  {
    slug: "2",
    title: "Ascooo 公司成立消息",
    date: "2026.05.15",
    paragraphs: [
      "我們很高興地宣布，Ascooo 於今日正式成立。",
      "我們致力於提供最優質的設計與開發服務，結合創新思維與專業技術，為客戶打造卓越的數位體驗。這是一個全新的開始，我們期待未來能與更多優秀的夥伴合作，共創佳績。",
    ],
  },
  {
    slug: "3",
    title: "首部合作作品正式公告",
    date: "2026.04.20",
    paragraphs: [
      "經過數月的努力，我們很高興與大家分享我們的首部合作作品。",
      "這是一個極具挑戰性且充滿創意的專案，感謝團隊成員的辛勤付出與合作夥伴的信任。我們將在近期的「作品」頁面中發布更多詳細資訊，敬請鎖定我們的最新動態。",
    ],
  },
  {
    slug: "4",
    title: "品牌形象識別系統發布",
    date: "2026.03.10",
    paragraphs: [
      "為了更好地傳達我們的核心理念與價值，我們於今日正式發布全新的品牌形象識別系統。",
      "新標誌融合了現代感與獨特性，象徵著我們對於創新與卓越的不懈追求。未來，我們將以全新的面貌，繼續為大家帶來更優質的服務與作品。",
    ],
  },
];
