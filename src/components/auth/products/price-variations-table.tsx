import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

type PriceVariation = {
  description: string;
  price: number;
};

type PriceVariationsTableProps = {
  variations: PriceVariation[] | undefined;
  unit: string | undefined;
};

export default function PriceVariationsTable({
  variations,
  unit,
}: PriceVariationsTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Variation des prix</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Prix</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {variations && variations.length > 0 ? (
              variations.map((variation, index) => (
                <TableRow key={index}>
                  <TableCell>{variation.description}</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(variation.price)} / {unit}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>Aucune variation de prix</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
