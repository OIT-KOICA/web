import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions d'utilisation - Cassava Marketplace",
  description:
    "Lisez nos conditions d'utilisation pour comprendre les règles et politiques de Cassava Marketplace.",
};

export default function TermsAndConditionsPage() {
  return (
    <div className="container mx-auto space-y-24 px-4 py-16">
      <h1 className="text-gradient mb-12 text-center text-4xl font-bold">
        Conditions d&apos;utilisation
      </h1>

      <section className="space-y-8">
        <h2 className="text-3xl font-semibold">1. Introduction</h2>
        <p className="text-gray-600">
          Bienvenue sur Cassava Marketplace. En accédant à notre plateforme,
          vous acceptez les conditions d&apos;utilisation suivantes. Veuillez
          les lire attentivement.
        </p>
      </section>

      <section className="space-y-8">
        <h2 className="text-3xl font-semibold">2. Utilisation acceptable</h2>
        <ul className="list-disc space-y-4 pl-8">
          <li className="text-gray-600">
            Vous vous engagez à utiliser notre plateforme uniquement dans un but
            légal et conforme à nos politiques.
          </li>
          <li className="text-gray-600">
            Il est interdit de publier ou de transmettre des contenus nuisibles,
            diffamatoires, ou illégaux.
          </li>
          <li className="text-gray-600">
            Toute tentative d&apos;exploitation ou d&apos;altération de la
            plateforme est strictement interdite.
          </li>
        </ul>
      </section>

      <section className="space-y-8">
        <h2 className="text-3xl font-semibold">
          3. Droits de propriété intellectuelle
        </h2>
        <p className="text-gray-600">
          Tous les contenus, y compris les textes, images et designs, sont la
          propriété de Cassava Marketplace ou de ses partenaires. Leur
          reproduction sans autorisation est interdite.
        </p>
      </section>

      <section className="space-y-8">
        <h2 className="text-3xl font-semibold">
          4. Limitation de responsabilité
        </h2>
        <p className="text-gray-600">
          Cassava Marketplace n&apos;est pas responsable des pertes ou dommages
          directs ou indirects résultant de l&apos;utilisation de notre
          plateforme.
        </p>
      </section>

      <section className="space-y-8">
        <h2 className="text-3xl font-semibold">
          5. Modifications des conditions
        </h2>
        <p className="text-gray-600">
          Nous nous réservons le droit de modifier ces conditions
          d&apos;utilisation à tout moment. Les utilisateurs seront informés de
          tout changement important.
        </p>
      </section>

      <section className="space-y-8">
        <h2 className="text-3xl font-semibold">6. Contact</h2>
        <p className="text-gray-600">
          Si vous avez des questions concernant ces conditions
          d&apos;utilisation, veuillez nous contacter à{" "}
          <a
            href="mailto:support@cassavamarketplace.com"
            className="text-primary hover:underline"
          >
            support@cassavamarketplace.com
          </a>
          .
        </p>
      </section>
    </div>
  );
}
