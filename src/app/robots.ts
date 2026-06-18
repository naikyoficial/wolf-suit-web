import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://suitwolf.com/sitemap.xml",
    host: "https://suitwolf.com",
  };
}
