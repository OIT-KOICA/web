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
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatCurrency } from "@/lib/utils";
import ConfirmDialog from "../confirm-dialog";
import useProductStore from "@/lib/stores/product-store";
import { ProductDTO } from "@/types/type";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useDeleteProduct } from "@/lib/query/product-query";

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
  const { setActiveProduct, setEdit } = useProductStore();
  const { toast } = useToast();
  const router = useRouter();
  const deleteProduct = useDeleteProduct();

  const handleDelete = async () => {
    if (productToDelete) {
      try {
        deleteProduct.mutate({
          slug: productToDelete.slug,
        });

        toast({
          title: "Produit supprimé avec succès",
          description: "Votre produit a été ajouté à la liste.",
        });

        router.push("/dashboard/products");
      } catch (error) {
        console.error("Failed to delete product:", error);

        toast({
          title: "Error",
          description:
            "Echec lors de la suppression du produit. Veuillez réessayer",
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
            <TableHead className="w-[200px]">
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
            <TableHead>Quantité en stock</TableHead>
            <TableHead>Prix unitaire</TableHead>
            <TableHead>Unité de mésure</TableHead>
            <TableHead>Date de création</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                Aucun produits trouvé
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
              <TableRow key={product.slug}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{formatCurrency(product.basePrice)}</TableCell>
                <TableCell>{product.unit}</TableCell>
                <TableCell>
                  {new Date(product.createdAt).toLocaleString()}
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
                        <Link href={`/dashboard/products/${product.slug}`}>
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
          Précedent
        </Button>
        <span className="self-center">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Suivant
        </Button>
      </div>

      <ConfirmDialog
        isOpen={!!productToDelete}
        onClose={() => setProductToDelete(null)}
        onConfirm={handleDelete}
        title="Delete Product"
        description={`Êtes vous sur de vouloir supprimer le produit : ${productToDelete?.name} ? Cette action est irreversible.`}
      />
    </div>
  );
}
