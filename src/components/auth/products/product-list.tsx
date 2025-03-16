"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import SearchBar from "./search-bar";
import FilterDropdown from "../filter-dropdown";
import ProductTable from "./product-table";
import { useRouter } from "next/navigation";
import { useGetProductsByUserID } from "@/lib/query/product-query";
import { useInView } from "react-intersection-observer";
import { Loader2 } from "lucide-react";
import { ProductDTO } from "@/types/typeDTO";
import useStore from "@/lib/stores/store";

export default function ProductList() {
  const { products, setEdit, totalPages } = useStore();
  const { fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetProductsByUserID();
  const { ref, inView } = useInView();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<ProductDTO[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  // Filtrer les produits en fonction des filtres et du terme de recherche
  useEffect(() => {
    const filtered = products.filter((product) => {
      return (
        (categoryFilter === null || product.category === categoryFilter) &&
        (searchTerm === "" ||
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });

    setFilteredProducts(filtered);
  }, [searchTerm, categoryFilter, products]);

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
              "Volaille",
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
        products={filteredProducts}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        sortOrder="asc"
        onSortOrderChange={() => {}}
      />

      {hasNextPage && (
        <div ref={ref} className="mt-8 flex justify-center">
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
