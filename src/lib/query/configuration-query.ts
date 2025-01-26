import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAdd,
  getAdds,
  getCities,
  getCompany,
  getUnits,
} from "../service/configuration-api";
import { createCompany } from "../service/user-api";

/**
 * Hook pour récupérer toutes les villes.
 */
export const useGetCities = () => {
  const { data, refetch } = useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
  });

  return { cities: data, refetch };
};

/**
 * Hook pour récupérer toutes les unités de mesure.
 */
export const useGetUnits = () => {
  const { data, refetch } = useQuery({
    queryKey: ["units"],
    queryFn: getUnits,
  });

  return { units: data, refetch };
};

/**
 * Hook pour récupérer une compagnie en fonction de son user.
 * @param {string} token - Le token d'authentification.
 */
export const useGetCompany = () => {
  const { data, refetch } = useQuery({
    queryKey: ["company"],
    queryFn: getCompany,
  });

  return { company: data, refetch };
};

/**
 * Hook pour récupérer toutes les annonces.
 */
export const useGetAdds = () => {
  const { data, refetch } = useQuery({
    queryKey: ["adds"],
    queryFn: getAdds,
  });

  return { adds: data, refetch };
};

/**
 * Hook pour créer une annonce.
 */
export const useCreateAdd = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: {
      name: string;
      phone: string;
      location: string;
      description: string;
    }) => createAdd(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adds"] }); // Rafraîchit la liste des annonces
    },
  });
};

/**
 * Hook pour créer une compgnie.
 */
export const useCreateCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ formData }: { formData: FormData }) =>
      createCompany(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["company"] }); // Rafraîchit la liste des annonces
    },
  });
};
