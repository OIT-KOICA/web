"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./mode-toggle";
import { signIn, useSession } from "next-auth/react";

const menuItems = [
  { name: "Accueil", href: "/" },
  { name: "Produits", href: "/products" },
  { name: "FAQ", href: "/faq" },
  { name: "A propos", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Blog", href: "/blog" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex items-center justify-between p-6">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/images/logo.png"
            alt="Cassava Marketplace Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="text-2xl font-bold">Cassava Marketplace</span>
        </Link>
        <nav className="hidden space-x-6 md:flex">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-6">
          {session ? (
            <Link href="/dashboard">
              <Button size="sm">Tableau de bord</Button>
            </Link>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => signIn("keycloak")}
            >
              Se connecter
            </Button>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
