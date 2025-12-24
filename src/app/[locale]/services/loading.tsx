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

      {/* Search Section Skeleton */}
      <div className="bg-gray-50 py-10 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-10">
          <div className="mx-auto max-w-2xl">
            <Skeleton className="mb-4 h-12 w-full rounded-lg" />
            <div className="flex flex-wrap justify-center gap-2">
              {[...Array(7)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-20 rounded-full" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Service Skeleton */}
      <div className="py-16">
        <div className="container mx-auto px-4 md:px-10">
          <div className="mb-10">
            <Skeleton className="mb-2 h-8 w-40" />
            <Skeleton className="h-10 w-3/4" />
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <Skeleton className="h-[400px] w-full rounded-lg" />
            </div>
            <div className="lg:col-span-2">
              <Skeleton className="mb-3 h-5 w-32" />
              <Skeleton className="mb-4 h-8 w-full" />
              <Skeleton className="mb-2 h-4 w-full" />
              <Skeleton className="mb-2 h-4 w-full" />
              <Skeleton className="mb-6 h-4 w-3/4" />
              <div className="mb-6 flex items-center">
                <Skeleton className="mr-3 size-10 rounded-full" />
                <Skeleton className="h-5 w-32" />
              </div>
              <Skeleton className="h-10 w-40" />
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid Skeleton */}
      <div className="bg-gray-50 py-16 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-10">
          <div className="mb-10">
            <Skeleton className="mb-2 h-8 w-40" />
            <Skeleton className="h-10 w-3/4" />
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-96 rounded-lg" />
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Skeleton className="h-10 w-40" />
          </div>
        </div>
      </div>
    </div>
  );
}
