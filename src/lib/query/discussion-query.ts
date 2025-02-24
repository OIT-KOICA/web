import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createDiscussion,
  createMessage,
  deleteDiscussion,
  getDiscussion,
  getDiscussionById,
  getDiscussions,
  getDiscussionsByCode,
} from "../service/discussion-api";
import { DiscussionRequest, MessageRequest } from "../../types/type";

/**
 * Hook pour récupérer toutes les discussions.
 */
export const useGetDiscussions = () => {
  const { data, refetch } = useQuery({
    queryKey: ["discussions"],
    queryFn: getDiscussions,
  });

  return { discussions: data, refetch };
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
  const { data, refetch, error } = useQuery({
    queryKey: ["discussion", { code, phone }],
    queryFn: () => getDiscussion({ code, phone }),
    enabled: !!code && !!phone, // Ne fait rien si l'ID est null ou undefined
  });

  return { discussion: data, refetch, error };
};

/**
 * Hook pour récupérer une discussion à partir de son ID.
 * @param {string} id - L'ID de la discussion.
 * @param {string} token - Le token d'authentification.
 */
export const useGetDiscussionById = ({ id }: { id: string }) => {
  const { data, refetch, error } = useQuery({
    queryKey: ["discussion", { id }],
    queryFn: () => getDiscussionById({ id }),
    enabled: !!id, // Ne fait rien si l'ID | token est null ou undefined
  });

  return { discussion: data, refetch, error };
};

/**
 * Hook pour récupérer une discussion à partir de son code.
 * @param {string} code - Le code de la discussion.
 * @param {string} token - Le token d'authentification.
 */
export const useGetDiscussionsByCode = ({ code }: { code: string }) => {
  const { data, refetch, error } = useQuery({
    queryKey: ["discussions", { code }],
    queryFn: () => getDiscussionsByCode({ code }),
    enabled: !!code, // Ne fait rien si l'ID est null ou undefined
  });

  return { discussions: data, refetch, error };
};

/**
 * Hook pour créer une discussion.
 */
export const useCreateDiscussion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ discussionData }: { discussionData: DiscussionRequest }) =>
      createDiscussion(discussionData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["discussions"] }); // Rafraîchit la liste des discussions
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
      queryClient.invalidateQueries({ queryKey: ["discussions"] }); // Rafraîchit la liste des discussions
    },
  });
};

/**
 * Hook pour supprimer une discussion.
 */
export const useDeleteDiscussion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) => deleteDiscussion(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["discussions"] }); // Rafraîchit la liste des discussions
    },
  });
};
