import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleView } from "@/components/sections/ArticleView";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildArticleMetadata,
  buildArticleSchemas,
} from "@/components/seo/articleMetadata";
import { getArticle, getArticleSlugs } from "@/lib/articles";

const LANG = "en" as const;

export const dynamic = "force-static";
export const dynamicParams = false;

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(LANG, slug);
  return article ? buildArticleMetadata(LANG, article) : {};
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticle(LANG, slug);
  if (!article) notFound();

  return (
    <>
      <JsonLd data={buildArticleSchemas(LANG, article)} />
      <ArticleView lang={LANG} article={article} />
    </>
  );
}
