"use client";

import AnnouncementButton from "@/components/guest/products/announcement-button";
import FilterSidebar from "@/components/guest/products/filter-sidebar";
import OffersCarousel from "@/components/guest/products/offers-carousel";
import ProductGrid from "@/components/guest/products/product-grid";
import SearchBar from "@/components/guest/products/search-bar";
import { useState } from "react";
import { Suspense } from "react";

export default function ProductsPage() {
  const [filters, setFilters] = useState({
    categories: [],
    localisation: [],
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Products</h1>
      <div className="flex flex-col gap-8 md:flex-row">
        <FilterSidebar
          className="w-full md:w-64"
          onFilterChange={handleFilterChange}
        />
        <div className="flex-1">
          <SearchBar className="mb-8" />
          <AnnouncementButton className="mb-8" />
          <Suspense fallback={<div>Loading products...</div>}>
            <ProductGrid filters={filters} />
          </Suspense>
          <Suspense fallback={<div>Loading offers...</div>}>
            <OffersCarousel className="mt-16" />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
