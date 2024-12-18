import { create } from "zustand";
import { checkUser } from "@/lib/service/user-api";

interface UserState {
  isNewUser: boolean | null; // `null` signifie que l'état n'a pas encore été chargé
  setUserStatus: () => Promise<void>; // Définit l'état utilisateur
  setStatus: () => Promise<void>; // Définit l'état utilisateur à false
}

const useUserStore = create<UserState>((set) => ({
  isNewUser: null, // État initial : non défini

  setUserStatus: async () => {
    try {
      const { isNewUser } = await checkUser();
      set({ isNewUser });
    } catch (error) {
      console.error("Erreur lors de la vérification de l'utilisateur :", error);
      set({ isNewUser: false }); // Par défaut, considère qu'il a une compagnie
    }
  },
  setStatus: async () => {
    set({ isNewUser: false });
  },
}));

export default useUserStore;
