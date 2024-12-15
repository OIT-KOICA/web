import ContactForm from "@/components/guest/contact/contact-form";
import ContactInfo from "@/components/guest/contact/contact-info";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Cassava Marketplace",
  description:
    "Get in touch with Cassava Marketplace for inquiries or support.",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
      <p className="text-center text-lg mb-12 max-w-2xl mx-auto">
        Have questions or need assistance? Reach out to us using the contact
        information below or fill out the form, and we'll get back to you as
        soon as possible.
      </p>
      <div className="grid md:grid-cols-2 gap-12">
        <ContactInfo />
        <ContactForm />
      </div>
    </div>
  );
}
