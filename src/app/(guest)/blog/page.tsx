import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import BlogHeader from "@/components/guest/blog/blog-header";
import SearchBar from "@/components/guest/blog/search-bar";
import CategoryFilter from "@/components/guest/blog/category-filter";
import ArticleGrid from "@/components/guest/blog/article-grid";

export const metadata = {
  title: "Blog - Cassava Marketplace",
  description:
    "Resources and articles to grow your agricultural and entrepreneurial activities.",
};

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <BlogHeader />
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <SearchBar />
        <CategoryFilter />
      </div>
      <Suspense fallback={<Skeleton className="w-full h-[600px]" />}>
        <ArticleGrid />
      </Suspense>
    </div>
  );
}
