"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";;
import useProductStore from "@/lib/stores/product-store";
import { format } from "date-fns";
import { Message } from "@/lib/type";

const MESSAGES_PER_PAGE = 20;

export default function MessageScroller() {
  const { ref, inView } = useInView();
  const [displayedMessages, setDisplayedMessages] = useState<Message[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const discussion = useProductStore((state) => state.activeDiscussion);

  useEffect(() => {
    if (discussion && discussion.messages) {
      const startIndex = Math.max(
        discussion.messages.length - currentPage * MESSAGES_PER_PAGE,
        0
      );
      const endIndex = discussion.messages.length;
      setDisplayedMessages(discussion.messages.slice(startIndex, endIndex));
    }
  }, [currentPage, discussion]);

  useEffect(() => {
    if (
      inView &&
      discussion &&
      discussion.messages &&
      displayedMessages.length < discussion.messages.length
    ) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }, [inView, displayedMessages, discussion]);

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [displayedMessages]);

  return (
    <ScrollArea className="grow" ref={scrollAreaRef}>
      {discussion && displayedMessages.length < (discussion.messages.length ?? 0) && (
        <div ref={ref} className="flex justify-center p-2">
          Charger plus
        </div>
      )}
      <div className="space-y-4">
        {displayedMessages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.senderType === "SELLER" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex max-w-[70%] items-start space-x-2 ${
                message.senderType === "SELLER"
                  ? "flex-row-reverse space-x-reverse"
                  : ""
              }`}
            >
              <Avatar>
                <AvatarFallback>
                  {message.senderType === "SELLER" ? "V" : "C"}
                </AvatarFallback>
              </Avatar>
              <div
                className={`rounded-lg p-3 ${
                  message.senderType === "SELLER"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p>{message.content}</p>
                <p className="mt-1 text-xs opacity-70">
                  {format(message.createdAt, "MMM d, h:mm a")}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
