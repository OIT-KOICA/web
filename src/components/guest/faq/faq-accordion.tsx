"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useFAQData } from "@/lib/hooks/use-faq-data";
import { motion } from "framer-motion";

export default function FAQAccordion() {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const { faqData, isLoading } = useFAQData();

  const handleItemClick = (value: string) => {
    setOpenItem(openItem === value ? null : value);
  };

  if (isLoading) {
    return <div className="text-center">Chargement des FAQ...</div>;
  }

  return (
    <Accordion type="single" collapsible className="w-full space-y-4">
      {faqData.map((category, categoryIndex) => (
        <motion.div
          key={category.id}
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
        >
          <h2 className="mb-4 text-2xl font-semibold">{category.title}</h2>
          {category.questions.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="mb-4 overflow-hidden rounded-lg border bg-white dark:bg-gray-800"
            >
              <AccordionTrigger
                onClick={() => handleItemClick(item.id)}
                className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <span className="font-medium">{item.question}</span>
              </AccordionTrigger>
              <AccordionContent className="bg-gray-50 p-4 dark:bg-gray-700">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </motion.div>
      ))}
    </Accordion>
  );
}
