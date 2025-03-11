"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductDTO } from "@/types/type";
import { formatCurrency } from "@/lib/utils";

export default function PriceVariationsTable({
  product,
}: {
  product: ProductDTO | null;
}) {
  return (
    <div className="mt-8">
      <h2 className="mb-4 text-2xl font-bold">Variations de prix</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead>Prix</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {product && product.pricings.length > 0 ? (
            product.pricings.map((variation, index) => (
              <TableRow key={index}>
                <TableCell>{variation.description}</TableCell>
                <TableCell>
                  {formatCurrency(variation.price)} / {product.unit}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell>Pas de variations de prix</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
