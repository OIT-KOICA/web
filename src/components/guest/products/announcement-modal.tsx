"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCreateAdd } from "@/lib/query/configuration-query";
import Select from "react-select";

// 🛠️ Définition du schéma de validation
const announcementSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  phone: z.string().regex(/^\+?[0-9]{8,14}$/, "Numéro de téléphone invalide"),
  location: z.string().min(2, "Veuillez préciser votre localisation"),
  description: z.string().min(5, "Décrivez votre besoin en détail"),
  categories: z.array(z.string()).nonempty("Choisissez au moins une catégorie"),
});

type AnnouncementForm = z.infer<typeof announcementSchema>;

interface AnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AnnouncementModal({
  isOpen,
  onClose,
}: AnnouncementModalProps) {
  const form = useForm<AnnouncementForm>({
    resolver: zodResolver(announcementSchema),
    defaultValues: {
      name: "",
      phone: "",
      location: "",
      description: "",
      categories: [],
    },
  });

  const createAdd = useCreateAdd();

  const onSubmit = (data: AnnouncementForm) => {
    createAdd.mutate(data);
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg md:max-w-2xl lg:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Poster une annonce</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Votre nom</FormLabel>
                  <FormControl>
                    <Input placeholder="Votre nom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numéro de téléphone</FormLabel>
                  <FormControl>
                    <Input placeholder="Numéro WhatsApp de préférence (Ex: +237XXXXXXXXX)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Localisation</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Yaoundé, Douala..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Catégories</FormLabel>
                  <Select
                    isMulti
                    options={[
                      { value: "MANIOC", label: "Manioc" },
                      { value: "VOLAILLE", label: "Volaille" },
                      { value: "MAIS", label: "Maïs" },
                      { value: "TRANSPORT", label: "Transport" },
                      { value: "LOCATION", label: "Location" },
                      { value: "AUTRE", label: "Autre" },
                    ]}
                    onChange={(selected) =>
                      field.onChange(selected.map((option) => option.value))
                    }
                    value={field.value.map((cat) => ({
                      value: cat,
                      label: cat,
                    }))}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Décrivez votre besoin..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Soumettre votre annonce</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
