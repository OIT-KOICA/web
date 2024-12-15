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
              <h2 key={index} className="text-2xl font-semibold mt-8 mb-4">
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
                  className="rounded-lg cursor-pointer"
                  onClick={() => setCurrentImage(section.content)}
                />
              </div>
            );
          case "video":
            return (
              <div key={index} className="my-8 aspect-w-16 aspect-h-9">
                <iframe
                  src={section.content}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-lg"
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
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <Image
            src={currentImage}
            alt="Full size image"
            width={1200}
            height={675}
            className="max-w-full max-h-full object-contain"
          />
        </motion.div>
      )}
    </div>
  );
}
