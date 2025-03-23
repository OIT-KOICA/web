/* eslint-disable @typescript-eslint/no-unused-vars */
import { persist } from "zustand/middleware";
import { create } from "zustand";
import {
  ArticleDTO,
  CompanyDTO,
  Discussion,
  EventDTO,
  Offer,
  ProductDTO,
  UserDTO,
} from "@/types/typeDTO";
import { toast } from "@/lib/hooks/use-toast";
import { checkUser } from "../api/user-api";

interface StoreState {
  isNewUser: boolean | null;
  company: CompanyDTO | null;
  companies: Array<CompanyDTO>;
  user: UserDTO | null;
  products: Array<ProductDTO>;
  activeProduct: ProductDTO | null;
  discussions: Array<Discussion>;
  activeDiscussion: Discussion | null;
  articles: Array<ArticleDTO>;
  activeArticle: ArticleDTO | null;
  activeCategory: string;
  events: Array<EventDTO>;
  activeEvent: EventDTO | null;
  adds: Array<Offer>;
  activeAdd: Offer | null;
  cities: Array<{ id: string; name: string; region: string }>;
  units: Array<{ id: string; name: string }>;
  edit: boolean;
  searchTerm: string;
  totalPages: number;
  refreshCompany: boolean;
  setUserStatus: () => Promise<void>;
  setStatus: () => Promise<void>;
  setCompany: (company: CompanyDTO) => void;
  setCompanies: (companies: CompanyDTO[]) => void;
  setUser: (activeUser: UserDTO) => void;
  clearUser: () => void;
  clearCompany: () => void;
  setProducts: (products: Array<ProductDTO>) => void;
  addProducts: (newProducts: Array<ProductDTO>) => void;
  addProduct: (product: ProductDTO) => void;
  setProduct: (slug: string, newData: Partial<ProductDTO>) => void;
  removeProduct: (slug: string) => void;
  setActiveProduct: (product: ProductDTO) => void;
  setDiscussions: (discussions: Array<Discussion>) => void;
  addDiscussion: (discussion: Discussion) => void;
  updateDiscussion: (id: string, newData: Partial<Discussion>) => void;
  removeDiscussion: (id: string) => void;
  setActiveDiscussion: (discussion: Discussion) => void;
  setArticles: (articles: Array<ArticleDTO>) => void;
  addArticles: (newArticles: Array<ArticleDTO>) => void;
  addArticle: (article: ArticleDTO) => void;
  setArticle: (slug: string, newData: Partial<ArticleDTO>) => void;
  removeArticle: (slug: string) => void;
  setActiveArticle: (article: ArticleDTO) => void;
  setActiveCategory: (category: string) => void;
  setEvents: (events: Array<EventDTO>) => void;
  addEvents: (newEvents: Array<EventDTO>) => void;
  addEvent: (event: EventDTO) => void;
  setEvent: (slug: string, newData: Partial<EventDTO>) => void;
  removeEvent: (slug: string) => void;
  setActiveEvent: (event: EventDTO) => void;
  setAdds: (adds: Array<Offer>) => void;
  addAdds: (newAdds: Array<Offer>) => void;
  addAdd: (add: Offer) => void;
  setAdd: (slug: string, newData: Partial<ArticleDTO>) => void;
  removeAdd: (slug: string) => void;
  setActiveAdd: (add: Offer) => void;
  setCities: (
    cities: Array<{ id: string; name: string; region: string }>
  ) => void;
  setUnits: (units: Array<{ id: string; name: string }>) => void;
  setEdit: (edit: boolean) => void;
  setSearchTerm: (term: string) => void;
  clearFilters: () => void;
  setTotalPages: (total: number) => void;
  clearCompanies: () => void;
  setRefreshCompany: (value: boolean) => void;
}

const useStore = create<StoreState>()(
  persist(
    (set) => ({
      isNewUser: null,
      company: null,
      companies: [],
      user: null,
      products: [],
      activeProduct: null,
      discussions: [],
      activeDiscussion: null,
      articles: [],
      activeArticle: null,
      activeCategory: "Toutes les catégories",
      events: [],
      activeEvent: null,
      adds: [],
      activeAdd: null,
      cities: [],
      units: [],
      edit: false,
      searchTerm: "",
      totalPages: 0,
      refreshCompany: false,

      setUserStatus: async () => {
        try {
          const { isNewUser } = await checkUser();
          set({ isNewUser });
        } catch (error) {
          toast({
            title: "Erreur",
            description: "Impossible de récupérer l'état de votre entreprise.",
            variant: "destructive",
          });
          set({ isNewUser: false });
        }
      },
      setStatus: async () => set({ isNewUser: false }),
      setCompany: (company: CompanyDTO) => set(() => ({ company })),
      setCompanies: (companies: Array<CompanyDTO>) =>
        set(() => ({ companies })),
      setUser: (activeUser: UserDTO) => set(() => ({ user: activeUser })),
      clearUser: () => set({ user: null }),
      clearCompany: () => set({ company: null }),
      setProducts: (products: Array<ProductDTO>) => set(() => ({ products })),
      addProducts: (newProducts?: Array<ProductDTO>) =>
        set((state) => ({
          products: [
            ...state.products,
            ...(Array.isArray(newProducts) ? newProducts : []),
          ],
        })),
      addProduct: (product: ProductDTO) =>
        set((state) => ({
          products: [
            ...state.products.filter((p) => p.slug != product.slug),
            product,
          ],
        })),
      setProduct: (slug: string, newData: Partial<ProductDTO>) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.slug === slug ? { ...p, ...newData } : p
          ),
        })),
      removeProduct: (slug: string) =>
        set((state) => ({
          products: state.products.filter((p) => p.slug !== slug),
        })),
      setActiveProduct: (product: ProductDTO) =>
        set(() => ({ activeProduct: product })),
      setDiscussions: (discussions: Array<Discussion>) =>
        set(() => ({ discussions })),
      addDiscussion: (discussion: Discussion) =>
        set((state) => ({
          discussions: [...state.discussions, discussion],
        })),
      updateDiscussion: (id: string, newData: Partial<Discussion>) =>
        set((state) => ({
          discussions: state.discussions.map((d) =>
            d.id === id ? { ...d, ...newData } : d
          ),
        })),
      removeDiscussion: (id: string) =>
        set((state) => ({
          discussions: state.discussions.filter((d) => d.id !== id),
        })),
      setActiveDiscussion: (discussion: Discussion) =>
        set(() => ({ activeDiscussion: discussion })),
      setArticles: (articles: Array<ArticleDTO>) => set(() => ({ articles })),
      addArticles: (newArticles?: Array<ArticleDTO>) =>
        set((state) => ({
          articles: [
            ...state.articles,
            ...(Array.isArray(newArticles) ? newArticles : []),
          ],
        })),
      addArticle: (article: ArticleDTO) =>
        set((state) => ({
          articles: [
            ...state.articles.filter((a) => a.slug != article.slug),
            article,
          ],
        })),
      setArticle: (slug: string, newData: Partial<ArticleDTO>) =>
        set((state) => ({
          articles: state.articles.map((a) =>
            a.slug === slug ? { ...a, ...newData } : a
          ),
        })),
      removeArticle: (slug: string) =>
        set((state) => ({
          articles: state.articles.filter((a) => a.slug !== slug),
        })),
      setActiveArticle: (article: ArticleDTO) =>
        set(() => ({ activeArticle: article })),
      setActiveCategory: (category) => set({ activeCategory: category }),
      setEvents: (events: Array<EventDTO>) => set(() => ({ events })),
      addEvents: (newEvents?: Array<EventDTO>) =>
        set((state) => ({
          events: [
            ...state.events,
            ...(Array.isArray(newEvents) ? newEvents : []),
          ],
        })),
      addEvent: (event: EventDTO) =>
        set((state) => ({
          events: [...state.events.filter((e) => e.slug != event.slug), event],
        })),
      setEvent: (slug: string, newData: Partial<EventDTO>) =>
        set((state) => ({
          events: state.events.map((e) =>
            e.slug === slug ? { ...e, ...newData } : e
          ),
        })),
      removeEvent: (slug: string) =>
        set((state) => ({
          events: state.events.filter((e) => e.slug !== slug),
        })),
      setActiveEvent: (event: EventDTO) => set(() => ({ activeEvent: event })),
      setAdds: (adds: Array<Offer>) => set(() => ({ adds })),
      addAdds: (newAdds?: Array<Offer>) =>
        set((state) => ({
          adds: [...state.adds, ...(Array.isArray(newAdds) ? newAdds : [])],
        })),
      addAdd: (add: Offer) =>
        set((state) => ({
          adds: [...state.adds.filter((a) => a.id != add.id), add],
        })),
      setAdd: (id: string, newData: Partial<Offer>) =>
        set((state) => ({
          adds: state.adds.map((a) => (a.id === id ? { ...a, ...newData } : a)),
        })),
      removeAdd: (id: string) =>
        set((state) => ({
          adds: state.adds.filter((a) => a.id !== id),
        })),
      setActiveAdd: (add: Offer) => set(() => ({ activeAdd: add })),
      setCities: (
        cities: Array<{ id: string; name: string; region: string }>
      ) => set(() => ({ cities })),
      setUnits: (units: Array<{ id: string; name: string }>) =>
        set(() => ({ units })),
      setEdit: (edit: boolean) => set(() => ({ edit })),
      setSearchTerm: (term) => set({ searchTerm: term }),
      clearFilters: () =>
        set({ searchTerm: "", activeCategory: "Toutes les catégories" }),
      setTotalPages: (total: number) => set(() => ({ totalPages: total })),
      clearCompanies: () => set(() => ({ companies: [], activeCompany: null })),
      setRefreshCompany: (value: boolean) => set({ refreshCompany: value }),
    }),
    { name: "store" }
  )
);

export default useStore;
