import { Post } from "@/lib/types/modelTypes";
import { CheckIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import PostActions from "./postActions";
type Props = {
  post: Post;
};
const PostListItem = ({ post }: Props) => {
  console.log(post);
  return (
    <div className="grid grid-cols-8 items-center rounded-xl overflow-hidden ring-1 ring-black/5 shadow-sm hover:shadow-md transition-all duration-200 text-center bg-white">
      <div className="relative w-full h-28">
        <Image
          src={post.thumbnail || "/no-image.png"}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-1 col-span-2 py-3 text-left">
        <p className="text-base font-medium line-clamp-1 px-3 text-gray-900">
          {post.title}
        </p>
        <p className="text-sm line-clamp-2 px-3 text-gray-500">
          {post.content}
        </p>
      </div>

      <p className="flex justify-center items-center text-sm text-gray-600">
        {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <div className="flex justify-center items-center">
        {post.published && <CheckIcon className="w-5 text-green-500" />}
      </div>
      <div className="flex justify-center items-center text-sm text-gray-600">
        {post._count.likes}
      </div>

      <div className="flex justify-center items-center text-sm text-gray-600">
        {post._count.comments}
      </div>
      <PostActions postId={post.id} />
    </div>
  );
};

export default PostListItem;
