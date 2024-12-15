"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Facebook, Linkedin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const contactInfo = [
  {
    icon: MapPin,
    title: "Address",
    content: "123 Cassava Street, Yaounde, Cameroon",
  },
  {
    icon: Phone,
    title: "Phone",
    content: "+237 123 456 789",
    subContent: "Mon-Fri: 9 AM - 6 PM",
  },
  {
    icon: Mail,
    title: "Email",
    content: "info@cassavamarketplace.com",
  },
];

const socialMedia = [
  { icon: Facebook, href: "https://facebook.com/cassavamarketplace" },
  { icon: Linkedin, href: "https://linkedin.com/company/cassavamarketplace" },
];

export default function ContactInfo() {
  return (
    <div className="space-y-6">
      {contactInfo.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card>
            <CardContent className="flex items-center p-6">
              <item.icon className="w-6 h-6 text-primary mr-4" />
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p>{item.content}</p>
                {item.subContent && (
                  <p className="text-sm text-muted-foreground">
                    {item.subContent}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
      <div className="flex justify-center space-x-4 mt-8">
        {socialMedia.map((item, index) => (
          <motion.a
            key={index}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <item.icon className="w-6 h-6" />
          </motion.a>
        ))}
      </div>
    </div>
  );
}
