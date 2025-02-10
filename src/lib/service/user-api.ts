import { fetchClient } from "../api/fetch-client";
import { CompanyDTO } from "../../types/type";

/**
 * Vérifie si l'utilisateur connecté possède une entreprise ou pas.
 * @returns {Promise<{ isNewUser: boolean }>} Le booleen pour déterminer si oui ou non l'entreprise à été créée.
 */
export const checkUser = async (): Promise<{ isNewUser: boolean }> => {
  try {
    const data = await fetchClient(`/user/check-user`, { requiresAuth: true });
    return data;
  } catch (error) {
    console.error("Erreur checkUser :", error);
    throw error;
  }
};

/**
 * Crée une nouvelle compagnie.
 * @param {object} formData - Les données de la compagnie à créer.
 * @returns {Promise<CompanyDTO>} La compagnie créé.
 */
export const createCompany = async (
  formData: FormData
): Promise<CompanyDTO> => {
  try {
    const response = await fetchClient("/user/create/company", {
      method: "POST",
      body: formData,
      requiresAuth: true, // Requête nécessitant une authentification
    });

    return response;
  } catch (error) {
    console.error("Erreur lors de la création du produit :", error);
    throw error;
  }
};
