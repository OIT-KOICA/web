import { fetchClient } from "../api/fetch-client";
import { ArticleDTO, TagDTO } from "../../types/type";

export const getArticles = async (): Promise<ArticleDTO[]> => {
  try {
    const data = await fetchClient("/guest/articles", { requiresAuth: false });
    return data;
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

export const getArticleTags = async (): Promise<TagDTO[]> => {
  try {
    const data = await fetchClient("/guest/tags", { requiresAuth: false });
    return data;
  } catch (error) {
    console.error("Erreur lors du chargement des tags :", error);
    throw error;
  }
};

/**
 * Crée un nouveau tag.
 */
export const createArticleTag = async (tag: { name: string; description: string }): Promise<TagDTO> => {
  try {
    const response = await fetchClient("/article/create/tag", {
      method: "POST",
      body: JSON.stringify(tag),
      headers: { "Content-Type": "application/json" },
      requiresAuth: true,
    });

    return response;
  } catch (error) {
    console.error("Erreur lors de la création du tag :", error);
    throw error;
  }
};
