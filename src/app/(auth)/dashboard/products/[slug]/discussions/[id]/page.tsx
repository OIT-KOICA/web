"use client";

import { Suspense, use } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import useProductStore from "@/lib/stores/product-store";
import MessageScroller from "@/components/auth/discussions/message-scroller";
import MessageInput from "@/components/auth/discussions/message-input";
import { SidebarInset } from "@/components/ui/sidebar";

export default function DiscussionView({
  params,
}: {
  params: Promise<{ productSlug: string; discussionId: string }>;
}) {
  const discussion = useProductStore((state) => state.activeDiscussion);
  const { productSlug } = use(params);

  return (
    <SidebarInset>
      <div className="flex h-screen">
        <div className="flex-1 space-y-12 p-8">
          <div className="flex items-center justify-between">
            <Link href={`/dashboard/products/${productSlug}`}>
              <Button variant="ghost">
                <ArrowLeft className="mr-2 size-4" />
                Retour aux produits
              </Button>
            </Link>
            <h1 className="text-xl font-bold">
              Discussion avec {discussion?.user.name}
            </h1>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Messages</CardTitle>
            </CardHeader>
            <CardContent className="flex h-[600px] flex-col">
              <Suspense fallback={<Skeleton className="grow" />}>
                <MessageScroller />
              </Suspense>
              <MessageInput />
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarInset>
  );
}
