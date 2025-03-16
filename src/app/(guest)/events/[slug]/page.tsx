"use client";

import EventDetail from "@/components/guest/events/event-detail";
import useStore from "@/lib/stores/store";
import { useEffect, useState } from "react";

export default function EventDetailPage() {
  const { activeEvent: event } = useStore();
  const [currentEvent, setCurrentEvent] = useState(event);

  useEffect(() => {
    if (event) setCurrentEvent(event);
  }, [event]);

  if (!currentEvent) {
    return (
      <div className="text-center text-red-500">Événement non trouvé.</div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <EventDetail event={currentEvent} />
    </div>
  );
}
