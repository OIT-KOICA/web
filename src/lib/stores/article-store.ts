import { persist } from "zustand/middleware";
import { create } from "zustand";
import { ArticleDTO, TagDTO } from "../../types/type";

interface ArticleStoreState {
  articles: Array<ArticleDTO>;
  activeArticle: ArticleDTO | null;
  edit: boolean;
  tags: Array<TagDTO>;
  setArticles: (articles: Array<ArticleDTO>) => void;
  setActiveArticle: (article: ArticleDTO) => void;
  setEdit: (edit: boolean) => void;
  setTags: (tags: Array<TagDTO>) => void;
}

const useArticleStore = create<ArticleStoreState>()(
  persist(
    (set) => ({
      articles: [],
      activeArticle: null,
      edit: false,
      tags: [],

      setArticles: (articles: Array<ArticleDTO>) => set(() => ({ articles })),
      setActiveArticle: (article: ArticleDTO) =>
        set(() => ({ activeArticle: article })),
      setEdit: (edit: boolean) => set(() => ({ edit })),
      setTags: (tags: Array<TagDTO>) => set(() => ({ tags })),
    }),
    { name: "article-store" }
  )
);

export default useArticleStore;
