"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import AnnouncementModal from "@/components/guest/products/announcement-modal";
import AddInfo from "@/components/guest/adds/add-info";
import { useGetAdds } from "@/lib/query/configuration-query";
import { Offer } from "@/types/typeDTO";

export default function AddListPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, fetchNextPage, hasNextPage } = useGetAdds();

  return (
    <div className="container mx-auto min-h-screen px-4 py-10">
      {/* En-tête améliorée avec animation */}
      <motion.h1
        className="text-gradient mb-6 text-center text-5xl font-extrabold"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        📢 Annonces en cours
      </motion.h1>

      {/* Bouton de création d’annonce avec meilleure visibilité */}
      <div className="mb-8 flex justify-center">
        <Button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-lg font-medium text-white shadow-md transition"
        >
          <Plus className="size-5" />
          Publier une annonce
        </Button>
      </div>

      {/* Grid des annonces avec effet fluide */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data?.pages
          .flatMap((page) => page.adds)
          .map((add: Offer) => (
            <AddInfo key={add.id} add={add} />
          ))}
      </div>

      {/* Bouton de chargement supplémentaire avec animation */}
      {hasNextPage && (
        <div className="mt-6 flex justify-center">
          <Button
            onClick={() => fetchNextPage()}
            className="rounded-lg bg-gray-200 px-5 py-2 text-gray-700 shadow hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            Charger plus...
          </Button>
        </div>
      )}

      {/* Modal d'ajout d'annonce */}
      <AnnouncementModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
