import { getSession, signOut } from "next-auth/react";

/**
 * Fetch client global avec intercepteurs pour gérer les erreurs et ajouter le token.
 * @param endpoint - L'URL relative de l'API.
 * @param options - Options pour fetch (method, body, etc.).
 */
export async function fetchClient(
  endpoint: string,
  options: RequestInit & { requiresAuth?: boolean } = {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
  const baseUrl = process.env.NEXT_PUBLIC_API_PATH_URL;

  // Récupère la session utilisateur via NextAuth
  const session = await getSession();

  // Ajoute le token si nécessaire
  const config: RequestInit = {
    ...options,
    headers: {
      ...options.headers,
      ...(options.requiresAuth !== false &&
        session?.accessToken && {
          Authorization: `Bearer ${session.accessToken}`,
        }), // Ajout conditionnel du token
    },
  };

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, config);

    if (!response.ok) {
      if (response.status === 401 && options.requiresAuth !== false) {
        signOut({ callbackUrl: "/" });
        return;
      }

      // Gestion d'autres erreurs API
      const errorData = await response.json();
      throw new Error(errorData.message || "Une erreur est survenue.");
    }

    return await response.json(); // Retourne la réponse JSON
  } catch (error) {
    console.error("Erreur FetchClient :", error);
    throw error;
  }
}
