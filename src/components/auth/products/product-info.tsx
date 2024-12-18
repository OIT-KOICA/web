import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, MapPin } from "lucide-react";

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
    <Card>
      <CardHeader>
        <CardTitle>Information sur le produit</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold">Description</h3>
          <p>{product ? product.description : ""}</p>
        </div>
        <div className="flex justify-between">
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
        <div className="flex justify-between">
          <div>
            <h3 className="font-semibold">Quantité en stock</h3>
            <p>
              {product ? product.quantity : ""} {product ? product.unit : ""}
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Le produit est-il périmable ?</h3>
            {product && product.isPerishable ? (
              <Badge variant="destructive" className="flex items-center">
                <Leaf className="mr-1 size-4" />
                Périmable
              </Badge>
            ) : (
              <Badge variant="secondary" className="flex items-center">
                Non-périmable
              </Badge>
            )}
          </div>
          <div>
            <h3 className="font-semibold">
              Le produit est-il un produit dérivé ?
            </h3>
            {product && product.isDerivedProduct ? (
              <Badge variant="destructive" className="flex items-center">
                <Leaf className="mr-1 size-4" />
                N&apos;est pas un produit dérivé
              </Badge>
            ) : (
              <Badge variant="secondary" className="flex items-center">
                Est un produit dérivé
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
