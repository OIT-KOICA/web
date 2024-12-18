"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ArticleBodyProps {
  content: {
    type: "paragraph" | "subheading" | "image" | "video";
    content: string;
  }[];
}

export default function ArticleBody({ content }: ArticleBodyProps) {
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  const closeModal = () => setCurrentImage(null);

  return (
    <div className="prose prose-lg max-w-none">
      {content.map((section, index) => {
        switch (section.type) {
          case "paragraph":
            return <p key={index}>{section.content}</p>;
          case "subheading":
            return (
              <h2 key={index} className="mb-4 mt-8 text-2xl font-semibold">
                {section.content}
              </h2>
            );
          case "image":
            return (
              <div key={index} className="my-8">
                <Image
                  src={section.content}
                  alt="Article image"
                  width={800}
                  height={450}
                  className="cursor-pointer rounded-lg"
                  onClick={() => setCurrentImage(section.content)}
                />
              </div>
            );
          case "video":
            return (
              // eslint-disable-next-line tailwindcss/no-custom-classname
              <div key={index} className="aspect-w-16 aspect-h-9 my-8">
                <iframe
                  src={section.content}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="size-full rounded-lg"
                ></iframe>
              </div>
            );
          default:
            return null;
        }
      })}
      {currentImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={closeModal}
        >
          <Image
            src={currentImage}
            alt="Full size image"
            width={1200}
            height={675}
            className="max-h-full max-w-full object-contain"
          />
        </motion.div>
      )}
    </div>
  );
}
