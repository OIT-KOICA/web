"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Phone, MapPin } from "lucide-react";

interface Offer {
  id: string;
  name: string;
  phone: string;
  location: string;
  description: string;
  createdAt: string;
}

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
          <h2 className="text-gradient mb-4 text-3xl font-bold">
            J&apos;ai besoin de
          </h2>
          <p className="mb-6 text-lg">{offer.description}</p>
          <div className="mb-6 space-y-4">
            <div className="flex items-center">
              <User className="mr-3 size-6 text-primary" />
              <span className="text-lg">{offer.name}</span>
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
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
