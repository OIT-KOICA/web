import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  // Ne pas bloquer les routes NextAuth
  if (req.nextUrl.pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    console.log(
      "🔴 Middleware: Token manquant ou expiré. Redirection vers /auth/login"
    );
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

// Applique le middleware uniquement aux routes protégées
export const config = {
  matcher: ["/dashboard/:path*"], // S'applique uniquement au dashboard
};
