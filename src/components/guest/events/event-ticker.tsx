"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { EventDTO } from "@/types/typeDTO";
import useStore from "@/lib/stores/store";

export default function EventTicker() {
  const { events } = useStore(); // Récupération des événements
  const [activeEvents, setActiveEvents] = useState<EventDTO[]>([]);

  useEffect(() => {
    if (events) {
      const now = new Date();
      const filteredEvents = events.filter(
        (event: EventDTO) => new Date(event.endDate) > now // Garde uniquement les événements actifs
      );
      setActiveEvents(filteredEvents);
    }
  }, [events]);

  if (!activeEvents.length) return null; // N'affiche rien si aucun événement

  return (
    <div className="relative w-full overflow-hidden bg-primary py-2 text-white">
      <div className="container mx-auto flex items-center">
        <span className="mr-4 font-bold">📢 Événements :</span>
        <motion.div
          className="flex whitespace-nowrap"
          initial={{ x: "100%" }}
          animate={{ x: "-100%" }}
          transition={{
            repeat: Infinity,
            duration: activeEvents.length * 5, // Vitesse ajustée selon le nombre d'éléments
            ease: "linear",
          }}
        >
          {activeEvents.map((event, index) => (
            <Link
              key={event.id}
              href={`/events/${event.slug}`}
              className="px-4"
            >
              {event.title}
              {index < activeEvents.length - 1 && "  •  "} {/* Séparateur */}
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
