// components/client/adds/add-info.tsx

"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Tag, User, MessageSquare, Eye } from "lucide-react";
import { Offer } from "@/types/typeDTO";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import useStore from "@/lib/stores/store";

export default function AddInfo({ add }: { add: Offer }) {
  const { setActiveAdd } = useStore();
  const router = useRouter();

  return (
    <motion.div
      className="overflow-hidden rounded-lg border border-gray-200 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Titre */}
      <h2 className="mb-2 text-xl font-bold text-gray-800 dark:text-white">
        {add.title}
      </h2>

      {/* Description tronquée */}
      <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
        {add.description.length > 100
          ? `${add.description.slice(0, 100)}...`
          : add.description}
      </p>

      {/* Détails de contact */}
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <User className="size-4 text-primary" />
          {add.name}
        </div>
        <div className="flex items-center gap-2">
          <Phone className="size-4 text-primary" />
          {add.phone}
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="size-4 text-primary" />
          {add.location}
        </div>
      </div>

      {/* Catégories */}
      {add.categories.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {add.categories.map((cat, idx) => (
            <span
              key={idx}
              className="flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs text-white"
            >
              <Tag className="size-3" />
              {cat}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-between">
        <a
          href={`https://wa.me/${add.phone}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-md bg-green-500 px-4 py-2 text-sm text-white transition hover:bg-green-600"
        >
          <MessageSquare className="size-4" />
          WhatsApp
        </a>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            setActiveAdd(add);
            router.push(`/adds/${add.id}`);
          }}
        >
          <Eye className="mr-2 size-4" />
          Consulter
        </Button>
      </div>
    </motion.div>
  );
}
