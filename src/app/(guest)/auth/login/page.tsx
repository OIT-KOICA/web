"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam) {
      setError("Erreur de connexion. Veuillez réessayer.");
    }
  }, [searchParams]);

  const handleLogin = async () => {
    try {
      console.log("🔵 Tentative de connexion...");
      await signIn("keycloak", { callbackUrl: "/dashboard" });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Impossible de se connecter. Veuillez réessayer.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-xl font-bold">
            Connexion
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="size-5" />
              <AlertTitle>Erreur</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <p className="text-center text-sm text-gray-600">
            Connectez-vous pour accéder à la plateforme.
          </p>
          <Button onClick={handleLogin} className="w-full">
            Se connecter avec Keycloak
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
