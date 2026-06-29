import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { PostMeta, Post } from "./blog-types";

export type { PostMeta, Post };
export { formatDate } from "./blog-types";

const POSTS_DIR = path.join(process.cwd(), "src/content/blog");

function calcReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / 200);
}

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf-8");
    const { data, content } = matter(raw);

    return {
      slug,
      title: data.title as string,
      excerpt: data.excerpt as string,
      category: data.category as string,
      date: data.date as string,
      readingTime: calcReadingTime(content),
      coverImage: (data.coverImage as string) ?? "",
      featured: (data.featured as boolean) ?? false,
    };
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post {
  const raw = fs.readFileSync(path.join(POSTS_DIR, `${slug}.mdx`), "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title as string,
    excerpt: data.excerpt as string,
    category: data.category as string,
    date: data.date as string,
    readingTime: calcReadingTime(content),
    coverImage: (data.coverImage as string) ?? "",
    featured: (data.featured as boolean) ?? false,
    content,
  };
}
