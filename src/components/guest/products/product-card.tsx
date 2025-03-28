"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatCurrency } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { ProductDTO } from "@/types/typeDTO";
import useStore from "@/lib/stores/store";
import Markdown from "react-markdown";

interface ProductCardProps {
  product: ProductDTO;
}

function getProductColor(category: string): string {
  switch (category.toLowerCase()) {
    case "cassava":
      return "bg-yellow-50 dark:bg-yellow-950";
    case "corn":
      return "bg-green-50 dark:bg-green-950";
    case "chicken":
      return "bg-blue-50 dark:bg-blue-950";
    default:
      return "bg-gray-50 dark:bg-gray-950";
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const { setActiveProduct } = useStore();
  const router = useRouter();

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className={`relative h-48 ${getProductColor(product.category)}`}>
        {product.file && (
          <Image
            src={`${process.env.NEXT_PUBLIC_API_PATH_URL}/media/download/image/${product.file}`}
            alt={product.name}
            layout="fill"
            objectFit="cover"
          />
        )}
        <div className="absolute right-2 top-2 rounded-full bg-background/80 px-2 py-1 text-xs font-semibold text-foreground">
          {product.category}
        </div>
      </div>
      <CardContent className="grow p-4">
        <h3 className="mb-2 line-clamp-1 text-lg font-bold">{product.name}</h3>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {product.localisation}
          </span>
          <span className="font-semibold">
            {formatCurrency(product.basePrice)} / {product.priceUnit}
          </span>
        </div>
        <p className="mb-2 text-sm">
          Quantité en stock: {product.quantity} {product.unit}
        </p>
        <Markdown className="prose dark:prose-invert mb-2">
          {product.description.length > 100
            ? `${product.description.slice(0, 100)}...`
            : product.description}
        </Markdown>
        <div className="mt-2 flex items-center space-x-2">
          <Avatar className="size-8">
            <AvatarImage src={product.companyAvatar} alt={product.company} />
            <AvatarFallback>
              {product.company.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-primary">
            {product.company}
          </span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full bg-gradient-to-r from-cassava-500 to-maize-500 text-white hover:from-cassava-600 hover:to-maize-600"
          onClick={() => {
            setActiveProduct(product);
            router.push(`/products/${product.slug}`);
          }}
        >
          Consulter
        </Button>
      </CardFooter>
    </Card>
  );
}
