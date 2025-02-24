"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { User, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import FullScreenOffer from "./full-screen-offer";
import { Offer } from "@/types/type";
import { useGetAdds } from "@/lib/query/configuration-query";

interface OffersCarouselProps {
  className?: string;
}

export default function OffersCarousel({ className }: OffersCarouselProps) {
  const [selectedOffer, setSelectedOffer] = React.useState<Offer | null>(null);
  const { data, fetchNextPage, hasNextPage } = useGetAdds();
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  const offers = data?.pages
    ? data.pages.flatMap((page) => page.adds || [])
    : [];

  return (
    <div className={className}>
      <h2 className="mb-4 text-2xl font-bold">Annonces les plus récentes</h2>
      <Carousel
        plugins={[plugin.current]}
        className="mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {offers.length > 0 ? (
            offers.map((offer) => (
              <CarouselItem key={offer.id}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedOffer(offer)}
                >
                  <Card className="bg-gradient-to-br from-cassava-100 to-maize-100 transition-shadow duration-300 hover:shadow-lg dark:from-cassava-800 dark:to-maize-800">
                    <CardContent className="p-4">
                      <h3 className="mb-2 text-lg font-bold text-primary dark:text-primary-foreground">
                        J&apos;ai besoin de
                      </h3>
                      <p className="mb-4 text-sm text-muted-foreground">
                        {offer.description}
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <User className="mr-2 size-4 text-primary dark:text-primary-foreground" />
                          <span className="text-sm">{offer.name}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="mr-2 size-4 text-primary dark:text-primary-foreground" />
                          <span className="text-sm">{offer.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="mr-2 size-4 text-primary dark:text-primary-foreground" />
                          <span className="text-sm">{offer.location}</span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-4 w-full bg-primary/10 text-primary hover:bg-primary/20 dark:text-primary-foreground"
                      >
                        Voir les détails
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))
          ) : (
            <div className="m-4 text-center">
              Pas d&apos;annonces pour le moment
            </div>
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {hasNextPage && (
        <div className="mt-4 flex justify-center">
          <Button onClick={() => fetchNextPage()}>Charger plus...</Button>
        </div>
      )}

      {selectedOffer && (
        <FullScreenOffer
          offer={selectedOffer}
          onClose={() => setSelectedOffer(null)}
        />
      )}
    </div>
  );
}
