"use client";

import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { SidebarInset } from "@/components/ui/sidebar";
import useStore from "@/lib/stores/store";
import AddHeader from "@/components/auth/adds/add-header";
import AddInfo from "@/components/auth/adds/add-info";

export default function AddDetailsPage() {
  const { activeAdd: add } = useStore();

  return (
    <SidebarInset>
      <div className="flex h-screen">
        <div className="flex-1 space-y-12 p-8">
          {/* En-tête de l'annonce */}
          <Suspense fallback={<Skeleton className="h-64 w-full" />}>
            <AddHeader add={add} />
          </Suspense>

          {/* Détails de l'annonce */}
          <Suspense fallback={<Skeleton className="h-96 w-full" />}>
            <AddInfo add={add} />
          </Suspense>
        </div>
      </div>
    </SidebarInset>
  );
}
