"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { Loader2 } from "lucide-react";
import { ProductFormValues, productSchema } from "@/schemas/product-schema";
import CategorySelect from "./category-select";
import PriceVariations from "./price-variations";
import LocationSelect from "./location-select";
import UnitOfMeasureSelect from "./unit-of-measure-select";
import Image from "next/image";
import { useCreateProduct, useUpdateProduct } from "@/lib/query/product-query";
import useProductStore from "@/lib/stores/product-store";

export default function ProductCreationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
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
            type: "PRODUCT", // Forcer le type à "PRODUCT" pour respecter `ProductFormValues`
            file: product.file || undefined, // Assurez-vous que `file` est correct
          }
        : {
            name: "",
            code: "",
            category: "",
            description: "",
            isPerishable: false,
            isDerivedProduct: false,
            localisation: "",
            basePrice: 0,
            unit: "",
            quantity: 0,
            file: undefined,
            type: "PRODUCT",
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

  const onSubmit = async (data: ProductFormValues) => {
    setIsSubmitting(true);

    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("code", data.code);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("unit", data.unit);
    formData.append("type", data.type);
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
        editProduct.mutate({
          slug: product.slug,
          productData: formData,
        });
      else
        createProduct.mutate({
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

            {/* Code du produit */}
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code du produit</FormLabel>
                  <FormControl>
                    <Input placeholder="Entrer le code du produit" {...field} />
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
                  <FormLabel>Description du produit</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Entrer la description du produit"
                      {...field}
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

            {/* TYpe */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <Input type="hidden" {...field} value="PRODUCT" />
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
