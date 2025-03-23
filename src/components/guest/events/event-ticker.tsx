"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { EventDTO } from "@/types/typeDTO";
import useStore from "@/lib/stores/store";

export default function EventTicker() {
  const { events } = useStore();
  const [activeEvents, setActiveEvents] = useState<EventDTO[]>([]);

  useEffect(() => {
    if (events) {
      const now = new Date();
      const filteredEvents = events.filter(
        (event: EventDTO) => new Date(event.endDate) > now
      );
      setActiveEvents(filteredEvents);
    }
  }, [events]);

  if (!activeEvents.length) return null;

  // Génère le contenu à défiler
  const tickerContent = activeEvents.map((event, index) => (
    <Link
      key={`${event.id}-${index}`}
      href={`/events/${event.slug}`}
      className="mx-4 hover:underline"
    >
      {event.title}
      {index < activeEvents.length - 1 && <span className="mx-2">•</span>}
    </Link>
  ));

  return (
    <div className="relative w-full overflow-hidden bg-primary py-2 text-white">
      <div className="container mx-auto flex items-center">
        <span className="mr-4 whitespace-nowrap font-bold">
          📢 Événements :
        </span>
        <div className="relative flex-1 overflow-hidden">
          <motion.div
            className="flex whitespace-nowrap"
            initial={{ x: "100%" }}
            animate={{ x: "-100%" }}
            transition={{
              repeat: Infinity,
              duration: 20, // ⏱️ Vitesse constante
              ease: "linear",
            }}
          >
            <div className="flex">{tickerContent}</div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
