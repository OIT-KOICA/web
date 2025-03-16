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
    maxSizeMB: 2, // Compression à max 2MB
    maxWidthOrHeight: 1920, // Redimensionner max à 1920px
    useWebWorker: true, // Optimisation des performances
  };

  try {
    return await imageCompression(file, options);
  } catch (error) {
    console.error("Erreur lors de la compression de l'image:", error);
    return file;
  }
}

export async function compressPDF(file: File) {
  try {
    const pdfDoc = await PDFDocument.load(await file.arrayBuffer());
    pdfDoc.setCreator("Optimisation PDF");
    const compressedPdf = await pdfDoc.save();
    return new File([compressedPdf], file.name, { type: "application/pdf" });
  } catch (error) {
    console.error("Erreur lors de la compression du PDF:", error);
    return file;
  }
}

export async function compressFile(file: File) {
  const zip = new JSZip();
  zip.file(file.name, file);
  const zipFile = await zip.generateAsync({ type: "blob" });
  return new File([zipFile], file.name + ".zip", { type: "application/zip" });
}

export async function compressDocx(file: File) {
  try {
    const zip = new JSZip();
    zip.file(file.name, file);
    const compressedDocx = await zip.generateAsync({ type: "blob" });
    return new File([compressedDocx], file.name, {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
  } catch (error) {
    console.error("Erreur lors de la compression du fichier DOCX:", error);
    return file;
  }
}

export async function compressXls(file: File) {
  try {
    const zip = new JSZip();
    zip.file(file.name, file);
    const compressedXls = await zip.generateAsync({ type: "blob" });
    return new File([compressedXls], file.name, {
      type: "application/vnd.ms-excel",
    });
  } catch (error) {
    console.error("Erreur lors de la compression du fichier XLS:", error);
    return file;
  }
}
