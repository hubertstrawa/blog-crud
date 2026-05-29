"use client";

import { updatePost } from "@/lib/actions/postActions";
import { useActionState } from "react";
import UpsertPostForm from "@/app/user/create-post/_components/upsertPostForm";
import { Post } from "@/lib/types/modelTypes";

type Props = {
  post: Post;
};

const UpdatePostPageContainer = ({ post }: Props) => {
  console.log({ post });
  const [state, action] = useActionState(updatePost, {
    data: {
      title: post.title,
      content: post.content,
      tags: post.tags?.map((tag) => tag.name).join(","),
      published: post.published,
      postId: post.id,
      previousThumbnailUrl: post.thumbnail ?? undefined,
    },
  });
  return <UpsertPostForm state={state} formAction={action} />;
};

export default UpdatePostPageContainer;
