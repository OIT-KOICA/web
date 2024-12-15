import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <Loader2 className="mx-auto mb-4 size-16 animate-spin text-primary" />
        <h2 className="text-2xl font-semibold">Loading...</h2>
        <p className="text-muted-foreground">
          Please wait while we fetch the content for you.
        </p>
      </div>
    </div>
  );
}
