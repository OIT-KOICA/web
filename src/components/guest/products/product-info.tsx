"use client";

import { ProductDTO } from "@/lib/type";
import { CheckCircle, XCircle, Phone } from "lucide-react";

export default function ProductInfo({ product }: { product: ProductDTO }) {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="text-muted-foreground">{product.description}</p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold">Category</h3>
          <p>{product.category}</p>
        </div>
        <div>
          <h3 className="font-semibold">Stock</h3>
          <p>
            {product.quantity} {product.unit}
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Perishability</h3>
          {product.isPerishable ? (
            <div className="flex items-center text-red-500">
              <XCircle className="mr-1 size-4" />
              Perishable
            </div>
          ) : (
            <div className="flex items-center text-green-500">
              <CheckCircle className="mr-1 size-4" />
              Non-perishable
            </div>
          )}
        </div>
        <div>
          <h3 className="font-semibold">Location</h3>
          <p>{product.localisation}</p>
        </div>
      </div>
      <div>
        <h3 className="font-semibold">Company</h3>
        <p>{product.company}</p>
      </div>
      <div>
        <h3 className="font-semibold">Contacts</h3>
        {product.companyPhones.map((phone, index) => (
          <a
            key={index}
            href={`tel:${phone}`}
            className="flex items-center text-primary hover:underline"
          >
            <Phone className="mr-1 size-4" />
            {phone}
          </a>
        ))}
      </div>
    </div>
  );
}
