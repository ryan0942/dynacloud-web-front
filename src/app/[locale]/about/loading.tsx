import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="animate-in fade-in-50">
      {/* Header Skeleton */}
      <div className="bg-blue-600 pb-16 pt-32 dark:bg-blue-900">
        <div className="container mx-auto px-4 md:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <Skeleton className="mx-auto mb-4 h-12 w-3/4" />
            <Skeleton className="mx-auto h-6 w-1/2" />
          </div>
        </div>
      </div>

      {/* Company Overview Skeleton */}
      <div className="py-20">
        <div className="container mx-auto px-4 md:px-10">
          <div className="flex flex-col items-center gap-12 md:flex-row">
            <div className="md:w-1/2">
              <Skeleton className="mb-2 h-8 w-40" />
              <Skeleton className="mb-6 h-10 w-3/4" />
              <Skeleton className="mb-3 h-4 w-full" />
              <Skeleton className="mb-3 h-4 w-full" />
              <Skeleton className="mb-6 h-4 w-3/4" />
              <Skeleton className="mb-3 h-4 w-full" />
              <Skeleton className="mb-3 h-4 w-full" />
              <Skeleton className="mb-8 h-4 w-2/3" />
              <div className="flex gap-4">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
            <div className="md:w-1/2">
              <Skeleton className="h-80 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision Skeleton */}
      <div className="bg-gray-50 py-20 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-10">
          <div className="mb-10 text-center">
            <Skeleton className="mx-auto mb-2 h-8 w-40" />
            <Skeleton className="mx-auto h-10 w-1/2" />
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Skeleton className="h-64 rounded-lg" />
            <Skeleton className="h-64 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Team Section Skeleton */}
      <div className="py-20">
        <div className="container mx-auto px-4 md:px-10">
          <div className="mb-10 text-center">
            <Skeleton className="mx-auto mb-2 h-8 w-40" />
            <Skeleton className="mx-auto h-10 w-1/2" />
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-80 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
