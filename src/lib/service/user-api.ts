import { fetchClient } from "../api/fetch-client";
import { CompanyDTO, UserDTO } from "../../types/type";

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
 * Retourne les informations de profil de l'utilisateur.
 * @returns {Promise<UserDTO>} Les informations de profile de l'utilisateur.
 */
export const getProfile = async (): Promise<UserDTO> => {
  try {
    const data = await fetchClient(`/user/profile`, { requiresAuth: true });
    return data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des informations de profil :",
      error
    );
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
    console.error("Erreur lors de la création de la compagnie :", error);
    throw error;
  }
};

/**
 * Modifie une compagnie existante.
 * @param {object} formData - Les données de la compagnie à modifier.
 * @returns {Promise<CompanyDTO>} La compagnie modifiée.
 */
export const editCompany = async (formData: FormData): Promise<CompanyDTO> => {
  try {
    const response = await fetchClient("/user/edit/company", {
      method: "PUT",
      body: formData,
      requiresAuth: true, // Requête nécessitant une authentification
    });

    return response;
  } catch (error) {
    console.error("Erreur lors de la modification de la compagnie :", error);
    throw error;
  }
};

/**
 * Modifie les informations de profil d'un utilisateur.
 * @param data - Données du profil utilisateur
 * @returns {Promise<UserDTO>} L'utiliateur modifiée.
 */
export const editProfile = async (data: {
  username: string;
  lastname: string;
  firstname: string;
}): Promise<UserDTO> => {
  try {
    const response = await fetchClient("/user/update-profile", {
      method: "PUT",
      body: JSON.stringify(data),
      requiresAuth: true, // Requête nécessitant une authentification
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    console.error("Erreur lors de la modification de l'utilisateur :", error);
    throw error;
  }
};

/**
 * Modifie le mot de passe d'un utilisateur.
 * @param {object} data - Les données du mot de passe de l'utilisateur à modifier.
 * @returns {Promise<string>} Le message de modification.
 */
export const editPassword = async (data: {
  password: string;
}): Promise<string> => {
  try {
    const response = await fetchClient("/user/update-password", {
      method: "PUT",
      body: JSON.stringify(data),
      requiresAuth: true, // Requête nécessitant une authentification
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.message;
  } catch (error) {
    console.error(
      "Erreur lors de la modification du mot de passe de l'utilisateur :",
      error
    );
    throw error;
  }
};
