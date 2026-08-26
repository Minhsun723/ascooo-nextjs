export type Locale = "zh-TW" | "en";

export interface WorkItem {
  slug: string;
  title: string;
  release: string;
  image: string;
  description: string[];
  externalUrl?: string;
}

export interface NewsItem {
  slug: string;
  title: string;
  date: string;
  paragraphs: string[];
}

export interface StatusHistoryDay {
  day?: string;
  status?: string;
  downtime_duration?: number;
  maintenance_duration?: number;
}

export interface StatusResourceAttributes {
  public_name: string;
  status: string;
  availability?: number;
  position?: number;
  status_history?: Array<StatusHistoryDay | string>;
  status_page_section_id?: string | number;
  resource_id?: string | number;
  resource_type?: string;
  widget_type?: string;
}

export interface StatusResourceItem {
  id: string;
  type: "status_page_resource";
  attributes: StatusResourceAttributes;
}

export interface StatusSectionAttributes {
  name: string;
  position?: number;
}

export interface StatusSectionItem {
  id: string;
  type: "status_page_section";
  attributes: StatusSectionAttributes;
}

export type StatusIncludedItem = StatusResourceItem | StatusSectionItem;

export interface BetterStackStatusResponse {
  included?: StatusIncludedItem[];
}
