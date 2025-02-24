"use client";

import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import useArticleStore from "@/lib/stores/article-store";
import { SidebarInset } from "@/components/ui/sidebar";
import ArticleInfo from "@/components/auth/articles/article-info";
import ArticleHeader from "@/components/auth/articles/article-header";

export default function ArticleDetailsPage() {
  const article = useArticleStore((state) => state.activeArticle);

  return (
    <SidebarInset>
      <div className="flex h-screen">
        <div className="flex-1 space-y-12 p-8">
          {/* En-tête de l'article */}
          <Suspense fallback={<Skeleton className="h-64 w-full" />}>
            <ArticleHeader article={article} />
          </Suspense>

          {/* Informations de l'article */}
          <Suspense fallback={<Skeleton className="h-96 w-full" />}>
            <ArticleInfo article={article} />
          </Suspense>
        </div>
      </div>
    </SidebarInset>
  );
}
