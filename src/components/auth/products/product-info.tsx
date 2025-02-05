import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, MapPin } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface ProductInfoProps {
  product: {
    name: string;
    description: string;
    category: string;
    localisation: string;
    quantity: number;
    unit: string;
    isPerishable: boolean;
    isDerivedProduct: boolean;
  } | null;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Information sur le produit</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Description */}
        <div>
          <h3 className="font-semibold">Description</h3>
          <ReactMarkdown className="prose prose-sm prose-blue dark:prose-invert">
            {product ? product.description : ""}
          </ReactMarkdown>
        </div>

        {/* Catégorie & Localisation */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <h3 className="font-semibold">Catégorie</h3>
            <p>{product ? product.category : ""}</p>
          </div>
          <div>
            <h3 className="font-semibold">Zone de localisation</h3>
            <p className="flex items-center">
              <MapPin className="mr-1 size-4" />
              {product ? product.localisation : ""}
            </p>
          </div>
        </div>

        {/* Quantité, Périssable & Produit dérivé */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <h3 className="font-semibold">Quantité en stock</h3>
            <p>
              {product ? product.quantity : ""} {product ? product.unit : ""}
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Le produit est-il périssable ?</h3>
            {product && product.isPerishable ? (
              <Badge variant="destructive" className="flex items-center">
                <Leaf className="mr-1 size-4" />
                Périssable
              </Badge>
            ) : (
              <Badge variant="secondary" className="flex items-center">
                Non-périssable
              </Badge>
            )}
          </div>
          <div>
            <h3 className="font-semibold">
              Le produit est-il un produit dérivé ?
            </h3>
            {product && product.isDerivedProduct ? (
              <Badge variant="outline" className="flex items-center">
                <Leaf className="mr-1 size-4" />
                Est un produit dérivé
              </Badge>
            ) : (
              <Badge variant="default" className="flex items-center">
                N&apos;est pas un produit dérivé
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
