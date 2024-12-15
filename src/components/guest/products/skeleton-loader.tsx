import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonLoader() {
  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-4">
        <Skeleton className="size-24 rounded-lg" />
        <Skeleton className="h-10 w-40" />
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <div className="grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <Skeleton className="mb-2 h-4 w-1/2" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-8 w-1/2" />
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-20 w-full" />
            ))}
          </div>
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    </div>
  );
}
