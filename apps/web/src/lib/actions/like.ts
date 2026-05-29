"use server";

import { authFetchGraphQL } from "../fetchGraphQL";
import { print } from "graphql";
import {
  LIKE_POST_MUTATION,
  POST_LIKES,
  UNLIKE_POST_MUTATION,
} from "../gqlQueries";

export const getPostLikeData = async (postId: number) => {
  const data = await authFetchGraphQL(print(POST_LIKES), { postId });
  return {
    likesCount: data.postLikesCount as number,
    userLikedPost: data.userLikedPost as boolean,
  };
};

export const likePost = async (postId: number) => {
  const data = await authFetchGraphQL(print(LIKE_POST_MUTATION), { postId });
  return data;
};

export const unlikePost = async (postId: number) => {
  const data = await authFetchGraphQL(print(UNLIKE_POST_MUTATION), { postId });
  return data;
};
