export type ArticleSection = {
  id: string;
  heading: string;
  paragraphs: string[];
  list?: { title: string; body: string }[];
};

export type Article = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  summary: string;
  datePublished: string;
  dateModified: string;
  displayDate: string;
  readingTime: string;
  keywords: string[];
  sections: ArticleSection[];
  faq: { question: string; answer: string }[];
};
