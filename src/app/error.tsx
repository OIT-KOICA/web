"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-4xl font-bold">Oops! Something went wrong</h1>
      <p className="mb-8 text-xl text-muted-foreground">
        We apologize for the inconvenience. Our team has been notified and is
        working on a fix.
      </p>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
