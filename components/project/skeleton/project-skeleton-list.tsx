import { Skeleton } from "@/components/ui/skeleton";

export const ProjectSkeletonList = () => {
  return (
    <div className="max-w-screen-xl mx-auto flex flex-col gap-4">
      <Skeleton className="h-14 w-64" />
      <Skeleton className="h-14 w-64" />
      <Skeleton className="h-14 w-64" />
      <Skeleton className="h-14 w-64" />
      <Skeleton className="h-14 w-64" />
      <Skeleton className="h-14 w-64" />
      <Skeleton className="h-14 w-64" />
    </div>
  );
};
