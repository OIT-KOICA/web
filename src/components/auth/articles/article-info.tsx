"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, FileText, Tag, Building } from "lucide-react";
import { ArticleDTO } from "@/types/type";
import Markdown from "react-markdown";

interface ArticleInfoProps {
  article: ArticleDTO | null;
}

export default function ArticleInfo({ article }: ArticleInfoProps) {
  if (!article) return null;

  return (
    <Card className="border border-gray-200 shadow-lg dark:border-gray-700">
      <CardHeader className="flex flex-col items-center space-y-2">
        <Avatar className="size-16">
          {article.file ? (
            <AvatarImage
              src={`${process.env.NEXT_PUBLIC_API_PATH_URL}/image/${article.file}`}
              alt={article.title}
            />
          ) : (
            <AvatarFallback>
              {article.title.charAt(0).toUpperCase()}
            </AvatarFallback>
          )}
        </Avatar>
        <CardTitle className="text-center text-2xl font-bold">
          {article.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Détails de l'article */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex items-center space-x-2">
            <FileText className="size-5 text-primary" />
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Code :</strong> {article.code}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Tag className="size-5 text-primary" />
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Catégorie :</strong> {article.category}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Building className="size-5 text-primary" />
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Entreprise :</strong> {article.company}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Calendar className="size-5 text-primary" />
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Créé le :</strong>{" "}
              {new Date(article.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Contenu Markdown */}
        <div className="mt-6 border-t pt-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Contenu de l&apos;article :
          </h3>
          <Markdown className="prose dark:prose-invert">
            {article.description}
          </Markdown>
        </div>
      </CardContent>
    </Card>
  );
}
