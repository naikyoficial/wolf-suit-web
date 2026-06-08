export type NavLink = {
  label: string;
  href: string;
};

export type CaseStudy = {
  id: string;
  client: string;
  industry: string;
  year: number;
  tags: readonly string[];
  headline: string;
  description: string;
  coverImage: string;
  slug: string;
};

export type Transformation = {
  id: string;
  title: string;
  description: string;
  outcome: string;
};

export type Testimonial = {
  quote: string;
  author: string;
  title: string;
  company: string;
};

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};
