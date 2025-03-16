"use client";

import Markdown from "react-markdown";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Download, ExternalLink } from "lucide-react";
import { ArticleDTO } from "@/types/typeDTO";

interface Props {
  article: ArticleDTO;
}

export default function ArticleDetail({ article }: Props) {
  return (
    <article className="mx-auto max-w-3xl space-y-6 p-4">
      {/* Image principale */}
      <div className="flex w-full justify-center">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_PATH_URL}/media/download/image/${article.file}`}
          alt={article.title}
          width={600}
          height={400}
          className="rounded-lg object-cover shadow-md"
        />
      </div>

      {/* Titre */}
      <h1 className="text-center text-3xl font-bold">{article.title}</h1>

      {/* Contenu Markdown */}
      <Markdown className="prose dark:prose-invert">
        {article.description}
      </Markdown>

      {/* 📄 Documents associés */}
      {article.documents.length > 0 && (
        <section className="border-t pt-4">
          <h3 className="mb-2 text-xl font-semibold">📄 Documents associés</h3>
          <div className="flex flex-wrap gap-3">
            {article.documents.map((doc, idx) => (
              <HoverCard key={idx}>
                <HoverCardTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <a
                      href={`${process.env.NEXT_PUBLIC_API_PATH_URL}/media/download/document/${doc.id}`}
                      download
                      className="flex items-center gap-2"
                    >
                      <Download className="size-4 text-primary" />
                      {doc.documentType}
                    </a>
                  </Button>
                </HoverCardTrigger>
                {doc.summary && (
                  <HoverCardContent className="w-72 rounded-md border bg-white p-4 shadow-md dark:bg-gray-800 dark:text-gray-200">
                    <h4 className="text-sm font-semibold">Résumé :</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      {doc.summary}
                    </p>
                  </HoverCardContent>
                )}
              </HoverCard>
            ))}
          </div>
        </section>
      )}

      {/* 🔗 Liens utiles */}
      {article.links.length > 0 && (
        <section className="border-t pt-4">
          <h3 className="mb-2 text-xl font-semibold">🔗 Liens utiles</h3>
          <div className="flex flex-wrap gap-3">
            {article.links.map((link, idx) => (
              <Button
                key={idx}
                variant="link"
                className="flex items-center gap-2"
              >
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="size-4 text-primary" />
                  Lien {idx + 1}
                </a>
              </Button>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
