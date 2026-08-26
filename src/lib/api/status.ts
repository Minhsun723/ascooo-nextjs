import type { BetterStackStatusResponse } from "@/types/content";

export async function getStatus(signal?: AbortSignal): Promise<BetterStackStatusResponse> {
  const response = await fetch("/api/status", { cache: "no-store", signal });
  if (!response.ok) throw new Error(`Status API returned ${response.status}`);
  return response.json() as Promise<BetterStackStatusResponse>;
}

export async function getStatusPageHtml(signal?: AbortSignal): Promise<string> {
  const response = await fetch("/api/status-proxy", { cache: "no-store", signal });
  if (!response.ok) throw new Error(`Status page proxy returned ${response.status}`);
  return response.text();
}
