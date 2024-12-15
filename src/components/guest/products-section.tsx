import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const products = [
  {
    name: "Cassava",
    description:
      "A versatile root crop with various industrial and food applications.",
    image: "/cassava.jpg",
  },
  {
    name: "Maize",
    description:
      "A staple grain crop used for both human consumption and animal feed.",
    image: "/maize.jpg",
  },
  {
    name: "Poultry",
    description:
      "Including chickens and eggs, a vital protein source in many diets.",
    image: "/poultry.jpg",
  },
];

export default function ProductsSection() {
  return (
    <section className="container mx-auto px-6">
      <h2 className="mb-8 text-center text-3xl font-bold">Our Value Chains</h2>
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
