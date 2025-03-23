"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { EventDTO } from "@/types/typeDTO";
import useStore from "@/lib/stores/store";
import Markdown from "react-markdown";
import { Calendar, MapPin } from "lucide-react";

interface Props {
  event: EventDTO;
}

export default function EventCard({ event }: Props) {
  const { setActiveEvent } = useStore();
  const router = useRouter();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Card className="h-full overflow-hidden shadow-md">
        <div className="relative h-48">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_PATH_URL}/media/download/image/${event.file}`}
            alt={event.title}
            fill
            className="object-cover"
          />
        </div>
        <CardContent className="space-y-2 p-4">
          <h3 className="text-xl font-semibold">{event.title}</h3>

          {/* 📅 Dates de l'événement */}
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Calendar className="size-4 text-primary" />
            <span>
              {new Date(event.startDate).toLocaleDateString()} -{" "}
              {new Date(event.endDate).toLocaleDateString()}
            </span>
          </div>

          {/* 📍 Localisation */}
          <div className="flex items-center space-x-2 text-muted-foreground">
            <MapPin className="size-4 text-primary" />
            <span>{event.localisation}</span>
          </div>

          <Markdown className="prose dark:prose-invert">
            {event.description.length > 100
              ? `${event.description.slice(0, 100)}...`
              : event.description}
          </Markdown>
        </CardContent>
        <CardFooter className="p-4">
          <Button
            className="w-full bg-gradient-to-r from-cassava-500 to-maize-500 text-white hover:from-cassava-600 hover:to-maize-600"
            onClick={() => {
              setActiveEvent(event);
              router.push(`/events/${event.slug}`);
            }}
          >
            En savoir plus
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
