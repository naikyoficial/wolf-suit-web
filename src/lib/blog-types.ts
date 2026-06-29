export interface PostMeta {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: number;
  coverImage: string;
  featured?: boolean;
}

export interface Post extends PostMeta {
  content: string;
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
