"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MapPin, Phone, Tag, User } from "lucide-react";
import { Offer } from "@/types/typeDTO";

interface Props {
  add: Offer | null;
}

export default function AddInfo({ add }: Props) {
  if (!add) return null;

  return (
    <Card className="border border-gray-200 shadow-lg dark:border-gray-700">
      <CardHeader className="flex flex-col items-center space-y-2">
        <Avatar className="size-16">
          <AvatarFallback>{add.name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <CardTitle className="text-center text-2xl font-bold">
          {add.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Description */}
        <div>
          <p className="text-base text-gray-700 dark:text-gray-300">
            {add.description}
          </p>
        </div>

        {/* Contact et localisation */}
        <div className="grid grid-cols-1 gap-4 border-t pt-4 md:grid-cols-2">
          <div className="flex items-center space-x-2">
            <User className="size-5 text-primary" />
            <span>{add.name}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="size-5 text-primary" />
            <span>{add.phone}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="size-5 text-primary" />
            <span>{add.location}</span>
          </div>
        </div>

        {/* Catégories associées */}
        {add.categories.length > 0 && (
          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold">Catégories :</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {add.categories.map((cat, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1 text-sm text-white"
                >
                  <Tag className="size-4" />
                  {cat}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
