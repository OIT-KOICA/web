import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import SessionProviderWrapper from "@/components/auth/session-provider-wrapper";
import QueryProviderWrapper from "@/components/auth/query-provider-wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Cassava Marketplace",
  description:
    "Mise en relation des entrepreneurs locaux dans les chaînes de valeur du manioc, du maïs et de la volaille.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning={true}>
      <body className={inter.className} suppressHydrationWarning={true}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProviderWrapper>
            <QueryProviderWrapper>{children}</QueryProviderWrapper>
          </SessionProviderWrapper>

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
