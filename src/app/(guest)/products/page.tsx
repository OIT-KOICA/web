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
    categories: [] as string[],
    localisation: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const handleFilterChange = (newFilters: {
    categories: string[];
    localisation: string;
  }) => {
    setFilters(newFilters);
  };

  const handleSearchTermChange = (items: string) => {
    setSearchTerm(items);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Produits</h1>
      <div className="flex flex-col gap-8 md:flex-row">
        <FilterSidebar
          className="w-full md:w-64"
          onFilterChange={handleFilterChange}
        />
        <div className="flex-1">
          <SearchBar className="mb-8" onTermChange={handleSearchTermChange} />
          <AnnouncementButton className="mb-8" />
          <Suspense fallback={<div>Chargements des produits...</div>}>
            <ProductGrid filters={filters} searchTerm={searchTerm} />
          </Suspense>
          <Suspense fallback={<div>Chargement des propositions...</div>}>
            <OffersCarousel className="mt-16" />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
