import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Keep internal/non-content routes out of the crawl: the design mockup
      // (duplicate of the homepage), the /aplicar redirect, and API routes.
      disallow: ["/mockup", "/aplicar", "/api/"],
    },
    sitemap: "https://suitwolf.com/sitemap.xml",
    host: "https://suitwolf.com",
  };
}
