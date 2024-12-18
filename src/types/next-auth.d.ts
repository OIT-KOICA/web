// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

// Étendre les types par défaut de NextAuth
declare module "next-auth" {
  interface Session {
    user: {
      id: string; // ID de l'utilisateur
      name?: string; // Nom de l'utilisateur (optionnel)
      email?: string; // Adresse e-mail de l'utilisateur (optionnel)
      image?: string; // URL de l'image de l'utilisateur (optionnel)
    };
    accessToken?: string; // Token d'accès OAuth
    refreshToken?: string; // Token de rafraîchissement OAuth
    expiresAt?: number; // Timestamp d'expiration
  }

  interface User {
    id: string; // ID de l'utilisateur
    name?: string;
    email?: string;
    image?: string;
  }
}

// Étendre les types JWT
declare module "next-auth/jwt" {
  interface JWT {
    userId: string; // ID de l'utilisateur
    accessToken?: string; // Token d'accès OAuth
    refreshToken?: string; // Token de rafraîchissement OAuth
    idToken?: string; // Token ID OAuth
    expiresAt?: number; // Timestamp d'expiration
  }
}
