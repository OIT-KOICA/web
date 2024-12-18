"use client";

import { motion } from "framer-motion";
import {
  Users,
  Factory,
  Truck,
  Building2,
  Store,
  Landmark,
} from "lucide-react";

const stakeholders = [
  {
    icon: Users,
    title: "Producteurs",
    description: "Agriculteurs et producteurs agricoles primaires",
  },
  {
    icon: Factory,
    title: "Transformateurs",
    description: "Entreprises à valeur ajoutée dans la chaîne agricole",
  },
  {
    icon: Truck,
    title: "Collecteurs",
    description: "Agrégateurs de produits agricoles",
  },
  {
    icon: Store,
    title: "Les spécialistes du marketing",
    description: "Distributeurs et détaillants de produits agricoles",
  },
  {
    icon: Building2,
    title: "Institutions financières",
    description: "Banques et organisations de micro-finance",
  },
  {
    icon: Landmark,
    title: "Institutions externes",
    description: "ONG et agences gouvernementales",
  },
];

export default function StakeholdersSection() {
  return (
    <section>
      <h2 className="mb-8 text-center text-3xl font-semibold">
        Nos parties prenantes
      </h2>
      <div className="grid gap-8 md:grid-cols-3">
        {stakeholders.map((stakeholder, index) => (
          <motion.div
            key={index}
            className="rounded-lg bg-white p-6 text-center shadow-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <stakeholder.icon className="mx-auto mb-4 size-12 text-primary dark:text-black" />
            <h3 className="mb-2 text-xl font-semibold dark:text-black">
              {stakeholder.title}
            </h3>
            <p className="text-gray-600">{stakeholder.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
