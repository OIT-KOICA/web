"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const valuePoints = [
  "Increased revenue for producers through direct market access",
  "Improved efficiency in the supply chain",
  "Enhanced transparency in pricing and transactions",
  "Access to a wider range of products for consumers",
  "Promotion of sustainable agricultural practices",
  "Facilitation of knowledge sharing and capacity building",
];

export default function ProjectValueSection() {
  return (
    <section className="bg-gray-50 p-8 rounded-lg">
      <h2 className="text-3xl font-semibold mb-8 text-center">Project Value</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <p className="text-lg mb-6">
            Cassava Marketplace is essential for the agricultural value chains
            we support. Our platform brings numerous benefits to all
            stakeholders involved:
          </p>
          <ul className="space-y-4">
            {valuePoints.map((point, index) => (
              <motion.li
                key={index}
                className="flex items-start"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <CheckCircle className="w-6 h-6 text-green-500 mr-2 flex-shrink-0 mt-1" />
                <span>{point}</span>
              </motion.li>
            ))}
          </ul>
        </div>
        <div className="bg-primary text-white p-8 rounded-lg">
          <h3 className="text-2xl font-semibold mb-4">Our Impact</h3>
          <p className="mb-4">
            By connecting producers directly with consumers and other
            stakeholders, revolutionizing the agricultural sector in
            our region.
          </p>
          <p>
            Our platform not only increases profitability for farmers and
            businesses but also contributes to food security and sustainable
            development in the communities we serve.
          </p>
        </div>
      </div>
    </section>
  );
}
