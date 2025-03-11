/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Cookies from "js-cookie";
import imageCompression from "browser-image-compression";
import { PDFDocument } from "pdf-lib";
import JSZip from "jszip";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

/**
 * Vérifie si un fichier dépasse la limite autorisée de 10 Mo.
 * @param file Le fichier à vérifier.
 * @returns {boolean} True si la taille est correcte, False sinon.
 */
export const isFileSizeValid = (file: File | undefined | null): boolean => {
  return file ? file.size <= MAX_FILE_SIZE : true;
};

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

/**
 * Vérifie de manière récursive si deux objets sont strictement identiques.
 * @param {any} obj1 Premier objet à comparer.
 * @param {any} obj2 Deuxième objet à comparer.
 * @returns {boolean} True si les deux objets sont identiques, false sinon.
 */
export function deepEqual(obj1: any, obj2: any) {
  // Vérifie si les deux références pointent vers la même instance
  if (obj1 === obj2) return true;

  // Vérifie si les deux paramètres sont bien des objets non null
  if (
    typeof obj1 !== "object" ||
    obj1 === null ||
    typeof obj2 !== "object" ||
    obj2 === null
  ) {
    return false;
  }

  // Récupère les clés des deux objets
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // Vérifie si les objets ont le même nombre de clés
  if (keys1.length !== keys2.length) return false;

  // Vérifie récursivement chaque propriété
  for (const key of keys1) {
    if (!keys2.includes(key)) return false;

    if (!deepEqual(obj1[key], obj2[key])) return false;
  }

  return true;
}

export async function compressImage(file: File) {
  const options = {
    maxSizeMB: 2, // Max 2MB après compression
    maxWidthOrHeight: 1920, // Redimensionnement max
    useWebWorker: true, // Optimisation
  };
  return await imageCompression(file, options);
}

export async function compressPDF(file: File) {
  const pdfDoc = await PDFDocument.load(await file.arrayBuffer());
  pdfDoc.setCreator("Compression Service");
  const compressedPdf = await pdfDoc.save();
  return new File([compressedPdf], file.name, { type: "application/pdf" });
}

export async function compressFile(file: File) {
  const zip = new JSZip();
  zip.file(file.name, file);
  const zipFile = await zip.generateAsync({ type: "blob" });
  return new File([zipFile], file.name + ".zip", { type: "application/zip" });
}
