"use client";

import ArticleDetail from "@/components/guest/blog/article-detail";
import useArticleStore from "@/lib/stores/article-store";
import { useEffect, useState } from "react";

export default function ArticleDetailPage() {
  const article = useArticleStore((state) => state.activeArticle);
  const [currentArticle, setCurrentArticle] = useState(article);

  useEffect(() => {
    if (article) setCurrentArticle(article);
  }, [article]);

  if (!currentArticle) {
    return <div className="text-center text-red-500">Article non trouvé.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <ArticleDetail article={currentArticle} />
    </div>
  );
}
