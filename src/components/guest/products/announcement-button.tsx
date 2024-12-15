"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import AnnouncementModal from "./announcement-modal";

interface AnnouncementButtonProps {
  className?: string;
}

export default function AnnouncementButton({
  className,
}: AnnouncementButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)} className={className}>
        Poster une annonce
      </Button>
      <AnnouncementModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
