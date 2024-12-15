import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <div className="relative flex h-[600px] items-center justify-center overflow-hidden">
      <Image
        src="/hero-background.jpg"
        alt="Agricultural landscape"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 space-y-6 text-center text-white">
        <h1 className="text-4xl font-bold md:text-6xl">Cassava Marketplace</h1>
        <p className="mx-auto max-w-2xl text-xl md:text-2xl">
          Connecting local entrepreneurs in cassava, maize, and poultry value
          chains
        </p>
        <div className="flex justify-center space-x-4">
          <Button size="lg">Get Started</Button>
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
}
