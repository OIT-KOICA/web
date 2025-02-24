import Markdown from "react-markdown";
import Image from "next/image";
import { ArticleDTO } from "@/types/type";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink } from "lucide-react";

interface Props {
  article: ArticleDTO | undefined;
}

export default function ArticleDetail({ article }: Props) {
  return (
    <article className="mx-auto max-w-3xl space-y-6">
      <Image
        src={
          article
            ? `${process.env.NEXT_PUBLIC_API_PATH_URL}/media/download/image/${article.file}`
            : "#"
        }
        alt={article ? article?.title : "Image de la documentation"}
        width={400}
        height={400}
        className="rounded-lg object-cover"
      />
      <h1 className="text-3xl font-bold">{article?.title}</h1>
      <Markdown className="prose">{article?.description}</Markdown>

      <section>
        <h3 className="mb-2 text-xl font-semibold">Documents associés</h3>
        {article?.documents.map((doc, idx) => (
          <Button key={idx} variant="outline" className="mb-2 mr-2" asChild>
            <a
              href={`${process.env.NEXT_PUBLIC_API_PATH_URL}/media/download/document/${doc.id}`}
              download
            >
              <Download className="mr-2 size-4" /> Télécharger le document :
              {" " + doc.documentType}
            </a>
          </Button>
        ))}
      </section>

      <section>
        <h3 className="mb-2 text-xl font-semibold">Liens utiles</h3>
        {article?.links.map((link, idx) => (
          <Button key={idx} variant="link" asChild>
            <a href={link} target="_blank">
              <ExternalLink className="mr-2 size-4" /> Lien {idx + 1}
            </a>
          </Button>
        ))}
      </section>
    </article>
  );
}
