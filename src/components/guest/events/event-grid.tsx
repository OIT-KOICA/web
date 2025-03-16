"use client";

import { useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import EventCard from "./event-card";
import { useGetEvents } from "@/lib/query/event-query";
import { useInView } from "react-intersection-observer";
import { Loader2 } from "lucide-react";
import useStore from "@/lib/stores/store";

export default function EventGrid() {
  const { events } = useStore();
  const { fetchNextPage, hasNextPage, isFetchingNextPage } = useGetEvents();
  const { ref, inView } = useInView();
  const { searchTerm } = useStore();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  // Filtrage et recherche côté client avec useMemo
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        searchTerm === "" ||
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesSearch;
    });
  }, [events, searchTerm]);

  return (
    <div>
      {filteredEvents.length === 0 && (
        <p className="text-center">
          Aucun événement ne correspond à votre recherche.
        </p>
      )}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredEvents.map((event) => (
          <EventCard key={event.slug} event={event} />
        ))}
      </div>

      {hasNextPage && (
        <div ref={ref} className="mt-8 text-center">
          {isFetchingNextPage ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Button onClick={() => fetchNextPage()}>Charger plus...</Button>
          )}
        </div>
      )}
    </div>
  );
}
