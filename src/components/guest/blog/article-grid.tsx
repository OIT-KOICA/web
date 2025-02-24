"use client";

import { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import ArticleCard from "./article-card";
import { useGetArticles } from "@/lib/query/article-query";
import { useInView } from "react-intersection-observer";
import { Loader2 } from "lucide-react";
import { ArticleDTO } from "@/types/type";
import useArticleStore from "@/lib/stores/article-store";

export default function ArticleGrid() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetArticles();
  const { ref, inView } = useInView();
  const { searchTerm, activeCategory } = useArticleStore();

  const [articles, setArticles] = useState<ArticleDTO[]>([]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  useEffect(() => {
    if (data?.pages) {
      setArticles(data.pages.flatMap((page) => page.articles));
    }
  }, [data]);

  // 🔥 Filtrage et recherche côté client avec useMemo
  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory =
        activeCategory === "Toutes les catégories" ||
        article.category === activeCategory.toUpperCase();

      const matchesSearch =
        searchTerm === "" ||
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.description.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [articles, activeCategory, searchTerm]);

  return (
    <div>
      {filteredArticles.length === 0 && (
        <p className="text-center">
          Aucun article ne correspond à votre recherche.
        </p>
      )}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredArticles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>

      {hasNextPage && (
        <div ref={ref} className="mt-8 text-center">
          {isFetchingNextPage ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Button onClick={() => fetchNextPage()}>Charger plus...</Button>
          )}
        </div>
      )}
    </div>
  );
}
