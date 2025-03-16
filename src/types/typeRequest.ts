export type ProductRequest = {
  name: string;
  code: string;
  description: string;
  category: string;
  unit: string;
  isDerivedProduct: string;
  basePrice: string;
  isPerishable: string;
  file: File;
  priceUnit: "Kg" | "Sac" | "Cuvette" | "Sceau de 5L";
  pricings: Array<string>;
  localisation: string;
  quantity: string;
};

export type DiscussionRequest = {
  code: string;
  name: string;
  phone: string;
};

export type MessageRequest = {
  id: string;
  senderType: string;
  content: string;
};

export interface ArticleRequest {
  title: string;
  description: string;
  category: string;
  file: File | null;
  documents: string | null;
  links: string | null;
}
