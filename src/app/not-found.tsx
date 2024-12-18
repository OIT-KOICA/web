import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-4xl font-bold">404 - Page Non Trouvée</h1>
      <p className="mb-8 text-xl text-muted-foreground">
        Oups ! La page que vous recherchez n&apos;existe pas ou a été déplacée.
        déplacée.
      </p>
      <Button asChild>
        <Link href="/">Retour à l&apos;accueil</Link>
      </Button>
    </div>
  );
}
