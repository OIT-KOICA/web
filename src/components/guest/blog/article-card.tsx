"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Article {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  category: string;
}

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full flex flex-col">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            <Image
              src={article.image}
              alt={article.title}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
            />
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-4">
          <Badge className="mb-2">{article.category}</Badge>
          <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
          <p className="text-muted-foreground mb-4">{article.description}</p>
          <p className="text-sm text-muted-foreground">
            Published on {new Date(article.date).toLocaleDateString()}
          </p>
        </CardContent>
        <CardFooter className="p-4">
          <Button className="w-full">Read More</Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
