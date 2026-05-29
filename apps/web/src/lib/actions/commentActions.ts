"use server";

import { authFetchGraphQL, fetchGraphQL } from "../fetchGraphQL";
import { CREATE_COMMENT_MUTATION, GET_POST_COMMENTS } from "../gqlQueries";
import { print } from "graphql";
import { CommentEntity } from "../types/modelTypes";
import { CreateCommentFormState } from "../types/formState";
import { CommentFormSchema } from "../zodSchemas/commentFormSchema";

export const getPostComments = async ({
  postId,
  skip = 0,
  take = 12,
}: {
  postId: number;
  skip?: number;
  take?: number;
}) => {
  const data = await fetchGraphQL(print(GET_POST_COMMENTS), {
    postId,
    skip,
    take,
  });

  return {
    comments: data.getPostComments as CommentEntity[],
    count: data.postCommentCount as number,
  };
};

export const saveComment = async (
  state: CreateCommentFormState,
  formData: FormData,
): Promise<CreateCommentFormState> => {
  const validatedData = CommentFormSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedData.success) {
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validatedData.error.flatten().fieldErrors,
    };
  }

  const data = await authFetchGraphQL(print(CREATE_COMMENT_MUTATION), {
    input: { ...validatedData.data },
  });

  if (data)
    return {
      message: "Success! Your comment has been saved.",
      ok: true,
      open: false,
    };

  return {
    message: "Something went wrong",
    data: Object.fromEntries(formData.entries()),
    ok: false,
    open: true,
  };
};
