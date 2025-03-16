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
            title: "Questions générales",
            questions: [
              {
                id: "what-is-cassava-marketplace",
                question: "Qu'est-ce que Cassava Marketplace ?",
                answer:
                  "Cassava Marketplace est une plateforme qui relie les entrepreneurs locaux des chaînes de valeur du manioc, du maïs et de la volaille aux marchés et aux fournisseurs. Elle vise à répondre aux besoins spécifiques des populations locales, en tenant compte des contraintes technologiques et des habitudes d'utilisation.",
              },
              {
                id: "how-to-register",
                question: "Comment s'inscrire sur Cassava Marketplace ?",
                answer:
                  "Pour s'inscrire sur Cassava Marketplace, Cliquez sur le bouton « S'inscrire » dans le coin supérieur droit de la page d'accueil. Remplissez le formulaire d'inscription avec vos coordonnées, notamment votre nom, votre adresse électronique et votre mot de passe. Une fois le formulaire envoyé, vous recevrez un courriel de confirmation pour activer votre compte.",
              },
            ],
          },
          {
            id: "products",
            title: "Questions sur les produits",
            questions: [
              {
                id: "product-listing",
                question:
                  "Comment puis-je faire figurer mes produits sur Cassava Marketplace ?",
                answer:
                  "Après vous être connecté à votre compte, accédez à votre tableau de bord et cliquez sur « Ajouter un nouveau produit ». Remplissez le formulaire des détails du produit, y compris le nom, la description, le prix et la quantité. Vous pouvez également ajouter des images de votre produit. Une fois soumis, votre produit sera examiné et inscrit sur la place de marché.",
              },
              {
                id: "product-pricing",
                question: "Comment fixer les prix de mes produits ?",
                answer:
                  "Lors de l'inscription de votre produit, vous pouvez fixer un prix de base. En outre, vous pouvez ajouter des variations de prix en fonction de la quantité, de l'urgence ou de la distance. Ce système de tarification flexible vous permet de répondre aux différents besoins des clients et aux conditions du marché.",
              },
            ],
          },
          {
            id: "orders",
            title: "Questions relatives à la commande",
            questions: [
              {
                id: "place-order",
                question: "Comment passer une commande ?",
                answer:
                  "Pour passer une commande, parcourez les produits et cliquez sur celui qui vous intéresse. Sélectionnez la quantité et les options applicables, puis cliquez sur « Consulter ». Lorsque vous êtes prêt à passer à la caisse, vérifiez votre panier et cliquez sur « Passer à la caisse ». Suivez les instructions pour terminer votre achat.",
              },
            ],
          },
        ];

        setFaqData(mockData);
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        setIsLoading(false);
      }
    };

    fetchFAQData();
  }, []);

  return { faqData, isLoading };
}
