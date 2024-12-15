import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createDiscussion,
  createMessage,
  deleteDiscussion,
  getDiscussion,
  getDiscussionById,
  getDiscussions,
  getDiscussionsBySlug,
} from "../service/discussion-api";
import { DiscussionRequest, MessageRequest } from "../type";

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
 * Hook pour récupérer une discussion par le slug de son produit et le numéro de téléphone du client.
 * @param {string} slug - Le slug du produit.
 * @param {string} phone - Le numéro de téléphone du client.
 */
export const useGetDiscussion = ({
  slug,
  phone,
}: {
  slug: string;
  phone: string;
}) => {
  const { data, refetch, error } = useQuery({
    queryKey: ["discussion", { slug, phone }],
    queryFn: () => getDiscussion({ slug, phone }),
    enabled: !!slug && !!phone, // Ne fait rien si l'ID est null ou undefined
  });

  return { discussion: data, refetch, error };
};

/**
 * Hook pour récupérer une discussion à partir de son ID.
 * @param {string} id - L'ID de la discussion.
 * @param {string} token - Le token d'authentification.
 */
export const useGetDiscussionById = ({
  id,
  token,
}: {
  id: string;
  token: string;
}) => {
  const { data, refetch, error } = useQuery({
    queryKey: ["discussion", { id, token }],
    queryFn: () => getDiscussionById({ id, token }),
    enabled: !!id && !!token, // Ne fait rien si l'ID | token est null ou undefined
  });

  return { discussion: data, refetch, error };
};

/**
 * Hook pour récupérer une discussion à partir de son slug.
 * @param {string} slug - Le slug de la discussion.
 * @param {string} token - Le token d'authentification.
 */
export const useGetDiscussionsBySlug = ({
  slug,
  token,
}: {
  slug: string;
  token: string;
}) => {
  const { data, refetch, error } = useQuery({
    queryKey: ["discussions", { slug, token }],
    queryFn: () => getDiscussionsBySlug({ slug, token }),
    enabled: !!slug && !!token, // Ne fait rien si l'ID est null ou undefined
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
