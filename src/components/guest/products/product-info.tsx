"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatCurrency } from "@/lib/utils";
import { ProductDTO } from "@/types/type";
import { CheckCircle, XCircle, Phone, BadgePercent } from "lucide-react";

export default function ProductInfo({
  product,
}: {
  product: ProductDTO | null;
}) {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">{product ? product.name : ""}</h1>
      <p className="text-muted-foreground">
        {product ? product.description : ""}
      </p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold">Catégorie</h3>
          <p>{product ? product.category : ""}</p>
        </div>
        <div>
          <h3 className="font-semibold">Prix</h3>
          <p className="flex items-center">
            <BadgePercent className="mr-1 size-4" />
            {product ? formatCurrency(product.basePrice) : ""}
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Quantité en stock</h3>
          <p>
            {product ? product.quantity : ""} {product ? product.unit : ""}
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Le produit est-il périmable ?</h3>
          {product && product.isPerishable ? (
            <div className="flex items-center text-red-500">
              <XCircle className="mr-1 size-4" />
              Périmable
            </div>
          ) : (
            <div className="flex items-center text-green-500">
              <CheckCircle className="mr-1 size-4" />
              Non-périmable
            </div>
          )}
        </div>
        <div>
          <h3 className="font-semibold">
            Le produit est-il un produit dérivé ?
          </h3>
          {product && product.isDerivedProduct ? (
            <div className="flex items-center text-red-500">
              <XCircle className="mr-1 size-4" />
              Produit non dérivé
            </div>
          ) : (
            <div className="flex items-center text-green-500">
              <CheckCircle className="mr-1 size-4" />
              Produit dérivé
            </div>
          )}
        </div>
        <div>
          <h3 className="font-semibold">Zone de localisation</h3>
          <p>{product ? product.localisation : ""}</p>
        </div>
      </div>
      <div>
        <h3 className="font-semibold">Entreprise</h3>
        <div className="mt-2 flex items-center space-x-2">
          <Avatar className="size-8">
            {product && (
              <AvatarImage src={product.companyAvatar} alt={product.company} />
            )}
            <AvatarFallback>
              {product ? product.company.slice(0, 2).toUpperCase() : ""}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium text-primary">
            {product ? product.company : ""}
          </span>
        </div>
      </div>
      <div>
        <h3 className="font-semibold">Contacts de l&apos;entreprise</h3>
        {product &&
          product.companyPhones.map((phone, index) => (
            <a
              key={index}
              href={`tel:${phone}`}
              className="my-2 flex items-center text-primary hover:underline"
            >
              <Phone className="mr-1 size-4" />
              {phone}
            </a>
          ))}
      </div>
    </div>
  );
}
