"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/lib/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useCreateEvent, useUpdateEvent } from "@/lib/query/event-query";
import {
  compressDocx,
  compressFile,
  compressImage,
  compressPDF,
  compressXls,
  isFileSizeValid,
} from "@/lib/utils";
import useStore from "@/lib/stores/store";
import { useGetProfile } from "@/lib/query/configuration-query";
import EventLocationSelect from "./event-location-select";
import EventDocumentsField from "./event-documents-field";
import EventLinksField from "./event-links-field";
import { EventFormValues, eventSchema } from "@/schemas/event-schema";

// Chargement dynamique de l'éditeur Markdown pour éviter les erreurs SSR
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function EventCreationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const createEvent = useCreateEvent();
  const updateEvent = useUpdateEvent();
  const { activeEvent: event, edit } = useStore();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { user } = useGetProfile();

  const initialDocuments =
    edit && event && event.documents
      ? event.documents.map((doc) => ({
          documentFile: doc.id, // URL du document existant
          documentType: doc.documentType,
          summary: doc.summary || "",
          user: doc.user || user?.username || "Inconnu",
        }))
      : [];

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues:
      edit && event
        ? {
            title: event.title,
            description: event.description,
            startDate: event.startDate,
            endDate: event.endDate,
            localisation: event.localisation,
            documents: initialDocuments,
            links: event.links || [],
            file: event.file || undefined,
          }
        : {
            title: "",
            description: "",
            startDate: "",
            endDate: "",
            localisation: "",
            file: undefined,
            documents: [],
            links: [],
          },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!isFileSizeValid(file)) {
        toast({
          title: "Erreur",
          description: "Le fichier ne doit pas dépasser 10 Mo.",
          variant: "destructive",
        });
        return;
      }

      let compressedFile = file;

      if (file.type.includes("image")) {
        compressedFile = await compressImage(file);
      } else if (file.type === "application/pdf") {
        compressedFile = await compressPDF(file);
      } else if (
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        file.type === "application/msword"
      ) {
        compressedFile = await compressDocx(file);
      } else if (
        file.type === "application/vnd.ms-excel" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        compressedFile = await compressXls(file);
      } else {
        compressedFile = await compressFile(file);
      }

      if (!(compressedFile instanceof File)) {
        compressedFile = new File([compressedFile], file.name, {
          type: file.type,
        });
      }

      form.setValue("file", compressedFile);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: EventFormValues) => {
    setIsSubmitting(true);
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("startDate", data.startDate);
    formData.append("endDate", data.endDate);
    formData.append("localisation", data.localisation);
    if (data.file instanceof File) formData.append("file", data.file);

    // Ajout des documents
    data.documents?.forEach((doc, index) => {
      if (doc.documentFile instanceof File) {
        formData.append(`documents[${index}].[documentFile]`, doc.documentFile);
        formData.append(`documents[${index}].[documentType]`, doc.documentType);
        formData.append(`documents[${index}].[summary]`, doc.summary || "");
        formData.append(
          `documents[${index}].[user]`,
          user?.username || "Inconnu"
        );
      } else if (typeof doc.documentFile === "string") {
        // Cas de document existant
        formData.append(`documents[${index}].existingFile`, doc.documentFile);
        formData.append(`documents[${index}].documentType`, doc.documentType);
        formData.append(`documents[${index}].summary`, doc.summary || "");
        formData.append(
          `documents[${index}].user`,
          doc.user || user?.username || "Inconnu"
        );
      }
    });

    // Ajout des liens
    data.links?.forEach((link, index) => {
      formData.append(`links[${index}]`, link);
    });

    try {
      if (edit && event) {
        await updateEvent.mutateAsync({
          slug: event.slug,
          eventData: formData,
        });
      } else {
        await createEvent.mutateAsync({ eventData: formData });
      }

      toast({
        title: edit && event ? "Événement modifié" : "Événement créé",
        description: "L'opération a été un succès",
      });
      router.push("/dashboard/events");
    } catch (error) {
      console.error("Erreur création événement", error);
      toast({
        title: "Erreur",
        description: "Échec de l'opération",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 py-4"
          >
            {/* Titre */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre</FormLabel>
                  <FormControl>
                    <Input placeholder="Titre de l'évènement" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Éditeur Markdown avec génération de texte */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <MDEditor
                      value={field.value}
                      onChange={field.onChange}
                      height={250}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-wrap gap-10">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date et heure de début</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date et heure de fin</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Image */}
            <FormField
              control={form.control}
              name="file"
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      {...field}
                    />
                  </FormControl>

                  {previewImage ? (
                    <div className="mt-2">
                      <FormLabel>Aperçu de l&apos;image :</FormLabel>
                      <Image
                        src={previewImage}
                        alt="Aperçu"
                        width={100}
                        height={100}
                        className="mt-2 rounded-md"
                      />
                    </div>
                  ) : event?.file && edit ? (
                    <div className="mt-2">
                      <FormLabel>Aperçu existant :</FormLabel>
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_PATH_URL}/media/download/image/${event.file}`} // Chemin vers l'image existante
                        alt="Aperçu de l'image existante"
                        width={100}
                        height={100}
                        className="rounded-md border object-cover"
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                  ) : null}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Zone de localisation */}
            <FormField
              control={form.control}
              name="localisation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zone de localisation</FormLabel>
                  <FormControl>
                    <EventLocationSelect
                      onValueChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Documents */}
            <EventDocumentsField />

            {/* Liens */}
            <EventLinksField />

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" />}
              {edit && event ? "Modifier l'évènement" : "Créer l'évènement"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
