import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type PriceVariation = {
  id: string;
  description: string;
  parameterType: string;
  price: number;
};

type PriceVariationsTableProps = {
  variations: PriceVariation[];
};

export default function PriceVariationsTable({
  variations,
}: PriceVariationsTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Price Variations</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead>Parameter</TableHead>
              <TableHead className="text-right">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {variations && variations.length > 0 ? (
              variations.map((variation, index) => (
                <TableRow key={index}>
                  <TableCell>{variation.description}</TableCell>
                  <TableCell>{variation.parameterType}</TableCell>
                  <TableCell className="text-right">
                    {variation.price.toFixed(2)}
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
