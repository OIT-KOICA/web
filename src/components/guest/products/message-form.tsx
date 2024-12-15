"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useProductStore } from "@/lib/stores/product-store";

const messageSchema = z.object({
  content: z
    .string()
    .min(1, "Message cannot be empty")
    .max(500, "Message is too long (max 500 characters)"),
});

type MessageFormData = z.infer<typeof messageSchema>;

interface MessageFormProps {
  productId: string;
}

export default function MessageForm({ productId }: MessageFormProps) {
  const { addMessage } = useProductStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MessageFormData>({
    resolver: zodResolver(messageSchema),
  });

  const onSubmit = async (data: MessageFormData) => {
    setIsSubmitting(true);
    try {
      await addMessage(productId, data.content);
      reset();
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
      <Textarea
        {...register("content")}
        placeholder="Type your message here..."
        className="mb-2"
      />
      {errors.content && (
        <p className="mb-2 text-sm text-red-500">{errors.content.message}</p>
      )}
      <Button type="submit" disabled={isSubmitting}>
        <Send className="mr-2 size-4" />
        Send
      </Button>
    </form>
  );
}
