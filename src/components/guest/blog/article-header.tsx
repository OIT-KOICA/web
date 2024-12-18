import Image from "next/image";
import { CalendarDays, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Article {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  category: string;
  author: string;
}

interface ArticleCardProps {
  article: Article;
}

export default function ArticleHeader({ article }: ArticleCardProps) {
  return (
    <header className="mb-8">
      <h1 className="mb-4 text-4xl font-bold">{article.title}</h1>
      <div className="relative mb-6 h-[400px] w-full">
        <Image
          src={article.image}
          alt={article.title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center">
          <User className="mr-2 size-4" />
          {article.author}
        </div>
        <div className="flex items-center">
          <CalendarDays className="mr-2 size-4" />
          {new Date(article.date).toLocaleDateString()}
        </div>
        <Badge variant="secondary">{article.category}</Badge>
      </div>
    </header>
  );
}
