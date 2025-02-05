"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ArticleDTO } from "@/lib/type";

interface ArticleHeaderProps {
  article: ArticleDTO | null;
}

export default function ArticleHeader({ article }: ArticleHeaderProps) {
  if (!article) return null;

  return (
    <div className="flex items-center justify-between border-b pb-4">
      <div className="flex items-center space-x-4">
        {article.file && (
          <Image
            src={`${process.env.NEXT_PUBLIC_API_PATH_URL}/image/${article.file}`}
            alt={article.title}
            width={100}
            height={100}
            className="rounded-lg object-cover"
          />
        )}
      </div>
      <Link href="/dashboard/articles">
        <Button variant="outline">
          <ArrowLeft className="mr-2 size-4" />
          Retour à la liste
        </Button>
      </Link>
    </div>
  );
}
