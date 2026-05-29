import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

type Props = {
  postId: number;
};
const PostActions = ({ postId }: Props) => {
  return (
    <div className="flex justify-center items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              className="flex items-center justify-center size-9 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-900 hover:text-white transition-colors"
              href={`/user/posts/${postId}/update`}
            >
              <PencilIcon className="w-4" />
            </Link>
          </TooltipTrigger>
          <TooltipContent className="bg-yellow-700 text-white">
            <p>Edit This Post</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              className="flex items-center justify-center size-9 rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
              href={`/user/posts/${postId}/delete`}
            >
              <TrashIcon className="w-4" />
            </Link>
          </TooltipTrigger>
          <TooltipContent className="bg-red-500 text-white">
            <p>Delete This Post</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default PostActions;
