"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const valueChains = [
  {
    name: "Cassava",
    description:
      "A versatile root crop with various industrial and food applications.",
    image: "/cassava.jpg",
  },
  {
    name: "Maize",
    description:
      "A staple grain crop used for both human consumption and animal feed.",
    image: "/maize.jpg",
  },
  {
    name: "Poultry",
    description:
      "Including chickens and eggs, a vital protein source in many diets.",
    image: "/poultry.jpg",
  },
];

export default function ValueChainsSection() {
  return (
    <section>
      <h2 className="text-3xl font-semibold mb-8 text-center">
        Our Value Chains
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
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
