import { z } from "zod";

// Liste des unités de mesure acceptées pour `priceUnit`
const priceUnitOptions = ["Kg", "Sac", "Cuvette", "Sceau de 5L"] as const;

export const productSchema = z.object({
  name: z.string().min(1, "Nom requis"),
  description: z.string().min(1, "La description est requise"),
  category: z.string().min(1, "Catégorie requise"),
  unit: z.string().min(1, "Unité de mesure requise"),
  priceUnit: z.enum(priceUnitOptions, {
    errorMap: () => ({
      message: "L'unité de prix est requise et doit être valide",
    }),
  }),
  isPerishable: z.boolean().default(false).optional(),
  isDerivedProduct: z.boolean().default(false).optional(),
  basePrice: z.number().positive("Le prix doit être supérieur à 0"),
  quantity: z
    .number()
    .int()
    .nonnegative("La quantité doit être un entier positif"),
  file: z
    .any()
    .refine(
      (file) =>
        file instanceof File ||
        typeof file === "string" ||
        file === null ||
        file === undefined,
      {
        message:
          "Le fichier doit être une image valide ou un chemin de fichier.",
      }
    )
    .optional(),
  pricings: z
    .array(
      z.object({
        description: z.string().optional(),
        price: z
          .number()
          .positive("Le prix doit être supérieur à 0")
          .optional(),
      })
    )
    .optional(),
  localisation: z.string().min(1, "Localisation requise"),
});

export type ProductFormValues = z.infer<typeof productSchema>;
