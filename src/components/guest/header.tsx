"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./mode-toggle";
import { useSession } from "next-auth/react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  { name: "Accueil", href: "/" },
  { name: "Produits", href: "/products" },
  { name: "Annonces", href: "/adds" },
  { name: "FAQ", href: "/faq" },
  { name: "A propos", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Blog", href: "/blog" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/images/logo.png"
            alt="Cassava Marketplace Logo"
            width={40}
            height={40}
            style={{ maxWidth: "100%", height: "auto" }}
            className="rounded-full"
          />
          <span className="text-gradient text-2xl font-bold">
            Cassava Marketplace
          </span>
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
        <div className="hidden items-center space-x-4 md:flex">
          {session ? (
            <Link href="/dashboard">
              <Button size="sm">Tableau de bord</Button>
            </Link>
          ) : (
            <Link href="/auth/login">
              <Button
                variant="outline"
                size="sm"
                className="bg-soil-100 hover:bg-soil-200 dark:bg-soil-900 dark:hover:bg-soil-800"
              >
                Se connecter
              </Button>
            </Link>
          )}
          <ModeToggle />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="text-foreground md:hidden"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="border-t bg-background md:hidden"
          >
            <nav className="container mx-auto flex flex-col space-y-4 px-6 py-4">
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
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-2">
                {session ? (
                  <Link href="/dashboard">
                    <Button size="sm">Tableau de bord</Button>
                  </Link>
                ) : (
                  <Link href="/auth/login">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-soil-100 hover:bg-soil-200 dark:bg-soil-900 dark:hover:bg-soil-800"
                    >
                      Se connecter
                    </Button>
                  </Link>
                )}
              </div>
              <div className="flex justify-center">
                <ModeToggle />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
