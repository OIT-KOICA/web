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
import Link from "next/link";
import ConfirmDialog from "../confirm-dialog";
import { useDeleteProduct } from "@/lib/query/product-query";
import {
  DropdownMenuSeparator,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { ProductDTO } from "@/types/typeDTO";
import useStore from "@/lib/stores/store";
import { useToast } from "@/lib/hooks/use-toast";
import { useRouter } from "next/navigation";

interface ProductTableProps {
  products: ProductDTO[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  sortOrder: "asc" | "desc";
  onSortOrderChange: (order: "asc" | "desc") => void;
}

export default function ProductTable({
  products,
  currentPage,
  totalPages,
  onPageChange,
  sortOrder,
  onSortOrderChange,
}: ProductTableProps) {
  const [productToDelete, setProductToDelete] = useState<ProductDTO | null>(
    null
  );
  const deleteProduct = useDeleteProduct();
  const { setEdit, setActiveProduct } = useStore();
  const { toast } = useToast();
  const router = useRouter();

  const handleDelete = async () => {
    if (productToDelete) {
      try {
        await deleteProduct.mutateAsync({
          slug: productToDelete.slug,
        });

        toast({
          title: "Produit supprimé avec succès",
          description: "Le produit a été retiré de la liste.",
        });

        router.push("/dashboard/events");
      } catch (error) {
        console.error("Failed to delete product:", error);

        toast({
          title: "Erreur",
          description:
            "Échec lors de la suppression du produit. Veuillez réessayer",
          variant: "destructive",
        });
      } finally {
        setProductToDelete(null);
      }
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table className="w-full min-w-[600px]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">
              <Button
                variant="ghost"
                onClick={() =>
                  onSortOrderChange(sortOrder === "asc" ? "desc" : "asc")
                }
              >
                Nom du produit
                <ArrowUpDown className="ml-2 size-4" />
              </Button>
            </TableHead>
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
                <TableCell>
                  {product.quantity} {product.unit}
                </TableCell>
                <TableCell>
                  {formatCurrency(product.basePrice)} / {product.priceUnit}
                </TableCell>
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

      <div className="mt-4 flex justify-center space-x-2">
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Précédent
        </Button>
        <span className="self-center">
          Page {currentPage} sur {totalPages}
        </span>
        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Suivant
        </Button>
      </div>

      {/* ConfirmDialog pour la suppression */}
      {productToDelete && (
        <ConfirmDialog
          isOpen={!!productToDelete}
          onClose={() => setProductToDelete(null)}
          onConfirm={handleDelete}
          title="Supprimer produit"
          description={`Êtes-vous sûr de vouloir supprimer ${productToDelete.name} ?`}
        />
      )}
    </div>
  );
}
