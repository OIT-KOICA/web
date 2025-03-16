import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect } from "react";
import useStore from "../stores/store";
import {
  createEvent,
  deleteEvent,
  getEvent,
  getEvents,
  getEventsByUserId,
  updateEvent,
} from "../api/event-api";

/**
 * Hook pour récupérer les évènements d'un utilisateur avec pagination.
 */
export const useGetEventsByUserID = () => {
  const queryClient = useQueryClient();
  const { setEvents, addEvents, setTotalPages } = useStore();

  const query = useInfiniteQuery({
    queryKey: ["user-events"],
    queryFn: async ({ pageParam = 0 }) =>
      await getEventsByUserId(pageParam, 10),
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
      const allEvents = query.data.pages.flatMap((page) => page.events);
      setTotalPages(query.data.pages?.[0]?.totalPages ?? 1);
      setEvents(allEvents);
      queryClient.setQueryData(["user-events"], addEvents);
    }
  }, [query.data, setEvents, queryClient, addEvents, setTotalPages]);

  return query;
};

/**
 * Hook pour récupérer les évènements avec pagination.
 */
export const useGetEvents = () => {
  const queryClient = useQueryClient();
  const { setEvents, addEvents } = useStore();

  const query = useInfiniteQuery({
    queryKey: ["events"],
    queryFn: async ({ pageParam = 0 }) => await getEvents(pageParam, 10),
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
      const allEvents = query.data.pages.flatMap((page) => page.events);
      setEvents(allEvents);
      queryClient.setQueryData(["user-events"], addEvents);
    }
  }, [query.data, setEvents, queryClient, addEvents]);

  return query;
};

/**
 * Hook pour récupérer un évènement par son slug.
 */
export const useGetEvent = (slug: string) => {
  const queryClient = useQueryClient();
  const { events, addEvent } = useStore();
  const cachedEvent = events.find((e) => e.slug === slug);

  const query = useQuery({
    queryKey: ["event", slug],
    queryFn: () => getEvent(slug),
    enabled: !!cachedEvent,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (query.data && !cachedEvent) {
      addEvent(query.data);
      queryClient.setQueryData(["event", slug], query.data);
    }
  }, [query.data, queryClient, cachedEvent, addEvent, slug]);

  return {
    event: cachedEvent || query.data,
    isLoading: query.isLoading && !cachedEvent,
    isError: query.isError,
  };
};

/**
 * Hook pour créer un évènement.
 */
export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  const { addEvent } = useStore();

  return useMutation({
    mutationFn: ({ eventData }: { eventData: FormData }) =>
      createEvent(eventData),
    onSuccess: (newEvent) => {
      addEvent(newEvent);
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};

/**
 * Hook pour mettre à jour un évènement.
 */
export const useUpdateEvent = () => {
  const queryClient = useQueryClient();
  const { setEvent } = useStore();

  return useMutation({
    mutationFn: ({ slug, eventData }: { slug: string; eventData: FormData }) =>
      updateEvent(slug, eventData),
    onSuccess: (updatedEvent) => {
      setEvent(updatedEvent.slug, updatedEvent);
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};

/**
 * Hook pour supprimer un évènement.
 */
export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  const { removeEvent } = useStore();

  return useMutation({
    mutationFn: ({ slug }: { slug: string }) => deleteEvent(slug),
    onSuccess: (_, { slug }) => {
      removeEvent(slug);
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};
