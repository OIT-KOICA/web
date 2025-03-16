import { useMutation } from "@tanstack/react-query";

/**
 * Hook pour soumettre un message de contact.
 */
export const useContact = () => {
  return useMutation({
    mutationFn: async (contactData: {
      fullName: string;
      email: string;
      subject: string;
      message: string;
    }) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_PATH_URL}/guest/send-message`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(contactData),
        }
      );

      if (!response.ok) {
        throw new Error("Échec de l'envoi du message.");
      }

      return response.json();
    },
  });
};
