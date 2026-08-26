"use client";

import { useState } from "react";
import { useStatus } from "@/hooks/useStatus";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import type {
  Locale,
  StatusHistoryDay,
  StatusResourceAttributes,
  StatusResourceItem,
  StatusSectionItem,
} from "@/types/content";

type DisplayStatus = "operational" | "degraded" | "down";
type HistoryStatus = DisplayStatus | "unknown";

function normalizedStatus(status: string): DisplayStatus {
  if (status === "downtime" || status === "down") return "down";
  if (status === "degraded") return "degraded";
  return "operational";
}

function normalizedHistoryStatus(status: string): HistoryStatus {
  if (status === "downtime" || status === "down") return "down";
  if (status === "degraded" || status === "recovered") return "degraded";
  if (status === "not_monitored" || status === "unknown" || status === "maintenance") return "unknown";
  return "operational";
}

function sectionStatus(monitors: StatusResourceItem[]): DisplayStatus {
  if (monitors.some((monitor) => normalizedStatus(monitor.attributes.status) === "down")) return "down";
  if (monitors.some((monitor) => normalizedStatus(monitor.attributes.status) === "degraded")) return "degraded";
  return "operational";
}

function StatusGlyph({ status, variant }: { status: DisplayStatus; variant: "section" | "item" | "tooltip" }) {
  const className = variant === "section" ? "p-status__section-icon" : variant === "item" ? "p-status__item-icon" : undefined;
  const isWarning = status === "degraded" && variant === "item";
  const isPositive = status === "operational" || (status === "degraded" && variant === "tooltip");

  if (isWarning) {
    return <svg viewBox="0 0 20 20" fill="currentColor" className={className} data-status={status} aria-hidden="true"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>;
  }

  const path = isPositive
    ? "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
    : "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z";

  return <svg viewBox="0 0 20 20" fill="currentColor" className={className} data-status={status} width={variant === "tooltip" ? 16 : undefined} height={variant === "tooltip" ? 16 : undefined} aria-hidden="true"><path fillRule="evenodd" d={path} clipRule="evenodd" /></svg>;
}

function statusLabel(status: DisplayStatus, locale: Locale) {
  const copy = getDictionary(locale).status_page;
  if (status === "down") return copy.status_down;
  if (status === "degraded") return copy.status_degraded;
  return copy.status_operational;
}

function extractIframeUrl(html: string | undefined, monitorName: string, monitorId: string) {
  if (!html) return undefined;

  for (const iframeMatch of html.matchAll(/<iframe[^>]+src=["']([^"']+)["'][^>]*>/gi)) {
    const source = iframeMatch[1].replace(/&amp;/g, "&");
    try {
      const url = new URL(source);
      if (url.protocol === "https:" && url.searchParams.get("sprid") === monitorId) return url.toString();
    } catch {
      // Continue to the name-based fallback used by the original page.
    }
  }

  const exactNameIndex = html.indexOf(`>${monitorName}<`);
  const nameIndex = exactNameIndex >= 0 ? exactNameIndex : html.indexOf(monitorName);
  if (nameIndex < 0) return undefined;

  const iframeIndex = html.indexOf("<iframe", nameIndex);
  if (iframeIndex < 0 || iframeIndex - nameIndex > 3000) return undefined;

  const iframeTag = html.slice(iframeIndex, iframeIndex + 1000);
  const src = iframeTag.match(/src=["']([^"']+)["']/i)?.[1]?.replace(/&amp;/g, "&");
  if (!src) return undefined;

  try {
    const url = new URL(src);
    return url.protocol === "https:" ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

export function StatusDashboard({ locale }: { locale: Locale }) {
  const { data, isLoading, statusPageHtml } = useStatus();
  const copy = getDictionary(locale).status_page;

  if (isLoading) {
    const skeletons = [
      { height: 104, marginBottom: 48 },
      { height: 80, marginBottom: 24 },
      { height: 80, marginBottom: 24 },
      { height: 80, marginBottom: 48 },
      { height: 40, marginBottom: 24, width: 150 },
      { height: 120 },
    ];
    return <div aria-live="polite" aria-busy="true">{skeletons.map((style, index) => <div key={index} style={style} className="p-status__skeleton" />)}</div>;
  }

  const included = data?.included ?? [];
  const monitors = included.filter((item): item is StatusResourceItem => item.type === "status_page_resource");
  const sectionItems = included.filter((item): item is StatusSectionItem => item.type === "status_page_section");
  const downCount = monitors.filter((item) => normalizedStatus(item.attributes.status) === "down").length;
  const degradedCount = monitors.filter((item) => normalizedStatus(item.attributes.status) === "degraded").length;
  const overallState = downCount === monitors.length && monitors.length > 0 ? "down" : downCount > 0 ? "partial_outage" : degradedCount > 0 ? "degraded" : "operational";
  const overallCssStatus: DisplayStatus = overallState === "partial_outage" ? "down" : overallState;
  const summary = overallState === "down" ? copy.overall_outage : overallState === "partial_outage" ? copy.overall_partial_outage : overallState === "degraded" ? copy.overall_degraded : copy.overall_operational;
  const time = new Intl.DateTimeFormat(locale === "en" ? "en-US" : "zh-TW", { hour: "2-digit", minute: "2-digit" }).format(new Date());

  const sections = sectionItems
    .map((section) => ({
      id: section.id,
      name: section.attributes.name,
      position: section.attributes.position ?? 0,
      monitors: monitors.filter((monitor) => String(monitor.attributes.status_page_section_id) === String(section.id)).sort((a, b) => (a.attributes.position ?? 0) - (b.attributes.position ?? 0)),
    }))
    .filter((section) => section.monitors.length > 0)
    .sort((a, b) => a.position - b.position);

  const assignedIds = new Set(sections.flatMap((section) => section.monitors.map((monitor) => monitor.id)));
  const unassignedMonitors = monitors.filter((monitor) => !assignedIds.has(monitor.id)).sort((a, b) => (a.attributes.position ?? 0) - (b.attributes.position ?? 0));
  if (unassignedMonitors.length > 0) sections.push({ id: "other-services", name: "Other Services", position: 999, monitors: unassignedMonitors });

  return (
    <div aria-live="polite">
      <div className="p-status__summary" data-status={overallCssStatus}>
        <div className="p-status__summary-content"><span className="p-status__indicator" aria-hidden="true" /><h2 className="p-status__summary-text">{summary}</h2></div>
        <div className="p-status__summary-time">{copy.last_updated}: {time}</div>
      </div>

      <div className="p-status__monitors"><div className="p-status__card">
        {sections.map((section, sectionIndex) => {
          const status = sectionStatus(section.monitors);
          return <div key={section.id}>
            <div className="p-status__section">
              <div className="p-status__section-header">
                <div className="p-status__section-name">{section.name}</div>
                <div className="p-status__section-pill" data-status={status}><StatusGlyph status={status} variant="section" /><span>{statusLabel(status, locale)}</span></div>
              </div>
              <div className="p-status__section-body">{section.monitors.map((monitor) => <StatusMonitor key={monitor.id} monitorId={monitor.id} monitor={monitor.attributes} locale={locale} statusPageHtml={statusPageHtml} />)}</div>
            </div>
            {sectionIndex < sections.length - 1 && <div className="p-status__divider" />}
          </div>;
        })}
      </div></div>
    </div>
  );
}

function StatusMonitor({ monitorId, monitor, locale, statusPageHtml }: { monitorId: string; monitor: StatusResourceAttributes; locale: Locale; statusPageHtml?: string }) {
  const copy = getDictionary(locale).status_page;
  const status = normalizedStatus(monitor.status);
  const availability = typeof monitor.availability === "number" ? `${(monitor.availability * 100).toFixed(3).replace(/\.?0+$/, "")}%` : "100%";
  const history = [...(monitor.status_history ?? [])].slice(-90);
  while (history.length < 90) history.unshift({ status: "unknown" });

  const iframeUrl = monitor.resource_type?.includes("Chart") ? extractIframeUrl(statusPageHtml, monitor.public_name, monitorId) : undefined;
  const statusClass = status === "down" ? "text-red" : status === "degraded" ? "text-orange" : "text-green";

  return (
    <div className="p-status__item" data-status={status}>
      <div className="p-status__item-info">
        <div className="p-status__item-title"><StatusGlyph status={status} variant="item" />{monitor.public_name}</div>
        <div className={`p-status__item-uptime ${statusClass}`}>{iframeUrl ? statusLabel(status, locale) : <>{availability} {copy.uptime}</>}</div>
      </div>
      {iframeUrl ? <div className="p-status__history"><iframe className="p-status__chart-iframe" src={iframeUrl} title={monitor.public_name} loading="lazy" scrolling="no" /></div> : <StatusHistory history={history} locale={locale} />}
    </div>
  );
}

function StatusHistory({ history, locale }: { history: Array<StatusHistoryDay | string>; locale: Locale }) {
  const copy = getDictionary(locale).status_page;
  const [renderedAt] = useState(() => Date.now());
  return <div className="p-status__history">
    <div className="p-status__history-bars p-status__history-bars--90">{history.map((day, index) => {
      const historyDay = typeof day === "string" ? { status: day } : day;
      const status = normalizedHistoryStatus(historyDay.status ?? "unknown");
      const daysAgo = 89 - index;
      const downtimeDuration = historyDay.downtime_duration ?? 0;
      const minutes = Math.ceil(downtimeDuration / 60);
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      const duration = downtimeDuration > 0 ? `${hours > 0 ? `${hours}h ` : ""}${remainingMinutes > 0 || hours === 0 ? `${remainingMinutes}m` : ""}`.trim() : "";
      const ongoing = daysAgo === 0 && status === "down";
      const description = status === "operational" || status === "unknown" ? copy.tooltip_no_downtime : duration ? (ongoing ? copy.tooltip_down_ongoing : copy.tooltip_down_duration).replace("{time}", duration) : "";
      const tooltipTitle = status === "operational" ? copy.status_operational : status === "degraded" ? copy.status_recovered : copy.status_down;
      const dateValue = historyDay.day ? new Date(historyDay.day) : new Date(renderedAt - daysAgo * 86_400_000);
      const date = new Intl.DateTimeFormat(locale === "en" ? "en-US" : "zh-TW", { month: "short", day: "numeric", year: "numeric" }).format(dateValue);
      const alignClass = index < 15 ? " p-status__tooltip--left" : index > 75 ? " p-status__tooltip--right" : "";

      return <div className="p-status__history-bar" data-status={status} key={index}>
        <div className={`p-status__tooltip${alignClass}`}>
          <div className="p-status__tooltip-header"><span className="p-status__tooltip-icon" data-status={status}>{status !== "unknown" && <StatusGlyph status={status} variant="tooltip" />}</span><span className="p-status__tooltip-title">{tooltipTitle}</span></div>
          <div className="p-status__tooltip-desc">{description}</div>
          <div className="p-status__tooltip-date">{date}</div>
        </div>
      </div>;
    })}</div>
    <div className="p-status__history-meta"><span className="is-pc">90 {copy.days_ago}</span><span className="is-sp">30 {copy.days_ago}</span><span>{copy.today}</span></div>
  </div>;
}
