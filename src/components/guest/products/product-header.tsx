"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductDTO } from "@/lib/type";

export default function ProductHeader({ product }: { product: ProductDTO }) {
  return (
    <div className="flex flex-col items-start space-y-4 md:flex-row md:items-center md:space-x-8 md:space-y-0">
      <div className="relative h-64 w-full overflow-hidden rounded-lg md:h-96 md:w-1/2">
        {product.file && (
          <Image
            src={`${process.env.NEXT_PUBLIC_API_PATH_URL}/image/${product.file}`}
            alt={product.name ?? "Nom du produit"}
            layout="fill"
            objectFit="cover"
          />
        )}
      </div>
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">{product?.name}</h1>
        <Link href="/products">
          <Button
            variant="outline"
            className="transition-all hover:bg-primary hover:text-primary-foreground"
          >
            <ArrowLeft className="mr-2 size-4" />
            Retour aux produits
          </Button>
        </Link>
      </div>
    </div>
  );
}
