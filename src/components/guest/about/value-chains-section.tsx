"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const valueChains = [
  {
    name: "Manioc",
    description:
      "Une plante-racine polyvalente avec diverses applications industrielles et alimentaires.",
    image: "/images/cassava.jpg",
  },
  {
    name: "Maïs",
    description:
      "C'est une culture céréalière de base utilisée à la fois pour la consommation humaine et l'alimentation animale.",
    image: "/images/maize.jpg",
  },
  {
    name: "Volaille",
    description:
      "Y compris les poulets et les œufs, qui constituent une source de protéines essentielle dans de nombreux régimes alimentaires.",
    image: "/images/poultry.jpg",
  },
];

export default function ValueChainsSection() {
  return (
    <section>
      <h2 className="mb-8 text-center text-3xl font-semibold">
        Nos chaînes de valeur
      </h2>
      <div className="grid gap-8 md:grid-cols-3">
        {valueChains.map((chain, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <Card className="overflow-hidden">
              <CardHeader className="p-0">
                <div className="relative h-48">
                  <Image
                    src={chain.image}
                    alt={chain.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="mb-2">{chain.name}</CardTitle>
                <p className="text-gray-600">{chain.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
