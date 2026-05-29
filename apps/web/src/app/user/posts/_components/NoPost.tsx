import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PencilSquareIcon } from "@heroicons/react/20/solid";

const NoPost = () => {
  return (
    <div className="mt-32 flex flex-col items-center gap-4">
      <div className="flex size-16 items-center justify-center rounded-2xl bg-gray-100">
        <PencilSquareIcon className="w-7 text-gray-400" />
      </div>
      <p className="text-center text-3xl font-semibold tracking-tight text-gray-900">
        No posts yet
      </p>
      <p className="text-center text-gray-500 max-w-sm">
        Share your first story with the community.
      </p>
      <Button asChild className="mt-2">
        <Link
          className="flex items-center justify-center"
          href="/user/create-post"
        >
          <span>
            <PencilSquareIcon className="w-4" />
          </span>
          <span>Create New Post</span>
        </Link>
      </Button>
    </div>
  );
};

export default NoPost;
