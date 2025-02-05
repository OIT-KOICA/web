"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ArticleCard from "./article-card";
import useArticleStore from "@/lib/stores/article-store";
import { useGetArticles } from "@/lib/query/article-query";

// Mock data for articles
const mockArticles = [
  {
    id: 1,
    title: "Maximizing Cassava Yield: Best Practices",
    description:
      "Learn the latest techniques to increase your cassava production and improve crop quality.",
    image: "/blog/cassava-yield.jpg",
    date: "2023-05-15",
    category: "Production",
  },
  {
    id: 2,
    title: "Innovative Maize Processing Techniques",
    description:
      "Discover new methods for processing maize that can add value to your products and increase profitability.",
    image: "/blog/maize-processing.jpg",
    date: "2023-05-10",
    category: "Transformation",
  },
  {
    id: 3,
    title: "Effective Marketing Strategies for Poultry Farmers",
    description:
      "Explore proven marketing tactics to help you reach more customers and grow your poultry business.",
    image: "/blog/poultry-marketing.jpg",
    date: "2023-05-05",
    category: "Marketing",
  },
  // Add more mock articles as needed
];

export default function ArticleGrid() {
  const [visibleArticles, setVisibleArticles] = useState(6);

  const { articles, setArticles } = useArticleStore();
  const { articles: fetchArticles } = useGetArticles();

  useEffect(() => {
    if (!articles && fetchArticles) setArticles(fetchArticles);
  }, [articles, fetchArticles, setArticles]);

  const loadMore = () => {
    setVisibleArticles((prev) => prev + 3);
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {articles.slice(0, visibleArticles).map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
      {visibleArticles < mockArticles.length && (
        <div className="mt-8 text-center">
          <Button onClick={loadMore}>Charger plus...</Button>
        </div>
      )}
    </div>
  );
}
