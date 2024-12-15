import { useState, useEffect } from "react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQCategory {
  id: string;
  title: string;
  questions: FAQItem[];
}

export function useFAQData() {
  const [faqData, setFaqData] = useState<FAQCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFAQData = async () => {
      try {
        // Simulating an API call with a delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // This is mock data. In a real application, you would fetch this from an API.
        const mockData: FAQCategory[] = [
          {
            id: "general",
            title: "General Questions",
            questions: [
              {
                id: "what-is-cassava-marketplace",
                question: "What is Cassava Marketplace?",
                answer:
                  "Cassava Marketplace is a platform that connects local entrepreneurs in cassava, maize, and poultry value chains with markets and suppliers. It aims to address the specific needs of local populations, taking into account technological constraints and usage habits.",
              },
              {
                id: "how-to-register",
                question: "How do I register on Cassava Marketplace?",
                answer:
                  'To register on Cassava Marketplace, click on the "Sign Up" button in the top right corner of the homepage. Fill out the registration form with your details, including your name, email address, and password. Once submitted, you\'ll receive a confirmation email to activate your account.',
              },
            ],
          },
          {
            id: "products",
            title: "Product Questions",
            questions: [
              {
                id: "product-listing",
                question: "How can I list my products on Cassava Marketplace?",
                answer:
                  'After logging into your account, navigate to your dashboard and click on "Add New Product". Fill out the product details form, including name, description, price, and quantity. You can also add images of your product. Once submitted, your product will be reviewed and listed on the marketplace.',
              },
              {
                id: "product-pricing",
                question: "How do I set prices for my products?",
                answer:
                  "When listing your product, you can set a base price. Additionally, you can add price variations based on quantity, urgency, or distance. This flexible pricing system allows you to cater to different customer needs and market conditions.",
              },
            ],
          },
          {
            id: "orders",
            title: "Order Questions",
            questions: [
              {
                id: "place-order",
                question: "How do I place an order?",
                answer:
                  'To place an order, browse the products and click on the one you\'re interested in. Select the quantity and any applicable options, then click "Add to Cart". When you\'re ready to checkout, review your cart and click "Proceed to Checkout". Follow the prompts to complete your purchase.',
              },
              {
                id: "track-order",
                question: "Can I track my order?",
                answer:
                  "Yes, you can track your order. Once your order is confirmed, you'll receive an order number. Log into your account and go to \"My Orders\" to see the status of your order. You'll be able to see when the order is processed, shipped, and delivered.",
              },
            ],
          },
        ];

        setFaqData(mockData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching FAQ data:", error);
        setIsLoading(false);
      }
    };

    fetchFAQData();
  }, []);

  return { faqData, isLoading };
}
