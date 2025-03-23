import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createAdd,
  createAuthAdd,
  deleteAdd,
  getAdds,
  getAddsByUser,
  getCities,
  getCompany,
  getNotifications,
  getUnits,
  getUserCompanies,
  markAsRead,
  switchActiveCompany,
  updateAdd,
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
    staleTime: 0,
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
    staleTime: 0,
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
    staleTime: 0,
  });

  return { notifications: data, refetch };
};

/**
 * Hook pour récupérer les compagnies d'un utilisateur
 */
export const useGetUserCompanies = () => {
  const { companies, setCompanies } = useStore();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["companies"],
    queryFn: getUserCompanies,
    staleTime: 0,
  });

  useEffect(() => {
    if (data) {
      setCompanies(data);
    }
  }, [data, setCompanies]);

  return {
    companies: companies.length > 0 ? companies : data,
    isLoading,
    isError,
    refetch,
  };
};

/**
 * Hook pour switch vers une autre compagnie comme compagnie active
 */
export const useSwitchActiveCompany = () => {
  const queryClient = useQueryClient();
  const { setRefreshCompany } = useStore();

  return useMutation({
    mutationFn: ({ companyId }: { companyId: string }) =>
      switchActiveCompany(companyId),
    onSuccess: async () => {
      setRefreshCompany(true);
      await queryClient.invalidateQueries({ queryKey: ["company"] });
      await queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

/**
 * Hook pour récupérer une compagnie en fonction de son user.
 */
export const useGetCompany = () => {
  const { company, setCompany, refreshCompany, setRefreshCompany } = useStore();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["company"],
    queryFn: getCompany,
    enabled: refreshCompany,
    staleTime: 0,
  });

  useEffect(() => {
    if (data && JSON.stringify(data) !== JSON.stringify(company)) {
      setCompany(data);
      setRefreshCompany(false);
    }
  }, [data, setCompany, setRefreshCompany]);

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
    staleTime: 0,
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
    staleTime: 0,
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

export const useGetAddByUser = () => {
  const queryClient = useQueryClient();
  const { setAdds, addAdds, setTotalPages } = useStore();

  const query = useInfiniteQuery({
    queryKey: ["user-adds"],
    queryFn: async ({ pageParam = 0 }) => await getAddsByUser(pageParam, 10),
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
      const allAdds = query.data.pages.flatMap((page) => page.adds);
      setTotalPages(query.data.pages?.[0]?.totalPages ?? 1);
      setAdds(allAdds);
      queryClient.setQueryData(["user-adds"], addAdds);
    }
  }, [query.data, setAdds, queryClient, addAdds, setTotalPages]);

  return query;
};

export const useCreateAuthAdd = () => {
  const queryClient = useQueryClient();
  const { addAdd } = useStore();

  return useMutation({
    mutationFn: ({ addData }: { addData: FormData }) => createAuthAdd(addData),
    onSuccess: (newAdd) => {
      addAdd(newAdd);
      queryClient.invalidateQueries({ queryKey: ["user-adds"] });
    },
  });
};

export const useUpdateAdd = () => {
  const queryClient = useQueryClient();
  const { setAdd } = useStore();

  return useMutation({
    mutationFn: ({ id, addData }: { id: string; addData: FormData }) =>
      updateAdd(id, addData),
    onSuccess: (updatedAdd) => {
      setAdd(updatedAdd.id, updatedAdd);
      queryClient.invalidateQueries({ queryKey: ["adds"] });
    },
  });
};

/**
 * Hook pour supprimer un article.
 */
export const useDeleteAdd = () => {
  const queryClient = useQueryClient();
  const { removeAdd } = useStore();

  return useMutation({
    mutationFn: ({ id }: { id: string }) => deleteAdd(id),
    onSuccess: (_, { id }) => {
      removeAdd(id);
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
