import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Nom requis"),
  code: z.string().min(1, "Code requis"),
  description: z.string().min(1, "La description est requise"),
  category: z.string().min(1, "Catégorie requise"),
  unit: z.string().min(1, "Unité de mesure requise"),
  type: z.literal("PRODUCT"),
  isPerishable: z.boolean().default(false).optional(),
  isDerivedProduct: z.boolean().default(false).optional(),
  basePrice: z.number().positive("Le prix doit être supérieur à 0"),
  quantity: z.number().int().nonnegative("La quantité doit être un entier positif"),
  file: z.union([z.instanceof(File), z.string(), z.null()]).optional(),
  pricings: z
    .array(
      z.object({
        description: z.string().optional(),
        price: z.number().positive("Le prix doit être supérieur à 0").optional(),
        parameterType: z.string().optional(),
      })
    )
    .optional(),
  localisation: z.string().min(1, "Localisation requise"),
});

export type ProductFormValues = z.infer<typeof productSchema>;
