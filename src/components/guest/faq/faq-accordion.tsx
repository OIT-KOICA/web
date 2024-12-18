"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useFAQData } from "@/hooks/use-faq-data";

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
      {faqData.map((category) => (
        <div key={category.id} className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">{category.title}</h2>
          {category.questions.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="mb-4 overflow-hidden rounded-lg border"
            >
              <AccordionTrigger
                onClick={() => handleItemClick(item.id)}
                className="flex w-full items-center justify-between bg-gray-50 p-4 text-left transition-colors hover:bg-gray-100"
              >
                <span className="font-medium">{item.question}</span>
              </AccordionTrigger>
              <AccordionContent className="bg-white p-4">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </div>
      ))}
    </Accordion>
  );
}
