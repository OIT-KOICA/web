"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const valuePoints = [
  "Augmentation des revenus des producteurs grâce à un accès direct au marché",
  "Amélioration de l'efficacité de la chaîne d'approvisionnement",
  "Amélioration de la transparence des prix et des transactions",
  "Accès à une plus large gamme de produits pour les consommateurs",
  "Promotion de pratiques agricoles durables",
  "Facilitation du partage des connaissances et du renforcement des capacités",
];

export default function ProjectValueSection() {
  return (
    <section className="rounded-lg bg-gray-50 p-8">
      <h2 className="mb-8 text-center text-3xl font-semibold dark:text-black">
        Valeur du projet
      </h2>
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <p className="mb-6 text-lg dark:text-black">
            Cassava Marketplace est essentielle pour les chaînes de valeur
            agricoles que nous soutenons. Notre plateforme apporte de nombreux
            avantages à tous les parties prenantes impliquées :
          </p>
          <ul className="space-y-4">
            {valuePoints.map((point, index) => (
              <motion.li
                key={index}
                className="flex items-start"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <CheckCircle className="mr-2 mt-1 size-6 shrink-0 text-green-500" />
                <span className="dark:text-black">{point}</span>
              </motion.li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg bg-primary p-8 text-white dark:text-black">
          <h3 className="mb-4 text-2xl font-semibold">Notre impact</h3>
          <p className="mb-4">
            En mettant les producteurs en relation directe avec les
            consommateurs et les autres parties prenantes, en révolutionnant le
            secteur agricole de notre région. révolutionner le secteur agricole
            dans notre région.
          </p>
          <p>
            Notre plateforme ne se contente pas d&apos;accroître la rentabilité
            des agriculteurs et des entreprises, elle contribue également à la
            sécurité alimentaire et au développement durable. entreprises, mais
            elle contribue également à la sécurité alimentaire et au
            développement durable dans les communautés que nous servons.
          </p>
        </div>
      </div>
    </section>
  );
}
