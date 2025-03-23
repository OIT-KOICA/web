"use client";

import { Offer } from "@/types/typeDTO";
import { MapPin, Phone, User, Tag } from "lucide-react";
import Markdown from "react-markdown";

export default function AddDetail({ add }: { add: Offer }) {
  return (
    <article className="mx-auto max-w-3xl space-y-6 rounded-md border p-6 shadow-lg dark:border-gray-700">
      <h1 className="text-center text-3xl font-bold text-primary">
        {add.title}
      </h1>

      <Markdown className="prose dark:prose-invert">{add.description}</Markdown>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex items-center gap-2">
          <User className="size-5 text-primary" />
          <span>{add.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="size-5 text-primary" />
          <span>{add.phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="size-5 text-primary" />
          <span>{add.location}</span>
        </div>
      </div>

      {add.categories.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Catégories :</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {add.categories.map((cat, idx) => (
              <span
                key={idx}
                className="flex items-center gap-2 rounded-full bg-primary px-3 py-1 text-sm text-white"
              >
                <Tag className="size-4" />
                {cat}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 flex justify-center">
        <a
          href={`https://wa.me/${add.phone}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md bg-green-600 px-6 py-2 text-white hover:bg-green-700"
        >
          <Phone className="size-4" />
          Contacter sur WhatsApp
        </a>
      </div>
    </article>
  );
}
