import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ProductDTO } from "@/types/type";
import Link from "next/link";
import ConfirmDialog from "../confirm-dialog";
import { useDeleteProduct } from "@/lib/query/product-query";
import useProductStore from "@/lib/stores/product-store";
import {
  DropdownMenuSeparator,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface ProductTableProps {
  products: ProductDTO[];
}

export default function ProductTable({ products }: ProductTableProps) {
  const [productToDelete, setProductToDelete] = useState<ProductDTO | null>(
    null
  );
  const deleteProduct = useDeleteProduct();
  const { setEdit, setActiveProduct } = useProductStore();

  return (
    <div className="overflow-x-auto">
      <Table className="w-full min-w-[600px]">
        <TableHeader>
          <TableRow>
            <TableHead>Nom du produit</TableHead>
            <TableHead>Catégorie</TableHead>
            <TableHead>Quantité</TableHead>
            <TableHead>Prix</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                Aucun produit trouvé
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
              <TableRow key={product.slug}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.quantity} ({product.unit})</TableCell>
                <TableCell>{formatCurrency(product.basePrice)} / {product.unit}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="size-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem
                        asChild
                        onClick={() => setActiveProduct(product)}
                      >
                        <Link href={`/dashboard/products/${product.code}`}>
                          Consulter
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        asChild
                        onClick={() => {
                          setEdit(true);
                          setActiveProduct(product);
                        }}
                      >
                        <Link href={`/dashboard/products/create`}>
                          Modifier
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => setProductToDelete(product)}
                      >
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* ConfirmDialog pour la suppression */}
      {productToDelete && (
        <ConfirmDialog
          isOpen={!!productToDelete}
          onClose={() => setProductToDelete(null)}
          onConfirm={() => deleteProduct.mutate({ slug: productToDelete.slug })}
          title="Supprimer produit"
          description={`Êtes-vous sûr de vouloir supprimer ${productToDelete.name} ?`}
        />
      )}
    </div>
  );
}
