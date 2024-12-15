"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SearchBarProps {
  className?: string;
}

export default function SearchBar({ className }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search logic here
    console.log("Searching for:", query);
  };

  return (
    <form onSubmit={handleSearch} className={`flex gap-2 ${className}`}>
      <Input
        type="text"
        placeholder="Rechercher des produits..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="grow"
      />
      <Button type="submit">
        <Search className="mr-2 size-4" /> Rechercher
      </Button>
    </form>
  );
}
