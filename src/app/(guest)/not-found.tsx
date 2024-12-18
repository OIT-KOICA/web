import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function GuestNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-4xl font-bold">404 - Page non trouvée</h1>
      <p className="mb-8 text-xl text-muted-foreground">
        Nous sommes désolés, mais la page que vous recherchez est introuvable.
      </p>
      <Button asChild>
        <Link href="/">Retour à l&apos;accueil</Link>
      </Button>
    </div>
  );
}
