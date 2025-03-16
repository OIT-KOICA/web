import { ProductDTO } from "@/types/typeDTO";
import { fetchClient } from "../fetch-client";

/**
 * Récupère tous les produits en paginant.
 * @param {number} page - Numéro de la page actuelle.
 * @param {number} pageSize - Nombre de produits par page.
 * @returns {Promise<{ products: ProductDTO[]; totalPages: number; totalItems: number; currentPage: number }>}
 */
export const getProducts = async (page: number = 0, pageSize: number = 10) => {
  try {
    const response = await fetchClient(
      `/guest/products?page=${page}&size=${pageSize}`,
      {
        requiresAuth: false,
      }
    );

    return {
      products: response.products || [],
      totalPages: response.totalPages || 0,
      totalItems: response.totalItems || 0,
      currentPage: response.currentPage || 1,
    };
  } catch (error) {
    console.error("Erreur lors du chargement des produits :", error);
    throw error;
  }
};

/**
 * Récupère un produit par son slug.
 * @param {string} slug - Le slug du produit.
 * @returns {Promise<ProductDTO> } Le produit correspondant.
 */
export const getProduct = async (slug: string): Promise<ProductDTO> => {
  try {
    const data = await fetchClient(`/guest/product/${slug}`, {
      requiresAuth: false,
    });
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération du produit :", error);
    throw error;
  }
};

/**
 * Récupère une liste de produits par utilisateur avec pagination.
 * @param {number} page - Numéro de la page actuelle.
 * @param {number} pageSize - Nombre de produits par page.
 * @returns {Promise<{ products: ProductDTO[]; totalPages: number; totalItems: number; currentPage: number }>}
 */
export const getProductsByUserId = async (
  page: number = 0,
  pageSize: number = 10
) => {
  try {
    const response = await fetchClient(
      `/product/user-products?page=${page}&size=${pageSize}`,
      {
        requiresAuth: true,
      }
    );

    return {
      products: response.products || [],
      totalPages: response.totalPages || 0,
      totalItems: response.totalItems || 0,
      currentPage: response.currentPage || 1,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    throw error;
  }
};

/**
 * Crée un nouveau produit.
 * @param {object} productData - Les données du produit à créer.
 * @param {string} token - Le token d'authentification.
 * @returns {Promise<ProductDTO>} Le produit créé.
 */
export const createProduct = async (
  productData: FormData
): Promise<ProductDTO> => {
  try {
    const response = await fetchClient("/product/create", {
      method: "POST",
      body: productData,
      requiresAuth: true,
    });

    return response;
  } catch (error) {
    console.error("Echec lors de la création du produit :", error);
    throw error;
  }
};

/**
 * Met à jour un produit existant.
 * @param {string} slug - Le slug du produit à mettre à jour.
 * @param {object} productData - Les nouvelles données du produit.
 * @returns {Promise<ProductDTO>} Le produit mis à jour.
 */
export const updateProduct = async (
  slug: string,
  productData: FormData
): Promise<ProductDTO> => {
  try {
    const response = await fetchClient(`/product/edit/${slug}`, {
      method: "PUT",
      body: productData,
      requiresAuth: true,
    });

    return response;
  } catch (error) {
    console.error("Echec lors de la modification du produit :", error);
    throw error;
  }
};

/**
 * Supprime un produit par son slug.
 * @param {string} slug - Le slug du produit à supprimer.
 * @param {string} token - Le token d'authentification.
 * @returns {Promise<string>} Le message de confirmation du produit supprimé.
 */
export const deleteProduct = async (slug: string): Promise<string> => {
  try {
    const response = await fetchClient(`/product/delete/${slug}`, {
      method: "DELETE",
      requiresAuth: true,
    });

    return response;
  } catch (error) {
    console.error("Echec lors de la suppression du produit :", error);
    throw error;
  }
};
