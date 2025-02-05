"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const valueChains = [
  {
    id: "cassava",
    name: "Manioc",
    description:
      "Une plante-racine polyvalente avec diverses applications industrielles et alimentaires.",
    image: "/images/cassava.jpg",
    color: "from-cassava-500 to-cassava-700",
    details: [
      "Techniques de culture à haut rendement",
      "Transformation en farine et en amidon",
      "Pratiques agricoles durables",
      "les relations avec les marchés pour les producteurs",
    ],
  },
  {
    id: "maize",
    name: "Maïs",
    description:
      "C'est une culture céréalière de base utilisée à la fois pour la consommation humaine et l'alimentation animale.",
    image: "/images/maize.jpg",
    color: "from-maize-500 to-maize-700",
    details: [
      "Systèmes d'irrigation avancés",
      "Solutions de stockage après récolte",
      "Production d'aliments pour animaux",
      "Accès aux marchés d'exportation",
    ],
  },
  {
    id: "poultry",
    name: "Voilaille",
    description:
      "Y compris les poulets et les œufs, qui constituent une source de protéines essentielle dans de nombreux régimes alimentaires.",
    image: "/images/poultry.jpg",
    color: "from-soil-500 to-soil-700",
    details: [
      "Production efficace de poulets de chair",
      "Optimisation de l'élevage d'œufs",
      "Techniques de formulation des aliments pour animaux",
      "Stratégies de prévention des maladies",
    ],
  },
];

export default function ProductsSection() {
  const [selectedChain, setSelectedChain] = useState<string | null>(null);

  return (
    // eslint-disable-next-line tailwindcss/no-custom-classname
    <section>
      <div className="container mx-auto px-4">
        <h2 className="text-gradient mb-8 text-center text-3xl font-bold">
          Découvrez nos chaînes de valeur
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {valueChains.map((chain) => (
            <motion.div
              key={chain.id}
              className={`relative cursor-pointer overflow-hidden rounded-lg shadow-lg ${
                selectedChain === chain.id ? "md:col-span-3" : ""
              }`}
              onClick={() =>
                setSelectedChain(selectedChain === chain.id ? null : chain.id)
              }
              layoutId={chain.id}
            >
              <Image
                src={chain.image}
                alt={chain.name}
                width={600}
                height={400}
                className="object-cover"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-br ${chain.color} opacity-70`}
              ></div>
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="mb-2 text-2xl font-bold text-white">
                  {chain.name}
                </h3>
                <p className="mb-4 text-sm text-white">{chain.description}</p>
                <Button
                  variant="outline"
                  className="self-start border-white transition-colors hover:bg-white"
                >
                  Explorer {selectedChain === chain.id ? "Moins" : "Plus"}
                  <ChevronRight className="ml-2 size-4" />
                </Button>
              </div>
              <AnimatePresence>
                {selectedChain === chain.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
                    className="absolute inset-0 flex flex-col justify-center bg-black bg-opacity-80 p-6"
                  >
                    <h4 className="mb-4 text-xl font-bold text-white">
                      Caractéristiques principales :
                    </h4>
                    <ul className="list-inside list-disc space-y-2 text-white">
                      {chain.details.map((detail, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          {detail}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
