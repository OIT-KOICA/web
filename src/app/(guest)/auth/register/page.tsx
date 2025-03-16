"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_PATH_URL}/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
        }
      );

      if (!res.ok) throw new Error("Erreur lors de l'inscription");
      router.push("/auth/login");
    } catch (err) {
      console.error(err);
      setError("Échec de l'inscription. Veuillez réessayer.");
    }
  };

  return (
    <div className="bg-gray-100">
      <div className="container flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-md">
          <CardHeader>
            <CardTitle className="text-center text-xl font-bold">
              Inscription
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
              type="text"
              placeholder="Nom d'utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* 🔒 Mot de passe */}
            <div className="relative">
              <Input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Nouveau mot de passe"
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

            {/* 🔒 Confirmation du mot de passe */}
            <div className="relative">
              <Input
                type={isConfirmPasswordVisible ? "text" : "password"}
                placeholder="Confirmer le mot de passe"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button
                type="button"
                variant="ghost"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() =>
                  setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                }
              >
                {isConfirmPasswordVisible ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </Button>
            </div>

            <Button onClick={handleRegister} className="w-full">
              Créer un compte
            </Button>
            <div className="text-center text-sm text-gray-600">
              En créant votre compte sur cette plateforme, vous acceptez nos{" "}
              <Link href="/terms" className="text-primary underline">
                conditions générales d&apos;utilisation
              </Link>
              .
            </div>

            <div className="text-center text-sm text-gray-600">
              <Link href="/auth/login" className="text-sm text-gray-600">
                Je possède déjà un compte, me connecter
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
