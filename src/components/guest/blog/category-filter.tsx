"use client";

import { Button } from "@/components/ui/button";
import useArticleStore from "@/lib/stores/article-store";

const categories = ["Toutes les catégories", "Nouvelles", "Formations"];

export default function CategoryFilter() {
  const { activeCategory, setActiveCategory } = useArticleStore();

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Button
          key={category}
          variant={activeCategory === category ? "default" : "outline"}
          onClick={() => setActiveCategory(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  );
}
