"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, FileText, MapPin, Link2, Download } from "lucide-react";
import Markdown from "react-markdown";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { EventDTO } from "@/types/typeDTO";

interface EventInfoProps {
  event: EventDTO | null;
}

export default function EventInfo({ event }: EventInfoProps) {
  if (!event) return null;

  return (
    <Card className="border border-gray-200 shadow-lg dark:border-gray-700">
      <CardHeader className="flex flex-col items-center space-y-2">
        <Avatar className="size-16">
          {event.file ? (
            <AvatarImage
              src={`${process.env.NEXT_PUBLIC_API_PATH_URL}/media/download/image/${event.file}`}
              alt={event.title}
            />
          ) : (
            <AvatarFallback>
              {event.title.charAt(0).toUpperCase()}
            </AvatarFallback>
          )}
        </Avatar>
        <CardTitle className="text-center text-2xl font-bold">
          {event.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Détails de l'événement */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex items-center space-x-2">
            <FileText className="size-5 text-primary" />
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Titre :</strong> {event.title}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Calendar className="size-5 text-primary" />
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Début :</strong>{" "}
              {new Date(event.startDate).toLocaleString()}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Calendar className="size-5 text-primary" />
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Fin :</strong> {new Date(event.endDate).toLocaleString()}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <MapPin className="size-5 text-primary" />
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Localisation :</strong> {event.localisation}
            </p>
          </div>
        </div>

        {/* Contenu Markdown */}
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Description :
          </h3>
          <Markdown className="prose dark:prose-invert">
            {event.description}
          </Markdown>
        </div>

        {/* Documents joints */}
        {event.documents.length > 0 && (
          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              📄 Documents associés :
            </h3>
            <ul className="mt-2 space-y-2">
              {event.documents.map((doc, index) => (
                <HoverCard key={index}>
                  <HoverCardTrigger asChild>
                    <li className="flex items-center space-x-2 rounded-md p-2 transition hover:bg-gray-100 dark:hover:bg-gray-800">
                      <Download className="size-5 text-primary" />
                      <a
                        href={`${process.env.NEXT_PUBLIC_API_PATH_URL}/media/download/document/${doc.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline dark:text-blue-400"
                      >
                        {doc.documentType}
                      </a>
                    </li>
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
            </ul>
          </div>
        )}

        {/* Liens associés */}
        {event.links.length > 0 && (
          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              🔗 Liens utiles :
            </h3>
            <div className="mt-2 space-y-2">
              {event.links.map((link, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="flex w-full items-center space-x-2"
                  onClick={() => window.open(link, "_blank")}
                >
                  <Link2 className="size-5" />
                  <span className="max-w-[250px] truncate">{link}</span>
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
