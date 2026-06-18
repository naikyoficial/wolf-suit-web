import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://wolfsuit.com/sitemap.xml",
    host: "https://wolfsuit.com",
  };
}
