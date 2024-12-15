"use client";

import { Facebook, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SocialShareButtonsProps {
  url: string;
  title: string;
}

export default function SocialShareButtons({
  url,
  title,
}: SocialShareButtonsProps) {
  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(title)}`,
      "_blank"
    );
  };

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
        url
      )}&title=${encodeURIComponent(title)}`,
      "_blank"
    );
  };

  return (
    <div className="flex space-x-4 my-8">
      <Button variant="outline" onClick={shareOnFacebook}>
        <Facebook className="w-5 h-5 mr-2" />
        Share
      </Button>
      <Button variant="outline" onClick={shareOnTwitter}>
        <Twitter className="w-5 h-5 mr-2" />
        Tweet
      </Button>
      <Button variant="outline" onClick={shareOnLinkedIn}>
        <Linkedin className="w-5 h-5 mr-2" />
        Share
      </Button>
    </div>
  );
}
