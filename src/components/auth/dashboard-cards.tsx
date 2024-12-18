"use client";

import { motion } from "framer-motion";
import { Package, BookOpen, Megaphone, HelpCircle } from "lucide-react";
import DashboardCard from "./dashboard-card";

const cards = [
  {
    title: "Gérer vos produits",
    description:
      "Consultez la liste des produits que vous avez créés, ajoutez-en de nouveaux ou mettez à jour les produits existants.",
    icon: Package,
    cta: "Aller à Mes produits",
    href: "/dashboard/products",
  },
  {
    title: "Découvrez des articles utiles",
    description:
      "Lisez des articles informatifs sur les chaînes de valeur, les possibilités de financement et des conseils pour développer votre entreprise.",
    icon: BookOpen,
    cta: "Visiter le blog",
    href: "/blog",
  },
  {
    title: "Affichez vos besoins",
    description:
      "Publier des annonces pour trouver des produits ou des services spécifiques adaptés à vos besoins.",
    icon: Megaphone,
    cta: "Publier une annonce",
    href: "/dashboard/announcements",
  },
  {
    title: "Besoin d'aide ?",
    description:
      "Consultez notre FAQ ou contactez notre équipe pour obtenir des réponses à vos questions.",
    icon: HelpCircle,
    cta: "Obtenir de l'aide",
    href: "/faq",
  },
];

export default function DashboardCards() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <DashboardCard {...card} />
        </motion.div>
      ))}
    </div>
  );
}
