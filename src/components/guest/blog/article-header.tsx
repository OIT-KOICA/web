import Image from "next/image";
import { CalendarDays, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";


export default function ArticleHeader({ article }) {
  return (
    <header className="mb-8">
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
      <div className="relative w-full h-[400px] mb-6">
        <Image
          src={article.featuredImage}
          alt={article.title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center">
          <User className="w-4 h-4 mr-2" />
          {article.author}
        </div>
        <div className="flex items-center">
          <CalendarDays className="w-4 h-4 mr-2" />
          {new Date(article.publishDate).toLocaleDateString()}
        </div>
        <Badge variant="secondary">{article.category}</Badge>
      </div>
    </header>
  );
}
