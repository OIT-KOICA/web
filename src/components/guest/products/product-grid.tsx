"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ProductDTO } from "@/lib/type";
import { useGetProducts } from "@/lib/query/product-query";
import ProductCard from "./product-card";
import { useInView } from "react-intersection-observer";
import { Loader2 } from "lucide-react";

const PRODUCTS_PER_PAGE = 20;
const PRODUCTS_PER_LOAD = 6;

interface ProductGridProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filters: any; // Replace 'any' with your actual filter type
}

export default function ProductGrid({ filters }: ProductGridProps) {
  const { products } = useGetProducts();
  const [allProducts, setAllProducts] = useState<ProductDTO[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<ProductDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadedAllForPage, setLoadedAllForPage] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (products) setAllProducts(products);
  }, [products]);

  const loadMoreProducts = useCallback(async () => {
    if (loading || loadedAllForPage) return;

    setLoading(true);
    const startIndex = displayedProducts.length;
    const endIndex = Math.min(
      startIndex + PRODUCTS_PER_LOAD,
      currentPage * PRODUCTS_PER_PAGE
    );

    setDisplayedProducts((prev) => [
      ...prev,
      ...allProducts.slice(startIndex, endIndex),
    ]);

    setLoading(false);

    if (endIndex >= currentPage * PRODUCTS_PER_PAGE) {
      setLoadedAllForPage(true);
    }
  }, [
    loading,
    loadedAllForPage,
    displayedProducts.length,
    currentPage,
    allProducts,
  ]);

  useEffect(() => {
    if (inView) {
      loadMoreProducts();
    }
  }, [inView, loadMoreProducts]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    setDisplayedProducts([]);
    setLoadedAllForPage(false);
    window.scrollTo(0, 0);
  };

  // Apply filters
  const filteredProducts = allProducts.filter((product) => {
    return (
      ((filters.categories.length === 0 ||
        filters.categories.includes(product.category)) &&
        (filters.localisation === "" ||
          product.localisation === filters.localisation)) ||
      product
    );
  });

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  /*const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );*/

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
      {!loadedAllForPage && (
        <div ref={ref} className="mt-8 flex justify-center">
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Button onClick={loadMoreProducts}>Load More</Button>
          )}
        </div>
      )}
      {loadedAllForPage && (
        <div className="mt-8 flex justify-center space-x-2">
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Precedent
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              onClick={() => handlePageChange(page)}
              variant={currentPage === page ? "default" : "outline"}
            >
              {page}
            </Button>
          ))}
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Suivant
          </Button>
        </div>
      )}
    </div>
  );
}