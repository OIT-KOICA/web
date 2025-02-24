import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { savePhoneToCookie } from "@/lib/utils";
import { format } from "date-fns";
import { MessageCircle, Send } from "lucide-react";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Discussion } from "@/types/type";
import {
  useCreateDiscussion,
  useCreateMessage,
} from "@/lib/query/discussion-query";

export default function ProductDiscussion({
  code,
  discussion,
  setDiscussion,
}: {
  code?: string;
  discussion: Discussion | null;
  setDiscussion: Dispatch<SetStateAction<Discussion | null>>;
}) {
  /* Queries */
  const createDiscussion = useCreateDiscussion();
  const createMessage = useCreateMessage();

  const { toast } = useToast();

  /* State local */
  const [loading, setLoading] = useState(false);
  const [localCode, setLocalCode] = useState("");
  const [formDataDiscussion, setFormDataDiscussion] = useState({
    name: "",
    phone: "",
    code: localCode, // code du produit passé en prop
  });
  const [formDataMessage, setFormDataMessage] = useState({
    content: "",
    senderType: "CLIENT",
    id: discussion?.id || "", // ID de la discussion passé en prop
  });

  // Met à jour l'ID dans formDataMessage chaque fois que la discussion change
  useEffect(() => {
    if (discussion?.id) {
      setFormDataMessage((prev) => ({
        ...prev,
        id: discussion.id,
      }));
    }
  }, [discussion]);

  useEffect(() => {
    if (code) {
      setLocalCode(code);
    }
  }, [code]);

  /**
   * 🔥 Validation avec Zod
   */
  const discussionSchema = z.object({
    name: z.string().min(1, "Le nom est requis"),
    phone: z
      .string()
      .regex(/^6(5|7|8|9)[0-9]{7}$/, "Numéro de téléphone invalide"),
    code: z.string().min(1, "code du produit invalide"),
  });

  const messageSchema = z.object({
    content: z.string().min(2, "Le message est requis"),
    senderType: z.string().min(2, "Le type d'expéditeur est requis"),
    id: z.string().min(2, "L'ID est requis"),
  });

  /**
   * ✅ Gestion des changements de formulaire
   */
  const handleChangeDiscussion = (e: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = e.target;
    setFormDataDiscussion((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeMessage = (e: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = e.target;
    setFormDataMessage((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * ✅ Démarrer une discussion
   */
  const handleStartChat = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);

    if (!formDataDiscussion.code && localCode)
      setFormDataDiscussion((prev) => ({
        ...prev,
        code: localCode,
      }));

    try {
      if (formDataDiscussion.code) {
        discussionSchema.parse(formDataDiscussion);
        savePhoneToCookie(formDataDiscussion.phone);

        createDiscussion.mutate(
          {
            discussionData: {
              code: formDataDiscussion.code,
              name: formDataDiscussion.name,
              phone: formDataDiscussion.phone,
            },
          },
          {
            onSuccess: (data) => {
              setDiscussion(data);
            },
          }
        );
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez remplir correctement le formulaire.",
      });
    }

    setLoading(false);
  };

  /**
   * ✅ Envoyer un message
   */
  const handleCreateMessage = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);

    try {
      messageSchema.parse(formDataMessage);

      createMessage.mutate(
        {
          messageData: {
            id: formDataMessage.id,
            senderType: formDataMessage.senderType,
            content: formDataMessage.content,
          },
        },
        {
          onSuccess: (data) => {
            setDiscussion(data);
          },
        }
      );

      setFormDataMessage((prev) => ({ ...prev, content: "" }));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez entrer un message valide.",
      });
    }

    setLoading(false);
  };

  return (
    <Card className="mx-auto mt-4 w-full max-w-2xl shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-xl font-bold text-[#2C5F2D] sm:text-2xl">
          <MessageCircle className="mr-2 size-5 sm:size-6" />
          Discussions avec le vendeur
        </CardTitle>
      </CardHeader>

      <CardContent>
        {discussion && discussion.messages.length > 0 && (
          <ScrollArea className="h-[200px] w-full pr-2 sm:h-[300px] sm:pr-4">
            {discussion.messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 flex ${
                  message.senderType === "CLIENT"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`inline-block max-w-[90%] rounded-lg p-3 sm:max-w-[80%] ${
                    message.senderType === "CLIENT"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm sm:text-base">{message.content}</p>
                  <small className="mt-1 block text-xs opacity-70">
                    {format(message.createdAt, "MMM d, h:mm a")}
                  </small>
                </div>
              </div>
            ))}
          </ScrollArea>
        )}
      </CardContent>

      <CardFooter>
        {discussion ? (
          <form
            className="flex w-full flex-col gap-2 sm:flex-row sm:gap-4"
            onSubmit={handleCreateMessage}
          >
            <Textarea
              placeholder="Ecrire votre message ici..."
              className="w-full sm:w-2/3"
              name="content"
              value={formDataMessage.content}
              onChange={handleChangeMessage}
            />
            <Button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto"
            >
              <Send className="mr-1 sm:mr-2" />
              Envoyer
            </Button>
          </form>
        ) : (
          <form
            className="flex w-full flex-col gap-2 sm:flex-row sm:gap-4"
            onSubmit={handleStartChat}
          >
            <Input
              placeholder="Nom"
              className="w-full"
              name="name"
              value={formDataDiscussion.name}
              onChange={handleChangeDiscussion}
            />
            <Input
              placeholder="Téléphone"
              className="w-full"
              name="phone"
              value={formDataDiscussion.phone}
              onChange={handleChangeDiscussion}
            />
            <Button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto"
            >
              <Send className="mr-1 sm:mr-2" />
              Envoyer
            </Button>
          </form>
        )}
      </CardFooter>
    </Card>
  );
}
