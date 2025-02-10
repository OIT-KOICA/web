import { fetchClient } from "../api/fetch-client";
import { ProductDTO } from "../../types/type";

/**
 * Récupère tous les produits.
 * @returns {Promise<ProductDTO[]>} Les produits.
 */
export const getProducts = async (): Promise<ProductDTO[]> => {
  try {
    const data = await fetchClient(`/guest/products`, { requiresAuth: false });
    return data;
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
 * Récupère une liste de produits par le nom d'utlisateur.
 * @returns {Promise<ProductDTO[]> } Le produit correspondant.
 */
export const getProductByUserId = async (): Promise<ProductDTO[]> => {
  try {
    const data = await fetchClient(`/product/products`, {
      requiresAuth: true,
    });
    return data;
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
      requiresAuth: true, // Requête nécessitant une authentification
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
      requiresAuth: true, // Requête nécessitant une authentification
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
      requiresAuth: true, // Requête nécessitant une authentification
    });

    return response;
  } catch (error) {
    console.error("Echec lors de la suppression du produit :", error);
    throw error;
  }
};
