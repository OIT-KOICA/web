import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const products = [
  {
    name: "Manioc",
    description:
      "Une plante-racine polyvalente avec diverses applications industrielles et alimentaires.",
    image: "/images/cassava.jpg",
  },
  {
    name: "Maïs",
    description:
      "C'est une culture céréalière de base utilisée à la fois pour la consommation humaine et l'alimentation animale.",
    image: "/images/maize.jpg",
  },
  {
    name: "Voilaille",
    description:
      "Y compris les poulets et les œufs, qui constituent une source de protéines essentielle dans de nombreux régimes alimentaires.",
    image: "/images/poultry.jpg",
  },
];

export default function ProductsSection() {
  return (
    <section className="container mx-auto px-6">
      <h2 className="mb-8 text-center text-3xl font-bold">
        Nos chaînes de valeur
      </h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {products.map((product) => (
          <Card key={product.name} className="overflow-hidden">
            <CardHeader className="p-0">
              <div className="relative h-48">
                <Image
                  src={product.image}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <CardTitle className="mb-2">{product.name}</CardTitle>
              <p className="text-muted-foreground">{product.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
