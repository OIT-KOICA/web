import { fetchClient } from "../api/fetch-client";
import { Discussion, DiscussionRequest, MessageRequest } from "../../types/type";

/**
 * Récupère toutes les discussions.
 * @returns {Promise<Discussion[]>} Les produits.
 */
export const getDiscussions = async (): Promise<Discussion[]> => {
  try {
    const data = await fetchClient(`/guest/discussions`, {
      requiresAuth: false,
    });
    return data;
  } catch (error) {
    console.error("Erreur lors du chargement des discussions :", error);
    throw error;
  }
};

/**
 * Récupère par le slug de son produit et le numéro de téléphone du client.
 * @param {string} code - Le code du produit.
 * @param {string} phone - Le numéro de téléphone du client.
 * @returns {Promise<Discussion> } La discussion correspondante.
 */
export const getDiscussion = async ({
  code,
  phone,
}: {
  code: string;
  phone: string;
}): Promise<Discussion> => {
  try {
    const data = await fetchClient(`/guest/discussion/${phone}/${code}`, {
      requiresAuth: false,
    });
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération de la discussion :", error);
    throw error;
  }
};

export const getDiscussionsByCode = async ({
  code,
}: {
  code: string;
}): Promise<Array<Discussion>> => {
  try {
    const data = await fetchClient(`/product/${code}/discussion`, {
      requiresAuth: true,
    });
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération de la discussion :", error);
    throw error;
  }
};

export const getDiscussionById = async ({
  id,
}: {
  id: string;
}): Promise<Discussion> => {
  try {
    const data = await fetchClient(`/product/discussion/${id}`, {
      requiresAuth: true,
    });
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération de la discussion :", error);
    throw error;
  }
};

/**
 * Crée une nouvelle discussion.
 * @param {object} discussionData - Les données de la discussion à créer.
 * @returns {Promise<Discussion>} La discussion créé.
 */
export const createDiscussion = async (
  discussionData: DiscussionRequest
): Promise<Discussion> => {
  try {
    const data = await fetchClient(`/guest/discussion/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(discussionData),
      requiresAuth: false,
    });
    return data;
  } catch (error) {
    console.error("Echec lors de la création de la discussion :", error);
    throw error;
  }
};

/**
 * Crée une nouveau message.
 * @param {object} messageData - Les données du message à créer.
 * @returns {Promise<Discussion>} La discussion concernée.
 */
export const createMessage = async (
  messageData: MessageRequest
): Promise<Discussion> => {
  try {
    const data = await fetchClient(`/guest/discussion/create/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageData),
      requiresAuth: false,
    });
    return data;
  } catch (error) {
    console.error("Echec lors de la création du message :", error);
    throw error;
  }
};

/**
 * Supprime la discussion par son id.
 * @param {string} id - L'ID de la discussion à supprimer.
 * @returns {Promise<string>} Le message de confirmation de la discussion supprimée.
 */
export const deleteDiscussion = async (id: string): Promise<string> => {
  try {
    const data = await fetchClient(`/guest/discussion/${id}`, {
      method: "DELETE",
      requiresAuth: false,
    });
    return data;
  } catch (error) {
    console.error("Echec lors de la suppression de la discussion :", error);
    throw error;
  }
};
