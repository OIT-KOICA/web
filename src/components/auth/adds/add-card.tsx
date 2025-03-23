"use client";

import { Offer } from "@/types/typeDTO";
import { motion } from "framer-motion";
import { MapPin, Phone, Tag, Trash2, Eye, Building2, Pencil } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useStore from "@/lib/stores/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ConfirmDialog from "../confirm-dialog";
import { useDeleteAdd } from "@/lib/query/configuration-query";

interface Props {
  add: Offer;
}

export default function AddCard({ add }: Props) {
  const router = useRouter();
  const { setActiveAdd, setEdit } = useStore();
  const deleteAdd = useDeleteAdd();

  const [openConfirm, setOpenConfirm] = useState(false);

  const handleConfirmDelete = async () => {
    try {
      await deleteAdd.mutateAsync({ id: add.id });
    } catch (err) {
      console.error("Erreur suppression annonce :", err);
    } finally {
      setOpenConfirm(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border shadow-md transition hover:shadow-xl"
    >
      <Card>
        <CardContent className="space-y-4 p-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold">{add.title}</h2>
            <p className="text-muted-foreground">{add.description}</p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-2">
              <Phone className="size-4 text-primary" />
              <span className="text-sm">{add.phone}</span>
            </div>

            <div className="flex items-center gap-2">
              <Building2 className="size-4 text-primary" />
              <span className="text-sm">{add.name}</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="size-4 text-primary" />
              <span className="text-sm">{add.location}</span>
            </div>

            {add.categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {add.categories.map((cat, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs text-primary"
                  >
                    <Tag className="size-3" />
                    {cat}
                  </span>
                ))}
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between gap-2 border-t px-4 py-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setActiveAdd(add);
              router.push(`/dashboard/adds/${add.id}`);
            }}
          >
            <Eye className="mr-1 size-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setActiveAdd(add);
              setEdit(true);
              router.push(`/dashboard/adds/create`);
            }}
          >
            <Pencil className="mr-1 size-4 text-gray-900" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setOpenConfirm(true)}
          >
            <Trash2 className="mr-1 size-4 text-red-600" />
          </Button>
        </CardFooter>
      </Card>

      <ConfirmDialog
        isOpen={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={handleConfirmDelete}
        title="Supprimer l'annonce"
        description={`Voulez-vous vraiment supprimer cette annonce : « ${add.title} » ? Cette action est irréversible.`}
      />
    </motion.div>
  );
}
