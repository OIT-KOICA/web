import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    // Redirige l'utilisateur vers la page d'accueil si le token est absent ou expiré
    console.log("Missing Token! Redirect...");
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// Active le middleware pour les routes protégées
export const config = {
  matcher: ["/dashboard/:path*"],
};
