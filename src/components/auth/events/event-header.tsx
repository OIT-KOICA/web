"use client";

import { Button } from "@/components/ui/button";
import { EventDTO } from "@/types/typeDTO";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface EventHeaderProps {
  event: EventDTO | null;
}

export default function EventHeader({ event }: EventHeaderProps) {
  if (!event) return null;

  return (
    <div className="flex items-center justify-between border-b pb-4">
      <div className="flex items-center space-x-4">
        {event.file && (
          <Image
            src={`${process.env.NEXT_PUBLIC_API_PATH_URL}/media/download/image/${event.file}`}
            alt={event.title}
            width={100}
            height={100}
            className="rounded-lg object-cover"
          />
        )}
      </div>
      <Link href="/dashboard/events">
        <Button variant="outline">
          <ArrowLeft className="mr-2 size-4" />
          Retour à la liste
        </Button>
      </Link>
    </div>
  );
}
