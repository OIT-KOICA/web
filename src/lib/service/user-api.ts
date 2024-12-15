import { CompanyDTO } from "../type";

/**
 * Vérifie si l'utilisateur connecté possède une entreprise ou pas.
 * @param {string} token - Le token d'authentification
 * @returns {Promise<{ isNewUser: boolean }>} Le booleen pour déterminer si oui ou non l'entreprise à été créée.
 */
export const checkUser = async (
  token: string
): Promise<{ isNewUser: boolean }> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_PATH_URL}/user/check-user`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      if (res.status === 401) {
        throw new Error("Token expiré ou non valide");
      }
      throw new Error("Erreur lors de la vérification de l'utilisateur");
    }

    return res.json();
  } catch (error) {
    console.error("Erreur checkUser :", error.message);
    throw error;
  }
};

/**
 * Crée une nouvelle compagnie.
 * @param {object} formData - Les données de la compagnie à créer.
 * @param {string} token - Le token d'authentification.
 * @returns {Promise<CompanyDTO>} La compagnie créé.
 */
export const createCompany = async (
  formData: FormData,
  token: string
): Promise<CompanyDTO> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_PATH_URL}/user/create/company`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );
  if (!res.ok) throw new Error("Erreur lors de la création de la compagnie");

  return res.json();
};
