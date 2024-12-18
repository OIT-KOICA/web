"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function GuestError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-4xl font-bold">
        Oups ! Une erreur s&apos;est produite
      </h1>
      <p className="mb-8 text-xl text-muted-foreground">
        Nous sommes désolés, mais il y a eu une erreur de chargement de cette
        page. Veuillez réessayer plus tard.
      </p>
      <Button onClick={() => reset()}>Réessayer</Button>
    </div>
  );
}
