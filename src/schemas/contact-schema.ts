import * as z from "zod";

export const contactFormSchema = z.object({
  fullName: z
    .string()
    .min(2, "Le nom complet doit être supérieur à 2 caractères"),
  email: z.string().email("Adresse mail invalide"),
  subject: z
    .string()
    .min(5, "L'objet du message doit être supérieur à 5 caractères"),
  message: z.string().min(10, "Le message doit être supérieur à 10 caractères"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
