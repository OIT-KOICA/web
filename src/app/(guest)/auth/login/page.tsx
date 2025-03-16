"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam) {
      setError("Erreur de connexion. Veuillez réessayer.");
    }
  }, [searchParams]);

  const handleLoginCredentials = async () => {
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (!res?.ok) throw new Error("Email ou mot de passe incorrect");
      router.push("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Impossible de se connecter. Vérifiez vos identifiants.");
    }
  };

  return (
    <div className="bg-gray-100">
      <div className="container flex min-h-screen items-center justify-center">
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
            <Input
              type="email"
              placeholder="Email ou Nom d'utilisateur"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative">
              <Input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="button"
                variant="ghost"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
              </Button>
            </div>

            <Button onClick={handleLoginCredentials} className="w-full">
              Se connecter
            </Button>

            <div className="text-center text-sm text-gray-600">
              <a href="/auth/register" className="text-sm text-gray-600">
                Créer un compte
              </a>{" "}
              |{" "}
              <a href="/auth/forgot-password" className="text-sm text-gray-600">
                Mot de passe oublié ?
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
