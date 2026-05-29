import { Post } from "@/lib/types/modelTypes";
import PostCard from "./postcard";
import Pagination from "./pagination";

type Props = {
  posts: Post[];
  currentPage: number;
  totalPages: number;
};
const Posts = (props: Props) => {
  return (
    <section className="container px-6 py-20 max-w-6xl mx-auto">
      <div className="mb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900">
          Latest Posts
        </h2>
        <p className="mt-3 text-lg text-gray-500">
          Fresh stories and ideas, hand-picked for you.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {props.posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
      <Pagination
        className="mt-12"
        currentPage={props.currentPage}
        totalPages={props.totalPages}
      />
    </section>
  );
};

export default Posts;
