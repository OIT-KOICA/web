"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useCreateAdd, useGetProfile } from "@/lib/query/configuration-query";
import Select from "react-select";
import { AnnouncementForm, announcementSchema } from "@/schemas/add-schema";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface AnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AnnouncementModal({
  isOpen,
  onClose,
}: AnnouncementModalProps) {
  const { user } = useGetProfile();

  const form = useForm<AnnouncementForm>({
    resolver: zodResolver(announcementSchema),
    defaultValues: {
      name: user ? user.username : "",
      phone: "",
      location: "",
      title: "",
      email: user ? user.email : "",
      description: "",
      categories: [],
    },
  });

  const createAdd = useCreateAdd();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: AnnouncementForm) => {
    setIsSubmitting(true);
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("phone", data.phone);
    formData.append("location", data.location);
    formData.append("title", data.title);
    formData.append("email", data.email);
    formData.append("description", data.description);
    formData.append("categories", JSON.stringify(data.categories));

    await createAdd.mutateAsync({ data: formData });
    form.reset();
    setIsSubmitting(false);
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
                    <Input
                      placeholder="Votre nom"
                      readOnly={!!user}
                      className={user ? "cursor-not-allowed bg-muted" : ""}
                      {...field}
                    />
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
                    <Input
                      placeholder="Numéro WhatsApp de préférence (Ex: +237XXXXXXXXX)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse mail</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: johndoe@gmail.com"
                      readOnly={!!user}
                      className={user ? "cursor-not-allowed bg-muted" : ""}
                      {...field}
                    />
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
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre de l&apos;annonce</FormLabel>
                  <FormControl>
                    <Input placeholder="J'ai besoin..." {...field} />
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
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" />}
              Soumettre votre annonce
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
