"use server";

import { authFetchGraphQL, fetchGraphQL } from "../fetchGraphQL";
import {
  CREATE_POST_MUTATION,
  DELETE_POST_MUTATION,
  GET_POST_BY_ID,
  GET_POSTS,
  GET_USER_POSTS,
  UPDATE_POST_MUTATION,
} from "../gqlQueries";
import { print } from "graphql";
import { Post } from "../types/modelTypes";
import { transformTakeSkip } from "../helpers";
import { PostFormState } from "../types/formState";
import { PostFormSchema } from "../zodSchemas/postFormSchema";
import { uploadThumbnail } from "../upload";

export const getPosts = async ({
  page = 1,
  pageSize = 12,
}: {
  page?: number;
  pageSize?: number;
}) => {
  const { skip, take } = transformTakeSkip({ page, pageSize });
  const data = await fetchGraphQL(print(GET_POSTS), { skip, take });
  return { posts: data.myposts as Post[], totalPosts: data.postCount };
};

export const fetchPostById = async (id: number) => {
  const data = await fetchGraphQL(print(GET_POST_BY_ID), { id });
  return data.getPostById as Post;
};

export const fetchUserPosts = async ({
  page = 1,
  pageSize = 12,
}: {
  page?: number;
  pageSize?: number;
}) => {
  const { skip, take } = transformTakeSkip({ page, pageSize });
  const data = await authFetchGraphQL(print(GET_USER_POSTS), { skip, take });
  return {
    posts: data.getUserPosts as Post[],
    totalPosts: data.userPostCount as number,
  };
};

export async function saveNewPost(
  state: PostFormState,
  formData: FormData,
): Promise<PostFormState> {
  const validatedData = PostFormSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );
  {
    if (!validatedData.success) {
      return {
        data: Object.fromEntries(formData.entries()),
        errors: validatedData.error.flatten().fieldErrors,
      };
    }

    console.log({
      thumb: validatedData.data.thumbnail,
      thumb2: formData.get("thumbnail"),
    });
    let thumbnailUrl = "";
    if (validatedData.data.thumbnail) {
      thumbnailUrl = await uploadThumbnail(formData.get("thumbnail") as File);
    }

    const { title, content, tags, published } = validatedData.data;

    const data = await authFetchGraphQL(print(CREATE_POST_MUTATION), {
      input: { title, content, tags, published, thumbnail: thumbnailUrl },
    });

    if (data) {
      return {
        message: "Success! Your post has been saved.",
        ok: true,
      };
    }

    return {
      message: "Something went wrong",
      ok: false,
      data: Object.fromEntries(formData.entries()),
    };
  }
}

export async function updatePost(
  state: PostFormState,
  formData: FormData,
): Promise<PostFormState> {
  const validatedData = PostFormSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedData.success) {
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validatedData.error.flatten().fieldErrors,
    };
  }

  // const postId = formData.get("postId") as string;

  const { thumbnail, ...inputs } = validatedData.data;

  let thumbnailUrl = "";
  if (thumbnail !== undefined) {
    thumbnailUrl = await uploadThumbnail(formData.get("thumbnail") as File);
  }

  const data = await authFetchGraphQL(print(UPDATE_POST_MUTATION), {
    input: { ...inputs, ...(thumbnailUrl && { thumbnail: thumbnailUrl }) },
  });

  // Todo: check if thumbnail is changed

  if (data) {
    return {
      message: "Success! Your post has been updated.",
      ok: true,
    };
  }

  return {
    message: "Something went wrong",
    ok: false,
    data: Object.fromEntries(formData.entries()),
  };
}

export async function deletePost(postId: number) {
  const data = await authFetchGraphQL(print(DELETE_POST_MUTATION), { postId });
  return data.deletePost;
}
