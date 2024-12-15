import { CheckCircle } from "lucide-react";

const values = [
  "Connect supply and demand efficiently",
  "Provide educational tools for stakeholders",
  "Offer training and legal advice",
  "Facilitate financial connections",
  "Support sustainable agricultural practices",
];

export default function ValueSection() {
  return (
    <section className="container mx-auto px-4">
      <h2 className="mb-8 text-center text-3xl font-bold">
        Our Platform&apos;s Value
      </h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-4">
          {values.map((value, index) => (
            <div key={index} className="flex items-start">
              <CheckCircle className="mr-2 mt-1 shrink-0 text-green-500" />
              <p>{value}</p>
            </div>
          ))}
        </div>
        <div className="rounded-lg bg-gradient-to-r from-primary to-primary-foreground p-8 text-white">
          <h3 className="mb-4 text-2xl font-bold">
            Empowering Agricultural Entrepreneurs
          </h3>
          <p className="mb-4">
            Our platform is designed to bridge gaps in the agricultural value
            chain, providing tools and connections that empower local
            entrepreneurs to thrive in the cassava, maize, and poultry markets.
          </p>
          <p>
            By facilitating connections, offering educational resources, and
            supporting sustainable practices, we&apos;re building a stronger,
            more resilient agricultural ecosystem.
          </p>
        </div>
      </div>
    </section>
  );
}
