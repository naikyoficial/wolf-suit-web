import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

const BASE = "https://suitwolf.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const articleEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Newest article drives the blog listing's lastModified.
  const newest = posts[0];
  const blogLastModified = newest ? new Date(newest.date) : new Date();

  return [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE}/blog`,
      lastModified: blogLastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE}/evaluacion`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    ...articleEntries,
  ];
}
