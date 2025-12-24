import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="animate-in fade-in-50">
      {/* Header Skeleton */}
      <div className="bg-blue-600 pb-16 pt-32 dark:bg-blue-900">
        <div className="container mx-auto px-4 md:px-10">
          <div className="mx-auto max-w-3xl">
            <Skeleton className="mb-3 h-8 w-32" />
            <Skeleton className="mb-4 h-12 w-full" />
            <div className="flex items-center">
              <Skeleton className="mr-3 size-10 rounded-full" />
              <Skeleton className="h-5 w-32" />
              <Skeleton className="ml-auto h-5 w-32" />
            </div>
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="py-16">
        <div className="container mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Skeleton className="mb-8 h-[400px] w-full rounded-lg" />

              <div className="mb-8 space-y-4">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-3/4" />
              </div>

              <div className="mb-8 space-y-4">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-2/3" />
              </div>

              <Skeleton className="mb-6 h-8 w-48" />

              <div className="mb-10 space-y-4">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-4/5" />
              </div>

              {/* Comments Section Skeleton */}
              <Skeleton className="mb-6 h-10 w-40" />

              <div className="mb-8 space-y-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex gap-4">
                    <Skeleton className="size-12 shrink-0 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </div>
                ))}
              </div>

              <Skeleton className="mb-4 h-10 w-full" />
              <Skeleton className="mb-4 h-32 w-full" />
              <Skeleton className="h-10 w-32" />
            </div>

            <div className="lg:col-span-1">
              <Skeleton className="mb-4 h-10 w-40" />
              <div className="mb-8 space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex gap-3">
                    <Skeleton className="size-20 shrink-0 rounded-lg" />
                    <div className="flex-1">
                      <Skeleton className="mb-2 h-5 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  </div>
                ))}
              </div>

              <Skeleton className="mb-4 h-10 w-40" />
              <div className="mb-8 space-y-2">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-8 w-full rounded-full" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
