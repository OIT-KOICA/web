"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useToast } from "@/lib/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useDeleteEvent } from "@/lib/query/event-query";
import ConfirmDialog from "../confirm-dialog";
import useStore from "@/lib/stores/store";
import { EventDTO } from "@/types/typeDTO";

interface EventTableProps {
  events: EventDTO[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  sortOrder: "asc" | "desc";
  onSortOrderChange: (order: "asc" | "desc") => void;
}

export default function EventTable({
  events,
  currentPage,
  totalPages,
  onPageChange,
  sortOrder,
  onSortOrderChange,
}: EventTableProps) {
  const [eventToDelete, setEventToDelete] = useState<EventDTO | null>(null);
  const { setActiveEvent, setEdit } = useStore();
  const { toast } = useToast();
  const router = useRouter();
  const deleteEvent = useDeleteEvent();

  const handleDelete = async () => {
    if (eventToDelete) {
      try {
        await deleteEvent.mutateAsync({
          slug: eventToDelete.slug,
        });

        toast({
          title: "Événement supprimé avec succès",
          description: "L'événement a été retiré de la liste.",
        });

        router.push("/dashboard/events");
      } catch (error) {
        console.error("Failed to delete event:", error);

        toast({
          title: "Erreur",
          description:
            "Échec lors de la suppression de l'événement. Veuillez réessayer",
          variant: "destructive",
        });
      } finally {
        setEventToDelete(null);
      }
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table className="w-full min-w-[600px]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">
              <Button
                variant="ghost"
                onClick={() =>
                  onSortOrderChange(sortOrder === "asc" ? "desc" : "asc")
                }
              >
                Titre
                <ArrowUpDown className="ml-2 size-4" />
              </Button>
            </TableHead>
            <TableHead>Localisation</TableHead>
            <TableHead>Date de début</TableHead>
            <TableHead>Date de fin</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                Aucun événement trouvé
              </TableCell>
            </TableRow>
          ) : (
            events.map((event) => {
              const isExpired = new Date(event.endDate) < new Date();
              return (
                <TableRow
                  key={event.slug}
                  className={isExpired ? "opacity-50" : ""}
                >
                  <TableCell className="font-medium">{event.title}</TableCell>
                  <TableCell>{event.localisation}</TableCell>
                  <TableCell>
                    {new Date(event.startDate).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {new Date(event.endDate).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="size-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          asChild
                          onClick={() => setActiveEvent(event)}
                        >
                          <Link href={`/dashboard/events/${event.slug}`}>
                            Consulter
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          asChild
                          onClick={() => {
                            setEdit(true);
                            setActiveEvent(event);
                          }}
                        >
                          <Link href={`/dashboard/events/create`}>
                            Modifier
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => setEventToDelete(event)}
                        >
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>

      <div className="mt-4 flex justify-center space-x-2">
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Précédent
        </Button>
        <span className="self-center">
          Page {currentPage} sur {totalPages}
        </span>
        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Suivant
        </Button>
      </div>

      <ConfirmDialog
        isOpen={!!eventToDelete}
        onClose={() => setEventToDelete(null)}
        onConfirm={handleDelete}
        title="Supprimer l'événement"
        description={`Êtes-vous sûr de vouloir supprimer : ${eventToDelete?.title} ? Cette action est irréversible.`}
      />
    </div>
  );
}
