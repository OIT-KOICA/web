import { ArticleDTO } from "@/types/typeDTO";
import { fetchClient } from "../fetch-client";

/**
 * Récupère une liste paginée d'articles.
 * @param {number} page - Numéro de la page actuelle.
 * @param {number} pageSize - Nombre d'articles par page.
 * @returns {Promise<{ articles: ArticleDTO[]; totalPages: number; totalItems: number; currentPage: number }>}
 */
export const getArticles = async (page: number = 0, pageSize: number = 10) => {
  try {
    const response = await fetchClient(
      `/guest/articles?page=${page}&size=${pageSize}`,
      {
        requiresAuth: false,
      }
    );

    return {
      articles: response.articles || [],
      totalPages: response.totalPages || 0,
      totalItems: response.totalItems || 0,
      currentPage: response.currentPage || 1,
    };
  } catch (error) {
    console.error("Erreur lors du chargement des articles :", error);
    throw error;
  }
};

export const getArticle = async (slug: string): Promise<ArticleDTO> => {
  try {
    const data = await fetchClient(`/guest/article/${slug}`, {
      requiresAuth: false,
    });
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'article :", error);
    throw error;
  }
};

export const createArticle = async (
  articleData: FormData
): Promise<ArticleDTO> => {
  try {
    const response = await fetchClient("/article/create", {
      method: "POST",
      body: articleData,
      requiresAuth: true,
    });

    return response;
  } catch (error) {
    console.error("Echec lors de la création de l'article :", error);
    throw error;
  }
};

export const updateArticle = async (
  slug: string,
  articleData: FormData
): Promise<ArticleDTO> => {
  try {
    const response = await fetchClient(`/article/edit/${slug}`, {
      method: "PUT",
      body: articleData,
      requiresAuth: true,
    });

    return response;
  } catch (error) {
    console.error("Echec lors de la modification de l'article :", error);
    throw error;
  }
};

export const deleteArticle = async (slug: string): Promise<string> => {
  try {
    const response = await fetchClient(`/article/delete/${slug}`, {
      method: "DELETE",
      requiresAuth: true,
    });

    return response;
  } catch (error) {
    console.error("Echec lors de la suppression de l'article :", error);
    throw error;
  }
};

/**
 * Récupère une liste d'articles par utilisateur avec pagination.
 * @param {number} page - Numéro de la page actuelle.
 * @param {number} pageSize - Nombre de produits par page.
 * @returns {Promise<{ articles: ArticleDTO[]; totalPages: number; totalItems: number; currentPage: number }>}
 */
export const getArticlesByUserId = async (
  page: number = 0,
  pageSize: number = 10
) => {
  try {
    const response = await fetchClient(
      `/article/user-articles?page=${page}&size=${pageSize}`,
      {
        requiresAuth: true,
      }
    );

    return {
      articles: response.articles || [],
      totalPages: response.totalPages || 0,
      totalItems: response.totalItems || 0,
      currentPage: response.currentPage || 1,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des articles :", error);
    throw error;
  }
};
