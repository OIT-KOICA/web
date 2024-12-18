"use client";

import { motion } from "framer-motion";
import { Lightbulb, Link, Sprout } from "lucide-react";

const visionItems = [
  {
    icon: Lightbulb,
    title: "Améliorer les chaînes de valeur",
    description:
      "Améliorer l'efficacité et la rentabilité des chaînes de valeur du manioc, du maïs et de la volaille.",
  },
  {
    icon: Link,
    title: "Connecter les parties prenantes",
    description:
      "Combler le fossé entre les producteurs, les transformateurs et les consommateurs dans le secteur agricole.",
  },
  {
    icon: Sprout,
    title: "Promouvoir la durabilité",
    description:
      "Favoriser les pratiques de développement durable dans l'agriculture et les industries connexes.",
  },
];

export default function VisionSection() {
  return (
    <section className="text-center">
      <h2 className="mb-8 text-3xl font-semibold">Notre vision</h2>
      <div className="grid gap-8 md:grid-cols-3">
        {visionItems.map((item, index) => (
          <motion.div
            key={index}
            className="rounded-lg bg-white p-6 shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <item.icon className="mx-auto mb-4 size-12 text-primary dark:text-black" />
            <h3 className="mb-2 text-xl font-semibold dark:text-black">{item.title}</h3>
            <p className="text-gray-600">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
