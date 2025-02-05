"use client";

//import { useState } from "react";
//import { Button } from "@/components/ui/button";
//import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
//import { Textarea } from "@/components/ui/textarea";
//import { useToast } from "@/hooks/use-toast";
//import { useReplyToComment } from "@/lib/query/comment-query";
//import { CommentDTO } from "@/lib/type";

interface ArticleCommentsProps {
  slug?: string;
}

export default function ArticleComments({ slug }: ArticleCommentsProps) {
  //const { comments } = useGetCommentsByArticleSlug(slug);
  //const replyToComment = useReplyToComment();
  //const [replyingTo, setReplyingTo] = useState<string | null>(null);
  //const [replyContent, setReplyContent] = useState<string>("");
  //const { toast } = useToast();

  /*const handleReply = async (commentId: string) => {
    if (!replyContent) return;

    try {
      await replyToComment.mutateAsync({
        commentId,
        content: replyContent,
      });

      toast({
        title: "Réponse ajoutée",
        description: "Votre réponse a été envoyée avec succès.",
      });

      setReplyingTo(null);
      setReplyContent("");
    } catch (error) {
      console.error("Erreur lors de la réponse :", error);
    }
  };*/

  return (
    <>Comments</>
    /*<Card>
      <CardHeader>
        <CardTitle>Commentaires</CardTitle>
      </CardHeader>
      <CardContent className="max-h-96 overflow-y-auto">
        {comments.length === 0 ? (
          <p className="text-gray-500">Aucun commentaire pour le moment.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="mb-4 border-b pb-2">
              <p className="font-semibold">{comment.author}</p>
              <p className="text-gray-600">{comment.content}</p>
              <Button
                variant="link"
                size="sm"
                onClick={() => setReplyingTo(comment.id)}
              >
                Répondre
              </Button>

              {replyingTo === comment.id && (
                <div className="mt-2 space-y-2">
                  <Textarea
                    placeholder="Écrire une réponse..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                  />
                  <Button size="sm" onClick={() => handleReply(comment.id)}>
                    Envoyer
                  </Button>
                </div>
              )}
            </div>
          ))
        )}
      </CardContent>
    </Card>*/
  );
}
