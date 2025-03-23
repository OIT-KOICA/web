"use client";

import { useEffect, useState } from "react";
import useStore from "@/lib/stores/store";
import AddDetail from "@/components/guest/adds/add-detail";

export default function AddDetailPage() {
  const { activeAdd } = useStore();
  const [currentAdd, setCurrentAdd] = useState(activeAdd);

  useEffect(() => {
    if (activeAdd) setCurrentAdd(activeAdd);
  }, [activeAdd]);

  if (!currentAdd) {
    return <div className="text-center text-red-500">Annonce non trouvée.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <AddDetail add={currentAdd} />
    </div>
  );
}
