import React from "react";
import { motion } from "framer-motion";
import { Offer } from "@/lib/type";
import { MapPin, Phone, Tag, User } from "lucide-react";

export default function AddInfo({ add }: { add: Offer }) {
  return (
    <motion.div
      className="rounded-lg border bg-white p-4 shadow dark:bg-gray-800"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <h2 className="text-gradient mb-4 text-3xl font-bold">
        J&apos;ai besoin de
      </h2>
      <p className="mb-6 text-lg">{add.description}</p>

      {/* Informations Utilisateur */}
      <div className="mb-6 space-y-4">
        <div className="flex items-center">
          <User className="mr-3 size-6 text-primary" />
          <span className="text-lg font-semibold">{add.name}</span>
        </div>
        <div className="flex items-center">
          <Phone className="mr-3 size-6 text-primary" />
          <span className="text-lg">{add.phone}</span>
        </div>
        <div className="flex items-center">
          <MapPin className="mr-3 size-6 text-primary" />
          <span className="text-lg">{add.location}</span>
        </div>
      </div>

      {/* Catégories */}
      {add.categories.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold">Catégories concernées :</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {add.categories.map((category, index) => (
              <span
                key={index}
                className="flex items-center gap-2 rounded-full bg-primary px-3 py-1 text-sm text-white"
              >
                <Tag className="size-4" />
                {category}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Bouton de contact */}
      <div className="flex justify-end">
        <a
          href={`https://wa.me/${add.phone}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
        >
          <Phone className="size-5" />
          Contacter sur WhatsApp
        </a>
      </div>
    </motion.div>
  );
}
