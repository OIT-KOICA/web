import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface RelatedArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  featuredImage: string;
}

interface RelatedArticlesProps {
  articles: RelatedArticle[];
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  return (
    <section className="mt-16">
      <h2 className="mb-6 text-2xl font-bold">Related Articles</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {articles.map((article) => (
          <Card key={article.id} className="overflow-hidden">
            <div className="relative h-48">
              <Image
                src={article.featuredImage}
                alt={article.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="mb-2 line-clamp-2 font-semibold">
                {article.title}
              </h3>
              <p className="line-clamp-3 text-sm text-muted-foreground">
                {article.excerpt}
              </p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Link
                href={`/blog/${article.slug}`}
                className="text-primary hover:underline"
              >
                Read More
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
