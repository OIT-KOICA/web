import { CheckCircle } from "lucide-react";

const values = [
  "Connecter efficacement l'offre et la demande",
  "Fournir des outils éducatifs aux parties prenantes",
  "Offrir des formations et des conseils juridiques",
  "Faciliter les connexions financières",
  "Soutenir les pratiques agricoles durables",
];

export default function ValueSection() {
  return (
    <section className="container mx-auto px-4">
      <h2 className="mb-8 text-center text-3xl font-bold">
        La valeur de notre plateforme
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
        <div className="rounded-lg bg-primary p-8 text-white dark:text-black">
          <h3 className="mb-4 text-2xl font-bold">
            Renforcer les entrepreneurs agricoles
          </h3>
          <p className="mb-4">
            Notre plateforme est conçue pour combler les lacunes de la chaîne de
            valeur agricole. de valeur agricole, en fournissant des outils et
            des connexions de prospérer sur les marchés du manioc, du maïs et de
            la volaille.
          </p>
          <p>
            En facilitant les connexions, en offrant des ressources éducatives
            et en soutenant des pratiques durables, nous construisons un monde
            plus fort. et en soutenant les pratiques durables, nous construisons
            un écosystème agricole plus fort et plus résilient, un écosystème
            agricole plus fort et plus résilient.
          </p>
        </div>
      </div>
    </section>
  );
}
