/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useGetAdds } from "@/lib/query/configuration-query";
import AnnouncementModal from "@/components/guest/products/announcement-modal";
import { Offer } from "@/types/type";
import AddInfo from "@/components/guest/adds/add-info";

export default function AddListPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { adds } = useGetAdds();

  return (
    <div className="container mx-auto min-h-screen px-4 py-8">
      <motion.h1
        className="text-gradient mb-8 text-center text-4xl font-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Annonces
      </motion.h1>
      <div className="my-6 flex items-center justify-around">
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 size-4" /> Créer une annonce
        </Button>
      </div>
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {adds && adds.length > 0 ? (
            adds.map((add: Offer) => <AddInfo key={add.id} add={add} />)
          ) : (
            <div className="m-4 text-center">
              Pas de d&apos;annonces pour le moment
            </div>
          )}
        </div>
      </div>

      <AnnouncementModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
