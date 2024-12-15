import { Skeleton } from "@/components/ui/skeleton";

export default function GuestLoading() {
  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section Skeleton */}
      <div className="relative flex h-[600px] items-center justify-center overflow-hidden bg-muted">
        <div className="mx-auto max-w-2xl space-y-6 px-4 text-center">
          <Skeleton className="mx-auto h-12 w-3/4" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="mx-auto h-6 w-5/6" />
          <div className="flex justify-center space-x-4">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </div>

      {/* Products Section Skeleton */}
      <div className="container mx-auto px-6">
        <Skeleton className="mx-auto mb-8 h-10 w-64" />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="space-y-4">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          ))}
        </div>
      </div>

      {/* Stakeholders Section Skeleton */}
      <div className="container mx-auto px-6">
        <Skeleton className="mx-auto mb-8 h-10 w-64" />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <Skeleton className="mb-4 size-16 rounded-full" />
              <Skeleton className="mb-2 h-6 w-1/2" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </div>
      </div>

      {/* Blog Section Skeleton */}
      <div className="container mx-auto px-6">
        <Skeleton className="mx-auto mb-8 h-10 w-64" />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="space-y-4">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          ))}
        </div>
      </div>

      {/* Value Section Skeleton */}
      <div className="container mx-auto px-6">
        <Skeleton className="mx-auto mb-8 h-10 w-64" />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex items-start">
                <Skeleton className="mr-2 mt-1 size-6 shrink-0" />
                <Skeleton className="h-6 w-full" />
              </div>
            ))}
          </div>
          <Skeleton className="h-64 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}
