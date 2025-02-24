import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createArticle,
  deleteArticle,
  getArticle,
  getArticles,
  updateArticle,
} from "../service/article-api";

/**
 * Hook pour récupérer les articles avec pagination.
 */
export const useGetArticles = () => {
  return useInfiniteQuery({
    queryKey: ["articles"],
    queryFn: async ({ pageParam = 0 }) => await getArticles(pageParam, 10),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.currentPage < lastPage.totalPages ? lastPage.currentPage + 1 : undefined;
    },
  });
};

/**
 * Hook pour récupérer un article par son slug.
 */
export const useGetArticle = (slug: string) => {
  const { data, refetch, error } = useQuery({
    queryKey: ["article", slug],
    queryFn: () => getArticle(slug),
    enabled: !!slug,
  });

  return { article: data, refetch, error };
};

/**
 * Hook pour créer un article.
 */
export const useCreateArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ articleData }: { articleData: FormData }) =>
      createArticle(articleData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });
};

/**
 * Hook pour mettre à jour un article.
 */
export const useUpdateArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      slug,
      articleData,
    }: {
      slug: string;
      articleData: FormData;
    }) => updateArticle(slug, articleData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });
};

/**
 * Hook pour supprimer un article.
 */
export const useDeleteArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ slug }: { slug: string }) => deleteArticle(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });
};
