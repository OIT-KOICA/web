"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  className?: string;
  onTermChange: (searchItems: string) => void;
}

export default function SearchBar({
  className,
  onTermChange,
}: SearchBarProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    onTermChange(query);
  }, [onTermChange, query]);

  return (
    <div className={`flex gap-2 ${className}`}>
      <Input
        type="text"
        placeholder="Rechercher des produits..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="grow"
      />
    </div>
  );
}
