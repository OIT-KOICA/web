import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ConfigurationState {
  cities: Array<{ id: string; name: string; region: string }>;
  setCities: (
    cities: Array<{ id: string; name: string; region: string }>
  ) => void;
}

const useConfigurationStore = create<ConfigurationState>()(
  persist(
    (set) => ({
      cities: [],

      setCities: (
        cities: Array<{ id: string; name: string; region: string }>
      ) => {
        console.log("Chargement des villes");
        set(() => ({ cities }));
      },
    }),
    { name: "configuration-store" }
  )
);

export default useConfigurationStore;
