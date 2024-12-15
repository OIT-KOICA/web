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

const announcementSchema = z.object({
  name: z.string().min(2, "Le nom doit être sur plus de 2 caractères"),
  phone: z.string().regex(/^\+?[0-9]{8,14}$/, "Numéro de téléphone invalide"),
  location: z
    .string()
    .min(2, "Votre zone de localisation doit être sur plus de 2 caractères"),
  description: z
    .string()
    .min(5, "Description doit tenir sur plus de 5 caractères"),
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
    },
  });
  const createAdd = useCreateAdd();

  const onSubmit = (data: AnnouncementForm) => {
    createAdd.mutate({
      name: data.name,
      phone: data.phone,
      location: data.location,
      description: data.description,
    });
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
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
                  <FormLabel>Votre numéro de téléphone</FormLabel>
                  <FormControl>
                    <Input placeholder="Votre numéro de télephone" {...field} />
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
                  <FormLabel>Votre zone de localisation</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Votre zone de localisation"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description de votre besoin</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Décrire votre besoin (ex., J'ai besoin de 40 tonnes de manioc dans la ville de Bertoua...)"
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
