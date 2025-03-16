"use client";

import { Button } from "@/components/ui/button";
import useStore from "@/lib/stores/store";

const categories = ["Toutes les catégories", "Nouvelles", "Formation"];

export default function CategoryFilter() {
  const { activeCategory, setActiveCategory } = useStore();

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
