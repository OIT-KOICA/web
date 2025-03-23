import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createArticle,
  deleteArticle,
  getArticle,
  getArticles,
  getArticlesByUserId,
  updateArticle,
} from "../api/article-api";
import { useEffect } from "react";
import useStore from "../stores/store";

/**
 * Hook pour récupérer les articles d'un utilisateur avec pagination.
 */
export const useGetArticlesByUserID = () => {
  const queryClient = useQueryClient();
  const { setArticles, addArticles, setTotalPages } = useStore();

  const query = useInfiniteQuery({
    queryKey: ["user-articles"],
    queryFn: async ({ pageParam = 0 }) =>
      await getArticlesByUserId(pageParam, 10),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.currentPage < lastPage.totalPages
        ? lastPage.currentPage + 1
        : undefined;
    },
    staleTime: 0,
  });

  useEffect(() => {
    if (query.data) {
      const allArticles = query.data.pages.flatMap((page) => page.articles);
      setTotalPages(query.data.pages?.[0]?.totalPages ?? 1)
      setArticles(allArticles);
      queryClient.setQueryData(["user-articles"], addArticles);
    }
  }, [query.data, setArticles, queryClient, addArticles, setTotalPages]);

  return query;
};

/**
 * Hook pour récupérer les articles avec pagination.
 */
export const useGetArticles = () => {
  const queryClient = useQueryClient();
  const { setArticles, addArticles } = useStore();

  const query = useInfiniteQuery({
    queryKey: ["articles"],
    queryFn: async ({ pageParam = 0 }) => await getArticles(pageParam, 10),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.currentPage < lastPage.totalPages
        ? lastPage.currentPage + 1
        : undefined;
    },
    staleTime: 0,
  });

  useEffect(() => {
    if (query.data) {
      const allArticles = query.data.pages.flatMap((page) => page.articles);
      setArticles(allArticles);
      queryClient.setQueryData(["user-articles"], addArticles);
    }
  }, [query.data, setArticles, queryClient, addArticles]);

  return query;
};

/**
 * Hook pour récupérer un article par son slug.
 */
export const useGetArticle = (slug: string) => {
  const queryClient = useQueryClient();
  const { articles, addArticle } = useStore();
  const cachedArticle = articles.find((a) => a.slug === slug);

  const query = useQuery({
    queryKey: ["article", slug],
    queryFn: () => getArticle(slug),
    enabled: !!cachedArticle,
    staleTime: 0,
  });

  useEffect(() => {
    if (query.data && !cachedArticle) {
      addArticle(query.data);
      queryClient.setQueryData(["article", slug], query.data);
    }
  }, [query.data, queryClient, cachedArticle, addArticle, slug]);

  return {
    article: cachedArticle || query.data,
    isLoading: query.isLoading && !cachedArticle,
    isError: query.isError,
  };
};

/**
 * Hook pour créer un article.
 */
export const useCreateArticle = () => {
  const queryClient = useQueryClient();
  const { addArticle } = useStore();

  return useMutation({
    mutationFn: ({ articleData }: { articleData: FormData }) =>
      createArticle(articleData),
    onSuccess: (newArticle) => {
      addArticle(newArticle);
      queryClient.invalidateQueries({ queryKey: ["user-articles"] });
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });
};

/**
 * Hook pour mettre à jour un article.
 */
export const useUpdateArticle = () => {
  const queryClient = useQueryClient();
  const { setArticle } = useStore();

  return useMutation({
    mutationFn: ({
      slug,
      articleData,
    }: {
      slug: string;
      articleData: FormData;
    }) => updateArticle(slug, articleData),
    onSuccess: (updatedArticle) => {
      setArticle(updatedArticle.slug, updatedArticle);
      queryClient.invalidateQueries({ queryKey: ["user-articles"] });
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });
};

/**
 * Hook pour supprimer un article.
 */
export const useDeleteArticle = () => {
  const queryClient = useQueryClient();
  const { removeArticle } = useStore();

  return useMutation({
    mutationFn: ({ slug }: { slug: string }) => deleteArticle(slug),
    onSuccess: (_, { slug }) => {
      removeArticle(slug);
      queryClient.invalidateQueries({ queryKey: ["user-articles"] });
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });
};
