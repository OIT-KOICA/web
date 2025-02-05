import { z } from "zod";

export const articleSchema = z.object({
  title: z.string().min(1, "Titre requis"),
  code: z.string().min(1, "Code requis"),
  description: z.string().min(1, "La description est requise"),
  category: z.string().min(1, "Catégorie requise"),
  file: z.union([z.instanceof(File), z.string(), z.null()]).optional(),
});

export type ArticleFormValues = z.infer<typeof articleSchema>;
