"use client";

import * as React from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";
import { motion } from "framer-motion";
import Autoplay from "embla-carousel-autoplay";

const sponsors = [
  { id: 1, name: "OIT", logo: "/images/oit.png" },
  { id: 2, name: "KOICA", logo: "/images/koica.png" },
  { id: 3, name: "République du Cameroun", logo: "/images/cameroun.png" },
];

export default function ProjectSponsorsCarousel() {
  return (
    <section className="flex min-h-[100px] w-full items-center justify-center bg-primary/10 py-2 md:min-h-[100px]">
      <div className="container mx-auto text-center">
        <Carousel className="mx-auto max-w-5xl" plugins={[Autoplay({ delay: 3000 })]}>
          <CarouselContent>
            {sponsors.map((sponsor) => (
              <CarouselItem key={sponsor.id} className="flex justify-center">
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="p-4"
                >
                  <Image
                    src={sponsor.logo}
                    alt={sponsor.name}
                    width={220}
                    height={110}
                    className="h-28 w-52 object-contain"
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
