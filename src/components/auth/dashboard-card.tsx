"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface DashboardCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  cta: string;
  href: string;
}

export default function DashboardCard({
  title,
  description,
  icon: Icon,
  cta,
  href,
}: DashboardCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="overflow-hidden bg-gradient-to-br from-cassava-50 to-maize-50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:from-cassava-900 dark:to-maize-900"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <motion.div
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <Icon className="mr-2 size-8 text-primary" />
          </motion.div>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full bg-gradient-to-r from-cassava-500 to-maize-500 text-white hover:from-cassava-600 hover:to-maize-600">
          <Link href={href}>{cta}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
