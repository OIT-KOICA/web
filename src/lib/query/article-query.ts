import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createArticle,
  createArticleTag,
  deleteArticle,
  getArticle,
  getArticles,
  getArticleTags,
  updateArticle,
} from "../service/article-api";

/**
 * Hook pour récupérer tous les articles.
 */
export const useGetArticles = () => {
  const { data, refetch } = useQuery({
    queryKey: ["articles"],
    queryFn: getArticles,
  });

  return { articles: data, refetch };
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

/**
 * Hook pour récupérer les tags d'articles.
 */
export const useGetArticleTags = () => {
  const { data, refetch } = useQuery({
    queryKey: ["article-tags"],
    queryFn: getArticleTags,
  });

  return { tags: data, refetch };
};

/**
 * Hook pour créer un nouveau tag.
 */
export const useCreateArticleTag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      name,
      description,
    }: {
      name: string;
      description: string;
    }) => createArticleTag({ name, description }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["article-tags"] });
    },
  });
};
