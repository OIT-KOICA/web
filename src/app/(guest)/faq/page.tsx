import FAQAccordion from "@/components/guest/faq/faq-accordion";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ - Cassava Marketplace",
  description: "Frequently Asked Questions about Cassava Marketplace",
};

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="mb-12 text-center text-4xl font-bold">
        Frequently Asked Questions
      </h1>
      <FAQAccordion />
    </div>
  );
}
