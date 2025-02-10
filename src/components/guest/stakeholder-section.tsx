import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  Factory,
  Truck,
  Building2,
  Store,
  Landmark,
} from "lucide-react";
import React from "react";

const stakeholders = [
  {
    title: "Producteurs",
    description: "Agriculteurs et producteurs agricoles primaires",
    icon: Users,
  },
  {
    title: "Transformateurs",
    description: "Entreprises à valeur ajoutée dans la chaîne agricole",
    icon: Factory,
  },
  {
    title: "Collecteurs",
    description: "Agrégateurs de produits agricoles",
    icon: Truck,
  },
  {
    title: "Grossistes",
    description: "Acheteurs et distributeurs en gros",
    icon: Building2,
  },
  {
    title: "Détaillants",
    description: "Point de vente final aux consommateurs",
    icon: Store,
  },
  {
    title: "Acteurs externes",
    description: "Institutions financières, organismes gouvernementaux et ONG",
    icon: Landmark,
  },
];

export default function StakeholderSection() {
  return (
    <section className="container mx-auto px-6">
      <h2 className="text-gradient mb-8 text-center text-3xl font-bold">
        Principaux acteurs
      </h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {stakeholders.map((stakeholder, index) => (
          <Card key={index} className="flex flex-col items-center text-center">
            <CardHeader>
              <div className="mb-4 flex justify-center rounded-full bg-primary/10 p-3">
                {React.createElement(stakeholder.icon, {
                  size: 24,
                  className: "text-primary",
                })}
              </div>
              <CardTitle>{stakeholder.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{stakeholder.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
