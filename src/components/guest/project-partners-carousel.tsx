"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { motion } from "framer-motion";
import Autoplay from "embla-carousel-autoplay";

const partners = [
  { id: 1, name: "UNHCR", logo: "/images/unhcr.png" },
  { id: 2, name: "MINADER", logo: "/images/minader.png" },
  { id: 3, name: "MUFID", logo: "/images/mufid.webp" },
  { id: 4, name: "MINSANTE", logo: "/images/minsante.png" },
  { id: 5, name: "CNPS", logo: "/images/cnps.png" },
  { id: 6, name: "MINPROFF", logo: "/images/minproff.png" },
  { id: 7, name: "MINPMEESA", logo: "/images/minpmeesa.png" },
  { id: 8, name: "MINEPIA", logo: "/images/minepia.png" },
  { id: 9, name: "GECAM", logo: "/images/gecam.png" },
  { id: 10, name: "CFCE", logo: "/images/cfce.png" },
];

export default function ProjectPartnersCarousel() {
  return (
    <section className="w-full bg-secondary/10 py-12">
      <div className="container mx-auto text-center">
        <h2 className="mb-4 text-3xl font-bold text-gray-800">
          Nos Partenaires
        </h2>
        <p className="mb-6 text-gray-600">
          Nous collaborons avec des partenaires stratégiques pour renforcer
          l’impact du projet.
        </p>
        <Carousel
          className="mx-auto max-w-5xl"
          plugins={[Autoplay({ delay: 3000 })]}
        >
          <CarouselContent>
            {partners.map((partner) => (
              <CarouselItem key={partner.id} className="flex justify-center">
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="p-4"
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={220}
                    height={110}
                    className="h-36 w-64 object-contain"
                  />
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
