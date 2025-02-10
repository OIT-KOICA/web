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
import { useToast } from "@/hooks/use-toast";
import { Loader2, Wand2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import useArticleStore from "@/lib/stores/article-store";
import { useCreateArticle, useUpdateArticle } from "@/lib/query/article-query";
import { ArticleFormValues, articleSchema } from "@/schemas/article-schema";
import CategoryArticleSelect from "./category-article-select";
import DocumentsField from "./documents-field";
import LinksField from "./links-field";

// Chargement dynamique de l'éditeur Markdown pour éviter les erreurs SSR
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function ArticleCreationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const createArticle = useCreateArticle();
  const updateArticle = useUpdateArticle();
  const article = useArticleStore((state) => state.activeArticle);
  const edit = useArticleStore((state) => state.edit);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(articleSchema),
    defaultValues:
      edit && article
        ? {
            title: article.title || "",
            description: article.description || "",
            category: article.category || "",
            file: article.file || undefined,
            links: article.links || [],
          }
        : {
            title: "",
            description: "",
            category: "",
            file: undefined,
            documents: [],
            links: [],
          },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("file", file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const generateArticleContent = async () => {
    setIsGenerating(true);

    try {
      const title = form.getValues("title");
      if (!title) {
        toast({
          title: "Erreur",
          description: "Veuillez entrer un titre avant de générer du contenu.",
          variant: "destructive",
        });
        setIsGenerating(false);
        return;
      }

      // Envoi de la requête à l'API Next.js
      const response = await fetch("/api/generate-content", {
        method: "POST",
        body: JSON.stringify({ topic: title }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la génération du contenu.");
      }

      const data = await response.json();

      if (data.content) {
        form.setValue("description", data.content);
        toast({
          title: "Succès",
          description: "Le contenu a été généré avec succès !",
        });
      }
    } catch (error) {
      console.error("Erreur lors de la génération :", error);
      toast({
        title: "Erreur",
        description: "Impossible de générer le contenu, réessaye plus tard.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const onSubmit = async (data: ArticleFormValues) => {
    setIsSubmitting(true);
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    if (data.file instanceof File) formData.append("file", data.file);

    // Ajout des documents
    data.documents?.forEach((doc, index) => {
      formData.append(`documents[${index}][documentFile]`, doc.documentFile);
      formData.append(`documents[${index}][documentType]`, doc.documentType);
    });

    // Ajout des liens
    data.links?.forEach((link, index) => {
      formData.append(`links[${index}]`, link);
    });

    try {
      if (edit && article) {
        await updateArticle.mutateAsync({
          slug: article.slug,
          articleData: formData,
        });
      } else {
        await createArticle.mutateAsync({ articleData: formData });
      }

      toast({
        title: edit && article ? "Article modifié" : "Article créé",
        description: "L'opération a été un succès",
      });
      router.push("/dashboard/articles");
    } catch (error) {
      console.error("Erreur création article", error);
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
                    <Input placeholder="Titre de l'article" {...field} />
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
                  <div className="flex items-center space-x-2">
                    <Button
                      type="button"
                      onClick={generateArticleContent}
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <Loader2 className="mr-2 size-4 animate-spin" />
                      ) : (
                        <Wand2 className="mr-2 size-4" />
                      )}
                      Générer le texte
                    </Button>
                  </div>
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

            {/* Catégorie */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Catégorie</FormLabel>
                  <FormControl>
                    <CategoryArticleSelect
                      onValueChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                  ) : article?.file && edit ? (
                    <div className="mt-2">
                      <FormLabel>Aperçu existant :</FormLabel>
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_PATH_URL}/image/${article.file}`} // Chemin vers l'image existante
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

            {/* Documents */}
            <DocumentsField />

            {/* Liens */}
            <LinksField />

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" />}
              {edit && article ? "Modifier l'article" : "Créer l'article"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
