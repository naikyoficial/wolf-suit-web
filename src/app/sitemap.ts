import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://suitwolf.com";

  return [
    {
      url: base,
      lastModified: new Date("2025-07-01"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${base}/evaluacion`,
      lastModified: new Date("2025-07-01"),
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];
}
