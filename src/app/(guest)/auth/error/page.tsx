"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>(
    "Une erreur inconnue est survenue."
  );

  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam === "OAuthSignin") {
      setErrorMessage(
        "Impossible de se connecter via OAuth. Veuillez réessayer."
      );
    } else if (errorParam === "OAuthCallback") {
      setErrorMessage("Erreur lors de la redirection après connexion.");
    } else if (errorParam === "AccessDenied") {
      setErrorMessage(
        "Accès refusé. Vous n'avez pas les autorisations nécessaires."
      );
    } else if (errorParam) {
      setErrorMessage("Une erreur est survenue lors de l’authentification.");
    }
  }, [searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-xl font-bold">
            Erreur d&apos;authentification
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="destructive">
            <AlertCircle className="size-5" />
            <AlertTitle>Erreur</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
          <Button onClick={() => router.push("/auth/login")} className="w-full">
            Retour à la connexion
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
