import { persist } from "zustand/middleware";
import { create } from "zustand";
import { Offer } from "../../types/type";

interface AddStoreState {
  adds: Array<Offer>;
  activeAdd: Offer | null;
  setAdds: (adds: Array<Offer>) => void;
  setActiveAdd: (add: Offer) => void;
}

const useAddStore = create<AddStoreState>()(
  persist(
    (set) => ({
      adds: [],
      activeAdd: null,
      edit: false,

      setAdds: (adds: Array<Offer>) => set(() => ({ adds })),
      setActiveAdd: (add: Offer) => set(() => ({ activeAdd: add })),
    }),
    { name: "add-store" }
  )
);

export default useAddStore;
