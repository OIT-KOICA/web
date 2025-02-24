import { fetchClient } from "../api/fetch-client";
import { CompanyDTO, NotificationDTO, Offer } from "../../types/type";

export const getCities = async (): Promise<
  Array<{
    id: string;
    name: string;
    region: string;
  }>
> => {
  try {
    const data = await fetchClient(`/guest/cities`, {
      requiresAuth: false,
    });
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des villes :", error);
    throw error;
  }
};

export const getUnits = async (): Promise<
  Array<{
    id: string;
    name: string;
  }>
> => {
  try {
    const data = await fetchClient(`/guest/units`, {
      requiresAuth: false,
    });
    return data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des unités de mesure :",
      error
    );
    throw error;
  }
};

export const getNotifications = async (): Promise<Array<NotificationDTO>> => {
  try {
    const data = await fetchClient(`/user/notifications`, {
      requiresAuth: true,
    });
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des notifications", error);
    throw error;
  }
};

export const markAsRead = async (id: string): Promise<string> => {
  try {
    const data = await fetchClient(`/user/notifications/${id}/read`, {
      method: "PUT",
      requiresAuth: true,
    });
    return data;
  } catch (error) {
    console.error("Erreur lors de la modification de la notification", error);
    throw error;
  }
};

export const getCompany = async (): Promise<CompanyDTO> => {
  try {
    const data = await fetchClient(`/user/company`, {
      requiresAuth: true,
    });
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération de la compagnie :", error);
    throw error;
  }
};

/**
 * Récupère une liste paginée d'annonces.
 * @param {number} page - Numéro de la page actuelle.
 * @param {number} pageSize - Nombre d'annonces par page.
 * @returns {Promise<{ adds: Offer[]; totalPages: number; totalItems: number; currentPage: number }>}
 */
export const getAdds = async (page: number = 0, pageSize: number = 10) => {
  try {
    const response = await fetchClient(
      `/guest/adds?page=${page}&size=${pageSize}`,
      {
        requiresAuth: false,
      }
    );

    return {
      adds: response.adds || [],
      totalPages: response.totalPages || 0,
      totalItems: response.totalItems || 0,
      currentPage: response.currentPage || 1,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des annonces :", error);
    throw error;
  }
};

export const createAdd = async (formData: FormData): Promise<Offer> => {
  try {
    const response = await fetchClient("/guest/add/create", {
      method: "POST",
      body: formData,
      requiresAuth: false, // Requête nécessitant une authentification
    });

    return response;
  } catch (error) {
    console.error("Erreur lors de la création de l'annonce :", error);
    throw error;
  }
};
