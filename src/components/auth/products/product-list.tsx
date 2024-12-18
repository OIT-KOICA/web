"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import useProductStore from "@/lib/stores/product-store";
import { ProductDTO } from "@/lib/type";
import SearchBar from "./search-bar";
import FilterDropdown from "./filter-dropdown";
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
        if (sortOrder === "asc") {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button
          onClick={() => {
            setEdit(false);
            router.push("/dashboard/products/create");
          }}
        >
          <Plus className="mr-2 size-4" /> Créer un produit
        </Button>
        <div className="flex space-x-2">
          <SearchBar onSearch={setSearchTerm} />
          <FilterDropdown
            options={[
              "Tous les produits",
              "Manioc",
              "Maïs",
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
