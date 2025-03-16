"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGetEventsByUserID } from "@/lib/query/event-query";
import { useInView } from "react-intersection-observer";
import { Loader2 } from "lucide-react";
import { EventDTO } from "@/types/typeDTO";
import useStore from "@/lib/stores/store";
import EventTable from "./event-table";
import EventSearchBar from "./event-search-bar";

export default function EventList() {
  const { events, setEdit, totalPages } = useStore();
  const { fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetEventsByUserID();
  const { ref, inView } = useInView();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState<EventDTO[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  useEffect(() => {
    const filtered = events.filter((event) => {
      return (
        searchTerm === "" ||
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    setFilteredEvents(filtered);
  }, [events, searchTerm]);

  return (
    <div className="space-y-4 p-4 sm:p-6">
      <div className="flex flex-col items-center justify-between space-y-3 sm:flex-row sm:space-y-0">
        <Button
          onClick={() => {
            setEdit(false);
            router.push("/dashboard/events/create");
          }}
          className="w-full sm:w-auto"
        >
          <Plus className="mr-2 size-4" /> Ajouter un événement
        </Button>

        <div className="flex w-full flex-col space-y-2 sm:w-auto sm:flex-row sm:space-x-2 sm:space-y-0">
          <EventSearchBar onSearch={setSearchTerm} />
        </div>
      </div>

      <EventTable
        events={filteredEvents}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        sortOrder="asc"
        onSortOrderChange={() => {}}
      />

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
