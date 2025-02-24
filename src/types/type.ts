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
  localisation: string;
  file: string;
  createdAt: string;
  updatedAt: string;
};

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
  pricings: Array<string>;
  localisation: string;
  quantity: string;
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

export type CompanyDTO = {
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
  documents: Array<{ id: string; documentType: string }>;
  links: Array<string>;
  createdAt: string;
  updatedAt: string;
}

export interface ArticleRequest {
  title: string;
  description: string;
  category: string;
  file: File | null;
  documents: string | null;
  links: string | null;
}

export interface Offer {
  id: string;
  name: string;
  phone: string;
  location: string;
  description: string;
  categories: string[];
  createdAt: string;
}
