/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";

interface CustomUser {
  id: string;
  username: string;
  email: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

const PUBLIC_KEY = process.env.NEXTAUTH_JWT_PUBLIC_KEY
  ? process.env.NEXTAUTH_JWT_PUBLIC_KEY.replace(/\\n/g, "\n")
  : null;

if (!PUBLIC_KEY) {
  throw new Error("🔴 La clé publique JWT est manquante !");
}

// ✅ Fonction de rafraîchissement du token
async function refreshAccessToken(token: any) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_PATH_URL}/auth/refresh-token`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken: token.refreshToken }),
      }
    );

    if (!res.ok) {
      console.error("🔴 Erreur lors du rafraîchissement du token:", res.status);
      return { ...token, error: "RefreshTokenError" };
    }

    const refreshedToken = await res.json();

    return {
      ...token,
      accessToken: refreshedToken.accessToken,
      refreshToken: refreshedToken.refreshToken ?? token.refreshToken,
      expiresAt: Date.now() + refreshedToken.expiresAt * 1000,
    };
  } catch (error) {
    console.error("🔴 Erreur refresh token :", error);
    return { ...token, error: "RefreshTokenError" };
  }
}

const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV === "development",
  providers: [
    CredentialsProvider({
      name: "Email / Mot de passe",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_PATH_URL}/auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          }
        );

        if (!res.ok) throw new Error("Identifiants invalides");

        const user: CustomUser & { expiresIn: number } = await res.json();
        if (!user.accessToken) throw new Error("Access token manquant!");

        return {
          id: user.id,
          username: user.username,
          email: user.email,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          expiresAt: Date.now() + user.expiresIn * 1000, // ✅ expiresIn utilisé directement ici
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as CustomUser;
        token.userId = u.id;
        token.accessToken = u.accessToken;
        token.refreshToken = u.refreshToken;
        token.expiresAt = Date.now() + u.expiresAt * 1000;
      }

      // ✅ Vérification JWT
      try {
        if (PUBLIC_KEY) {
          jwt.verify(token.accessToken as string, PUBLIC_KEY, {
            algorithms: ["RS256"],
          });
        }
      } catch (error) {
        console.error("🔴 JWT invalide :", error);
        return await refreshAccessToken(token);
      }

      // 🔄 Refresh si expiré
      if (!token.expiresAt || Date.now() >= token.expiresAt) {
        console.log("🔄 Token expiré, rafraîchissement...");
        return await refreshAccessToken(token);
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.userId as string;
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      session.expiresAt = token.expiresAt as number;

      return session;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  useSecureCookies: process.env.NODE_ENV === "production",
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
