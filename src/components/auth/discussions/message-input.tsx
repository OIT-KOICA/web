"use client";

import { useState } from "react";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useCreateMessage } from "@/lib/query/discussion-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useStore from "@/lib/stores/store";
import { Loader2 } from "lucide-react";

const messageSchema = z.object({
  content: z.string().min(1, "Le message est requis"),
});

type MessageFormValues = z.infer<typeof messageSchema>;

export default function MessageInput() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { activeDiscussion: discussion, setActiveDiscussion } = useStore();
  const createMessage = useCreateMessage();

  const form = useForm<MessageFormValues>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (data: MessageFormValues) => {
    setIsSubmitting(true);

    try {
      if (discussion) {
        createMessage.mutate(
          {
            messageData: {
              id: discussion?.id,
              senderType: "VENDEUR",
              content: data.content,
            },
          },
          {
            onSuccess: (rep) => {
              setActiveDiscussion(rep);
            },
          }
        );
        form.reset();
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du message :", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="my-4 space-y-2">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="Saisir votre message ici" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" />}
          Envoyer le message
        </Button>
      </form>
    </Form>
  );
}
