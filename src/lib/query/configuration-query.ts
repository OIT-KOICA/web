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
} from "../api/configuration-api";
import {
  createCompany,
  editCompany,
  editPassword,
  editProfile,
  getProfile,
} from "../api/user-api";
import useStore from "../stores/store";
import { useEffect } from "react";

/**
 * Hook pour récupérer toutes les villes.
 */
export const useGetCities = () => {
  const { cities, setCities } = useStore();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
    enabled: cities.length === 0,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (data) {
      setCities(data);
    }
  }, [data, setCities]);

  return {
    cities: cities.length > 0 ? cities : data,
    isLoading,
    isError,
    refetch,
  };
};

/**
 * Hook pour récupérer toutes les unités de mesure.
 */
export const useGetUnits = () => {
  const { units, setUnits } = useStore();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["units"],
    queryFn: getUnits,
    enabled: units.length === 0,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (data) {
      setUnits(data);
    }
  }, [data, setUnits]);

  return {
    units: units.length > 0 ? units : data,
    isLoading,
    isError,
    refetch,
  };
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
  const { company, setCompany, clearCompany } = useStore();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["company"],
    queryFn: getCompany,
    enabled: company === null,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (data) {
      setCompany(data);
    } else clearCompany();
  }, [clearCompany, data, setCompany]);

  return {
    company: company || data || null,
    isLoading,
    isError,
    refetch,
  };
};

/**
 * Hook pour récupérer les informations de profil de l'utilisateur.
 */
export const useGetProfile = () => {
  const { user, setUser, clearUser } = useStore();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: getProfile,
    enabled: user === null,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (data) {
      setUser(data);
    } else clearUser();
  }, [clearUser, data, setUser]);

  return {
    user: user || data || null,
    isLoading,
    isError,
    refetch,
  };
};

/**
 * Hook pour récupérer les annonces avec pagination.
 */
export const useGetAdds = () => {
  const queryClient = useQueryClient();
  const { setAdds, addAdds } = useStore();

  const query = useInfiniteQuery({
    queryKey: ["adds"],
    queryFn: async ({ pageParam = 0 }) => await getAdds(pageParam, 10),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.currentPage < lastPage.totalPages
        ? lastPage.currentPage + 1
        : undefined;
    },
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (query.data) {
      const allAdds = query.data.pages.flatMap((page) => page.adds);
      setAdds(allAdds);
      queryClient.setQueryData(["adds"], addAdds);
    }
  }, [query.data, setAdds, queryClient, addAdds]);

  return query;
};

/**
 * Hook pour créer une annonce.
 */
export const useCreateAdd = () => {
  const queryClient = useQueryClient();
  const { addAdd } = useStore();

  return useMutation({
    mutationFn: ({ data }: { data: FormData }) => createAdd(data),
    onSuccess: (newAdd) => {
      addAdd(newAdd);
      queryClient.invalidateQueries({ queryKey: ["adds"] });
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
 * Hook pour créer une compagnie.
 */
export const useCreateCompany = () => {
  const queryClient = useQueryClient();
  const { setCompany } = useStore();

  return useMutation({
    mutationFn: ({ formData }: { formData: FormData }) =>
      createCompany(formData),
    onSuccess: (data) => {
      setCompany(data);
      queryClient.invalidateQueries({ queryKey: ["company"] });
    },
  });
};

/**
 * Hook pour modifier une compagnie.
 */
export const useEditCompany = () => {
  const queryClient = useQueryClient();
  const { setCompany } = useStore();

  return useMutation({
    mutationFn: ({ formData }: { formData: FormData }) => editCompany(formData),
    onSuccess: (data) => {
      setCompany(data);
      queryClient.invalidateQueries({ queryKey: ["company"] });
    },
  });
};

/**
 * Hook pour modifier les informations de profil d'un utilisateur.
 */
export const useEditProfile = () => {
  const queryClient = useQueryClient();
  const { setUser } = useStore();

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
    onSuccess: (data) => {
      setUser(data);
      queryClient.invalidateQueries({ queryKey: ["user"] });
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
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
