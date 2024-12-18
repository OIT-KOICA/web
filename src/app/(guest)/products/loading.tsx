import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="mb-8 h-10 w-48" />
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="w-full space-y-6 md:w-64">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-60 w-full" />
        </div>
        <div className="flex-1">
          <Skeleton className="mb-8 h-10 w-full" />
          <Skeleton className="mb-8 h-10 w-40" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
          <div className="mt-16">
            <Skeleton className="mb-4 h-8 w-48" />
            <div className="flex space-x-4 overflow-x-auto pb-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-40 w-64 shrink-0" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
