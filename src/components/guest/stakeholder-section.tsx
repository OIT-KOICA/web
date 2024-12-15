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
    title: "Producers",
    description: "Farmers and primary agricultural producers",
    icon: Users,
  },
  {
    title: "Processors",
    description: "Value-adding businesses in the agricultural chain",
    icon: Factory,
  },
  {
    title: "Collectors",
    description: "Aggregators of agricultural products",
    icon: Truck,
  },
  {
    title: "Wholesalers",
    description: "Bulk buyers and distributors",
    icon: Building2,
  },
  {
    title: "Retailers",
    description: "Final point of sale to consumers",
    icon: Store,
  },
  {
    title: "External Actors",
    description: "Financial institutions, government bodies, and NGOs",
    icon: Landmark,
  },
];

export default function StakeholderSection() {
  return (
    <section className="container mx-auto px-6">
      <h2 className="mb-8 text-center text-3xl font-bold">Key Stakeholders</h2>
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
