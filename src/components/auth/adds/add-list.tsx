"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";
import { Loader2 } from "lucide-react";
import useStore from "@/lib/stores/store";
import { useGetAddByUser } from "@/lib/query/configuration-query";
import AddCard from "./add-card";

export default function AddList() {
  const router = useRouter();
  const { adds, setEdit } = useStore();
  const { ref, inView } = useInView();
  const { fetchNextPage, hasNextPage, isFetchingNextPage } = useGetAddByUser();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button
          onClick={() => {
            setEdit(false);
            router.push("/dashboard/adds/create");
          }}
        >
          <Plus className="mr-2 size-4" />
          Créer une annonce
        </Button>
      </div>

      {adds.length === 0 ? (
        <p className="text-center text-gray-500">Aucune annonce trouvée.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {adds.map((add) => (
            <AddCard key={add.id} add={add} />
          ))}
        </div>
      )}

      {hasNextPage && (
        <div ref={ref} className="text-center">
          {isFetchingNextPage ? (
            <Loader2 className="animate-spin text-primary" />
          ) : (
            <Button onClick={() => fetchNextPage()}>Charger plus</Button>
          )}
        </div>
      )}
    </div>
  );
}
