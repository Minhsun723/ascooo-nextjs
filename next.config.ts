import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "placehold.co" }],
  },
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/en/index.html", destination: "/en", permanent: true },
      { source: "/:page(about|company|contact|works|news|status|privacy|terms).html", destination: "/:page", permanent: true },
      { source: "/en/:page(about|company|contact|works|news|status|privacy|terms).html", destination: "/en/:page", permanent: true },
      { source: "/works/:slug.html", destination: "/works/:slug", permanent: true },
      { source: "/news/:slug.html", destination: "/news/:slug", permanent: true },
      { source: "/en/works/:slug", destination: "/works/:slug", permanent: true },
      { source: "/en/news/:slug", destination: "/news/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
