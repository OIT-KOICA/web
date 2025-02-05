import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité - Cassava Marketplace",
  description:
    "Découvrez comment Cassava Marketplace collecte, utilise et protège vos données personnelles.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto space-y-12 px-4 py-16">
      <h1 className="text-gradient mb-12 text-center text-4xl font-bold">
        Politique de confidentialité
      </h1>
      <section className="space-y-4">
        <h2 className="text-3xl font-semibold">Introduction</h2>
        <p>
          Chez Cassava Marketplace, nous prenons votre confidentialité très au
          sérieux. Cette politique explique comment nous collectons, utilisons
          et protégeons vos informations personnelles lorsque vous utilisez
          notre plateforme.
        </p>
      </section>
      <section className="space-y-4">
        <h2 className="text-3xl font-semibold">Données collectées</h2>
        <p>
          Nous collectons les types de données suivants pour vous offrir une
          meilleure expérience utilisateur :
        </p>
        <ul className="list-disc pl-6">
          <li>
            Informations d&apos;inscription : nom, adresse e-mail, téléphone.
          </li>
          <li>
            Données liées à votre entreprise : nom, localisation, type de
            service.
          </li>
          <li>Informations de paiement pour des transactions sécurisées.</li>
          <li>
            Données d&apos;utilisation : interactions avec la plateforme, pages
            visitées, clics.
          </li>
        </ul>
      </section>
      <section className="space-y-4">
        <h2 className="text-3xl font-semibold">Utilisation des données</h2>
        <p>Les informations collectées peuvent être utilisées pour :</p>
        <ul className="list-disc pl-6">
          <li>Améliorer nos services et votre expérience utilisateur.</li>
          <li>Assurer la sécurité des transactions.</li>
          <li>
            Personnaliser les recommandations en fonction de vos interactions.
          </li>
          <li>
            Communiquer avec vous à propos de mises à jour ou nouvelles
            fonctionnalités.
          </li>
        </ul>
      </section>
      <section className="space-y-4">
        <h2 className="text-3xl font-semibold">Partage des données</h2>
        <p>
          Nous ne partageons vos informations personnelles qu&apos;avec votre
          consentement ou lorsque cela est nécessaire pour :
        </p>
        <ul className="list-disc pl-6">
          <li>Respecter les lois en vigueur.</li>
          <li>
            Collaborer avec des prestataires de services pour améliorer la
            plateforme.
          </li>
          <li>
            Répondre à des obligations légales ou protéger nos droits légaux.
          </li>
        </ul>
      </section>
      <section className="space-y-4">
        <h2 className="text-3xl font-semibold">Protection des données</h2>
        <p>
          Nous utilisons des mesures techniques et organisationnelles pour
          protéger vos données, notamment :
        </p>
        <ul className="list-disc pl-6">
          <li>Chiffrement des données sensibles.</li>
          <li>Authentification à deux facteurs pour les comptes.</li>
          <li>
            Stockage des données sur des serveurs sécurisés avec accès limité.
          </li>
        </ul>
      </section>
      <section className="space-y-4">
        <h2 className="text-3xl font-semibold">Vos droits</h2>
        <p>
          Vous avez les droits suivants concernant vos données personnelles :
        </p>
        <ul className="list-disc pl-6">
          <li>Accéder à vos données et demander une copie.</li>
          <li>Corriger ou mettre à jour vos informations.</li>
          <li>Demander la suppression de vos données.</li>
          <li>
            Vous opposer à l&apos;utilisation de vos données pour certains
            traitements.
          </li>
        </ul>
      </section>
      <section className="space-y-4">
        <h2 className="text-3xl font-semibold">
          Modifications de cette politique
        </h2>
        <p>
          Nous pouvons mettre à jour cette politique de confidentialité de temps
          en temps. Toute modification sera communiquée via notre plateforme ou
          par e-mail.
        </p>
      </section>
      <section className="space-y-4">
        <h2 className="text-3xl font-semibold">Contact</h2>
        <p>
          Si vous avez des questions ou des préoccupations concernant notre
          politique de confidentialité, veuillez nous contacter à l&apos;adresse
          suivante :
        </p>
        <p>
          <strong>Email :</strong> support@cassavamarketplace.com
        </p>
        <p>
          <strong>Adresse :</strong> Cassava Marketplace, Région Centre,
          Cameroun.
        </p>
      </section>
    </div>
  );
}
