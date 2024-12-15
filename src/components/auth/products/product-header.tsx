import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProductHeader({
  name,
  file,
}: {
  name: string;
  file: string | null;
}) {
  return (
    <div className="relative h-64 overflow-hidden rounded-lg">
      {file && (
        <Image
          src={`${process.env.NEXT_PUBLIC_API_PATH_URL}/image/${file}`}
          alt={name ?? "Nom du produit"}
          layout="fill"
          objectFit="cover"
          className="z-0"
        />
      )}
      <div className="absolute inset-0 z-10 bg-black bg-opacity-50" />
      <div className="absolute inset-0 z-20 flex flex-col justify-between p-6">
        <Link href="/dashboard/products">
          <Button
            variant="ghost"
            className="text-white hover:bg-black/20 hover:text-white"
          >
            <ArrowLeft className="mr-2 size-4" />
            Retour aux produits
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-white">{name}</h1>
      </div>
    </div>
  );
}
