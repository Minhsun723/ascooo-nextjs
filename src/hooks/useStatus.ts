"use client";

import { useEffect, useState } from "react";
import { getStatus, getStatusPageHtml } from "@/lib/api/status";
import type { BetterStackStatusResponse } from "@/types/content";

const fallback: BetterStackStatusResponse = {
  included: [
    { id: "website", type: "status_page_resource", attributes: { public_name: "Main Website", status: "operational", availability: 1, position: 1, status_history: Array.from({ length: 90 }, () => ({ status: "operational" })) } },
    { id: "api", type: "status_page_resource", attributes: { public_name: "API Services", status: "operational", availability: 0.985, position: 2, status_history: Array.from({ length: 90 }, (_, index) => ({ status: index === 74 ? "degraded" : "operational" })) } },
    { id: "database", type: "status_page_resource", attributes: { public_name: "Database", status: "operational", availability: 0.992, position: 3, status_history: Array.from({ length: 90 }, (_, index) => ({ status: index === 84 ? "downtime" : "operational" })) } },
  ],
};

export function useStatus() {
  const [data, setData] = useState<BetterStackStatusResponse>();
  const [isFallback, setIsFallback] = useState(false);
  const [statusPageHtml, setStatusPageHtml] = useState<string>();

  useEffect(() => {
    let activeController: AbortController | undefined;
    const load = async () => {
      activeController?.abort();
      activeController = new AbortController();
      try {
        setData(await getStatus(activeController.signal));
        setIsFallback(false);
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setData(fallback);
          setIsFallback(true);
        }
      }
    };
    void load();
    const interval = window.setInterval(load, 60_000);
    return () => { activeController?.abort(); window.clearInterval(interval); };
  }, []);

  useEffect(() => {
    const hasChart = data?.included?.some((item) => item.type === "status_page_resource" && item.attributes.resource_type?.includes("Chart"));
    if (!hasChart || statusPageHtml) return;

    const controller = new AbortController();
    void getStatusPageHtml(controller.signal).then(setStatusPageHtml).catch(() => undefined);
    return () => controller.abort();
  }, [data, statusPageHtml]);

  return { data, isLoading: !data, isFallback, statusPageHtml };
}
