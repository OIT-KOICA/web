import { clearNextAuthCookies } from "@/lib/utils";
import NextAuth, { NextAuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

export const authOptions: NextAuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: `${process.env.KEYCLOAK_CLIENT_ID}`,
      clientSecret: `${process.env.KEYCLOAK_CLIENT_SECRET}`,
      issuer: `${process.env.KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}`,
    }),
  ],
  session: {
    strategy: "jwt", // Utilisation des tokens JWT pour la session
    maxAge: 60 * 60 * 24, // Durée de la session en secondes (1j ici)
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
        token.expiresAt = currentTime + account.expires_at; // Timestamp d'expiration
      }

      return token;
    },

    async session({ session, token }) {
      if (!token) {
        console.log("Token expiré, suppression de la session.");
        clearNextAuthCookies();
        return { ...session, error: "TokenExpired" }; // Toujours retourner un objet valide
      }

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

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
