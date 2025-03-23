export type ProductDTO = {
  name: string;
  slug: string;
  code: string;
  type: string;
  description: string;
  category: string;
  unit: string;
  isDerivedProduct: boolean;
  basePrice: number;
  isPerishable: boolean;
  quantity: number;
  company: string;
  companyAvatar: string;
  companyPhones: string[];
  pricings: Array<{
    description: string;
    price: number;
  }>;
  priceUnit: "Kg" | "Sac" | "Cuvette" | "Sceau de 5L";
  localisation: string;
  file: string;
  createdAt: string;
  updatedAt: string;
};

export type Filter = {
  categories: Array<string>;
  city: string;
  keyword: string;
};

export type Message = {
  id: string;
  senderType: string;
  content: string;
  createdAt: string;
};

export type Discussion = {
  id: string;
  product: string;
  username: string;
  userphone: string;
  messages: Array<Message>;
  createdAt: string;
};

export type CompanyDTO = {
  id: string;
  name: string;
  email: string;
  phones: string[];
  chainValueFunctions: string[];
  localisation: string;
  serviceType: string;
  user: string;
  avatar: string | File;
  createdAt: string;
  updatedAt: string;
};

export type UserDTO = {
  username: string;
  email: string;
  lastname: string;
  firstname: string;
  company: string;
  roles: Array<string>;
};

export type NotificationDTO = {
  id: string;
  message: string;
  link: string;
  isRead: boolean;
  createdAt: string;
};

export interface ArticleCategoryDTO {
  name: string;
}

export interface ArticleDTO {
  id: string;
  title: string;
  slug: string;
  code: string;
  description: string;
  category: string;
  company: string;
  file: string | null;
  documents: Array<{
    id: string;
    documentType: string;
    summary?: string;
    user: string;
  }>;
  links: Array<string>;
  createdAt: string;
  updatedAt: string;
}

export interface Offer {
  id: string;
  name: string;
  phone: string;
  location: string;
  title: string;
  email: string;
  description: string;
  categories: string[];
  createdAt: string;
}

export interface EventDTO {
  id: string;
  title: string;
  slug: string;
  code: string;
  description: string;
  startDate: string;
  endDate: string;
  company: string;
  file: string | null;
  localisation: string;
  documents: Array<{
    id: string;
    documentType: string;
    summary?: string;
    user: string;
  }>;
  links: Array<string>;
  createdAt: string;
  updatedAt: string;
}
