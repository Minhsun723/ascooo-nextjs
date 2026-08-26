import { NextResponse } from "next/server";

const statusUrl = "https://ascooo.betteruptime.com/en/index.json";

export async function GET() {
  try {
    const response = await fetch(statusUrl, { cache: "no-store", signal: AbortSignal.timeout(8_000) });
    if (!response.ok) return NextResponse.json({ error: `Upstream returned ${response.status}` }, { status: response.status });
    return NextResponse.json(await response.json(), { headers: { "Cache-Control": "public, max-age=30, s-maxage=30" } });
  } catch {
    return NextResponse.json({ error: "Unable to fetch status" }, { status: 502 });
  }
}
