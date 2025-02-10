import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative !mt-0 flex min-h-[600px] items-center justify-center overflow-hidden">
      <Image
        src="/images/hero-background.jpg"
        alt="Agricultural landscape"
        fill
        style={{ objectFit: "cover" }}
        quality={100}
        priority
      />
      <div className="absolute inset-0 bg-black/25" />
      <div className="relative z-10 space-y-6 text-center text-white">
        <h1 className="text-4xl font-bold md:text-6xl">Cassava Marketplace</h1>
        <p className="mx-auto max-w-2xl text-xl md:text-2xl">
          Connecter les entrepreneurs locaux dans les chaînes de valeur du
          manioc, du maïs et de la volaille
        </p>
        <div className="flex justify-center space-x-4">
          <Button size="lg" asChild>
            <Link href="/products">Commencer</Link>
          </Button>
          <Button size="lg" variant="outline" className="text-primary" asChild>
            <Link href="/about">En savoir plus</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
