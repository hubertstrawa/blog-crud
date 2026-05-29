import { Post } from "@/lib/types/modelTypes";
import Image from "next/image";
import Link from "next/link";

type Props = Partial<Post>;
const PostCard = ({
  id,
  title,
  slug,
  thumbnail,
  content,
  createdAt,
}: Props) => {
  return (
    <div className="group bg-white rounded-2xl ring-1 ring-black/5 shadow-sm overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative h-56 overflow-hidden">
        <Image
          src={thumbnail ?? "/no-image.png"}
          alt={title ?? ""}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
          {new Date(createdAt ?? "").toLocaleDateString()}
        </p>
        <h3 className="text-lg font-semibold mt-2 break-words text-gray-900 leading-snug">
          {title}
        </h3>
        <p className="mt-3 text-sm text-gray-500 break-words leading-relaxed">
          {content?.slice(0, 100)}...
        </p>
        <Link
          className="mt-auto pt-5 inline-flex items-center gap-1 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
          href={`/blog/${slug}/${id}`}
        >
          Read more
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
            &rarr;
          </span>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
