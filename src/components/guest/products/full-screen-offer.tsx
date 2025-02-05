"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Phone, MapPin, Tag } from "lucide-react";
import { Offer } from "@/lib/type";

interface FullScreenOfferProps {
  offer: Offer;
  onClose: () => void;
}

export default function FullScreenOffer({
  offer,
  onClose,
}: FullScreenOfferProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-2xl rounded-lg bg-card p-6 text-card-foreground shadow-lg"
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-muted-foreground transition-colors hover:text-foreground"
          >
            <X size={24} />
          </button>

          {/* Titre */}
          <h2 className="text-gradient mb-4 text-3xl font-bold">
            J&apos;ai besoin de
          </h2>
          <p className="mb-6 text-lg">{offer.description}</p>

          {/* Informations Utilisateur */}
          <div className="mb-6 space-y-4">
            <div className="flex items-center">
              <User className="mr-3 size-6 text-primary" />
              <span className="text-lg font-semibold">{offer.name}</span>
            </div>
            <div className="flex items-center">
              <Phone className="mr-3 size-6 text-primary" />
              <span className="text-lg">{offer.phone}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-3 size-6 text-primary" />
              <span className="text-lg">{offer.location}</span>
            </div>
          </div>

          {/* Catégories */}
          {offer.categories.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold">Catégories concernées :</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {offer.categories.map((category, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-2 rounded-full bg-primary px-3 py-1 text-sm text-white"
                  >
                    <Tag className="size-4" />
                    {category}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Bouton de contact */}
          <div className="flex justify-end">
            <a
              href={`https://wa.me/${offer.phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
            >
              <Phone className="size-5" />
              Contacter sur WhatsApp
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
