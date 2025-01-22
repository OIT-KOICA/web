import NextAuth, { NextAuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

const authOptions: NextAuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: `${process.env.KEYCLOAK_CLIENT_ID}` || "",
      clientSecret: `${process.env.KEYCLOAK_CLIENT_SECRET}` || "",
      issuer: `${process.env.KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}`,
    }),
  ],
  session: {
    strategy: "jwt", // Utilisation des tokens JWT pour la session
    maxAge: 60 * 60 * 24, // Durée de la session en secondes (1j ici)
  },
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true, // Empêche l'accès côté client
        secure: process.env.NODE_ENV === "production", // Nécessite HTTPS en production
        sameSite: "lax", // Recommandé pour l'authentification OAuth
        path: "/",
      },
    },
    callbackUrl: {
      name: `__Secure-next-auth.callback-url`,
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      },
    },
    csrfToken: {
      name: `__Host-next-auth.csrf-token`,
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      },
    },
  },
  callbacks: {
    async jwt({ token, account }) {
      const currentTime = Math.floor(Date.now() / 1000); // Temps actuel en secondes

      // Si c'est le premier token (connexion initiale)
      if (account) {
        token.idToken = account.id_token;
        token.userId = account.providerAccountId;
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        if (account.expires_at)
          token.expiresAt = currentTime + account.expires_at; // Timestamp d'expiration
      }

      return token;
    },

    async session({ session, token }) {
      // Ajoute les tokens à la session utilisateur
      session.user.id = token.userId;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.expiresAt = token.expiresAt;
      return session;
    },
  },
  secret: `${process.env.NEXTAUTH_SECRET}`,
};

const handler = NextAuth(authOptions) as never;

// Exportation standard pour les handlers API avec Next.js 15
export { handler as GET, handler as POST };
