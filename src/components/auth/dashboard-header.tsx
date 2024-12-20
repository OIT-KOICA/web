"use client";

import { motion } from "framer-motion";

export default function DashboardHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12 text-center"
    >
      <h1 className="text-gradient mb-4 text-4xl font-bold">
        Bienvenue dans votre tableau de bord
      </h1>
      <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
        Explorez les fonctionnalités de Cassava Marketplace pour gérer vos
        produits, découvrir des articles utiles, publier des annonces et obtenir
        de l&apos;aide lorsque vous en avez besoin. quand vous en avez besoin.
      </p>
    </motion.div>
  );
}
