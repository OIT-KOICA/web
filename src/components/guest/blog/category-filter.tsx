"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const categories = ["Toutes les catégories", "Nouvelles", "Formations"];

export default function CategoryFilter() {
  const [activeCategory, setActiveCategory] = useState("All");

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
