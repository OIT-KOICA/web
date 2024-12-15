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
import { useGetAdds } from "@/lib/query/configuration-query";

interface OffersCarouselProps {
  className?: string;
}

export default function OffersCarousel({ className }: OffersCarouselProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );
  const { adds } = useGetAdds();

  return (
    <div className={className}>
      <h2 className="mb-4 text-2xl font-bold">Besoins les plus recents</h2>
      <Carousel
        plugins={[plugin.current]}
        className="mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {adds && adds.length > 0 ? (
            adds.map((offer) => (
              <CarouselItem key={offer.id}>
                <Card>
                  <CardContent className="p-4">
                    <h3 className="mb-2 font-bold">J&apos;ai besoin de</h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                      {offer.description}
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <User className="mr-2 size-4 text-primary" />
                        <span className="text-sm">{offer.name}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="mr-2 size-4 text-primary" />
                        <span className="text-sm">{offer.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="mr-2 size-4 text-primary" />
                        <span className="text-sm">{offer.location}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))
          ) : (
            <div className="m-4 text-center">Pas de besoins pour le moment</div>
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
