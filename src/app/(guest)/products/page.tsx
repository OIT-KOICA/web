"use client";

import AnnouncementButton from "@/components/guest/products/announcement-button";
import FilterSidebar from "@/components/guest/products/filter-sidebar";
import OffersCarousel from "@/components/guest/products/offers-carousel";
import ProductGrid from "@/components/guest/products/product-grid";
import SearchBar from "@/components/guest/products/search-bar";
import { useState } from "react";
import { Suspense } from "react";
import { motion } from 'framer-motion'

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
    // eslint-disable-next-line tailwindcss/no-custom-classname
    <div className="dark:from-cassava-950 dark:to-maize-950 container mx-auto min-h-screen px-4 py-8">
      <motion.h1
        className="text-gradient mb-8 text-center text-4xl font-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Produits
      </motion.h1>
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
