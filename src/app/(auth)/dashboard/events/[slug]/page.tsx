"use client";

import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { SidebarInset } from "@/components/ui/sidebar";
import EventInfo from "@/components/auth/events/event-info";
import EventHeader from "@/components/auth/events/event-header";
import useStore from "@/lib/stores/store";

export default function EventDetailsPage() {
  const { activeEvent: event } = useStore();

  return (
    <SidebarInset>
      <div className="flex h-screen">
        <div className="flex-1 space-y-12 p-8">
          {/* En-tête de l'événement */}
          <Suspense fallback={<Skeleton className="h-64 w-full" />}>
            <EventHeader event={event} />
          </Suspense>

          {/* Informations de l'événement */}
          <Suspense fallback={<Skeleton className="h-96 w-full" />}>
            <EventInfo event={event} />
          </Suspense>
        </div>
      </div>
    </SidebarInset>
  );
}
