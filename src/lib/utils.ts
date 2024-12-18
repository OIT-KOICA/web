import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Cookies from "js-cookie";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XAF",
  }).format(amount);
}

export function clearNextAuthCookies() {
  // Récupérer tous les cookies
  const cookies = document.cookie.split(";");

  // Parcourir chaque cookie
  cookies.forEach((cookie) => {
    const [key] = cookie.trim().split("=");

    // Si le cookie commence par "next.auth"
    if (key.startsWith("next.auth")) {
      // Supprimer le cookie en réglant sa date d'expiration dans le passé
      document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; Path=/`;
    }
  });
}

export const savePhoneToCookie = (phone: string) => {
  Cookies.set("userPhone", phone, {
    expires: 7,
    secure: true,
    sameSite: "Strict",
  });
};

export const getPhoneFromCookie = () => {
  return Cookies.get("userPhone");
};
