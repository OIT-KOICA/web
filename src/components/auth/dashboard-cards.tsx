"use client";

import { motion } from "framer-motion";
import { Package, BookOpen, Megaphone, HelpCircle } from "lucide-react";
import DashboardCard from "./dashboard-card";

const cards = [
  {
    title: "Manage Your Products",
    description:
      "View the list of products you have created, add new ones, or update existing ones.",
    icon: Package,
    cta: "Go to My Products",
    href: "/dashboard/products",
  },
  {
    title: "Discover Useful Articles",
    description:
      "Read informative articles on value chains, funding opportunities, and tips for growing your business.",
    icon: BookOpen,
    cta: "Visit Blog",
    href: "/blog",
  },
  {
    title: "Post Your Needs",
    description:
      "Post announcements to find specific products or services tailored to your needs.",
    icon: Megaphone,
    cta: "Post an Announcement",
    href: "/dashboard/announcements",
  },
  {
    title: "Need Help?",
    description:
      "Check our FAQ or contact our team to get answers to your questions.",
    icon: HelpCircle,
    cta: "Get Help",
    href: "/faq",
  },
];

export default function DashboardCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <DashboardCard {...card} />
        </motion.div>
      ))}
    </div>
  );
}
