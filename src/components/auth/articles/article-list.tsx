"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import ArticleTable from "./article-table";
import SearchBar from "./search-bar";
import FilterDropdown from "../filter-dropdown";
import { useGetArticlesByUserID } from "@/lib/query/article-query";
import { useInView } from "react-intersection-observer";
import { Loader2 } from "lucide-react";
import { ArticleDTO } from "@/types/typeDTO";
import useStore from "@/lib/stores/store";

export default function ArticleList() {
  const { articles, setEdit, totalPages } = useStore();
  const { fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetArticlesByUserID();
  const { ref, inView } = useInView();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [filteredArticles, setFilteredArticles] = useState<ArticleDTO[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  useEffect(() => {
    const filtered = articles.filter((article) => {
      return (
        (categoryFilter === null || article.category === categoryFilter) &&
        (searchTerm === "" ||
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });

    setFilteredArticles(filtered);
  }, [articles, searchTerm, categoryFilter]);

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
          <Plus className="mr-2 size-4" /> Créer une documentation
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
        articles={filteredArticles}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        sortOrder="asc"
        onSortOrderChange={() => {}}
      />

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
