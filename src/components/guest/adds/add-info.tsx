"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Tag, User, MessageSquare } from "lucide-react";
import { Offer } from "@/types/typeDTO";

export default function AddInfo({ add }: { add: Offer }) {
  return (
    <motion.div
      className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <div className="p-5">
        {/* Titre de l'annonce */}
        <h2 className="mb-2 text-2xl font-bold text-gray-800 dark:text-white">
          {add.title}
        </h2>

        {/* Description */}
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          {add.description}
        </p>

        {/* Informations Utilisateur */}
        <div className="space-y-3">
          <div className="flex items-center">
            <User className="mr-3 size-5 text-blue-600 dark:text-blue-400" />
            <span className="text-base font-medium">{add.name}</span>
          </div>
          <div className="flex items-center">
            <Phone className="mr-3 size-5 text-green-600 dark:text-green-400" />
            <span className="text-base">{add.phone}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="mr-3 size-5 text-red-600 dark:text-red-400" />
            <span className="text-base">{add.location}</span>
          </div>
        </div>

        {/* Catégories concernées */}
        {add.categories.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Catégories concernées :
            </h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {add.categories.map((category, index) => (
                <span
                  key={index}
                  className="flex items-center gap-2 rounded-full bg-primary px-3 py-1 text-sm font-medium text-white"
                >
                  <Tag className="size-4" />
                  {category}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Bouton de contact amélioré */}
        <div className="mt-6 flex justify-between">
          <a
            href={`https://wa.me/${add.phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-500 px-4 py-2 text-white transition hover:bg-green-600"
          >
            <MessageSquare className="size-5" />
            Contacter sur WhatsApp
          </a>
        </div>
      </div>
    </motion.div>
  );
}
