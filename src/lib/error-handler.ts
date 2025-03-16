/**
 * Gère les erreurs globales d'API.
 * @param error - L'erreur capturée.
 */
export function handleApiError(error: Error) {
  console.error("Erreur API :", error.message);
  alert(`Erreur : ${error.message}`);
  throw error;
}
