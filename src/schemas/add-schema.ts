import { z } from "zod";

export const announcementSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  phone: z.string().regex(/^\+?[0-9]{8,14}$/, "Numéro de téléphone invalide"),
  location: z.string().min(2, "Veuillez préciser votre localisation"),
  title: z.string().min(2, "Veuillez renseigner un titre pour l'annonce"),
  email: z.string().email("Veuillez entrer une adresse e-mail valide."),
  description: z.string().min(5, "Décrivez votre besoin en détail"),
  categories: z.array(z.string()).nonempty("Choisissez au moins une catégorie"),
});

export type AnnouncementForm = z.infer<typeof announcementSchema>;
