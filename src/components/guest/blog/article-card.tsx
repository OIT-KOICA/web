"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArticleDTO } from "@/types/type";
import useArticleStore from "@/lib/stores/article-store";
import { useRouter } from "next/navigation";

interface Props {
  article: ArticleDTO;
}

export default function ArticleCard({ article }: Props) {
  const { setActiveArticle } = useArticleStore();
  const router = useRouter();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Card className="h-full overflow-hidden shadow-md">
        <div className="relative h-48">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_PATH_URL}/media/download/image/${article.file}`}
            alt={article.title}
            fill
            className="object-cover"
          />
        </div>
        <CardContent className="space-y-2 p-4">
          <Badge variant="outline">{article.category}</Badge>
          <h3 className="text-xl font-semibold">{article.title}</h3>
          <p className="line-clamp-3 text-muted-foreground">
            {article.description}
          </p>
        </CardContent>
        <CardFooter className="p-4">
          <Button
            className="w-full bg-gradient-to-r from-cassava-500 to-maize-500 text-white hover:from-cassava-600 hover:to-maize-600"
            onClick={() => {
              setActiveArticle(article);
              router.push(`/blog/${article.slug}`);
            }}
          >
            En savoir plus
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
