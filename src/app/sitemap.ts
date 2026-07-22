import type { MetadataRoute } from "next";
import { SEO } from "@/config/seo";
import { SERVICE_PAGES } from "@/config/services";
import { BLOG_POSTS } from "@/config/blog";
import { LOCATION_PAGES } from "@/config/locations";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SEO.url;
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/servicios`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${base}/evaluacion`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
  ];

  const servicePages: MetadataRoute.Sitemap = SERVICE_PAGES.map((s) => ({
    url: `${base}/servicios/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date + "T00:00:00"),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  const locationPages: MetadataRoute.Sitemap = LOCATION_PAGES.map((l) => ({
    url: `${base}/${l.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages, ...blogPages, ...locationPages];
}
