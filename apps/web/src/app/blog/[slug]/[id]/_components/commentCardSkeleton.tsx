import { Skeleton } from "@/components/ui/skeleton";

const CommentCardSkeleton = () => {
  return (
    <div className="rounded-xl bg-white ring-1 ring-black/5 p-4 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <Skeleton className="rounded-full size-9" />
        <Skeleton className="h-4 w-40" />
      </div>
      <Skeleton className="h-8 w-full max-w-md" />
    </div>
  );
};

export default CommentCardSkeleton;
