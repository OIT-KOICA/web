import { z } from "zod";

/**
 * Schéma de validation pour la création/modification d’un article.
 */
export const articleSchema = z.object({
  title: z.string().min(1, "Titre requis"),
  description: z.string().min(1, "La description est requise"),
  category: z.string().min(1, "Catégorie requise"),
  file: z
    .union([z.instanceof(File), z.string(), z.null(), z.undefined()])
    .optional(),
  documents: z
    .array(
      z.object({
        documentFile: z.instanceof(File),
        documentType: z.string().min(1, "Type de document requis")
      })
    )
    .optional()
    .default([]),
  links: z.array(z.string().url("Lien invalide")).optional().default([]),
});

/**
 * Définition du type TypeScript basé sur le schéma Zod.
 */
export type ArticleFormValues = z.infer<typeof articleSchema>;
