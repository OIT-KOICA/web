"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import useProductStore from "@/lib/stores/product-store";
import { ProductDTO } from "@/types/type";
import SearchBar from "./search-bar";
import FilterDropdown from "../filter-dropdown";
import ProductTable from "./product-table";
import { useRouter } from "next/navigation";

const ITEMS_PER_PAGE = 10;

export default function ProductList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const products = useProductStore((state) => state.products);
  const { setEdit } = useProductStore();
  const router = useRouter();

  const filteredAndSortedProducts = useMemo(() => {
    if (!products) return [];

    return products
      .filter((product: ProductDTO) => {
        const matchesSearch =
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = !categoryFilter
          ? product
          : product.category === categoryFilter;

        return matchesSearch && matchesCategory;
      })
      .sort((a: { name: string }, b: { name: string }) => {
        return sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      });
  }, [products, searchTerm, categoryFilter, sortOrder]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedProducts.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );
  }, [filteredAndSortedProducts, currentPage]);

  const totalPages = Math.ceil(
    filteredAndSortedProducts.length / ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-4 p-4 sm:p-6">
      <div className="flex flex-col items-center justify-between space-y-3 sm:flex-row sm:space-y-0">
        <Button
          onClick={() => {
            setEdit(false);
            router.push("/dashboard/products/create");
          }}
          className="w-full sm:w-auto"
        >
          <Plus className="mr-2 size-4" /> Créer un produit
        </Button>

        <div className="flex w-full flex-col space-y-2 sm:w-auto sm:flex-row sm:space-x-2 sm:space-y-0">
          <SearchBar onSearch={setSearchTerm} />
          <FilterDropdown
            options={[
              "Tous les produits",
              "Manioc",
              "Mais",
              "Poulet",
              "Transport",
              "Location",
              "Autre",
            ]}
            value={categoryFilter}
            onChange={setCategoryFilter}
            placeholder="Filtrer par catégories"
          />
        </div>
      </div>

      <ProductTable
        products={paginatedProducts}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
      />
    </div>
  );
}
