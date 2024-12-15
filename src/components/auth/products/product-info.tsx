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
  };
}

export default function ProductInfo({ product }: ProductInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold">Description</h3>
          <p>{product.description}</p>
        </div>
        <div className="flex justify-between">
          <div>
            <h3 className="font-semibold">Category</h3>
            <p>{product.category}</p>
          </div>
          <div>
            <h3 className="font-semibold">Location</h3>
            <p className="flex items-center">
              <MapPin className="mr-1 size-4" />
              {product.localisation}
            </p>
          </div>
        </div>
        <div className="flex justify-between">
          <div>
            <h3 className="font-semibold">Stock</h3>
            <p>
              {product.quantity} {product.unit}
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Perishability</h3>
            {product.isPerishable ? (
              <Badge variant="destructive" className="flex items-center">
                <Leaf className="mr-1 size-4" />
                Perishable
              </Badge>
            ) : (
              <Badge variant="secondary" className="flex items-center">
                Non-perishable
              </Badge>
            )}
          </div>
          <div>
            <h3 className="font-semibold">isDerivedProduct</h3>
            {product.isDerivedProduct ? (
              <Badge variant="destructive" className="flex items-center">
                <Leaf className="mr-1 size-4" />
                isDerivedProduct
              </Badge>
            ) : (
              <Badge variant="secondary" className="flex items-center">
                Non-isDerivedProduct
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
