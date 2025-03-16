import { EventDTO } from "@/types/typeDTO";
import { fetchClient } from "../fetch-client";

/**
 * Récupère une liste paginée d'évènements.
 * @param {number} page - Numéro de la page actuelle.
 * @param {number} pageSize - Nombre d'évènements par page.
 * @returns {Promise<{ events: EventDTO[]; totalPages: number; totalItems: number; currentPage: number }>}
 */
export const getEvents = async (page: number = 0, pageSize: number = 10) => {
  try {
    const response = await fetchClient(
      `/guest/events?page=${page}&size=${pageSize}`,
      {
        requiresAuth: false,
      }
    );

    return {
      events: response.events || [],
      totalPages: response.totalPages || 0,
      totalItems: response.totalItems || 0,
      currentPage: response.currentPage || 1,
    };
  } catch (error) {
    console.error("Erreur lors du chargement des évènements :", error);
    throw error;
  }
};

export const getEvent = async (slug: string): Promise<EventDTO> => {
  try {
    const data = await fetchClient(`/guest/event/${slug}`, {
      requiresAuth: false,
    });
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'évènement :", error);
    throw error;
  }
};

export const createEvent = async (
  eventData: FormData
): Promise<EventDTO> => {
  try {
    const response = await fetchClient("/event/create", {
      method: "POST",
      body: eventData,
      requiresAuth: true,
    });

    return response;
  } catch (error) {
    console.error("Echec lors de la création de l'évènement :", error);
    throw error;
  }
};

export const updateEvent = async (
  slug: string,
  eventData: FormData
): Promise<EventDTO> => {
  try {
    const response = await fetchClient(`/event/edit/${slug}`, {
      method: "PUT",
      body: eventData,
      requiresAuth: true,
    });

    return response;
  } catch (error) {
    console.error("Echec lors de la modification de l'évènement :", error);
    throw error;
  }
};

export const deleteEvent = async (slug: string): Promise<string> => {
  try {
    const response = await fetchClient(`/event/delete/${slug}`, {
      method: "DELETE",
      requiresAuth: true,
    });

    return response;
  } catch (error) {
    console.error("Echec lors de la suppression de l'évènement :", error);
    throw error;
  }
};

/**
 * Récupère une liste d'évènements par utilisateur avec pagination.
 * @param {number} page - Numéro de la page actuelle.
 * @param {number} pageSize - Nombre de produits par page.
 * @returns {Promise<{ events: EventDTO[]; totalPages: number; totalItems: number; currentPage: number }>}
 */
export const getEventsByUserId = async (
  page: number = 0,
  pageSize: number = 10
) => {
  try {
    const response = await fetchClient(
      `/event/user-events?page=${page}&size=${pageSize}`,
      {
        requiresAuth: true,
      }
    );

    return {
      events: response.events || [],
      totalPages: response.totalPages || 0,
      totalItems: response.totalItems || 0,
      currentPage: response.currentPage || 1,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des évènements :", error);
    throw error;
  }
};
