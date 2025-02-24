import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import BlogHeader from "@/components/guest/blog/blog-header";
import SearchBar from "@/components/guest/blog/search-bar";
import CategoryFilter from "@/components/guest/blog/category-filter";
import ArticleGrid from "@/components/guest/blog/article-grid";

export const metadata = {
  title: "Blog - Cassava Marketplace",
  description:
    "Découvrez des ressources précieuses pour votre entreprise agricole.",
};

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <BlogHeader />
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:justify-between">
        <SearchBar />
        <CategoryFilter />
      </div>
      <Suspense fallback={<Skeleton className="h-[600px]" />}>
        <ArticleGrid />
      </Suspense>
    </div>
  );
}
