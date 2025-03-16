import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import EventHeader from "@/components/guest/events/event-header";
import EventSearchBar from "@/components/guest/events/event-search-bar";
import EventGrid from "@/components/guest/events/event-grid";

export const metadata = {
  title: "Événements - Cassava Marketplace",
  description:
    "Découvrez les événements à venir pour les entrepreneurs agricoles.",
};

export default function EventsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <EventHeader />
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:justify-between">
        <EventSearchBar />
      </div>
      <Suspense fallback={<Skeleton className="h-[600px]" />}>
        <EventGrid />
      </Suspense>
    </div>
  );
}
