"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Wand2 } from "lucide-react";
import { ProductFormValues, productSchema } from "@/schemas/product-schema";
import CategorySelect from "./category-select";
import PriceVariations from "./price-variations";
import LocationSelect from "./location-select";
import UnitOfMeasureSelect from "./unit-of-measure-select";
import Image from "next/image";
import { useCreateProduct, useUpdateProduct } from "@/lib/query/product-query";
import useProductStore from "@/lib/stores/product-store";
import dynamic from "next/dynamic";

// Chargement dynamique de l'éditeur Markdown pour éviter les erreurs SSR
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function ProductCreationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const createProduct = useCreateProduct();
  const editProduct = useUpdateProduct();
  const product = useProductStore((state) => state.activeProduct);
  const edit = useProductStore((state) => state.edit);

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues:
      edit && product
        ? {
            ...product, // Récupère toutes les valeurs de `ProductDTO`
            file: product.file || undefined, // Assurez-vous que `file` est correct
          }
        : {
            name: "",
            category: "",
            description: "",
            isPerishable: false,
            isDerivedProduct: false,
            localisation: "",
            basePrice: 0,
            unit: "",
            quantity: 0,
            file: undefined,
          },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("file", file); // Mettre à jour le champ dans React Hook Form
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const generateArticleContent = async () => {
    setIsGenerating(true);

    try {
      const name = form.getValues("name");
      if (!name) {
        toast({
          title: "Erreur",
          description:
            "Veuillez entrer un nom de produit avant de générer sa description.",
          variant: "destructive",
        });
        setIsGenerating(false);
        return;
      }

      // Envoi de la requête à l'API Next.js
      const response = await fetch("/api/generate-description", {
        method: "POST",
        body: JSON.stringify({ topic: name }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la génération de la description.");
      }

      const data = await response.json();

      if (data.content) {
        form.setValue("description", data.content);
        toast({
          title: "Succès",
          description: "La description a été généré avec succès !",
        });
      }
    } catch (error) {
      console.error("Erreur lors de la génération :", error);
      toast({
        title: "Erreur",
        description:
          "Impossible de générer la description, réessaye plus tard.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const onSubmit = async (data: ProductFormValues) => {
    setIsSubmitting(true);

    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("unit", data.unit);
    formData.append("isPerishable", data.isPerishable + "");
    formData.append("isDerivedProduct", data.isDerivedProduct + "");
    formData.append("basePrice", data.basePrice.toString());
    formData.append("quantity", data.quantity.toString());
    formData.append("localisation", data.localisation);

    // Champs conditionnels pour l'image
    if (data.file instanceof File) {
      formData.append("file", data.file);
    }

    if (data.pricings && data.pricings?.length > 0)
      formData.append("pricings", JSON.stringify(data.pricings));

    try {
      if (edit && product)
        await editProduct.mutateAsync({
          slug: product.slug,
          productData: formData,
        });
      else
        await createProduct.mutateAsync({
          productData: formData,
        });

      toast({
        title:
          edit && product
            ? "Produit modifié avec succès"
            : "Produit créé avec succès",
        description: "Votre produit a été ajouté à la liste.",
      });

      router.push("/dashboard/products");
    } catch (error) {
      console.error("Failed to create product:", error);

      toast({
        title: "Error",
        description: "Echec lors de la création du produit. Veuillez réessayer",
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
            {/* Nom du produit */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom du produit</FormLabel>
                  <FormControl>
                    <Input placeholder="Entrer le nom du produit" {...field} />
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
                    <CategorySelect
                      onValueChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description du produit */}
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

            {/* Le produit est-il périsable ? */}
            <FormField
              control={form.control}
              name="isPerishable"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Le produit est-il périsable ?</FormLabel>
                    <FormDescription>
                      Cocher cette case si le produit est périsable
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            {/* Le produit est-il un produit dérivé ? */}
            <FormField
              control={form.control}
              name="isDerivedProduct"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Ce produit est-il un produit dérivé ?</FormLabel>
                    <FormDescription>
                      Cocher cette case si le produit est un produit dérivé
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            {/* Variation de prix */}
            <PriceVariations control={form.control} />

            {/* Zone de localisation */}
            <FormField
              control={form.control}
              name="localisation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zone de localisation</FormLabel>
                  <FormControl>
                    <LocationSelect
                      onValueChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image du produit */}
            <FormField
              control={form.control}
              name="file"
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Image du produit</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      {...field}
                    />
                  </FormControl>

                  {/* Afficher un aperçu de l'image existante ou nouvelle */}
                  {previewImage ? (
                    <div className="mt-2">
                      <FormLabel>Aperçu de l&apos;image :</FormLabel>
                      <Image
                        src={previewImage}
                        alt="Aperçu de l'image du produit"
                        className="mt-2 size-24 rounded-full border object-cover"
                        width={100}
                        height={100}
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                  ) : product?.file && edit ? (
                    <div className="mt-2">
                      <FormLabel>Aperçu existant :</FormLabel>
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_PATH_URL}/image/${product.file}`} // Chemin vers l'image existante
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

            {/* Prix de base */}
            <FormField
              control={form.control}
              name="basePrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prix de base</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Quantité en stock */}
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantité en stock</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Unité de mésure */}
            <FormField
              control={form.control}
              name="unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unité de mésure</FormLabel>
                  <FormControl>
                    <UnitOfMeasureSelect
                      onValueChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" />}
              {edit && product ? "Modifier le produit" : "Créer le produit"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
