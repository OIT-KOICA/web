import { persist } from "zustand/middleware";
import { create } from "zustand";
import { Discussion, ProductDTO } from "../../types/type";

// Définir le type pour l'état et les actions du store
interface ProductStoreState {
  products: Array<ProductDTO>;
  discussions: Array<Discussion>;
  activeProduct: ProductDTO | null;
  activeDiscussion: Discussion | null;
  edit: boolean;
  setProducts: (products: Array<ProductDTO>) => void;
  setActiveProduct: (product: ProductDTO) => void;
  setDiscussions: (discussions: Array<Discussion>) => void;
  setActiveDiscussion: (discussion: Discussion) => void;
  setEdit: (edit: boolean) => void;
}

const useProductStore = create<ProductStoreState>()(
  persist(
    (set) => ({
      products: [],
      discussions: [],
      activeProduct: null,
      activeDiscussion: null,
      edit: false,

      setProducts: (products: Array<ProductDTO>) => {
        console.log("Mise à jour des produits :", products); // Log pour vérifier
        set(() => ({ products }));
      },
      setActiveProduct: (product: ProductDTO) => {
        console.log("Produit actif mis à jour :", product); // Log pour vérifier
        set(() => ({ activeProduct: product }));
      },
      setDiscussions: (discussions: Array<Discussion>) => {
        console.log("Mise à jour des discussions :", discussions); // Log pour vérifier
        set(() => ({ discussions }));
      },
      setActiveDiscussion: (discussion: Discussion) => {
        console.log("Discussion active mise à jour :", discussion); // Log pour vérifier
        set(() => ({ activeDiscussion: discussion }));
      },
      setEdit: (edit: boolean) => {
        console.log("Edition mise à jour :", edit);
        set(() => ({ edit: edit }));
      },
    }),
    {
      name: "product-store", // Nom dans le localStorage
    }
  )
);

export default useProductStore;
