import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createAdd,
  getAdds,
  getCities,
  getCompany,
  getNotifications,
  getUnits,
  markAsRead,
} from "../service/configuration-api";
import {
  createCompany,
  editCompany,
  editPassword,
  editProfile,
  getProfile,
} from "../service/user-api";

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
 * Hook pour récupérer toutes les notifications.
 */
export const useGetNotifications = () => {
  const { data, refetch } = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
  });

  return { notifications: data, refetch };
};

/**
 * Hook pour récupérer une compagnie en fonction de son user.
 */
export const useGetCompany = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["company"],
    queryFn: getCompany,
  });

  return { company: data, error, isLoading, refetch };
};

/**
 * Hook pour récupérer les informations de profil de l'utilisateur.
 */
export const useGetProfile = () => {
  const { data, error, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: getProfile,
  });

  return { profile: data, error, refetch };
};

/**
 * Hook pour récupérer les annonces avec pagination.
 */
export const useGetAdds = () => {
  return useInfiniteQuery({
    queryKey: ["adds"],
    queryFn: async ({ pageParam = 0 }) => await getAdds(pageParam, 10),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.currentPage < lastPage.totalPages
        ? lastPage.currentPage + 1
        : undefined;
    },
  });
};

/**
 * Hook pour créer une annonce.
 */
export const useCreateAdd = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data }: { data: FormData }) => createAdd(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adds"] }); // Rafraîchit la liste des annonces
    },
  });
};

/**
 * Hook pour marquer une notification comme lue.
 */
export const useMarkAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
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
      queryClient.invalidateQueries({ queryKey: ["company"] }); // Rafraîchit la liste des compagnies
    },
  });
};

/**
 * Hook pour modifier une compagnie.
 */
export const useEditCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ formData }: { formData: FormData }) => editCompany(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["company"] }); // Rafraîchit la liste des compagnies
    },
  });
};

/**
 * Hook pour modifier les informations de profil d'un utilisateur.
 */
export const useEditProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      data,
    }: {
      data: {
        username: string;
        lastname: string;
        firstname: string;
      };
    }) => editProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] }); // Rafraîchit la liste des compagnies
    },
  });
};

/**
 * Hook pour modifier le mot de passe d'un utilisateur.
 */
export const useEditPassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data }: { data: { password: string } }) =>
      editPassword(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] }); // Rafraîchit la liste des compagnies
    },
  });
};
