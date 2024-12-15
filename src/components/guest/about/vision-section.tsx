"use client";

import { motion } from "framer-motion";
import { Lightbulb, Link, Sprout } from "lucide-react";

const visionItems = [
  {
    icon: Lightbulb,
    title: "Enhance Value Chains",
    description:
      "Improve the efficiency and profitability of cassava, maize, and poultry value chains.",
  },
  {
    icon: Link,
    title: "Connect Stakeholders",
    description:
      "Bridge the gap between producers, processors, and consumers in the agricultural sector.",
  },
  {
    icon: Sprout,
    title: "Promote Sustainability",
    description:
      "Foster sustainable development practices in agriculture and related industries.",
  },
];

export default function VisionSection() {
  return (
    <section className="text-center">
      <h2 className="text-3xl font-semibold mb-8">Our Vision</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {visionItems.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <item.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
