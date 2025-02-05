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
import useArticleStore from "@/lib/stores/article-store";
import { ArticleDTO } from "@/lib/type";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useDeleteArticle } from "@/lib/query/article-query";
import ConfirmDialog from "../confirm-dialog";

interface ArticleTableProps {
  articles: ArticleDTO[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  sortOrder: "asc" | "desc";
  onSortOrderChange: (order: "asc" | "desc") => void;
}

export default function ArticleTable({
  articles,
  currentPage,
  totalPages,
  onPageChange,
  sortOrder,
  onSortOrderChange,
}: ArticleTableProps) {
  const [articleToDelete, setArticleToDelete] = useState<ArticleDTO | null>(
    null
  );
  const { setActiveArticle, setEdit } = useArticleStore();
  const { toast } = useToast();
  const router = useRouter();
  const deleteArticle = useDeleteArticle();

  const handleDelete = async () => {
    if (articleToDelete) {
      try {
        deleteArticle.mutate({
          slug: articleToDelete.slug,
        });

        toast({
          title: "Article supprimé avec succès",
          description: "L'article a été retiré de la liste.",
        });

        router.push("/dashboard/articles");
      } catch (error) {
        console.error("Failed to delete article:", error);

        toast({
          title: "Erreur",
          description:
            "Échec lors de la suppression de l'article. Veuillez réessayer",
          variant: "destructive",
        });
      } finally {
        setArticleToDelete(null);
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
                Titre
                <ArrowUpDown className="ml-2 size-4" />
              </Button>
            </TableHead>
            <TableHead>Catégorie</TableHead>
            <TableHead>Date de création</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {articles.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                Aucun article trouvé
              </TableCell>
            </TableRow>
          ) : (
            articles.map((article) => (
              <TableRow key={article.slug}>
                <TableCell className="font-medium">{article.title}</TableCell>
                <TableCell>{article.category}</TableCell>
                <TableCell>
                  {new Date(article.createdAt).toLocaleString()}
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
                        onClick={() => setActiveArticle(article)}
                      >
                        <Link href={`/dashboard/articles/${article.slug}`}>
                          Consulter
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        asChild
                        onClick={() => {
                          setEdit(true);
                          setActiveArticle(article);
                        }}
                      >
                        <Link href={`/dashboard/articles/create`}>
                          Modifier
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => setArticleToDelete(article)}
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

      <ConfirmDialog
        isOpen={!!articleToDelete}
        onClose={() => setArticleToDelete(null)}
        onConfirm={handleDelete}
        title="Supprimer l'article"
        description={`Êtes-vous sûr de vouloir supprimer : ${articleToDelete?.title} ? Cette action est irréversible.`}
      />
    </div>
  );
}
