"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown } from "lucide-react";
import { useFAQData } from "@/hooks/use-faq-data";

export default function FAQAccordion() {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const { faqData, isLoading } = useFAQData();

  const handleItemClick = (value: string) => {
    setOpenItem(openItem === value ? null : value);
  };

  if (isLoading) {
    return <div className="text-center">Loading FAQ...</div>;
  }

  return (
    <Accordion type="single" collapsible className="w-full space-y-4">
      {faqData.map((category) => (
        <div key={category.id} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{category.title}</h2>
          {category.questions.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="border rounded-lg overflow-hidden mb-4"
            >
              <AccordionTrigger
                onClick={() => handleItemClick(item.id)}
                className="flex justify-between items-center w-full p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <span className="font-medium">{item.question}</span>
              </AccordionTrigger>
              <AccordionContent className="p-4 bg-white">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </div>
      ))}
    </Accordion>
  );
}
