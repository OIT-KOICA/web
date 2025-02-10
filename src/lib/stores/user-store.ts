import { create } from "zustand";
import { checkUser } from "@/lib/service/user-api";
import { toast } from "@/hooks/use-toast";
import { CompanyDTO } from "../../types/type";
import { persist } from "zustand/middleware";

interface UserState {
  isNewUser: boolean | null; // `null` signifie que l'état n'a pas encore été chargé
  company: CompanyDTO | null;
  setUserStatus: () => Promise<void>; // Définit l'état utilisateur
  setStatus: () => Promise<void>; // Définit l'état utilisateur à false
  setCompany: (company: CompanyDTO) => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      isNewUser: null, // État initial : non défini
      company: null,

      setUserStatus: async () => {
        try {
          const { isNewUser } = await checkUser();
          set({ isNewUser });
        } catch (error) {
          console.error(
            "Erreur lors de la vérification de l'utilisateur :",
            error
          );
          toast({
            title: "Erreur",
            description: "Impossible de récupérer l'état de votre entreprise.",
            variant: "destructive",
          });
          set({ isNewUser: false }); // Par défaut, considère qu'il a une compagnie
        }
      },
      setStatus: async () => {
        set({ isNewUser: false });
      },
      setCompany: (company: CompanyDTO) => {
        if (!company) return;
        set(() => ({ company }));
      },
    }),
    { name: "user-store" }
  )
);

export default useUserStore;
