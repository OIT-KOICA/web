"use client";

import { Input } from "@/components/ui/input";
import useStore from "@/lib/stores/store";
import { Search } from "lucide-react";

export default function EventSearchBar() {
  const { searchTerm, setSearchTerm } = useStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-sm">
      <Input
        type="text"
        placeholder="Rechercher un événement..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10"
      />
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        size={18}
      />
    </form>
  );
}
