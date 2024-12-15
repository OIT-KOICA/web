import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const blogPosts = [
  {
    title: "Maximizing Cassava Yield",
    excerpt: "Learn the best practices for increasing your cassava production.",
    category: "Cassava",
    color: "bg-yellow-100 dark:bg-yellow-900",
  },
  {
    title: "Sustainable Maize Farming",
    excerpt: "Discover eco-friendly techniques for maize cultivation.",
    category: "Maize",
    color: "bg-green-100 dark:bg-green-900",
  },
  {
    title: "Poultry Health Management",
    excerpt: "Essential tips for maintaining the health of your poultry.",
    category: "Poultry",
    color: "bg-blue-100 dark:bg-blue-900",
  },
];

export default function BlogSection() {
  return (
    <section className="container mx-auto px-4">
      <h2 className="mb-8 text-center text-3xl font-bold">
        Latest from Our Blog
      </h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {blogPosts.map((post, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className={`${post.color} p-4`}>
              <CardTitle className="text-lg">{post.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-muted-foreground">{post.excerpt}</p>
            </CardContent>
            <CardFooter className="p-4">
              <Link href="#" className="text-primary hover:underline">
                Read more
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
