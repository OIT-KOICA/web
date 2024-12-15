import { create } from "zustand";
import { checkUser } from "@/lib/service/user-api";
import { clearNextAuthCookies } from "../utils";

interface UserState {
  isNewUser: boolean | null; // `null` signifie que l'état n'a pas encore été chargé
  setUserStatus: (token: string) => Promise<void>; // Définit l'état utilisateur
  setStatus: () => Promise<void>; // Définit l'état utilisateur à false
}

const useUserStore = create<UserState>((set) => ({
  isNewUser: null, // État initial : non défini

  setUserStatus: async (token: string) => {
    try {
      const { isNewUser } = await checkUser(token);
      set({ isNewUser });
    } catch (error) {
      clearNextAuthCookies();
      console.error("Erreur lors de la vérification de l'utilisateur :", error);
      throw error; // Vous pouvez rediriger vers une page d'erreur ici
    }
  },
  setStatus: async () => {
    set({ isNewUser: false });
  },
}));

export default useUserStore;
