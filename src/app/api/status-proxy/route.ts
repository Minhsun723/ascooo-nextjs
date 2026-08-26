const statusPageUrl = "https://ascooo.betteruptime.com/en/";

export async function GET() {
  try {
    const response = await fetch(statusPageUrl, {
      headers: {
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/125 Safari/537.36",
      },
      next: { revalidate: 300 },
      redirect: "follow",
    });

    if (!response.ok) {
      return Response.json({ error: `Upstream returned ${response.status}` }, { status: response.status });
    }

    const html = await response.text();
    const iframeContexts: string[] = [];
    const iframePattern = /<iframe[^>]+>/gi;
    let match: RegExpExecArray | null;

    while ((match = iframePattern.exec(html)) !== null) {
      const start = Math.max(0, match.index - 500);
      const end = Math.min(html.length, match.index + match[0].length + 100);
      iframeContexts.push(html.slice(start, end));
    }

    return new Response(iframeContexts.join("\n---\n"), {
      headers: {
        "Cache-Control": "public, max-age=300, s-maxage=300",
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  } catch {
    return Response.json({ error: "Unable to fetch status page" }, { status: 502 });
  }
}
