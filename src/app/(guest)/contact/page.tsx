import ContactForm from "@/components/guest/contact/contact-form";
import ContactInfo from "@/components/guest/contact/contact-info";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nous contacter - Cassava Marketplace",
  description:
    "Contactez Cassava Marketplace pour toute demande de renseignements ou d'assistance.",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="mb-8 text-center text-4xl font-bold">Nous contacter</h1>
      <p className="mx-auto mb-12 max-w-2xl text-center text-lg">
        Vous avez des questions ou besoin d&apos;aide ? Contactez-nous en
        utilisant les ci-dessous ou en remplissant le formulaire, et nous vous
        répondrons dès que possible. dans les plus brefs délais.
      </p>
      <div className="grid gap-12 md:grid-cols-2">
        <ContactInfo />
        <ContactForm />
      </div>
    </div>
  );
}
