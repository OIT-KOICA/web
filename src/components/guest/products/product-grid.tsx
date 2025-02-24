"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ProductDTO } from "@/types/type";
import { useGetProducts } from "@/lib/query/product-query";
import ProductCard from "./product-card";
import { useInView } from "react-intersection-observer";
import { Loader2 } from "lucide-react";

interface ProductGridProps {
  filters: {
    categories: string[];
    localisation: string;
  };
  searchTerm: string;
}

export default function ProductGrid({ filters, searchTerm }: ProductGridProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetProducts();
  const { ref, inView } = useInView();
  const [filteredProducts, setFilteredProducts] = useState<ProductDTO[]>([]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  // Filtrer les produits en fonction des filtres et du terme de recherche
  useEffect(() => {
    if (!data) return;

    const allProducts = data.pages.flatMap((page) => page.products);
    const filtered = allProducts.filter((product) => {
      return (
        (filters.categories.length === 0 || filters.categories.includes(product.category)) &&
        (filters.localisation === "" || product.localisation === filters.localisation) &&
        (searchTerm === "" ||
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.company.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });

    setFilteredProducts(filtered);
  }, [data, filters, searchTerm]);

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>

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
