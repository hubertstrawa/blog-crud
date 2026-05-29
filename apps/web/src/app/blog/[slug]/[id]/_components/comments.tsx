"use client";
import { getPostComments } from "@/lib/actions/commentActions";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { comment } from "postcss";
import { useState } from "react";
import CommentPagination from "./commentPagination";
import CommentCardSkeleton from "./commentCardSkeleton";
import { SessionUser } from "@/lib/session";
import CommentCard from "./commentCard";
import AddComment from "./addComment";
// import AddComment from "./addComment";
type Props = {
  postId: number;
  user?: SessionUser;
};

const Comments = ({ postId, user }: Props) => {
  const [page, setPage] = useState(1);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["GET_POST_COMMENTS", postId, page],
    queryFn: async () =>
      await getPostComments({
        postId,
        skip: (page - 1) * DEFAULT_PAGE_SIZE,
        take: DEFAULT_PAGE_SIZE,
      }),
  });

  const totalPages = Math.ceil((data?.count ?? 0) / DEFAULT_PAGE_SIZE);

  return (
    <div className="mt-10 rounded-2xl bg-gray-50 ring-1 ring-black/5 p-6">
      {/* <button onClick={() => refetch()}></button> */}
      <div className="flex items-center justify-between mb-5">
        <h6 className="text-xl font-semibold tracking-tight text-gray-900">
          Comments
        </h6>
        {!!user && <AddComment user={user} postId={postId} refetch={refetch} />}
      </div>
      <div className="flex flex-col gap-3">
        {isLoading
          ? Array.from({ length: DEFAULT_PAGE_SIZE }).map((_, index) => (
              <CommentCardSkeleton key={index} />
            ))
          : data?.comments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
      </div>
      <CommentPagination
        className="mt-6"
        currentPage={page}
        setCurrentPage={(p) => setPage(p)}
        totalPages={totalPages}
      />
    </div>
  );
};

export default Comments;
