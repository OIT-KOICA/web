"use client";

import ArticleDetail from "@/components/guest/blog/article-detail";
import { useGetArticle } from "@/lib/query/article-query";

interface Props {
  params: { slug: string };
}

export default function ArticleDetailPage({ params }: Props) {
  const { article, error } = useGetArticle(params.slug);

  if (error) return <div>Article non trouvé</div>;

  return (
    <div className="container mx-auto px-4 py-16">
      <ArticleDetail article={article} />
    </div>
  );
}
