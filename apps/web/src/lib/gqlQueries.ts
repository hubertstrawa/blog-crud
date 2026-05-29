import gql from "graphql-tag";

export const GET_POSTS = gql`
  query myposts($skip: Float, $take: Float) {
    myposts(skip: $skip, take: $take) {
      id
      title
      thumbnail
      content
      createdAt
      slug
    }
    postCount
  }
`;

export const GET_POST_BY_ID = gql`
  query getPostById($id: Int!) {
    getPostById(id: $id) {
      id
      title
      thumbnail
      content
      published
      createdAt
      slug
      author {
        name
      }
      tags {
        name
      }
    }
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(createUserInput: $input) {
      id
    }
  }
`;

export const SIGN_IN_MUTATION = gql`
  mutation signIn($input: SignInInput!) {
    signIn(signInInput: $input) {
      id
      name
      avatar
      accessToken
    }
  }
`;

export const GET_POST_COMMENTS = gql`
  query getPostComments($postId: Int!, $skip: Int, $take: Int) {
    getPostComments(postId: $postId, skip: $skip, take: $take) {
      id
      content
      createdAt
      author {
        name
        avatar
      }
    }
    postCommentCount(postId: $postId)
  }
`;

export const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($input: CreateCommentInput!) {
    createComment(createCommentInput: $input) {
      id
    }
  }
`;

export const POST_LIKES = gql`
  query PostLikeData($postId: Int!) {
    postLikesCount(postId: $postId)
    userLikedPost(postId: $postId)
  }
`;

export const LIKE_POST_MUTATION = gql`
  mutation LikePost($postId: Int!) {
    likePost(postId: $postId)
  }
`;

export const UNLIKE_POST_MUTATION = gql`
  mutation UnlikePost($postId: Int!) {
    unlikePost(postId: $postId)
  }
`;

export const GET_USER_POSTS = gql`
  query GetUserPosts($skip: Int, $take: Int) {
    getUserPosts(skip: $skip, take: $take) {
      id
      title
      slug
      thumbnail
      published
      createdAt
      content
      _count {
        likes
        comments
      }
    }
    userPostsCount
  }
`;

export const CREATE_POST_MUTATION = gql`
  mutation CreatePostMutation($input: CreatePostInput!) {
    createPost(createPostInput: $input) {
      id
    }
  }
`;

export const UPDATE_POST_MUTATION = gql`
  mutation UpdatePostMutation($input: UpdatePostInput!) {
    updatePost(updatePostInput: $input) {
      id
    }
  }
`;

export const DELETE_POST_MUTATION = gql`
  mutation DeletePostMutation($postId: Int!) {
    deletePost(postId: $postId)
  }
`;
