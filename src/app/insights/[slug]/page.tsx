import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleView } from "@/components/sections/ArticleView";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildArticleMetadata,
  buildArticleSchemas,
} from "@/components/seo/articleMetadata";
import { getIndustryArticle, getIndustrySlugs } from "@/lib/articles";

const LANG = "en" as const;

export const dynamic = "force-static";
export const dynamicParams = false;

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getIndustrySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getIndustryArticle(LANG, slug);
  return article ? buildArticleMetadata(LANG, article) : {};
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const article = getIndustryArticle(LANG, slug);
  if (!article) notFound();

  return (
    <>
      <JsonLd data={buildArticleSchemas(LANG, article)} />
      <ArticleView lang={LANG} article={article} />
    </>
  );
}
