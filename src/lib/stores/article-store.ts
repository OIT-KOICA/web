import { persist } from "zustand/middleware";
import { create } from "zustand";
import { ArticleDTO } from "../../types/type";

interface ArticleStoreState {
  articles: Array<ArticleDTO>;
  activeArticle: ArticleDTO | null;
  edit: boolean;
  searchTerm: string;
  activeCategory: string;
  setArticles: (articles: Array<ArticleDTO>) => void;
  setActiveArticle: (article: ArticleDTO) => void;
  setEdit: (edit: boolean) => void;
  setSearchTerm: (term: string) => void;
  setActiveCategory: (category: string) => void;
  clearFilters: () => void;
}

const useArticleStore = create<ArticleStoreState>()(
  persist(
    (set) => ({
      articles: [],
      activeArticle: null,
      edit: false,
      searchTerm: "",
      activeCategory: "Toutes les catégories",

      setArticles: (articles: Array<ArticleDTO>) => set(() => ({ articles })),
      setActiveArticle: (article: ArticleDTO) =>
        set(() => ({ activeArticle: article })),
      setEdit: (edit: boolean) => set(() => ({ edit })),
      setSearchTerm: (term) => set({ searchTerm: term }),
      setActiveCategory: (category) => set({ activeCategory: category }),
      clearFilters: () =>
        set({ searchTerm: "", activeCategory: "Toutes les catégories" }),
    }),
    { name: "article-store" }
  )
);

export default useArticleStore;
