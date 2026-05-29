import { fetchPostById } from "@/lib/actions/postActions";
import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";
import Comments from "./_components/comments";
import { getSession } from "@/lib/session";
import Like from "./_components/like";

type Props = {
  params: {
    id: string;
  };
};
const PostPage = async ({ params }: Props) => {
  const postId = (await params).id;
  const post = await fetchPostById(+postId);
  const session = await getSession();

  return (
    <main className="mx-auto max-w-3xl px-6 py-12 mt-16">
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 leading-tight">
          {post.title}
        </h1>
        <p className="text-gray-500 text-sm mt-4">
          By <span className="font-medium text-gray-700">{post.author.name}</span>{" "}
          &middot; {new Date(post.createdAt).toLocaleDateString()}
        </p>
      </header>

      <div className="relative w-full aspect-[16/9] mb-10">
        <Image
          loading="eager"
          src={post.thumbnail ?? "/no-image.png"}
          alt={post.title}
          fill
          className="rounded-2xl object-cover ring-1 ring-black/5 shadow-sm"
        />
      </div>

      <article
        className="text-lg leading-relaxed text-gray-700 [&>p]:mb-5 [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:text-gray-900 [&>h2]:mt-8 [&>h2]:mb-3 [&_a]:text-blue-600 [&_a]:underline"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
      />

      <div className="mt-10 border-t border-gray-100 pt-6">
        <Like postId={post.id} user={session?.user} />
      </div>
      <Comments postId={post.id} user={session?.user} />
    </main>
  );
};

export default PostPage;
