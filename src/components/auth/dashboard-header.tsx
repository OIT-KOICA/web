"use client";

import { motion } from "framer-motion";

export default function DashboardHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-12"
    >
      <h1 className="text-4xl font-bold mb-4">Welcome to Your Dashboard</h1>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
        Explore the features of Cassava Marketplace to manage your products,
        discover useful articles, post announcements, and get support when you
        need it.
      </p>
    </motion.div>
  );
}
