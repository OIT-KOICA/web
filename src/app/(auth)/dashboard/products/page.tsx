"use client";

import { Suspense, useEffect } from "react";
import ProductList from "@/components/auth/products/product-list";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetProductsByUserID } from "@/lib/query/product-query";
import useProductStore from "@/lib/stores/product-store";
import { useSession } from "next-auth/react";
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

export default function ProductsPage() {
  const { data: session } = useSession();

  const { products } = useGetProductsByUserID(session?.accessToken);
  const { setProducts } = useProductStore();

  useEffect(() => {
    if (products) setProducts(products);
  }, [products, setProducts]);

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
          <h1 className="text-3xl font-bold">Ma liste de produit</h1>
          <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
            <ProductList />
          </Suspense>
        </div>
      </div>
    </SidebarInset>
  );
}
