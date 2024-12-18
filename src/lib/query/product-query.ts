import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProductByUserId,
  getProducts,
  updateProduct,
} from "../service/product-api";

/**
 * Hook pour récupérer tous les produits.
 */
export const useGetProductsByUserID = () => {
  const { data, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: getProductByUserId,
  });

  return { products: data, refetch };
};

/**
 * Hook pour récupérer tous les produits d'un utilisateur.
 */
export const useGetProducts = () => {
  const { data, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return { products: data, refetch };
};

/**
 * Hook pour récupérer un produit par son slug.
 * @param {string} slug - Le slug du produit.
 */
export const useGetProduct = (slug: string) => {
  const { data, refetch, error } = useQuery({
    queryKey: ["product", slug],
    queryFn: () => getProduct(slug),
    enabled: !!slug, // Ne fait rien si le slug est null ou undefined
  });

  return { product: data, refetch, error };
};

/**
 * Hook pour créer un produit.
 */
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productData }: { productData: FormData }) =>
      createProduct(productData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] }); // Rafraîchit la liste des produits
    },
  });
};

/**
 * Hook pour mettre à jour un produit.
 */
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      slug,
      productData,
    }: {
      slug: string;
      productData: FormData;
    }) => updateProduct(slug, productData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] }); // Rafraîchit la liste des produits
    },
  });
};

/**
 * Hook pour supprimer un produit.
 */
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ slug }: { slug: string }) => deleteProduct(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] }); // Rafraîchit la liste des produits
    },
  });
};
