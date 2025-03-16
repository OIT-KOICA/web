/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_PATH_URL}/auth/reset-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            usernameOrEmail,
            newPassword: password,
          }),
        }
      );

      if (!res.ok) throw new Error("Échec de la réinitialisation.");

      router.push("/auth/login");
    } catch (err) {
      setError("Impossible de réinitialiser le mot de passe.");
    }
  };

  return (
    <div className="bg-gray-100">
      <div className="container flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-md shadow-md">
          <CardHeader>
            <CardTitle className="text-center text-xl font-bold">
              Réinitialisation du Mot de Passe
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
              placeholder="Nom d'utilisateur ou Email"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
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

            <Button onClick={handleResetPassword} className="w-full">
              Réinitialiser le mot de passe
            </Button>

            <div className="text-center text-sm text-gray-600">
              <a href="/auth/login" className="text-sm text-gray-600">
                Retour à la connexion
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
