"use client";

import { Suspense, use, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import useProductStore from "@/lib/stores/product-store";
import ProductHeader from "@/components/auth/products/product-header";
import ProductInfo from "@/components/auth/products/product-info";
import PriceVariationsTable from "@/components/auth/products/price-variations-table";
import DiscussionsTable from "@/components/auth/products/discussions-table";
import { SidebarInset } from "@/components/ui/sidebar";
import { useGetDiscussionsBySlug } from "@/lib/query/discussion-query";

export default function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const product = useProductStore((state) => state.activeProduct);
  const { setDiscussions } = useProductStore();
  const { discussions } = useGetDiscussionsBySlug({
    slug: slug,
  });

  useEffect(() => {
    if (discussions) setDiscussions(discussions);
  }, [discussions, setDiscussions]);

  return (
    <SidebarInset>
      <div className="flex h-screen">
        <div className="flex-1 space-y-12 p-8">
          <Suspense fallback={<Skeleton className="h-64 w-full" />}>
            <ProductHeader name={product?.name} file={product?.file} />
          </Suspense>
          <div className="grid gap-8 md:grid-cols-2">
            <Suspense fallback={<Skeleton className="h-96 w-full" />}>
              <ProductInfo product={product} />
            </Suspense>
            <Suspense fallback={<Skeleton className="h-96 w-full" />}>
              <PriceVariationsTable variations={product?.pricings} />
            </Suspense>
          </div>
          <Suspense fallback={<Skeleton className="h-96 w-full" />}>
            <DiscussionsTable slug={product?.slug} />
          </Suspense>
        </div>
      </div>
    </SidebarInset>
  );
}
