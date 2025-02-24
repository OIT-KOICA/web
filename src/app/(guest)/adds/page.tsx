"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import AnnouncementModal from "@/components/guest/products/announcement-modal";
import { Offer } from "@/types/type";
import AddInfo from "@/components/guest/adds/add-info";
import { useGetAdds } from "@/lib/query/configuration-query";

export default function AddListPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, fetchNextPage, hasNextPage } = useGetAdds();

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
          {data?.pages
            .flatMap((page) => page.adds)
            .map((add: Offer) => (
              <AddInfo key={add.id} add={add} />
            ))}
        </div>
      </div>

      {hasNextPage && (
        <div className="mt-4 flex justify-center">
          <Button onClick={() => fetchNextPage()}>Charger plus...</Button>
        </div>
      )}

      <AnnouncementModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
