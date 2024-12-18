import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <Loader2 className="mx-auto mb-4 size-16 animate-spin text-primary" />
        <h2 className="text-2xl font-semibold">Chargement...</h2>
        <p className="text-muted-foreground">
          Veuillez patienter pendant que nous récupérons le contenu pour vous.
        </p>
      </div>
    </div>
  );
}
