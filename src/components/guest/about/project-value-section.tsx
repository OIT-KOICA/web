"use client";

import { motion } from "framer-motion";
import {
  Users,
  Factory,
  Truck,
  Building2,
  Store,
  Landmark,
} from "lucide-react";

const stakeholders = [
  {
    icon: Users,
    title: "Producers",
    description: "Farmers and primary agricultural producers",
  },
  {
    icon: Factory,
    title: "Processors",
    description: "Value-adding businesses in the agricultural chain",
  },
  {
    icon: Truck,
    title: "Collectors",
    description: "Aggregators of agricultural products",
  },
  {
    icon: Store,
    title: "Marketers",
    description: "Distributors and retailers of agricultural products",
  },
  {
    icon: Building2,
    title: "Financial Institutions",
    description: "Banks and micro-finance organizations",
  },
  {
    icon: Landmark,
    title: "External Institutions",
    description: "NGOs and government agencies",
  },
];

export default function StakeholdersSection() {
  return (
    <section>
      <h2 className="text-3xl font-semibold mb-8 text-center">
        Our Stakeholders
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {stakeholders.map((stakeholder, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <stakeholder.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">{stakeholder.title}</h3>
            <p className="text-gray-600">{stakeholder.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
