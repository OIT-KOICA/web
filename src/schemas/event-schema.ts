import { z } from "zod";

/**
 * Schéma de validation pour la création/modification d’un événement.
 */
export const eventSchema = z
  .object({
    title: z.string().min(1, "Titre requis"),
    description: z.string().min(1, "La description est requise"),
    startDate: z.string().min(1, "La date de début est requise"),
    endDate: z.string().min(1, "La date de fin est requise"),
    localisation: z.string().min(1, "La localisation est requise"),
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
    documents: z
      .array(
        z.object({
          documentFile: z
            .any()
            .refine(
              (file) => file instanceof File || typeof file === "string",
              {
                message: "Le document doit être un fichier ou une URL valide.",
              }
            ),
          documentType: z.string().min(1, "Type de document requis"),
          summary: z.string().optional(),
          user: z
            .string()
            .min(1, "Le username ou l'email de l'utilisateur est requis"),
        })
      )
      .optional()
      .default([]),
    links: z.array(z.string().url("Lien invalide")).optional().default([]),
  })
  .refine(
    (data) => {
      const start = new Date(data.startDate);
      const end = new Date(data.endDate);
      return start < end;
    },
    {
      message: "La date de début doit être antérieure à la date de fin.",
      path: ["endDate"], // Associe l'erreur au champ `endDate`
    }
  );

/**
 * Définition du type TypeScript basé sur le schéma Zod.
 */
export type EventFormValues = z.infer<typeof eventSchema>;
