"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import useArticleStore from "@/lib/stores/article-store";
import { ArticleDTO } from "@/lib/type";
import { useRouter } from "next/navigation";
import ArticleTable from "./article-table";
import SearchBar from "./search-bar";
import FilterDropdown from "../filter-dropdown";

const ITEMS_PER_PAGE = 10;

export default function ArticleList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const articles = useArticleStore((state) => state.articles);
  const { setEdit } = useArticleStore();
  const router = useRouter();

  const filteredAndSortedArticles = useMemo(() => {
    if (!articles) return [];

    return articles
      .filter((article: ArticleDTO) => {
        const matchesSearch =
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.description.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory = !categoryFilter
          ? article
          : article.category === categoryFilter;

        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortOrder === "asc") {
          return a.title.localeCompare(b.title);
        } else {
          return b.title.localeCompare(a.title);
        }
      });
  }, [articles, searchTerm, categoryFilter, sortOrder]);

  const paginatedArticles = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedArticles.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );
  }, [filteredAndSortedArticles, currentPage]);

  const totalPages = Math.ceil(
    filteredAndSortedArticles.length / ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-4 p-4 sm:p-6">
      <div className="flex flex-col items-center justify-between space-y-3 sm:flex-row sm:space-y-0">
        <Button
          onClick={() => {
            setEdit(false);
            router.push("/dashboard/articles/create");
          }}
          className="w-full sm:w-auto"
        >
          <Plus className="mr-2 size-4" /> Créer un article
        </Button>

        <div className="flex w-full flex-col space-y-2 sm:w-auto sm:flex-row sm:space-x-2 sm:space-y-0">
          <SearchBar onSearch={setSearchTerm} />
          <FilterDropdown
            options={["Tous les articles", "Nouvelles", "Formation"]}
            value={categoryFilter}
            onChange={setCategoryFilter}
            placeholder="Filtrer par catégories"
          />
        </div>
      </div>

      <ArticleTable
        articles={paginatedArticles}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
      />
    </div>
  );
}
