"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductDTO } from "@/lib/type";
import { formatCurrency } from "@/lib/utils";

export default function PriceVariationsTable({
  product,
}: {
  product: ProductDTO;
}) {

  return (
    <div className="mt-8">
      <h2 className="mb-4 text-2xl font-bold">Price Variations</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead>Parameter</TableHead>
            <TableHead>Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {product.pricings.map((variation, index) => (
            <TableRow key={index}>
              <TableCell>{variation.description}</TableCell>
              <TableCell>{variation.parameterType}</TableCell>
              <TableCell>{formatCurrency(variation.price)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
