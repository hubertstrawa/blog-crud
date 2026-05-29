import { Post } from "@/lib/types/modelTypes";
import PostListItem from "@/app/user/posts/_components/PostListItem";
import Pagination from "@/components/pagination";

type Props = {
  posts: Post[];
  currentPage: number;
  totalPages: number;
};

const PostList = ({ posts, currentPage, totalPages }: Props) => {
  return (
    <div className="w-full max-w-5xl px-4">
      <h1 className="mb-6 text-3xl font-semibold tracking-tight text-gray-900">
        Your Posts
      </h1>
      <div className="grid grid-cols-8 rounded-xl bg-gray-50 ring-1 ring-black/5 px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-400">
        <div className="col-span-2"></div>
        <div></div>
        <div>Date</div>
        <div>Published</div>
        <div>Likes</div>
        <div>Comments</div>
        <div></div>
      </div>

      <div className="mt-3 flex flex-col gap-3">
        {posts.map((post) => (
          <PostListItem post={post} key={post.id} />
        ))}
      </div>

      <Pagination {...{ currentPage, totalPages }} className="my-8" />
    </div>
  );
};

export default PostList;
