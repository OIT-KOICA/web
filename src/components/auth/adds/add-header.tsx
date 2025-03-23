"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Offer } from "@/types/typeDTO";
import Link from "next/link";

interface Props {
  add: Offer | null;
}

export default function AddHeader({ add }: Props) {
  if (!add) return null;

  return (
    <div className="flex items-center justify-between border-b pb-4">
      <div>
        <h2 className="text-2xl font-bold">{add.title}</h2>
        <p className="text-sm text-muted-foreground">
          Publié le : {new Date(add.createdAt).toLocaleString()}
        </p>
      </div>
      <Link href="/dashboard/adds">
        <Button variant="outline">
          <ArrowLeft className="mr-2 size-4" />
          Retour aux annonces
        </Button>
      </Link>
    </div>
  );
}
