"use client";

import { Suspense, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useGetArticles } from "@/lib/query/article-query";
import useArticleStore from "@/lib/stores/article-store";
import ArticleList from "@/components/auth/articles/article-list";

export default function ArticlesPage() {
  const { articles } = useGetArticles();
  const { setArticles } = useArticleStore();

  useEffect(() => {
    if (articles) setArticles(articles);
  }, [articles, setArticles]);

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard">Accueil</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Produits</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex h-screen">
        <div className="flex-1 space-y-12 p-8">
          <h1 className="text-3xl font-bold">Liste des articles</h1>
          <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
            <ArticleList />
          </Suspense>
        </div>
      </div>
    </SidebarInset>
  );
}
