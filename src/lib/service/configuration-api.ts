import { fetchClient } from "../api/fetch-client";
import { CompanyDTO, Offer } from "../type";

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

export const getAdds = async (): Promise<Array<Offer>> => {
  try {
    const data = await fetchClient(`/guest/adds`, {
      requiresAuth: false,
    });
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des annonces :", error);
    throw error;
  }
};

export const createAdd = async (formData: {
  name: string;
  phone: string;
  location: string;
  description: string;
  categories: string[];
}): Promise<Offer> => {
  try {
    const response = await fetchClient("/guest/add/create", {
      method: "POST",
      headers: {
        "Content-Type": `application/json`,
      },
      body: JSON.stringify(formData),
      requiresAuth: false, // Requête nécessitant une authentification
    });

    return response;
  } catch (error) {
    console.error("Erreur lors de la création de l'annonce :", error);
    throw error;
  }
};
