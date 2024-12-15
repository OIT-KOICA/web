"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const categories = ["All", "Production", "Transformation", "Marketing"];

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
