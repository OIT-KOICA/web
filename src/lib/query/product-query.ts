/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  getProductsByUserId,
  updateProduct,
} from "../api/product-api";
import useStore from "../stores/store";
import { useEffect } from "react";

/**
 * Hook pour récupérer les produits d'un utilisateur avec pagination.
 */
export const useGetProductsByUserID = () => {
  const queryClient = useQueryClient();
  const { setProducts, addProducts, setTotalPages } = useStore();

  const query = useInfiniteQuery({
    queryKey: ["user-products"],
    queryFn: async ({ pageParam = 0 }) =>
      await getProductsByUserId(pageParam, 10),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.currentPage < lastPage.totalPages
        ? lastPage.currentPage + 1
        : undefined;
    },
    staleTime: 0,
  });

  useEffect(() => {
    if (query.data) {
      const allProducts = query.data.pages.flatMap((page) => page.products);
      setTotalPages(query.data.pages?.[0]?.totalPages ?? 1);
      setProducts(allProducts);
      queryClient.setQueryData(["user-products"], addProducts);
    }
  }, [query.data, setProducts, queryClient, addProducts, setTotalPages]);

  return query;
};

/**
 * Hook pour récupérer les produits avec pagination.
 */
export const useGetProducts = () => {
  const queryClient = useQueryClient();
  const { setProducts, addProducts } = useStore();

  const query = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: async ({ pageParam = 0 }) => await getProducts(pageParam, 10),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.currentPage < lastPage.totalPages
        ? lastPage.currentPage + 1
        : undefined;
    },
    staleTime: 0,
  });

  useEffect(() => {
    if (query.data) {
      const allProducts = query.data.pages.flatMap((page) => page.products);
      setProducts(allProducts);
      queryClient.setQueryData(["products"], addProducts);
    }
  }, [query.data, setProducts, queryClient, addProducts]);

  return query;
};

/**
 * Hook pour récupérer un produit par son slug.
 * @param {string} slug - Le slug du produit.
 */
export const useGetProduct = (slug: string) => {
  const queryClient = useQueryClient();
  const { products, addProduct } = useStore();
  const cachedProduct = products.find((p) => p.slug === slug);

  const query = useQuery({
    queryKey: ["product", slug],
    queryFn: () => getProduct(slug),
    enabled: !!cachedProduct,
    staleTime: 0,
  });

  useEffect(() => {
    if (query.data && !cachedProduct) {
      addProduct(query.data);
      queryClient.setQueryData(["product", slug], query.data);
    }
  }, [query.data, queryClient, cachedProduct, addProduct, slug]);

  return {
    product: cachedProduct || query.data,
    isLoading: query.isLoading && !cachedProduct,
    isError: query.isError,
  };
};

/**
 * Hook pour créer un produit.
 */
export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const { addProduct } = useStore();

  return useMutation({
    mutationFn: ({ productData }: { productData: FormData }) =>
      createProduct(productData),
    onSuccess: (newProduct) => {
      addProduct(newProduct);
      queryClient.invalidateQueries({ queryKey: ["user-products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

/**
 * Hook pour mettre à jour un produit.
 */
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const { setProduct } = useStore();

  return useMutation({
    mutationFn: ({
      slug,
      productData,
    }: {
      slug: string;
      productData: FormData;
    }) => updateProduct(slug, productData),
    onSuccess: (updatedProduct) => {
      setProduct(updatedProduct.slug, updatedProduct);
      queryClient.invalidateQueries({ queryKey: ["user-products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

/**
 * Hook pour supprimer un produit.
 */
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const { removeProduct } = useStore();

  return useMutation({
    mutationFn: ({ slug }: { slug: string }) => deleteProduct(slug),
    onSuccess: (_, { slug }) => {
      removeProduct(slug);
      queryClient.invalidateQueries({ queryKey: ["user-products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
