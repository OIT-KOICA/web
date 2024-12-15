import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Nom requis"),
  code: z.string().min(1, "Code requis"),
  description: z.string().min(1, "La description est requise"),
  category: z.string().min(1, "Catégorie requise"),
  unit: z.string().min(1, "Unité de mesure requise"),
  type: z.string().min(1, "Type requis"),
  isPerishable: z.boolean().default(false).optional(),
  isDerivedProduct: z.boolean().default(false).optional(),
  basePrice: z.number().min(0, "Prix de base requis"),
  quantity: z.number().min(0, "Quantité requise"),
  file: z.instanceof(File).optional(),
  pricings: z
    .array(
      z.object({
        description: z.string().optional(),
        price: z.number().optional(),
        parameterType: z.string().optional(),
      })
    )
    .optional(),
  localisation: z.string().min(1, "Localisation requise"),
});

export type ProductFormValues = z.infer<typeof productSchema>;
