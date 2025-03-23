"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
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
import useStore from "@/lib/stores/store";
import {
  useCreateAuthAdd,
  useGetProfile,
  useUpdateAdd,
} from "@/lib/query/configuration-query";
import { AnnouncementForm, announcementSchema } from "@/schemas/add-schema";
import { Textarea } from "@/components/ui/textarea";
import Select from "react-select";

export default function AddCreationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [isGenerating, setIsGenerating] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const createAdd = useCreateAuthAdd();
  const updateAdd = useUpdateAdd();
  const { activeAdd: add, edit } = useStore();
  const { user } = useGetProfile();

  const form = useForm<AnnouncementForm>({
    resolver: zodResolver(announcementSchema),
    defaultValues:
      edit && add
        ? {
            name: add.name,
            phone: add.phone,
            location: add.location,
            title: add.title,
            email: add.email,
            description: add.description,
            categories: add.categories,
          }
        : {
            name: user?.username,
            phone: "",
            location: "",
            title: "",
            email: user?.email,
            description: "",
            categories: [],
          },
  });

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

    try {
      if (edit && add) {
        await updateAdd.mutateAsync({
          id: add.id,
          addData: formData,
        });
      } else {
        await createAdd.mutateAsync({ addData: formData });
      }

      toast({
        title: edit && add ? "Annonce modifiée" : "Annonce créée",
        description: "L'opération a été un succès",
      });
      router.push("/dashboard/adds");
    } catch (error) {
      console.error("Erreur création annonce", error);
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
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Votre nom</FormLabel>
                  <FormControl>
                    <Input placeholder="Votre nom" {...field} readOnly className="cursor-not-allowed bg-muted" />
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
                    <Input placeholder="Ex: johndoe@gmail.com" {...field} readOnly className="cursor-not-allowed bg-muted" />
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
              {edit && add ? "Modifier l'article" : "Créer l'article"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
