"use client";
import { getPostLikeData, likePost, unlikePost } from "@/lib/actions/like";
import { SessionUser } from "@/lib/session";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/20/solid";
import { useMutation, useQuery } from "@tanstack/react-query";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
type Props = {
  postId: number;
  user?: SessionUser;
};

const Like = ({ postId, user }: Props) => {
  const { data, refetch: refetchLikeData } = useQuery({
    queryKey: ["GET_POST_LIKE_DATA", postId],
    queryFn: async () => await getPostLikeData(postId),
  });

  const likeMutation = useMutation({
    mutationFn: async () => await likePost(postId),
    onSuccess: () => {
      refetchLikeData();
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: async () => await unlikePost(postId),
    onSuccess: () => {
      refetchLikeData();
    },
  });

  return (
    <div className="flex items-center justify-start">
      {data?.userLikedPost ? (
        <button
          onClick={() => unlikeMutation.mutate()}
          className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-4 py-2 text-sm font-medium text-rose-600 transition-colors hover:bg-rose-100"
        >
          <HeartIconSolid className="w-5 text-rose-500" />
          <span>{data?.likesCount} likes</span>
        </button>
      ) : (
        <button
          onClick={() => likeMutation.mutate()}
          className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          <HeartIconOutline className="w-5" />
          <span>{data?.likesCount} likes</span>
        </button>
      )}
    </div>
  );
};

export default Like;
