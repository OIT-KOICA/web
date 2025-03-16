import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createDiscussion,
  createMessage,
  deleteDiscussion,
  getDiscussion,
  getDiscussionById,
  getDiscussions,
  getDiscussionsByCode,
} from "../api/discussion-api";
import { DiscussionRequest, MessageRequest } from "../../types/typeRequest";
import useStore from "../stores/store";
import { useEffect } from "react";

/**
 * Hook pour récupérer toutes les discussions.
 */
export const useGetDiscussions = () => {
  const { discussions, setDiscussions } = useStore();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["discussions"],
    queryFn: getDiscussions,
    enabled: discussions.length === 0,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (data) {
      setDiscussions(data);
    }
  }, [data, setDiscussions]);

  return {
    discussions: discussions.length > 0 ? discussions : data,
    isLoading,
    isError,
    refetch,
  };
};

/**
 * Hook pour récupérer une discussion par le code de son produit et le numéro de téléphone du client.
 * @param {string} code - Le code du produit.
 * @param {string} phone - Le numéro de téléphone du client.
 */
export const useGetDiscussion = ({
  code,
  phone,
}: {
  code: string;
  phone: string;
}) => {
  const queryClient = useQueryClient();
  const { discussions, setActiveDiscussion, addDiscussion } = useStore();
  const existingDiscussion = discussions.find((d) => d.userphone === phone);

  const query = useQuery({
    queryKey: ["discussion", { code, phone }],
    queryFn: () => getDiscussion({ code, phone }),
    enabled: !existingDiscussion,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (query.data && !existingDiscussion) {
      setActiveDiscussion(query.data);
      addDiscussion(query.data);
      queryClient.setQueryData(["discussion", { code, phone }], query.data);
    }
  }, [
    query.data,
    queryClient,
    existingDiscussion,
    setActiveDiscussion,
    addDiscussion,
    code,
    phone,
  ]);

  return {
    discussion: existingDiscussion || query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    refetchDiscussion: query.refetch,
  };
};

/**
 * Hook pour récupérer une discussion à partir de son ID.
 * @param {string} id - L'ID de la discussion.
 */
export const useGetDiscussionById = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();
  const { discussions, setActiveDiscussion, addDiscussion } = useStore();
  const existingDiscussion = discussions.find((d) => d.id === id);

  const query = useQuery({
    queryKey: ["discussion", { id }],
    queryFn: () => getDiscussionById({ id }),
    enabled: !existingDiscussion,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (query.data && !existingDiscussion) {
      setActiveDiscussion(query.data);
      addDiscussion(query.data);
      queryClient.setQueryData(["discussion", { id }], query.data);
    }
  }, [
    query.data,
    queryClient,
    existingDiscussion,
    setActiveDiscussion,
    addDiscussion,
    id,
  ]);

  return {
    discussion: existingDiscussion || query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    refetchDiscussion: query.refetch,
  };
};

/**
 * Hook pour récupérer une discussion à partir de son ID.
 * @param {string} id - L'ID de la discussion.
 */
export const useGetDiscussionsByCode = ({ code }: { code: string }) => {
  const { discussions, setDiscussions } = useStore();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["discussion", { code }],
    queryFn: () => getDiscussionsByCode({ code }),
    enabled: !!code,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (data) {
      setDiscussions(data);
    }
  }, [data, setDiscussions]);

  return {
    discussions: discussions.length > 0 ? discussions : data,
    isLoading,
    isError,
    refetch,
  };
};

/**
 * Hook pour créer une discussion.
 */
export const useCreateDiscussion = () => {
  const queryClient = useQueryClient();
  const { addDiscussion } = useStore();

  return useMutation({
    mutationFn: ({ discussionData }: { discussionData: DiscussionRequest }) =>
      createDiscussion(discussionData),
    onSuccess: (data) => {
      addDiscussion(data);
      queryClient.invalidateQueries({ queryKey: ["discussions"] });
    },
  });
};

/**
 * Hook pour créer un message.
 */
export const useCreateMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ messageData }: { messageData: MessageRequest }) =>
      createMessage(messageData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["discussions"] });
    },
  });
};

/**
 * Hook pour supprimer une discussion.
 */
export const useDeleteDiscussion = () => {
  const queryClient = useQueryClient();
  const { removeDiscussion } = useStore();

  return useMutation({
    mutationFn: ({ id }: { id: string }) => deleteDiscussion(id),
    onSuccess: (_, { id }) => {
      removeDiscussion(id);
      queryClient.invalidateQueries({ queryKey: ["discussions"] });
    },
  });
};
