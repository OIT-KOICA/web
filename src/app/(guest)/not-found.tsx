import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function GuestNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mb-8 text-xl text-muted-foreground">
        We&apos;re sorry, but the page you&apos;re looking for cannot be found.
      </p>
      <Button asChild>
        <Link href="/">Return to Home</Link>
      </Button>
    </div>
  );
}
