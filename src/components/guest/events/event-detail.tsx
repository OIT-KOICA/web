"use client";

import Markdown from "react-markdown";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Download, ExternalLink, Calendar, MapPin } from "lucide-react";
import { EventDTO } from "@/types/typeDTO";

interface Props {
  event: EventDTO;
}

export default function EventDetail({ event }: Props) {
  return (
    <article className="mx-auto max-w-3xl space-y-6 p-4">
      {/* 📸 Image principale */}
      <div className="flex w-full justify-center">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_PATH_URL}/media/download/image/${event.file}`}
          alt={event.title}
          width={600}
          height={400}
          className="rounded-lg object-cover shadow-md"
        />
      </div>

      {/* 🏷️ Titre */}
      <h1 className="text-center text-3xl font-bold">{event.title}</h1>

      {/* 📅 Dates de l'événement */}
      <div className="flex flex-wrap justify-center gap-4 text-muted-foreground">
        <div className="flex items-center space-x-2">
          <Calendar className="size-5 text-primary" />
          <span>
            {new Date(event.startDate).toLocaleDateString()} -{" "}
            {new Date(event.endDate).toLocaleDateString()}
          </span>
        </div>

        {/* 📍 Localisation */}
        <div className="flex items-center space-x-2">
          <MapPin className="size-5 text-primary" />
          <span>{event.localisation}</span>
        </div>
      </div>

      {/* 📝 Contenu Markdown */}
      <Markdown className="prose dark:prose-invert">
        {event.description}
      </Markdown>

      {/* 📄 Documents associés */}
      {event.documents.length > 0 && (
        <section className="border-t pt-4">
          <h3 className="mb-2 text-xl font-semibold">📄 Documents associés</h3>
          <div className="flex flex-wrap gap-3">
            {event.documents.map((doc, idx) => (
              <HoverCard key={idx}>
                <HoverCardTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <a
                      href={`${process.env.NEXT_PUBLIC_API_PATH_URL}/media/download/document/${doc.id}`}
                      download
                      className="flex items-center gap-2"
                    >
                      <Download className="size-4 text-primary" />
                      {doc.documentType}
                    </a>
                  </Button>
                </HoverCardTrigger>
                {doc.summary && (
                  <HoverCardContent className="w-72 rounded-md border bg-white p-4 shadow-md dark:bg-gray-800 dark:text-gray-200">
                    <h4 className="text-sm font-semibold">Résumé :</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      {doc.summary}
                    </p>
                  </HoverCardContent>
                )}
              </HoverCard>
            ))}
          </div>
        </section>
      )}

      {/* 🔗 Liens utiles */}
      {event.links.length > 0 && (
        <section className="border-t pt-4">
          <h3 className="mb-2 text-xl font-semibold">🔗 Liens utiles</h3>
          <div className="flex flex-wrap gap-3">
            {event.links.map((link, idx) => (
              <Button
                key={idx}
                variant="link"
                className="flex items-center gap-2"
              >
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="size-4 text-primary" />
                  Lien {idx + 1}
                </a>
              </Button>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
